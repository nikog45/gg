# Building a Whop-Compliant Shopify Brand

A practical compliance guide derived from Whop's public policies, adapted for a
Shopify store. Use it to make your brand, products, and marketing "Whop-ready"
so the same business can list on Whop without friction — and so your Shopify
store stays on the right side of the same FTC / consumer-protection rules Whop
enforces.

> **Read this first — scope.** Whop's Terms of Service legally govern selling
> **on whop.com**. Shopify is a separate platform that Whop does not control, so
> nothing here is a Whop *obligation* for a Shopify store. It is a **voluntary
> compliance baseline**: adopt it if you want the same brand/products to be
> eligible on Whop later, or simply want a defensible, FTC-aligned storefront.
> This document is operational guidance, **not legal advice** — have a lawyer
> review your final policies before launch.

Sources analyzed (all fetched 2026‑07‑01):
Prohibited Products & Services · Community Guidelines · Seller Terms · Buyer
Terms · Earnings Terms · Youth Safety Policy · Privacy Policy · Whop Ads Terms ·
Spend Card Terms · Developer API Terms.

---

## 1. Product eligibility — what your brand may and may not sell

Whop's **Prohibited Products & Services Policy** is the hardest gate. If your
brand sells any of the following, it will be rejected on Whop regardless of how
clean your storefront is. Keep your Shopify catalog clear of these categories to
stay eligible.

### 1.1 Fully prohibited categories (do not sell)

| Category | What's blocked |
|---|---|
| Adult content | Pornographic / sexually explicit material or services for sexual gratification |
| Alcohol & tobacco | Alcohol, tobacco, e‑cigarettes, vaping, nicotine products |
| Cannabis / THC | Cannabis, marijuana, THC and derivatives, paraphernalia |
| Controlled substances & pharma | Prescription meds, controlled substances, unapproved supplements, unsubstantiated health claims |
| Debt & lending | Credit repair, loan modification, debt relief, personal‑loan brokering |
| Fireworks | Pyrotechnics and explosive entertainment products |
| Fraudulent / identity documents | Forged or unauthorized government documents & credentials |
| Gambling | Betting, lotteries, wagering that violates state/federal law (advisory services excluded) |
| Hate / violent content | Material promoting discrimination or inciting real‑world violence |
| Human parts | Organs, tissue, blood, bodily fluids, biological materials |
| Counterfeit / infringing goods | Unauthorized copies violating IP rights |
| Pirated content | Pirated media, illegal streaming, unauthorized IPTV |
| Legal services | Attorney representation / professional legal advice |
| Non‑fiat currency | Crypto, NFTs, alternative currencies (educational *content* may be allowed) |
| Pyramid / MLM schemes | Earnings that come mainly from recruitment, not real product sales |
| Ticket reselling | Bot‑acquired or illegally resold tickets |
| Timeshares | Vacation‑property ownership programs and resales |
| Unregistered financial services | Investment products/instruments lacking regulatory registration |
| Weapons & explosives | Firearms, ammunition, weapon‑manufacturing instructions |
| Wildlife | Protected/endangered species, illegal wildlife trade |

### 1.2 Restricted (allowed only with prior approval + documentation)

Some regulated categories may be permitted **only after Whop review**, with
proof of licensing and legal compliance. If your brand touches a regulated
space, assume you must apply and produce documentation before selling. On
Shopify, keep that licensing evidence on file even if not asked, and make sure
your product pages don't overstate what an unlicensed business can offer.

### 1.3 The "lifetime access" rule (applies to digital products & memberships)

Whop **prohibits "lifetime," "perpetual," or indefinite‑access" offers.** Every
product must disclose a **specific access period, duration, and delivery
mechanism**.

**Shopify action:** if you sell memberships, courses, communities, or digital
downloads, never label anything "lifetime." Instead state the concrete term
(e.g. "12 months of access," "updates for 24 months"). Put the access period in
the product title/description and in your delivery/terms page.

---

## 2. Marketing, claims & testimonials (the highest‑risk area)

Whop's **Community Guidelines** and **Earnings Terms** map directly onto **FTC
endorsement and advertising rules**. This is where a "money/results" brand most
often trips up. Your Shopify copy, testimonials section, and any affiliate
program must follow all of the below.

### 2.1 Earnings & results claims

