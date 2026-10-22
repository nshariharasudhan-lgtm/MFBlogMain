import React from "react";
import {
  Users,
  Target,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  BookOpen,
  ArrowRight,
  Scale,
  HeartHandshake,
  Mail,
  HelpCircle,
  FileText,
  Database,
  Check,
} from "lucide-react";
import { ToolLayout } from "./ToolLayout";
import { SEOHead } from "./SEOHead";
import { ArticleCategory, SiteSettings } from "../types";

interface AboutUsPageProps {
  settings: SiteSettings;
  onNavigateHome: () => void;
  onSelectCategory?: (category: ArticleCategory | "all") => void;
  onNavigateCalculators?: () => void;
  onNavigateCalculator?: (target: string) => void;
  onNavigateFAQ?: () => void;
  onNavigateGlossary?: () => void;
  onNavigateGuides?: (target?: "index" | "how-to-choose" | "redemption") => void;
  onNavigateHubs?: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
  onSearchChange?: (q: string) => void;
  searchQuery?: string;
}

export function AboutUsPage({
  settings,
  onNavigateHome,
  onSelectCategory,
  onNavigateCalculators,
  onNavigateCalculator,
  onNavigateFAQ,
  onNavigateGlossary,
  onNavigateGuides,
  onNavigateHubs,
  onNavigateAbout,
  onNavigateTerms,
  onNavigateToolkit,
  onSearchChange,
  searchQuery,
}: AboutUsPageProps) {
  const breadcrumbs = [
    { label: "Home", href: "/", onClick: onNavigateHome },
    { label: "About & Methodology" },
  ];

  return (
    <ToolLayout
      title="About YieldNest – Mutual Fund Data & Tools"
      intro="Independent quantitative data, factual scheme comparisons, and compounding calculators for Indian mutual fund investors."
      badge="About &amp; Methodology"
      breadcrumbs={breadcrumbs}
      settings={settings}
      onNavigateHome={onNavigateHome}
      onSelectCategory={onSelectCategory}
      onNavigateCalculators={onNavigateCalculators}
      onNavigateCalculator={onNavigateCalculator}
      onNavigateFAQ={onNavigateFAQ}
      onNavigateGlossary={onNavigateGlossary}
      onNavigateGuides={onNavigateGuides}
      onNavigateHubs={onNavigateHubs}
      onNavigateAbout={onNavigateAbout}
      onNavigateTerms={onNavigateTerms}
      onNavigateToolkit={onNavigateToolkit}
      activeMenu="about"
      onSearchChange={onSearchChange}
      searchQuery={searchQuery}
    >
      <SEOHead
        settings={settings}
        customTitle="About Us & Methodology | YieldNest – Mutual Fund Data & Tools"
        customDescription="Learn about YieldNest.online: author credentials, quantitative data methodology, AMC factsheet verification, and free mutual fund compounding calculators."
        customKeywords="about YieldNest, mutual fund data tools India, AMC factsheet analysis, direct mutual funds education, mutual fund calculators"
        urlPath="/about"
      />

      <div className="space-y-12 pb-8 font-sans">
        {/* Core Mission Banner */}
        <section className="bg-white rounded-2xl border border-[#EAE8E0] p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Conflict-Free · Zero Distributor Commissions · Official Disclosures</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
              Factual Mutual Fund Data &amp; Compounding Tools for Indian Investors
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              YieldNest is an independent financial technology publication dedicated to building transparent mutual fund calculators, scheme comparison tables, and factual educational guides. Every data point published on YieldNest is sourced directly from official AMC factsheets and AMFI regulatory filings.
            </p>
          </div>
        </section>

        {/* 1. DEDICATED AUTHOR & EDITORIAL TEAM SECTION */}
        <section id="author-team" className="bg-white rounded-2xl border border-[#EAE8E0] p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Author &amp; Editorial Team</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            About the Editorial Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-4 text-sm text-stone-700 leading-relaxed">
              <p>
                YieldNest is authored and maintained by a dedicated team of quantitative financial technologists and long-term mutual fund practitioners based in India.
              </p>
              <p>
                <strong>Editorial Lead &amp; Data Architect:</strong> Hari Hara Sudhan (Founder &amp; Principal Analyst). With a deep background in quantitative modeling, software engineering, and personal finance analytics, the team built YieldNest to solve the transparency vacuum in retail mutual fund investing.
              </p>
              <p>
                <strong>Zero Commercial Conflicts:</strong> We do not accept distributor trail commissions, broker referral payouts, sponsored fund rankings, or advertising arrangements from Asset Management Companies. Our only objective is providing retail Indian families with factual compounding mathematics and verified factsheet metrics.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
              <div className="font-mono font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                Editorial Desk Standards
              </div>
              <ul className="space-y-2 text-stone-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Manual fact-checking from AMC disclosures</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero AI-generated financial statistics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Mandatory "Source" and "As on date" citations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Strict non-advisory, educational mandate</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. DEDICATED METHODOLOGY SECTION */}
        <section id="methodology" className="bg-white rounded-2xl border border-[#EAE8E0] p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono font-semibold uppercase tracking-wider">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Research &amp; Data Standards</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Our Data Methodology
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-900 flex items-center gap-2 text-base">
                <Database className="w-4 h-4 text-emerald-600 shrink-0" />
                1. Primary Data Sources
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                All mutual fund scheme numbers displayed on YieldNest (including NAV, AUM, Total Expense Ratios, and 1Y/3Y/5Y/10Y CAGRs) are extracted directly from official AMC monthly factsheets published under SEBI guidelines, as well as the AMFI portal. We never rely on secondary scraper aggregators or unofficial third-party estimates.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-stone-900 flex items-center gap-2 text-base">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                2. Mandatory Source Citations
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Every table and data card enforces a strict dual-citation standard: the official source document title (e.g. "PPFAS AMC Monthly Factsheet") and the exact reporting date (e.g. "Data as on 30 Sep 2026"). In our publishing system, saving or publishing is blocked if these citations are omitted.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-stone-900 flex items-center gap-2 text-base">
                <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
                3. Compounding Mathematics &amp; Formulas
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Our compounding tools execute exact mathematical formulas:
                <br />• <strong>CAGR:</strong> [(NAV_end / NAV_start)^(1/N)] - 1
                <br />• <strong>SIP Compounding:</strong> Periodic monthly annuity compounding with end-of-period accumulation.
                <br />• <strong>TER Drag:</strong> Compounded terminal wealth delta comparing Direct plan net return against Regular plan gross return.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-stone-900 flex items-center gap-2 text-base">
                <Scale className="w-4 h-4 text-amber-600 shrink-0" />
                4. Neutral, Non-Ranked Neutrality
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                We do not rank funds as "winners", "losers", or "top picks". Schemes in our comparison tables are sorted neutrally by alphabetical order or by category. Users may sort any column (NAV, AUM, TER, CAGR) to view quantitative metrics objectively according to their own evaluation parameters.
              </p>
            </div>
          </div>
        </section>

        {/* 3. WHO YIELDNEST IS FOR */}
        <section id="who-we-serve" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 text-stone-700 text-xs font-mono font-semibold uppercase tracking-wider">
            <Target className="w-4 h-4 text-stone-600" />
            <span>Target Audience</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Who Is YieldNest Built For?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-5 rounded-xl border border-[#EAE8E0] space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-800 uppercase">01 · Retail SIP Accumulators</div>
              <h3 className="font-semibold text-stone-900 text-base">Salaried SIP Investors</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Investors investing ₹2,000 to ₹50,000 monthly who want to model compounding, annual salary step-ups, and long-term goal accumulation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE8E0] space-y-2">
              <div className="text-xs font-mono font-bold text-amber-800 uppercase">02 · Direct Plan Switchers</div>
              <h3 className="font-semibold text-stone-900 text-base">DIY Investors</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Investors currently in Regular plans who want to calculate how much wealth they lose to distributor commissions and switch safely to Direct plans.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE8E0] space-y-2">
              <div className="text-xs font-mono font-bold text-blue-800 uppercase">03 · First-Time Investors</div>
              <h3 className="font-semibold text-stone-900 text-base">Beginners</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Savers moving capital beyond Fixed Deposits, PPF, and Gold seeking clear explanations of NAV, exit loads, factsheets, and tax rules.
              </p>
            </div>
          </div>
        </section>

        {/* 4. STATUTORY NON-ADVISORY GUARANTEE */}
        <section id="our-guarantee" className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Regulatory &amp; Editorial Commitment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
            Strict Non-Advisory Guarantee
          </h2>
          <div className="space-y-3 text-stone-300 text-xs sm:text-sm leading-relaxed">
            <p>
              <strong>YieldNest.online is an educational data and tools publication, not a SEBI-registered Investment Adviser (RIA), Research Analyst (RA), or Mutual Fund Distributor.</strong>
            </p>
            <p>
              We do not provide personalized financial advice, manage client assets, or offer buy/sell recommendations. All calculations, factsheet figures, and comparison tables are provided solely for informational and educational purposes.
            </p>
            <p className="text-stone-400 text-xs font-mono pt-2">
              Statutory Notice: Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not guarantee future results.
            </p>
          </div>
        </section>

        {/* 5. CONTACT */}
        <section className="bg-white border border-[#EAE8E0] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
              Questions or Data Corrections?
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
              We welcome data verification inquiries and feedback from investors and analysts.
            </p>
          </div>
          <a
            href="mailto:data@yieldnest.online"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-black transition-colors text-xs font-mono no-underline shadow-xs shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>data@yieldnest.online</span>
          </a>
        </section>
      </div>
    </ToolLayout>
  );
}
