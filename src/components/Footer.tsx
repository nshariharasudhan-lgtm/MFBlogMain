import React from "react";
import { ShieldAlert } from "lucide-react";
import { ArticleCategory, SiteSettings } from "../types";
import { YieldNestLogo } from "./YieldNestLogo";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  settings: SiteSettings;
  onSelectCategory: (cat: ArticleCategory | "all") => void;
  onNavigateCalculators?: () => void;
  onNavigateCalculator?: (target: string) => void;
  onNavigateFAQ?: () => void;
  onNavigateGlossary?: () => void;
  onNavigateGuides?: (target?: "index" | "how-to-choose" | "redemption") => void;
  onNavigateHubs?: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
  onNavigateMethodology?: () => void;
}

export function Footer({
  settings,
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
  onNavigateMethodology,
}: FooterProps) {
  const { t, isHindi } = useLanguage();
  const categories: ArticleCategory[] = [
    "Fund Comparison",
    "Performance Analysis",
    "Market Trends",
    "Category Deep-Dive",
    "SIP Strategies",
  ];

  const categoryMap: Record<ArticleCategory, string> = {
    "Fund Comparison": "fund-comparison",
    "Performance Analysis": "performance-analysis",
    "Market Trends": "market-trends",
    "Category Deep-Dive": "category-deep-dive",
    "SIP Strategies": "sip-strategies",
  };

  const siteName = settings.siteName || "YieldNest.online";

  const navigateTo = (e: React.MouseEvent, href: string, callback?: () => void) => {
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      if (callback) {
        callback();
      } else {
        window.history.pushState({}, "", href);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#F4F2EB] border-t border-[#EAE8E0] text-stone-700 text-xs">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Publication Identity with Logo */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="inline-block">
              <YieldNestLogo size="sm" showTagline={false} />
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              {settings.description || "Data-driven research on Indian Mutual Funds. Unbiased fund comparisons, rolling return evaluations, portfolio overlap checks, and market analytics."}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-200/70 text-stone-800 text-[11px] font-mono-data">
              <span>Status: Independent Investor Education • yieldnest.online</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 pt-1 text-[11px] text-stone-600 font-mono-data flex-wrap">
              <a
                href="/about"
                onClick={(e) => navigateTo(e, "/about", onNavigateAbout)}
                className="hover:text-stone-900 underline font-medium py-1.5 px-1 min-h-[36px] inline-flex items-center"
              >
                About Us
              </a>
              <span>•</span>
              <a
                href="/methodology"
                onClick={(e) => navigateTo(e, "/methodology", onNavigateMethodology)}
                className="hover:text-stone-900 underline font-medium py-1.5 px-1 min-h-[36px] inline-flex items-center"
              >
                Methodology &amp; Data Sources
              </a>
              <span>•</span>
              <a
                href="/terms"
                onClick={(e) => navigateTo(e, "/terms", onNavigateTerms)}
                className="hover:text-stone-900 underline font-medium py-1.5 px-1 min-h-[36px] inline-flex items-center"
              >
                Terms of Use
              </a>
            </div>
          </div>

          {/* Research Categories */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-semibold text-stone-900 font-mono-data uppercase tracking-wider text-[11px]">
              Research Categories
            </div>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href={`/category/${categoryMap[cat]}`}
                    onClick={(e) => navigateTo(e, `/category/${categoryMap[cat]}`, () => onSelectCategory(cat))}
                    className="text-stone-700 hover:text-black transition-colors no-underline py-2.5 px-1.5 min-h-[44px] flex items-center text-xs font-medium"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Educational Resources & Tools */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-semibold text-stone-900 font-mono-data uppercase tracking-wider text-[11px]">
              Investor Resources
            </div>
            <ul className="space-y-0.5 text-stone-600 text-xs">
              <li>
                <a
                  href="/toolkit"
                  onClick={(e) => navigateTo(e, "/toolkit", onNavigateToolkit)}
                  className="text-stone-900 font-semibold hover:text-black transition-colors flex items-center gap-1.5 py-2 px-1 min-h-[44px] text-xs"
                >
                  <span>✨ All Tools &amp; Hubs Directory</span>
                </a>
              </li>
              <li>
                <a
                  href="/hubs"
                  onClick={(e) => navigateTo(e, "/hubs", onNavigateHubs)}
                  className="text-stone-700 hover:text-black transition-colors flex items-center gap-1.5 py-2 px-1 min-h-[44px] text-xs font-medium"
                >
                  <span>🎯 Topic Hubs</span>
                </a>
              </li>
              <li>
                <a
                  href="/calculators"
                  onClick={(e) => navigateTo(e, "/calculators", onNavigateCalculators)}
                  className="text-stone-700 hover:text-black transition-colors flex items-center gap-1.5 py-2 px-1 min-h-[44px] text-xs font-medium"
                >
                  <span>🧮 Calculators Suite</span>
                </a>
              </li>
              <li className="pl-3 text-[11px] text-stone-500 space-y-0.5">
                <div>
                  <a
                    href="/calculators/sip"
                    onClick={(e) => navigateTo(e, "/calculators/sip", () => onNavigateCalculator && onNavigateCalculator("sip"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • SIP Calculator
                  </a>
                </div>
                <div>
                  <a
                    href="/calculators/step-up-sip"
                    onClick={(e) => navigateTo(e, "/calculators/step-up-sip", () => onNavigateCalculator && onNavigateCalculator("step-up-sip"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • Step-Up SIP Calculator
                  </a>
                </div>
                <div>
                  <a
                    href="/calculators/lumpsum"
                    onClick={(e) => navigateTo(e, "/calculators/lumpsum", () => onNavigateCalculator && onNavigateCalculator("lumpsum"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • Lumpsum Calculator
                  </a>
                </div>
                <div>
                  <a
                    href="/calculators/swp"
                    onClick={(e) => navigateTo(e, "/calculators/swp", () => onNavigateCalculator && onNavigateCalculator("swp"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • SWP Calculator
                  </a>
                </div>
                <div>
                  <a
                    href="/calculators/goal-planner"
                    onClick={(e) => navigateTo(e, "/calculators/goal-planner", () => onNavigateCalculator && onNavigateCalculator("goal-planner"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • Goal Planner Calculator
                  </a>
                </div>
                <div>
                  <a
                    href="/calculators/tax-estimator"
                    onClick={(e) => navigateTo(e, "/calculators/tax-estimator", () => onNavigateCalculator && onNavigateCalculator("tax-estimator"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • Mutual Fund Tax Estimator
                  </a>
                </div>
                <div>
                  <a
                    href="/calculators/direct-vs-regular"
                    onClick={(e) => navigateTo(e, "/calculators/direct-vs-regular", () => onNavigateCalculator && onNavigateCalculator("direct-vs-regular"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • Direct vs Regular TER Drag
                  </a>
                </div>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => navigateTo(e, "/faq", onNavigateFAQ)}
                  className="text-stone-700 hover:text-black transition-colors flex items-center gap-1.5 py-2 px-1 min-h-[44px] text-xs font-medium"
                >
                  <span>❓ Mutual Fund FAQ</span>
                </a>
              </li>
              <li>
                <a
                  href="/glossary"
                  onClick={(e) => navigateTo(e, "/glossary", onNavigateGlossary)}
                  className="text-stone-700 hover:text-black transition-colors flex items-center gap-1.5 py-2 px-1 min-h-[44px] text-xs font-medium"
                >
                  <span>📖 Term Glossary</span>
                </a>
              </li>
              <li>
                <a
                  href="/guides"
                  onClick={(e) => navigateTo(e, "/guides", () => onNavigateGuides && onNavigateGuides("index"))}
                  className="text-stone-700 hover:text-black transition-colors flex items-center gap-1.5 py-2 px-1 min-h-[44px] text-xs font-medium"
                >
                  <span>📚 Investor Guides Hub</span>
                </a>
              </li>
              <li className="pl-3 text-[11px] text-stone-500 space-y-0.5">
                <div>
                  <a
                    href="/guides/how-to-choose-a-mutual-fund"
                    onClick={(e) => navigateTo(e, "/guides/how-to-choose-a-mutual-fund", () => onNavigateGuides && onNavigateGuides("how-to-choose"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • How to Choose a Fund
                  </a>
                </div>
                <div>
                  <a
                    href="/guides/redemption-checklist"
                    onClick={(e) => navigateTo(e, "/guides/redemption-checklist", () => onNavigateGuides && onNavigateGuides("redemption"))}
                    className="hover:text-stone-900 transition-colors py-2 px-1 min-h-[44px] flex items-center"
                  >
                    • Redemption Checklist
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Regulatory Disclaimer */}
        <div className="p-3.5 sm:py-3 sm:px-4 rounded-xl bg-white border border-[#EAE8E0] text-[11px] sm:text-xs text-stone-600 leading-relaxed flex items-start gap-2.5 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="m-0 font-sans">
            {t("footer.statutory")} {t("footer.disclaimer")}
          </p>
        </div>

        <div className="pt-4 border-t border-[#EAE8E0] flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px] font-mono-data">
          <div>
            © {new Date().getFullYear()} {siteName}. {t("footer.copyright")}
          </div>
          <div className="flex items-center gap-3.5 flex-wrap justify-center sm:justify-end">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-stone-400">{t("footer.language")}:</span>
              <LanguageSelector variant="header" />
            </div>
            <span>•</span>
            <a
              href="/about"
              onClick={(e) => navigateTo(e, "/about", onNavigateAbout)}
              className="hover:text-stone-900 underline transition-colors"
            >
              {t("nav.aboutUs")}
            </a>
            <span>•</span>
            <a
              href="/terms"
              onClick={(e) => navigateTo(e, "/terms", onNavigateTerms)}
              className="hover:text-stone-900 underline transition-colors"
            >
              {t("nav.terms")}
            </a>
            <span>•</span>
            <span>Independent Investor Education • yieldnest.online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
