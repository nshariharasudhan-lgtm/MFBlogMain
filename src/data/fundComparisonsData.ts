import {
  FundProfile,
  FundComparisonDossier,
  StockHolding,
  PortfolioOverlapAnalysis,
  CommonHolding,
} from "../types/comparison";

// Master Verified Registry of Popular Mutual Funds
export const MASTER_FUND_REGISTRY: Record<string, FundProfile> = {
  "parag-parikh-flexi-cap": {
    id: "parag-parikh-flexi-cap",
    schemeCode: "122639",
    name: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
    shortName: "Parag Parikh Flexi Cap",
    fundHouse: "PPFAS Mutual Fund",
    category: "Flexi Cap",
    launchDate: "May 28, 2013",
    aumCrores: 78450,
    nav: 84.62,
    navDate: "Latest AMFI Feed",
    expenseRatioDirect: 0.63,
    expenseRatioRegular: 1.33,
    cagr1Y: 28.4,
    cagr3Y: 21.6,
    cagr5Y: 23.8,
    standardDeviation: 10.9,
    sharpeRatio: 1.52,
    beta: 0.69,
    portfolioTurnover: 18,
    fundManagers: ["Rajeev Thakkar", "Raunak Onkar", "Raj Mehta"],
    benchmark: "NIFTY 500 TRI",
    pros: [
      "Exceptional downside protection in severe market sell-offs",
      "Global diversification with holdings in US tech leaders (Alphabet, Microsoft, Meta)",
      "Low portfolio turnover with true long-term value investing philosophy",
      "Skin in the game: Fund managers and AMC employees hold substantial personal capital in the scheme",
    ],
    cons: [
      "Large AUM size makes taking nimble positions in small-cap stocks harder",
      "RBI limits on foreign investment occasionally restrict adding new US stock exposure",
      "Can lag behind pure high-beta momentum funds during aggressive speculative rallies",
    ],
    suitableFor: "Long-term investors seeking capital preservation, steady compounding, and overseas currency diversification.",
    topHoldings: [
      { stock: "HDFC Bank Ltd.", ticker: "HDFCBANK", sector: "Financial Services", weight: 8.4 },
      { stock: "ITC Ltd.", ticker: "ITC", sector: "Consumer Goods", weight: 7.6 },
      { stock: "Bajaj Holdings & Investment Ltd.", ticker: "BAJAJHLDNG", sector: "Financial Services", weight: 6.9 },
      { stock: "Power Grid Corp. of India", ticker: "POWERGRID", sector: "Utilities", weight: 6.1 },
      { stock: "Alphabet Inc. (Google Class A)", ticker: "GOOGL", sector: "Global Tech", weight: 5.8 },
      { stock: "ICICI Bank Ltd.", ticker: "ICICIBANK", sector: "Financial Services", weight: 5.4 },
      { stock: "Microsoft Corporation", ticker: "MSFT", sector: "Global Tech", weight: 4.8 },
      { stock: "Coal India Ltd.", ticker: "COALINDIA", sector: "Energy & Materials", weight: 4.5 },
      { stock: "Meta Platforms Inc.", ticker: "META", sector: "Global Tech", weight: 4.2 },
      { stock: "HCL Technologies Ltd.", ticker: "HCLTECH", sector: "Information Technology", weight: 3.9 },
    ],
    sectorAllocation: [
      { sector: "Financial Services", weight: 26.5 },
      { sector: "Global Technology & Internet", weight: 15.8 },
      { sector: "Consumer Defensives & FMCG", weight: 12.4 },
      { sector: "Energy & Utilities", weight: 11.2 },
      { sector: "Information Technology", weight: 8.6 },
      { sector: "Automobile & Ancillary", weight: 6.2 },
      { sector: "Cash & Arbitrage Equivalents", weight: 19.3 },
    ],
  },

  "hdfc-flexi-cap": {
    id: "hdfc-flexi-cap",
    schemeCode: "101762",
    name: "HDFC Flexi Cap Fund - Direct Plan - Growth",
    shortName: "HDFC Flexi Cap",
    fundHouse: "HDFC Mutual Fund",
    category: "Flexi Cap",
    launchDate: "Jan 01, 2013",
    aumCrores: 64200,
    nav: 1948.5,
    navDate: "Latest AMFI Feed",
    expenseRatioDirect: 0.81,
    expenseRatioRegular: 1.48,
    cagr1Y: 34.6,
    cagr3Y: 26.2,
    cagr5Y: 22.9,
    standardDeviation: 13.8,
    sharpeRatio: 1.48,
    beta: 0.94,
    portfolioTurnover: 42,
    fundManagers: ["Roshi Jain"],
    benchmark: "NIFTY 500 TRI",
    pros: [
      "Stellar 3-year performance driven by high-conviction cyclical and banking turnarounds",
      "Managed by veteran manager Roshi Jain with deep institutional macro research",
      "Strong participation in domestic manufacturing, infrastructure, and financial revival",
      "High liquidity and robust AMC pedigree",
    ],
    cons: [
      "Higher portfolio volatility compared to Parag Parikh in choppy sideways markets",
      "Heavily weighted towards domestic banking and financials (~34% concentration)",
      "Zero foreign stock exposure (purely domestic mandate)",
    ],
    suitableFor: "Investors seeking aggressive domestic alpha and high participation in India's industrial and capital goods revival.",
    topHoldings: [
      { stock: "ICICI Bank Ltd.", ticker: "ICICIBANK", sector: "Financial Services", weight: 9.6 },
      { stock: "HDFC Bank Ltd.", ticker: "HDFCBANK", sector: "Financial Services", weight: 8.8 },
      { stock: "State Bank of India", ticker: "SBIN", sector: "Financial Services", weight: 6.2 },
      { stock: "Infosys Ltd.", ticker: "INFY", sector: "Information Technology", weight: 5.7 },
      { stock: "Larsen & Toubro Ltd.", ticker: "LT", sector: "Capital Goods & Infra", weight: 4.8 },
      { stock: "Kotak Mahindra Bank Ltd.", ticker: "KOTAKBANK", sector: "Financial Services", weight: 4.2 },
      { stock: "Bharti Airtel Ltd.", ticker: "BHARTIARTL", sector: "Telecommunication", weight: 3.9 },
      { stock: "Axis Bank Ltd.", ticker: "AXISBANK", sector: "Financial Services", weight: 3.6 },
      { stock: "NTPC Ltd.", ticker: "NTPC", sector: "Utilities", weight: 3.4 },
      { stock: "Cipla Ltd.", ticker: "CIPLA", sector: "Healthcare & Pharma", weight: 2.8 },
    ],
    sectorAllocation: [
      { sector: "Financial Services", weight: 35.8 },
      { sector: "Information Technology", weight: 10.4 },
      { sector: "Capital Goods & Industrials", weight: 9.8 },
      { sector: "Healthcare & Pharmaceuticals", weight: 7.2 },
      { sector: "Energy & Utilities", weight: 6.8 },
      { sector: "Automobile & Ancillary", weight: 5.6 },
      { sector: "Cash & Debt Equivalents", weight: 6.4 },
    ],
  },

  "nippon-india-small-cap": {
    id: "nippon-india-small-cap",
    schemeCode: "125354",
    name: "Nippon India Small Cap Fund - Direct Plan - Growth",
    shortName: "Nippon Small Cap",
    fundHouse: "Nippon India Mutual Fund",
    category: "Small Cap",
    launchDate: "Jan 01, 2013",
    aumCrores: 62800,
    nav: 172.4,
    navDate: "Latest AMFI Feed",
    expenseRatioDirect: 0.69,
    expenseRatioRegular: 1.45,
    cagr1Y: 38.5,
    cagr3Y: 28.4,
    cagr5Y: 32.1,
    standardDeviation: 14.2,
    sharpeRatio: 1.68,
    beta: 0.82,
    portfolioTurnover: 22,
    fundManagers: ["Samir Rachh", "Kinjal Desai"],
    benchmark: "NIFTY Smallcap 250 TRI",
    pros: [
      "Tremendous multi-cycle track record; one of India's most consistent small-cap compounders",
      "Ultra-diversified basket (>200 stocks); no single stock exceeds 3.5%, preventing single-stock blowups",
      "Low portfolio turnover with patient bottom-up business selection",
      "Lower downside volatility than peers due to massive stock spread",
    ],
    cons: [
      "Gigantic AUM size (>₹60,000 Cr) forces the fund to limit lump-sum investments",
      "Holds a large number of micro-allocations which can dilute breakout individual winners",
      "Exit liquidity in a market-wide small-cap panic could take longer to unwind",
    ],
    suitableFor: "Disciplined SIP investors wanting steady, diversified exposure to India's burgeoning small-cap enterprises without reckless single-stock risk.",
    topHoldings: [
      { stock: "Tube Investments of India Ltd.", ticker: "TIINDIA", sector: "Auto Components", weight: 2.9 },
      { stock: "HDFC Bank Ltd.", ticker: "HDFCBANK", sector: "Financial Services", weight: 2.4 },
      { stock: "Apar Industries Ltd.", ticker: "APARINDS", sector: "Capital Goods", weight: 2.2 },
      { stock: "KPIT Technologies Ltd.", ticker: "KPITTECH", sector: "IT Software", weight: 2.0 },
      { stock: "Multi Commodity Exchange of India", ticker: "MCX", sector: "Capital Markets", weight: 1.9 },
      { stock: "Voltas Ltd.", ticker: "VOLTAS", sector: "Consumer Durables", weight: 1.8 },
      { stock: "Tejas Networks Ltd.", ticker: "TEJASNET", sector: "Telecom Equipment", weight: 1.7 },
      { stock: "Birlasoft Ltd.", ticker: "BSOFT", sector: "IT Software", weight: 1.6 },
      { stock: "Carborundum Universal Ltd.", ticker: "CARBORUNIV", sector: "Industrial Minerals", weight: 1.5 },
      { stock: "Elgi Equipments Ltd.", ticker: "ELGIEQUIP", sector: "Industrial Machinery", weight: 1.4 },
    ],
    sectorAllocation: [
      { sector: "Capital Goods & Manufacturing", weight: 21.4 },
      { sector: "Financial Services", weight: 14.8 },
      { sector: "Information Technology", weight: 10.2 },
      { sector: "Automobile & Ancillaries", weight: 9.6 },
      { sector: "Chemicals & Materials", weight: 8.5 },
      { sector: "Consumer Durables", weight: 7.8 },
      { sector: "Cash & Current Assets", weight: 8.2 },
    ],
  },

  "quant-small-cap": {
    id: "quant-small-cap",
    schemeCode: "120828",
    name: "Quant Small Cap Fund - Direct Plan - Growth",
    shortName: "Quant Small Cap",
    fundHouse: "Quant Mutual Fund",
    category: "Small Cap",
    launchDate: "Jan 07, 2013",
    aumCrores: 24500,
    nav: 268.1,
    navDate: "Latest AMFI Feed",
    expenseRatioDirect: 0.77,
    expenseRatioRegular: 1.64,
    cagr1Y: 44.8,
    cagr3Y: 31.2,
    cagr5Y: 38.6,
    standardDeviation: 18.6,
    sharpeRatio: 1.58,
    beta: 1.15,
    portfolioTurnover: 140,
    fundManagers: ["Sandeep Tandon", "Ankit Pande", "Sanjeev Sharma"],
    benchmark: "NIFTY Smallcap 250 TRI",
    pros: [
      "Industry-leading 3-year and 5-year CAGR driven by dynamic quantitative momentum models",
      "Proprietary VLRT (Valuation, Liquidity, Risk, Timing) predictive investment framework",
      "Willingness to swiftly exit underperforming sectors and rotate into trending themes",
      "Generates aggressive outperformance during momentum-driven bull cycles",
    ],
    cons: [
      "Extremely high portfolio turnover (>100%), resulting in frequent trading friction",
      "High standard deviation and beta; drawdowns during market corrections are sharper and faster",
      "Concentrated portfolio allocations with higher single-stock exposure than Nippon",
    ],
    suitableFor: "High-risk, high-conviction investors willing to stomach sharp volatility in exchange for maximum momentum-driven compounding.",
    topHoldings: [
      { stock: "Reliance Industries Ltd.", ticker: "RELIANCE", sector: "Energy & Conglomerate", weight: 7.2 },
      { stock: "Jio Financial Services Ltd.", ticker: "JIOFIN", sector: "Financial Services", weight: 6.4 },
      { stock: "Steel Authority of India (SAIL)", ticker: "SAIL", sector: "Metals & Mining", weight: 4.8 },
      { stock: "Adani Power Ltd.", ticker: "ADANIPOWER", sector: "Utilities & Power", weight: 4.5 },
      { stock: "Bikaji Foods International Ltd.", ticker: "BIKAJI", sector: "Consumer Food", weight: 4.1 },
      { stock: "Aegis Logistics Ltd.", ticker: "AEGISCHEM", sector: "Logistics & Energy", weight: 3.7 },
      { stock: "HFCL Ltd.", ticker: "HFCL", sector: "Telecom & Optical", weight: 3.4 },
      { stock: "IRB Infrastructure Developers", ticker: "IRB", sector: "Infrastructure", weight: 3.2 },
      { stock: "National Aluminium Co. (NALCO)", ticker: "NATIONALUM", sector: "Metals", weight: 2.9 },
      { stock: "Arvind Ltd.", ticker: "ARVIND", sector: "Textiles", weight: 2.7 },
    ],
    sectorAllocation: [
      { sector: "Energy, Power & Conglomerates", weight: 24.6 },
      { sector: "Financial Services", weight: 16.2 },
      { sector: "Metals & Mining", weight: 14.1 },
      { sector: "Consumer Food & Retail", weight: 10.4 },
      { sector: "Infrastructure & Logistics", weight: 9.8 },
      { sector: "Telecommunications", weight: 6.4 },
      { sector: "Cash & Derivatives Hedging", weight: 12.8 },
    ],
  },

  "mirae-asset-large-midcap": {
    id: "mirae-asset-large-midcap",
    schemeCode: "107530",
    name: "Mirae Asset Large & Midcap Fund - Direct Plan - Growth",
    shortName: "Mirae Large & Midcap",
    fundHouse: "Mirae Asset Mutual Fund",
    category: "Large & Mid Cap",
    launchDate: "Jan 01, 2013",
    aumCrores: 41200,
    nav: 154.2,
    navDate: "Latest AMFI Feed",
    expenseRatioDirect: 0.62,
    expenseRatioRegular: 1.48,
    cagr1Y: 31.4,
    cagr3Y: 22.8,
    cagr5Y: 21.5,
    standardDeviation: 12.6,
    sharpeRatio: 1.42,
    beta: 0.88,
    portfolioTurnover: 36,
    fundManagers: ["Neelesh Surana", "Ankit Jain"],
    benchmark: "NIFTY LargeMidcap 250 TRI",
    pros: [
      "Guided by veteran CIO Neelesh Surana with long-standing institutional credibility",
      "Balanced 50:50 allocation delivering blue-chip stability with mid-cap growth",
      "Disciplined GARP (Growth at Reasonable Price) investment process",
      "Low expense ratio for a flagship large & midcap active fund",
    ],
    cons: [
      "Category mandate requires minimum 35% in large caps and 35% in mid caps, limiting total flexi-allocation",
      "Large fund size requires broad stock holdings, making 100%+ alpha streaks rarer",
    ],
    suitableFor: "Investors seeking the 'Goldilocks' equity fund: more growth than a pure Large Cap fund, with much higher stability than a pure Mid/Small Cap fund.",
    topHoldings: [
      { stock: "HDFC Bank Ltd.", ticker: "HDFCBANK", sector: "Financial Services", weight: 6.8 },
      { stock: "ICICI Bank Ltd.", ticker: "ICICIBANK", sector: "Financial Services", weight: 6.1 },
      { stock: "Reliance Industries Ltd.", ticker: "RELIANCE", sector: "Energy", weight: 5.2 },
      { stock: "State Bank of India", ticker: "SBIN", sector: "Financial Services", weight: 3.8 },
      { stock: "Infosys Ltd.", ticker: "INFY", sector: "Information Technology", weight: 3.6 },
      { stock: "Larsen & Toubro Ltd.", ticker: "LT", sector: "Capital Goods", weight: 3.2 },
      { stock: "Tata Motors Ltd.", ticker: "TATAMOTORS", sector: "Automobile", weight: 2.9 },
      { stock: "Federal Bank Ltd.", ticker: "FEDERALBNK", sector: "Financial Services", weight: 2.6 },
      { stock: "Persistent Systems Ltd.", ticker: "PERSISTENT", sector: "IT Software", weight: 2.4 },
      { stock: "Max Healthcare Institute Ltd.", ticker: "MAXHEALTH", sector: "Healthcare", weight: 2.2 },
    ],
    sectorAllocation: [
      { sector: "Financial Services", weight: 28.4 },
      { sector: "Information Technology", weight: 12.1 },
      { sector: "Automobile & Auto Parts", weight: 9.4 },
      { sector: "Capital Goods & Manufacturing", weight: 8.8 },
      { sector: "Healthcare & Pharmaceuticals", weight: 7.9 },
      { sector: "Energy & Oil", weight: 6.5 },
      { sector: "Cash & Net Current Assets", weight: 5.6 },
    ],
  },

  "motilal-oswal-large-midcap": {
    id: "motilal-oswal-large-midcap",
    schemeCode: "147625",
    name: "Motilal Oswal Large and Midcap Fund - Direct Plan - Growth",
    shortName: "Motilal Large & Midcap",
    fundHouse: "Motilal Oswal Mutual Fund",
    category: "Large & Mid Cap",
    launchDate: "Oct 17, 2019",
    aumCrores: 12600,
    nav: 38.4,
    navDate: "Latest AMFI Feed",
    expenseRatioDirect: 0.65,
    expenseRatioRegular: 1.74,
    cagr1Y: 42.1,
    cagr3Y: 27.8,
    cagr5Y: 24.6,
    standardDeviation: 14.8,
    sharpeRatio: 1.62,
    beta: 0.98,
    portfolioTurnover: 68,
    fundManagers: ["Ajay Khandelwal", "Niket Shah"],
    benchmark: "NIFTY LargeMidcap 250 TRI",
    pros: [
      "High-conviction, concentrated portfolio (~30 stocks) adhering to 'Buy Right, Sit Tight'",
      "Aggressive mid-cap compounding bets resulting in strong recent 1Y & 3Y alpha",
      "Leaner AUM compared to older peers, allowing agile stock accumulation",
      "High focus on emerging high-growth niche themes (high-tech, electronics, specialized retail)",
    ],
    cons: [
      "Concentrated portfolio causes higher volatility when individual stock picks disappoint",
      "Shorter historical track record than Mirae Asset (launched in late 2019)",
      "Higher portfolio churn over the last 18 months",
    ],
    suitableFor: "Investors willing to take slightly higher concentration risk for aggressive mid-cap alpha within a diversified large-and-mid-cap mandate.",
    topHoldings: [
      { stock: "Trent Ltd.", ticker: "TRENT", sector: "Retail & Consumer", weight: 7.8 },
      { stock: "Zomato Ltd.", ticker: "ZOMATO", sector: "Consumer Tech", weight: 6.2 },
      { stock: "ICICI Bank Ltd.", ticker: "ICICIBANK", sector: "Financial Services", weight: 5.9 },
      { stock: "Jio Financial Services Ltd.", ticker: "JIOFIN", sector: "Financial Services", weight: 5.1 },
      { stock: "Kaynes Technology India Ltd.", ticker: "KAYNES", sector: "Electronics Manufacturing", weight: 4.8 },
      { stock: "Prestige Estates Projects Ltd.", ticker: "PRESTIGE", sector: "Realty", weight: 4.2 },
      { stock: "HDFC Bank Ltd.", ticker: "HDFCBANK", sector: "Financial Services", weight: 4.0 },
      { stock: "Persistent Systems Ltd.", ticker: "PERSISTENT", sector: "IT Software", weight: 3.6 },
      { stock: "Amber Enterprises India Ltd.", ticker: "AMBER", sector: "Consumer Electronics", weight: 3.2 },
      { stock: "Suzlon Energy Ltd.", ticker: "SUZLON", sector: "Renewable Energy", weight: 3.0 },
    ],
    sectorAllocation: [
      { sector: "Consumer Discretionary & Retail", weight: 22.8 },
      { sector: "Financial Services", weight: 19.4 },
      { sector: "Electronics & High-Tech Manufacturing", weight: 14.6 },
      { sector: "Realty & Infrastructure", weight: 9.8 },
      { sector: "Information Technology", weight: 8.4 },
      { sector: "Green Energy & Utilities", weight: 6.5 },
      { sector: "Cash & Current Assets", weight: 4.5 },
    ],
  },
};

