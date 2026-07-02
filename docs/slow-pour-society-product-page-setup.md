# Slow Pour Society — Product Page Setup Guide

Full build guide for the single-product page (The Seal Tee) on the Impact theme.
Since this is a single-product store, this page is the main conversion point —
every block should build trust and move toward "Add to Cart."

References: product copy in `slow-pour-society-product-copy.md`, brand colors
in `slow-pour-society-launch-kit.md`, and the custom Liquid snippets in
`snippets/`.

---

## 1. Create the product in Shopify Admin

**Products → Add product**

- **Title:** The Seal Tee
- **Description:** paste the full description from `slow-pour-society-product-copy.md`
- **Media:** upload in this order —
  1. Flat lay (front, on Oat background)
  2. Worn/lifestyle shot
  3. Close-up of the badge print
  4. Back/side shot (if available)
  5. Size chart image (optional but recommended)
- **Pricing:** $32.00, compare-at price only if a real discount is active (see §5)
- **Variants:** Color (Oat, Roast Black) × Size (S, M, L, XL, 2XL)
- **Inventory:** if fulfilled via POD with no real stock cap, leave inventory tracking off (don't fabricate a stock count — see §5)
- **Shipping:** mark as physical product, set weight per variant
- **SEO:** 
  - Title: `Slow Pour Society — The Seal Tee | Coffee Culture Apparel`
  - Meta description: from the product copy doc
- **Sales channel:** publish to Online Store

---

## 2. Product page section layout (top to bottom)

1. Breadcrumb (theme default)
2. Image gallery + buy box (title, price, rating stars, variant picker, quantity, Add to Cart / Buy Now)
3. Trust block (guarantee + made-to-order + shipping status)
4. Shipping checkpoints timeline
5. Limited-time offer bar *(only if a real promotion is live)*
6. Full description / details accordion
7. Size & fit guide
8. Reviews section
9. "You might also like" / cross-sell *(optional — skip for a true single-product store)*
10. FAQ accordion

---

## 3. Buy box configuration

In Impact's product template settings:

- **Enable dynamic checkout button** (Shop Pay) below Add to Cart — reduces checkout friction
- **Variant picker style:** swatches for color, pills/buttons for size
- **Add a size chart link** next to the size selector (opens a modal — Impact supports this natively)
- Directly under the price, add the **rating stars snippet** (`snippets/rating-stars-custom-liquid.html`) via a Custom Liquid block — but only once you have **real review data**. See the flag in §5.

---

## 4. Adding the custom Liquid blocks

In the Impact theme editor, on the product template, add a **Custom Liquid** block wherever you want each element, then paste in the corresponding file's contents:

| Placement | Snippet file | What it shows |
|---|---|---|
| Below rating stars, above buy box | `snippets/rating-stars-custom-liquid.html` | Star rating + review count |
| Just below Add to Cart button | `snippets/product-trust-block-custom-liquid.html` | 30-day guarantee, made-to-order status, estimated delivery date |
| Below the trust block | `snippets/shipping-checkpoints-custom-liquid.html` | Visual Ordered → Preparing → Delivered timeline |
| Only during a real, live promotion | `snippets/limited-offer-countdown-custom-liquid.html` | Countdown to one real, fixed offer end-date |

To add a Custom Liquid block: **Customize → click into the product template section → Add block → Custom Liquid → paste code.**

---

## 5. Compliance checkpoints specific to this page

These are the points most likely to cause problems if left as generic template defaults — check each before launch:

- **Rating stars snippet:** ships with a placeholder `4.6 | 18,241+ reviews` styled like Trustpilot. **Replace this with your real rating and review count** (or connect an actual review app like Judge.me/Loox/Trustpilot) before launch — a fixed fake number is a fabricated-ratings claim under Whop/FTC rules, and mimicking Trustpilot's exact look without being a real Trustpilot embed risks brand confusion too.
- **Trust block guarantee text ("30-day money-back guarantee"):** only use this if your actual Refund Policy offers 30 days — the two must match exactly, or it's a misleading claim.
- **Shipping checkpoints timeline:** the "Preparing"/"Delivered" dates are calculated automatically (+1 day / +4 days from now) — make sure this actually matches your POD provider's real production + shipping SLA. Don't promise a delivery date you can't hit.
- **Limited-time offer countdown:** only enable when a real, expiring discount is genuinely running. Set `promo_end_iso` to that offer's real end date. Turn it off the moment the offer ends — don't leave a permanently-updated countdown running.
- **No fabricated stock count:** don't add a "X left in stock" or "% sold" claim unless it's wired to real Shopify inventory data.

---

## 6. Size & fit guide

Add as a **Collapsible content** block or a modal linked from the size selector:

- Runs true to size
- Unisex fit
- Chest measurements table by size (S–2XL) — fill in with real garment measurements once available from your POD provider's spec sheet

---

## 7. Reviews section

Use a review app rather than hand-written testimonials, so reviews are
verifiably real and timestamped. Recommended: **Judge.me** (free plan covers
verified-buyer badges, photo reviews, automatic review-request emails, and
Google star ratings; integrates natively with Impact).

**Setup:**
1. Apps → App Store → install Judge.me (free plan)
2. Online Store → Customize → App embeds → enable **Judge.me Core**
3. Product template → Add block → Apps → **Judge.me Review Widget** (place below FAQ/size guide)
4. Add the **Judge.me Star Rating badge** block under the product title —
   this replaces the placeholder rating-stars snippet with real, auto-updating data
5. In Judge.me settings: star color Terracotta `#C1663A`, text Espresso
   `#3B2417`; enable automatic review request email **14 days after
   fulfillment**; enable photo reviews; verified-buyer badge on

**Incentivized reviews (if offered):** reward must apply to any honest review,
not just positive ones, and Judge.me's incentive-disclosure labeling must be on
— that's the FTC/Whop-compliant configuration.

**Empty state (before first reviews):** use
`snippets/reviews-invite-custom-liquid.html` above the widget, plus Judge.me's
default "Be the first to write a review" form. Never seed with fabricated
reviews.

**Growing reviews:** automated day-14 ask, a QR-code review card in every
package, and the disclosed incentive above. Stars appear in the buy box and
Google results automatically once reviews accumulate.

---

## 8. FAQ accordion

Use the 3 questions already drafted:

1. **What material is the tee made of?**
2. **How long does shipping take?**
3. **What's your return/exchange policy?**

(Full answers in the earlier FAQ draft — link to Refund Policy and Shipping Policy pages where relevant.)

---

## 9. Pre-launch checklist

- [ ] Product created with real images, correct price/variants
- [ ] SEO title + meta description set
- [ ] Rating stars snippet shows **real** data (or is hidden until it does)
- [ ] Trust block guarantee text matches actual Refund Policy
- [ ] Shipping checkpoint dates match actual POD production/shipping SLA
- [ ] Countdown bar is off, or on with a real fixed end-date
- [ ] Size & fit guide filled in with real measurements
- [ ] Reviews app connected (or reviews section hidden)
- [ ] FAQ accordion answers match actual policies
- [ ] Mobile preview checked — buy box and trust block legible without scrolling excessively
- [ ] Test checkout end-to-end
