# Shopify Product Importer + Custom Page Builder

A local dashboard that:

1. takes a list of product URLs (one per line) + a language,
2. scrapes each product (title, description, price, full image gallery — even from bot-protected retailers),
3. rewrites the copy with Claude in your language (title, description, tags, SEO),
4. creates each product in your Shopify store as a **DRAFT**,
5. clones a designed product template from your theme, fills it with that product's generated text + images, and assigns it to the product,
6. gives you an admin link + a theme-editor preview link so you review and publish.

**Everything below is written for someone who has never used a terminal. Follow it top to bottom.**

---

## Part 0 — Install the two programs you need (once)

1. **Node.js** — go to https://nodejs.org and click the big green **LTS** download button. Open the downloaded file and click Next/Next/Install.
2. **The code** — if you're reading this on GitHub: click the green **Code** button → **Download ZIP** → unzip it somewhere easy, like your Desktop.

### Opening a terminal in the project folder

- **Windows:** open the unzipped folder in File Explorer, click the address bar at the top, type `cmd`, press Enter.
- **Mac:** open the **Terminal** app (press Cmd+Space, type "terminal", Enter), type `cd ` (with a space), drag the unzipped folder onto the Terminal window, press Enter.

Then type this and press Enter (it downloads the app's building blocks — takes a minute):

```
npm install
```

---

## Part 1 — Your secret keys (the `.env.local` file)

In the project folder there is a file called `.env.local.example`. Make a **copy** of it named exactly `.env.local` (note the dot at the start). Open it in any text editor (Notepad / TextEdit). You will fill in 5 values:

### 1. Anthropic API key
1. Go to https://console.anthropic.com/settings/keys (create an account if needed).
2. Click **Create Key**, give it any name, click Create.
3. Copy the key that starts with `sk-ant-` **immediately** (it's shown only once).
4. Paste it after `ANTHROPIC_API_KEY=` in `.env.local`.

### 2. Shopify store domain
1. Log into your Shopify admin. Look at your browser's address bar — it looks like `https://admin.shopify.com/store/my-cool-store/...`.
2. Your domain is that store name + `.myshopify.com`, e.g. `my-cool-store.myshopify.com`.
3. Put it after `SHOPIFY_STORE_DOMAIN=`.

### 3. Shopify custom app (client id + secret)
1. In Shopify admin: **Settings** (bottom-left gear) → **Apps and sales channels**.
2. Click **Develop apps** (top right). If asked, click **Allow custom app development**.
3. Click **Create an app**, name it e.g. `Product Importer`, click **Create app**.
4. Open the **Configuration** tab → next to *Admin API integration* click **Configure**.
5. In the scopes search box, find and tick these four:
   - `write_products`
   - `read_products`
   - `read_themes`
   - `write_themes`
6. Click **Save**.
7. Open the **API credentials** tab → click **Install app** → confirm.
8. On the same tab copy:
   - **API key** → paste after `SHOPIFY_CLIENT_ID=`
   - **API secret key** (starts with `shpss_`) → paste after `SHOPIFY_CLIENT_SECRET=`

> ⚠️ **If you ever add or change scopes later, you MUST reinstall the app** (API credentials tab → uninstall → install). Otherwise the token silently keeps the old permissions.

The app exchanges this id + secret for an access token automatically (client-credentials grant) — you never need the hidden `shpat_` token.

### 4. ScrapingBee key (optional but recommended)
Some retailer sites block robots. ScrapingBee gets around that.
1. Go to https://app.scrapingbee.com and sign up — the free trial gives **1,000 requests, no credit card**.
2. On the dashboard, copy your **API Key**.
3. Paste it after `SCRAPINGBEE_API_KEY=`.

### 5. Theme ID (do this after Part 2 below)

---

## Part 2 — Duplicate your theme (so we build safely on a copy)

1. Shopify admin → **Online Store** → **Themes**.
2. On your current/live theme, click the **⋯** (three dots) button → **Duplicate**.
3. Wait for the copy (named like "Copy of …") to appear under "Theme library".

Now find its ID:

1. In the terminal, in the project folder, run: `npm run dev`
2. Open http://localhost:3000 in your browser.
3. Open **⚙️ Page builder settings** → click **Check connection & list themes**.
4. You'll see all your themes with their ID numbers. Copy the ID of the **duplicate** ("Copy of …").
5. Paste it after `SHOPIFY_THEME_ID=` in `.env.local`.
6. In the terminal press `Ctrl+C` to stop the app, then run `npm run dev` again (it must restart to read the new value).

---

## Part 3 — One-time page-builder setup

Your theme needs a **designed product template** with extra sections after the main product section (e.g. a hero image+text, a media+text block, a feature-columns block, a reviews carousel). If you don't have one yet, build it once in the theme editor on your duplicate theme (Online Store → Themes → duplicate theme → Customize → at the top choose Products → Create template).

Then in the dashboard:

1. Open **⚙️ Page builder settings** → **Check connection & list themes**.
2. Under *Base product template*, pick your designed template (e.g. `templates/product.custom.json`).
3. Tick the section types that should be rewritten per product (the hero, media+text, columns, reviews). **Leave the main product section and FAQ/app sections unticked.**
4. Click **Save settings**.

---

## Part 4 — Daily use

1. `npm run dev` → open http://localhost:3000
2. Paste product URLs (one per line), pick your language, click **Import all**.
   - Do a **single URL first** as a test before pasting a big batch.
   - Bot-protected sites take 30–80 seconds each; imports run one at a time.
3. Review each card — edit title/price/tags/description, click an image to remove it.
4. Click **Create all drafts**.
5. Each card gets two links:
   - **Open in Shopify admin** — the draft product.
   - **Preview product page** — a theme-editor link that renders the custom page even while the product is a draft (draft products 404 on the normal storefront).
6. Happy? Set the product to **Active** in Shopify admin to publish it.

### Going live
The per-product page templates are written to your **duplicate** theme. To take them live either **publish that theme** (Online Store → Themes → ⋯ on the duplicate → Publish), or point `SHOPIFY_THEME_ID` at your live theme once you trust the output. The `templateSuffix` on a product applies across all themes automatically.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "token exchange failed" | Check domain / client id / secret in `.env.local`, and that the app is **installed** (API credentials tab). |
| "missing theme permissions" | Add `read_themes` + `write_themes` scopes, **Save**, then **reinstall the app**. |
| Import fails with "site blocks bots" | Add a `SCRAPINGBEE_API_KEY` to `.env.local` and restart. |
| Dev server errors with MODULE_NOT_FOUND | Stop it (Ctrl+C), delete the `.next` folder in the project, run `npm run dev` again. |
| Changed `.env.local` but nothing happened | Restart the dev server (Ctrl+C, then `npm run dev`). |

> ⚠️ Never run `npm run build` while `npm run dev` is running — it corrupts the `.next` folder and breaks the dev server.

**Never commit or share `.env.local` — it contains your secret keys.**