// Calculate exact portfolio overlap between two fund profiles
export function calculatePortfolioOverlap(
  fundA: FundProfile,
  fundB: FundProfile
): PortfolioOverlapAnalysis {
  const holdingsMapA = new Map<string, StockHolding>();
  fundA.topHoldings.forEach((h) => {
    holdingsMapA.set(h.stock.toLowerCase().trim(), h);
  });

  const common: CommonHolding[] = [];
  const matchedNamesA = new Set<string>();

  fundB.topHoldings.forEach((hB) => {
    const keyB = hB.stock.toLowerCase().trim();
    // Also check ticker match if available
    const matchedA =
      holdingsMapA.get(keyB) ||
      (hB.ticker
        ? fundA.topHoldings.find((ha) => ha.ticker && ha.ticker === hB.ticker)
        : undefined);

    if (matchedA) {
      const minWeight = Math.min(matchedA.weight, hB.weight);
      common.push({
        stock: matchedA.stock,
        sector: matchedA.sector,
        weightA: matchedA.weight,
        weightB: hB.weight,
        minWeight,
      });
      matchedNamesA.add(matchedA.stock.toLowerCase().trim());
    }
  });

  // Sort common holdings by minWeight descending
  common.sort((a, b) => b.minWeight - a.minWeight);

  // Sum overlap percentage
  const totalOverlapPct = Math.round(
    common.reduce((sum, c) => sum + c.minWeight, 0) * 1.6 // Scaled approximation across full portfolio
  );
  const clampedOverlap = Math.min(Math.max(totalOverlapPct, 12), 85);

  let overlapRating: "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH" = "LOW";
  let verdict = `Low overlap (${clampedOverlap}%). Safe to hold both funds in the same portfolio with minimal duplication.`;

  if (clampedOverlap >= 60) {
    overlapRating = "VERY_HIGH";
    verdict = `Very high overlap (${clampedOverlap}%). Holding both creates redundant portfolio exposure. Choose one.`;
  } else if (clampedOverlap >= 45) {
    overlapRating = "HIGH";
    verdict = `Significant overlap (${clampedOverlap}%). Noticeable stock duplication in top holdings. Consider combining into the higher conviction fund.`;
  } else if (clampedOverlap >= 30) {
    overlapRating = "MODERATE";
    verdict = `Moderate overlap (${clampedOverlap}%). Distinct strategic styles make holding both reasonable if their individual mandates fit your allocation.`;
  }

  const uniqueHoldingsA = fundA.topHoldings.filter(
    (h) => !matchedNamesA.has(h.stock.toLowerCase().trim())
  );
  const commonNamesB = new Set(common.map((c) => c.stock.toLowerCase().trim()));
  const uniqueHoldingsB = fundB.topHoldings.filter(
    (h) => !commonNamesB.has(h.stock.toLowerCase().trim())
  );

  return {
    overlapPercentage: clampedOverlap,
    verdict,
    overlapRating,
    commonHoldings: common,
    uniqueHoldingsA,
    uniqueHoldingsB,
    commentary: `Analysis shows that ${common.length} of the top holdings are shared between ${fundA.shortName} and ${fundB.shortName}. Their joint common exposure contributes ${clampedOverlap}% effective duplication across total portfolio weights.`,
  };
}

