// Custom page builder ("approach A"): clone the base product template, fill the
// chosen sections with Claude-generated content + this product's images, write it
// as templates/product.<suffix>.json, and point the product's templateSuffix at it.
//
// Matching is by section TYPE and block TYPE — never by the random IDs, which
// differ per theme. Image settings get shopify://shop_images/<filename> refs
// (section image settings need that format, not a raw URL).

import { fillSectionFields, type SectionField } from "./claude";
import { getThemeFile, setProductTemplateSuffix, uploadImagesToFiles, writeThemeFile } from "./shopify";
import { loadSettings } from "./settings";

export type PageBuildResult = {
  built: boolean;
  suffix?: string;
  warning?: string;
};

// Setting keys that hold prose we let Claude rewrite.
const TEXT_KEY_HINTS =
  /(heading|title|subheading|subtitle|text|content|description|caption|quote|label|button_label|author|name|testimonial|review)/i;

// Setting keys/values we treat as images.
function isImageSetting(key: string, value: unknown): boolean {
  if (typeof value === "string" && value.startsWith("shopify://shop_images/")) return true;
  return /(^|_)(image|img|photo|background)(_|$)?/i.test(key);
}

function looksLikeRichValue(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (!v) return false;
  if (v.startsWith("shopify://") || v.startsWith("#") || /^https?:\/\//.test(v)) return false;
  if (/^\d+(\.\d+)?(px|%|em|rem|vw|vh)?$/.test(v)) return false; // numeric/size values
  return true;
}

export async function buildProductPage(input: {
  productId: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  language: string;
  imageUrls: string[];
}): Promise<PageBuildResult> {
  const settings = loadSettings();
  if (!settings.baseTemplate) {
    return { built: false, warning: "No base template chosen yet (open Page builder settings in the dashboard)." };
  }

  const baseRaw = await getThemeFile(settings.baseTemplate);
  if (!baseRaw) {
    return { built: false, warning: `Base template ${settings.baseTemplate} not found on theme.` };
  }

  // Theme template JSON may contain /* comments */ at the top — strip them.
  const template = JSON.parse(baseRaw.replace(/^\s*\/\*[\s\S]*?\*\/\s*/, ""));
  const fillTypes = new Set(settings.fillSectionTypes);

  // 1) Collect text fields + image slots from the sections we're allowed to touch.
  const fields: SectionField[] = [];
  const imageSlots: { apply: (ref: string) => void }[] = [];

  const sections = template.sections ?? {};
  for (const [sectionId, section] of Object.entries<any>(sections)) {
    const sectionType = section?.type;
    if (!sectionType || !fillTypes.has(sectionType)) continue; // main product / FAQ / app sections stay untouched

    const visit = (settingsObj: Record<string, any> | undefined, pathPrefix: string, blockType?: string) => {
      if (!settingsObj) return;
      for (const [key, value] of Object.entries(settingsObj)) {
        const fieldPath = `${pathPrefix}.${key}`;
        if (isImageSetting(key, value)) {
          imageSlots.push({ apply: (ref) => (settingsObj[key] = ref) });
        } else if (TEXT_KEY_HINTS.test(key) && looksLikeRichValue(value)) {
          fields.push({ path: fieldPath, sectionType, blockType, key, currentValue: String(value).slice(0, 500) });
        }
      }
    };

    visit(section.settings, `sections.${sectionId}.settings`);
    for (const [blockId, block] of Object.entries<any>(section.blocks ?? {})) {
      visit(block?.settings, `sections.${sectionId}.blocks.${blockId}.settings`, block?.type);
    }
  }

  // 2) Generate content for those fields.
  const fills = await fillSectionFields(
    fields,
    { title: input.title, description: input.description.slice(0, 2000), tags: input.tags },
    input.language
  );

  // 3) Apply text fills back onto the cloned template by path.
  const applyPath = (dotPath: string, value: string) => {
    const parts = dotPath.split(".");
    let obj: any = template;
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj?.[parts[i]];
      if (!obj) return;
    }
    obj[parts[parts.length - 1]] = value;
  };
  for (const [p, v] of fills) applyPath(p, v);

  // 4) Upload this product's images to Shopify Files and plug the theme refs
  //    into the image slots (round-robin so every slot gets an image).
  let warning: string | undefined;
  if (imageSlots.length && input.imageUrls.length) {
    try {
      const refs = await uploadImagesToFiles(input.imageUrls.slice(0, Math.min(imageSlots.length, 12)));
      if (refs.length) {
        imageSlots.forEach((slot, i) => slot.apply(refs[i % refs.length]));
      } else {
        warning = "Images uploaded to Shopify Files never became READY; section images left as-is.";
      }
    } catch (e: any) {
      warning = `Image upload to Shopify Files failed: ${e.message}`;
    }
  }

  // 5) Write the per-product template and assign it.
  const suffix = suffixFromHandle(input.handle);
  await writeThemeFile(`templates/product.${suffix}.json`, JSON.stringify(template, null, 2));
  await setProductTemplateSuffix(input.productId, suffix);

  return { built: true, suffix, warning };
}

function suffixFromHandle(handle: string): string {
  // Template suffixes must be short and simple; derive from the product handle.
  return handle.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 25).replace(/^-|-$/g, "");
}
