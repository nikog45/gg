# Slow Pour Society — Homepage Setup Guide

Full section-by-section homepage build for the single-product launch (The Seal
Tee). Because there's one SKU, the homepage doubles as the sales page — every
section should build trust and move toward "Add to Cart," not distract from it.

Built for Shopify's default section-based theme editor (Dawn or similar).
Colors reference the hex table in `slow-pour-society-launch-kit.md`. Two custom
sections already exist in this repo (`sections/editorial-row.liquid` and
`sections/astheye-testimonials.liquid`) and are used below.

---

## 0. Before you start

1. **Online Store → Themes → Customize** to open the theme editor.
2. Set the theme color scheme first using the hex table already saved in the
   launch kit doc (Settings → Colors).
3. Set fonts: Settings → Typography → Heading: **Fraunces**, Body: **Inter**
   (or Work Sans). If the theme doesn't include these, add them under
   Settings → Typography → "Add custom font" via Google Fonts.
4. Have ready: 3–5 product photos of the Seal Tee (flat lay + worn/lifestyle),
   the Seal logo as a transparent PNG/SVG, and 2–3 customer photos or
   testimonial quotes once available (placeholders are fine for launch).

---

## 1. Section order (top to bottom)

1. Announcement bar
2. Header
3. Hero (image + headline banner)
4. Featured product (the Seal Tee — the main event)
5. Editorial row (brand story, 2-tile image/video)
6. Testimonials (astheye-testimonials section)
7. "Join the Society" / email capture
8. FAQ / details accordion
9. Footer

---

## 2. Section-by-section setup

### Announcement bar
- **Text:** `Free shipping on orders $50+ — Made to order, ships in 2–5 days`
- Background: Espresso `#3B2417`, Text: Oat `#F3EDE3`
- Link (optional): to the product page anchor

### Header
- Logo: upload the Seal wordmark/lockup (transparent PNG)
- Menu: keep minimal — **Shop / Our Story / FAQ / Contact** (no mega menu needed for one product)
- Sticky header: on
- Cart icon style: drawer (not full page redirect) — keeps momentum toward checkout

### Hero section
Use the theme's **Image Banner** section.
- **Image:** lifestyle photo — model wearing the Seal Tee, warm morning light, pour-over setup softly blurred in background (use the lifestyle image prompt from earlier)
- **Heading:** `Slow down for a better cup.`
- **Subheading:** `The Seal Tee — the founding piece of Slow Pour Society.`
- **Button:** `Shop The Seal Tee` → links to the product page
- Overlay: subtle dark overlay (10–20% Roast Black `#1E1712`) so white/oat text stays legible
- Text position: bottom-left or centered, left-aligned

### Featured product section
Use **Featured Product** (Shopify's built-in section) pointed at The Seal Tee.
- Include: image gallery (flat lay + lifestyle + close-up of the badge print), variant picker (color/size), price, **Buy Now** + **Add to Cart** buttons
- Description: paste the product copy from `slow-pour-society-product-copy.md`
- Enable "Show dynamic checkout button" (Shop Pay button) for faster conversion
- Below the buy box, add a small trust row: `✓ Made to order  ✓ Machine washable  ✓ Ships in 2–5 days`

### Editorial row (brand story) — uses `sections/editorial-row.liquid`
Two-tile layout, image + image (or image + video).
- **Tile 1 (image):** close-up of the badge/print detail or the pour-over ritual
  - Overlay text: `Every seal is a signal.` 
  - Subtext: `You'll know who else is in the Society.`
- **Tile 2 (image or video):** brand story shot — hands brewing coffee, tee visible
  - Overlay text: `Founded on one idea:` 
  - Subtext: `coffee is a ritual, not a transaction.`
- Settings: `gap` 16–24px, `border_radius` 8–12px, `overlay_color` Roast Black at ~30% opacity, `hover_zoom` on

### Testimonials — uses `sections/astheye-testimonials.liquid`
- Heading: `Members of the Society`
- Badge label: `VERIFIED BUYERS`
- Add 3–5 reviews as they come in. **Do not fabricate reviews or ratings** —
  leave this section off or use a soft launch note ("Be the first to review")
  until you have genuine customer feedback (Whop/FTC compliance: reviews must
  reflect real experiences).
- Star score: only populate once you have real ratings

### "Join the Society" email capture
Use a **Newsletter** section.
- Heading: `Join the Society`
- Subtext: `Get first access to new drops, restocks, and slow-morning reading.`
- Incentive (optional, compliant): `10% off your first order`
- Background: Kraft `#D8C3A5`, Text: Espresso `#3B2417`

### FAQ / details accordion
Use a **Collapsible content** section. Suggested Q&As:
- *What material is the tee?* → 100% heavyweight cotton, ~6oz, unisex true-to-size fit.
- *How long does shipping take?* → Made to order; allow 2–5 business days for production, plus transit time.
- *What's your return policy?* → Link to the Refund Policy page.
- *How do I care for it?* → Machine wash cold inside out, tumble dry low.

### Footer
- Background: Roast Black `#1E1712`, Text: Kraft `#D8C3A5`
- Columns: **Shop** (link to product) · **Info** (Refund Policy, Shipping, Privacy, Terms) · **Follow** (social icons)
- Small print: `© 2026 Slow Pour Society. Join the Society.`

---

## 3. Adding the custom sections from this repo

`editorial-row.liquid` and `astheye-testimonials.liquid` are custom sections
already in `sections/`. To use them:

1. In Shopify Admin, go to **Online Store → Themes → Edit code**.
2. Under the `sections/` folder, click **Add a new section**, name it to match
   (`editorial-row`, `astheye-testimonials`), and paste in the file contents
   from this repo.
3. Go back to **Customize**, click **Add section** on the homepage, and both
   will now appear in the picker under their section names.
4. Configure each via the section settings panel in the editor (colors,
   images, text) as described above — no code edits needed after upload.

---

## 4. Image checklist before launch

| Asset | Use | Spec |
|---|---|---|
| Seal logo (transparent) | Header, footer | PNG/SVG, transparent bg |
| Hero lifestyle photo | Hero banner | 1920×1080 min, warm morning light |
| Flat lay product shot | Featured product gallery | 2000×2000, Oat background |
| Worn/lifestyle shot | Featured product gallery | 2000×2000 |
| Badge close-up | Featured product gallery + editorial tile | 1600×1600 |
| Brand story shot | Editorial row tile 2 | 1600×1600 or 16:9 |

Use the image prompts already drafted for "The Seal" artwork and product
photography to generate these if you don't have real photos yet — swap in real
product photography as soon as it's available (mockups are fine for a soft
launch, but real photos convert better).

---

## 5. Launch checklist

- [ ] Colors + fonts set (Settings → Colors / Typography)
- [ ] Logo uploaded to header + favicon
- [ ] Hero section live with lifestyle image + CTA to product
- [ ] Featured Product section correctly linked to The Seal Tee, both buttons working
- [ ] Editorial row populated with 2 brand-story images
- [ ] Testimonials section either has **real** reviews or is hidden until it does
- [ ] Email capture section live, discount code (if offered) created and tested
- [ ] FAQ accordion answers shipping/returns/materials questions
- [ ] Footer links to Refund Policy, Shipping Policy, Privacy Policy, Terms of Service (draft these next if not done)
- [ ] Mobile preview checked in theme editor (toggle device view) — hero text and buy box must be legible on mobile
- [ ] Test checkout end-to-end in a preview/test order
