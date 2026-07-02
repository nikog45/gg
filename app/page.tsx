"use client";

import { useEffect, useState } from "react";

type Status = "importing" | "ready" | "publishing" | "done" | "error";

type ProductCard = {
  key: string;
  sourceUrl: string;
  status: Status;
  error?: string;
  title: string;
  descriptionHtml: string;
  price: string;
  currency?: string | null;
  tags: string;
  vendor?: string;
  productType?: string;
  seoTitle?: string;
  seoDescription?: string;
  language: string;
  images: string[];
  adminUrl?: string;
  previewUrl?: string;
  pageWarning?: string;
};

const LANGUAGES = ["Greek", "English", "German", "French", "Spanish", "Italian", "Dutch", "Portuguese", "Swedish"];

export default function Dashboard() {
  const [urls, setUrls] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [cards, setCards] = useState<ProductCard[]>([]);
  const [importing, setImporting] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const update = (key: string, patch: Partial<ProductCard>) =>
    setCards((prev) => prev.map((c) => (c.key === key ? { ...c, ...patch } : c)));

  async function importAll() {
    const list = urls.split("\n").map((u) => u.trim()).filter((u) => /^https?:\/\//.test(u));
    if (!list.length) return alert("Paste at least one product URL (must start with http)");
    setImporting(true);
    setUrls("");

    // Protected sites take ~30-80s each — run the batch sequentially.
    for (const url of list) {
      const key = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setCards((prev) => [
        ...prev,
        { key, sourceUrl: url, status: "importing", title: "", descriptionHtml: "", price: "", tags: "", language, images: [] },
      ]);
      try {
        const res = await fetch("/api/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, language }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        update(key, {
          status: "ready",
          title: data.title,
          descriptionHtml: data.descriptionHtml,
          price: data.price ?? "",
          currency: data.currency,
          tags: (data.tags ?? []).join(", "),
          vendor: data.vendor,
          productType: data.productType,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          images: data.images ?? [],
        });
      } catch (e: any) {
        update(key, { status: "error", error: e.message });
      }
    }
    setImporting(false);
  }

  async function createAll() {
    setPublishing(true);
    for (const card of cards.filter((c) => c.status === "ready")) {
      update(card.key, { status: "publishing" });
      try {
        const res = await fetch("/api/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: card.title,
            descriptionHtml: card.descriptionHtml,
            price: card.price,
            tags: card.tags.split(",").map((t) => t.trim()).filter(Boolean),
            vendor: card.vendor,
            productType: card.productType,
            seoTitle: card.seoTitle,
            seoDescription: card.seoDescription,
            images: card.images,
            language: card.language,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        update(card.key, {
          status: "done",
          adminUrl: data.adminUrl,
          previewUrl: data.previewUrl,
          pageWarning: data.pageWarning,
        });
      } catch (e: any) {
        update(card.key, { status: "error", error: e.message });
      }
    }
    setPublishing(false);
  }

  const readyCount = cards.filter((c) => c.status === "ready").length;

  return (
    <main>
      <h1>Shopify Product Importer</h1>
      <p className="subtitle">Paste product URLs → Claude rewrites the copy → drafts + custom pages in your store.</p>

      <SettingsPanel />

      <div className="panel">
        <label htmlFor="urls">Product URLs (one per line)</label>
        <textarea
          id="urls"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder={"https://example.com/products/thing-one\nhttps://another-shop.com/products/thing-two"}
        />
        <div className="row top">
          <label htmlFor="lang" style={{ margin: 0 }}>Language:</label>
          <select id="lang" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: 180 }}>
            {LANGUAGES.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <button onClick={importAll} disabled={importing}>
            {importing ? "Importing…" : "Import all"}
          </button>
          {cards.length > 0 && (
            <>
              <button onClick={createAll} disabled={publishing || readyCount === 0}>
                {publishing ? "Creating…" : `Create all drafts (${readyCount})`}
              </button>
              <button className="danger-outline" onClick={() => setCards([])}>Clear all</button>
            </>
          )}
        </div>
        {importing && <p className="muted" style={{ marginTop: 10 }}>Protected sites can take 30–80 seconds each — imports run one at a time.</p>}
      </div>

      {cards.map((card) => (
        <Card key={card.key} card={card} update={update} remove={() => setCards((p) => p.filter((c) => c.key !== card.key))} />
      ))}
    </main>
  );
}

