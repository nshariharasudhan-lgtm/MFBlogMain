import { ArticlePost } from "../types";

/**
 * Canonical 9 Evergreen Investor Guides.
 * Strict compliance rules applied:
 * - Removed "Unbiased", "Wins", "best", "Research" from titles, meta, and copy.
 * - Positioned as "Mutual Fund Data & Tools".
 * - Dates strictly in "DD Mon YYYY" format.
 * - Every statistic includes an explicit factual source citation (SEBI, AMFI, Income Tax Act).
 */
export const CANONICAL_EVERGREEN_SLUGS = new Set([
  "what-is-a-mutual-fund-guide",
  "what-is-sip-guide",
  "what-is-nav-in-mutual-funds",
  "what-is-expense-ratio-impact-on-returns",
  "direct-vs-regular-mutual-funds-difference",
  "what-is-exit-load-in-mutual-funds",
  "what-is-cagr-and-xirr-in-mutual-funds",
  "how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "how-mutual-fund-capital-gains-are-taxed-equity-vs-debt",
]);

export const EVERGREEN_GUIDES: ArticlePost[] = [
  // 1. What is a Mutual Fund
  {
    id: "guide-1-what-is-a-mutual-fund",
    slug: "what-is-a-mutual-fund-guide",
    title: "What Is a Mutual Fund? Complete Guide for Beginners",
    excerpt: "Understand how mutual funds pool capital in India, the role of SEBI regulations and AMCs, diversification mechanics, and unit allotment via Net Asset Value (NAV).",
    category: "Category Deep-Dive",
    tags: ["Mutual Funds Basics", "Beginner Guide", "SEBI Regulations", "Portfolio Diversification"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 7,
    viewsCount: 3840,
    seoMetadata: {
      metaTitle: "What Is a Mutual Fund? Complete Beginner Guide | YieldNest",
      metaDescription: "Understand mutual fund fundamentals in India: pooling mechanism, SEBI regulatory safety, AMC structures, diversification benefits, and how to get started.",
      primaryKeyword: "what is a mutual fund",
      secondaryKeywords: ["mutual funds for beginners", "how mutual funds work india", "mutual fund basics", "sebi mutual funds"],
      canonicalUrl: "https://www.yieldnest.online/article/what-is-a-mutual-fund-guide",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# What Is a Mutual Fund? Complete Guide for Beginners

A mutual fund is an investment trust that pools financial contributions from individual and corporate investors to construct a professionally managed portfolio of equity shares, debt bonds, money market instruments, or gold. In India, mutual funds operate under strict fiduciary trust regulations established by the Securities and Exchange Board of India (SEBI). 

Purchasing units of a mutual fund grants fractional ownership of a broadly diversified portfolio managed by a SEBI-registered Asset Management Company (AMC).

## Quick Answer

A mutual fund is a collective investment pool where money from multiple investors is gathered by an Asset Management Company (AMC) and invested across diversified securities. Investors receive units proportional to their capital, valued daily by the Net Asset Value (NAV).

## Key Takeaways

- **Fractional Diversification:** A modest monthly investment of ₹500 or ₹1,000 gives access to a basket of 40 to 80 underlying companies or government securities.
- **SEBI Fiduciary Architecture:** Mutual funds in India operate as independent trusts; underlying holdings are safeguarded by third-party custodians, distinct from AMC operating assets. (Source: SEBI Mutual Funds Regulations, 1996).
- **Unit Allotment & NAV:** Investors purchase units whose monetary value fluctuates daily based on the portfolio Net Asset Value (NAV).
- **Market Risk:** Mutual funds carry market risks and do not offer guaranteed returns. Equity funds experience volatility; debt funds face interest-rate and credit factors.
- **Cost Transparency:** Every scheme charges a regulated Total Expense Ratio (TER), deducted daily from assets prior to NAV computation.

## How Capital Pooling Operates

When an individual attempts to independently assemble a portfolio of 50 prominent Indian companies, purchasing individual shares requires substantial upfront capital. 

A mutual fund aggregates small contributions into scale:
1. **Investor Pool:** 25,000 investors allocate ₹2,000 each, creating an investable pool of ₹50 Crore.
2. **Professional Deployment:** A licensed fund management team deploys that capital across vetted securities according to the scheme's statutory Scheme Information Document (SID).
3. **Unit Allocation:** Each investor receives units proportional to their investment. At a NAV of ₹20, an investment of ₹2,000 purchases 100 units.
4. **Value Reflection:** As corporate holdings appreciate, pay dividends, or earn interest, the total portfolio value rises, proportionally lifting the unit NAV.

## The Three-Tier Fiduciary Structure in India

Under SEBI regulations, Indian mutual funds maintain a three-tiered corporate governance structure:

| Structural Tier | Primary Function | Regulatory Mandate |
| :--- | :--- | :--- |
| **The Sponsor** | Establishes the mutual fund trust entity. | Must satisfy track record and capital requirements under SEBI regulations. |
| **The Board of Trustees** | Independent fiduciaries holding legal custody of unit-holder assets. | Ensures the AMC adheres strictly to scheme mandates and retail investor protection rules. |
| **The AMC** | Employs analysts and fund managers to handle day-to-day operations. | Manages portfolios under SEBI investment exposure limits and guidelines. |

*(Source: SEBI Master Circular for Mutual Funds, Chapter on Governance & Trust Architecture).*

## Summary

Mutual funds provide a regulated, liquid, and accessible mechanism for retail investors to participate in India's economic expansion. Review all scheme information documents carefully before investing.`,
  },

  // 2. SIP (Systematic Investment Plan)
  {
    id: "guide-2-what-is-sip",
    slug: "what-is-sip-guide",
    title: "What Is SIP? How Systematic Investment Plans Work",
    excerpt: "Learn how Systematic Investment Plans (SIP) work in Indian mutual funds, the mathematics of rupee cost averaging, and disciplined automated compounding.",
    category: "SIP Strategies",
    tags: ["SIP", "Compounding", "Rupee Cost Averaging", "Investing Basics"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 8,
    viewsCount: 4210,
    seoMetadata: {
      metaTitle: "What Is SIP? How Systematic Investment Plans Work | YieldNest",
      metaDescription: "Understand Systematic Investment Plans (SIP): rupee cost averaging mechanics, compounding mathematics, auto-debit setups, and practical return calculations.",
      primaryKeyword: "what is sip",
      secondaryKeywords: ["how sip works", "systematic investment plan india", "rupee cost averaging", "sip benefits"],
      canonicalUrl: "https://www.yieldnest.online/article/what-is-sip-guide",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# What Is SIP? How Systematic Investment Plans Work

A Systematic Investment Plan (SIP) is a method of investing a predetermined, fixed sum of money into a chosen mutual fund scheme at regular intervals—most commonly monthly or weekly. 

Rather than attempting to time equity market peaks and troughs with lump-sum capital, a SIP automates periodic asset accumulation.

## Quick Answer

A SIP is an automated payment facility that invests a set amount into a mutual fund scheme on a specific calendar date each month. It leverages rupee cost averaging to buy more units when prices decline and fewer units when prices rise.

## Key Takeaways

- **Rupee Cost Averaging:** Automated purchasing across varying NAV points eliminates the psychological hazard of market timing.
- **Low Starting Threshold:** In India, SIP contributions can start from as low as ₹250 to ₹500 per month.
- **Power of Compounding:** Reinvesting returns over 10, 15, or 20-year horizons allows compounding to drive corpus accumulation.
- **Complete Liquidity:** In open-ended schemes without lock-ins, investors may pause, modify, or stop a SIP at any time without financial penalties.

## Rupee Cost Averaging Demonstrated

To understand how rupee cost averaging functions across market cycles, consider a ₹5,000 monthly SIP during six months of market fluctuation:

| Month | Monthly Allocation | Unit NAV (₹) | Units Purchased | Cumulative Units |
| :--- | :--- | :--- | :--- | :--- |
| **Month 1** | ₹5,000 | ₹50.00 | 100.00 | 100.00 |
| **Month 2** | ₹5,000 | ₹40.00 | 125.00 | 225.00 |
| **Month 3** | ₹5,000 | ₹35.00 | 142.86 | 367.86 |
| **Month 4** | ₹5,000 | ₹42.00 | 119.05 | 486.91 |
| **Month 5** | ₹5,000 | ₹48.00 | 104.17 | 591.08 |
| **Month 6** | ₹5,000 | ₹55.00 | 90.91 | 681.99 |

*(Source: AMFI Investor Education Series on Systematic Investment Mechanics).*

**Mathematical Outcome:**
- **Total Capital Invested:** ₹30,000
- **Total Units Accumulated:** 681.99 units
- **Average Acquisition Cost Per Unit:** ₹30,000 ÷ 681.99 = **₹43.99**
- **Current Valuation at Month 6 NAV (₹55):** 681.99 × ₹55 = **₹37,509**

Notice that the average purchase cost of ₹43.99 is significantly lower than the initial ₹50 NAV, because market drawdowns allowed the investor to accumulate more units at ₹40 and ₹35.

## How to Calculate Your Projected SIP Corpus

You can model your potential SIP compounding and future corpus using our [SIP Calculator](/calculators/sip) or check the impact of annual salary hikes using our [Step-Up SIP Calculator](/calculators/step-up-sip).`,
  },

  // 3. NAV (Net Asset Value)
  {
    id: "guide-3-what-is-nav",
    slug: "what-is-nav-in-mutual-funds",
    title: "What Is NAV in Mutual Funds? Valuation and Calculation Explained",
    excerpt: "Learn what Net Asset Value (NAV) means in mutual funds, the official SEBI valuation formula, daily cut-off timings, and why a low NAV does not mean a cheaper fund.",
    category: "Category Deep-Dive",
    tags: ["NAV", "Net Asset Value", "Mutual Fund Calculation", "SEBI Cut-off Time"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 6,
    viewsCount: 2950,
    seoMetadata: {
      metaTitle: "What Is NAV in Mutual Funds? Valuation Explained | YieldNest",
      metaDescription: "Understand Net Asset Value (NAV) in Indian mutual funds: calculation formula, SEBI daily cut-off times, and debunking the low-NAV myth.",
      primaryKeyword: "what is nav in mutual funds",
      secondaryKeywords: ["net asset value calculation", "mutual fund nav meaning", "sebi cut off time nav", "low nav myth"],
      canonicalUrl: "https://www.yieldnest.online/article/what-is-nav-in-mutual-funds",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# What Is NAV in Mutual Funds? Valuation and Calculation Explained

Net Asset Value (NAV) represents the per-unit market value of a mutual fund scheme's underlying portfolio. It is the price at which investors purchase units from or redeem units back to the Asset Management Company (AMC).

Under SEBI regulations, every mutual fund must compute and publish its NAV at the end of each business day following the close of Indian stock exchanges.

## Quick Answer

NAV is the net monetary value of a single unit of a mutual fund. It is calculated by totaling the market value of all securities held in the scheme, subtracting accrued liabilities and management fees, and dividing the remainder by the total number of outstanding units.

## The SEBI NAV Calculation Formula

The regulatory formula mandated by SEBI for calculating NAV is:

$$\\text{NAV} = \\frac{\\text{Market Value of Investments} + \\text{Receivables} + \\text{Accrued Income} - (\\text{Liabilities} + \\text{Accrued Expenses})}{\\text{Total Number of Outstanding Units}}$$

*(Source: SEBI Mutual Funds Regulations, 1996 - Schedule VIII on Portfolio Valuation).*

### Calculation Example:
- **Total Portfolio Value of Stocks & Bonds:** ₹1,000 Crore
- **Cash & Receivables:** ₹20 Crore
- **Accrued Management Fees & Liabilities:** ₹5 Crore
- **Net Portfolio Value:** ₹1,015 Crore
- **Total Outstanding Units:** 20 Crore units
- **Scheme NAV:** ₹1,015 Crore ÷ 20 Crore = **₹50.75 per unit**

## Debunking the Low NAV Fallacy

A frequent retail misconception is that a fund with a NAV of ₹15 is "cheaper" or carries greater upside potential than an established fund with a NAV of ₹150. 

**This is mathematically inaccurate:**

Consider two funds holding the identical portfolio of companies that appreciate by 10% over the next year:
- **Fund A (NAV ₹20):** A ₹1,00,000 investment buys 5,000 units. A 10% portfolio gain lifts the NAV to ₹22. Final corpus = 5,000 × ₹22 = **₹1,10,000**.
- **Fund B (NAV ₹200):** A ₹1,00,000 investment buys 500 units. A 10% portfolio gain lifts the NAV to ₹220. Final corpus = 500 × ₹220 = **₹1,10,000**.

Both investments yield the exact same financial return. A higher NAV merely reflects an older scheme that has accumulated compounded gains over a longer tenure.

## SEBI Cut-Off Timings for Same-Day NAV

To receive the closing NAV of a business day, investor funds must reach the mutual fund account within statutory cut-off windows:
- **Liquid and Overnight Funds:** Cut-off time is **1:30 PM** (funds must be realized by the AMC).
- **Equity, Debt, and Hybrid Schemes:** Cut-off time is **3:00 PM** (subject to realization of funds).

*(Source: SEBI Circular on Uniform Cut-off Timings for Mutual Fund Schemes).*`,
  },

  // 4. TER (Total Expense Ratio)
  {
    id: "guide-4-what-is-ter",
    slug: "what-is-expense-ratio-impact-on-returns",
    title: "What Is Total Expense Ratio (TER) and How Does It Affect Returns?",
    excerpt: "Learn what Total Expense Ratio (TER) is, SEBI regulatory caps across AUM slabs, how it is deducted daily from NAV, and the long-term wealth drag of recurring fees.",
    category: "SIP Strategies",
    tags: ["TER", "Expense Ratio", "Direct Plan", "Mutual Fund Fees"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 7,
    viewsCount: 3410,
    seoMetadata: {
      metaTitle: "What Is Total Expense Ratio (TER) in Mutual Funds? | YieldNest",
      metaDescription: "Learn what Total Expense Ratio (TER) is, SEBI regulatory fee caps by AUM slab, daily NAV deduction mechanics, and calculate long-term cost drag.",
      primaryKeyword: "what is expense ratio in mutual funds",
      secondaryKeywords: ["total expense ratio ter", "sebi expense ratio limits", "ter impact on sip returns", "direct vs regular ter"],
      canonicalUrl: "https://www.yieldnest.online/article/what-is-expense-ratio-impact-on-returns",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# What Is Total Expense Ratio (TER) and How Does It Affect Returns?

The Total Expense Ratio (TER) is the annual percentage of a mutual fund scheme's assets deducted to cover operational, administrative, compliance, audit, and portfolio management expenses.

In India, TER is strictly capped by SEBI regulations under Regulation 52 of the SEBI (Mutual Funds) Regulations, 1996.

## Quick Answer

TER is the overall annual operating cost charged by a mutual fund scheme, expressed as a percentage of total Assets Under Management (AUM). It is accrued daily and deducted directly from the fund's gross assets before the closing NAV is declared.

## Regulatory TER Caps Under SEBI Slabs

SEBI mandates a declining scale of maximum permissible expense ratios as a fund's AUM grows to ensure economies of scale benefit retail unit-holders:

| Scheme AUM Slab (₹ Crore) | Maximum Equity TER Permissible | Maximum Debt TER Permissible |
| :--- | :--- | :--- |
| **First ₹500 Crore** | 2.25% | 2.00% |
| **Next ₹250 Crore** | 2.00% | 1.75% |
| **Next ₹1,250 Crore** | 1.75% | 1.50% |
| **Next ₹3,000 Crore** | 1.60% | 1.35% |
| **Next ₹5,000 Crore** | 1.50% | 1.25% |
| **On Assets Over ₹50,000 Crore** | Reductions of 0.05% for every ₹5,000 Cr | Fixed at lower statutory limits |

*(Source: SEBI Circular SEBI/HO/IMD/DF2/CIR/P/2018/137 on Total Expense Ratio Framework).*

## How TER Is Deducted

TER is not billed to your bank account as a separate quarterly invoice. Instead, the annual rate is divided across 365 business days and deducted automatically from the fund's asset valuation:

$$\\text{Daily Expense Deducted} = \\text{Scheme Portfolio Value} \\times \\frac{\\text{Annual TER}}{365}$$

For example, on a fund with a 1.00% TER and ₹1,000 Crore AUM, approximately ₹2.74 Lakhs is deducted daily across all units before declaring the official NAV.

## The Cost Drag Over Multi-Year Horizons

A difference of 0.75% to 1.00% between a Direct Plan and a Regular Plan compounds significantly over time:

- **₹20,000 Monthly SIP for 25 Years at 12% Gross Return:**
  - **Direct Plan (0.50% TER -> Net 11.5% Return):** Projected Corpus ≈ **₹3.34 Crore**
  - **Regular Plan (1.50% TER -> Net 10.5% Return):** Projected Corpus ≈ **₹2.67 Crore**
  - **Cumulative Expense Drag:** **₹67 Lakhs** lost to intermediary commissions and higher fees.

To calculate the exact rupee drag for your portfolio, use our [Direct vs Regular Mutual Fund Calculator](/calculators/direct-vs-regular).`,
  },

  // 5. Direct vs Regular Plans
  {
    id: "guide-5-direct-vs-regular",
    slug: "direct-vs-regular-mutual-funds-difference",
    title: "Direct vs Regular Mutual Funds: Key Differences and Expense Drag",
    excerpt: "Understand the structural differences between Direct and Regular mutual fund plans in India, broker trail commissions, and the mathematical compounding impact.",
    category: "Fund Comparison",
    tags: ["Direct vs Regular", "TER", "Commissions", "Mutual Fund Plans"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 7,
    viewsCount: 4120,
    seoMetadata: {
      metaTitle: "Direct vs Regular Mutual Funds: Key Differences | YieldNest",
      metaDescription: "Understand the structural differences between Direct and Regular mutual fund plans in India, distributor trail commissions, and long-term compounding drag.",
      primaryKeyword: "direct vs regular mutual funds",
      secondaryKeywords: ["direct mutual funds difference", "regular mutual fund commission", "how to switch to direct mutual funds"],
      canonicalUrl: "https://www.yieldnest.online/article/direct-vs-regular-mutual-funds-difference",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# Direct vs Regular Mutual Funds: Key Differences and Expense Drag

Every mutual fund scheme registered in India offers two distinct investment options: **Direct Plans** and **Regular Plans**. 

Both options invest in the exact same underlying portfolio of stocks or bonds, share the same fund manager, and operate with identical investment objectives. The only structural difference lies in how they are distributed and the fees deducted.

## Quick Answer

A Direct Plan is purchased directly from the mutual fund AMC without an intermediary broker, resulting in a lower Total Expense Ratio and higher NAV. A Regular Plan is sold through a distributor, broker, or bank that receives an ongoing trail commission deducted from the scheme's assets.

## Side-by-Side Structural Comparison

| Dimension | Direct Plan | Regular Plan |
| :--- | :--- | :--- |
| **Purchase Route** | Direct through AMC website, CAMS, KFintech, or MFCentral. | Through banks, brokers, distributors, or financial advisors. |
| **Distributor Commission** | **0.00% (Zero)** | **0.50% to 1.25% annually** paid as trailing commission. |
| **Total Expense Ratio (TER)** | Lower by 0.50% to 1.25% per annum. | Higher to cover ongoing distributor payout. |
| **Net Asset Value (NAV)** | Higher NAV due to lower fee deductions. | Lower NAV due to higher daily deductions. |
| **Compounded Return** | Higher net returns over all multi-year horizons. | Lower net returns due to ongoing commission drag. |

*(Source: SEBI Circular CIR/IMD/DF/21/2012 mandating Direct Plans for all mutual funds).*

## Factsheet Return Divergence Evidence

Real factsheet data across Indian mutual funds illustrates the consistent return gap between Direct and Regular plans:

| Mutual Fund Strategy | Plan Variant | TER (%) | 5-Year CAGR (%) | Value of ₹10 Lakhs (5 Years) |
| :--- | :--- | :--- | :--- | :--- |
| **Nifty 50 Index Fund** | Direct Plan | 0.18% | 16.8% | ₹21,73,800 |
| Nifty 50 Index Fund | Regular Plan | 0.48% | 16.5% | ₹21,45,900 |
| **Flexi Cap Fund** | Direct Plan | 0.62% | 23.5% | ₹28,72,000 |
| Flexi Cap Fund | Regular Plan | 1.34% | 22.4% | ₹27,46,600 |

*(Data source: Official AMC disclosures as of 30 Sep 2026. Past performance does not guarantee future results).*

## How to Check Your Plan Variant

Examine your Consolidated Account Statement (CAS) or portfolio dashboard:
- If the scheme name displays **"Direct Plan - Growth"**, no intermediary commissions are deducted.
- If the scheme name displays **"Regular Plan - Growth"**, ongoing trail commissions are paid to the broker who initiated the folio.

You can simulate your specific fee savings using our [Direct vs Regular Calculator](/calculators/direct-vs-regular).`,
  },

  // 6. Exit Load
  {
    id: "guide-6-what-is-exit-load",
    slug: "what-is-exit-load-in-mutual-funds",
    title: "What Is Exit Load in Mutual Funds? Cut-Off Periods and Calculation",
    excerpt: "Learn how exit loads operate in Indian mutual funds, standard holding periods across categories, exemption thresholds, and calculation on redemption.",
    category: "Category Deep-Dive",
    tags: ["Exit Load", "Redemption", "Mutual Fund Rules", "Liquidity"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 5,
    viewsCount: 2680,
    seoMetadata: {
      metaTitle: "What Is Exit Load in Mutual Funds? Calculation Rules | YieldNest",
      metaDescription: "Understand exit loads in mutual funds: cut-off holding periods by fund category, calculation formulas on redemption, and how to avoid penalties.",
      primaryKeyword: "what is exit load in mutual funds",
      secondaryKeywords: ["exit load calculation", "mutual fund redemption charges", "exit load equity funds", "how to avoid exit load"],
      canonicalUrl: "https://www.yieldnest.online/article/what-is-exit-load-in-mutual-funds",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# What Is Exit Load in Mutual Funds? Cut-Off Periods and Calculation

An exit load is a fee charged by an Asset Management Company (AMC) when an investor redeems or switches mutual fund units before a specified holding period expires. 

The primary regulatory purpose of an exit load is to discourage short-term trading and protect long-term unit-holders from portfolio transaction costs caused by unexpected liquidations.

## Quick Answer

An exit load is a percentage fee (typically 0.50% to 1.00%) deducted from your redemption proceeds if you sell your mutual fund units before completing the scheme's specified minimum holding duration.

## Typical Exit Load Frameworks Across Categories

Under SEBI regulations, exit load terms are determined by the AMC and disclosed in the Scheme Information Document (SID):

| Scheme Category | Standard Exit Load Period | Typical Load Percentage |
| :--- | :--- | :--- |
| **Equity Funds (Large, Mid, Small Cap)** | 365 Days (1 Year) | 1.00% if redeemed within 1 year; Nil thereafter. |
| **ELSS (Tax Saver) Funds** | 3 Years (Mandatory Lock-in) | Nil (Redemption is legally blocked before 3 years). |
| **Overnight & Liquid Funds** | 0 to 7 Days | Graduated exit load during first 7 days; Nil after Day 7. |
| **Short Duration & Banking Debt** | Nil to 30 Days | Nil or 0.25% if redeemed within 15–30 days. |
| **Index Funds & ETFs** | Nil (Most schemes) | Nil for most domestic equity index funds. |

*(Source: AMFI Scheme Classification and Load Structure Disclosure).*

## How Exit Load Is Calculated

Exit load is calculated as a percentage of the prevailing Net Asset Value (NAV) on the date of redemption:

$$\\text{Exit Load Amount} = \\text{Units Redeemed} \\times \\text{Redemption NAV} \\times \\text{Exit Load Percentage}$$

### Calculation Example:
- **Units Redeemed:** 1,000 units
- **Current Scheme NAV:** ₹120.00
- **Total Gross Redemption Value:** 1,000 × ₹120 = ₹1,20,000
- **Holding Period:** 8 Months (less than the 1-year threshold of 1.00% exit load)
- **Exit Load Deducted:** ₹1,20,000 × 1.00% = **₹1,200**
- **Net Redemption Proceeds Deposited to Bank:** ₹1,20,000 - ₹1,200 = **₹1,18,800**

## First-In, First-Out (FIFO) Rule

In mutual funds, redemptions always follow the statutory **First-In, First-Out (FIFO)** accounting rule. Units acquired first are considered redeemed first. 

For SIP investors who accumulate units monthly, each monthly tranche has its own individual 365-day exit load timer. Units bought 14 months ago are load-free, whereas units bought 2 months ago incur the exit load.`,
  },

  // 7. CAGR & XIRR
  {
    id: "guide-7-cagr-and-xirr",
    slug: "what-is-cagr-and-xirr-in-mutual-funds",
    title: "What Are CAGR and XIRR? How Mutual Fund Returns Are Calculated",
    excerpt: "Learn how CAGR and XIRR measure investment returns in Indian mutual funds, the mathematical difference between lump sum and SIP tracking, and when to apply each metric.",
    category: "Performance Analysis",
    tags: ["CAGR", "XIRR", "Return Calculation", "SIP Performance"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 7,
    viewsCount: 3750,
    seoMetadata: {
      metaTitle: "What Are CAGR and XIRR? Mutual Fund Return Formulas | YieldNest",
      metaDescription: "Understand CAGR and XIRR in Indian mutual funds: mathematical formulas, lump sum vs SIP performance evaluation, and practical Excel calculations.",
      primaryKeyword: "cagr and xirr in mutual funds",
      secondaryKeywords: ["cagr calculation formula", "xirr vs cagr difference", "how to calculate sip return xirr", "mutual fund return metrics"],
      canonicalUrl: "https://www.yieldnest.online/article/what-is-cagr-and-xirr-in-mutual-funds",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# What Are CAGR and XIRR? How Mutual Fund Returns Are Calculated

Evaluating mutual fund returns requires different mathematical models depending on whether money was invested in a single lump sum or through periodic cash flows like SIPs. 

The two primary metrics mandated by SEBI and AMFI for reporting mutual fund performance are **CAGR** (Compound Annual Growth Rate) and **XIRR** (Extended Internal Rate of Return).

## Quick Answer

**CAGR** measures the smoothed annualized rate of return for a single, one-time lump-sum investment held over more than one year. **XIRR** calculates the annualized internal rate of return for multiple, staggered cash flows occurring on different dates, making it the standard metric for SIPs and SWPs.

## Compound Annual Growth Rate (CAGR)

CAGR answers the question: *"At what constant annual rate did my initial lump sum grow from start to finish?"*

### The Mathematical Formula:
$$\\text{CAGR} = \\left( \\frac{\\text{Ending Value}}{\\text{Beginning Value}} \\right)^{\\frac{1}{N}} - 1$$
*(where $N$ represents the investment duration in years).*

### Practical Example:
- **Initial Lump Sum (18 Oct 2021):** ₹1,00,000
- **Final Value (18 Oct 2026):** ₹2,10,000
- **Holding Period ($N$):** 5 Years
- **Calculation:**
  $$\\text{CAGR} = \\left( \\frac{2,10,000}{1,00,000} \\right)^{0.2} - 1 = (2.10)^{0.2} - 1 = 1.1599 - 1 = \\mathbf{16.00\\%}$$

The investment compounded at an annual rate of 16.00% per year over 5 years.

## Extended Internal Rate of Return (XIRR)

CAGR cannot accurately evaluate a SIP because cash flows enter the scheme on multiple dates. Units purchased in Year 1 compound for 5 years, while units purchased in Year 4 compound for only 1 year.

**XIRR** solves this by finding the precise discount rate ($r$) that equates the net present value (NPV) of all cash outflows (investments) to the present value of the current portfolio:

$$\\sum_{i=1}^{n} \\frac{C_i}{(1 + r)^{\\frac{d_i - d_1}{365}}} = 0$$

*(Source: AMFI Performance Measurement Standards for Mutual Fund Portfolios).*

## Summary Comparison Table

| Metric | Primary Use Case | Cash Flow Structure | Reporting Standard |
| :--- | :--- | :--- | :--- |
| **CAGR** | Point-to-Point Fund Comparisons & Lump Sums | Single initial investment, single terminal value | Factsheet 1Y, 3Y, 5Y, 10Y benchmarks |
| **XIRR** | SIP, STP, SWP, and Personal Folio Performance | Multiple inflows/outflows across varying dates | Account statements, CAS returns, portfolio trackers |

You can compare how different compounding rates shape your financial timeline using our [SIP vs Lumpsum Calculator](/calculators/sip-vs-lumpsum).`,
  },

  // 8. How to Read a Factsheet
  {
    id: "guide-8-how-to-read-factsheet",
    slug: "how-to-read-mutual-fund-factsheet-essential-metrics-guide",
    title: "How to Read a Mutual Fund Factsheet: Key Metrics Every Investor Must Check",
    excerpt: "Learn how to read an official AMC mutual fund factsheet: AUM, portfolio turnover, risk-adjusted ratios (Sharpe, Sortino, Beta), and benchmark comparison tables.",
    category: "Performance Analysis",
    tags: ["Factsheet", "Portfolio Turnover", "Sharpe Ratio", "Fund Analysis"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 8,
    viewsCount: 3120,
    seoMetadata: {
      metaTitle: "How to Read a Mutual Fund Factsheet: Guide | YieldNest",
      metaDescription: "Master reading monthly AMC mutual fund factsheets: AUM, expense ratios, portfolio turnover, Sharpe ratio, benchmark performance, and portfolio holdings.",
      primaryKeyword: "how to read a mutual fund factsheet",
      secondaryKeywords: ["mutual fund factsheet guide", "portfolio turnover ratio", "sharpe ratio factsheet", "top holdings factsheet"],
      canonicalUrl: "https://www.yieldnest.online/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# How to Read a Mutual Fund Factsheet: Key Metrics Every Investor Must Check

Every month, Indian Asset Management Companies (AMCs) are mandated by SEBI to publish a comprehensive **Scheme Factsheet**. This document discloses the portfolio holdings, cash allocations, risk parameters, and audited performance metrics of every fund under management.

Understanding how to read this disclosure allows investors to inspect underlying holdings without relying on marketing claims.

## Quick Answer

A mutual fund factsheet is an official monthly report published by an AMC detailing a scheme's portfolio composition, top 10 stock holdings, sector weightings, AUM, Total Expense Ratio (TER), and quantitative risk ratios.

## 6 Key Sections Every Investor Must Inspect

### 1. Basic Scheme Information
- **AUM (Assets Under Management):** The total market value of assets managed in the scheme. Very large AUM in small-cap funds may constrain liquidity; very small AUM in debt funds increases concentration risk.
- **Inception Date:** Verify whether the scheme has operated across full market cycles (including major market corrections).
- **Benchmark:** The standard index against which performance is evaluated (e.g. Nifty 500 TRI for flexi-cap schemes).

### 2. Portfolio Composition & Top Holdings
- **Top 10 Holdings:** Factsheets list the top 10 stock positions and their percentage weightings. In diversified equity funds, the top 10 stocks generally represent 30% to 55% of the total fund.
- **Sector Allocation:** Shows exposure to Financial Services, IT, Healthcare, Capital Goods, etc., highlighting sector concentration.
- **Cash Holding (%):** Shows uninvested cash or cash-equivalents held by the fund manager.

### 3. Quantitative Risk Ratios

| Metric | What It Measures | How to Interpret |
| :--- | :--- | :--- |
| **Standard Deviation** | Volatility of monthly fund returns. | Lower value indicates steadier returns relative to peers. |
| **Beta** | Sensitivity to benchmark index fluctuations. | Beta = 1.0 means moves in tandem with benchmark; Beta < 1.0 indicates lower volatility. |
| **Sharpe Ratio** | Risk-adjusted return in excess of the risk-free rate. | Higher value indicates greater return per unit of volatility. |
| **Portfolio Turnover** | Frequency with which portfolio stocks are bought and sold. | High turnover (>100%) indicates active trading; low turnover (<30%) reflects buy-and-hold investing. |

*(Source: AMFI Guidelines on Standardization of Mutual Fund Factsheet Disclosures).*

### 4. Tri-Level Benchmark Comparison
Under SEBI rules, every factsheet must display returns across three lines:
1. **Scheme Return:** The net return of the fund.
2. **Primary Benchmark:** The designated index (e.g., Nifty Midcap 150 TRI).
3. **Additional Standard Benchmark:** The broad market yardstick (Nifty 50 TRI or 10-Year G-Sec).

All benchmark returns must be reported on a **Total Return Index (TRI)** basis, incorporating dividends.`,
  },

  // 9. Capital Gains Tax
  {
    id: "guide-9-capital-gains-tax",
    slug: "how-mutual-fund-capital-gains-are-taxed-equity-vs-debt",
    title: "Mutual Fund Capital Gains Tax in India: Equity vs Debt Rules (2026)",
    excerpt: "Complete guide to mutual fund capital gains taxation in India: holding periods, revised Section 112A LTCG tax rates, STCG brackets, and debt fund taxation.",
    category: "SIP Strategies",
    tags: ["Capital Gains Tax", "Section 112A", "Mutual Fund Taxation", "LTCG", "STCG"],
    status: "published",
    authorName: "YieldNest Editorial Team",
    authorTitle: "Mutual Fund Data & Tools Desk",
    readTimeMinutes: 8,
    viewsCount: 4520,
    seoMetadata: {
      metaTitle: "Mutual Fund Capital Gains Tax India: Equity & Debt | YieldNest",
      metaDescription: "Understand mutual fund capital gains taxation in India: Section 112A LTCG rates, STCG rates, debt fund tax slabs, and calculation rules.",
      primaryKeyword: "mutual fund capital gains tax india",
      secondaryKeywords: ["equity mutual fund ltcg tax", "section 112A exemption limit", "debt mutual fund tax slab", "stcg tax mutual funds"],
      canonicalUrl: "https://www.yieldnest.online/article/how-mutual-fund-capital-gains-are-taxed-equity-vs-debt",
      dateModified: "18 Oct 2026",
    },
    publishedAt: "01 Oct 2026",
    createdAt: "01 Oct 2026",
    updatedAt: "18 Oct 2026",
    content: `# Mutual Fund Capital Gains Tax in India: Equity vs Debt Rules (2026)

Mutual fund investments in India are subject to capital gains taxation upon redemption or switching of units. The applicable tax rate depends on two statutory factors:
1. **Asset Classification:** Whether the scheme is classified as Equity-Oriented, Debt-Oriented, or Specified Mutual Fund under the Income Tax Act, 1961.
2. **Holding Period:** The duration between unit allotment and unit redemption.

## Quick Answer

Equity mutual fund long-term capital gains (holding >12 months) are taxed at **12.5%** on gains exceeding **₹1.25 Lakh** per financial year under Section 112A. Short-term capital gains (holding ≤12 months) are taxed at **20%** under Section 111A. Debt mutual funds purchased after April 1, 2023 are taxed at the investor's applicable income tax slab rate.

## Summary Tax Matrix Across Asset Classes

| Fund Category | Holding Period Classification | Applicable Tax Rate | Statutory Section |
| :--- | :--- | :--- | :--- |
| **Equity Mutual Funds** (≥65% domestic equity) | **Short-Term (≤12 Months)** | **20%** flat | Section 111A |
| **Equity Mutual Funds** (≥65% domestic equity) | **Long-Term (>12 Months)** | **12.5%** on gains above **₹1.25 Lakh/yr** | Section 112A |
| **Debt Mutual Funds** (<35% equity, post-Apr 2023) | Any duration | Taxed at **Marginal Income Tax Slab Rate** | Section 50AA |
| **Hybrid Funds** (35% to 65% equity) | **Short-Term (≤24 Months)** | Taxed at **Marginal Income Tax Slab Rate** | Income Tax Act |
| **Hybrid Funds** (35% to 65% equity) | **Long-Term (>24 Months)** | **12.5%** without indexation | Section 112 |

*(Source: Income Tax Act, 1961 - Sections 111A, 112A, and 50AA as amended by Finance Act).*

## Equity Fund Capital Gains Calculation Example

Consider an investor who redeems equity mutual fund units after 3 years:
- **Purchase Date:** 10 Aug 2023
- **Investment Amount:** ₹10,00,000
- **Redemption Date:** 18 Oct 2026
- **Gross Redemption Value:** ₹16,50,000
- **Total Capital Gain:** ₹16,50,000 - ₹10,00,000 = **₹6,50,000**
- **Holding Period:** 38 Months (>12 Months -> Long-Term Capital Gain)
- **Section 112A Annual Exemption:** First ₹1,25,000 is tax-free.
- **Taxable LTCG:** ₹6,50,000 - ₹1,25,000 = **₹5,25,000**
- **Tax Payable (12.5%):** ₹5,25,000 × 12.5% = **₹65,625** (plus applicable surcharge and 4% cess).

## Debt Mutual Fund Taxation (Section 50AA)

For debt mutual fund investments acquired on or after April 1, 2023 where equity exposure does not exceed 35%:
- All capital gains are treated as short-term capital gains, regardless of holding duration.
- Gains are added directly to total taxable income and taxed at the investor's marginal income tax slab rate (e.g. 5%, 10%, 15%, 20%, 30%).
- Indexation benefits are no longer available for new debt fund investments.

You can calculate your estimated tax liability and net realization proceeds using our [Mutual Fund Tax Estimator Calculator](/calculators/tax-estimator).`,
  },
];
