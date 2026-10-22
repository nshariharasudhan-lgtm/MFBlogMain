import React from "react";
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Scale,
  BookOpen,
  DollarSign,
  PieChart,
  FileText,
  Clock,
  CheckCircle2,
  ExternalLink,
  Percent,
} from "lucide-react";
import { ArticlePost, ArticleCategory } from "../types";
import { FundComparisonTableView } from "./comparisons/FundComparisonTableView";
import { EVERGREEN_GUIDES } from "../lib/evergreenGuides";

interface HomePageProps {
  articles: ArticlePost[];
  onOpenArticle: (post: ArticlePost) => void;
  onNavigateCalculator: (calculatorUrl?: string) => void;
  onNavigateCalculators: () => void;
  onNavigateHub: (slug: string) => void;
  onNavigateHubs: () => void;
  onNavigateGuide: (guideId?: "how-to-choose" | "redemption" | "index") => void;
  onNavigateGlossary: () => void;
  onNavigateMethodology: () => void;
  onSelectCategory: (category: ArticleCategory | "all") => void;
  onViewAllArticles: () => void;
}

export const POPULAR_CALCULATORS = [
  {
    name: "Direct vs Regular Calculator",
    slug: "direct-vs-regular",
    url: "/calculators/direct-vs-regular",
    description: "Calculate how distributor trail commissions and Total Expense Ratio (TER) drag erode your mutual fund wealth over 10 to 30 years.",
    icon: DollarSign,
    badge: "Cost Drag",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Step-Up SIP Calculator",
    slug: "step-up-sip",
    url: "/calculators/step-up-sip",
    description: "Simulate how annual SIP top-ups (5% to 25%) linked to salary appraisals accelerate mutual fund corpus creation.",
    icon: TrendingUp,
    badge: "Top-Up SIP",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    name: "SIP Compounding Calculator",
    slug: "sip",
    url: "/calculators/sip",
    description: "Calculate future maturity value of your monthly Systematic Investment Plan (SIP) in Indian mutual funds with compounding chart.",
    icon: Calculator,
    badge: "Core Planning",
    badgeColor: "bg-stone-100 text-stone-800",
  },
  {
    name: "Lumpsum Calculator",
    slug: "lumpsum",
    url: "/calculators/lumpsum",
    description: "Calculate multi-year compounded returns on one-time lumpsum mutual fund investments in India.",
    icon: PieChart,
    badge: "One-Time",
    badgeColor: "bg-stone-100 text-stone-800",
  },
  {
    name: "SWP Withdrawal Calculator",
    slug: "swp",
    url: "/calculators/swp",
    description: "Simulate systematic monthly cash withdrawals from your mutual fund corpus for retirement cashflow planning.",
    icon: Clock,
    badge: "Retirement",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    name: "Goal Planner Calculator",
    slug: "goal-planner",
    url: "/calculators/goal-planner",
    description: "Compute the required monthly SIP needed to build targeted corpuses for child education, home purchase, or retirement.",
    icon: CheckCircle2,
    badge: "Target SIP",
    badgeColor: "bg-indigo-100 text-indigo-800",
  },
  {
    name: "Capital Gains Tax Estimator",
    slug: "tax-estimator",
    url: "/calculators/tax-estimator",
    description: "Calculate Section 112A LTCG tax, STCG tax, holding period classification, and net realization proceeds on mutual fund redemptions.",
    icon: Percent,
    badge: "Tax (2026)",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    name: "Cost of Delay Calculator",
    slug: "cost-of-delay",
    url: "/calculators/cost-of-delay",
    description: "Calculate the exact monetary loss caused by postponing your mutual fund SIP start date by 6 months, 1 year, or 2 years.",
    icon: Clock,
    badge: "Opportunity Loss",
    badgeColor: "bg-rose-100 text-rose-800",
  },
  {
    name: "SIP vs Lumpsum Comparator",
    slug: "sip-vs-lumpsum",
    url: "/calculators/sip-vs-lumpsum",
    description: "Side-by-side comparison between lump-sum investing and staggered monthly SIPs across identical timelines.",
    icon: Scale,
    badge: "Comparator",
    badgeColor: "bg-teal-100 text-teal-800",
  },
];

