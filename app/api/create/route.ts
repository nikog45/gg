// POST product data → creates the DRAFT product in Shopify, then builds its
// custom page (non-fatal: a page-builder failure never loses the product).
import { NextResponse } from "next/server";
import { createDraftProduct, previewUrl } from "@/lib/shopify";
import { buildProductPage } from "@/lib/pagebuilder";
import { stripHtml } from "@/lib/scrape";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const p = await req.json();
    if (!p.title) return NextResponse.json({ error: "title is required" }, { status: 400 });

    const created = await createDraftProduct({
      title: p.title,
      descriptionHtml: p.descriptionHtml ?? "",
      tags: p.tags ?? [],
      vendor: p.vendor,
      productType: p.productType,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      imageUrls: p.images ?? [],
      price: p.price || undefined,
    });

    let page: import("@/lib/pagebuilder").PageBuildResult = { built: false };
    try {
      page = await buildProductPage({
        productId: created.id,
        handle: created.handle,
        title: p.title,
        description: stripHtml(p.descriptionHtml ?? ""),
        tags: p.tags ?? [],
        language: p.language ?? "English",
        imageUrls: p.images ?? [],
      });
    } catch (e: any) {
      page.warning = `Page build failed (product was still created): ${e.message}`;
    }

    return NextResponse.json({
      adminUrl: created.adminUrl,
      previewUrl: previewUrl(created.handle),
      handle: created.handle,
      pageBuilt: page.built,
      pageWarning: page.warning,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Create failed" }, { status: 500 });
  }
}
