/**
 * Canonical 301 Redirect Registry for YieldNest.online
 *
 * Rules:
 * 1. Unify all calculator URLs to /calculators/<name>. 301 redirect /calculator/* to it.
 * 2. Redirect near-duplicate "₹X SIP for N years", "SIP calculator", and similar legacy articles
 *    to their matching calculator or evergreen guide. Zero 404s.
 */

// Legacy Article Slug -> Canonical Destination (relative path)
export const ARTICLE_REDIRECTS: Record<string, string> = {
  // Near-duplicate "₹X SIP for N years" -> /calculators/sip
  "1000-sip-for-10-years-growth-calculation": "/calculators/sip",
  "5000-sip-for-10-years-investment-returns": "/calculators/sip",
  "5000-sip-for-20-years-accumulated-corpus": "/calculators/sip",
  "10000-sip-for-10-years-potential-corpus": "/calculators/sip",
  "10000-sip-for-20-years-how-much-could-it-grow": "/calculators/sip",
  "20000-sip-for-10-years-investment-calculation": "/calculators/sip",
  "sip-calculator-guide-potential-returns": "/calculators/sip",
  "sip-vs-rd-recurring-deposit-difference": "/calculators/sip",
  "mutual-fund-vs-fd-suitability-goals": "/calculators/sip",

  // Step-up duplicates -> /calculators/step-up-sip
  "step-up-sip-calculator-corpus-impact": "/calculators/step-up-sip",
  "what-happens-if-you-increase-sip-10-percent-every-year": "/calculators/step-up-sip",

  // Target corpus & inflation duplicates -> /calculators/goal-planner
  "sip-calculator-with-inflation-future-purchasing-power": "/calculators/goal-planner",
  "how-much-sip-to-build-1-crore": "/calculators/goal-planner",
  "how-much-monthly-sip-to-reach-50-lakh": "/calculators/goal-planner",
  "how-much-monthly-sip-to-reach-25-lakh": "/calculators/goal-planner",

  // Lumpsum & SWP duplicates
  "lump-sum-investment-calculator-returns": "/calculators/lumpsum",
  "swp-calculator-estimate-withdrawals": "/calculators/swp",
  "sip-vs-lump-sum-which-is-better": "/calculators/sip-vs-lumpsum",

  // Tax calculation duplicates -> /calculators/tax-estimator or capital gains guide
  "ppf-vs-mutual-funds-key-differences": "/calculators/tax-estimator",
  "elss-vs-ppf-tax-saving-investment-comparison": "/calculators/tax-estimator",
  "nps-vs-mutual-funds-key-differences": "/calculators/tax-estimator",
  "mutual-fund-taxation-india-guide": "/article/how-mutual-fund-capital-gains-are-taxed-equity-vs-debt",
  "are-mutual-funds-tax-free-india-guide": "/article/how-mutual-fund-capital-gains-are-taxed-equity-vs-debt",
  "debt-mutual-funds-vs-fixed-deposits": "/article/how-mutual-fund-capital-gains-are-taxed-equity-vs-debt",

  // Direct vs Regular & TER duplicates -> canonical evergreen guides
  "direct-vs-regular-plans-true-cost-distributor-commissions": "/article/direct-vs-regular-mutual-funds-difference",
  "direct-vs-regular-mutual-funds-charges-commissions-compounding": "/article/direct-vs-regular-mutual-funds-difference",
  "direct-vs-regular-mutual-funds-charges-commissions-compissions": "/article/direct-vs-regular-mutual-funds-difference",
  "why-total-expense-ratio-ter-is-important-for-investors": "/article/what-is-expense-ratio-impact-on-returns",
  "total-expense-ratio-ter-breakdown-impact-sip-returns": "/article/what-is-expense-ratio-impact-on-returns",
  "total-expense-ratio-compounding-cost-drag-10-20-30-years": "/article/what-is-expense-ratio-impact-on-returns",
  "nifty-50-index-funds-vs-active-large-cap-funds-rolling-returns-ter-drag": "/calculators/direct-vs-regular",

  // Basics & Metrics duplicates -> canonical evergreen guides
  "how-mutual-funds-work-in-india": "/article/what-is-a-mutual-fund-guide",
  "growth-vs-idcw-mutual-funds-difference": "/article/what-is-a-mutual-fund-guide",
  "how-to-choose-a-mutual-fund-checklist": "/guides/how-to-choose-a-mutual-fund",
  "what-is-aum-in-mutual-funds": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "how-to-check-mutual-fund-performance": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "sharpe-ratio-vs-sortino-ratio-difference": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "alpha-vs-beta-in-mutual-funds": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "what-is-alpha-in-mutual-funds": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "what-is-beta-in-mutual-funds": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "how-to-evaluate-mutual-fund-risk": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "what-is-maximum-drawdown-and-why-it-matters": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "why-high-returns-dont-always-mean-better-mutual-fund": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "what-is-cagr-and-how-is-it-calculated": "/article/what-is-cagr-and-xirr-in-mutual-funds",
  "what-is-xirr-in-mutual-funds": "/article/what-is-cagr-and-xirr-in-mutual-funds",
  "rolling-returns-vs-cagr-difference": "/article/what-is-cagr-and-xirr-in-mutual-funds",

  // Comparison duplicates -> /compare
  "large-cap-vs-mid-cap-vs-small-cap-difference": "/compare",
  "flexi-cap-vs-large-cap-difference": "/compare",
  "large-cap-vs-large-and-mid-cap-funds": "/compare",
  "mid-cap-vs-small-cap-funds-risk-return": "/compare",
  "index-fund-vs-active-mutual-fund-india": "/compare",
  "gold-vs-mutual-funds-comparison": "/compare",
  "how-to-compare-two-mutual-funds-guide": "/compare",
  "best-mutual-funds-india-performance-analysis-2024": "/compare",
  "best-mutual-funds-india-2026-data-analysis": "/compare",
  "mid-cap-vs-small-cap-analyzing-risk-adjusted-returns-amidst-current-market": "/compare",
  "mid-cap-vs-small-cap-analyzing-risk-adjusted-returns-amidst-current-market-volatility": "/compare",
  "large-cap-vs-flexi-cap-vs-mid-cap-funds-allocation-strategy": "/compare",
  "index-funds-vs-active-funds-india-tracking-error-alpha-decay": "/compare",

  // Removed Blog Articles -> Canonical Calculators / Dossiers / Hubs
  "mutual-funds-vs-fd-vs-sip-2026-analysis": "/calculators/sip",
  "mutual-funds-vs-real-estate-investing-2026": "/calculators/sip",
  "decoding-mutual-fund-nav-calculation-and-importance": "/article/what-is-nav-in-mutual-funds",
  "mid-cap-vs-multi-cap-navigating-2026-valuation-premium": "/compare",
  "mutual-funds-vs-etfs-india-guide": "/article/what-is-a-mutual-fund-guide",
  "can-mutual-funds-change-expense-ratio": "/article/what-is-expense-ratio-impact-on-returns",
  "can-mutual-funds-invest-in-ipo": "/article/what-is-a-mutual-fund-guide",
  "transfer-mutual-funds-to-son-legal-tax-guide": "/article/how-mutual-fund-capital-gains-are-taxed-equity-vs-debt",
  "are-mutual-funds-safe-investment-analysis": "/hub/safety-and-risk",
  "how-mutual-funds-make-money-business-model": "/article/what-is-a-mutual-fund-guide",
  "quant-small-cap-vs-nippon-india-small-cap-comparison": "/compare/nippon-india-small-cap-vs-quant-small-cap",
  "amfi-latest-regulatory-updates-categorization-norms-transparency": "/methodology",
  "evaluating-mutual-fund-performance-rolling-returns-risk-ratios": "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
  "parag-parikh-flexi-cap-vs-mirae-asset-large-midcap": "/compare/parag-parikh-flexi-cap-vs-hdfc-flexi-cap",
  "small-cap-mutual-funds-stress-test-sebi-amfi-liquidity": "/hub/safety-and-risk",
  "nifty-50-index-funds-vs-active-large-cap-funds": "/calculators/direct-vs-regular",
};

