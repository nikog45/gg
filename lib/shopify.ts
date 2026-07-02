// Shopify Admin API client.
// Auth uses the client-credentials grant: we exchange client_id + client_secret
// for a short-lived access_token (~24h) and cache it in memory. The shpat_ token
// shown in newer Shopify admin UIs is hidden, so we never rely on it.

const API_VERSION = "2025-01";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name} in .env.local`);
  return v;
}

export function storeDomain(): string {
  return env("SHOPIFY_STORE_DOMAIN").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function storeHandle(): string {
  return storeDomain().replace(/\.myshopify\.com$/, "");
}

let cachedToken: { token: string; scope: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<{ token: string; scope: string }> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return { token: cachedToken.token, scope: cachedToken.scope };
  }
  const res = await fetch(`https://${storeDomain()}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env("SHOPIFY_CLIENT_ID"),
      client_secret: env("SHOPIFY_CLIENT_SECRET"),
      grant_type: "client_credentials",
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Shopify token exchange failed (HTTP ${res.status}). ` +
        `Check SHOPIFY_STORE_DOMAIN / SHOPIFY_CLIENT_ID / SHOPIFY_CLIENT_SECRET, and make sure the app is INSTALLED on the store. ${body.slice(0, 300)}`
    );
  }
  const data = (await res.json()) as { access_token: string; expires_in?: number; scope?: string };
  const ttlMs = ((data.expires_in ?? 86400) - 300) * 1000; // refresh 5 min early
  cachedToken = {
    token: data.access_token,
    scope: data.scope ?? "",
    expiresAt: Date.now() + ttlMs,
  };
  return { token: cachedToken.token, scope: cachedToken.scope };
}

export async function shopifyGraphQL<T = any>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const { token } = await getAccessToken();
  const res = await fetch(`https://${storeDomain()}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`Shopify GraphQL HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors).slice(0, 500)}`);
  }
  return json.data as T;
}

export function hasThemeScopes(scope: string): boolean {
  return scope.includes("read_themes") && scope.includes("write_themes");
}

// ---------- Themes ----------

export type ThemeInfo = { id: string; numericId: string; name: string; role: string };

export async function listThemes(): Promise<ThemeInfo[]> {
  const data = await shopifyGraphQL<{ themes: { nodes: { id: string; name: string; role: string }[] } }>(
    `query { themes(first: 50) { nodes { id name role } } }`
  );
  return data.themes.nodes.map((t) => ({
    id: t.id,
    numericId: t.id.split("/").pop() ?? "",
    name: t.name,
    role: t.role,
  }));
}

export function themeGid(): string {
  const id = env("SHOPIFY_THEME_ID").trim();
  return id.startsWith("gid://") ? id : `gid://shopify/OnlineStoreTheme/${id}`;
}

export function themeNumericId(): string {
  return themeGid().split("/").pop() ?? "";
}

export async function listThemeFiles(prefix: string): Promise<string[]> {
  // Pages through the theme's files and returns filenames starting with `prefix`.
  const names: string[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < 10; page++) {
    const data: any = await shopifyGraphQL(
      `query ($id: ID!, $cursor: String) {
        theme(id: $id) {
          files(first: 250, after: $cursor) {
            nodes { filename }
            pageInfo { hasNextPage endCursor }
          }
        }
      }`,
      { id: themeGid(), cursor }
    );
    const files = data.theme?.files;
    if (!files) break;
    for (const n of files.nodes) if (n.filename.startsWith(prefix)) names.push(n.filename);
    if (!files.pageInfo.hasNextPage) break;
    cursor = files.pageInfo.endCursor;
  }
  return names;
}

export async function getThemeFile(filename: string): Promise<string | null> {
  const data: any = await shopifyGraphQL(
    `query ($id: ID!, $filenames: [String!]) {
      theme(id: $id) {
        files(filenames: $filenames, first: 1) {
          nodes { filename body { ... on OnlineStoreThemeFileBodyText { content } } }
        }
      }
    }`,
    { id: themeGid(), filenames: [filename] }
  );
  const node = data.theme?.files?.nodes?.[0];
  return node?.body?.content ?? null;
}

export async function writeThemeFile(filename: string, content: string): Promise<void> {
  const data: any = await shopifyGraphQL(
    `mutation ($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
      themeFilesUpsert(themeId: $themeId, files: $files) {
        upsertedThemeFiles { filename }
        userErrors { field message }
      }
    }`,
    { themeId: themeGid(), files: [{ filename, body: { type: "TEXT", value: content } }] }
  );
  const errs = data.themeFilesUpsert?.userErrors;
  if (errs?.length) throw new Error(`Theme file write failed: ${JSON.stringify(errs)}`);
}

