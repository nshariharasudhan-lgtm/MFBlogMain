import React from "react";
import {
  Users,
  Target,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  BookOpen,
  ArrowRight,
  Scale,
  HeartHandshake,
  Compass,
  Mail,
  HelpCircle,
  Award,
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
    { label: "About Us" },
  ];

  return (
    <ToolLayout
      title="About YieldNest"
      intro="Independent quantitative research, unbiased fund category comparisons, and free compounding calculators for Indian mutual fund investors."
      badge="About Our Research Desk"
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
        customTitle="About Us | YieldNest – Independent Mutual Fund Research & Analytics"
        customDescription="Learn about YieldNest.online: who we are, for whom this site is built, why we exist, what we do, and how our independent AMFI-backed analytics help Indian mutual fund investors."
        customKeywords="about YieldNest, mutual fund research India, independent mutual fund analysis, AMFI data analysis, direct mutual funds education"
        urlPath="/about"
      />

      <div className="space-y-12 pb-8">
        {/* Core Mission Banner */}
        <section className="bg-white rounded-2xl border border-[#EAE8E0] p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono-data font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Conflict-Free • Zero Brokerage • Research Desk</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif-editorial font-bold text-stone-900 tracking-tight leading-tight">
              Evidence-based financial literacy for India&apos;s growing investor community.
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans">
              YieldNest is an independent digital research desk committed to bringing mathematical clarity, transparency, and empirical rigor to Indian mutual fund investing. We do not sell investment products, collect broker commissions, or accept sponsored AMC promotional content.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EAE8E0] text-center sm:text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">₹0</div>
              <div className="text-xs text-stone-500 font-mono-data mt-0.5">Distributor Commissions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">100%</div>
              <div className="text-xs text-stone-500 font-mono-data mt-0.5">AMFI & SEBI Grounded</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">7+</div>
              <div className="text-xs text-stone-500 font-mono-data mt-0.5">Free Interactive Tools</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">50+</div>
              <div className="text-xs text-stone-500 font-mono-data mt-0.5">Defined Jargon Terms</div>
            </div>
          </div>
        </section>

        {/* Quick Section Jump Buttons (1-2 Lines, No Horizontal Scroll) */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#EAE8E0] shadow-2xs space-y-2">
          <div className="text-[10px] font-mono-data font-semibold text-stone-500 uppercase tracking-wider">
            Explore About YieldNest (Jump to Section):
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <a
              href="#for-whom"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Users className="w-3.5 h-3.5 text-current" />
              <span>For Whom It&apos;s For</span>
            </a>
            <a
              href="#why-we-exist"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Target className="w-3.5 h-3.5 text-current" />
              <span>Why We Exist</span>
            </a>
            <a
              href="#what-we-do"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1.5 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-current" />
              <span>What We Provide</span>
            </a>
            <a
              href="#how-we-help"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1.5 shadow-2xs"
            >
              <TrendingUp className="w-3.5 h-3.5 text-current" />
              <span>How We Help</span>
            </a>
            <a
              href="#our-principles"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Scale className="w-3.5 h-3.5 text-current" />
              <span>Core Principles</span>
            </a>
            <a
              href="#contact-desk"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-current" />
              <span>Contact Desk</span>
            </a>
          </div>
        </div>

        {/* 1. FOR WHOM THE SITE IS FOR */}
        <section id="for-whom" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono-data font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Audience & Personas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-stone-900">
            For Whom Is YieldNest Built?
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
            Whether you are starting your first ₹500 SIP or managing a multi-crore family portfolio across asset classes, YieldNest is tailored for investors who value verified facts over marketing hype:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="bg-white p-5 rounded-xl border border-[#EAE8E0] shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-semibold text-stone-900 text-base">Long-Term SIP Investors</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Individuals accumulating wealth for retirement, children&apos;s higher education, or financial independence who want to maximize compounding, eliminate avoidable fees, and optimize annual step-ups.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE8E0] shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-semibold text-stone-900 text-base">DIY & Direct Plan Switchers</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Investors currently enrolled in Regular mutual fund plans who want to calculate how much wealth they lose to distributor trail commissions and understand the mechanics of transitioning safely to Direct plans.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE8E0] shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-semibold text-stone-900 text-base">First-Time Equity Allocators</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Savers moving capital beyond Fixed Deposits, PPF, and Gold who need honest guidance on category risks (Large Cap vs Flexi Cap vs Mid Cap), liquidity stress tests, and volatility cycles.
              </p>
            </div>
          </div>
        </section>

        {/* 2. WHY YIELDNEST EXISTS (THE PROBLEM) */}
        <section id="why-we-exist" className="bg-[#FAF9F5] border border-[#EAE8E0] rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-mono-data font-semibold uppercase tracking-wider">
            <Target className="w-4 h-4 text-amber-700" />
            <span>The Problem We Solve</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-stone-900">
            Why Does YieldNest Exist?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-900 flex items-center gap-2 text-base">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                The Silent Commission Wealth Drain
              </h3>
              <p>
                The Indian mutual fund industry manages over ₹65+ Lakh Crores in assets, yet millions of retail folios remain locked in <strong>Regular Plans</strong>. A regular plan automatically deducts 0.50% to 1.25% from the fund&apos;s NAV every single day to pay distributor trail commissions. Over a 20- to 30-year investing horizon, this seemingly small fee erodes <strong>₹20 to ₹40+ Lakhs</strong> from a typical family retirement corpus for the exact same underlying portfolio.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-900 flex items-center gap-2 text-base">
                <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                Distorted Incentives in Financial Media
              </h3>
              <p>
                Much of modern financial journalism and influencer media is subsidized by broker affiliate links, sponsored fund rankings, or distributor referral fees. Schemes with the highest marketing budgets get promoted, while fundamental risk metrics—such as rolling returns, downside capture, and liquidity stress tests—are omitted. YieldNest was founded to eliminate this conflict of interest.
              </p>
            </div>
          </div>
        </section>

        {/* 3. WHAT WE DO (OUR WORK & PILLARS) */}
        <section id="what-we-do" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono-data font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-stone-900">
            What We Do
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
            Our research desk focuses on four foundational pillars designed to give retail investors institutional analytical clarity:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-white border border-[#EAE8E0] space-y-2">
              <h3 className="font-semibold text-stone-900 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                1. Quantitative Category & Scheme Comparisons
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                We compare peer funds across 3-year and 5-year rolling CAGRs, standard deviations, Sharpe ratios, Sortino ratios, and portfolio stock overlaps. Every figure cites verified AMFI scheme codes and factual NAV milestones.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#EAE8E0] space-y-2">
              <h3 className="font-semibold text-stone-900 text-base flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                2. Fee Compounding & Expense Drag Modeling
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                We model the exact compounding impact of Total Expense Ratios (TER) over 10, 20, and 30 years, demonstrating the quantifiable terminal wealth advantage of commission-free Direct plans.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#EAE8E0] space-y-2">
              <h3 className="font-semibold text-stone-900 text-base flex items-center gap-2">
                <Calculator className="w-4 h-4 text-purple-600" />
                3. Private, Client-Side Financial Calculators
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Our suite of 7 calculators (SIP, Step-Up, Lumpsum, SWP, Goal Planner, Tax Estimator, Cost of Delay) runs 100% locally in your browser. We never collect your phone number, email address, or portfolio data.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#EAE8E0] space-y-2">
              <h3 className="font-semibold text-stone-900 text-base flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                4. Regulatory Frameworks & Educational Guides
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                We unpack SEBI categorization circulars, liquidity stress testing mandates, cut-off timings, and Union Budget tax rules (Section 112A equity LTCG at 12.5% and debt slab rates) into actionable investor guides.
              </p>
            </div>
          </div>
        </section>

        {/* 4. HOW YIELDNEST HELPS YOU (ACTIONABLE IMPACT) */}
        <section id="how-we-help" className="bg-white border border-[#EAE8E0] rounded-2xl p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono-data font-semibold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>Actionable Value</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-stone-900">
            How YieldNest Helps You Make Better Decisions
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 font-semibold block text-sm sm:text-base">
                  Stop Chasing Yesterday&apos;s 1-Year Top Performers
                </strong>
                <span className="text-stone-600 text-xs sm:text-sm leading-relaxed block">
                  Most investors buy mid-cap or small-cap funds near cyclical valuation peaks after reading sensationalist headlines. Our rolling return analyses reveal whether outperformance was persistent alpha or high-beta luck.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 font-semibold block text-sm sm:text-base">
                  Recover Lost Wealth via Direct Plan Switching
                </strong>
                <span className="text-stone-600 text-xs sm:text-sm leading-relaxed block">
                  We provide clear instructions on how to use platforms like MFCentral or AMC websites to convert Regular units to Direct units, accounting for capital gains tax brackets and exit loads.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 font-semibold block text-sm sm:text-base">
                  Accelerate Financial Independence with Step-Up SIPs
                </strong>
                <span className="text-stone-600 text-xs sm:text-sm leading-relaxed block">
                  Using our Step-Up SIP Calculator, discover how increasing your monthly investment by just 10% each year can produce more than double the terminal corpus of a static flat SIP.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 font-semibold block text-sm sm:text-base">
                  Demystify Complex Mutual Fund Terminology
                </strong>
                <span className="text-stone-600 text-xs sm:text-sm leading-relaxed block">
                  Confused by terms like Tracking Error, Portfolio Turnover Ratio (PTR), Standard Deviation, or Sortino Ratio? Our 50+ term glossary provides plain-English definitions with realistic examples.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. EDITORIAL INTEGRITY & REGULATORY MANDATE */}
        <section id="our-principles" className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-data font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Regulatory & Editorial Commitment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-stone-100">
            Our Strict Non-Advisory Guarantee
          </h2>
          <div className="space-y-3 text-stone-300 text-xs sm:text-sm leading-relaxed">
            <p>
              <strong>YieldNest.online is an educational research platform, not a SEBI-registered Investment Adviser (RIA), Research Analyst (RA), or Mutual Fund Distributor.</strong>
            </p>
            <p>
              We do not provide personalized financial advice, manage client funds, or offer one-on-one portfolio recommendations. We do not use language like &ldquo;buy this fund&rdquo; or &ldquo;guaranteed return.&rdquo; All calculations, factsheet summaries, and category evaluations are provided strictly for informational and quantitative comparison purposes.
            </p>
            <p className="text-stone-400 text-xs font-mono-data pt-2">
              Statutory Reminder: Mutual fund investments are subject to market risks; read all scheme related documents carefully before investing. Past performance is not indicative of future returns.
            </p>
          </div>
        </section>

        {/* 6. CONTACT & RESEARCH DESK CHANNELS */}
        <section id="contact-desk" className="bg-white border border-[#EAE8E0] rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 scroll-mt-24">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900">
              Questions, Feedback, or Research Inquiries?
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
              We welcome corrections, methodology inquiries, and feedback from fellow investors and financial researchers.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:research@yieldnest.online"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-black transition-colors text-xs font-medium no-underline shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>research@yieldnest.online</span>
            </a>
            <button
              onClick={() => {
                if (onNavigateFAQ) onNavigateFAQ();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors text-xs font-medium cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Browse FAQ Hub</span>
            </button>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
