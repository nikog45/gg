# Hero Product Decision — applying the "check the bestsellers" method to Czechia

The reference store (gioiacasa.it) was built by a concrete method, not by intuition:
research a target buyer (40+ Italians) → confirm the decisive commercial factor
(payment = credit card) → pick a category with real demand → **look up the actual
category bestseller on Amazon.it → build the store & product page around that hero
product (a robotic pool cleaner).**

This document repeats that exact method for Czechia, using real bestseller data instead
of cultural inference.

## Method note: the Czech "Amazon" is not Amazon

Amazon is not dominant in Czechia. The real "check the bestsellers" sources are:
- **Alza.cz** — the Czech Amazon; has explicit *"nejprodávanější"* (best-selling) rankings.
- **Heureka.cz** — price-comparison engine that publishes best-seller rankings **and** an
  annual *"Produkt roku"* (Product of the Year) per category = a public demand signal.
- **Mall.cz / Allegro** — secondary marketplaces.

All figures below are from these sources (Aug 2026 snapshot).

## Candidates, with real bestseller evidence

| Category | Actual bestseller(s) | Price (CZK) | Read |
|---|---|---|---|
| **Robotic lawn mower** (robotická sekačka) | **Segway Navimow i108E** — Heureka *Product of the Year 2024*, ~94% rating, best-selling wire-free model under 25k; Parkside Smart PAMRS 1000 (~10k, cheap entry); Mammotion LUBA 2 (premium) | ~22,000–33,000 | **Winner.** Same archetype as the pool cleaner (autonomous garden chore-robot), bigger demand base (garden nation), high ticket/margin, killer "no wire" hook, clean seasonality |
| **Robot vacuum** (robotický vysavač) | **Xiaomi X20 Pro EU** (Alza #1 favorite); Xiaomi S40 | ~8,500 | Highest year-round volume, but commoditized — you'd fight Alza on price on the same SKU. Thin margin, weak moat |
| **Above-ground pool + pool cleaner** | Intex/Bestway pools + robotic cleaners | ~3,000–20,000 | The most literal copy, but very short season + bulky logistics/returns |
| **Grill** | **Weber Q 1400** (Heureka popular electric grill) | ~4,000–9,000 | Aspirational brand, balcony/chata cooking, but crowded market |

## Decision: **Segway Navimow i108E** (robotic lawn mower)

It is the true Czech analog of the Italian pool cleaner — **an autonomous garden robot
that does a hated chore** — and it is a *verified* bestseller, not a guess.

**Why it wins the "build a store around it" test:**
1. **Proven demand:** Heureka Product of the Year 2024, ~94% satisfaction, the top-selling
   wire-free mower under CZK 25k. The robotic-mower segment grows ~10%/yr.
2. **Bigger base than the original:** a lawn is far more universal in Czechia (garden +
   chata nation) than a pool was in Italy.
3. **One hook to hang the page on:** *"bez drátu"* (no perimeter wire) — GPS/RTK, install
   in an afternoon. This is the single differentiating headline.
4. **High ticket / high margin:** ~CZK 22–33k. One conversion ≫ one robot-vacuum sale, so
   paid traffic maths work far better.
5. **Clean seasonality engine:** demand spikes Mar–Jul → the ad + discount calendar and
   urgency writes itself (same "seasonal urgency" lever gioiacasa uses).

**Year-round complement (phase 2):** the **Xiaomi X20 Pro robot vacuum** for winter
volume — but never as the price-led hero, because Alza owns that SKU on price.

## Product-page spec (built in `sections/navimow-hero.liquid`)

Modelled on the gioiacasa product-page pattern, re-pointed to Czech buyers:

- **Hero:** product photo + "Bez obvodového drátu" flag · title *Segway Navimow i108E* ·
  hook *"Posekaný trávník bez zvedání prstu — a bez drátu okolo zahrady."*
- **Social proof:** ★★★★★ *94 % spokojených zákazníků · Ověřeno zákazníky*.
- **Price block (CZK):** 24 990 Kč, strike-through 32 990 Kč, "Ušetříte 8 000 Kč",
  BNPL note (Twisto / Skip Pay). Keep the discount honest (real 30-day reference).
- **CTA:** *Přidat do košíku* + *"Skladem · Odesíláme dnes · Doručení Zásilkovnou do 2 dnů."*
- **Trust bar (the Czech make-or-break):** Zásilkovna doprava zdarma nad 1 500 Kč ·
  platba dobírkou · 14 dní na vrácení · 24 měsíců záruka · Ověřeno zákazníky · český servis.
- **Benefits grid:** Bez drátu (GPS/RTK) · 800 m² · 58 dB tichý provoz · řízení z appky.
- **Payment chips:** Kartou · Apple Pay · Google Pay · Dobírka · Bankovní převod · Twisto.

All copy is native Czech and every element is editable from the Shopify theme editor.

## Sources
- Alza.cz — nejprodávanější robotické vysavače: https://www.alza.cz/nejprodavanejsi-nejlepsi-roboticke-vysavace/18850167.htm
- Heureka — robotické sekačky (Produkt roku 2024, Navimow i108E): https://roboticke-sekacky.heureka.cz/segway-navimow-i108e_2/
- arecenze.cz — Nejlepší robotické sekačky (květen 2025): https://www.arecenze.cz/clanky/nejlepsi-roboticke-sekacky-kveten-2025/
- Alza.cz — Segway Navimow i108E: https://www.alza.cz/hobby/segway-navimow-i108e-d9911202.htm
- Tests.cz — nejprodávanější grily 2025: https://tests.cz/nejprodavanejsi-grily-2025/
- cc.cz — TOP 100 e-shopů v Česku 2025: https://cc.cz/ecommerce-2025/
