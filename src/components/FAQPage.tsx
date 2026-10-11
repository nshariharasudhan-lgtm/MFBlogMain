import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  Layers,
  Globe,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { ToolLayout } from "./ToolLayout";
import { ArticleCategory, SiteSettings } from "../types";
import rawKeywordsData from "../data/keywords.json";

export interface KeywordEntry {
  keyword: string;
  variants?: string[];
  cluster: string;
  intent: string;
  complianceNote?: string;
  funnel?: string;
  signal?: number;
  priority: "High" | "Medium" | "Low";
  language: string;
  suggestedFormat?: string;
  foundIn?: string;
  status: "published" | "drafted" | "planned";
  url: string;
  answer?: string;
}

const ALL_KEYWORDS = rawKeywordsData as KeywordEntry[];

interface FAQTopicButton {
  id: string;
  label: string;
  badge?: string;
  matches: (entry: KeywordEntry) => boolean;
}

// Line 1: Foundations, Plans & Execution
const FAQ_TOPIC_BUTTONS_ROW1: FAQTopicButton[] = [
  {
    id: "all",
    label: "All Questions",
    badge: "36",
    matches: () => true,
  },
  {
    id: "mutual-fund",
    label: "What is Mutual Fund",
    matches: (e) =>
      e.url.includes("what-is-a-mutual-fund") ||
      e.keyword.toLowerCase().includes("what is a mutual fund"),
  },
  {
    id: "nav",
    label: "What is NAV",
    matches: (e) => e.url.includes("what-is-nav"),
  },
  {
    id: "aum",
    label: "What is AUM",
    matches: (e) => e.url.includes("what-is-aum"),
  },
  {
    id: "direct-plan",
    label: "Direct Plan",
    matches: (e) =>
      e.url.includes("what-is-direct-plan") ||
      e.url.includes("direct-vs-regular-difference"),
  },
  {
    id: "regular-plan",
    label: "Regular Plan",
    matches: (e) =>
      e.url.includes("what-is-regular-plan") ||
      e.url.includes("direct-vs-regular-difference"),
  },
  {
    id: "growth-option",
    label: "Growth Option",
    matches: (e) =>
      e.url.includes("what-is-growth-option") ||
      e.url.includes("growth-vs-idcw-difference"),
  },
  {
    id: "idcw",
    label: "What is IDCW",
    matches: (e) =>
      e.url.includes("what-is-idcw") ||
      e.url.includes("growth-vs-idcw-difference"),
  },
  {
    id: "sip",
    label: "What is SIP",
    matches: (e) =>
      e.url.includes("how-sip-works") ||
      e.keyword.toLowerCase().includes("systematic investment plan"),
  },
  {
    id: "swp",
    label: "What is SWP",
    matches: (e) =>
      e.url.includes("how-swp-works") ||
      e.keyword.toLowerCase().includes("systematic withdrawal plan"),
  },
  {
    id: "stp",
    label: "What is STP",
    matches: (e) =>
      e.url.includes("what-is-stp") ||
      e.keyword.toLowerCase().includes("systematic transfer plan"),
  },
];

// Line 2: Ratios, Metrics & Fees
const FAQ_TOPIC_BUTTONS_ROW2: FAQTopicButton[] = [
  {
    id: "expense-ratio",
    label: "Expense Ratio",
    matches: (e) => e.url.includes("what-is-expense-ratio"),
  },
  {
    id: "ter",
    label: "What is TER",
    matches: (e) => e.url.includes("what-is-total-expense-ratio"),
  },
  {
    id: "exit-load",
    label: "What is Exit Load",
    matches: (e) => e.url.includes("what-is-exit-load"),
  },
  {
    id: "xirr",
    label: "What is XIRR",
    matches: (e) => e.url.includes("what-is-xirr"),
  },
  {
    id: "cagr",
    label: "What is CAGR",
    matches: (e) => e.url.includes("what-is-cagr"),
  },
  {
    id: "alpha",
    label: "What is Alpha",
    matches: (e) => e.url.includes("what-is-alpha"),
  },
  {
    id: "beta",
    label: "What is Beta",
    matches: (e) => e.url.includes("what-is-beta"),
  },
  {
    id: "sharpe",
    label: "Sharpe Ratio",
    matches: (e) => e.url.includes("what-is-sharpe-ratio"),
  },
  {
    id: "sortino",
    label: "Sortino Ratio",
    matches: (e) => e.url.includes("what-is-sortino-ratio"),
  },
  {
    id: "tracking-error",
    label: "Tracking Error",
    matches: (e) => e.url.includes("what-is-tracking-error"),
  },
  {
    id: "std-dev",
    label: "Standard Deviation",
    matches: (e) => e.url.includes("what-is-standard-deviation"),
  },
  {
    id: "portfolio-turnover",
    label: "Portfolio Turnover",
    matches: (e) => e.url.includes("what-is-portfolio-turnover"),
  },
];

