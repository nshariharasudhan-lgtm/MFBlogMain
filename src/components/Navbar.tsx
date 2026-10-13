import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  Calculator,
  HelpCircle,
  BookMarked,
  BookOpen,
  Compass,
  Users,
  Scale,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  FileText,
  ArrowRight,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import { ArticleCategory, SiteSettings } from "../types";
import { YieldNestLogo } from "./YieldNestLogo";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import { GLOSSARY_TERMS } from "../data/glossaryData";
import { TOPIC_HUBS } from "../data/topicHubsData";

interface NavbarProps {
  currentCategory: ArticleCategory | "all";
  onSelectCategory: (category: ArticleCategory | "all") => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  settings: SiteSettings;
  onNavigateHome: () => void;
  isCalculatorView?: boolean;
  onNavigateCalculators?: () => void;
  activeMenu?:
    | "calculators"
    | "faq"
    | "glossary"
    | "guides"
    | "hubs"
    | "about"
    | "terms"
    | "categories"
    | "toolkit"
    | "methodology"
    | "none";
  onNavigateFAQ?: () => void;
  onNavigateGlossary?: () => void;
  onNavigateGuides?: () => void;
  onNavigateHubs?: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
  onNavigateMethodology?: () => void;
  onOpenCalculatorByUrl?: (url: string) => void;
  onOpenHubBySlug?: (slug: string) => void;
}