function Card({
  card,
  update,
  remove,
}: {
  card: ProductCard;
  update: (key: string, patch: Partial<ProductCard>) => void;
  remove: () => void;
}) {
  const editable = card.status === "ready";
  return (
    <div className="card">
      {card.images[0] ? <img className="thumb" src={card.images[0]} alt="" /> : <div className="thumb" />}
      <div className="body">
        <div className="meta">
          <span className={`badge ${card.status}`}>{card.status}</span>
          <span className="muted" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 380 }}>
            {card.sourceUrl}
          </span>
          <button className="small secondary" onClick={remove} style={{ marginLeft: "auto" }}>✕ remove</button>
        </div>

        {card.status === "importing" && <p className="muted">Scraping + rewriting with Claude…</p>}
        {card.error && <p className="error-text">{card.error}</p>}

        {(editable || card.status === "publishing" || card.status === "done") && (
          <>
            <input
              type="text"
              value={card.title}
              disabled={!editable}
              onChange={(e) => update(card.key, { title: e.target.value })}
              placeholder="Title"
            />
            <div className="row">
              <input
                type="text"
                value={card.price}
                disabled={!editable}
                onChange={(e) => update(card.key, { price: e.target.value })}
                placeholder="Price e.g. 49.99"
                style={{ width: 140 }}
              />
              {card.currency && <span className="muted">source currency: {card.currency}</span>}
            </div>
            <input
              type="text"
              value={card.tags}
              disabled={!editable}
              onChange={(e) => update(card.key, { tags: e.target.value })}
              placeholder="tags, comma, separated"
            />
            <textarea
              value={card.descriptionHtml}
              disabled={!editable}
              onChange={(e) => update(card.key, { descriptionHtml: e.target.value })}
              placeholder="Description (HTML)"
            />
            {card.images.length > 0 && (
              <div className="gallery">
                {card.images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    title={editable ? "Click to remove this image" : ""}
                    style={{ cursor: editable ? "pointer" : "default" }}
                    onClick={() =>
                      editable && update(card.key, { images: card.images.filter((_, j) => j !== i) })
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}

        {card.status === "done" && (
          <div className="links" style={{ marginTop: 10 }}>
            <a href={card.adminUrl} target="_blank" rel="noreferrer">Open in Shopify admin →</a>
            <a href={card.previewUrl} target="_blank" rel="noreferrer">Preview product page →</a>
            {card.pageWarning && <p className="warn-text">⚠ {card.pageWarning}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Page-builder settings panel ----------

function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const [themesInfo, setThemesInfo] = useState<any>(null);
  const [themesError, setThemesError] = useState<string>("");
  const [templates, setTemplates] = useState<string[]>([]);
  const [baseTemplate, setBaseTemplate] = useState<string>("");
  const [sections, setSections] = useState<{ id: string; type: string; blockTypes: string[] }[]>([]);
  const [fillTypes, setFillTypes] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((s) => {
      if (s.baseTemplate) setBaseTemplate(s.baseTemplate);
      setFillTypes(new Set(s.fillSectionTypes ?? []));
    });
  }, []);

  async function connect() {
    setThemesError("");
    try {
      const r = await fetch("/api/themes");
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setThemesInfo(data);
      const t = await fetch("/api/template");
      const tData = await t.json();
      if (!t.ok) throw new Error(tData.error);
      setTemplates(tData.templates ?? []);
    } catch (e: any) {
      setThemesError(e.message);
    }
  }

  async function loadSections(file: string) {
    setBaseTemplate(file);
    setSections([]);
    if (!file) return;
    const r = await fetch(`/api/template?file=${encodeURIComponent(file)}`);
    const data = await r.json();
    if (r.ok) setSections(data.sections ?? []);
  }

  async function save() {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ baseTemplate, fillSectionTypes: [...fillTypes] }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="panel">
      <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
        <summary>⚙️ Page builder settings (one-time setup)</summary>
        <div style={{ marginTop: 12 }}>
          <p className="muted">
            1) Check the Shopify connection and confirm the theme. 2) Pick the base product template to clone
            per product. 3) Tick the section types that should get product-specific generated content
            (leave the main product section, FAQ and app sections unticked).
          </p>
          <div className="row top">
            <button className="secondary" onClick={connect}>Check connection & list themes</button>
            {saved && <span className="muted">✓ saved</span>}
          </div>
          {themesError && <p className="error-text">{themesError}</p>}

          {themesInfo && (
            <div style={{ marginTop: 12 }}>
              {!themesInfo.themesOk && (
                <p className="error-text">
                  Your app token is missing theme permissions (read_themes / write_themes). Add the scopes in the
                  app configuration AND reinstall the app — a token only gets new scopes after reinstalling.
                </p>
              )}
              <p className="muted">Themes on your store (put the ID of your DUPLICATE theme in .env.local as SHOPIFY_THEME_ID):</p>
              {themesInfo.themes.map((t: any) => (
                <div key={t.id} className="checkline">
                  <span>
                    {t.numericId === String(themesInfo.configuredThemeId) ? "✅" : "•"} <strong>{t.name}</strong>{" "}
                    <code>{t.numericId}</code> <span className="muted">({t.role})</span>
                  </span>
                </div>
              ))}

              <label>Base product template</label>
              <select value={baseTemplate} onChange={(e) => loadSections(e.target.value)}>
                <option value="">— choose —</option>
                {templates.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>

              {sections.length > 0 && (
                <>
                  <label>Sections to fill per product</label>
                  {sections.map((s) => (
                    <div key={s.id} className="checkline">
                      <input
                        type="checkbox"
                        checked={fillTypes.has(s.type)}
                        onChange={(e) => {
                          const next = new Set(fillTypes);
                          e.target.checked ? next.add(s.type) : next.delete(s.type);
                          setFillTypes(next);
                        }}
                      />
                      <span>
                        <code>{s.type}</code>
                        {s.blockTypes.length > 0 && <span className="muted"> — blocks: {s.blockTypes.join(", ")}</span>}
                      </span>
                    </div>
                  ))}
                  <div className="row top">
                    <button onClick={save}>Save settings</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
