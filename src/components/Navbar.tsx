import React, { useState } from "react";
import { Search, Menu, X, Calculator, HelpCircle, BookMarked, BookOpen, Compass, Users, Scale, Sparkles } from "lucide-react";
import { ArticleCategory, SiteSettings } from "../types";
import { YieldNestLogo } from "./YieldNestLogo";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
  currentCategory: ArticleCategory | "all";
  onSelectCategory: (category: ArticleCategory | "all") => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  settings: SiteSettings;
  onNavigateHome: () => void;
  isCalculatorView?: boolean;
  onNavigateCalculators?: () => void;
  activeMenu?: "calculators" | "faq" | "glossary" | "guides" | "hubs" | "about" | "terms" | "categories" | "toolkit" | "none";
  onNavigateFAQ?: () => void;
  onNavigateGlossary?: () => void;
  onNavigateGuides?: () => void;
  onNavigateHubs?: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
}

export function Navbar({
  currentCategory,
  onSelectCategory,
  onSearchChange,
  searchQuery,
  onNavigateHome,
  isCalculatorView = false,
  onNavigateCalculators,
  activeMenu = "none",
  onNavigateFAQ,
  onNavigateGlossary,
  onNavigateGuides,
  onNavigateHubs,
  onNavigateAbout,
  onNavigateTerms,
  onNavigateToolkit,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isHindi } = useLanguage();

  const categories: Array<{ id: ArticleCategory | "all"; label: string; href: string }> = [
    { id: "all", label: t("nav.allResearch"), href: "/" },
    { id: "Fund Comparison", label: t("nav.fundComparison"), href: "/category/fund-comparison" },
    { id: "Performance Analysis", label: t("nav.performanceAnalysis"), href: "/category/performance-analysis" },
    { id: "Market Trends", label: t("nav.marketTrends"), href: "/category/market-trends" },
    { id: "Category Deep-Dive", label: t("nav.categoryDeepDive"), href: "/category/category-deep-dive" },
    { id: "SIP Strategies", label: t("nav.sipTactics"), href: "/category/sip-strategies" },
  ];

  const menuTools = [
    {
      id: "toolkit" as const,
      label: isHindi ? "सभी साधन (All Tools)" : "All Tools & Hubs",
      href: "/toolkit",
      icon: Sparkles,
      onClick: onNavigateToolkit,
      highlight: true,
    },
    {
      id: "calculators" as const,
      label: t("nav.calculators"),
      href: "/calculators",
      icon: Calculator,
      onClick: onNavigateCalculators,
    },
    {
      id: "guides" as const,
      label: t("nav.guides"),
      href: "/guides",
      icon: BookOpen,
      onClick: onNavigateGuides,
    },
    {
      id: "hubs" as const,
      label: t("nav.topicHubs"),
      href: "/hubs",
      icon: Compass,
      onClick: onNavigateHubs,
    },
    {
      id: "glossary" as const,
      label: t("nav.glossary"),
      href: "/glossary",
      icon: BookMarked,
      onClick: onNavigateGlossary,
    },
    {
      id: "faq" as const,
      label: t("nav.faq"),
      href: "/faq",
      icon: HelpCircle,
      onClick: onNavigateFAQ,
    },
    {
      id: "about" as const,
      label: t("nav.aboutUs"),
      href: "/about",
      icon: Users,
      onClick: onNavigateAbout,
    },
    {
      id: "terms" as const,
      label: t("nav.terms"),
      href: "/terms",
      icon: Scale,
      onClick: onNavigateTerms,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/98 backdrop-blur-md border-b border-[#EAE8E0] transition-colors shadow-2xs">
      {/* Slim Persistent Regulatory Notice */}
      <div className="bg-[#1C1A17] text-stone-300 text-[10px] sm:text-[11px] font-mono-data py-1 px-3 border-b border-stone-800 flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
        <span className="truncate">
          <strong className="text-stone-200">{isHindi ? "वैधानिक सूचना:" : "Statutory Notice:"}</strong> {t("nav.statutoryNotice")}
        </span>
      </div>

      {/* Main Centered Masthead */}
      <div className="max-w-6xl mx-auto px-4 pt-3.5 sm:pt-5 pb-2.5 sm:pb-3 flex flex-col items-center justify-center relative">
        {/* Language selector & Search bar pinned to top-right on desktop */}
        <div className="absolute top-3.5 sm:top-5 right-4 hidden sm:flex items-center gap-2">
          <LanguageSelector variant="header" align="right" />
          <div className="relative w-44 lg:w-52">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C887B]" />
            <input
              type="text"
              placeholder={t("nav.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#F0EEE6] text-xs rounded-full pl-8 pr-3 py-1.5 border border-transparent focus:border-[#C4C0B3] focus:bg-white focus:outline-none transition-all placeholder:text-[#9E9B90]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C887B] hover:text-black text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="w-full flex items-center justify-between sm:hidden mb-2 gap-2">
          <LanguageSelector variant="header" align="left" />
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8C887B]" />
            <input
              type="text"
              placeholder={t("nav.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#F0EEE6] text-[11px] rounded-full pl-7 pr-3 py-1 border border-stone-200 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#4A4740] hover:text-black shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-stone-800" />}
          </button>
        </div>

        {/* Centered Site Logo */}
        <a
          href="/"
          onClick={(e) => {
            if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
          className="cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] text-center block text-inherit no-underline"
          title="YieldNest.online - Return to Homepage"
        >
          <YieldNestLogo size="md" showTagline={true} />
        </a>
      </div>

      {/* Navigation Buttons: 2-Line Structured Button Format (No Horizontal Scrolling) */}
      <nav className="w-full border-t border-[#EAE8E0] bg-[#FAF9F5] py-1.5 sm:py-2 px-2 sm:px-4 block">
        <div className="max-w-6xl mx-auto space-y-1.5">
          {/* Line 1: Research Categories Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            <span className="text-[10px] font-mono-data font-semibold text-stone-400 uppercase tracking-wider mr-1 hidden xl:inline-block">
              {t("nav.categoriesLabel")}
            </span>
            {categories.map((cat) => {
              const isCatActive =
                activeMenu === "none" && !isCalculatorView && currentCategory === cat.id;
              return (
                <a
                  key={cat.id}
                  href={cat.href}
                  onClick={(e) => {
                    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      if (onSelectCategory) {
                        onSelectCategory(cat.id);
                      } else {
                        window.history.pushState({}, "", cat.href);
                        window.dispatchEvent(new PopStateEvent("popstate"));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }
                  }}
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium tracking-wide transition-all border shadow-2xs no-underline inline-flex items-center justify-center cursor-pointer ${
                    isCatActive
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A] font-semibold shadow-xs"
                      : "bg-white border-[#E2DFD6] text-stone-700 hover:text-stone-950 hover:bg-[#F3EFE6] hover:border-stone-300"
                  }`}
                >
                  {cat.label}
                </a>
              );
            })}
          </div>

          {/* Line 2: Pages & Tools Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 pt-1 border-t border-stone-200/60">
            <span className="text-[10px] font-mono-data font-semibold text-stone-400 uppercase tracking-wider mr-1 hidden xl:inline-block">
              {t("nav.pagesToolsLabel")}
            </span>
            {menuTools.map((tool) => {
              const Icon = tool.icon;
              const isActive =
                activeMenu === tool.id || (tool.id === "calculators" && isCalculatorView);
              return (
                <a
                  key={tool.id}
                  href={tool.href}
                  onClick={(e) => {
                    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      if (tool.onClick) {
                        tool.onClick();
                      } else {
                        window.history.pushState({}, "", tool.href);
                        window.dispatchEvent(new PopStateEvent("popstate"));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }
                  }}
                  className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium tracking-wide transition-all border shadow-2xs no-underline inline-flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs"
                      : "bg-white border-[#E2DFD6] text-stone-700 hover:text-stone-950 hover:bg-[#F3EFE6] hover:border-stone-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-current shrink-0" />
                  <span>{tool.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Clean Touch-Friendly Button Grid) */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF9F5] border-t border-[#EAE8E0] px-4 py-3 space-y-3 shadow-inner">
          <div className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider pb-1">
            {t("nav.categoriesLabel")}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={cat.href}
                onClick={(e) => {
                  if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    if (onSelectCategory) {
                      onSelectCategory(cat.id);
                    } else {
                      window.history.pushState({}, "", cat.href);
                      window.dispatchEvent(new PopStateEvent("popstate"));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    setMobileMenuOpen(false);
                  }
                }}
                className={`text-center px-3 py-2 rounded-lg text-xs font-medium transition-colors no-underline border ${
                  activeMenu === "none" && !isCalculatorView && currentCategory === cat.id
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A] font-semibold"
                    : "bg-white border-stone-200 text-[#4A4740] hover:bg-[#EFECE3]"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>

          <div className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider pt-2 pb-1 border-t border-stone-200">
            {t("nav.pagesToolsLabel")}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {menuTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeMenu === tool.id || (tool.id === "calculators" && isCalculatorView);
              return (
                <a
                  key={tool.id}
                  href={tool.href}
                  onClick={(e) => {
                    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      if (tool.onClick) {
                        tool.onClick();
                      } else {
                        window.history.pushState({}, "", tool.href);
                        window.dispatchEvent(new PopStateEvent("popstate"));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`text-center px-3 py-2 rounded-lg text-xs font-medium transition-colors no-underline flex items-center justify-center gap-1.5 border ${
                    isActive
                      ? "bg-emerald-800 text-white border-emerald-800 font-semibold"
                      : "bg-white border-stone-200 text-stone-800 hover:bg-[#EFECE3]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tool.label}</span>
                </a>
              );
            })}
          </div>

          {/* Dedicated Language Selector inside mobile drawer */}
          <div className="pt-2.5 pb-1 border-t border-stone-200 flex items-center justify-between">
            <span className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider">
              {isHindi ? "भाषा (Language)" : "Language"}
            </span>
            <LanguageSelector variant="pill" />
          </div>
        </div>
      )}
    </header>
  );
}
