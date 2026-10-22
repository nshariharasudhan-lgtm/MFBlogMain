# Streamline to Canonical Evergreen Investor Guides & SEO Redirection

A strategic overhaul of YieldNest's content architecture: removing transient and obsolete blog articles, establishing the **9 Canonical Evergreen Investor Guides** as the core educational foundation, implementing **301 redirects** for all deleted URLs to protect search equity, renaming navigation from **Blog** to **Investor Guides**, and regenerating static prerender assets and sitemaps.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following product decisions were confirmed during the planning consultation and are incorporated as core requirements:
> - **Content Retention**: Retain strictly the 9 canonical evergreen investor guides answering fundamental *What*, *How*, and *Where* mutual fund questions.
> - **SEO & Traffic Preservation**: Implement HTTP 301 permanent redirects for all deleted and legacy blog article URLs to their corresponding interactive calculators, fund comparison dossiers, or topic hubs (zero 404 dead ends).
> - **Navigation Presentation**: Transition the primary top-bar navigation and footer hierarchy from "Blog" to "Investor Guides" (`/guides`), reinforcing YieldNest's positioning as an authoritative financial tools and educational reference platform.

---

### 1. Overview & Core Concept

- **What It Does**: Prunes secondary, dated, and non-canonical blog posts from the active publication database, listings, and sitemaps. Elevates the 9 foundational guides covering mutual fund fundamentals (What is MF, SIP, NAV, Expense Ratio, Direct vs Regular, Exit Load, CAGR/XIRR, Factsheet Reading, and Capital Gains Tax).
- **Target Audience / Persona**: Indian retail mutual fund investors seeking objective, timeless answers to foundational investing mechanics without dated market commentary or sponsored noise.
- **Key Value**: Streamlines user mental models, eliminates low-value crawl bloat, preserves accumulated domain authority and backlinks via targeted 301 redirects, and establishes a clean distinction between interactive tools (Calculators, Comparisons) and educational guides.

---

### 2. User Experience & Visual Design

- **Navigation (Top Bar Contract)**:
  - In accordance with the single-row Top Bar Contract, the primary navigation will feature:
    `Calculators` · `Fund Comparison` · `Investor Guides` · `Methodology` · `About`
  - Eliminates all remaining "Blog" labels across desktop masthead, mobile drawer, and investor command deck.
- **Investor Guides Directory (`/guides`)**:
  - Structured 3x3 editorial grid displaying the 9 canonical guides with clean unboxed metadata (reading time, question focus: *What / How / Why*, SEBI/AMFI regulatory compliance badge).
  - Quick-jump category filters: *Core Basics (What)*, *Mathematics & Returns (How)*, *Costs & Taxes (Where)*.
- **Homepage Integration**:
  - Preserves Section 3 ("Evergreen Investor Guides") with clean card typography, reading times, and direct deep-links.
  - Removes any legacy blog teasers or dated market trend snippets.
- **Article Reader & Cross-Linking**:
  - Each of the 9 guides links directly to relevant interactive calculators (e.g., NAV guide links to Factsheet reader; Expense Ratio guide links to Direct vs Regular Calculator; Tax guide links to Capital Gains Tax Estimator).

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Strict Evergreen Scope (9 Guides)**
  - *Chosen Approach*: Maintain strictly the 9 canonical evergreen guides:
    1. `what-is-a-mutual-fund-guide` (What Is a Mutual Fund? Complete Guide for Beginners)
    2. `what-is-sip-guide` (What Is SIP? How Systematic Investment Plans Work)
    3. `what-is-nav-in-mutual-funds` (What Is NAV in Mutual Funds? Valuation and Calculation Explained)
    4. `what-is-expense-ratio-impact-on-returns` (What Is Total Expense Ratio (TER) and How Does It Affect Returns?)
    5. `direct-vs-regular-mutual-funds-difference` (Direct vs Regular Mutual Funds: Key Differences and Expense Drag)
    6. `what-is-exit-load-in-mutual-funds` (What Is Exit Load in Mutual Funds? Cut-Off Periods and Calculation)
    7. `what-is-cagr-and-xirr-in-mutual-funds` (What Are CAGR and XIRR? How Mutual Fund Returns Are Calculated)
    8. `how-to-read-mutual-fund-factsheet-essential-metrics-guide` (How to Read a Mutual Fund Factsheet: Key Metrics Every Investor Must Check)
    9. `how-mutual-fund-capital-gains-are-taxed-equity-vs-debt` (Mutual Fund Capital Gains Tax in India: Equity vs Debt Rules)
  - *Why*: Maximizes timelessness, prevents content decay, and keeps maintenance overhead minimal.
  - *Alternatives Considered*: Retaining market trend commentary or year-stamped analyses was rejected because they decay quickly and distract from core financial utilities.

