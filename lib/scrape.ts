// Product scraper.
//
// Strategy (in order):
//  1. Shopify stores: use the clean /products/<handle>.json endpoint.
//  2. Everyone else: fetch the HTML (via ScrapingBee premium proxy if blocked),
//     read facts from JSON-LD, and collect images ONLY from declared sources:
//     JSON-LD `image` + og:image + <img> tags whose alt text shares ≥2 significant
//     words with the product title. Scraping arbitrary <img> tags pulls in nav
//     icons and "related products" — that bug puts the same wrong images on
//     every product, so we never do it.

export type ScrapedProduct = {
  sourceUrl: string;
  title: string;
  description: string;
  price: string | null;
  currency: string | null;
  brand: string | null;
  images: string[];
  pageText?: string; // set only when JSON-LD was missing, for Claude fallback extraction
};

const MAX_IMAGES = 12;
const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

export async function scrapeProduct(url: string): Promise<ScrapedProduct> {
  const parsed = new URL(url);

  // 1) Shopify product URL → use the JSON endpoint for clean data.
  const shopifyMatch = parsed.pathname.match(/\/products\/([^/?#]+)/);
  if (shopifyMatch) {
    const jsonUrl = `${parsed.origin}/products/${shopifyMatch[1]}.json`;
    try {
      const res = await fetch(jsonUrl, { headers: BROWSER_HEADERS });
      if (res.ok) {
        const contentType = res.headers.get("content-type") ?? "";
        if (contentType.includes("json")) {
          const data = await res.json();
          if (data?.product) return fromShopifyJson(url, data.product);
        }
      }
    } catch {
      // Not a Shopify store (or endpoint blocked) — fall through to HTML scraping.
    }
  }

  // 2) Generic HTML scrape.
  const html = await fetchHtml(url);
  return parseHtml(url, html);
}

function fromShopifyJson(sourceUrl: string, p: any): ScrapedProduct {
  const variant = p.variants?.[0];
  return {
    sourceUrl,
    title: p.title ?? "",
    description: stripHtml(p.body_html ?? ""),
    price: variant?.price ?? null,
    currency: null, // shop currency; Claude keeps the numeric price as-is
    brand: p.vendor ?? null,
    images: (p.images ?? [])
      .map((img: any) => cleanImageUrl(img.src))
      .filter(Boolean)
      .slice(0, MAX_IMAGES),
  };
}

async function fetchHtml(url: string): Promise<string> {
  let status = 0;
  try {
    const res = await fetch(url, { headers: BROWSER_HEADERS, redirect: "follow" });
    status = res.status;
    if (res.ok) return await res.text();
  } catch {
    status = 0; // network-level block
  }

  const blocked = [0, 401, 403, 429, 503].includes(status);
  const beeKey = process.env.SCRAPINGBEE_API_KEY;
  if (blocked && beeKey) {
    // Product data lives in the static HTML — render_js would be slower and flakier.
    const beeUrl =
      `https://app.scrapingbee.com/api/v1/?api_key=${encodeURIComponent(beeKey)}` +
      `&url=${encodeURIComponent(url)}&premium_proxy=true&render_js=false`;
    const res = await fetch(beeUrl);
    if (res.ok) return await res.text();
    throw new Error(`ScrapingBee also failed (HTTP ${res.status}) for ${url}`);
  }
  throw new Error(
    `Could not fetch ${url} (HTTP ${status}).` +
      (blocked && !beeKey ? " The site blocks bots — add a SCRAPINGBEE_API_KEY to .env.local." : "")
  );
}

export function parseHtml(sourceUrl: string, html: string): ScrapedProduct {
  const ld = findJsonLdProduct(html);

  const title = ld?.name ?? extractTag(html, "title") ?? "";
  const offers = ld ? firstOffer(ld.offers) : null;

  const result: ScrapedProduct = {
    sourceUrl,
    title: decodeEntities(title).trim(),
    description: decodeEntities(stripHtml(ld?.description ?? "")).trim(),
    price: offers?.price != null ? String(offers.price) : null,
    currency: offers?.priceCurrency ?? null,
    brand: typeof ld?.brand === "string" ? ld.brand : ld?.brand?.name ?? null,
    images: collectImages(sourceUrl, html, ld, decodeEntities(title)),
  };

  // No usable JSON-LD → hand the page text to Claude for field extraction.
  if (!result.title || result.price === null) {
    result.pageText = stripHtml(html).replace(/\s+/g, " ").slice(0, 15000);
  }
  return result;
}

// ---------- JSON-LD ----------

function findJsonLdProduct(html: string): any | null {
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of scripts) {
    let data: any;
    try {
      data = JSON.parse(m[1].trim());
    } catch {
      continue;
    }
    const candidates = Array.isArray(data) ? data : [data, ...(data["@graph"] ?? [])];
    for (const c of candidates) {
      const type = c?.["@type"];
      if (type === "Product" || (Array.isArray(type) && type.includes("Product"))) return c;
    }
  }
  return null;
}

function firstOffer(offers: any): { price?: any; priceCurrency?: string } | null {
  if (!offers) return null;
  const o = Array.isArray(offers) ? offers[0] : offers;
  if (!o) return null;
  if (o.price != null || o.priceCurrency) return o;
  // AggregateOffer
  if (o.lowPrice != null) return { price: o.lowPrice, priceCurrency: o.priceCurrency };
  return null;
}

// ---------- Images ----------

function collectImages(pageUrl: string, html: string, ld: any, title: string): string[] {
  const found: string[] = [];
  const push = (raw: string | undefined | null) => {
    if (!raw) return;
    const cleaned = cleanImageUrl(absolutize(raw.trim(), pageUrl));
    if (cleaned && !found.includes(cleaned)) found.push(cleaned);
  };

  // 1) Declared main images: JSON-LD `image` + og:image.
  if (ld?.image) {
    const imgs = Array.isArray(ld.image) ? ld.image : [ld.image];
    for (const i of imgs) push(typeof i === "string" ? i : i?.url ?? i?.contentUrl);
  }
  const og = html.match(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i);
  push(og?.[1] ? decodeEntities(og[1]) : null);

  // 1b) Embedded JSON galleries: SPA storefronts (Unieuro etc.) ship the gallery
  //     in a JSON blob like "images":[{"altText":"...","url":"/medias/...jpg"}]
  //     with only one <img> in the visible HTML.
  collectJsonGalleryImages(html, significantWords(title), push);

  // 2) Gallery images: <img> whose alt shares ≥2 significant words with the title.
  //    Gallery images carry the product name in their alt text; nav/related images don't.
  const titleWords = significantWords(title);
  if (titleWords.size >= 2) {
    const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)];
    for (const tagMatch of imgTags) {
      const tag = tagMatch[0];
      const alt = attr(tag, "alt");
      if (!alt) continue;
      const altWords = significantWords(decodeEntities(alt));
      let overlap = 0;
      for (const w of altWords) if (titleWords.has(w)) overlap++;
      if (overlap < 2) continue;

      // Real gallery URLs are often lazy-loaded: src is a data: placeholder and the
      // actual URL sits in data-src / srcset / data-srcset.
      push(bestSrcsetCandidate(attr(tag, "data-srcset")));
      push(bestSrcsetCandidate(attr(tag, "srcset")));
      push(attr(tag, "data-src"));
      const src = attr(tag, "src");
      if (src && !src.startsWith("data:")) push(src);
    }
  }

  return found.slice(0, MAX_IMAGES);
}

function significantWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 3)
  );
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? decodeEntities(m[1]) : null; // src attrs often carry &amp; in query strings
}

// Finds "images": [ ... ] arrays in embedded JSON and pulls product image URLs
// out of them. Entries that carry an altText must share ≥2 significant words
// with the product title (same rule as <img> alt matching); URL-only entries
// must look like media paths.
function collectJsonGalleryImages(html: string, titleWords: Set<string>, push: (u: string | null) => void) {
  const arrays = [...html.matchAll(/"images"\s*:\s*\[/g)].slice(0, 5);
  for (const m of arrays) {
    const span = balancedSpan(html, m.index! + m[0].length - 1, 30000);
    if (!span) continue;

    const objects = [...span.matchAll(/\{[^{}]*\}/g)];
    let matchedAny = false;
    for (const obj of objects) {
      const urlMatch = obj[0].match(/"(?:url|src|href|image)"\s*:\s*"([^"]+)"/);
      if (!urlMatch) continue;
      const url = urlMatch[1].replace(/\\\//g, "/");
      const altMatch = obj[0].match(/"(?:altText|alt|title|name)"\s*:\s*"([^"]*)"/);
      if (altMatch) {
        const altWords = significantWords(decodeEntities(altMatch[1]));
        let overlap = 0;
        for (const w of altWords) if (titleWords.has(w)) overlap++;
        if (overlap < 2) continue;
      } else if (!/\/(medias?|images?|assets|cdn|photos?)\//i.test(url) && !/\.(jpe?g|png|webp|avif)(\?|$)/i.test(url)) {
        continue;
      }
      push(url);
      matchedAny = true;
    }

    // Plain string arrays: "images": ["https://...", "/media/..."]
    if (!objects.length && !matchedAny) {
      for (const s of span.matchAll(/"((?:https?:)?\/[^"]+?\.(?:jpe?g|png|webp|avif)[^"]*)"/gi)) {
        push(s[1].replace(/\\\//g, "/"));
      }
    }
  }
}

// Returns the substring of a balanced [...] starting at openIndex (which must
// point at "["), or null if unbalanced within maxLen.
function balancedSpan(text: string, openIndex: number, maxLen: number): string | null {
  let depth = 0;
  const end = Math.min(text.length, openIndex + maxLen);
  for (let i = openIndex; i < end; i++) {
    const ch = text[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return text.slice(openIndex, i + 1);
    }
  }
  return null;
}

function bestSrcsetCandidate(srcset: string | null): string | null {
  if (!srcset) return null;
  // Take the last (usually largest) candidate.
  const parts = srcset.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) return null;
  const last = parts[parts.length - 1].split(/\s+/)[0];
  return last && !last.startsWith("data:") ? last : null;
}

function absolutize(url: string, base: string): string {
  try {
    if (url.startsWith("//")) return "https:" + url;
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}

// Strips CDN resize params (?width=70&crop=1:1, MediaMarkt-style ?x=536&y=402, etc.)
// so we store full-resolution images.
const RESIZE_PARAMS = new Set([
  "width", "height", "w", "h", "crop", "fit", "quality", "q", "size",
  "resize", "scale", "sw", "sh", "sfrm", "format", "fmt", "dpr", "auto", "im",
  "x", "y", "ex", "ey", "cox", "coy", "cdx", "cdy", "trim", "align",
  "sp", "strip", "unsharp", "resizesource",
]);

function cleanImageUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol)) return null;
  url.protocol = "https:"; // normalize so http/https duplicates dedupe
  // These URLs all come from declared sources (JSON-LD / og:image / embedded JSON
  // galleries / alt-matched imgs), so extension-less CDN URLs are fine — only
  // reject obvious non-photos.
  if (/\.(svg|ico|css|js|pdf|mp4|webm)(\?|$)/i.test(url.pathname)) return null;
  for (const key of [...url.searchParams.keys()]) {
    if (RESIZE_PARAMS.has(key.toLowerCase())) url.searchParams.delete(key);
  }
  // Shopify-style size suffix: /foo_600x600.jpg → /foo.jpg
  url.pathname = url.pathname.replace(/_(?:\d+x\d*|\d*x\d+|pico|icon|thumb|small|compact|medium|large|grande)(\.[a-z]+)$/i, "$1");
  // MediaMarkt/MediaWorld-style trailing size segment: /ASSET_MMS_123/fee_786_587_png → /ASSET_MMS_123
  url.pathname = url.pathname.replace(/\/fee_\d+_\d+_[a-z]+$/i, "");
  return url.toString();
}

// ---------- Text utilities ----------

export function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(html: string, tag: string): string | null {
  const m = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? m[1].trim() : null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}
