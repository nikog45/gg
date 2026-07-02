// GET/POST the page-builder settings (base template + section types to fill).
import { NextResponse } from "next/server";
import { loadSettings, saveSettings } from "@/lib/settings";

export async function GET() {
  return NextResponse.json(loadSettings());
}

export async function POST(req: Request) {
  const body = await req.json();
  saveSettings({
    baseTemplate: body.baseTemplate ?? null,
    fillSectionTypes: Array.isArray(body.fillSectionTypes) ? body.fillSectionTypes : [],
  });
  return NextResponse.json({ ok: true });
}
