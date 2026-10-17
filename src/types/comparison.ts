export interface StockHolding {
  stock: string;
  ticker?: string;
  sector: string;
  weight: number; // percentage, e.g. 8.45
}

export interface SectorWeight {
  sector: string;
  weight: number;
}

export interface FundProfile {
  id: string;
  schemeCode: string; // AMFI scheme code e.g. "122639"
  name: string;
  shortName: string;
  fundHouse: string;
  category: string; // e.g. "Flexi Cap", "Small Cap", "Large & Mid Cap"
  launchDate: string;
  aumCrores: number;
  nav: number;
  navDate: string;
  expenseRatioDirect: number; // e.g. 0.72
  expenseRatioRegular: number; // e.g. 1.34
  cagr1Y: number; // e.g. 34.2
  cagr3Y: number; // e.g. 21.8
  cagr5Y: number; // e.g. 24.5
  standardDeviation: number; // e.g. 11.4
  sharpeRatio: number; // e.g. 1.45
  beta: number; // e.g. 0.76
  portfolioTurnover: number; // percentage, e.g. 24
  fundManagers: string[];
  benchmark: string;
  topHoldings: StockHolding[];
  sectorAllocation: SectorWeight[];
  pros: string[];
  cons: string[];
  suitableFor: string;
}

export interface ExecutiveVerdict {
  overallWinner: "A" | "B" | "TIE";
  overallSummary: string;
  aggressiveGrowthWinner: "A" | "B" | "TIE";
  aggressiveGrowthNote: string;
  defensiveSipWinner: "A" | "B" | "TIE";
  defensiveSipNote: string;
  feeWinner: "A" | "B" | "TIE";
  feeNote: string;
  whoShouldPickFundA: string;
  whoShouldPickFundB: string;
}

export interface CommonHolding {
  stock: string;
  sector: string;
  weightA: number;
  weightB: number;
  minWeight: number; // overlap contribution
}

export interface PortfolioOverlapAnalysis {
  overlapPercentage: number;
  verdict: string;
  overlapRating: "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";
  commonHoldings: CommonHolding[];
  uniqueHoldingsA: StockHolding[];
  uniqueHoldingsB: StockHolding[];
  commentary: string;
}

export interface AnalystPillar {
  title: string;
  pillarCategory: "Crash Defense" | "Strategy DNA" | "Fee Drag" | "Portfolio Churn";
  takeaway: string;
  winner: "A" | "B" | "EQUAL";
  fundANote: string;
  fundBNote: string;
}

export interface ComparisonFAQ {
  question: string;
  answer: string;
}

export interface FundComparisonDossier {
  id: string;
  slug: string; // e.g. "parag-parikh-flexi-cap-vs-hdfc-flexi-cap"
  title: string;
  subtitle: string;
  category: string;
  lastUpdated: string;
  isFeatured?: boolean;
  fundA: FundProfile;
  fundB: FundProfile;
  executiveVerdict: ExecutiveVerdict;
  portfolioOverlap: PortfolioOverlapAnalysis;
  analystPillars: AnalystPillar[];
  sipSimulator: {
    defaultMonthlyAmount: number;
    tenureYears: number;
    fundAFinalCorpus: number;
    fundBFinalCorpus: number;
    corpusDelta: number;
    totalInvested: number;
  };
  faqList: ComparisonFAQ[];
  metaTitle: string;
  metaDescription: string;
  primaryKeywords: string[];
}
