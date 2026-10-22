/**
 * Types for Manual Mutual Fund Comparison Table and Form.
 * Required fields per specification:
 * - scheme
 * - plan (Direct / Regular)
 * - category
 * - nav
 * - navDate ("DD Mon YYYY")
 * - 1Y / 3Y / 5Y / 10Y CAGR (%)
 * - ter (%)
 * - aum (₹ Cr)
 * - benchmark
 * - sourceDocument
 * - sourceDate
 * 
 * Strict policy: All numbers entered manually; never AI-generated.
 * Block publishing if source or "as on" date is missing.
 */

export type FundPlanType = "Direct" | "Regular";

export interface ManualFundComparisonItem {
  id: string;
  scheme: string; // e.g. "Parag Parikh Flexi Cap Fund"
  plan: FundPlanType; // "Direct" | "Regular"
  category: string; // e.g. "Flexi Cap", "Large Cap", "Mid Cap", "Small Cap", "Index"
  nav: number; // e.g. 84.52
  navDate: string; // "DD Mon YYYY", e.g. "30 Sep 2026"
  cagr1Y: number; // e.g. 18.4
  cagr3Y: number; // e.g. 21.2
  cagr5Y: number; // e.g. 23.8
  cagr10Y?: number | null; // e.g. 19.5 or null if < 10 years
  ter: number; // Total Expense Ratio %, e.g. 0.62
  aum: number; // AUM in ₹ Cr, e.g. 68420
  benchmark: string; // e.g. "Nifty 500 TRI"
  sourceDocument: string; // e.g. "PPFAS AMC Monthly Factsheet"
  sourceDate: string; // e.g. "Sep 2026"
  publishedAt: string; // "DD Mon YYYY"
  dateModified?: string; // "DD Mon YYYY"
}

export interface FundComparisonValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateFundComparisonItem(
  item: Partial<ManualFundComparisonItem>
): FundComparisonValidationResult {
  const errors: string[] = [];

  if (!item.scheme || !item.scheme.trim()) {
    errors.push("Scheme name is required.");
  }
  if (!item.plan) {
    errors.push("Plan (Direct or Regular) is required.");
  }
  if (!item.category || !item.category.trim()) {
    errors.push("Fund Category is required.");
  }
  if (item.nav === undefined || item.nav === null || isNaN(Number(item.nav)) || Number(item.nav) <= 0) {
    errors.push("Valid NAV is required.");
  }
  if (!item.navDate || !item.navDate.trim()) {
    errors.push("NAV Date ('Data as on' date) is strictly required to publish.");
  }
  if (!item.sourceDocument || !item.sourceDocument.trim()) {
    errors.push("Source Document (e.g. AMC Factsheet) is strictly required to publish.");
  }
  if (!item.sourceDate || !item.sourceDate.trim()) {
    errors.push("Source Date / Month (e.g. Sep 2026) is strictly required to publish.");
  }
  if (item.ter === undefined || item.ter === null || isNaN(Number(item.ter)) || Number(item.ter) < 0) {
    errors.push("Total Expense Ratio (TER %) is required.");
  }
  if (item.aum === undefined || item.aum === null || isNaN(Number(item.aum)) || Number(item.aum) <= 0) {
    errors.push("AUM (₹ Cr) is required.");
  }
  if (!item.benchmark || !item.benchmark.trim()) {
    errors.push("Benchmark index is required.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