/**
 * Normalizes singular "/calculator/*" URLs to plural "/calculators/*"
 */
export function getCalculatorRedirect(pathname: string): string | null {
  const clean = pathname.replace(/\/+$/, "").toLowerCase();

  // Root calculator paths
  if (clean === "/calculator" || clean === "/calculator-suite" || clean === "/calculators-suite") {
    return "/calculators";
  }

  // Singular calculator paths
  if (clean.startsWith("/calculator/")) {
    const sub = clean.replace(/^\/calculator\//, "");
    if (sub === "step-up" || sub === "stepup") {
      return "/calculators/step-up-sip";
    }
    if (sub === "ter") {
      return "/calculators/direct-vs-regular";
    }
    if (sub === "delay") {
      return "/calculators/cost-of-delay";
    }
    if (sub === "comparator" || sub === "compare") {
      return "/calculators/sip-vs-lumpsum";
    }
    return `/calculators/${sub}`;
  }

  // Legacy tools route
  if (clean === "/tools/sip-calculator" || clean === "/tool/sip-calculator") {
    return "/calculators/sip";
  }

  return null;
}

/**
 * Resolves redirect target for any given article slug
 */
export function getArticleRedirect(slug: string): string | null {
  const cleanSlug = slug.toLowerCase().trim();
  if (ARTICLE_REDIRECTS[cleanSlug]) {
    return ARTICLE_REDIRECTS[cleanSlug];
  }
  return null;
}
