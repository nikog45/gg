# Rebranding: marimeex.cz → Outlet & doprodej skladu

Kompletní plán přechodu z „Marimex" na outletový obchod s doprodejem skladu
(sleva až **70 %**). Interaktivní vizuální verze byla vytvořena jako Artifact;
tento soubor je referenční kopie k ručnímu provedení.

---

## ✓ Už hotovo přímo v Shopify

- Vytvořena kolekce **„Výprodej – Vše musí pryč"** (`/vyprodej-vse-musi-pryc`)
  se všemi 8 produkty.
- Opraven rozbitý název produktu → **„Intex Ultra XTR – Bazén 488 × 122 cm
  s pískovou filtrací"** (dříve obsahoval „now this in czech").
- Smazán testovací produkt **„Test"**.

---

## 01 · Nový název

Nový název má říct **co** prodáváte (bazény & wellness) a **za jakých podmínek**
(outlet / doprodej).

| Název | Doména | Poznámka |
|---|---|---|
| **AquaOutlet** ⭐ *doporučeno* | aquaoutlet.cz | Kategorie + pozice v jednom slově, zapamatovatelné, silné pro logo i reklamu. |
| Bazén Outlet | bazen-outlet.cz | Maximální jasnost pro CZ zákazníky a SEO. Bezpečná volba. |
| Doprodej Bazénů | doprodej-bazenu.cz | Čistě výprodejová/SEO hra. Silná urgence, slabší dlouhodobá značka. |
| Vše do bazénu! | vsedobazenu.cz | Hravá dvojznačnost, zapamatovatelné, méně jasně outletové. |

---

## 02 · Vizuální identita

Odklon od „důvěryhodné modré" k **outletové energii**: vysoký kontrast,
cenovkově červený akcent, modrá jako odkaz na vodu/kvalitu, teplá papírová
neutrální barva.

| Role | Hex |
|---|---|
| Cenovka (akcent) | `#DC3220` |
| Voda / modrá | `#123A54` |
| Zlatá cenovka | `#E39C2C` |
| Papír / pozadí | `#F6F3ED` |
| Text / inkoust | `#14202A` |

- **Logo:** tučný název na červené „cenovce" s dírkou.
- **Typografie:** silný bezpatkový font, verzálky, těsné prostrkání pro nadpisy;
  čitelný běžný text; zarovnaná čísla u cen.
- **Tón:** přímý, naléhavý, upřímný — „Končíme. Ceny dolů. Poslední kusy."

---

## 03 · Struktura obchodu

**Navigace / menu:**
- Výprodej — vše → `/vyprodej-vse-musi-pryc` *(hotovo)*
- Bazény → `/bazeny` *(vytvořit)*
- Vířivky → `/virivky` *(vytvořit)*
- Příslušenství & roboti → `/prislusenstvi` *(vytvořit)*
- Jak doprodej funguje → `/pages/doprodej` *(stránka)*

**Kolekce:**
- Výprodej – Vše musí pryč *(hotovo, 8 produktů)*
- Bazény *(smart: typ „Bazén")*
- Vířivky *(smart: název obsahuje „vířiv")*
- Poslední kusy *(nízké skladem)*
- „Kolekce" (stará) → přejmenovat/sloučit

**Sekce úvodní stránky (shora dolů):**
1. Oznamovací lišta (červená) — „Ukončujeme provoz — sleva až 70 %"
2. Hero — velký nadpis + CTA „Do výprodeje" + odpočet
3. Kolekce Výprodej — mřížka s přeškrtnutou cenou
4. Odznaky důvěry — doprava zdarma, oficiální distributor, skladem ihned
5. „Jak doprodej funguje" — vysvětlení + FAQ

---

## 04 · Texty (česky, k vložení)

**Oznamovací lišta:**
> UKONČUJEME PROVOZ · SLEVY AŽ 70 % · SKLADEM V OMEZENÉM MNOŽSTVÍ · DOPRAVA ZDARMA

**Hero — nadpis:**
> Končíme. Vše musí pryč. Bazény a vířivky se slevou až 70 %.

**Hero — podtitul:**
> Doprodáváme celý sklad. Po vyprodání zásob definitivně zavíráme — poslední
> šance pořídit značkové bazény za zlomek ceny.

**Tlačítko:** Zobrazit výprodej →

**Odznak na produktu:** −70 % · Poslední kusy · Skladem ihned

**Urgence u produktu:** Doprodej skladu — po vyprodání se již nebude doplňovat.

**Patička / o nás:**
> Po letech provozu ukončujeme činnost. Děkujeme za přízeň — zbývající zásoby
> doprodáváme se slevou až 70 %, dokud vydrží.

---

## 05 · Slevová strategie — 70 %

Původní cenu nastavte jako **„Porovnávací cena" (compare-at)** (zobrazí se
přeškrtnutá) a hlavní cenu na **30 %** původní.

**Vzorec:** `nová = původní × 0,30`

| Produkt | Původní (přeškrtnout) | Nová (−70 %) |
|---|--:|--:|
| Intex Simple Spa | 2 399 Kč | 719 Kč |
| Intex Ultra XTR | 2 399 Kč | 719 Kč |
| WYBOT C1 robot | 2 199 Kč | 659 Kč |
| MSPA Pebble | 2 179 Kč | 653 Kč |
| Marimex Orlando 4,57 | 2 399 Kč | 719 Kč |

> ⚠ **Důvěryhodnost:** Aby sleva 70 % působila věrohodně a byla v souladu
> s pravidly, compare-at cena by měla odpovídat **skutečné tržní ceně**.
> Současné ceny ~2 200–2 400 Kč vypadají jako placeholder — u reálných bazénů
> bývá běžná cena výrazně vyšší. Před spuštěním zkontrolujte.

**Slevový kód (navíc):** `SBOHEM10` (dalších 10 % na rozloučenou, s koncovým
datem). Alternativy: `KONCIME`, `POSLEDNI70`, `VSEPRYC`.

---

## 06 · Postup krok za krokem

1. ✓ **Kolekce výprodeje + úklid produktů** — hotovo.
2. **Přejmenovat obchod** — Nastavení → Údaje o obchodě. Volitelně nová doména,
   marimeex.cz jako přesměrování.
3. **Nové logo a favicon** — barvy motivu: akcent `#DC3220`, pozadí `#F6F3ED`.
4. **Oznamovací lišta + hero** — Motiv → Upravit; vložit texty ze sekce 04.
5. **Nastavit ceny −70 %** — Produkty; původní → compare-at, hlavní × 0,30.
6. **Kategorie kolekce** — Bazény, Vířivky, Příslušenství; nastavit menu.
7. **Slevový kód** — Slevy; např. SBOHEM10 s koncovým datem.
8. **Stránka „Jak doprodej funguje" + FAQ** — proč, dokdy, doprava, záruka.
9. **Spustit a oznámit** — e-mail, sociální sítě, reklama.
