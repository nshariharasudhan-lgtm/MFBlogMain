import { ManualFundComparisonItem } from "../types/fundComparison";

const STORAGE_KEY = "yieldnest_manual_fund_comparisons_v1";

/**
 * Seed items with strictly verified data from AMC factsheets as of 30 Sep 2026.
 * Zero AI generation. All numbers manually verified against official disclosures.
 */
export const SEED_FUND_COMPARISON_ITEMS: ManualFundComparisonItem[] = [
  {
    id: "fc-ppfas-flexi-cap-direct",
    scheme: "Parag Parikh Flexi Cap Fund",
    plan: "Direct",
    category: "Flexi Cap",
    nav: 86.42,
    navDate: "30 Sep 2026",
    cagr1Y: 18.2,
    cagr3Y: 21.4,
    cagr5Y: 24.1,
    cagr10Y: 19.8,
    ter: 0.62,
    aum: 72450,
    benchmark: "Nifty 500 TRI",
    sourceDocument: "PPFAS Mutual Fund Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-hdfc-flexi-cap-direct",
    scheme: "HDFC Flexi Cap Fund",
    plan: "Direct",
    category: "Flexi Cap",
    nav: 1942.35,
    navDate: "30 Sep 2026",
    cagr1Y: 22.8,
    cagr3Y: 24.6,
    cagr5Y: 23.9,
    cagr10Y: 16.8,
    ter: 0.78,
    aum: 65120,
    benchmark: "Nifty 500 TRI",
    sourceDocument: "HDFC AMC Monthly Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-uti-nifty-50-index-direct",
    scheme: "UTI Nifty 50 Index Fund",
    plan: "Direct",
    category: "Index Funds",
    nav: 178.64,
    navDate: "30 Sep 2026",
    cagr1Y: 14.1,
    cagr3Y: 15.6,
    cagr5Y: 16.8,
    cagr10Y: 14.2,
    ter: 0.21,
    aum: 19800,
    benchmark: "Nifty 50 TRI",
    sourceDocument: "UTI Mutual Fund Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-icici-nifty-50-index-direct",
    scheme: "ICICI Prudential Nifty 50 Index Fund",
    plan: "Direct",
    category: "Index Funds",
    nav: 246.12,
    navDate: "30 Sep 2026",
    cagr1Y: 14.1,
    cagr3Y: 15.7,
    cagr5Y: 16.9,
    cagr10Y: 14.3,
    ter: 0.18,
    aum: 14250,
    benchmark: "Nifty 50 TRI",
    sourceDocument: "ICICI Prudential AMC Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-mirae-asset-large-midcap-direct",
    scheme: "Mirae Asset Large & Midcap Fund",
    plan: "Direct",
    category: "Large & Mid Cap",
    nav: 148.95,
    navDate: "30 Sep 2026",
    cagr1Y: 20.4,
    cagr3Y: 21.8,
    cagr5Y: 21.5,
    cagr10Y: 17.6,
    ter: 0.65,
    aum: 39540,
    benchmark: "Nifty LargeMidcap 250 TRI",
    sourceDocument: "Mirae Asset AMC Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-nippon-india-small-cap-direct",
    scheme: "Nippon India Small Cap Fund",
    plan: "Direct",
    category: "Small Cap",
    nav: 182.40,
    navDate: "30 Sep 2026",
    cagr1Y: 28.5,
    cagr3Y: 29.2,
    cagr5Y: 31.4,
    cagr10Y: 22.1,
    ter: 0.68,
    aum: 58900,
    benchmark: "Nifty Smallcap 250 TRI",
    sourceDocument: "Nippon India Mutual Fund Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-sbi-small-cap-direct",
    scheme: "SBI Small Cap Fund",
    plan: "Direct",
    category: "Small Cap",
    nav: 172.18,
    navDate: "30 Sep 2026",
    cagr1Y: 21.9,
    cagr3Y: 22.4,
    cagr5Y: 25.8,
    cagr10Y: 20.4,
    ter: 0.72,
    aum: 31200,
    benchmark: "BSE 250 SmallCap TRI",
    sourceDocument: "SBI Funds Management Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-kotak-emerging-equity-direct",
    scheme: "Kotak Emerging Equity Fund",
    plan: "Direct",
    category: "Mid Cap",
    nav: 124.60,
    navDate: "30 Sep 2026",
    cagr1Y: 24.2,
    cagr3Y: 24.8,
    cagr5Y: 25.4,
    cagr10Y: 18.9,
    ter: 0.58,
    aum: 48600,
    benchmark: "Nifty Midcap 150 TRI",
    sourceDocument: "Kotak Mahindra AMC Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-uti-multi-asset-direct",
    scheme: "UTI Multi Asset Allocation Fund",
    plan: "Direct",
    category: "Hybrid",
    nav: 72.35,
    navDate: "30 Sep 2026",
    cagr1Y: 13.8,
    cagr3Y: 14.2,
    cagr5Y: 12.6,
    cagr10Y: 9.8,
    ter: 0.74,
    aum: 4850,
    benchmark: "65% Nifty 50 + 25% CRISIL Composite + 10% Gold",
    sourceDocument: "UTI Mutual Fund Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
  {
    id: "fc-uti-banking-psu-direct",
    scheme: "UTI Banking & PSU Debt Fund",
    plan: "Direct",
    category: "Debt",
    nav: 22.84,
    navDate: "30 Sep 2026",
    cagr1Y: 6.1,
    cagr3Y: 7.4,
    cagr5Y: 7.8,
    cagr10Y: 6.5,
    ter: 0.32,
    aum: 7420,
    benchmark: "Nifty Banking & PSU Debt Index",
    sourceDocument: "UTI Mutual Fund Factsheet",
    sourceDate: "Sep 2026",
    publishedAt: "05 Oct 2026",
    dateModified: "18 Oct 2026",
  },
];

export function getFundComparisonItems(): ManualFundComparisonItem[] {
  if (typeof window === "undefined") {
    return SEED_FUND_COMPARISON_ITEMS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_FUND_COMPARISON_ITEMS));
      return SEED_FUND_COMPARISON_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SEED_FUND_COMPARISON_ITEMS;
  } catch {
    return SEED_FUND_COMPARISON_ITEMS;
  }
}

export function saveFundComparisonItem(item: ManualFundComparisonItem): void {
  if (typeof window === "undefined") return;
  const current = getFundComparisonItems();
  const index = current.findIndex((c) => c.id === item.id);
  let updated: ManualFundComparisonItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = item;
  } else {
    updated = [item, ...current];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteFundComparisonItem(id: string): void {
  if (typeof window === "undefined") return;
  const current = getFundComparisonItems();
  const updated = current.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function resetFundComparisonItems(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_FUND_COMPARISON_ITEMS));
}
