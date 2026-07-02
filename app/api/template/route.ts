// GET            → lists product templates on the configured theme.
// GET ?file=...  → shows that template's sections (type + a peek at settings)
//                  so the user can pick which section types get filled per-product.
import { NextResponse } from "next/server";
import { getThemeFile, listThemeFiles } from "@/lib/shopify";

export async function GET(req: Request) {
  try {
    const file = new URL(req.url).searchParams.get("file");
    if (!file) {
      const files = await listThemeFiles("templates/product");
      return NextResponse.json({ templates: files.filter((f) => f.endsWith(".json")) });
    }

    const raw = await getThemeFile(file);
    if (!raw) return NextResponse.json({ error: `${file} not found` }, { status: 404 });
    const json = JSON.parse(raw.replace(/^\s*\/\*[\s\S]*?\*\/\s*/, ""));

    const order: string[] = json.order ?? Object.keys(json.sections ?? {});
    const sections = order
      .filter((id) => json.sections?.[id])
      .map((id) => {
        const s = json.sections[id];
        const blockTypes = [...new Set(Object.values<any>(s.blocks ?? {}).map((b) => b?.type).filter(Boolean))];
        const settingKeys = Object.keys(s.settings ?? {}).slice(0, 8);
        return { id, type: s.type, blockTypes, settingKeys };
      });

    return NextResponse.json({ file, sections });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
