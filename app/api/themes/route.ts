// GET → lists the store's themes and reports connection/scope status.
import { NextResponse } from "next/server";
import { getAccessToken, hasThemeScopes, listThemes } from "@/lib/shopify";

export async function GET() {
  try {
    const { scope } = await getAccessToken();
    const themes = await listThemes();
    return NextResponse.json({
      themes,
      configuredThemeId: process.env.SHOPIFY_THEME_ID ?? "",
      scope,
      themesOk: hasThemeScopes(scope),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
