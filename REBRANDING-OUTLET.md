# Rebranding: marimeex.cz → Outlet & Closing-Down Sale

Complete plan to move from "Marimex" to an outlet store with a closing-down
sale (up to **70% off**). An interactive visual version was created as an
Artifact; this file is a reference copy for doing it by hand.

**Instructions are in English. The text you paste into the store stays in
Czech** (your customers are Czech) — each Czech block has an English
translation so you know what it means. Don't paste the English part.

---

## ✓ Already done in your Shopify store

- Created the collection **"Výprodej – Vše musí pryč"** (`/vyprodej-vse-musi-pryc`)
  — Czech for *"Clearance – Everything Must Go"* — with all 8 products.
- Fixed the broken product title → **"Intex Ultra XTR – Bazén 488 × 122 cm
  s pískovou filtrací"** (it previously contained "now this in czech").
- Deleted the leftover **"Test"** product.

---

## 01 · New name

The name should say **what** you sell (pools & wellness) and **on what terms**
(outlet / clearance).

| Name | Domain | Notes |
|---|---|---|
| **AquaOutlet** ⭐ *recommended* | aquaoutlet.cz | Category + positioning in one word. Memorable, strong for a logo and ads. |
| Bazén Outlet | bazen-outlet.cz | "Bazén" = pool. Maximum clarity for Czech shoppers and search. Safe choice. |
| Doprodej Bazénů | doprodej-bazenu.cz | Literally "Pool Clearance". Pure clearance/SEO play. Strong urgency, weaker long-term brand. |
| Vše do bazénu! | vsedobazenu.cz | A Czech pun ("all in / everything for the pool"). Memorable, less obviously an outlet. |

---

## 02 · Visual identity

Shift from "trustworthy blue showroom" to **outlet energy**: high contrast, a
price-tag red accent, blue as a nod to water/quality, warm paper background.

| Role | Hex |
|---|---|
| Price-tag (accent) | `#DC3220` |
| Water blue | `#123A54` |
| Tag gold | `#E39C2C` |
| Paper / background | `#F6F3ED` |
| Ink / text | `#14202A` |

- **Logo:** bold name on a red "price tag" with a punched hole.
- **Typography:** strong sans-serif, uppercase, tight tracking for headings;
  clean readable body text; aligned figures for prices.
- **Tone:** direct, urgent, honest — "We're closing. Prices slashed. Last units."

---

## 03 · Store structure

Handles (the `/url` parts) stay in Czech for SEO.

**Navigation / menu:**
- Clearance — all → `/vyprodej-vse-musi-pryc` *(done)*
- Pools → `/bazeny` *(create)*
- Hot tubs → `/virivky` *(create)*
- Accessories & robots → `/prislusenstvi` *(create)*
- How the sale works → `/pages/doprodej` *(page)*

**Collections:**
- Clearance – Everything Must Go *(done, 8 products)*
- Pools *(smart: product type = pool)*
- Hot tubs *(smart: title contains "vířiv")*
- Last units *(low stock)*
- "Kolekce" (old) → rename / merge

**Homepage sections (top to bottom):**
1. Announcement bar (red) — "We're closing — up to 70% off"
2. Hero — big headline + "Shop the sale" button + countdown
3. Clearance grid — products with struck-through prices
4. Trust badges — free shipping, official distributor, in stock now
5. "How the sale works" — explanation + FAQ

---

## 04 · Storefront copy (Czech to paste + English meaning)

**Announcement bar:**
> `UKONČUJEME PROVOZ · SLEVY AŽ 70 % · SKLADEM V OMEZENÉM MNOŽSTVÍ · DOPRAVA ZDARMA`
>
> *EN: "Closing down · Up to 70% off · Limited stock · Free shipping"*

**Hero — headline:**
> `Končíme. Vše musí pryč. Bazény a vířivky se slevou až 70 %.`
>
> *EN: "We're closing. Everything must go. Pools and hot tubs up to 70% off."*

**Hero — subtitle:**
> `Doprodáváme celý sklad. Po vyprodání zásob definitivně zavíráme — poslední šance pořídit značkové bazény za zlomek ceny.`
>
> *EN: "We're selling off the whole warehouse. Once stock is gone we close for good — last chance to get brand-name pools for a fraction of the price."*

**Button (CTA):**
> `Zobrazit výprodej →` — *EN: "Shop the sale →"*

**Product badge:**
> `−70 % · Poslední kusy · Skladem ihned` — *EN: "−70% · Last units · In stock now"*

**Product urgency line:**
> `Doprodej skladu — po vyprodání se již nebude doplňovat.`
>
> *EN: "Warehouse clearance — will not be restocked once sold out."*

**Footer / about:**
> `Po letech provozu ukončujeme činnost. Děkujeme za přízeň — zbývající zásoby doprodáváme se slevou až 70 %, dokud vydrží.`
>
> *EN: "After years in business we're closing. Thank you for your support — we're clearing remaining stock at up to 70% off while it lasts."*

---

## 05 · Discount strategy — 70% off

