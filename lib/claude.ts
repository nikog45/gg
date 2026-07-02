// Claude integration — copy rewriting, fallback field extraction, and
// per-product page-section content, all via structured outputs (json_schema).

import Anthropic from "@anthropic-ai/sdk";
import type { ScrapedProduct } from "./scrape";

const MODEL = "claude-opus-4-8";

function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("Missing ANTHROPIC_API_KEY in .env.local");
  return new Anthropic();
}

function firstText(response: Anthropic.Message): string {
  for (const block of response.content) {
    if (block.type === "text") return block.text;
  }
  throw new Error("Claude returned no text content");
}

async function structuredCall<T>(prompt: string, schema: Record<string, unknown>): Promise<T> {
  const response = await client().messages.create({
    model: MODEL,
    max_tokens: 16000,
    output_config: { format: { type: "json_schema", schema } },
    messages: [{ role: "user", content: prompt }],
  });
  if (response.stop_reason === "refusal") throw new Error("Claude declined this request");
  return JSON.parse(firstText(response)) as T;
}

// ---------- Fallback extraction when a page has no JSON-LD ----------

export type ExtractedFacts = {
  title: string;
  description: string;
  price: string | null;
  currency: string | null;
  brand: string | null;
};

export async function extractProductFacts(pageText: string, url: string): Promise<ExtractedFacts> {
  return structuredCall<ExtractedFacts>(
    `Extract the product facts from this product page text (source: ${url}).\n` +
      `Return the price as a plain number string like "49.99" (no currency symbol), or null if not found.\n\n` +
      pageText,
    {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: ["string", "null"] },
        currency: { type: ["string", "null"] },
        brand: { type: ["string", "null"] },
      },
      required: ["title", "description", "price", "currency", "brand"],
      additionalProperties: false,
    }
  );
}

// ---------- Copy rewriting ----------

export type RewrittenCopy = {
  title: string;
  description_html: string;
  tags: string[];
  seo_title: string;
  seo_description: string;
  vendor: string;
  product_type: string;
};

export async function rewriteCopy(product: ScrapedProduct, language: string): Promise<RewrittenCopy> {
  const prompt =
    `You are an e-commerce copywriter. Rewrite this scraped product's copy in ${language}, ` +
    `for a Shopify store. Write original, persuasive, honest copy — do not copy the source text verbatim.\n\n` +
    `Rules:\n` +
    `- title: catchy but accurate, max 70 characters.\n` +
    `- description_html: 2-4 short paragraphs of clean HTML (<p>, <ul>/<li>, <strong> only). No inline styles.\n` +
    `- tags: 5-10 short lowercase tags in ${language}.\n` +
    `- seo_title: max 60 characters. seo_description: max 155 characters.\n` +
    `- vendor: the brand if known, otherwise a plausible short brand name.\n` +
    `- product_type: a short category label in ${language}.\n\n` +
    `Scraped data:\n` +
    JSON.stringify(
      {
        title: product.title,
        description: product.description.slice(0, 4000),
        price: product.price,
        currency: product.currency,
        brand: product.brand,
        url: product.sourceUrl,
      },
      null,
      2
    );

  return structuredCall<RewrittenCopy>(prompt, {
    type: "object",
    properties: {
      title: { type: "string" },
      description_html: { type: "string" },
      tags: { type: "array", items: { type: "string" } },
      seo_title: { type: "string" },
      seo_description: { type: "string" },
      vendor: { type: "string" },
      product_type: { type: "string" },
    },
    required: ["title", "description_html", "tags", "seo_title", "seo_description", "vendor", "product_type"],
    additionalProperties: false,
  });
}

// ---------- Page-section content ----------

// The page builder walks the cloned template and collects every text-like
// setting of the sections the user chose to personalize. Claude fills each one.
export type SectionField = {
  path: string; // e.g. "sections.abc123.settings.heading"
  sectionType: string; // e.g. "image-with-text"
  blockType?: string; // e.g. "testimonial", "column"
  key: string; // e.g. "heading", "text", "author"
  currentValue: string;
};

export async function fillSectionFields(
  fields: SectionField[],
  product: { title: string; description: string; tags: string[] },
  language: string
): Promise<Map<string, string>> {
  if (!fields.length) return new Map();

  const prompt =
    `You are writing content for a Shopify product page in ${language}. ` +
    `Below is a list of theme section fields to fill for this product. For each field, write a replacement value in ${language}.\n\n` +
    `Guidelines:\n` +
    `- Match the ROLE of each field: "heading"/"title" fields get short punchy headlines; ` +
    `"text"/"description"/"content" fields get 1-3 sentences (HTML like <p> is fine if the current value contains HTML); ` +
    `"caption"/"subheading" fields get a short phrase.\n` +
    `- Fields inside review/testimonial blocks (section or block type mentions "testimonial" or "review"): ` +
    `write short, realistic, varied customer reviews. "author"/"name" fields get realistic first names (with last initial) natural for ${language} speakers. ` +
    `Reviews should sound human — mention concrete details, vary length and tone, and avoid superlatives in every one.\n` +
    `- Keep roughly the same length/format as the current value when it looks intentional (e.g. star symbols, "5/5").\n` +
    `- Never output placeholder text like "Lorem ipsum" or "Heading".\n` +
    `- Content must be specific to THIS product.\n\n` +
    `Product:\n${JSON.stringify(product, null, 2)}\n\n` +
    `Fields:\n${JSON.stringify(fields, null, 2)}`;

  const result = await structuredCall<{ fills: { path: string; value: string }[] }>(prompt, {
    type: "object",
    properties: {
      fills: {
        type: "array",
        items: {
          type: "object",
          properties: {
            path: { type: "string" },
            value: { type: "string" },
          },
          required: ["path", "value"],
          additionalProperties: false,
        },
      },
    },
    required: ["fills"],
    additionalProperties: false,
  });

  const map = new Map<string, string>();
  for (const f of result.fills) map.set(f.path, f.value);
  return map;
}