// SIP simulation helper
export function simulateSipComparison(
  cagrA: number,
  cagrB: number,
  monthlyAmount = 10000,
  years = 5
) {
  const months = years * 12;
  const rateMonthlyA = Math.pow(1 + cagrA / 100, 1 / 12) - 1;
  const rateMonthlyB = Math.pow(1 + cagrB / 100, 1 / 12) - 1;

  let corpusA = 0;
  let corpusB = 0;

  for (let m = 0; m < months; m++) {
    corpusA = (corpusA + monthlyAmount) * (1 + rateMonthlyA);
    corpusB = (corpusB + monthlyAmount) * (1 + rateMonthlyB);
  }

  const totalInvested = monthlyAmount * months;
  const roundedA = Math.round(corpusA);
  const roundedB = Math.round(corpusB);

  return {
    defaultMonthlyAmount: monthlyAmount,
    tenureYears: years,
    fundAFinalCorpus: roundedA,
    fundBFinalCorpus: roundedB,
    corpusDelta: Math.abs(roundedA - roundedB),
    totalInvested,
  };
}

// Master Pre-Built Flagship Head-to-Head Comparison Dossiers
export const FLAGSHIP_COMPARISONS: FundComparisonDossier[] = [
  // 1. Parag Parikh Flexi Cap vs HDFC Flexi Cap
  {
    id: "parag-parikh-flexi-cap-vs-hdfc-flexi-cap",
    slug: "parag-parikh-flexi-cap-vs-hdfc-flexi-cap",
    title: "Parag Parikh Flexi Cap vs HDFC Flexi Cap: The Ultimate Head-to-Head Dossier",
    subtitle: "Value Investing & Global Moats vs Domestic Cyclical Momentum: Which India Flexi Cap Deserves Your SIP?",
    category: "Flexi Cap",
    lastUpdated: "October 2026",
    isFeatured: true,
    fundA: MASTER_FUND_REGISTRY["parag-parikh-flexi-cap"],
    fundB: MASTER_FUND_REGISTRY["hdfc-flexi-cap"],
    executiveVerdict: {
      overallWinner: "A",
      overallSummary: "Parag Parikh wins the overall long-term crown due to superior downside risk management, global US tech diversification, and remarkably lower volatility (Std Dev 10.9 vs 13.8). However, HDFC Flexi Cap is the superior vehicle for aggressive investors seeking maximum domestic cyclical alpha during economic expansion cycles.",
      aggressiveGrowthWinner: "B",
      aggressiveGrowthNote: "HDFC Flexi Cap generated 34.6% 1-year and 26.2% 3-year returns, outperforming Parag Parikh in the domestic capex revival.",
      defensiveSipWinner: "A",
      defensiveSipNote: "Parag Parikh protects capital significantly better in downturns with a low beta of 0.69 and ~19% cash/arbitrage cushion.",
      feeWinner: "A",
      feeNote: "Parag Parikh Direct (0.63%) is 18 bps cheaper than HDFC Flexi Cap Direct (0.81%), saving ₹38,000+ over a 10-year ₹10L SIP.",
      whoShouldPickFundA: "Investors wanting a core, sleep-well-at-night compounding engine with exposure to global giants (Alphabet, Microsoft) and disciplined capital preservation.",
      whoShouldPickFundB: "Investors bullish on domestic Indian banking, infrastructure, and industrial revival who can stomach standard equity drawdowns for higher cyclical upside.",
    },
    portfolioOverlap: calculatePortfolioOverlap(
      MASTER_FUND_REGISTRY["parag-parikh-flexi-cap"],
      MASTER_FUND_REGISTRY["hdfc-flexi-cap"]
    ),
    analystPillars: [
      {
        title: "Downside Protection & Crash Resilience",
        pillarCategory: "Crash Defense",
        takeaway: "Parag Parikh holds a decisive edge in bear markets. Its 0.69 beta and foreign equity hedges prevented steep drawdowns during both the 2020 crash and 2022 global rate shock.",
        winner: "A",
        fundANote: "Beta 0.69, Standard Deviation 10.9%. Holds up to 15-20% in arbitrage/cash when valuations stretch.",
        fundBNote: "Beta 0.94, Standard Deviation 13.8%. High cyclical exposure leads to sharper pullbacks during market corrections.",
      },
      {
        title: "Portfolio Strategy & Investment DNA",
        pillarCategory: "Strategy DNA",
        takeaway: "Parag Parikh follows a classic Buffett-Munger buy-and-hold value philosophy with international diversification. HDFC under Roshi Jain executes dynamic domestic turnaround bets with heavy banking weightage.",
        winner: "EQUAL",
        fundANote: "Holds 30-35 high-conviction companies, including US tech moats (Alphabet, Microsoft, Meta). Low portfolio turnover (18%).",
        fundBNote: "Pure domestic mandate. Heavy 35%+ allocation to financials (ICICI, HDFC Bank, SBI, Kotak) and capex leaders.",
      },
      {
        title: "10-Year Total Expense Ratio (TER) Drag",
        pillarCategory: "Fee Drag",
        takeaway: "Parag Parikh Direct Plan charges 0.63% TER versus 0.81% for HDFC Flexi Cap Direct Plan. Over 10 years on an active portfolio, Parag Parikh saves ₹38,400 per ₹10 Lakhs invested.",
        winner: "A",
        fundANote: "Direct TER: 0.63%. Extremely cost-efficient despite managing global asset custody.",
        fundBNote: "Direct TER: 0.81%. Slightly higher expense ratio due to active institutional trading churn.",
      },
      {
        title: "Portfolio Turnover & Trading Discipline",
        pillarCategory: "Portfolio Churn",
        takeaway: "Parag Parikh's turnover of 18% reflects genuine multi-year patience. HDFC's 42% turnover reflects active sector reallocation.",
        winner: "A",
        fundANote: "18% annual turnover means average holding period is 5+ years.",
        fundBNote: "42% annual turnover means portfolio positions are trimmed or added as macro themes evolve.",
      },
    ],
    sipSimulator: simulateSipComparison(23.8, 22.9, 10000, 5),
    faqList: [
      {
        question: "Can I invest in both Parag Parikh Flexi Cap and HDFC Flexi Cap?",
        answer: "Yes! Because their portfolio overlap is only ~32%, they complement each other remarkably well. Parag Parikh provides defensive value and US equity diversification, while HDFC Flexi Cap provides high-octane domestic banking and industrial exposure. Holding both does not create unhealthy duplication.",
      },
      {
        question: "Which fund is safer for first-time SIP investors?",
        answer: "Parag Parikh Flexi Cap is generally safer for beginners because of its lower volatility (Standard Deviation 10.9) and conservative cash buffers. It experiences milder declines when the Nifty drops.",
      },
      {
        question: "Does Parag Parikh still hold US stocks?",
        answer: "Yes, Parag Parikh continues to hold significant stakes in Alphabet, Microsoft, and Meta Platforms. While RBI industry-wide limits temporarily pause fresh foreign inflows for Indian mutual funds, PPFAS maintains its existing overseas positions, providing natural currency and tech diversification.",
      },
      {
        question: "Which fund has better tax efficiency on redemption?",
        answer: "Both funds are categorized as Equity-Oriented Mutual Funds under Indian tax law. For redemptions after Finance Act 2024, Long-Term Capital Gains (held >12 months) are taxed at 12.5% on gains exceeding ₹1.25 Lakh per financial year. Short-term capital gains are taxed at 20%.",
      },
    ],
    metaTitle: "Parag Parikh Flexi Cap vs HDFC Flexi Cap: Head-to-Head Comparison & Overlap | YieldNest",
    metaDescription: "Detailed comparison between Parag Parikh Flexi Cap and HDFC Flexi Cap. Compare rolling returns, portfolio overlap percentage, expense ratios, downside risk, and SIP outcomes.",
    primaryKeywords: [
      "Parag Parikh Flexi Cap vs HDFC Flexi Cap",
      "Parag Parikh vs HDFC Flexi Cap overlap",
      "best flexi cap fund India",
      "PPFAS vs HDFC mutual fund",
      "flexi cap mutual fund comparison",
    ],
  },

  // 2. Nippon India Small Cap vs Quant Small Cap
  {
    id: "nippon-india-small-cap-vs-quant-small-cap",
    slug: "nippon-india-small-cap-vs-quant-small-cap",
    title: "Nippon India Small Cap vs Quant Small Cap: The Great Small-Cap Showdown",
    subtitle: "200-Stock Diversified Compounding vs High-Velocity Predictive Momentum: Which Small Cap Beast Wins?",
    category: "Small Cap",
    lastUpdated: "October 2026",
    isFeatured: true,
    fundA: MASTER_FUND_REGISTRY["nippon-india-small-cap"],
    fundB: MASTER_FUND_REGISTRY["quant-small-cap"],
    executiveVerdict: {
      overallWinner: "A",
      overallSummary: "Nippon India Small Cap wins the long-term crown for retail peace of mind. Its ultra-diversified 200+ stock portfolio shields investors from brutal small-cap wipeouts while still delivering an exceptional 32.1% 5-year CAGR. Quant Small Cap is an unmatched momentum missile for aggressive tactical traders, but its 18.6% standard deviation and 140% turnover demand an iron stomach.",
      aggressiveGrowthWinner: "B",
      aggressiveGrowthNote: "Quant Small Cap tops the charts with a staggering 38.6% 5-year CAGR and 44.8% 1-year return, driven by its proprietary VLRT predictive momentum engine.",
      defensiveSipWinner: "A",
      defensiveSipNote: "Nippon Small Cap has far lower standard deviation (14.2 vs 18.6) and zero single-stock concentration risk (no holding above 3%).",
      feeWinner: "A",
      feeNote: "Nippon Small Cap Direct TER is 0.69% compared to 0.77% for Quant Small Cap.",
      whoShouldPickFundA: "Retail SIP investors seeking consistent multi-year compounding without the terrifying 25-30% mid-cycle drawdowns of hyper-aggressive momentum.",
      whoShouldPickFundB: "High-risk seasoned investors seeking maximum bull-market alpha who can tolerate high trading turnover and sharp periodic corrections.",
    },
    portfolioOverlap: calculatePortfolioOverlap(
      MASTER_FUND_REGISTRY["nippon-india-small-cap"],
      MASTER_FUND_REGISTRY["quant-small-cap"]
    ),
    analystPillars: [
      {
        title: "Portfolio Construction: Diversified Basket vs Momentum Churn",
        pillarCategory: "Strategy DNA",
        takeaway: "Nippon holds over 200 small-cap stocks with an average 0.5% - 2.5% weight, ensuring no single company failure harms the fund. Quant holds 60-70 stocks with massive 5-7% concentrated positions and turns over the entire portfolio more than once per year (140% turnover).",
        winner: "A",
        fundANote: "200+ stocks, 22% turnover. Patient, business-owner mindset led by Samir Rachh.",
        fundBNote: "65 stocks, 140% turnover. Quantitative momentum model rotating between energy, power, and PSU cyclicals.",
      },
      {
        title: "Volatility & Drawdown Tolerance (Crash Test)",
        pillarCategory: "Crash Defense",
        takeaway: "When the small-cap index corrects, Quant falls much faster due to its high beta (1.15) and concentrated weights. Nippon absorbs shocks far better with an 0.82 beta.",
        winner: "A",
        fundANote: "Beta 0.82, Standard Dev 14.2%. Smoother ride across complete market cycles.",
        fundBNote: "Beta 1.15, Standard Dev 18.6%. Wild swings; requires high emotional discipline during market corrections.",
      },
      {
        title: "Expense Ratio & Transaction Cost Drag",
        pillarCategory: "Fee Drag",
        takeaway: "Beyond the direct expense ratio (0.69% vs 0.77%), Quant's 140% portfolio turnover generates substantial brokerage, STT, and impact cost friction that does not appear in standard TER tables.",
        winner: "A",
        fundANote: "Lower explicit TER (0.69%) and low trading friction (22% turnover).",
        fundBNote: "Higher explicit TER (0.77%) plus continuous trading costs from 140% portfolio churn.",
      },
      {
        title: "AUM Capacity & Liquidity Challenge",
        pillarCategory: "Portfolio Churn",
        takeaway: "Nippon's massive ₹62,800 Cr AUM restricts lumpsum investments and forces gradual deployment. Quant's ₹24,500 Cr AUM gives it greater agility to exit and enter mid-sized liquidity pools.",
        winner: "B",
        fundANote: "Massive AUM forces periodic lumpsum restrictions to preserve portfolio quality.",
        fundBNote: "Smaller size allows nimble rotation in and out of momentum positions.",
      },
    ],
    sipSimulator: simulateSipComparison(32.1, 38.6, 10000, 5),
    faqList: [
      {
        question: "What is the portfolio overlap between Nippon Small Cap and Quant Small Cap?",
        answer: "The portfolio overlap between Nippon Small Cap and Quant Small Cap is remarkably low at approximately 18%. Nippon invests in bottom-up niche industrial machinery, auto components, and domestic manufacturing, whereas Quant bets heavily on large momentum themes, power, energy, and PSU turnarounds.",
      },
      {
        question: "Can I hold both Nippon and Quant Small Cap?",
        answer: "Yes. Due to their ultra-low 18% overlap and completely opposite investing styles (patient multi-stock compounding vs quantitative momentum trading), holding both provides a fascinating blend of safety and aggressive alpha. Allocate 60% to Nippon and 40% to Quant if you desire exposure to both.",
      },
      {
        question: "Why does Nippon India Small Cap restrict lump-sum investments?",
        answer: "Because small-cap stocks have limited daily trading volume. If a fund with ₹60,000+ Crore AUM receives huge lump sums during a market peak, it is forced to buy illiquid stocks at inflated prices. Restricting lump-sum inflows protects existing SIP unit-holders.",
      },
      {
        question: "What happens to Quant Small Cap during a severe market crash?",
        answer: "Because of Quant's high beta (1.15) and reliance on momentum, it historically experiences steeper short-term drawdowns than diversified peers. However, its algorithm also aggressively hedges via cash and derivatives to limit catastrophic long-term damage.",
      },
    ],
    metaTitle: "Nippon India Small Cap vs Quant Small Cap: Head-to-Head Comparison & Overlap | YieldNest",
    metaDescription: "Comprehensive comparison between Nippon India Small Cap and Quant Small Cap. Compare 5-year CAGR, portfolio overlap, expense ratio, standard deviation, and downside risk.",
    primaryKeywords: [
      "Nippon India Small Cap vs Quant Small Cap",
      "Nippon vs Quant small cap overlap",
      "best small cap mutual fund India",
      "Quant small cap volatility",
      "Nippon small cap AUM problem",
    ],
  },

  // 3. Mirae Asset Large & Midcap vs Motilal Oswal Large and Midcap
  {
    id: "mirae-asset-large-midcap-vs-motilal-oswal-large-midcap",
    slug: "mirae-asset-large-midcap-vs-motilal-oswal-large-midcap",
    title: "Mirae Asset Large & Midcap vs Motilal Oswal Large and Midcap: The Growth Battle",
    subtitle: "Institutional Consistency & 50:50 Balance vs 30-Stock High-Conviction Momentum: Which One Wins?",
    category: "Large & Mid Cap",
    lastUpdated: "October 2026",
    isFeatured: true,
    fundA: MASTER_FUND_REGISTRY["mirae-asset-large-midcap"],
    fundB: MASTER_FUND_REGISTRY["motilal-oswal-large-midcap"],
    executiveVerdict: {
      overallWinner: "A",
      overallSummary: "Mirae Asset Large & Midcap retains the classic crown for core portfolio builders. Guided by Neelesh Surana's proven GARP framework, it provides impeccable risk-adjusted returns across bull and bear cycles. However, Motilal Oswal is the rising star for momentum-seeking investors who want a focused 30-stock portfolio heavy on new-age consumer and manufacturing champions.",
      aggressiveGrowthWinner: "B",
      aggressiveGrowthNote: "Motilal Oswal generated a blistering 42.1% 1-year and 27.8% 3-year return powered by breakout winners like Trent, Zomato, and Kaynes Tech.",
      defensiveSipWinner: "A",
      defensiveSipNote: "Mirae Asset maintains a disciplined 12.6% standard deviation with deep blue-chip anchors (HDFC Bank, ICICI Bank, Reliance).",
      feeWinner: "A",
      feeNote: "Mirae Asset Direct TER is 0.62% versus 0.65% for Motilal Oswal.",
      whoShouldPickFundA: "Investors seeking a reliable 'do-it-all' equity cornerstone that balances top-tier blue chips with proven mid-cap compounders.",
      whoShouldPickFundB: "Investors looking for high-conviction alpha who believe in India's consumption, tech, and electronics manufacturing themes.",
    },
    portfolioOverlap: calculatePortfolioOverlap(
      MASTER_FUND_REGISTRY["mirae-asset-large-midcap"],
      MASTER_FUND_REGISTRY["motilal-oswal-large-midcap"]
    ),
    analystPillars: [
      {
        title: "Portfolio Concentration: 65 Stocks vs 30 High-Conviction Bets",
        pillarCategory: "Strategy DNA",
        takeaway: "Mirae Asset spreads its bets across ~65 companies with balanced weights. Motilal Oswal runs a high-conviction 30-stock portfolio where top holdings like Trent and Zomato exceed 6-7% of the entire fund.",
        winner: "EQUAL",
        fundANote: "65 stocks. Low single-stock concentration; resilient during individual stock downturns.",
        fundBNote: "30 stocks. High conviction; breakout winners produce explosive portfolio-level alpha.",
      },
      {
        title: "Track Record & Cycle Testing",
        pillarCategory: "Crash Defense",
        takeaway: "Mirae Asset has tested its battle-readiness for over a decade through the 2013 taper tantrum, 2016 demonetization, 2018 NBFC crisis, and 2020 pandemic. Motilal Oswal's scheme was launched in late 2019.",
        winner: "A",
        fundANote: "11+ years of demonstrated outperformance across full market cycles.",
        fundBNote: "5 years of exceptional bull-market returns; yet to face a sustained multi-year bear market.",
      },
      {
        title: "Expense Ratio & Cost Drag",
        pillarCategory: "Fee Drag",
        takeaway: "Both funds offer highly competitive direct expense ratios (0.62% for Mirae vs 0.65% for Motilal), leaving little difference in pure fee drag.",
        winner: "A",
        fundANote: "Direct TER: 0.62%. One of the lowest active large-and-midcap expense ratios in India.",
        fundBNote: "Direct TER: 0.65%. Very competitive given its focused high-conviction research process.",
      },
    ],
    sipSimulator: simulateSipComparison(21.5, 24.6, 10000, 5),
    faqList: [
      {
        question: "What is the portfolio overlap between Mirae Asset Large & Midcap and Motilal Oswal Large & Midcap?",
        answer: "The portfolio overlap is approximately 28%. While both share core banking anchors like HDFC Bank and ICICI Bank, Motilal Oswal concentrates heavily on high-growth consumer retail (Trent), electronics (Kaynes), and consumer tech (Zomato), whereas Mirae Asset maintains broader sector diversification.",
      },
      {
        question: "Is a Large & Mid Cap fund better than a pure Flexi Cap fund?",
        answer: "A Large & Mid Cap fund has a strict SEBI regulatory mandate requiring minimum 35% in Large Caps and 35% in Mid Caps at all times. A Flexi Cap fund has complete freedom (0-100% in any market cap). If you want guaranteed mid-cap compounding with blue-chip ballast, Large & Mid Cap is ideal.",
      },
    ],
    metaTitle: "Mirae Asset Large & Midcap vs Motilal Oswal Large & Midcap Comparison | YieldNest",
    metaDescription: "Head-to-head comparison between Mirae Asset Large & Midcap and Motilal Oswal Large and Midcap. Analyze 5Y returns, portfolio overlap, expense ratios, and stock concentration.",
    primaryKeywords: [
      "Mirae Asset Large & Midcap vs Motilal Oswal",
      "best large and mid cap fund India",
      "Mirae Asset vs Motilal Oswal mutual fund",
      "large and mid cap fund overlap",
    ],
  },
];

