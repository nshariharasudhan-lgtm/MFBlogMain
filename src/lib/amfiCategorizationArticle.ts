import { ArticlePost } from "../types";
import { HINDI_CATEGORIZATION_ARTICLE } from "./hindiArticles";

export const AMFI_CATEGORIZATION_ARTICLE: ArticlePost = {
  id: "post-sebi-amfi-mutual-fund-categorization-guide-all-scheme-categories",
  slug: "sebi-amfi-mutual-fund-categorization-guide-all-scheme-categories-rules",
  title: "SEBI & AMFI Mutual Fund Categorization Guide: All 36 Scheme Categories Decoded (Equity, Debt, Hybrid & Solution-Oriented)",
  excerpt: "An exhaustive regulatory guide based on AMFI's Knowledge Centre and SEBI Circular SEBI/HO/IMD/DF3/CIR/P/2017/114. Learn the exact statutory asset allocation mandates, Macaulay duration rules, market-cap thresholds, and 'one scheme per category' norms across all 36 mutual fund categories in India.",
  category: "Category Deep-Dive",
  tags: [
    "AMFI India",
    "SEBI Categorization",
    "Mutual Fund Categories",
    "Equity Funds",
    "Debt Funds",
    "Hybrid Funds",
    "Macaulay Duration",
    "Large Cap vs Mid Cap",
    "Multi Cap vs Flexi Cap",
    "YieldNest Research"
  ],
  status: "published",
  authorName: "Research Desk",
  authorTitle: "YieldNest Research Desk",
  authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  coverImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
  readTimeMinutes: 14,
  viewsCount: 4280,
  amfiSchemeCodes: ["120716", "120565", "122639", "119598"],
  amfiDataSnapshot: [
    {
      schemeCode: "120565",
      schemeName: "Mirae Asset Large Cap Fund - Direct Plan - Growth",
      fundHouse: "Mirae Asset Mutual Fund",
      category: "Equity: Large Cap",
      nav: 112.50,
      date: "08-Oct-2024",
      cagr1Y: 26.40,
      cagr3Y: 14.80,
      cagr5Y: 15.90,
      expenseRatio: 0.58,
      aumCr: 38200,
      riskRating: "Very High",
      benchmark: "NIFTY 100 TRI"
    },
    {
      schemeCode: "122639",
      schemeName: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
      fundHouse: "PPFAS Mutual Fund",
      category: "Equity: Flexi Cap",
      nav: 84.62,
      date: "08-Oct-2024",
      cagr1Y: 34.20,
      cagr3Y: 19.10,
      cagr5Y: 20.85,
      expenseRatio: 0.62,
      aumCr: 74500,
      riskRating: "Very High",
      benchmark: "NIFTY 500 TRI"
    },
    {
      schemeCode: "120716",
      schemeName: "UTI Nifty 50 Index Fund - Direct Plan - Growth",
      fundHouse: "UTI Mutual Fund",
      category: "Other: Index Funds",
      nav: 194.22,
      date: "08-Oct-2024",
      cagr1Y: 28.10,
      cagr3Y: 15.60,
      cagr5Y: 16.80,
      expenseRatio: 0.18,
      aumCr: 18400,
      riskRating: "Very High",
      benchmark: "NIFTY 50 TRI"
    },
    {
      schemeCode: "119598",
      schemeName: "ICICI Prudential Corporate Bond Fund - Direct Plan - Growth",
      fundHouse: "ICICI Prudential Mutual Fund",
      category: "Debt: Corporate Bond",
      nav: 29.85,
      date: "08-Oct-2024",
      cagr1Y: 7.95,
      cagr3Y: 6.85,
      cagr5Y: 7.42,
      expenseRatio: 0.32,
      aumCr: 27800,
      riskRating: "Moderate",
      benchmark: "NIFTY Corporate Bond Index B-III"
    }
  ],
  content: `# SEBI & AMFI Mutual Fund Categorization Guide: All 36 Scheme Categories Decoded

## Quick Answer / Regulatory Overview
To eliminate confusing scheme names and protect retail investors from "style drift," the **Securities and Exchange Board of India (SEBI)** introduced the landmark Circular **SEBI/HO/IMD/DF3/CIR/P/2017/114** on October 6, 2017, titled *"Categorization and Rationalization of Mutual Fund Schemes"*. 

As maintained on the **Association of Mutual Funds in India (AMFI) Knowledge Centre** (*zoneName=CategorizationOfMutualFundSchemes*), all open-ended mutual funds in India are partitioned into **5 broad groups** comprising **36 distinct standard categories** (plus the subsequent *Flexi Cap* addition in November 2020):
1. **Equity Schemes (11 Categories):** Ranging from Large Cap (min 80% top 100 stocks) to Flexi Cap and Sectoral/Thematic funds.
2. **Debt Schemes (16 Categories):** Defined strictly by **Macaulay Duration** and credit quality to eliminate hidden interest rate or credit risks.
3. **Hybrid Schemes (6 Categories):** Combining equity and fixed income (from Conservative Hybrid to Balanced Advantage and Arbitrage).
4. **Solution-Oriented Schemes (2 Categories):** Goal-based schemes with mandatory 5-year lock-ins (Retirement & Children’s Funds).
5. **Other Schemes (2 Categories):** Passive index funds, ETFs, and Fund of Funds (FoFs).

Under SEBI rules, each Asset Management Company (AMC) is permitted to offer **only ONE scheme per category** (with limited exceptions for Sectoral/Thematic, Index Funds, ETFs, and FoFs).

---

<!-- Google AdSense Top In-Article Slot -->
<div class="my-8 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
  <span class="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">Advertisement</span>
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-pub-8067937802031591"
       data-ad-slot="1234567890"></ins>
</div>

---

## 1. The Official Market Capitalization Framework (AMFI Semi-Annual List)

Before SEBI's 2017 circular, every fund house had its own arbitrary definition of what constituted a "large-cap" or "mid-cap" stock. A fund could market itself as a large-cap fund while loading up on speculative micro-caps during bull markets.

To ensure strict "true-to-label" compliance, SEBI mandated a uniform, mathematically standardized definition of market capitalization across the entire Indian mutual fund industry:

| Market Cap Classification | Statutory Ranking by Full Market Capitalization | Official Benchmark Coverage | AMFI Update Frequency |
| :--- | :--- | :--- | :--- |
| **Large Cap** | **1st to 100th company** | Nifty 100 / BSE 100 | Prepared semi-annually (June & December data) |
| **Mid Cap** | **101st to 250th company** | Nifty Midcap 150 / BSE MidCap | Prepared semi-annually (June & December data) |
| **Small Cap** | **251st company onwards** | Nifty Smallcap 250 / BSE SmallCap | Prepared semi-annually (June & December data) |

*Source: AMFI Knowledge Centre & SEBI Circular SEBI/HO/IMD/DF3/CIR/P/2017/114. Data as on current regulatory framework.*

AMFI publishes this list on its official portal within five calendar days from the end of every half-year (as of June 30 and December 31). Mutual fund managers are legally given one month to rebalance their scheme holdings whenever a company transitions across market-cap buckets.

---

## 2. Equity Schemes: 11 Standardized Categories Decoded

Equity mutual funds primarily invest in listed equities and equity-related securities. SEBI defines 11 distinct categories, each with a legally enforceable minimum allocation floor:

| # | Scheme Category | Statutory Investment Mandate (SEBI Minimum Floor) | Investment Objective & Risk Profile |
| :--- | :--- | :--- | :--- |
| 1 | **Multi Cap Fund** | Minimum **75% in equity**, with at least **25% Large Cap, 25% Mid Cap, and 25% Small Cap** at all times. *(SEBI Circular Sep 2020)* | Guaranteed multi-tier diversification. Very High Risk. |
| 2 | **Large Cap Fund** | Minimum **80% in Large Cap stocks** (top 100 companies). | Capital stability, blue-chip growth. Lower volatility than mid-caps. |
| 3 | **Large & Mid Cap Fund** | Minimum **35% in Large Cap** AND minimum **35% in Mid Cap** stocks (total min equity 70%). | Blend of stability and aggressive growth. Very High Risk. |
| 4 | **Mid Cap Fund** | Minimum **65% in Mid Cap stocks** (101st to 250th company). | High growth potential, medium-high volatility. Very High Risk. |
| 5 | **Small Cap Fund** | Minimum **65% in Small Cap stocks** (251st company onwards). | Maximum long-term capital appreciation, sharp cyclical drawdowns. |
| 6 | **Dividend Yield Fund** | Minimum **65% in dividend-yielding stocks**. | Value-oriented companies with healthy cash flows. High dividend stability. |
| 7 | **Value Fund / Contra Fund** | Minimum **65% in equity** following a Value or Contrarian investment strategy. *(AMC can offer Value OR Contra, not both).* | Undervalued stocks or unloved sectors turnaround. Long gestation period. |
| 8 | **Focused Fund** | Minimum **65% in equity**, invested in a **maximum of 30 stocks**. | High-conviction concentrated portfolio. Must specify market-cap focus. |
| 9 | **Sectoral / Thematic Fund** | Minimum **80% in equity of a specific sector or theme** (e.g., Banking, Healthcare, Manufacturing). | Highly cyclical, non-diversified risk. No AMC limit on number of themes. |
| 10 | **ELSS (Tax Saving)** | Minimum **80% in equity** in accordance with Equity Linked Savings Scheme, 2005. | Tax deduction under Section 80C (Old Regime). Mandatory **3-year lock-in**. |
| 11 | **Flexi Cap Fund** | Minimum **65% in equity**, with complete fund manager flexibility to allocate across Large, Mid, and Small caps. *(SEBI Circular Nov 2020)* | Dynamic allocation based on market valuations without fixed caps. |

*Source: SEBI Circulars SEBI/HO/IMD/DF3/CIR/P/2017/114, SEBI/HO/IMD/DF3/CIR/P/2020/172, and SEBI/HO/IMD/DF3/CIR/P/2020/228.*

### Multi Cap vs. Flexi Cap: The Key Difference
Many investors confuse Multi Cap and Flexi Cap schemes:
- **Multi Cap Funds** are **rigidly constrained**: Fund managers *must* hold at least 25% in Small Caps, 25% in Mid Caps, and 25% in Large Caps even when small caps are overvalued.
- **Flexi Cap Funds** are **unconstrained**: Fund managers can hold 80% in Large Caps during market peaks and shift 50% into Mid/Small caps during bear market corrections.

---

## 3. Debt Schemes: 16 Categories Classified by Macaulay Duration

Before the 2017 rationalization, debt funds used deceptive marketing terms like "Short Term Fund" or "Income Advantage" to mask portfolios holding long-dated or low-rated bonds. 

SEBI overhauled debt schemes by introducing **Macaulay Duration**—the mathematical weighted-average time (in years or months) required to recoup an investor's bond cash flows—as the primary regulatory criterion:

| # | Scheme Category | Macaulay Duration / Instrument Maturity Rule | Credit / Portfolio Characteristics |
| :--- | :--- | :--- | :--- |
| 1 | **Overnight Fund** | Securities with maturity of **1 day only**. | Minimal interest rate and credit risk. Ideal for corporate treasury overnight parking. |
| 2 | **Liquid Fund** | Debt & money market securities with maturity up to **91 days only**. | High liquidity, 7-day graded exit load. Stable daily accrual. |
| 3 | **Ultra Short Duration Fund** | Macaulay duration between **3 months and 6 months**. | Higher yield than liquid funds with minimal duration volatility. |
| 4 | **Low Duration Fund** | Macaulay duration between **6 months and 12 months**. | Short-term liquidity management (6-12 months horizon). |
| 5 | **Money Market Fund** | Money market instruments with maturity **up to 1 year**. | Invests in Commercial Papers (CPs), Certificates of Deposit (CDs), and T-Bills. |
| 6 | **Short Duration Fund** | Macaulay duration between **1 year and 3 years**. | Core debt allocation for medium-term conservative investors. |
| 7 | **Medium Duration Fund** | Macaulay duration between **3 years and 4 years**. | Moderate interest rate sensitivity. |
| 8 | **Medium to Long Duration Fund** | Macaulay duration between **4 years and 7 years**. | Higher volatility during interest rate pivot cycles. |
| 9 | **Long Duration Fund** | Macaulay duration **greater than 7 years**. | Maximum sensitivity to RBI repo rate cuts; high capital gains potential during falling rates. |
| 10 | **Dynamic Bond Fund** | Duration managed dynamically across all maturities. | Fund manager shifts duration actively based on monetary policy stance. |
| 11 | **Corporate Bond Fund** | Minimum **80% in highest-rated corporate bonds (AA+ and above)**. | High credit safety, predictable accrual yield. |
| 12 | **Credit Risk Fund** | Minimum **65% in corporate bonds rated AA and below** (excluding AA+). | Higher coupon yields, exposure to corporate credit downgrade/default risks. |
| 13 | **Banking and PSU Fund** | Minimum **80% in debt of Banks, PSUs, PFIs, and Municipal bonds**. | High sovereign/quasi-sovereign safety and liquidity. |
| 14 | **Gilt Fund** | Minimum **80% in Government Securities (G-Secs)** across maturities. | Zero credit default risk; subject to sovereign bond yield movements. |
| 15 | **Gilt Fund (10-Yr Constant Duration)** | Minimum **80% in G-Secs** such that portfolio Macaulay duration equals **10 years**. | Direct proxy for the benchmark 10-Year Indian Government Bond yield. |
| 16 | **Floater Fund** | Minimum **65% in floating rate debt instruments**. | Coup rates reset periodically; shields investors during rising interest rate cycles. |

*Source: AMFI Knowledge Centre & SEBI Debt Categorization Norms. Verified as per in-force statutory definitions.*

---

<!-- Google AdSense Mid-Article Slot -->
<div class="my-8 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
  <span class="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">Advertisement</span>
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-pub-8067937802031591"
       data-ad-slot="9876543210"></ins>
</div>

---

## 4. Hybrid Schemes: 6 Categories Blending Growth & Income

Hybrid funds combine equity and debt securities to balance capital growth with downside risk mitigation:

| # | Scheme Category | Statutory Asset Allocation Mandate | Tax Treatment & Suitability |
| :--- | :--- | :--- | :--- |
| 1 | **Conservative Hybrid Fund** | **10% to 25% in Equity**; **75% to 90% in Debt** instruments. | Taxed as non-equity. Suitable for conservative retirees seeking capital protection with an inflation kicker. |
| 2 | **Balanced Hybrid Fund** OR **Aggressive Hybrid Fund** | • **Balanced Hybrid:** 40% to 60% Equity; 40% to 60% Debt (no arbitrage allowed).<br>• **Aggressive Hybrid:** **65% to 80% Equity**; 20% to 35% Debt.<br>*(AMC can offer only one of these two).* | Aggressive Hybrid qualifies for **Equity Taxation** (LTCG @ 12.5% beyond ₹1.25 Lakh). Highly popular for first-time equity investors. |
| 3 | **Dynamic Asset Allocation / Balanced Advantage (BAF)** | Equity and Debt managed dynamically between **0% and 100%**. | Uses quantitative valuation models (P/E, P/B, trend) to buy equities low and sell high while maintaining >= 65% gross equity via arbitrage for equity tax status. |
| 4 | **Multi Asset Allocation Fund** | Minimum **10% in at least THREE distinct asset classes** (typically Equity, Debt, and Gold/Silver or Real Estate). | True multi-asset diversification with automatic periodic rebalancing. |
| 5 | **Arbitrage Fund** | Minimum **65% in Equity**, following simultaneous cash and derivatives arbitrage strategies. | Virtually zero directional market risk; delivers liquid-fund returns with **Equity Taxation benefits**. |
| 6 | **Equity Savings Fund** | Minimum **65% in Equity & equity-related instruments** AND minimum **10% in Debt**. | Uses unhedged equity (15-40%), hedged equity/arbitrage (25-50%), and debt (10-35%) to generate low-volatility returns with equity tax efficiency. |

*Source: SEBI Mutual Fund Regulations & AMFI Hybrid Categorization Zone.*

---

## 5. Solution-Oriented & Other Schemes

### Solution-Oriented Schemes (2 Categories)
These schemes are designed around specific life milestones and carry a mandatory statutory lock-in:
1. **Retirement Fund:** Minimum 5-year lock-in period or till the investor reaches the retirement age of 60, whichever is earlier.
2. **Children's Fund:** Minimum 5-year lock-in period or till the child attains majority (18 years), whichever is earlier.

### Other Schemes (2 Categories)
1. **Index Funds / ETFs:** Open-ended schemes replicating or tracking a specific market index. Under SEBI rules, a minimum of **95% of total assets** must be invested in the exact constituent securities of the underlying index.
2. **Fund of Funds (FoF) (Domestic / Overseas):** Minimum **95% of total assets** must be invested in underlying mutual fund schemes.

---

## 6. Practical Investor Takeaways: How to Map Your Goals to SEBI Categories

Understanding SEBI's categorization empowers you to construct a robust, transparent mutual fund portfolio:

<pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm overflow-x-auto text-slate-800 dark:text-slate-200">
[Investment Horizon &amp; Risk Appetite]
       │
       ├─ Horizon &lt; 1 Month  ──────► Overnight or Liquid Fund (&lt;= 91 days maturity)
       ├─ Horizon 1 - 6 Months ────► Ultra-Short Duration or Money Market Fund
       ├─ Horizon 6 - 18 Months ───► Low Duration or Arbitrage Fund (Equity Taxation)
       ├─ Horizon 3 - 5 Years ─────► Balanced Advantage (BAF) or Conservative Hybrid
       └─ Horizon 5+ Years ────────► Large Cap / Flexi Cap / Nifty 50 Index Fund
</pre>

### Self-Verification on YieldNest
To see how different scheme categories perform over full market cycles and evaluate how Total Expense Ratios impact your long-term wealth:
- Compare active large-caps with index funds in our **[Nifty 50 Index Funds vs. Active Large Cap Guide](/article/nifty-50-index-funds-vs-active-large-cap-funds-rolling-returns-ter-drag)**.
- Eliminate distributor commission drag by reading our **[AMFI Direct Plan Complete Guide](/article/amfi-direct-plan-mutual-funds-guide-higher-returns-lower-expense-ratio)**.
- Test your monthly compounding with the **[YieldNest SIP & Step-Up Calculator](/tools/sip-calculator)**.

---

## Frequently Asked Questions (SEBI & AMFI Mutual Fund Categorization)

### Q1: Why did SEBI introduce the 2017 Mutual Fund Categorization norms?
Prior to 2017, mutual fund houses launched dozens of overlapping schemes with confusing names (e.g., "MNC Growth Fund", "Advantage Fund") that led to severe style drift. Fund managers frequently shifted risk without informing unitholders. SEBI's circular enforced strict "true-to-label" rules, standard market-cap thresholds, and limited each AMC to one fund per category to protect investor clarity.

### Q2: What is the primary difference between a Multi Cap Fund and a Flexi Cap Fund?
A Multi Cap fund is statutorily mandated by SEBI to hold at least 25% in Large Caps, 25% in Mid Caps, and 25% in Small Caps at all times. A Flexi Cap fund is only required to maintain 65% in equities overall, leaving the fund manager free to dynamically shift between large, mid, and small-cap stocks based on market valuations.

### Q3: What is Macaulay Duration and why does SEBI use it for debt funds?
Macaulay Duration measures the weighted average time (in months or years) an investor must hold a bond until the present value of its future cash flows (coupons and principal repayment) equals the price paid for the bond. SEBI uses Macaulay Duration to ensure debt funds are strictly classified according to their actual interest rate sensitivity.

### Q4: Can an AMC offer both a Balanced Hybrid Fund and an Aggressive Hybrid Fund?
No. Under SEBI Circular SEBI/HO/IMD/DF3/CIR/P/2017/114, an Asset Management Company is permitted to launch either a Balanced Hybrid Fund OR an Aggressive Hybrid Fund, but never both. Most AMCs choose Aggressive Hybrid schemes because their higher equity allocation (65%–80%) qualifies them for favorable equity capital gains tax rates.

### Q5: Are Index Funds and Sectoral Funds subject to the "one scheme per category" limit?
No. SEBI explicitly created exemptions for Index Funds/ETFs (which can track different market indices like Nifty 50, Nifty Next 50, or Nifty Bank) and Sectoral/Thematic Funds (which can focus on different sectors like Healthcare, IT, Banking, or Auto).

### Q6: Where can investors verify official scheme categorization in India?
Investors can verify scheme classification directly on the **AMFI Knowledge Centre** (*amfiindia.com*) under the *CategorizationOfMutualFundSchemes* zone, as well as in the Scheme Information Document (SID) and Key Information Memorandum (KIM) published by each respective AMC.
`,
  seoMetadata: {
    metaTitle: "SEBI & AMFI Mutual Fund Categorization Guide: All 36 Scheme Categories Decoded",
    metaDescription: "Comprehensive regulatory guide based on AMFI Knowledge Centre and SEBI Circular 2017/114 decoding all 36 mutual fund categories across Equity, Debt, Hybrid & Solution-oriented schemes.",
    primaryKeyword: "sebi mutual fund categorization",
    secondaryKeywords: [
      "amfi scheme categories",
      "types of mutual funds in india",
      "multi cap vs flexi cap",
      "debt fund macaulay duration sebi",
      "hybrid fund asset allocation",
      "large cap mid cap definition amfi"
    ],
    canonicalUrl: "https://www.yieldnest.online/article/sebi-amfi-mutual-fund-categorization-guide-all-scheme-categories-rules"
  },
  socialSnippets: {
    twitter: "Confused by mutual fund categories? 📊 Our complete breakdown of all 36 SEBI & AMFI scheme categories is live. Decode statutory asset allocations, Macaulay duration rules, and Multi Cap vs Flexi Cap mandates: [Link] #MutualFunds #AMFI #YieldNest",
    instagram: "Swipe to decode all 36 Mutual Fund categories defined by SEBI & AMFI! 📈 Understand how Large, Mid, Small caps are classified and how Macaulay duration protects debt fund investors. Full guide link in bio! 👉 yieldnest.online",
    facebook: "Did you know that SEBI permits AMCs to launch only ONE fund per category? Here is our comprehensive regulatory breakdown of all 36 mutual fund categories across Equity, Debt, and Hybrid schemes. Read the full analysis on YieldNest.online!"
  },
  createdAt: "2024-10-09T08:00:00.000Z",
  updatedAt: "2024-10-10T18:00:00.000Z",
  publishedAt: "2024-10-09T08:30:00.000Z",
  translations: {
    hi: HINDI_CATEGORIZATION_ARTICLE,
  },
};