- Claims must be **truthful and substantiated** — keep a reasonable basis on
  file for any income/results figure you publish.
- **Do not present atypical results as typical.** If you show a standout result,
  add a clear disclosure that it isn't representative.
- **Disclose material costs** when quoting gross income (net vs. gross).
- Add an **earnings/results disclaimer** ("results not guaranteed; individual
  results vary") near any performance claim.
- No fake scarcity, fake urgency, or artificially inflated engagement metrics.

### 2.2 Reviews & testimonials

- Must reflect **genuine** experiences; no false, misleading, or unsubstantiated
  reviews, and no fake reviews.
- **Disclose** any employment, free product, discount, or affiliate
  relationship behind a review (FTC requirement).
- Testimonials showing results must be **representative** or carry a clear
  "atypical result" disclosure.
- Keep out of review content: private info (phone/email/address), external
  links, referral codes, spammy symbols.

> **Repo note:** your theme's `sections/astheye-testimonials.liquid` is
> structurally fine — no claims are hardcoded. The compliance risk is entirely
> in the *text and quotes you enter into it*. Whatever testimonials you load
> must be real and, where they mention results, carry the disclosures above.

### 2.3 Affiliate / referral marketing (if you run one)

- Affiliates must promote **truthfully**, follow **FTC endorsement guidelines**,
  and **clearly disclose** near their link that they earn a commission.
- Affiliates **cannot claim ownership** of your products or pose as the brand.
- No misleading or false advertising by affiliates — you're expected to monitor
  and enforce this.

### 2.4 Advertising (Whop Ads Terms)

- Ads must not violate the prohibited‑products list, IP, privacy, or publicity
  rights.
- On third‑party platforms (Meta, Google, TikTok) you are **solely responsible**
  for each platform's own ad policies.
- If you use AI to generate ad copy, **you must review and approve** it — you own
  compliance for what you publish.
- Maintain an accurate, compliant **privacy policy on your site** (see §5).

---

## 3. Refunds, disputes & chargebacks

Whop's **Seller Terms** impose a hard financial‑health metric that is worth
adopting on Shopify because card networks judge you the same way.

- **Keep your dispute (chargeback) rate below 1%** on a rolling ~90‑day basis.
  Above that, Whop suspends/terminates and can withhold payouts.
- **No billing tricks:** no transaction splitting, micro‑billing, or nominal
  charges to dilute the dispute ratio; don't retry failed Amex auths >3× in 24h.
- Sellers bear chargeback costs (Whop charges ~$15/chargeback + fees). Valid
  refunds are returned in full including fees.
- **Reserves:** Whop may hold up to 100% of funds for new/high‑risk accounts.
  Negative balances accrue interest (~1.5%/mo) and are collectible.

**Buyer Terms** define the refund flow you should mirror:

- **Payment‑layer issues** (duplicate/unrecognized charge) → platform
  investigates and reverses, typically 3–5 business days.
- **Product/service issues** → governed by **your published refund policy**; if
  you approve, the reversal is processed.
- **EU/EEA/UK buyers** get a **14‑day right of withdrawal** — *except* digital
  content already downloaded/streamed **if** the buyer expressly agreed to
  immediate delivery and waived the withdrawal right at checkout.

**Shopify actions:**

1. Publish a **clear, specific Refund Policy** page (Shopify Settings → Policies).
2. For digital goods, add a **checkout consent**: "I agree to immediate access
   and waive my 14‑day withdrawal right" (use a checkout/cart notice or a
   required checkbox app).
3. Respond to disputes fast with evidence (delivery logs, access timestamps) to
   keep the dispute rate under 1%.
4. Never label anything non‑refundable in a way that overrides mandatory EU/UK
   consumer rights.

---

## 4. Youth safety & age gating

Whop's **Youth Safety Policy** (COPPA‑aligned) is strict:

- **Under 13:** blocked entirely.
- **13–17:** treated as minor accounts with extra protection; **cannot** access
  gambling, sports betting, dating, nicotine/casino/age‑restricted or sexually
  suggestive content; need **parental consent to purchase**; can't earn until a
  guardian's identity is verified.
- Predatory behavior → suspension and NCMEC reporting where applicable.

**Shopify actions:**

- If any product is age‑sensitive, add an **age‑gate** (theme age‑verification
  block or app) and state a minimum age in your Terms.