Put the original price in the **"Compare-at price"** field (shows struck-through)
and set the main price to **30%** of the original. (Kč = Czech koruna.)

**Formula:** `new = original × 0.30`

| Product | Original (struck through) | New (−70%) |
|---|--:|--:|
| Intex Simple Spa | 2 399 Kč | 719 Kč |
| Intex Ultra XTR | 2 399 Kč | 719 Kč |
| WYBOT C1 robot | 2 199 Kč | 659 Kč |
| MSPA Pebble | 2 179 Kč | 653 Kč |
| Marimex Orlando 4.57 | 2 399 Kč | 719 Kč |

> ⚠ **Credibility / compliance:** For a 70% discount to look believable and
> comply with EU/Czech pricing rules, the compare-at price should reflect the
> **real market price**. Your current ~2,200–2,400 Kč prices look like
> placeholders — real pools normally cost much more. Verify before launching.

**Discount code (on top of the sale):** `SBOHEM10` ("sbohem" = goodbye) for an
extra 10% farewell discount, with an end date. Alternatives: `KONCIME`
("we're closing"), `POSLEDNI70` ("last 70"), `VSEPRYC` ("all gone").

---

## 06 · Step-by-step (in Shopify admin)

1. ✓ **Clearance collection + product cleanup** — done.
2. **Rename the store** — Settings → Store details. Optionally a new domain,
   keep marimeex.cz as a redirect. *Only you can do this — not available via API.*
3. **New logo and favicon** — theme colors: accent `#DC3220`, background `#F6F3ED`.
4. **Announcement bar + hero** — Online Store → Themes → Customize; paste
   section 04 copy.
5. **Set prices to −70%** — Products; original → compare-at, main × 0.30.
6. **Category collections** — Pools, Hot tubs, Accessories; set the menu.
7. **Farewell discount code** — Discounts; e.g. SBOHEM10 with an end date.
8. **"How the sale works" page + FAQ** — Content → Pages.
9. **Launch and announce** — email, social, ads.

---

## 07 · Theme color settings (exact field mapping)

Type these into **Online Store → Themes → Customize → Colors**. `→` = change to.

**General**
| Field | Current | Set to |
|---|---|---|
| Background | `#FFFFFF` | **`#F6F3ED`** (warm paper; or keep white) |
| Text | `#283355` | **`#14202A`** |
| Success | `#00CD69` | **`#12A150`** |
| Warning | `#FFA700` | **`#E39C2C`** |
| Error | `#FF2B4A` | **`#C0281C`** |

**Header**
| Field | Current | Set to |
|---|---|---|
| Background | `#FEFEFE` | **`#FFFFFF`** |
| Text | `#000000` | **`#14202A`** |

**Footer** — ⚠ fixes a bug: white text on near-white is currently invisible
| Field | Current | Set to |
|---|---|---|
| Background | `#FEFEFE` | **`#123A54`** (deep navy) |
| Text | `#FFFFFF` | keep `#FFFFFF` |

**Drawer / popover:** Background keep `#FFFFFF`.

**Primary button** — the key urgency move
| Field | Current | Set to |
|---|---|---|
| Background | `#00CD69` | **`#DC3220`** (clearance red) |
| Text | `#FFFFFF` | keep `#FFFFFF` |

**Secondary button**
| Field | Current | Set to |
|---|---|---|
| Background | `#FFFFFF` | keep `#FFFFFF` |
| Text | `#152B76` | **`#123A54`** |

**Product**
| Field | Current | Set to |
|---|---|---|
| Card background | `#FFFFFF` | keep `#FFFFFF` |
| Card text | `#283355` | **`#14202A`** |
| Star rating | `#FFA700` | **`#E39C2C`** (or keep) |
| On sale accent | `#DC3220` | keep ✅ already correct |
| Sold out badge | `#65708E` | keep |
| Custom badge | `#17AEF3` | **`#123A54`** (navy — for "Poslední kusy" / "−70 %") |

> **Contrast rule:** gold `#E39C2C` must never carry white text. Use it only
> for star fills or with dark text. That's why the custom badge is navy (its
> text is auto-white) — white-on-navy is readable, white-on-gold is not.

---

## 08 · Homepage structure (top → bottom)

0. **Announcement bar** (above header) — red `#DC3220`, white text:
   `UKONČUJEME PROVOZ · SLEVY AŽ 70 % · SKLADEM V OMEZENÉM MNOŽSTVÍ · DOPRAVA ZDARMA`.
   Link to `/vyprodej-vse-musi-pryc`.
1. **Header** — AquaOutlet logo, slim nav (Výprodej · Bazény · Vířivky ·
   Příslušenství), cart. Minimal.
2. **Hero banner** — pool photo (darkened) or navy `#123A54`. Headline
   "Končíme. Vše musí pryč.", the subtitle from §04, red button
   "Zobrazit výprodej →" → `/vyprodej-vse-musi-pryc`. Optional "−70 %" gold tag
   + countdown to sale end.
