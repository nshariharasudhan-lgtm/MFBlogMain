import React, { useState, useMemo } from "react";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Edit3,
  Search,
  Filter,
  ArrowUpRight,
  Calculator,
  Link2,
  Heading,
  FileText,
  Table2,
  Sparkles,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ArticlePost } from "../../types";

interface SeoPageOneDiagnosticProps {
  posts: ArticlePost[];
  onEditPost: (post: ArticlePost) => void;
  onViewPost: (post: ArticlePost) => void;
}

export interface PageOneAuditResult {
  post: ArticlePost;
  totalScore: number; // 0 - 100
  quickWinScore: number; // Priority ranking score
  isTop10: boolean;
  titleCheck: {
    passed: boolean;
    warning: boolean;
    length: number;
    message: string;
    hasIntentKeywords: boolean;
  };
  h1Check: {
    passed: boolean;
    h1Count: number;
    message: string;
    extractedH1?: string;
  };
  metaDescCheck: {
    passed: boolean;
    length: number;
    message: string;
  };
  internalLinksCheck: {
    passed: boolean;
    count: number;
    linksToHubs: boolean;
    linksToCalculators: boolean;
    linksToOtherArticles: boolean;
    linksList: string[];
    message: string;
  };
  calculatorCheck: {
    passed: boolean;
    message: string;
    detectedCalculatorName?: string;
  };
  tableCheck: {
    passed: boolean;
    tableCount: number;
    message: string;
  };
  wordCountCheck: {
    passed: boolean;
    wordCount: number;
    headingCount: number;
    message: string;
  };
  recommendedActions: string[];
}

