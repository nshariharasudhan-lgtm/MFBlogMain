import React from "react";
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Scale,
  Sparkles,
  BookOpen,
  Compass,
  Clock,
  CheckCircle2,
  PieChart,
  DollarSign,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { ArticlePost, ArticleCategory } from "../types";
import { useLanguage } from "../context/LanguageContext";

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
  const { isHindi } = useLanguage();

  // Select 6 featured high-impact research articles
  const featuredArticles = articles.slice(0, 6);

  const handleLinkClick = (e: React.MouseEvent, action: () => void, path: string) => {
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      action();
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-12 font-serif-editorial">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section
        aria-label="Welcome to YieldNest"
        className="relative overflow-hidden pt-4 pb-8 sm:py-12 border-b border-[#EAE8E0]"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 px-2">
          {/* Editorial Tagline */}
          <div className="inline-flex items-center gap-2 text-xs font-mono-data text-stone-600 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
            <span>100% Conflict-Free · No Distributor Commissions · AMFI &amp; SEBI Data</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.15]">
            Independent Mutual Fund Research and Calculators for Indian Investors
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-[#59554C] font-sans max-w-2xl mx-auto leading-relaxed">
            Unbiased fund comparisons, practical compounding tools, and evidence-backed analytics. Designed to help retail and DIY wealth-builders make confident, conflict-free investment decisions.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-sans">
            <a
              href="/calculators/direct-vs-regular"
              onClick={(e) =>
                handleLinkClick(
                  e,
                  () => onNavigateCalculator("/calculators/direct-vs-regular"),
                  "/calculators/direct-vs-regular"
                )
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-sm font-semibold tracking-wide transition-all shadow-sm cursor-pointer no-underline group"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Try the Direct vs Regular Calculator</span>
              <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="/category/fund-comparison"
                onClick={(e) =>
                  handleLinkClick(
                    e,
                    () => onSelectCategory("Fund Comparison"),
                    "/category/fund-comparison"
                  )
                }
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-sm font-medium border border-stone-300 transition-colors cursor-pointer no-underline text-center"
              >
                <span>Explore Fund Comparisons</span>
              </a>

              <a
                href="/hub/sip-swp-stp"
                onClick={(e) =>
                  handleLinkClick(
                    e,
                    () => onNavigateHub("sip-swp-stp"),
                    "/hub/sip-swp-stp"
                  )
                }
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-sm font-medium border border-stone-300 transition-colors cursor-pointer no-underline text-center"
              >
                <span>Learn SIP Basics</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THREE CLEAR USER PATHS                                    */}
      {/* ============================================================ */}
      <section aria-label="Guided Investor Paths" className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-[#EAE8E0] pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
            Where would you like to start?
          </h2>
          <span className="text-xs font-mono-data text-stone-500 hidden sm:inline">
            Choose your current objective
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
          {/* Path 1: Beginner */}
          <div className="bg-white border border-[#E5E1D3] rounded-2xl p-6 flex flex-col justify-between hover:border-stone-400 hover:shadow-xs transition-all space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-700" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-editorial text-lg font-bold text-[#1A1A1A] group-hover:text-blue-900 transition-colors">
                  “I’m new to mutual funds”
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Learn how mutual funds pool assets, decode NAV, understand the Growth vs IDCW tax difference, and evaluate your first fund using our due diligence framework.
                </p>
              </div>
              <div className="pt-2 text-xs text-stone-500 font-mono-data space-y-1">
                <div>· SIP Compounding Fundamentals</div>
                <div>· SEBI 3-Tier Fiduciary Safeguard</div>
                <div>· Due Diligence Checklist</div>
              </div>
            </div>

            <a
              href="/hub/basics"
              onClick={(e) => handleLinkClick(e, () => onNavigateHub("basics"), "/hub/basics")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-blue-800 pt-2 cursor-pointer no-underline"
            >
              <span>Start Beginner Foundation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Path 2: Compare Funds */}
          <div className="bg-white border border-[#E5E1D3] rounded-2xl p-6 flex flex-col justify-between hover:border-stone-400 hover:shadow-xs transition-all space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Scale className="w-5 h-5 text-amber-700" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-editorial text-lg font-bold text-[#1A1A1A] group-hover:text-amber-900 transition-colors">
                  “I want to compare funds”
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Review side-by-side scheme metrics, 3Y/5Y daily rolling returns, downside capture ratios, expense ratio commission drag, and category peer rankings.
                </p>
              </div>
              <div className="pt-2 text-xs text-stone-500 font-mono-data space-y-1">
                <div>· Parag Parikh Flexi vs Mirae Large &amp; Mid</div>
                <div>· Quant Small Cap vs Nippon India Small Cap</div>
                <div>· Nifty 50 Index vs Active Large Cap</div>
              </div>
            </div>

            <a
              href="/category/fund-comparison"
              onClick={(e) =>
                handleLinkClick(e, () => onSelectCategory("Fund Comparison"), "/category/fund-comparison")
              }
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-amber-800 pt-2 cursor-pointer no-underline"
            >
              <span>Explore Fund Comparisons</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Path 3: Financial Planning & Calculators */}
          <div className="bg-white border border-[#E5E1D3] rounded-2xl p-6 flex flex-col justify-between hover:border-stone-400 hover:shadow-xs transition-all space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-editorial text-lg font-bold text-[#1A1A1A] group-hover:text-emerald-900 transition-colors">
                  “I want to plan my investments”
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Simulate compounding scenarios: calculate your future corpus with annual step-ups, quantify procrastination costs with delay math, and plan goal targets.
                </p>
              </div>
              <div className="pt-2 text-xs text-stone-500 font-mono-data space-y-1">
                <div>· Step-Up SIP Calculator</div>
                <div>· Cost of Delay Procrastination Audit</div>
                <div>· Goal-Based Required SIP Planner</div>
              </div>
            </div>

            <a
              href="/calculators"
              onClick={(e) => handleLinkClick(e, onNavigateCalculators, "/calculators")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-emerald-800 pt-2 cursor-pointer no-underline"
            >
              <span>Launch Calculator Suite</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURED CALCULATORS SECTION                              */}
      {/* ============================================================ */}
      <section aria-label="Featured Calculators" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EAE8E0] pb-3">
          <div>
            <div className="text-xs font-mono-data uppercase tracking-wider text-emerald-800 font-bold">
              Interactive Financial Tools
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Essential Mutual Fund Calculators
            </h2>
          </div>
          <a
            href="/calculators"
            onClick={(e) => handleLinkClick(e, onNavigateCalculators, "/calculators")}
            className="text-xs font-mono-data text-stone-700 hover:text-black underline font-semibold cursor-pointer"
          >
            View All 7 Calculators →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
          {/* Featured Calc 1: Direct vs Regular */}
          <div className="bg-[#FAF9F5] border border-[#E5E1D3] rounded-2xl p-6 flex flex-col justify-between hover:border-stone-400 transition-all space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-data uppercase font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                  Most Popular
                </span>
                <span className="text-xs font-mono-data text-stone-500">Fee Audit</span>
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#1A1A1A]">
                Direct vs Regular Mutual Fund Calculator
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                See exactly how much wealth you lose to distributor trail commissions and Total Expense Ratio (TER) drag over 10, 20, and 30-year SIP tenures.
              </p>
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="font-mono-data text-[11px] text-stone-500">Key Insight:</div>
                <div className="font-semibold text-stone-900">
                  A 1.0% distributor commission can cost over ₹25–40 Lakhs on a ₹15,000 monthly SIP over 25 years.
                </div>
              </div>
            </div>

            <a
              href="/calculators/direct-vs-regular"
              onClick={(e) =>
                handleLinkClick(
                  e,
                  () => onNavigateCalculator("/calculators/direct-vs-regular"),
                  "/calculators/direct-vs-regular"
                )
              }
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold font-mono-data transition-all cursor-pointer no-underline"
            >
              <span>Calculate Commission Drag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Featured Calc 2: Step-Up SIP */}
          <div className="bg-[#FAF9F5] border border-[#E5E1D3] rounded-2xl p-6 flex flex-col justify-between hover:border-stone-400 transition-all space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-data uppercase font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded">
                  Wealth Accelerator
                </span>
                <span className="text-xs font-mono-data text-stone-500">Compounding</span>
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#1A1A1A]">
                Step-Up SIP Calculator
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Simulate how increasing your monthly SIP by 5% to 15% each year alongside salary increments dramatically accelerates your final maturity corpus.
              </p>
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="font-mono-data text-[11px] text-stone-500">Compounding Multiplier:</div>
                <div className="font-semibold text-stone-900">
                  Stepping up a ₹10,000 SIP by 10% annually nearly doubles your 20-year corpus compared to a flat SIP.
                </div>
              </div>
            </div>

            <a
              href="/calculators/step-up-sip"
              onClick={(e) =>
                handleLinkClick(
                  e,
                  () => onNavigateCalculator("/calculators/step-up-sip"),
                  "/calculators/step-up-sip"
                )
              }
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-xs font-semibold font-mono-data transition-all cursor-pointer no-underline"
            >
              <span>Simulate Step-Up Compounding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Featured Calc 3: Cost of Delay */}
          <div className="bg-[#FAF9F5] border border-[#E5E1D3] rounded-2xl p-6 flex flex-col justify-between hover:border-stone-400 transition-all space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-data uppercase font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                  Opportunity Cost
                </span>
                <span className="text-xs font-mono-data text-stone-500">Delay Penalty</span>
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#1A1A1A]">
                Cost of Delay Calculator
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Find out the exact financial penalty of delaying your SIP start date by 6 months, 1 year, or 2 years due to market timing hesitation.
              </p>
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="font-mono-data text-[11px] text-stone-500">Procrastination Cost:</div>
                <div className="font-semibold text-stone-900">
                  Waiting just 1 year to start a 20-year ₹10,000 SIP can permanently cost ₹10 Lakhs in lost terminal compounding.
                </div>
              </div>
            </div>

            <a
              href="/calculators/cost-of-delay"
              onClick={(e) =>
                handleLinkClick(
                  e,
                  () => onNavigateCalculator("/calculators/cost-of-delay"),
                  "/calculators/cost-of-delay"
                )
              }
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-xs font-semibold font-mono-data transition-all cursor-pointer no-underline"
            >
              <span>Quantify Delay Penalty</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Featured Calc 4: SIP vs Lumpsum */}
          <div className="bg-[#FAF9F5] border border-[#E5E1D3] rounded-2xl p-6 flex flex-col justify-between hover:border-stone-400 transition-all space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-data uppercase font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded">
                  Capital Deployment
                </span>
                <span className="text-xs font-mono-data text-stone-500">Delta Analysis</span>
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#1A1A1A]">
                SIP vs Lumpsum Calculator
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Compare returns between a one-time lump sum capital injection and a staggered monthly SIP across varying market cycles and volatilities.
              </p>
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="font-mono-data text-[11px] text-stone-500">Deployment Strategy:</div>
                <div className="font-semibold text-stone-900">
                  Analyze rupee cost averaging benefits during corrections vs upfront compounding during secular bull runs.
                </div>
              </div>
            </div>

            <a
              href="/calculators/sip-vs-lumpsum"
              onClick={(e) =>
                handleLinkClick(
                  e,
                  () => onNavigateCalculator("/calculators/sip-vs-lumpsum"),
                  "/calculators/sip-vs-lumpsum"
                )
              }
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-xs font-semibold font-mono-data transition-all cursor-pointer no-underline"
            >
              <span>Compare Deployment Modes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WHY YIELDNEST SECTION (3 Core Pillars)                    */}
      {/* ============================================================ */}
      <section
        aria-label="Why YieldNest"
        className="bg-white border border-[#E5E1D3] rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xs font-sans"
      >
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono-data uppercase tracking-wider text-stone-500">
            Our Fiduciary Philosophy
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Why Investors Trust YieldNest
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Unlike distributor portals driven by sales commissions, YieldNest exists purely to give unitholders the unfiltered mathematical facts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Point 1 */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="font-serif-editorial text-lg font-bold text-stone-900">
              Independent, Data-Driven Research
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We hold no AMFI distributor ARN, earn zero trail commissions, and accept zero sponsored fund rankings from AMCs. Every evaluation is strictly objective.
            </p>
          </div>

          {/* Point 2 */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
              <TrendingUp className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="font-serif-editorial text-lg font-bold text-stone-900">
              India-Focused Mutual Fund Analysis
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Calibrated strictly to Indian market frameworks: SEBI scheme categorizations, Section 112A capital gains taxation, and Total Return Index (TRI) benchmarks.
            </p>
          </div>

          {/* Point 3 */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
              <Calculator className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="font-serif-editorial text-lg font-bold text-stone-900">
              Transparent Calculations &amp; Practical Tools
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              All formulas run openly in your browser with explicit assumptions. No black-box projections, misleading return extrapolations, or hidden costs.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
          <span>Read our full data pipeline standards, assumptions, and formula proofs:</span>
          <a
            href="/methodology"
            onClick={(e) => handleLinkClick(e, onNavigateMethodology, "/methodology")}
            className="font-semibold text-stone-900 hover:underline flex items-center gap-1 cursor-pointer no-underline"
          >
            <span>Explore Methodology &amp; Data Sources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. TOPIC HUBS DIRECTORY                                      */}
      {/* ============================================================ */}
      <section aria-label="Topic Hubs" className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-[#EAE8E0] pb-2">
          <div>
            <div className="text-xs font-mono-data uppercase tracking-wider text-stone-500">
              Core Pillars
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              Browse Research by Topic Hub
            </h2>
          </div>
          <a
            href="/hubs"
            onClick={(e) => handleLinkClick(e, onNavigateHubs, "/hubs")}
            className="text-xs font-mono-data text-stone-700 hover:text-black underline cursor-pointer"
          >
            View All Hubs →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
          {/* Hub 1: SIP */}
          <div
            onClick={() => onNavigateHub("sip-swp-stp")}
            className="bg-white border border-[#E5E1D3] hover:border-stone-400 rounded-xl p-5 space-y-2.5 cursor-pointer transition-all group"
          >
            <div className="text-xs font-mono-data text-emerald-800 font-bold">SIP Hub</div>
            <h3 className="font-serif-editorial text-base font-bold text-stone-900 group-hover:text-emerald-900">
              SIP, SWP &amp; Compounding
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Step-up SIP tactics, common investor timing pitfalls, retirement SWP depletion modeling, and rupee cost averaging.
            </p>
            <div className="text-[11px] font-mono-data text-stone-500 pt-1 group-hover:text-stone-900">
              Explore SIP Hub →
            </div>
          </div>

          {/* Hub 2: Costs & Fees */}
          <div
            onClick={() => onNavigateHub("fees")}
            className="bg-white border border-[#E5E1D3] hover:border-stone-400 rounded-xl p-5 space-y-2.5 cursor-pointer transition-all group"
          >
            <div className="text-xs font-mono-data text-amber-800 font-bold">Cost &amp; Fees Hub</div>
            <h3 className="font-serif-editorial text-base font-bold text-stone-900 group-hover:text-amber-900">
              Expense Ratio &amp; Direct Plans
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              TER compounding drag, distributor trail commission breakdowns, exit load timings, and direct plan savings.
            </p>
            <div className="text-[11px] font-mono-data text-stone-500 pt-1 group-hover:text-stone-900">
              Explore Fees Hub →
            </div>
          </div>

          {/* Hub 3: Risk & Volatility */}
          <div
            onClick={() => onNavigateHub("safety-and-risk")}
            className="bg-white border border-[#E5E1D3] hover:border-stone-400 rounded-xl p-5 space-y-2.5 cursor-pointer transition-all group"
          >
            <div className="text-xs font-mono-data text-red-800 font-bold">Risk Hub</div>
            <h3 className="font-serif-editorial text-base font-bold text-stone-900 group-hover:text-red-900">
              Risk &amp; Downside Analytics
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sharpe ratio, Sortino downside capture, Alpha, Beta, standard deviation, and maximum historical drawdown.
            </p>
            <div className="text-[11px] font-mono-data text-stone-500 pt-1 group-hover:text-stone-900">
              Explore Risk Hub →
            </div>
          </div>

          {/* Hub 4: Fund Comparisons */}
          <div
            onClick={() => onNavigateHub("comparisons")}
            className="bg-white border border-[#E5E1D3] hover:border-stone-400 rounded-xl p-5 space-y-2.5 cursor-pointer transition-all group"
          >
            <div className="text-xs font-mono-data text-blue-800 font-bold">Comparison Hub</div>
            <h3 className="font-serif-editorial text-base font-bold text-stone-900 group-hover:text-blue-900">
              Category Comparisons
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Large Cap vs Flexi Cap, Small Cap stress tests, Index tracking error, and side-by-side scheme evaluations.
            </p>
            <div className="text-[11px] font-mono-data text-stone-500 pt-1 group-hover:text-stone-900">
              Explore Comparisons →
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FEATURED 4–6 ARTICLES ONLY                                */}
      {/* ============================================================ */}
      <section aria-label="Featured Research Articles" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EAE8E0] pb-3">
          <div>
            <div className="text-xs font-mono-data uppercase tracking-wider text-stone-500">
              Selected In-Depth Analysis
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Featured Mutual Fund Research
            </h2>
          </div>
          <button
            onClick={onViewAllArticles}
            className="text-xs font-mono-data text-stone-700 hover:text-black underline font-semibold cursor-pointer text-left sm:text-right"
          >
            Browse All {articles.length} Research Reports →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-sans">
          {featuredArticles.map((post) => (
            <article
              key={post.id}
              onClick={() => onOpenArticle(post)}
              className="bg-white border border-[#E5E1D3] rounded-2xl p-5 flex flex-col justify-between hover:border-stone-400 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono-data">
                  <span className="text-stone-800 font-medium">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTimeMinutes || 6} min read</span>
                </div>

                <h3 className="font-serif-editorial text-lg font-bold text-[#1A1A1A] group-hover:text-stone-900 group-hover:underline line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono-data">
                <span>YieldNest Research Desk</span>
                <span className="text-stone-900 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Read Report →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* View All Articles Archive Button */}
        <div className="text-center pt-4 font-sans">
          <button
            onClick={onViewAllArticles}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 text-xs font-semibold font-mono-data tracking-wide transition-all shadow-2xs cursor-pointer"
          >
            <span>Browse Complete Research Archive ({articles.length} Reports)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. REGULATORY & DISCLAIMER FOOTNOTE                          */}
      {/* ============================================================ */}
      <section className="bg-[#F6F4ED] border border-[#E3DFC2] rounded-2xl p-6 font-sans text-xs text-stone-600 space-y-2">
        <div className="font-mono-data text-[11px] font-bold text-stone-900 uppercase">
          Educational Notice &amp; Compliance Safeguard
        </div>
        <p className="leading-relaxed">
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. YieldNest.online provides educational tools, compounding calculations, and quantitative analytics based on statutory AMFI and SEBI data. YieldNest is not a registered investment advisor (RIA) and does not provide personalized investment advice or buy/sell recommendations.
        </p>
      </section>
    </div>
  );
}