const ALL_TOPIC_BUTTONS = [...FAQ_TOPIC_BUTTONS_ROW1, ...FAQ_TOPIC_BUTTONS_ROW2];

interface FAQPageProps {
  settings: SiteSettings;
  onNavigateHome: () => void;
  onSelectCategory?: (category: ArticleCategory | "all") => void;
  onNavigateCalculators?: () => void;
  onNavigateFAQ?: () => void;
  onNavigateGlossary?: () => void;
  onNavigateGuides?: () => void;
  onNavigateHubs?: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
}

export function FAQPage({
  settings,
  onNavigateHome,
  onSelectCategory,
  onNavigateCalculators,
  onNavigateFAQ,
  onNavigateGlossary,
  onNavigateGuides,
  onNavigateHubs,
  onNavigateAbout,
  onNavigateTerms,
  onNavigateToolkit,
}: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [selectedIntent, setSelectedIntent] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First accordion open by default
  const [allExpanded, setAllExpanded] = useState(false);

  // Extract unique filter options from the dataset
  const clusters = useMemo(() => {
    const list = Array.from(new Set(ALL_KEYWORDS.map((k) => k.cluster))).filter(Boolean);
    return ["all", ...list.sort()];
  }, []);

  const intents = useMemo(() => {
    const list = Array.from(new Set(ALL_KEYWORDS.map((k) => k.intent))).filter(Boolean);
    return ["all", ...list.sort()];
  }, []);

  const languages = useMemo(() => {
    const list = Array.from(new Set(ALL_KEYWORDS.map((k) => k.language || "English"))).filter(Boolean);
    return ["all", ...list.sort()];
  }, []);

  // Handle URL hash on initial mount (e.g. /faq#what-is-nav)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const cleanHash = hash.replace(/^#/, "");
      const foundIdx = ALL_KEYWORDS.findIndex(
        (e) => e.status === "published" && e.url.replace(/^#/, "").replace(/^\/faq#/, "") === cleanHash
      );
      if (foundIdx !== -1) {
        setExpandedIndex(foundIdx);
        setTimeout(() => {
          const el = document.getElementById(cleanHash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
    }
  }, []);

  // Filter the published FAQs list
  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return ALL_KEYWORDS.filter((entry) => {
      // Only display published FAQs with verified answers for public visitors
      if (entry.status !== "published" || !entry.answer) {
        return false;
      }

      // Quick Topic Button filter
      if (selectedTopic !== "all") {
        const topicBtn = ALL_TOPIC_BUTTONS.find((b) => b.id === selectedTopic);
        if (topicBtn && !topicBtn.matches(entry)) {
          return false;
        }
      }

      // Cluster Filter
      if (selectedCluster !== "all" && entry.cluster !== selectedCluster) {
        return false;
      }

      // Intent Filter
      if (selectedIntent !== "all" && entry.intent !== selectedIntent) {
        return false;
      }

      // Language Filter
      if (selectedLanguage !== "all" && (entry.language || "English") !== selectedLanguage) {
        return false;
      }

      // Search query matching keyword, answer, cluster, or search variants
      if (q) {
        const matchesKeyword = entry.keyword.toLowerCase().includes(q);
        const matchesAnswer = (entry.answer || "").toLowerCase().includes(q);
        const matchesCluster = entry.cluster.toLowerCase().includes(q);
        const matchesVariant = (entry.variants || []).some((v) => v.toLowerCase().includes(q));

        if (!matchesKeyword && !matchesAnswer && !matchesCluster && !matchesVariant) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTopic, selectedCluster, selectedIntent, selectedLanguage]);

  // Inject dynamic FAQPage JSON-LD schema for published entries
  useEffect(() => {
    const publishedEntries = ALL_KEYWORDS.filter((k) => k.status === "published" && k.answer);

    const schemaObj = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://www.yieldnest.online/faq#faqpage",
      "mainEntity": publishedEntries.map((entry) => ({
        "@type": "Question",
        "name": entry.keyword,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": entry.answer,
        },
      })),
    };

    const existingScript = document.getElementById("faqpage-jsonld");
    if (existingScript) {
      existingScript.textContent = JSON.stringify(schemaObj);
    } else {
      const script = document.createElement("script");
      script.id = "faqpage-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    }

    return () => {
      const el = document.getElementById("faqpage-jsonld");
      if (el) el.remove();
    };
  }, []);

  const toggleAccordion = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
    }
  };

  const handleToggleExpandAll = () => {
    setAllExpanded(!allExpanded);
    setExpandedIndex(null);
  };

  const handleSelectTopic = (id: string) => {
    setSelectedTopic(id);
    setSearchQuery("");
    setSelectedCluster("all");
    setSelectedIntent("all");
    setSelectedLanguage("all");
    setExpandedIndex(0);
  };

  const handleResetFilters = () => {
    setSelectedTopic("all");
    setSearchQuery("");
    setSelectedCluster("all");
    setSelectedIntent("all");
    setSelectedLanguage("all");
    setExpandedIndex(0);
  };

  return (
    <ToolLayout
      title="Mutual Fund Frequently Asked Questions (FAQ)"
      intro="Evidence-backed answers to common retail investor questions regarding Indian mutual fund mechanics, taxation, capital safety, and operational rules under SEBI regulations. Strictly for education and awareness."
      badge="Investor Education Hub"
      breadcrumbs={[{ label: "FAQ Hub", href: "/faq" }]}
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
      activeMenu="faq"
    >
      <div className="space-y-6">
        {/* Controls Card: Search & Filters */}
        <div className="rounded-2xl bg-white border border-[#EAE8E0] p-4 sm:p-6 shadow-xs space-y-4">
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search mutual fund questions (e.g. NAV, AUM, XIRR, CAGR, TER, exit load, SIP, SWP)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value && selectedTopic !== "all") {
                  setSelectedTopic("all");
                }
              }}
              className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-emerald-600 focus:bg-white text-stone-900 text-xs sm:text-sm rounded-xl pl-10 pr-10 py-2.5 transition-all outline-none placeholder:text-stone-400 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-mono px-1 cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Individual Topic Buttons in 2 Structured Lines (No Horizontal Scrolling) */}
          <div className="pt-2 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono-data font-semibold text-stone-700 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quick Topics (Individual Buttons)</span>
              </div>
              {selectedTopic !== "all" && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-sans font-medium underline cursor-pointer"
                >
                  Show All 36 Questions
                </button>
              )}
            </div>

            {/* Line 1: Foundations, Plans & Options */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono-data font-medium text-stone-400 uppercase tracking-wider">
                Line 1 • Foundations &amp; Transactions:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {FAQ_TOPIC_BUTTONS_ROW1.map((btn) => {
                  const isActive = selectedTopic === btn.id;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => handleSelectTopic(btn.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium tracking-wide transition-all border shadow-2xs inline-flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A] font-semibold shadow-xs"
                          : "bg-white border-[#E2DFD6] text-stone-700 hover:text-stone-950 hover:bg-[#F3EFE6] hover:border-stone-300"
                      }`}
                    >
                      <span>{btn.label}</span>
                      {btn.badge && (
                        <span
                          className={`text-[10px] px-1 py-0.2 rounded font-mono-data ${
                            isActive
                              ? "bg-stone-700 text-stone-200"
                              : "bg-stone-100 text-stone-600"
                          }`}
                        >
                          {btn.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Line 2: Ratios, Metrics & Fees */}
            <div className="space-y-1 pt-1.5 border-t border-stone-100">
              <div className="text-[10px] font-mono-data font-medium text-stone-400 uppercase tracking-wider">
                Line 2 • Ratios, Returns &amp; Volatility Metrics:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {FAQ_TOPIC_BUTTONS_ROW2.map((btn) => {
                  const isActive = selectedTopic === btn.id;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => handleSelectTopic(btn.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium tracking-wide transition-all border shadow-2xs inline-flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? "bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs"
                          : "bg-white border-[#E2DFD6] text-stone-700 hover:text-stone-950 hover:bg-[#F3EFE6] hover:border-stone-300"
                      }`}
                    >
                      <span>{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional Filter Dropdowns for Cluster & Intent */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-100">
            {/* Cluster Filter */}
            <div className="space-y-1">
              <label className="text-[10.5px] font-mono-data font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3 h-3 text-stone-400" />
                <span>Topic Cluster</span>
              </label>
              <select
                value={selectedCluster}
                onChange={(e) => {
                  setSelectedCluster(e.target.value);
                  setSelectedTopic("all");
                }}
                className="w-full bg-[#FAF9F5] border border-stone-200 text-stone-800 text-xs rounded-lg px-2.5 py-2 outline-none focus:border-stone-400 font-sans cursor-pointer"
              >
                <option value="all">All Topics ({clusters.length - 1})</option>
                {clusters.filter((c) => c !== "all").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Intent Filter */}
            <div className="space-y-1">
              <label className="text-[10.5px] font-mono-data font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3 h-3 text-stone-400" />
                <span>Search Intent</span>
              </label>
              <select
                value={selectedIntent}
                onChange={(e) => {
                  setSelectedIntent(e.target.value);
                  setSelectedTopic("all");
                }}
                className="w-full bg-[#FAF9F5] border border-stone-200 text-stone-800 text-xs rounded-lg px-2.5 py-2 outline-none focus:border-stone-400 font-sans cursor-pointer"
              >
                <option value="all">All Intents</option>
                {intents.filter((i) => i !== "all").map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="space-y-1">
              <label className="text-[10.5px] font-mono-data font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3 text-stone-400" />
                <span>Language</span>
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setSelectedTopic("all");
                }}
                className="w-full bg-[#FAF9F5] border border-stone-200 text-stone-800 text-xs rounded-lg px-2.5 py-2 outline-none focus:border-stone-400 font-sans cursor-pointer"
              >
                <option value="all">All Languages</option>
                {languages.filter((l) => l !== "all").map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Controls */}
        <div className="flex items-center justify-between px-1 text-xs font-mono-data text-stone-500">
          <div>
            Showing <strong>{filteredEntries.length}</strong> verified questions
            {selectedTopic !== "all" && (
              <span className="text-emerald-700 font-semibold">
                {" "}
                [Filtered by: {ALL_TOPIC_BUTTONS.find((b) => b.id === selectedTopic)?.label}]
              </span>
            )}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          <div className="flex items-center gap-3">
            {(selectedTopic !== "all" ||
              selectedCluster !== "all" ||
              selectedIntent !== "all" ||
              selectedLanguage !== "all" ||
              searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-emerald-700 hover:underline cursor-pointer font-sans"
              >
                Reset Filters
              </button>
            )}
            <button
              onClick={handleToggleExpandAll}
              className="text-stone-700 hover:text-black font-mono-data underline cursor-pointer"
            >
              {allExpanded ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </div>

        {/* Accordion FAQ Listing */}
        {filteredEntries.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <HelpCircle className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-sm font-serif-editorial text-stone-700">
              No FAQ entries found matching your current filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="text-xs text-stone-900 underline font-medium cursor-pointer"
            >
              Clear filters and view all published FAQs
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map((entry, idx) => {
              const isOpen = allExpanded || expandedIndex === idx;

              return (
                <article
                  key={`${entry.keyword}-${idx}`}
                  id={entry.url.replace(/^#/, "").replace(/^\/faq#/, "")}
                  className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                    isOpen
                      ? "border-stone-400/80 shadow-xs"
                      : "border-[#EAE8E0] hover:border-stone-300"
                  }`}
                >
                  {/* Accordion Header / Question Trigger */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      {/* Meta Badges */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[9.5px] uppercase font-mono-data tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold">
                          {entry.cluster}
                        </span>
                        <span className="text-[9.5px] font-mono-data px-1.5 py-0.5 rounded bg-[#FAF9F5] text-stone-500 border border-stone-200">
                          {entry.intent}
                        </span>
                        {entry.language && entry.language !== "English" && (
                          <span className="text-[9.5px] font-mono-data px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                            {entry.language}
                          </span>
                        )}
                      </div>

                      {/* Question Heading */}
                      <h2 className="font-serif-editorial text-base sm:text-lg font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                        {entry.keyword}
                      </h2>
                    </div>

                    <div className="p-1 rounded-md text-stone-400 group-hover:text-stone-700 shrink-0 mt-1">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Body / Answer Content */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#F0EEE6] text-stone-700 text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
                      <p className="m-0 leading-relaxed text-stone-800 font-normal">
                        {entry.answer}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* Statutory Regulatory Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#EAE8E0] text-xs text-stone-600 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-900 font-bold font-mono-data uppercase tracking-wider text-[11px]">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Statutory Regulatory Notice</span>
          </div>
          <p className="leading-relaxed font-sans text-stone-600">
            Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. YieldNest is an independent educational publisher and is not registered with SEBI or AMFI. All Q&amp;As, tax explanations, and calculation examples are provided purely for investor awareness and should not be construed as investment, legal, or tax advice.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
