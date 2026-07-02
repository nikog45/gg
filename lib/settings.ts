// Page-builder settings, saved locally to config/page-builder.json.
// baseTemplate: which templates/product.<name>.json to clone per product.
// fillSectionTypes: which section TYPES get product-specific generated content.

import fs from "fs";
import path from "path";

export type PageBuilderSettings = {
  baseTemplate: string | null; // e.g. "templates/product.custom.json"
  fillSectionTypes: string[]; // e.g. ["image-with-text", "multicolumn", "astheye-testimonials"]
};

const FILE = path.join(process.cwd(), "config", "page-builder.json");

export function loadSettings(): PageBuilderSettings {
  try {
    return { baseTemplate: null, fillSectionTypes: [], ...JSON.parse(fs.readFileSync(FILE, "utf8")) };
  } catch {
    return { baseTemplate: null, fillSectionTypes: [] };
  }
}

export function saveSettings(s: PageBuilderSettings): void {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(s, null, 2));
}