- **Decision 2: 301 Redirect Registry vs. 404/410 Removal**
  - *Chosen Approach*: Map every deleted article slug in `ARTICLE_REDIRECTS` (`src/lib/redirects.ts`) to its closest thematic tool or hub:
    - Comparison posts (e.g., *Quant Small Cap vs Nippon India Small Cap*) $\rightarrow$ `/compare/nippon-india-small-cap-vs-quant-small-cap`
    - Allocation & Category posts (e.g., *Mid-Cap vs Multi-Cap*, *NIFTY 50 Index Funds*) $\rightarrow$ `/compare` or `/calculators/direct-vs-regular`
    - Fixed deposit & real estate comparison posts $\rightarrow$ `/calculators/sip`
    - Safety & risk articles $\rightarrow$ `/hub/safety-and-risk`
    - Tax & inheritance articles $\rightarrow$ `/article/how-mutual-fund-capital-gains-are-taxed-equity-vs-debt`
  - *Why*: Protects domain authority, prevents Google Search Console soft-404 spikes, and routes landing page traffic directly into engaging interactive tools.

- **Decision 3: Server & Prerender Alignment**
  - *Chosen Approach*: Filter aggregation functions in `server.ts` and `scripts/prerender.ts` to strictly whitelist canonical evergreen guides. Clean legacy pre-rendered HTML files in `dist/article/` and regenerate `public/sitemap.xml` and `llms.txt`.
  - *Why*: Ensures search crawlers, social share bots, and LLM scrapers only discover active, canonical URLs.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          INCOMING HTTP REQUEST                          │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │    Express Middleware       │
                      │  (server.ts / redirects.ts) │
                      └──────────────┬──────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           │                                                   │
           ▼                                                   ▼
 ┌───────────────────┐                               ┌───────────────────┐
 │ /article/<slug>   │                               │ /article/<slug>   │
 │ Removed Post Slug │                               │ Canonical 9 Guide │
 └─────────┬─────────┘                               └─────────┬─────────┘
           │                                                   │
           ▼ HTTP 301                                          ▼ HTTP 200
 ┌───────────────────┐                               ┌───────────────────┐
 │ Canonical Target  │                               │ SSR Article View  │
 │ (/calculators/*,  │                               │ (Client Hydrates  │
 │  /compare/*, etc.)│                               │  ArticleReader)   │
 └───────────────────┘                               └───────────────────┘
                                     ▲
                                     │
                      ┌──────────────┴──────────────┐
                      │    Storage & Seed Layer     │
                      │ (seedData.ts / storage.ts)  │
                      │ Strictly 9 Canonical Guides │
                      └─────────────────────────────┘
```

#### Component & File Updates Mapping
1. **`src/lib/redirects.ts`**:
   - Add all 23 removed blog slugs to `ARTICLE_REDIRECTS` with contextual 301 destinations (`/compare`, `/calculators/sip`, `/hub/safety-and-risk`, etc.).
2. **`server.ts`**:
   - Update `getAllAggregatedArticles` to strictly serve only the canonical evergreen guides.
   - Clean up API endpoints (`/api/posts`) to return only the 9 guides.
   - Ensure 301 redirection triggers before any file lookup or 404 response.
3. **`scripts/prerender.ts`**:
   - Enforce canonical guide whitelist in `loadAllArticles()`.
   - Purge deprecated static article directories from `dist/article/`.
   - Regenerate `sitemap.xml`, `llms.txt`, and prerendered HTML pages.
4. **`src/lib/storage.ts` & `src/lib/seedData.ts`**:
   - Ensure local storage fallback and cache sync strictly honor the 9 evergreen guides.
5. **`src/components/Navbar.tsx` & `src/components/Footer.tsx`**:
   - Verify all link labels read "Investor Guides", pointing cleanly to `/guides`.
6. **`src/components/guides/GuidesIndexPage.tsx`**:
   - Ensure directory page cleanly showcases the 9 guides categorized by *What*, *How*, and *Where/Taxes*.

---

### 5. Verification & Validation Steps

1. **Compilation Check**: Run `compile_applet` and `lint_applet` to confirm zero TypeScript or bundling errors.
2. **Redirect Validation**:
   - Test `curl -I http://localhost:3000/article/mutual-funds-vs-fd-vs-sip-2026-analysis` $\rightarrow$ returns `HTTP 301 Moved Permanently` to `/calculators/sip`.
   - Test `curl -I http://localhost:3000/article/quant-small-cap-vs-nippon-india-small-cap-comparison` $\rightarrow$ returns `HTTP 301` to `/compare/nippon-india-small-cap-vs-quant-small-cap`.
3. **Article Verification**:
   - Test `curl -s http://localhost:3000/api/posts | jq length` $\rightarrow$ exactly 9 canonical guides.
   - Test canonical article `http://localhost:3000/article/what-is-a-mutual-fund-guide` $\rightarrow$ returns `HTTP 200 OK` with full SSR content and Schema.org metadata.
4. **Sitemap & SEO Verification**:
   - Verify `sitemap.xml` contains strictly the 9 canonical guides, interactive calculators, comparisons, and hubs.