const SITE_CALCULATORS = [
  { name: "Direct vs Regular Calculator", url: "/calculators/direct-vs-regular", category: "Fees & TER Drag" },
  { name: "Step-Up SIP Calculator", url: "/calculators/step-up-sip", category: "Compounding Growth" },
  { name: "Cost of Delay Calculator", url: "/calculators/cost-of-delay", category: "Opportunity Cost" },
  { name: "SIP vs Lumpsum Calculator", url: "/calculators/sip-vs-lumpsum", category: "Asset Deployment" },
  { name: "SIP Compounding Calculator", url: "/calculators/sip", category: "Wealth Planning" },
  { name: "Lumpsum Calculator", url: "/calculators/lumpsum", category: "One-Time Investment" },
  { name: "SWP Withdrawal Calculator", url: "/calculators/swp", category: "Retirement Cashflow" },
  { name: "Goal Planner Calculator", url: "/calculators/goal-planner", category: "Target Corpus" },
  { name: "Capital Gains Tax Estimator", url: "/calculators/tax-estimator", category: "Section 112A Tax" },
];

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
  onNavigateMethodology,
  onOpenCalculatorByUrl,
  onOpenHubBySlug,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { t, isHindi } = useLanguage();

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, action?: () => void, path?: string) => {
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      setMobileMenuOpen(false);
      setShowSearchDropdown(false);
      if (action) action();
      if (path) {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new PopStateEvent("popstate"));
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Instant Site-Wide Search Matches
  const query = searchQuery.trim().toLowerCase();
  const matchedCalculators = query.length >= 2
    ? SITE_CALCULATORS.filter((c) => c.name.toLowerCase().includes(query) || c.category.toLowerCase().includes(query)).slice(0, 3)
    : [];
  const matchedHubs = query.length >= 2
    ? TOPIC_HUBS.filter((h) => h.title.toLowerCase().includes(query) || h.keywords.toLowerCase().includes(query)).slice(0, 2)
    : [];
  const matchedGlossary = query.length >= 2
    ? GLOSSARY_TERMS.filter((g) => g.term.toLowerCase().includes(query) || (g.abbreviation && g.abbreviation.toLowerCase().includes(query))).slice(0, 3)
    : [];

  const hasDirectMatches = matchedCalculators.length > 0 || matchedHubs.length > 0 || matchedGlossary.length > 0;

  // Clear Main Navigation Menu Items
  const primaryNavItems = [
    {
      id: "calculators",
      label: "Calculators",
      href: "/calculators",
      icon: Calculator,
      isActive: isCalculatorView || activeMenu === "calculators",
      onClick: onNavigateCalculators,
    },
    {
      id: "fund-comparisons",
      label: "Fund Comparisons",
      href: "/category/fund-comparison",
      icon: Scale,
      isActive: currentCategory === "Fund Comparison" && !isCalculatorView,
      onClick: () => onSelectCategory("Fund Comparison"),
    },
    {
      id: "sip",
      label: "SIP Hub",
      href: "/hub/sip-swp-stp",
      icon: TrendingUp,
      isActive: false,
      onClick: () => (onOpenHubBySlug ? onOpenHubBySlug("sip-swp-stp") : onNavigateHubs?.()),
    },
    {
      id: "costs",
      label: "Costs & Fees",
      href: "/hub/fees",
      icon: DollarSign,
      isActive: false,
      onClick: () => (onOpenHubBySlug ? onOpenHubBySlug("fees") : onNavigateHubs?.()),
    },
    {
      id: "risk",
      label: "Risk & Analytics",
      href: "/hub/safety-and-risk",
      icon: ShieldCheck,
      isActive: false,
      onClick: () => (onOpenHubBySlug ? onOpenHubBySlug("safety-and-risk") : onNavigateHubs?.()),
    },
    {
      id: "market-insights",
      label: "Market Insights",
      href: "/category/market-trends",
      icon: Compass,
      isActive: currentCategory === "Market Trends" && !isCalculatorView,
      onClick: () => onSelectCategory("Market Trends"),
    },
    {
      id: "methodology",
      label: "Methodology",
      href: "/methodology",
      icon: FileText,
      isActive: activeMenu === "methodology",
      onClick: onNavigateMethodology,
    },
    {
      id: "glossary",
      label: "Glossary",
      href: "/glossary",
      icon: BookMarked,
      isActive: activeMenu === "glossary",
      onClick: onNavigateGlossary,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/98 backdrop-blur-md border-b border-[#EAE8E0] transition-colors shadow-2xs">
      {/* Slim Persistent Regulatory Notice */}
      <div className="bg-[#1C1A17] text-stone-300 text-[10px] sm:text-[11px] font-mono-data py-1 px-3 border-b border-stone-800 flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
        <span className="truncate">
          <strong className="text-stone-200">Statutory Notice:</strong> Educational &amp; research analytics only. Not registered investment advice.
        </span>
      </div>

      {/* Main Masthead Container */}
      <div className="max-w-6xl mx-auto px-4 pt-3.5 pb-2.5 sm:py-3.5 flex items-center justify-between gap-4 relative">
        {/* Left: Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, onNavigateHome, "/")}
          className="cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] text-inherit no-underline shrink-0"
          title="YieldNest.online - Return to Homepage"
        >
          <YieldNestLogo size="md" showTagline={false} />
        </a>

        {/* Center / Right: Site-Wide Search & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-1 justify-end max-w-xl">
          {/* Site-Wide Search Input with Instant Results Dropdown */}
          <div ref={searchContainerRef} className="relative w-full max-w-[140px] sm:max-w-xs md:max-w-sm transition-all focus-within:max-w-[210px] sm:focus-within:max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-[#8C887B]" />
            <input
              type="text"
              placeholder={isHindi ? "खोजें..." : "Search..."}
              value={searchQuery}
              onFocus={() => setShowSearchDropdown(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSearchDropdown(true);
              }}
              className="w-full bg-[#F0EEE6] text-xs rounded-full pl-7 sm:pl-8 pr-6 py-1.5 border border-transparent focus:border-[#C4C0B3] focus:bg-white focus:outline-none transition-all placeholder:text-[#9E9B90]"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  onSearchChange("");
                  setShowSearchDropdown(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8C887B] hover:text-black text-xs font-mono p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

            {/* Instant Site-Wide Search Results Dropdown */}
            {showSearchDropdown && query.length >= 2 && hasDirectMatches && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden z-50 p-2 space-y-2 text-xs font-sans text-left min-w-[240px]">
                {/* Calculators match */}
                {matchedCalculators.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono-data font-bold text-emerald-800 uppercase px-2 pt-1">
                      Calculators
                    </div>
                    {matchedCalculators.map((c) => (
                      <a
                        key={c.url}
                        href={c.url}
                        onClick={(e) =>
                          handleLinkClick(e, () => onOpenCalculatorByUrl?.(c.url), c.url)
                        }
                        className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-stone-100 text-stone-800 no-underline cursor-pointer group min-h-[38px]"
                      >
                        <span className="font-medium group-hover:text-emerald-900">{c.name}</span>
                        <span className="text-[10px] text-stone-500 font-mono-data">{c.category}</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Topic Hubs match */}
                {matchedHubs.length > 0 && (
                  <div className="space-y-1 border-t border-stone-100 pt-1">
                    <div className="text-[10px] font-mono-data font-bold text-blue-800 uppercase px-2 pt-1">
                      Topic Hubs
                    </div>
                    {matchedHubs.map((h) => (
                      <a
                        key={h.slug}
                        href={`/hub/${h.slug}`}
                        onClick={(e) =>
                          handleLinkClick(e, () => onOpenHubBySlug?.(h.slug), `/hub/${h.slug}`)
                        }
                        className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-stone-100 text-stone-800 no-underline cursor-pointer group min-h-[38px]"
                      >
                        <span className="font-medium group-hover:text-blue-900">{h.title}</span>
                        <span className="text-[10px] text-stone-500 font-mono-data">Hub</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Glossary terms match */}
                {matchedGlossary.length > 0 && (
                  <div className="space-y-1 border-t border-stone-100 pt-1">
                    <div className="text-[10px] font-mono-data font-bold text-amber-800 uppercase px-2 pt-1">
                      Financial Glossary
                    </div>
                    {matchedGlossary.map((g) => (
                      <a
                        key={g.id}
                        href={`/glossary#${g.id}`}
                        onClick={(e) =>
                          handleLinkClick(e, onNavigateGlossary, `/glossary#${g.id}`)
                        }
                        className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-stone-100 text-stone-800 no-underline cursor-pointer group min-h-[38px]"
                      >
                        <span className="font-medium group-hover:text-amber-900">{g.term}</span>
                        <span className="text-[10px] text-stone-500 font-mono-data">{g.cluster}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <LanguageSelector variant="header" align="right" />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 min-h-[38px] min-w-[38px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-100 lg:hidden shrink-0 cursor-pointer active:scale-95 transition-all"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Menu (Clean Typography & Zero-Pills) */}
      <nav
        aria-label="Primary Navigation"
        className="hidden lg:block border-t border-[#EAE8E0] bg-[#FAF9F5] py-2 px-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-1 xl:gap-2 flex-wrap">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.onClick, item.href)}
                className={`px-3 py-1 rounded-lg text-xs font-medium tracking-wide transition-all no-underline inline-flex items-center gap-1.5 cursor-pointer ${
                  item.isActive
                    ? "bg-[#1A1A1A] text-white font-semibold shadow-2xs"
                    : "text-stone-700 hover:text-black hover:bg-[#F0EEE6]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Comprehensive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-t border-[#EAE8E0] px-4 py-4 space-y-4 shadow-xl font-sans max-h-[85vh] overflow-y-auto">
          {/* Mobile Full-Width Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C887B]" />
            <input
              type="text"
              placeholder={isHindi ? "खोजें: कैलकुलेटर, फंड, शब्द..." : "Search calculators, funds, metrics..."}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white text-xs rounded-xl pl-9 pr-8 py-2.5 border border-stone-300 focus:border-stone-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-black text-xs font-mono p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Pillar Navigation */}
          <div>
            <div className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider pb-1.5 border-b border-stone-200 mb-2">
              Core Pillars
            </div>
            <div className="grid grid-cols-2 gap-2">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.onClick, item.href)}
                    className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 no-underline cursor-pointer min-h-[44px] transition-all active:scale-[0.98] ${
                      item.isActive
                        ? "bg-[#1A1A1A] text-white border-black font-semibold shadow-xs"
                        : "bg-white border-stone-200 text-stone-800 hover:bg-stone-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-stone-500" />
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Direct Calculators Access on Mobile */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-data text-stone-500 uppercase tracking-wider pb-1.5 border-b border-stone-200 mb-2">
              <span>Financial Calculators</span>
              <a
                href="/calculators"
                onClick={(e) => handleLinkClick(e, onNavigateCalculators, "/calculators")}
                className="text-emerald-800 font-bold hover:underline"
              >
                View All →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {SITE_CALCULATORS.slice(0, 4).map((c) => (
                <a
                  key={c.url}
                  href={c.url}
                  onClick={(e) =>
                    handleLinkClick(e, () => onOpenCalculatorByUrl?.(c.url), c.url)
                  }
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-stone-200/80 text-xs text-stone-800 hover:bg-stone-50 no-underline cursor-pointer min-h-[42px]"
                >
                  <span className="font-medium truncate">{c.name}</span>
                  <span className="text-[10px] text-emerald-700 font-mono-data shrink-0 ml-1">Tool</span>
                </a>
              ))}
            </div>
          </div>

          {/* Informational & Legal Links */}
          <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs text-stone-600">
            <a
              href="/toolkit"
              onClick={(e) => handleLinkClick(e, onNavigateToolkit, "/toolkit")}
              className="py-2 px-1 hover:underline text-stone-900 font-semibold flex items-center gap-1"
            >
              <span>All 7 Tools & Checklists</span>
            </a>
            <a
              href="/methodology"
              onClick={(e) => handleLinkClick(e, onNavigateMethodology, "/methodology")}
              className="py-2 px-1 hover:underline text-stone-700"
            >
              Methodology & Sources
            </a>
            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, onNavigateAbout, "/about")}
              className="py-2 px-1 hover:underline text-stone-700"
            >
              About YieldNest
            </a>
            <a
              href="/terms"
              onClick={(e) => handleLinkClick(e, onNavigateTerms, "/terms")}
              className="py-2 px-1 hover:underline text-stone-700"
            >
              Terms of Use
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