- Keep marketing and imagery non‑sexualized and not targeted at minors.
- Set your store's **Terms of Service** to require users to be 18+ (or 13+ with
  guardian consent) consistent with what you sell.

---

## 5. Privacy & data handling

From the **Privacy Policy** and **Developer API Terms**, the seller‑facing
obligations:

- You receive **customer data to fulfill orders** — that creates **your own**
  privacy duties toward those customers.
- Use customer data **only** to provide your service as described in **your
  published privacy policy**; **never sell/share** it without authorization.
- Honor **opt‑outs** from marketing email.
- If you integrate via API/app: obtain consent before accessing user data,
  **delete user data within 30 days** of uninstall/no‑longer‑needed, and
  **report breaches within 24 hours**.

**Shopify actions:**

1. Publish a **Privacy Policy** and **Cookie/Tracking notice** (Shopify auto‑
   generates a base one; customize it to be accurate about pixels/analytics).
2. Add a **cookie consent banner** (required for EU/UK visitors).
3. Configure marketing email with working **unsubscribe** and honor opt‑outs.
4. Limit customer data use to fulfillment + consented marketing only.

---

## 6. Developer / API integration (only if you build on Whop)

If you connect a Shopify app or backend to Whop's API:

- Use it **only** to integrate your own app; the license is revocable and
  limited.
- Respect **rate limits** (Whop sets them at its discretion).
- **Don't** reverse‑engineer, benchmark, bypass security, replicate Whop's core
  services, or build anything whose purpose is to **migrate users off Whop**.
- Follow the data rules in §5 (consent, 30‑day deletion, 24‑hour breach report,
  no selling user data).

*(The Spend Card terms cover a Whop‑issued card and are not relevant to a
Shopify storefront unless you use one for business spend — in which case follow
its "Prohibited Activities" list, which mirrors §1.)*

---

## 7. Launch checklist for the Shopify store

**Catalog**
- [ ] No prohibited‑category products (§1.1); regulated items have licensing on file (§1.2)
- [ ] No "lifetime/perpetual" labels; every product states a concrete access period (§1.3)
- [ ] Accurate, complete descriptions and pricing; total price shown before purchase

**Marketing & content**
- [ ] Earnings/results disclaimer near any performance claim (§2.1)
- [ ] Substantiation for every income/results figure kept on file
- [ ] Atypical results explicitly disclosed as atypical
- [ ] All testimonials genuine; incentivized ones disclosed (§2.2)
- [ ] Affiliate/referral disclosures + monitoring in place (§2.3)
- [ ] AI‑generated ad copy reviewed and approved before publishing (§2.4)

**Policies (Shopify Settings → Policies)**
- [ ] Refund Policy (clear, specific) (§3)
- [ ] Terms of Service (age requirement, access periods, prohibited use)
- [ ] Privacy Policy + cookie/tracking notice (§5)
- [ ] Shipping/delivery policy (for digital: delivery mechanism + access period)

**Checkout & consumer rights**
- [ ] Digital‑goods checkbox: immediate access + 14‑day withdrawal waiver (EU/UK) (§3)
- [ ] Subscriptions clearly disclose recurring charge + easy cancellation

**Trust & financial health**
- [ ] Age gate on any age‑sensitive product (§4)
- [ ] Cookie consent banner for EU/UK (§5)
- [ ] Dispute‑response process to hold chargeback rate < 1% (§3)
- [ ] Working email unsubscribe / opt‑out honored (§5)

**If integrating Whop's API (§6)**
- [ ] Consent screen before data access
- [ ] 30‑day data deletion on uninstall; 24‑hour breach reporting
- [ ] No user‑migration or benchmarking use

---

## 8. Highest‑risk pitfalls to avoid

1. **"Lifetime access"** on a course/community — an automatic Whop rejection.
2. **Unsubstantiated income claims / cherry‑picked testimonials** without an
   "atypical results" disclaimer — the #1 FTC and Whop enforcement trigger.
3. **Undisclosed affiliate/incentivized reviews.**
4. **Chargeback rate creeping over 1%** — leads to reserves, withheld payouts,
   termination.
5. **Selling a restricted category without licensing on file.**
6. **Weak/absent refund & privacy policies**, or ignoring EU/UK withdrawal
   rights.
7. **Marketing that reaches minors** for age‑restricted products.
