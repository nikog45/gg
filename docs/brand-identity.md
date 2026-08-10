# Brand Identity — Útulno

> The store's visual & verbal identity. Built for the positioning we arrived at:
> **effortless home & garden — let smart helpers do the boring work** — launching with
> two ~€600 hero robots (MOVA ViAX 500 mower + Roborock Qrevo S Pro vacuum).

## 1. Name

**Recommended: Útulno** — a real Czech word for *cosiness / a homely feeling*. It names
the **outcome** the robots deliver (a calm, cared-for home & garden) rather than the
gadgets, so the brand scales beyond these two products into all of home & garden.

*The name is set as a theme setting in the build, so it can be swapped in one place.*
Alternatives if you want a different flavour:
- **Klídek** — colloquial "chill / take it easy." Playful, memorable; tagline writes
  itself (*"My makáme, vy máte klídek."* — we work, you relax). Slightly informal for a
  €600 trust purchase.
- **Doma bez práce** — "home without work." Benefit-explicit, very clear, less brandable.

## 2. Positioning

> **Útulno — pohodlný domov i zahrada.** Chytří pomocníci, kteří udělají nudnou práci za
> vás, aby vám zbyl čas na to hezké. *("A comfortable home and garden. Smart helpers
> that do the boring work for you, so you're left with time for the good stuff.")*

**Promise:** your weekend back. **Proof:** curated bestseller robots, honest Czech
prices, and the full local trust stack (Zásilkovna, dobírka, Ověřeno zákazníky, 24m záruka).

## 3. Voice & tone

- **Plain, warm, confident Czech** — like a practical neighbour, not a luxury concierge.
- Lead with the **benefit** (free time, no effort), back it with a **spec**.
- Short sentences. Active voice. A CTA says exactly what happens (*Přidat do košíku* → *Přidáno*).
- Honest > hype. Real discounts (30-day reference price), real reviews.

Sample lines:
- *"Posekaný trávník bez zvedání prstu."*
- *"Nechte robota vysávat. Vy si dejte kafe."*
- *"Skladem · Odesíláme dnes · Zásilkovnou do 2 dnů."*

## 4. Colour palette

Bright, clean, high-contrast — the look Czech shoppers trust for tech + deals (Alza,
Datart, Mall): white ground, navy text, sky-blue header, green action buttons, red for
sale, amber for ratings.

| Token | Hex | Role |
|---|---|---|
| Background | `#FFFFFF` | Page & card ground |
| Text | `#283555` | Body / card text (navy) |
| Header | `#17AEF3` | Header bar; also "custom" badges (text `#FFFFFF`) |
| Primary / CTA | `#00CD69` | Buttons, savings chips, in-stock, trust checks (text `#FFFFFF`) |
| Sale / on-sale | `#FF2B4A` | Discount badges, sale price, countdown, urgency |
| Star rating | `#FFA700` | Stars & "warning"/highlight accents |
| Secondary btn | bg `#FFFFFF` / text `#152B76` | Outline buttons |
| Sold-out badge | `#E5708E` | Out-of-stock |
| Footer | bg `#F5F6F7` | Footer band (use dark text `#283555` for contrast) |

Semantic: success/in-stock = the primary green `#00CD69`. Red is reserved for sale &
urgency only — don't use it for non-sale UI.

## 5. Typography

CSP-safe system stacks (no webfont dependency, no silent fallback):
- **Display / wordmark:** Georgia serif — warm, trustworthy, a little editorial.
- **Body / UI:** system-ui / -apple-system — clean, native, fast.
- **Data / labels:** the mono system stack for prices-in-columns, spec chips, eyebrows.

Rules: headings `text-wrap: balance`; body ~65ch; uppercase labels get `.12em` tracking;
prices use `tabular-nums`.

## 6. Logo

Wordmark **`Útulno.`** in Georgia bold, forest green, with the full stop in amber (the
one spot of accent). Optional mark: a simple **leaf-that-doubles-as-a-roof** glyph
(house + garden in one shape). Favicon: 🏡 / the leaf-roof mark.

## 7. The two hero products (launch assortment)

| | MOVA ViAX 500 (garden) | Roborock Qrevo S Pro (home) |
|---|---|---|
| Type | Robotic mower, wire-free | Robot vacuum + mop |
| Market price | ~CZK 12,989 (~€520) | ~CZK 14,499 (~€580) |
| Sell price | ~CZK 14,990 (~€600) | ~CZK 15,490 (~€600) |
| Hook | *"Bez drátu. Poseká za vás."* | *"Vysaje i vytře. Sama."* |
| Season | Spring–summer hero (Mar–Jul) | Year-round / autumn–winter hero |
| Evidence | Bestselling budget wire-free mower (Alza/Heureka) | Current #1 most-wanted robot vacuum (CZ) |

## 8. Where it's built

- `sections/home-hero.liquid` — homepage hero + dual-product + trust strip (this build).
- `sections/navimow-hero.liquid` — product-page pattern (swap to the two products above).
- `sections/astheye-testimonials.liquid` — existing reviews section (reuse for social proof).
- Brand name & colours are exposed as theme settings, so nothing is hard-coded.