// ---------- Products ----------

export type CreatedProduct = {
  id: string;
  legacyId: string;
  handle: string;
  variantId: string;
  adminUrl: string;
};

export async function createDraftProduct(input: {
  title: string;
  descriptionHtml: string;
  tags: string[];
  vendor?: string;
  productType?: string;
  seoTitle?: string;
  seoDescription?: string;
  imageUrls: string[];
  price?: string;
}): Promise<CreatedProduct> {
  const media = input.imageUrls.map((url) => ({
    originalSource: url,
    mediaContentType: "IMAGE",
  }));
  const data: any = await shopifyGraphQL(
    `mutation ($product: ProductCreateInput!, $media: [CreateMediaInput!]) {
      productCreate(product: $product, media: $media) {
        product {
          id
          legacyResourceId
          handle
          variants(first: 1) { nodes { id } }
        }
        userErrors { field message }
      }
    }`,
    {
      product: {
        title: input.title,
        descriptionHtml: input.descriptionHtml,
        status: "DRAFT",
        tags: input.tags,
        vendor: input.vendor || undefined,
        productType: input.productType || undefined,
        seo: { title: input.seoTitle || input.title, description: input.seoDescription || "" },
      },
      media,
    }
  );
  const errs = data.productCreate?.userErrors;
  if (errs?.length) throw new Error(`productCreate failed: ${JSON.stringify(errs)}`);
  const p = data.productCreate.product;
  const variantId = p.variants.nodes[0]?.id;

  if (input.price && variantId) {
    const upd: any = await shopifyGraphQL(
      `mutation ($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          userErrors { field message }
        }
      }`,
      { productId: p.id, variants: [{ id: variantId, price: input.price }] }
    );
    const vErrs = upd.productVariantsBulkUpdate?.userErrors;
    if (vErrs?.length) throw new Error(`Price update failed: ${JSON.stringify(vErrs)}`);
  }

  return {
    id: p.id,
    legacyId: p.legacyResourceId,
    handle: p.handle,
    variantId,
    adminUrl: `https://admin.shopify.com/store/${storeHandle()}/products/${p.legacyResourceId}`,
  };
}

export async function setProductTemplateSuffix(productId: string, suffix: string): Promise<void> {
  const data: any = await shopifyGraphQL(
    `mutation ($input: ProductInput!) {
      productUpdate(input: $input) {
        product { id templateSuffix }
        userErrors { field message }
      }
    }`,
    { input: { id: productId, templateSuffix: suffix } }
  );
  const errs = data.productUpdate?.userErrors;
  if (errs?.length) throw new Error(`templateSuffix update failed: ${JSON.stringify(errs)}`);
}

// ---------- Files (shop images for theme sections) ----------

// Uploads images to Shopify Files and returns theme references like
// shopify://shop_images/<filename> once each file is READY.
export async function uploadImagesToFiles(urls: string[]): Promise<string[]> {
  if (!urls.length) return [];
  const data: any = await shopifyGraphQL(
    `mutation ($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files { id fileStatus }
        userErrors { field message }
      }
    }`,
    { files: urls.map((url) => ({ originalSource: url, contentType: "IMAGE" })) }
  );
  const errs = data.fileCreate?.userErrors;
  if (errs?.length) throw new Error(`fileCreate failed: ${JSON.stringify(errs)}`);
  const ids: string[] = data.fileCreate.files.map((f: any) => f.id);

  const refs: string[] = [];
  const deadline = Date.now() + 90_000;
  const pending = new Set(ids);
  const urlById = new Map<string, string>();

  while (pending.size && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 2000));
    const nodes: any = await shopifyGraphQL(
      `query ($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on MediaImage { id fileStatus image { url } }
        }
      }`,
      { ids: [...pending] }
    );
    for (const n of nodes.nodes ?? []) {
      if (!n) continue;
      if (n.fileStatus === "READY" && n.image?.url) {
        urlById.set(n.id, n.image.url);
        pending.delete(n.id);
      } else if (n.fileStatus === "FAILED") {
        pending.delete(n.id);
      }
    }
  }

  for (const id of ids) {
    const cdnUrl = urlById.get(id);
    if (!cdnUrl) continue;
    const filename = new URL(cdnUrl).pathname.split("/").pop();
    if (filename) refs.push(`shopify://shop_images/${decodeURIComponent(filename)}`);
  }
  return refs;
}

export function previewUrl(handle: string): string {
  // Theme-editor deep link — renders the product page even while the product is a DRAFT.
  return `https://admin.shopify.com/store/${storeHandle()}/themes/${themeNumericId()}/editor?previewPath=/products/${handle}`;
}