export function HomePage({
  articles,
  onOpenArticle,
  onNavigateCalculator,
  onNavigateCalculators,
  onNavigateHub,
  onNavigateHubs,
  onNavigateGuide,
  onNavigateGlossary,
  onNavigateMethodology,
  onSelectCategory,
  onViewAllArticles,
}: HomePageProps) {
  const handleLinkClick = (e: React.MouseEvent, action: () => void, path: string) => {
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      action();
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const guidesList = EVERGREEN_GUIDES;

  return (
    <div className="space-y-16 sm:space-y-20 pb-12 font-serif-editorial">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Leading with Tools & Data)                 */}
      {/* ============================================================ */}
      <section
        aria-label="Welcome to YieldNest"
        className="relative overflow-hidden pt-4 pb-8 sm:py-12 border-b border-[#EAE8E0]"
      >
        <div className="max-w-4xl mx-auto text-center space-y-5 px-2">
          {/* Statutory Subtitle */}
          <div className="inline-flex items-center gap-2 text-xs font-mono-data text-stone-600 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
            <span>Conflict-Free · No Distributor Commissions · AMFI Disclosures</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.15]">
            Mutual Fund Data &amp; Tools for Indian Investors
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#59554C] font-sans max-w-2xl mx-auto leading-relaxed">
            Data-driven scheme comparison tables, quantitative compounding calculators, and factual educational guides. Every number verified directly against official AMC monthly factsheets.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 font-sans">
            <a
              href="/calculators"
              onClick={(e) =>
                handleLinkClick(e, onNavigateCalculators, "/calculators")
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-sm font-semibold tracking-wide transition-all shadow-sm cursor-pointer no-underline group"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Explore Calculators Suite</span>
              <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="#fund-comparison"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("fund-comparison");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-sm font-medium border border-stone-300 transition-colors cursor-pointer no-underline text-center"
            >
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>View Scheme Comparison Table</span>
            </a>

            <a
              href="/guides"
              onClick={(e) =>
                handleLinkClick(e, () => onNavigateGuide?.("index"), "/guides")
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-sm font-medium border border-stone-300 transition-colors cursor-pointer no-underline text-center"
            >
              <BookOpen className="w-4 h-4 text-stone-600" />
              <span>Evergreen Guides</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SECTION: MUTUAL FUND COMPARISON TABLE                     */}
      {/* ============================================================ */}
      <section id="fund-comparison" aria-label="Fund Comparison Data" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE8E0] pb-3 gap-2">
          <div>
            <span className="text-xs font-mono-data text-emerald-800 font-semibold uppercase tracking-wider block">
              Section 1 · Official Disclosures
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-serif">
              Mutual Fund Scheme Comparison
            </h2>
          </div>
          <p className="text-xs text-stone-500 font-mono-data">
            Neutral non-ranked sorting · Verified AMC factsheets
          </p>
        </div>

        {/* Embedded Interactive Comparison Table */}
        <FundComparisonTableView onOpenCalculator={onNavigateCalculator} />
      </section>

      {/* ============================================================ */}
      {/* 3. SECTION: QUANTITATIVE CALCULATORS SUITE                  */}
      {/* ============================================================ */}
      <section aria-label="Mutual Fund Calculators" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE8E0] pb-3 gap-2">
          <div>
            <span className="text-xs font-mono-data text-emerald-800 font-semibold uppercase tracking-wider block">
              Section 2 · Compounding Tools
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-serif">
              Mutual Fund Calculators Suite
            </h2>
          </div>
          <a
            href="/calculators"
            onClick={(e) => handleLinkClick(e, onNavigateCalculators, "/calculators")}
            className="text-xs font-mono-data text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View All 9 Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 9 Calculators Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
          {POPULAR_CALCULATORS.map((calc) => {
            const Icon = calc.icon;
            return (
              <a
                key={calc.slug}
                href={calc.url}
                onClick={(e) =>
                  handleLinkClick(e, () => onNavigateCalculator(calc.url), calc.url)
                }
                className="p-5 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between group no-underline text-inherit cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-stone-100 text-stone-800 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${calc.badgeColor}`}>
                      {calc.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {calc.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {calc.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono font-medium text-emerald-800">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SECTION: THE 9 CANONICAL EVERGREEN GUIDES                */}
      {/* ============================================================ */}
      <section aria-label="Evergreen Guides" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE8E0] pb-3 gap-2">
          <div>
            <span className="text-xs font-mono-data text-emerald-800 font-semibold uppercase tracking-wider block">
              Section 3 · Core Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-serif">
              Evergreen Investor Guides
            </h2>
          </div>
          <a
            href="/guides"
            onClick={(e) => handleLinkClick(e, () => onNavigateGuide?.("index"), "/guides")}
            className="text-xs font-mono-data text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 9 Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
          {guidesList.map((guide, idx) => {
            const isHow = guide.slug.startsWith("how-to") || guide.slug.includes("cagr") || guide.slug.includes("direct-vs-regular");
            const isWhere = guide.slug.includes("tax");
            const questionType = isWhere ? "Where" : isHow ? "How" : "What";

            return (
            <a
              key={guide.slug}
              href={`/article/${guide.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onOpenArticle(guide);
                window.history.pushState({}, "", `/article/${guide.slug}`);
                window.dispatchEvent(new PopStateEvent("popstate"));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="p-5 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between group no-underline text-inherit cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono-data text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-emerald-800 uppercase tracking-wide">
                      {questionType} Question
                    </span>
                  </div>
                  <span>{guide.readTimeMinutes} min read</span>
                </div>

                <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono font-medium text-emerald-800">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. STATUTORY DISCLAIMER & METHODOLOGY PROMISE                */}
      {/* ============================================================ */}
      <section className="p-6 rounded-2xl bg-white border border-stone-200 font-sans space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-stone-700" />
          <h3 className="font-serif text-base font-bold text-stone-900">
            Statutory Notice &amp; Compliance Policy
          </h3>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. YieldNest.online provides quantitative financial tools, factsheet data compilations, and factual educational guides for public informational purposes only. This publication does not provide financial advisory services, distributor recommendations, or individualized portfolio allocations.
        </p>
        <div className="flex items-center gap-4 text-xs font-mono pt-1 text-emerald-800">
          <a
            href="/methodology"
            onClick={(e) => handleLinkClick(e, onNavigateMethodology, "/methodology")}
            className="hover:underline flex items-center gap-1"
          >
            <span>Read Data Methodology &amp; Sources</span>
            <ArrowRight className="w-3 h-3" />
          </a>
          <span className="text-stone-300">·</span>
          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, () => onNavigateGuide?.("how-to-choose"), "/about")}
            className="hover:underline"
          >
            About YieldNest Team
          </a>
        </div>
      </section>
    </div>
  );
}
