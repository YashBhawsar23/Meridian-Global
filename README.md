# Meridian Global Trade — Multilingual B2B Import/Export Website

A production-ready, SEO-optimized B2B import/export commodity trading web application built with **Astro 5**, **Tailwind CSS**, and **Astro Content Collections**.

---

## 📑 Table of Contents
1. [Project Overview & Key Architecture](#-project-overview--key-architecture)
2. [Quickstart & Development Commands](#-quickstart--development-commands)
3. [How to Edit Pages & Sections](#-how-to-edit-pages--sections)
4. [How to Add or Edit Products (Commodities)](#-how-to-add-or-edit-products-commodities)
5. [How to Add a New Language (e.g., French, German, Arabic)](#-how-to-add-a-new-language)
6. [How to Customize SEO & Meta Tags](#-how-to-customize-seo--meta-tags)
7. [Directory Structure Reference](#-directory-structure-reference)

---

## 🌐 Project Overview & Key Architecture

- **Framework:** Astro 5 (Static Site Generation)
- **Styling:** Tailwind CSS with trade-specific palette (Navy, Maritime Blues, Amber Gold, Emerald)
- **Content Management:** Astro Content Collections with strict Zod validation schema
- **SEO & Structured Data:** Automated XML sitemaps, canonical tags, alternate `hreflang` tags, OpenGraph cards, and Schema.org `Product` JSON-LD
- **Multilingual (i18n):** Default English (`/`, no prefix), Spanish (`/es/`), extensible to any number of locales.

---

## ⚡ Quickstart & Development Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production (outputs to ./dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

The development server runs locally at: **`http://localhost:4321/`**

---

## 🛠️ How to Edit Pages & Sections

The application uses a **View + Layout architecture**. This keeps templates DRY so that editing a page updates both the default English version and all language versions automatically.

### 1. Where Each Page Lives

All shared page views are located in `src/views/`:

| Page / Section | View File to Edit | URL Paths |
| :--- | :--- | :--- |
| **Homepage** (Hero, stats, featured commodities, trust strip) | `src/views/HomeView.astro` | `/` and `/es/` |
| **Commodities Catalog** (Filterable search grid) | `src/views/ProductsView.astro` | `/products` and `/es/products` |
| **Product Detail Page** (Specs table, assay breakdown, JSON-LD) | `src/views/ProductDetailView.astro` | `/products/[slug]` and `/es/products/[slug]` |
| **About & Compliance** (SGS/BV protocol, export licenses) | `src/views/AboutView.astro` | `/about` and `/es/about` |
| **Logistics & Ports** (FCL/LCL, ocean carriers, port table) | `src/views/CapabilitiesView.astro` | `/capabilities` and `/es/capabilities` |
| **RFQ Inquiry Form** (Quote form, parameter pre-selection) | `src/views/RfqView.astro` | `/rfq` and `/es/rfq` |

### 2. How to Edit Global Components

- **Navigation & Language Switcher:** Edit `src/components/Header.astro`
  - To change nav links, update the `navLinks` array.
  - To change contact numbers, update the top utility bar (`desk@meridian-trade.com`, phone).
- **Footer, Accreditations & WhatsApp Button:** Edit `src/components/Footer.astro`
  - To update the WhatsApp number or pre-filled message, update `whatsAppUrl` in `Footer.astro`.
  - To change corporate registration numbers (EORI, FMC license), update the bio column.
- **Global Head & SEO Wrapper:** Edit `src/layouts/BaseLayout.astro`
  - Controls default fonts, favicon, OpenGraph defaults, and `<html lang="...">`.

---

## 📦 How to Add or Edit Products (Commodities)

All products are stored as individual Markdown files inside `src/content/products/`.

### 1. Adding a New Product

Create a new `.md` file in `src/content/products/` (e.g., `src/content/products/soybeans-non-gmo.md`).

Every file must include frontmatter matching the schema defined in `src/content/config.ts`:

```markdown
---
title: "Non-GMO Export Soybeans (Grade #2 Yellow)"
hsCode: "1201.90.00"
originCountry: "Brazil"
grade: "Grade 2 Yellow Soybeans (Export Standard)"
moq: "2 x 20ft FCL (50 Metric Tons) or Bulk Vessel (25,000 MT)"
incoterms:
  - "FOB"
  - "CIF"
  - "CFR"
packaging:
  - "50kg Polypropylene Woven Bags"
  - "1,000kg Jumbo Bags (FIBC)"
  - "Bulk Sea Container with Dry Liner"
loadingPorts:
  - "Port of Santos (BRSSZ)"
  - "Port of Paranaguá (BRPNG)"
certifications:
  - "Non-GMO Project Verified"
  - "SGS Weight & Quality Assayed"
  - "Phytosanitary Clean"
  - "ISO 22000"
featuredImage: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=80"
metaDescription: "Bulk exporter of Brazilian Non-GMO Yellow Soybeans. Protein min 38%, moisture max 13.5%, oil min 18.5%, SGS inspected at load port."
category: "Agro Commodities & Grains"
harvestSeason: "February - June"
supplyAbility: "100,000 Metric Tons / Month"
paymentTerms:
  - "100% Irrevocable Confirmed L/C at Sight"
  - "T/T (30% Deposit, 70% against B/L copy)"
---

### Commodity Overview
Detailed overview of the product, farming source, harvest processing, and purity control.

### Chemical & Physical Specifications

| Parameter | Specification Standard | Method / Assay |
| :--- | :--- | :--- |
| **Protein Content** | Min 38.0% | AOAC 990.03 |
| **Moisture** | Max 13.5% | ISO 665 |
| **Oil Content** | Min 18.5% | ISO 659 |
| **Foreign Matter** | Max 1.0% | Visual / Sieve |

### Container Loading & Shipping Protocol
Notes regarding stowage, container desiccants, and oceanic route transit times.
```

### 2. What Happens Automatically:
- Astro automatically creates `/products/soybeans-non-gmo` (English) and `/es/products/soybeans-non-gmo` (Spanish).
- It generates the Schema.org `Product` JSON-LD tag with the HS code, MOQ, and incoterms.
- It appears in the catalog search filter grid on `/products`.
- It is automatically added to the RFQ dropdown selector and sitemap.

---

## 🌍 How to Add a New Language

The site currently supports **English (`en`)** and **Spanish (`es`)**. Follow these 3 simple steps to add any other language (e.g., **French (`fr`)**, **Portuguese (`pt`)**, or **German (`de`)**):

### Step 1: Update Astro i18n Configuration
Open [`astro.config.mjs`](file:///e:/Import%20Export%202/astro.config.mjs) and add the locale code to `locales`:

```javascript
export default defineConfig({
  site: 'https://example-trade.com',
  integrations: [tailwind(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'], // <-- Add 'fr'
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

### Step 2: Add Translations in `src/i18n/`
Open [`src/i18n/translations.ts`](file:///e:/Import%20Export%202/src/i18n/translations.ts):

1. Add your language to `languages`:
   ```typescript
   export const languages = {
     en: 'English',
     es: 'Español',
     fr: 'Français', // <-- Add here
   } as const;
   ```
2. Add the corresponding dictionary in `translations.fr = { ... }` (copy the `en` or `es` structure and translate the text strings).

### Step 3: Register the Locale in Static Paths
Open the files inside `src/pages/[lang]/` and add your locale code to `getStaticPaths`:
- `src/pages/[lang]/index.astro`
- `src/pages/[lang]/products/index.astro`
- `src/pages/[lang]/products/[slug].astro`
- `src/pages/[lang]/about.astro`
- `src/pages/[lang]/capabilities.astro`
- `src/pages/[lang]/rfq.astro`

Simply update the returned list:
```typescript
export function getStaticPaths() {
  return [
    { params: { lang: 'en' } },
    { params: { lang: 'es' } },
    { params: { lang: 'fr' } }, // <-- Add here
  ];
}
```

That's it! Astro will now automatically generate `/fr/`, `/fr/products`, `/fr/about`, `/fr/capabilities`, `/fr/rfq`, and add `<link rel="alternate" hreflang="fr" ...>` across all pages.

---

## 🔍 How to Customize SEO & Meta Tags

### 1. Site Domain & Canonical URL
To change the production domain from `https://example-trade.com` to your real domain:
1. Update `site` in `astro.config.mjs`:
   ```javascript
   site: 'https://your-custom-domain.com'
   ```
2. Update the sitemap URL in `public/robots.txt`:
   ```text
   User-agent: *
   Allow: /

   Sitemap: https://your-custom-domain.com/sitemap-index.xml
   ```

### 2. OpenGraph Images & Social Previews
- The default OpenGraph image is set in `src/layouts/BaseLayout.astro`.
- For specific products, the product's `featuredImage` from markdown frontmatter is automatically used for social media embeds on LinkedIn, WhatsApp, Facebook, and X (Twitter).

---

## 📂 Directory Structure Reference

```text
├── public/
│   ├── favicon.svg              # Maritime globe brand icon
│   └── robots.txt               # Directs crawlers to the sitemap index
├── src/
│   ├── content/
│   │   ├── config.ts            # Zod validation schema for commodities
│   │   └── products/            # Markdown products (Cardamom, Sugar, Copper)
│   ├── components/
│   │   ├── Header.astro         # Sticky nav, mobile drawer, EN/ES toggle, RFQ button
│   │   └── Footer.astro         # Trust badges (SGS, ISO), legal, floating WhatsApp
│   ├── i18n/
│   │   ├── translations.ts      # Multilingual dictionaries (EN, ES)
│   │   └── utils.ts             # Language extractor, path resolver, hreflang generator
│   ├── layouts/
│   │   └── BaseLayout.astro     # Core HTML, meta tags, hreflangs, JSON-LD schema
│   ├── views/                   # Shared templates for all languages
│   │   ├── HomeView.astro       # Hero, KPI metrics, featured cards, RFQ banner
│   │   ├── ProductsView.astro   # Search input & category filter pills
│   │   ├── ProductDetailView.astro # Specifications table, markdown content render
│   │   ├── AboutView.astro      # 4-stage quality protocol, export licenses
│   │   ├── CapabilitiesView.astro # Ports guide, FCL/LCL, carrier alliances
│   │   └── RfqView.astro        # Inquiry form with auto-fill query params
│   └── pages/
│       ├── [lang]/              # Dynamic multilingual routes (/es/, /es/products, etc.)
│       └── *.astro              # Default locale root routes (/, /products, /rfq, etc.)
├── astro.config.mjs             # Tailwind, sitemap & i18n configuration
├── tailwind.config.mjs          # Brand palette & typography configuration
└── package.json                 # Dependencies & scripts
```

---

## 🤝 Need Help?
- **Astro Documentation:** [https://docs.astro.build](https://docs.astro.build)
- **Tailwind CSS Documentation:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
