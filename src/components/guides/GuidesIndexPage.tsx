import React from "react";
import {
  BookOpen,
  CheckSquare,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calculator,
  FileText,
  Percent,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { ToolLayout } from "../ToolLayout";
import { SiteSettings, ArticleCategory } from "../../types";
import { EVERGREEN_GUIDES } from "../../lib/evergreenGuides";

interface GuidesIndexPageProps {
  settings: SiteSettings;
  onNavigateHome: () => void;
  onSelectCategory?: (category: ArticleCategory | "all") => void;
  onNavigateCalculators?: () => void;
  onNavigateFAQ?: () => void;
  onNavigateGlossary?: () => void;
  onNavigateGuides?: () => void;
  onNavigateHowToChooseGuide?: () => void;
  onNavigateRedemptionChecklist?: () => void;
  onNavigateHub?: (slug?: string) => void;
  onNavigateHubs?: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
  onSearchChange?: (q: string) => void;
  searchQuery?: string;
  onOpenArticleBySlug?: (slug: string) => void;
}

export function GuidesIndexPage({
  settings,
  onNavigateHome,
  onSelectCategory,
  onNavigateCalculators,
  onNavigateFAQ,
  onNavigateGlossary,
  onNavigateGuides,
  onNavigateHowToChooseGuide,
  onNavigateRedemptionChecklist,
  onNavigateHub,
  onNavigateHubs,
  onNavigateAbout,
  onNavigateTerms,
  onNavigateToolkit,
  onSearchChange,
  searchQuery,
  onOpenArticleBySlug,
}: GuidesIndexPageProps) {
  const handleArticleClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    if (onOpenArticleBySlug) {
      onOpenArticleBySlug(slug);
    } else {
      window.history.pushState({}, "", `/article/${slug}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <ToolLayout
      title="Mutual Fund Evergreen Educational Guides"
      intro="Canonical, factual guides on Indian mutual fund mechanisms, calculation mathematics, fee transparency, and regulatory rules."
      badge="Evergreen Educational Pillars"
      breadcrumbs={[
        { label: "Home", href: "/", onClick: onNavigateHome },
        { label: "Guides", href: "/guides" },
      ]}
      activeMenu="guides"
      settings={settings}
      onNavigateHome={onNavigateHome}
      onSelectCategory={onSelectCategory}
      onNavigateCalculators={onNavigateCalculators}
      onNavigateFAQ={onNavigateFAQ}
      onNavigateGlossary={onNavigateGlossary}
      onNavigateGuides={onNavigateGuides}
      onNavigateHubs={onNavigateHubs}
      onNavigateAbout={onNavigateAbout}
      onNavigateTerms={onNavigateTerms}
      onNavigateToolkit={onNavigateToolkit}
      onSearchChange={onSearchChange}
      searchQuery={searchQuery}
    >
      <div className="space-y-12">
        {/* Intro Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-100/80 border border-stone-200 font-sans space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Factual Indian Investor Curriculum · SEBI &amp; AMFI Rules</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            9 Canonical Investor Guides
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
            Clean, zero-jargon guides explaining core mutual fund mechanics: from unit creation and NAV accounting to compounding formulas, distributor commission drag, and capital gains taxation.
          </p>
        </div>

        {/* The 9 Canonical Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
          {EVERGREEN_GUIDES.map((guide, idx) => {
            const isHow = guide.slug.startsWith("how-to") || guide.slug.includes("cagr") || guide.slug.includes("direct-vs-regular");
            const isWhere = guide.slug.includes("tax");
            const questionType = isWhere ? "Where" : isHow ? "How" : "What";

            return (
            <a
              key={guide.slug}
              href={`/article/${guide.slug}`}
              onClick={(e) => handleArticleClick(e, guide.slug)}
              className="p-5 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between group no-underline text-inherit"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono-data text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-emerald-800 uppercase tracking-wide">
                      {questionType} Question
                    </span>
                  </div>
                  <span>
                    {guide.readTimeMinutes} min read
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono font-medium text-emerald-800">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            );
          })}
        </div>

        {/* Pre-Investment & Redemption Audits */}
        <div className="border-t border-stone-200 pt-8 space-y-4 font-sans">
          <h3 className="text-lg font-bold font-serif text-stone-900">
            Interactive Checklists &amp; Due Diligence Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/guides/how-to-choose-a-mutual-fund"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHowToChooseGuide?.();
              }}
              className="p-4 rounded-xl bg-white border border-stone-200 hover:border-stone-400 p-4 transition-all flex items-start gap-3 no-underline text-inherit group"
            >
              <CheckSquare className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-stone-900 group-hover:text-emerald-800">
                  How to Choose a Fund: 10-Point Checklist
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  10 quantitative due diligence checks before committing capital plus an interactive SEBI category matching quiz.
                </div>
              </div>
            </a>

            <a
              href="/guides/redemption-checklist"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRedemptionChecklist?.();
              }}
              className="p-4 rounded-xl bg-white border border-stone-200 hover:border-stone-400 p-4 transition-all flex items-start gap-3 no-underline text-inherit group"
            >
              <Printer className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-stone-900 group-hover:text-blue-800">
                  Printable Redemption Checklist
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  12 verification checkpoints: exit load timers, ELSS lock-in rules, Section 112A tax exemption, and cut-off timings.
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Statutory Regulatory Disclaimer */}
        <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 font-sans space-y-1">
          <div className="font-bold text-stone-800 font-mono">
            Statutory Regulatory Disclaimer
          </div>
          <p className="leading-relaxed">
            Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. The guides provided here are for educational purposes only and do not constitute investment advice or recommendation.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