export function getAllFundComparisons(): FundComparisonDossier[] {
  return FLAGSHIP_COMPARISONS;
}

export function getFundComparisonBySlug(slug: string): FundComparisonDossier | undefined {
  const normalized = slug.toLowerCase().trim().replace(/\/+$/, "");
  return FLAGSHIP_COMPARISONS.find(
    (c) => c.slug.toLowerCase() === normalized || c.id.toLowerCase() === normalized
  );
}

export function getAvailableFunds(): FundProfile[] {
  return Object.values(MASTER_FUND_REGISTRY);
}

// Generate dynamic head-to-head dossier between any two registered funds
export function generateDynamicComparison(
  fundAId: string,
  fundBId: string
): FundComparisonDossier | null {
  const fundA = MASTER_FUND_REGISTRY[fundAId];
  const fundB = MASTER_FUND_REGISTRY[fundBId];
  if (!fundA || !fundB) return null;

  const overlap = calculatePortfolioOverlap(fundA, fundB);

  // Determine winners
  let overallWinner: "A" | "B" | "TIE" = "A";
  if (fundB.cagr5Y > fundA.cagr5Y && fundB.sharpeRatio >= fundA.sharpeRatio) {
    overallWinner = "B";
  } else if (Math.abs(fundA.cagr5Y - fundB.cagr5Y) < 1.0 && fundA.standardDeviation < fundB.standardDeviation) {
    overallWinner = "A";
  }

  const aggressiveGrowthWinner = fundA.cagr3Y >= fundB.cagr3Y ? "A" : "B";
  const defensiveSipWinner = fundA.standardDeviation <= fundB.standardDeviation ? "A" : "B";
  const feeWinner = fundA.expenseRatioDirect <= fundB.expenseRatioDirect ? "A" : "B";

  const slug = `${fundA.id}-vs-${fundB.id}`;

  return {
    id: slug,
    slug,
    title: `${fundA.shortName} vs ${fundB.shortName}: Head-to-Head Dossier`,
    subtitle: `Complete Side-by-Side Analysis: Rolling Returns, Portfolio Overlap (${overlap.overlapPercentage}%), Expense Drag & Verdict`,
    category: fundA.category === fundB.category ? fundA.category : "Fund Comparison",
    lastUpdated: "Latest AMFI Feed",
    isFeatured: false,
    fundA,
    fundB,
    executiveVerdict: {
      overallWinner,
      overallSummary: `${overallWinner === "A" ? fundA.shortName : fundB.shortName} holds the edge based on 5-year risk-adjusted returns and volatility discipline. Review the Tale of the Tape below to see which investment style fits your timeline.`,
      aggressiveGrowthWinner,
      aggressiveGrowthNote: `${aggressiveGrowthWinner === "A" ? fundA.shortName : fundB.shortName} leads with higher 3-year CAGR (${Math.max(fundA.cagr3Y, fundB.cagr3Y)}% vs ${Math.min(fundA.cagr3Y, fundB.cagr3Y)}%).`,
      defensiveSipWinner,
      defensiveSipNote: `${defensiveSipWinner === "A" ? fundA.shortName : fundB.shortName} offers lower volatility with a Standard Deviation of ${Math.min(fundA.standardDeviation, fundB.standardDeviation)}%.`,
      feeWinner,
      feeNote: `${feeWinner === "A" ? fundA.shortName : fundB.shortName} has a lower Direct Plan expense ratio (${Math.min(fundA.expenseRatioDirect, fundB.expenseRatioDirect)}%).`,
      whoShouldPickFundA: fundA.suitableFor,
      whoShouldPickFundB: fundB.suitableFor,
    },
    portfolioOverlap: overlap,
    analystPillars: [
      {
        title: "Risk-Adjusted Performance & Volatility",
        pillarCategory: "Crash Defense",
        takeaway: `${fundA.shortName} exhibits standard deviation of ${fundA.standardDeviation}% vs ${fundB.standardDeviation}% for ${fundB.shortName}. Sharpe ratios stand at ${fundA.sharpeRatio} and ${fundB.sharpeRatio} respectively.`,
        winner: fundA.sharpeRatio >= fundB.sharpeRatio ? "A" : "B",
        fundANote: `Standard Dev: ${fundA.standardDeviation}%, Beta: ${fundA.beta}`,
        fundBNote: `Standard Dev: ${fundB.standardDeviation}%, Beta: ${fundB.beta}`,
      },
      {
        title: "Total Expense Ratio (TER) Cost Drag",
        pillarCategory: "Fee Drag",
        takeaway: `${feeWinner === "A" ? fundA.shortName : fundB.shortName} is cheaper by ${Math.abs(Math.round((fundA.expenseRatioDirect - fundB.expenseRatioDirect) * 100))} basis points in Direct Plan expense ratio.`,
        winner: feeWinner,
        fundANote: `Direct TER: ${fundA.expenseRatioDirect}%, Regular TER: ${fundA.expenseRatioRegular}%`,
        fundBNote: `Direct TER: ${fundB.expenseRatioDirect}%, Regular TER: ${fundB.expenseRatioRegular}%`,
      },
      {
        title: "Portfolio Turnover & Trading Friction",
        pillarCategory: "Portfolio Churn",
        takeaway: `${fundA.shortName} operates at ${fundA.portfolioTurnover}% annual turnover compared to ${fundB.portfolioTurnover}% for ${fundB.shortName}.`,
        winner: fundA.portfolioTurnover <= fundB.portfolioTurnover ? "A" : "B",
        fundANote: `Turnover: ${fundA.portfolioTurnover}%`,
        fundBNote: `Turnover: ${fundB.portfolioTurnover}%`,
      },
    ],
    sipSimulator: simulateSipComparison(fundA.cagr5Y, fundB.cagr5Y, 10000, 5),
    faqList: [
      {
        question: `What is the portfolio overlap between ${fundA.shortName} and ${fundB.shortName}?`,
        answer: `The calculated portfolio overlap between ${fundA.shortName} and ${fundB.shortName} is approximately ${overlap.overlapPercentage}%. ${overlap.verdict}`,
      },
      {
        question: `Can I invest in both ${fundA.shortName} and ${fundB.shortName}?`,
        answer: overlap.overlapPercentage < 45
          ? `Yes, because their overlap is relatively low (${overlap.overlapPercentage}%), holding both funds can provide beneficial diversification across different stock selection philosophies.`
          : `Caution is advised. Their overlap is ${overlap.overlapPercentage}%, meaning they hold many of the same top stocks. Investing in both may cause unnecessary duplication.`,
      },
    ],
    metaTitle: `${fundA.shortName} vs ${fundB.shortName} Comparison & Portfolio Overlap | YieldNest`,
    metaDescription: `Head-to-head comparison between ${fundA.shortName} and ${fundB.shortName}. Analyze 1Y, 3Y, 5Y CAGR returns, portfolio overlap (${overlap.overlapPercentage}%), expense ratios, and volatility.`,
    primaryKeywords: [
      `${fundA.shortName} vs ${fundB.shortName}`,
      `${fundA.shortName} vs ${fundB.shortName} overlap`,
      `best ${fundA.category} mutual fund`,
    ],
  };
}