3. **Countdown / urgency strip** (optional) — "Výprodej končí za …".
4. **Clearance product grid** — from `/vyprodej-vse-musi-pryc`, 6–8 products
   with struck-through prices + red "−70 %" badge. Heading "Doprodej skladu",
   button "Zobrazit vše →".
5. **Category tiles** (3) — Bazény · Vířivky · Příslušenství, each linking to
   its collection.
6. **Trust badges** — Doprava zdarma · Oficiální distributor · Skladem ihned ·
   Bezpečná platba.
7. **"How the sale works" band** — why closing, until when, delivery, warranty
   still applies; button to `/pages/doprodej`. *Reuse the `editorial-row`
   section in this repo.*
8. **Email capture** — "Nechte si poslat poslední slevy" (get the last deals).
9. **Footer** — navy `#123A54`, white text: links, contact, closing info,
   payment icons.

*Optional social proof:* the `astheye-testimonials` section in this repo can go
between 6 and 7.

---

## 09 · "How the sale works" — image prompt + copy

**Image prompt (text-free, for Canva / Midjourney / DALL·E, 3:2 landscape):**

```
A wide, editorial photograph of a bright warehouse showroom filled with
above-ground swimming pools and inflatable hot tubs, neatly lined up in rows,
some with large paper price tags hanging from them. Warm natural daylight from
high windows, clean concrete floor, calm and organised atmosphere. Colour
palette leans warm off-white and deep teal-navy with occasional bold red
price-tag accents. Realistic product photography, soft shadows, shallow depth
of field, negative space on the left third for text overlay. No text, no logos,
no watermarks. Photorealistic, high detail, 3:2 landscape.
```

Alternate (trust/delivery vibe): replace the first sentence with *"A friendly
delivery courier handing a boxed pool pump to a smiling homeowner at a front
door, sunny suburban setting"*, keep the rest.

**Homepage band copy:**
- Heading: `Jak doprodej funguje` — *"How the clearance sale works"*
- Body: `Po letech provozu ukončujeme činnost a doprodáváme celý sklad se slevou
  až 70 %. Zboží je nové, originální a skladem — odesíláme ihned. Záruka i
  možnost vrácení platí i během výprodeje. Množství je omezené, po vyprodání se
  již nedoplňuje.`
- Button: `Zjistit více →` → `/pages/doprodej`

---

## 10 · `/doprodej` page — full structure (Czech + EN)

**1. Title / intro**
- Title: `Ukončujeme provoz – výprodej skladu` — *"We're closing down – warehouse clearance"*
- Intro: `Děkujeme, že jste s námi byli. Po letech provozu končíme a rozprodáváme
  všechny zbývající zásoby bazénů, vířivek a příslušenství se slevou až 70 %.
  Na této stránce najdete vše důležité o průběhu výprodeje.`

**2. Three reassurance points**
- `Nové a originální zboží` — Vše prodáváme nové, zabalené a od oficiálních značek.
- `Skladem, odesíláme ihned` — Co je na webu, je skladem. Odesíláme do 24–48 hodin.
- `Záruka a vrácení platí` — I během výprodeje máte zákonnou záruku a 14 dní na vrácení.

**3. Why we're closing**
- `Po několika sezónách jsme se rozhodli provoz obchodu ukončit. Namísto
  skladování zbývajících zásob je nabízíme našim zákazníkům za výrazně snížené
  ceny. Je to poslední příležitost pořídit si kvalitní bazény a vířivky za
  zlomek původní ceny.`

**4. How to order (3 steps)**
- `Vyberte zboží` — Projděte výprodej a přidejte položky do košíku.
- `Dokončete objednávku` — Bezpečná platba kartou nebo převodem, doprava zdarma.
- `Doručíme k vám` — Odesíláme ihned ze skladu, dokud zásoby vydrží.

**5. FAQ (accordion)**
- `Jsou ceny opravdu konečné?` → `Ano. Uvedené ceny jsou již po slevě až 70 % a jsou konečné.`
- `Platí záruka i na výprodejové zboží?` → `Ano, na veškeré zboží se vztahuje zákonná záruka 24 měsíců.`
- `Můžu zboží vrátit?` → `Ano, máte 14 dní na vrácení bez udání důvodu.`
- `Jak dlouho výprodej potrvá?` → `Do vyprodání zásob. Po vyprodání se zboží již nedoplňuje.`
- `Kolik stojí doprava?` → `Doprava je po celé ČR zdarma.`
- `Jak vás mohu kontaktovat?` → `Napište nám na [váš e-mail] — rádi poradíme.`

**6. Final CTA band**
- Heading: `Poslední kusy mizí rychle` — *"The last units are going fast"*
- Button: `Zobrazit výprodej →` → `/vyprodej-vse-musi-pryc`

> ⚠ Replace `[váš e-mail]` with your real address. Only keep the 14-day returns
> / 24-month warranty lines if you can genuinely honour them (Czech/EU legal
> norms) — make sure a closing business can still fulfil returns before promising.

---

*I can automate several of these for you (apply the −70% pricing, create the
category collections, create the discount code, build the banner theme section).
Just ask.*
