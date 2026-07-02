// POST { url, language } → scrapes the product and rewrites its copy with Claude.
import { NextResponse } from "next/server";
import { scrapeProduct } from "@/lib/scrape";
import { extractProductFacts, rewriteCopy } from "@/lib/claude";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { url, language } = await req.json();
    if (!url || !language) {
      return NextResponse.json({ error: "url and language are required" }, { status: 400 });
    }

    const scraped = await scrapeProduct(url);

    // No JSON-LD title/price → let Claude extract the fields from the page text.
    if (scraped.pageText) {
      const facts = await extractProductFacts(scraped.pageText, url);
      scraped.title = scraped.title || facts.title;
      scraped.description = scraped.description || facts.description;
      scraped.price = scraped.price ?? facts.price;
      scraped.currency = scraped.currency ?? facts.currency;
      scraped.brand = scraped.brand ?? facts.brand;
      delete scraped.pageText;
    }

    if (!scraped.title) {
      return NextResponse.json({ error: `Could not find a product on ${url}` }, { status: 422 });
    }

    const copy = await rewriteCopy(scraped, language);

    return NextResponse.json({
      sourceUrl: url,
      language,
      title: copy.title,
      descriptionHtml: copy.description_html,
      tags: copy.tags,
      seoTitle: copy.seo_title,
      seoDescription: copy.seo_description,
      vendor: copy.vendor,
      productType: copy.product_type,
      price: scraped.price,
      currency: scraped.currency,
      images: scraped.images,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Import failed" }, { status: 500 });
  }
}