// Analyze a single published post against Google Page 1 ranking factors
function analyzePostForPageOne(post: ArticlePost): PageOneAuditResult {
  const content = post.content || "";
  const title = (post.title || "").trim();
  const titleLen = title.length;
  const metaDesc = (post.seoMetadata?.metaDescription || post.excerpt || "").trim();
  const metaDescLen = metaDesc.length;

  // 1. Title Tag Check (Ideal 40 - 60 chars)
  const intentKeywords = [
    "vs",
    "rolling returns",
    "cagr",
    "ter",
    "expense ratio",
    "review",
    "analysis",
    "calculator",
    "guide",
    "direct",
    "regular",
    "tax",
    "alpha",
    "beta",
    "sharpe",
    "sortino",
    "amfi",
    "sebi",
  ];
  const hasIntentKeywords = intentKeywords.some((kw) => title.toLowerCase().includes(kw));

  let titlePassed = false;
  let titleWarning = false;
  let titleMessage = "";

  if (titleLen >= 38 && titleLen <= 60) {
    titlePassed = true;
    titleMessage = `Optimal length (${titleLen} chars). Google snippet will not be truncated.`;
  } else if (titleLen > 60 && titleLen <= 68) {
    titleWarning = true;
    titleMessage = `Slightly long (${titleLen} chars). May truncate by ~${titleLen - 60} chars on mobile SERP.`;
  } else if (titleLen > 68) {
    titleMessage = `Too long (${titleLen} chars). Significant risk of SERP ellipsis cutoff (ideal: 40-60).`;
  } else {
    titleMessage = `Too short (${titleLen} chars). Missing descriptive query terms for Page 1 intent.`;
  }

  // 2. H1 Check
  const h1Matches = content.match(/^#\s+[^\n]+/gm) || [];
  const h1Count = h1Matches.length;
  let h1Passed = false;
  let h1Message = "";
  let extractedH1: string | undefined;

  if (h1Count === 1) {
    h1Passed = true;
    extractedH1 = h1Matches[0].replace(/^#\s+/, "").trim();
    h1Message = "Proper single H1 tag detected in markdown structure.";
  } else if (h1Count === 0) {
    h1Message = "No top-level H1 heading (# Heading) found in markdown content.";
  } else {
    h1Message = `Multiple H1 tags (${h1Count}) found. Google recommends a single authoritative H1.`;
  }

  // 3. Meta Description Check (Ideal 120 - 160 chars)
  let metaPassed = false;
  let metaMessage = "";
  if (metaDescLen >= 120 && metaDescLen <= 165) {
    metaPassed = true;
    metaMessage = `Optimal length (${metaDescLen} chars) with full SERP snippet visibility.`;
  } else if (metaDescLen > 165) {
    metaMessage = `Too long (${metaDescLen} chars). Last ${metaDescLen - 160} chars will be truncated on Google.`;
  } else if (metaDescLen >= 70) {
    metaMessage = `Slightly short (${metaDescLen} chars). Can add secondary keyword or CTA (target 130-160).`;
  } else {
    metaMessage = `Missing or extremely thin meta description (${metaDescLen} chars).`;
  }

  // 4. Internal Links Check
  const internalLinkMatches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
  const internalUrls: string[] = [];
  let linksToHubs = false;
  let linksToCalculators = false;
  let linksToOtherArticles = false;

  for (const match of internalLinkMatches) {
    const urlMatch = match.match(/\(([^)]+)\)/);
    if (urlMatch) {
      const url = urlMatch[1];
      if (url.startsWith("/") || url.includes("yieldnest.online")) {
        internalUrls.push(url);
        if (url.includes("/hub/") || url.includes("/hubs") || url.includes("/topics")) {
          linksToHubs = true;
        }
        if (url.includes("/calculator") || url.includes("/calculators")) {
          linksToCalculators = true;
        }
        if (url.includes("/article/")) {
          linksToOtherArticles = true;
        }
      }
    }
  }

  const internalCount = internalUrls.length;
  let internalPassed = false;
  let internalMessage = "";

  if (internalCount >= 3) {
    internalPassed = true;
    internalMessage = `Strong internal linking (${internalCount} links detected across clusters).`;
  } else if (internalCount >= 1) {
    internalMessage = `Low internal linking (${internalCount} link). Google needs 3-5 links for cluster authority.`;
  } else {
    internalMessage = "Zero internal links found. Page acts as an orphaned island.";
  }

  // 5. Interactive Calculator Bridge Check
  const calcKeywords = [
    "/calculator",
    "/calculators",
    "sip calculator",
    "step-up sip",
    "swp calculator",
    "lumpsum calculator",
    "direct vs regular calculator",
    "tax estimator",
    "cost of delay",
  ];
  const hasCalculatorBridge =
    linksToCalculators ||
    calcKeywords.some((ck) => content.toLowerCase().includes(ck));

  let detectedCalcName = "";
  if (content.toLowerCase().includes("step-up")) detectedCalcName = "Step-Up SIP Calculator";
  else if (content.toLowerCase().includes("direct vs regular")) detectedCalcName = "Direct vs Regular Fee Drag";
  else if (content.toLowerCase().includes("swp")) detectedCalcName = "SWP Retirement Calculator";
  else if (content.toLowerCase().includes("cost of delay")) detectedCalcName = "Cost of Delay Calculator";
  else if (content.toLowerCase().includes("lumpsum")) detectedCalcName = "Lumpsum Compounding Tool";
  else detectedCalcName = "SIP Compounding Calculator";

  const calcMessage = hasCalculatorBridge
    ? `Integrated with interactive tool (${detectedCalcName}) to boost dwell time.`
    : "Missing interactive calculator bridge. Add a calculator CTA to cut bounce rates.";

  // 6. Data / Comparison Table Check
  const tableMatches = content.match(/\|[\s-:]+\|[\s-:]+\|/g) || [];
  const tableCount = tableMatches.length;
  const tablePassed = tableCount > 0;
  const tableMessage = tablePassed
    ? `Structured data comparison table present (${tableCount} table(s)). Wins featured snippets.`
    : "No structured comparison table found. Add a markdown table for Google snippet clash.";

  // 7. Word Count & Depth
  const words = content.replace(/[#*`|[\]()_-]/g, " ").trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const h2Count = (content.match(/^##\s+[^\n]+/gm) || []).length;
  let wordCountPassed = false;
  let wordCountMessage = "";

  if (wordCount >= 1000 && h2Count >= 3) {
    wordCountPassed = true;
    wordCountMessage = `Comprehensive pillar depth (${wordCount.toLocaleString()} words, ${h2Count} H2 sections).`;
  } else if (wordCount >= 700) {
    wordCountMessage = `Adequate depth (${wordCount} words, ${h2Count} H2s). Consider adding 200+ words.`;
  } else {
    wordCountMessage = `Thin content (${wordCount} words). Hard to sustain Page 1 ranking for financial queries.`;
  }

  // Calculate Base Score (0 to 100)
  let score = 0;
  if (titlePassed) score += 15;
  else if (titleWarning) score += 10;
  else score += 5;

  if (h1Passed) score += 15;
  if (metaPassed) score += 15;
  else if (metaDescLen >= 70) score += 8;

  if (internalPassed) score += 20;
  else if (internalCount >= 1) score += 10;

  if (hasCalculatorBridge) score += 15;
  if (tablePassed) score += 10;
  if (wordCountPassed) score += 10;

  // Build Actionable Recommendations
  const actions: string[] = [];
  if (!titlePassed) {
    if (titleLen > 60) {
      actions.push(`Shorten title from ${titleLen} to under 60 chars to avoid SERP ellipsis truncation.`);
    } else {
      actions.push(`Expand title with analytical modifier (e.g. Rolling Returns, Review, TER).`);
    }
  }
  if (!h1Passed) {
    actions.push(h1Count === 0 ? "Add a single H1 header (# Title) at the top of content." : "Consolidate multiple # H1 tags into a single H1 and use ## H2 for subheadings.");
  }
  if (!metaPassed) {
    actions.push(`Refine meta description length to 130-160 characters (currently ${metaDescLen}).`);
  }
  if (!internalPassed) {
    actions.push(`Add ${Math.max(1, 3 - internalCount)} more internal links to related topic hubs or comparisons.`);
  }
  if (!hasCalculatorBridge) {
    actions.push(`Embed a link to the ${detectedCalcName} to retain searchers.`);
  }
  if (!tablePassed) {
    actions.push("Insert a side-by-side metric comparison table (NAV, 3Y CAGR, TER, Sharpe ratio).");
  }

  // Quick-Win Opportunity Score:
  // High potential pages are those that have high readership or high intent,
  // but score between 40 and 80 with easy 1-3 fixable gaps.
  const readershipWeight = Math.min(25, Math.log10((post.viewsCount || 10) + 10) * 8);
  const gapImpact = actions.length >= 1 && actions.length <= 4 ? 30 : 10;
  const quickWinScore = Math.round((100 - score) * 0.7 + gapImpact + readershipWeight);

  return {
    post,
    totalScore: Math.min(100, Math.max(10, score)),
    quickWinScore,
    isTop10: false, // will be assigned after sorting
    titleCheck: {
      passed: titlePassed,
      warning: titleWarning,
      length: titleLen,
      message: titleMessage,
      hasIntentKeywords,
    },
    h1Check: {
      passed: h1Passed,
      h1Count,
      message: h1Message,
      extractedH1,
    },
    metaDescCheck: {
      passed: metaPassed,
      length: metaDescLen,
      message: metaMessage,
    },
    internalLinksCheck: {
      passed: internalPassed,
      count: internalCount,
      linksToHubs,
      linksToCalculators,
      linksToOtherArticles,
      linksList: internalUrls,
      message: internalMessage,
    },
    calculatorCheck: {
      passed: hasCalculatorBridge,
      message: calcMessage,
      detectedCalculatorName: detectedCalcName,
    },
    tableCheck: {
      passed: tablePassed,
      tableCount,
      message: tableMessage,
    },
    wordCountCheck: {
      passed: wordCountPassed,
      wordCount,
      headingCount: h2Count,
      message: wordCountMessage,
    },
    recommendedActions: actions,
  };
}

export function SeoPageOneDiagnostic({
  posts,
  onEditPost,
  onViewPost,
}: SeoPageOneDiagnosticProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<
    "all" | "top10" | "needs-work" | "missing-calc" | "missing-table" | "title-issues"
  >("top10");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // Analyze all published posts
  const auditResults = useMemo(() => {
    const published = posts.filter((p) => p.status === "published");
    const results = published.map((p) => analyzePostForPageOne(p));

    // Sort by Quick-Win Opportunity Score descending
    results.sort((a, b) => b.quickWinScore - a.quickWinScore);

    // Flag top 10
    results.forEach((r, idx) => {
      if (idx < 10) {
        r.isTop10 = true;
      }
    });

    return results;
  }, [posts]);

  // Aggregate stats
  const stats = useMemo(() => {
    if (auditResults.length === 0) {
      return {
        avgScore: 0,
        optimalTitlesPct: 0,
        hasCalcBridgePct: 0,
        hasInternalLinksPct: 0,
        hasTablesPct: 0,
        totalAudited: 0,
      };
    }
    const total = auditResults.length;
    const avgScore = Math.round(
      auditResults.reduce((sum, r) => sum + r.totalScore, 0) / total
    );
    const optimalTitles = auditResults.filter((r) => r.titleCheck.passed).length;
    const hasCalc = auditResults.filter((r) => r.calculatorCheck.passed).length;
    const hasLinks = auditResults.filter((r) => r.internalLinksCheck.passed).length;
    const hasTables = auditResults.filter((r) => r.tableCheck.passed).length;

    return {
      avgScore,
      optimalTitlesPct: Math.round((optimalTitles / total) * 100),
      hasCalcBridgePct: Math.round((hasCalc / total) * 100),
      hasInternalLinksPct: Math.round((hasLinks / total) * 100),
      hasTablesPct: Math.round((hasTables / total) * 100),
      totalAudited: total,
    };
  }, [auditResults]);

  // Filtered list
  const filteredList = useMemo(() => {
    return auditResults.filter((item) => {
      const matchesSearch =
        item.post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.post.category.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (filterMode === "top10") return item.isTop10;
      if (filterMode === "needs-work") return item.totalScore < 75;
      if (filterMode === "missing-calc") return !item.calculatorCheck.passed;
      if (filterMode === "missing-table") return !item.tableCheck.passed;
      if (filterMode === "title-issues") return !item.titleCheck.passed;

      return true;
    });
  }, [auditResults, searchTerm, filterMode]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Strategic Pitch */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono-data text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Page 1 Ranking Criteria Engine</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold tracking-tight">
              Page 1 Optimization Diagnostic & Quick-Win Finder
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1.5 max-w-2xl font-sans leading-relaxed">
              Automated audit of all <strong>{stats.totalAudited} published research articles</strong> against
              Google Page 1 SERP criteria: title length &amp; intent, single H1 integrity, internal cluster links,
              interactive calculator bridges, and comparison tables.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="bg-stone-800/90 border border-stone-700/80 rounded-xl px-4 py-3 text-center">
              <div className="text-[10px] uppercase font-mono-data text-stone-400">
                Average Page 1 Score
              </div>
              <div className="text-2xl font-bold font-serif-editorial text-emerald-400 mt-0.5">
                {stats.avgScore}
                <span className="text-xs text-stone-400 font-normal"> / 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Key Pillar Health Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-700/60 text-xs font-mono-data">
          <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/40">
            <div className="text-stone-400 text-[10px]">Optimal Titles (&le;60 chars)</div>
            <div className="text-lg font-bold text-white mt-0.5">{stats.optimalTitlesPct}%</div>
          </div>
          <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/40">
            <div className="text-stone-400 text-[10px]">Calculator Bridges (Dwell Time)</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{stats.hasCalcBridgePct}%</div>
          </div>
          <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/40">
            <div className="text-stone-400 text-[10px]">Cluster Links (&ge;3 Links)</div>
            <div className="text-lg font-bold text-sky-400 mt-0.5">{stats.hasInternalLinksPct}%</div>
          </div>
          <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/40">
            <div className="text-stone-400 text-[10px]">Comparison Tables (Snippets)</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{stats.hasTablesPct}%</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-[#EAE8E0] shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by title, slug, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF9F5] border border-stone-200 text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setFilterMode("top10")}
            className={`px-3 py-1.5 rounded-lg font-mono-data text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              filterMode === "top10"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            ★ Top 10 Quick Wins ({auditResults.filter((r) => r.isTop10).length})
          </button>
          <button
            onClick={() => setFilterMode("needs-work")}
            className={`px-3 py-1.5 rounded-lg font-mono-data text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              filterMode === "needs-work"
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Needs Work (&lt;75 Score)
          </button>
          <button
            onClick={() => setFilterMode("missing-calc")}
            className={`px-3 py-1.5 rounded-lg font-mono-data text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              filterMode === "missing-calc"
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Missing Calculator
          </button>
          <button
            onClick={() => setFilterMode("title-issues")}
            className={`px-3 py-1.5 rounded-lg font-mono-data text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              filterMode === "title-issues"
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Title Issues
          </button>
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1.5 rounded-lg font-mono-data text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              filterMode === "all"
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            All Published ({auditResults.length})
          </button>
        </div>
      </div>

      {/* Audit Items List */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#EAE8E0] p-12 text-center text-stone-500 text-xs font-mono-data">
            No published articles match the selected filter criteria.
          </div>
        ) : (
          filteredList.map((item, index) => {
            const isExpanded = expandedPostId === item.post.id;
            const rankNumber = auditResults.findIndex((r) => r.post.id === item.post.id) + 1;

            return (
              <div
                key={item.post.id}
                className={`bg-white rounded-xl border transition-all ${
                  item.isTop10
                    ? "border-amber-300 shadow-sm ring-1 ring-amber-100"
                    : "border-[#EAE8E0] hover:border-stone-300"
                }`}
              >
                {/* Main Row Bar */}
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {item.isTop10 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono-data font-bold border border-amber-300">
                          ★ Quick-Win #{rankNumber}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-mono-data font-medium">
                        {item.post.category}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono-data">
                        /article/{item.post.slug}
                      </span>
                    </div>

                    <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-stone-950 truncate max-w-2xl">
                      {item.post.title}
                    </h3>

                    {/* Quick status badges */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono-data text-stone-600">
                      <span className="inline-flex items-center gap-1">
                        {item.titleCheck.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : item.titleCheck.warning ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <span>Title: {item.titleCheck.length}c</span>
                      </span>

                      <span className="inline-flex items-center gap-1">
                        {item.h1Check.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <span>H1: {item.h1Check.h1Count === 1 ? "1 (Valid)" : `${item.h1Check.h1Count} tags`}</span>
                      </span>

                      <span className="inline-flex items-center gap-1">
                        {item.internalLinksCheck.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        )}
                        <span>Links: {item.internalLinksCheck.count}</span>
                      </span>

                      <span className="inline-flex items-center gap-1">
                        {item.calculatorCheck.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                        )}
                        <span>Calculator: {item.calculatorCheck.passed ? "Yes" : "Missing"}</span>
                      </span>

                      <span className="inline-flex items-center gap-1">
                        {item.tableCheck.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-stone-400" />
                        )}
                        <span>Table: {item.tableCheck.passed ? "Yes" : "No"}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions & Score */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                    <div className="text-right">
                      <div className="text-[10px] font-mono-data text-stone-400 uppercase">
                        Page 1 Score
                      </div>
                      <div
                        className={`text-xl font-bold font-serif-editorial ${
                          item.totalScore >= 85
                            ? "text-emerald-700"
                            : item.totalScore >= 70
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.totalScore}
                        <span className="text-xs font-normal text-stone-400">/100</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onEditPost(item.post)}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-mono-data flex items-center gap-1 transition-colors cursor-pointer"
                        title="Edit article in Studio"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => onViewPost(item.post)}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
                        title="View live article"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() =>
                          setExpandedPostId(isExpanded ? null : item.post.id)
                        }
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                        title="Toggle diagnostic checklist details"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Diagnostic Audit Checklist */}
                {isExpanded && (
                  <div className="bg-[#FAF9F5] border-t border-[#EAE8E0] p-4 sm:p-6 rounded-b-xl space-y-4">
                    {/* Top Actionable Callout */}
                    {item.recommendedActions.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 text-xs">
                        <div className="font-semibold font-mono-data uppercase text-[10px] text-amber-800 flex items-center gap-1.5 mb-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-600" />
                          <span>Recommended Quick-Win Action Checklist:</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 font-sans">
                          {item.recommendedActions.map((act, aIdx) => (
                            <li key={aIdx}>{act}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* Check 1: Title */}
                      <div className="p-3 rounded-lg bg-white border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between font-mono-data text-[11px]">
                          <span className="font-semibold text-stone-800 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-stone-500" /> Title Tag
                          </span>
                          <span
                            className={
                              item.titleCheck.passed
                                ? "text-emerald-700 font-semibold"
                                : item.titleCheck.warning
                                ? "text-amber-600 font-semibold"
                                : "text-red-600 font-semibold"
                            }
                          >
                            {item.titleCheck.length} Chars
                          </span>
                        </div>
                        <p className="text-stone-600 text-[11px]">{item.titleCheck.message}</p>
                      </div>

                      {/* Check 2: H1 Tag */}
                      <div className="p-3 rounded-lg bg-white border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between font-mono-data text-[11px]">
                          <span className="font-semibold text-stone-800 flex items-center gap-1">
                            <Heading className="w-3.5 h-3.5 text-stone-500" /> Single H1 Structure
                          </span>
                          <span
                            className={
                              item.h1Check.passed
                                ? "text-emerald-700 font-semibold"
                                : "text-red-600 font-semibold"
                            }
                          >
                            {item.h1Check.h1Count === 1 ? "Valid" : `${item.h1Check.h1Count} tags`}
                          </span>
                        </div>
                        <p className="text-stone-600 text-[11px]">{item.h1Check.message}</p>
                      </div>

                      {/* Check 3: Internal Links */}
                      <div className="p-3 rounded-lg bg-white border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between font-mono-data text-[11px]">
                          <span className="font-semibold text-stone-800 flex items-center gap-1">
                            <Link2 className="w-3.5 h-3.5 text-stone-500" /> Internal Links Depth
                          </span>
                          <span
                            className={
                              item.internalLinksCheck.passed
                                ? "text-emerald-700 font-semibold"
                                : "text-amber-600 font-semibold"
                            }
                          >
                            {item.internalLinksCheck.count} Links
                          </span>
                        </div>
                        <p className="text-stone-600 text-[11px]">{item.internalLinksCheck.message}</p>
                      </div>

                      {/* Check 4: Calculator Bridge */}
                      <div className="p-3 rounded-lg bg-white border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between font-mono-data text-[11px]">
                          <span className="font-semibold text-stone-800 flex items-center gap-1">
                            <Calculator className="w-3.5 h-3.5 text-stone-500" /> Calculator Bridge
                          </span>
                          <span
                            className={
                              item.calculatorCheck.passed
                                ? "text-emerald-700 font-semibold"
                                : "text-red-600 font-semibold"
                            }
                          >
                            {item.calculatorCheck.passed ? "Connected" : "Missing"}
                          </span>
                        </div>
                        <p className="text-stone-600 text-[11px]">{item.calculatorCheck.message}</p>
                      </div>

                      {/* Check 5: Comparison Table */}
                      <div className="p-3 rounded-lg bg-white border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between font-mono-data text-[11px]">
                          <span className="font-semibold text-stone-800 flex items-center gap-1">
                            <Table2 className="w-3.5 h-3.5 text-stone-500" /> Comparison Tables
                          </span>
                          <span
                            className={
                              item.tableCheck.passed
                                ? "text-emerald-700 font-semibold"
                                : "text-amber-600 font-semibold"
                            }
                          >
                            {item.tableCheck.tableCount} Table(s)
                          </span>
                        </div>
                        <p className="text-stone-600 text-[11px]">{item.tableCheck.message}</p>
                      </div>

                      {/* Check 6: Word Count & Headings */}
                      <div className="p-3 rounded-lg bg-white border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between font-mono-data text-[11px]">
                          <span className="font-semibold text-stone-800 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-stone-500" /> Content Depth
                          </span>
                          <span
                            className={
                              item.wordCountCheck.passed
                                ? "text-emerald-700 font-semibold"
                                : "text-stone-600 font-semibold"
                            }
                          >
                            {item.wordCountCheck.wordCount} words
                          </span>
                        </div>
                        <p className="text-stone-600 text-[11px]">{item.wordCountCheck.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
