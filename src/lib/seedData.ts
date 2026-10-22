import { ArticlePost, Comment, SiteSettings } from "../types";
import { EVERGREEN_GUIDES } from "./evergreenGuides";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "YieldNest.online",
  tagline: "Mutual Fund Data & Tools",
  description: "Data-driven tools and historical metrics for Indian Mutual Funds. Scheme comparisons, compounding calculators, and factual educational guides on YieldNest.online.",
  authorName: "YieldNest Editorial Team",
  authorTitle: "Mutual Fund Data & Tools Desk",
  authorBio: "Dedicated to analyzing historical fund metrics, expense ratios, and quantitative compounding tools for long-term Indian investors.",
  authorCredentials: "Mutual Fund Data & Quantitative Analysis",
  sebiRegistrationNumber: "",
  contactEmail: "data@yieldnest.online",
  supabaseUrl: (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) || "",
  supabaseAnonKey: (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) || "",
  enableAutoSocialScheduling: true,
  googleSearchConsoleVerification: (typeof import.meta !== "undefined" && (import.meta.env?.VITE_GOOGLE_SITE_VERIFICATION || import.meta.env?.GOOGLE_SITE_VERIFICATION)) || "",
};

/**
 * Strictly the 9 canonical Evergreen Investor Guides:
 * 1. What is a Mutual Fund
 * 2. SIP (Systematic Investment Plan)
 * 3. NAV (Net Asset Value)
 * 4. TER (Total Expense Ratio)
 * 5. Direct vs Regular Plans
 * 6. Exit Load
 * 7. CAGR & XIRR
 * 8. How to Read a Factsheet
 * 9. Capital Gains Tax
 */
export const INITIAL_ARTICLES: ArticlePost[] = EVERGREEN_GUIDES;

export const INITIAL_COMMENTS: Comment[] = [];
