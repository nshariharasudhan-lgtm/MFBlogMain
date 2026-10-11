import React, { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Search,
  BookOpen,
  Calculator,
  Compass,
  ArrowRight,
  TrendingUp,
  Layers,
  Filter,
} from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { BreadcrumbNavigation } from "./BreadcrumbNavigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ArticleCategory, ArticlePost, SiteSettings } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface CategoryMetaInfo {
  title: string;
  hindiTitle: string;
  badge: string;
  description: string;
  hindiDescription: string;
  recommendedTool: {
    label: string;
    hindiLabel: string;
    url: string;
    icon: React.ElementType;
    isCalculator?: boolean;
    isHub?: boolean;
    isGuide?: boolean;
  };
}

const CATEGORY_DETAILS: Record<ArticleCategory, CategoryMetaInfo> = {
  "Fund Comparison": {
    title: "Fund Comparison: Objective Head-to-Head Scheme Research",
    hindiTitle: "फंड तुलना: प्रत्यक्ष एवं निष्पक्ष स्कीम विश्लेषण",
    badge: "Head-to-Head Comparative Research",
    description:
      "Objective, disclosure-grounded comparative research across Indian mutual fund schemes. Compare portfolio overlap, active share, Sharpe ratio, rolling returns, and expense ratio alpha decay under SEBI categorization rules.",
    hindiDescription:
      "भारतीय म्यूचुअल फंड स्कीमों का निष्पक्ष व आधिकारिक तुलनात्मक विश्लेषण। पोर्टफोलियो ओवरलैप, अल्फा, शार्प रेशियो और व्यय अनुपात का सटीक अध्ययन।",
    recommendedTool: {
      label: "Direct vs Regular TER Drag Calculator",
      hindiLabel: "डायरेक्ट बनाम रेगुलर टीईआर ड्रैग कैलकुलेटर",
      url: "/calculators/direct-vs-regular",
      icon: Calculator,
      isCalculator: true,
    },
  },
  "Performance Analysis": {
    title: "Performance Analysis: Risk-Adjusted Returns & Metrics",
    hindiTitle: "प्रदर्शन विश्लेषण: जोखिम-समायोजित रिटर्न व अल्फा",
    badge: "Quantitative Alpha & Downside Metrics",
    description:
      "Quantitative performance evaluations analyzing rolling returns across 3-year, 5-year, and 7-year market cycles. Rigorous examination of standard deviation, downside capture ratios, Sortino ratios, and benchmark tracking.",
    hindiDescription:
      "3, 5 और 7 वर्ष के बाजार चक्रों में रोलिंग रिटर्न का मात्रात्मक विश्लेषण। मानक विचलन (Standard Deviation), डाउनसाइड कैप्चर और जोखिम-मुक्त रिटर्न का अध्ययन।",
    recommendedTool: {
      label: "SIP Compounding Calculator",
      hindiLabel: "एसआईपी चक्रवृद्धि कैलकुलेटर",
      url: "/calculators/sip",
      icon: TrendingUp,
      isCalculator: true,
    },
  },
  "Market Trends": {
    title: "Market Trends: Valuation, Inflows & Industry Dynamics",
    hindiTitle: "बाजार रुझान: मूल्यांकन, मासिक प्रवाह व उद्योग गतिशीलता",
    badge: "AMFI Industry Inflow & Valuation Data",
    description:
      "Data-driven research on Indian mutual fund industry trends, AMFI monthly SIP inflow data, Nifty valuations, sector rotations, and liquidity management across market capitalizations.",
    hindiDescription:
      "एम्फी (AMFI) मासिक एसआईपी प्रवाह, निफ्टी मूल्यांकन, सेक्टर रोटेशन और बाजार पूंजीकरण के रुझानों का डेटा-संचालित विश्लेषण।",
    recommendedTool: {
      label: "Cost of Delay SIP Calculator",
      hindiLabel: "एसआईपी विलंब लागत कैलकुलेटर",
      url: "/calculators/cost-of-delay",
      icon: Calculator,
      isCalculator: true,
    },
  },
  "Category Deep-Dive": {
    title: "Category Deep-Dive: SEBI Scheme Categorization & Rationale",
    hindiTitle: "श्रेणी गहन-अध्ययन: सेबी म्यूचुअल फंड वर्गीकरण व नियम",
    badge: "SEBI 36 Categories Governance",
    description:
      "Comprehensive breakdowns of all 36 SEBI mutual fund categories across Equity, Debt, and Hybrid asset classes. Structural mandate rules, investment horizons, portfolio allocation limits, and credit risk guidelines.",
    hindiDescription:
      "इक्विटी, डेट और हाइब्रिड की सभी 36 सेबी श्रेणियों का सम्पूर्ण विवरण। न्यूनतम परिसंपत्ति आवंटन सीमाएं, निवेश क्षितिज और जोखिम प्रोफाइल।",
    recommendedTool: {
      label: "How to Choose a Mutual Fund Guide",
      hindiLabel: "म्यूचुअल फंड कैसे चुनें: संपूर्ण मार्गदर्शक",
      url: "/guides/how-to-choose-a-mutual-fund",
      icon: BookOpen,
      isGuide: true,
    },
  },
  "SIP Strategies": {
    title: "SIP Strategies: Compounding Tactics, Step-Up & Timing",
    hindiTitle: "एसआईपी रणनीतियां: चक्रवृद्धि तकनीकें, स्टेप-अप व समय-प्रबंधन",
    badge: "Systematic Wealth Accumulation",
    description:
      "Strategic insights for disciplined systematic investing. Explore rupee-cost averaging, annual step-up compounding, cost of delay penalties, optimal SIP debit dates, and SIP vs lumpsum timing decisions.",
    hindiDescription:
      "अनुशासित निवेश के लिए रणनीतिक अंतर्दृष्टि। रुपया लागत औसत, वार्षिक स्टेप-अप चक्रवृद्धि, निवेश विलंब का नुकसान और एसआईपी बनाम लम्पसम तुलना।",
    recommendedTool: {
      label: "Step-Up SIP Top-Up Calculator",
      hindiLabel: "स्टेप-अप एसआईपी टॉप-अप कैलकुलेटर",
      url: "/calculators/step-up-sip",
      icon: Calculator,
      isCalculator: true,
    },
  },
};

interface CategoryPageProps {
  category: ArticleCategory;
  posts: ArticlePost[];
  settings: SiteSettings;
  onNavigateHome: () => void;
  onSelectCategory: (category: ArticleCategory | "all") => void;
  onNavigateArticle: (post: ArticlePost) => void;
  onNavigateCalculators?: () => void;
  onNavigateCalculator?: (url?: string) => void;
  onNavigateFAQ?: () => void;
  onNavigateGlossary?: () => void;
  onNavigateGuides?: (guideId?: "how-to-choose" | "redemption" | "index") => void;
  onNavigateHub?: (slug?: string) => void;
  onNavigateHubs?: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CategoryPage({
  category,
  posts,
  settings,
  onNavigateHome,
  onSelectCategory,
  onNavigateArticle,
  onNavigateCalculators,
  onNavigateCalculator,
  onNavigateFAQ,
  onNavigateGlossary,
  onNavigateGuides,
  onNavigateHub,
  onNavigateHubs,
  onNavigateAbout,
  onNavigateTerms,
  onNavigateToolkit,
  searchQuery,
  onSearchChange,
}: CategoryPageProps) {
  const { isHindi, t } = useLanguage();
  const [localCategoryFilter, setLocalCategoryFilter] = useState("");

  const details = CATEGORY_DETAILS[category] || {
    title: `${category} Mutual Fund Research`,
    hindiTitle: `${category} म्यूचुअल फंड रिसर्च`,
    badge: "Research Category",
    description: `Comprehensive research and analysis covering ${category} mutual funds in India.`,
    hindiDescription: `${category} पर आधारित भारतीय म्यूचुअल फंड्स का विस्तृत शोध और विश्लेषण।`,
    recommendedTool: {
      label: "All Tools & Hubs",
      hindiLabel: "सभी साधन और हब",
      url: "/toolkit",
      icon: Sparkles,
    },
  };

  // Filter posts belonging strictly to this category
  const categoryPosts = posts.filter((p) => p.status === "published" && p.category === category);

  // Search filter inside the category
  const filteredCategoryPosts = categoryPosts.filter((p) => {
    const q = (localCategoryFilter || searchQuery).toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q)) ||
      p.amfiSchemeCodes?.some((c) => c.includes(q))
    );
  });

  const handleToolClick = (tool: CategoryMetaInfo["recommendedTool"]) => {
    if (tool.isCalculator && onNavigateCalculator) {
      onNavigateCalculator(tool.url);
    } else if (tool.isGuide && onNavigateGuides) {
      onNavigateGuides("how-to-choose");
    } else if (tool.isHub && onNavigateHub) {
      onNavigateHub();
    } else if (onNavigateToolkit) {
      onNavigateToolkit();
    } else {
      window.history.pushState({}, "", tool.url);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col font-sans text-[#1A1A1A]">
      {/* Top Navbar with Category Active */}
      <Navbar
        currentCategory={category}
        onSelectCategory={onSelectCategory}
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
        settings={settings}
        onNavigateHome={onNavigateHome}
        isCalculatorView={false}
        onNavigateCalculators={onNavigateCalculators}
        activeMenu="none"
        onNavigateFAQ={onNavigateFAQ}
        onNavigateGlossary={onNavigateGlossary}
        onNavigateGuides={onNavigateGuides}
        onNavigateHubs={onNavigateHubs}
        onNavigateAbout={onNavigateAbout}
        onNavigateTerms={onNavigateTerms}
        onNavigateToolkit={onNavigateToolkit}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation
          items={[
            { label: "Home", href: "/", onClick: onNavigateHome },
            { label: "Research Categories", href: "/", onClick: () => onSelectCategory("all") },
            { label: category, href: `/category/${category.toLowerCase().replace(/[\s&]+/g, "-")}`, isCurrent: true },
          ]}
          includeSchema={true}
        />

        {/* Dedicated Individual Category Hero Header */}
        <header className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E5DA] p-5 sm:p-8 lg:p-9 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#F0ECE1]">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[11px] font-mono-data uppercase font-semibold tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>{details.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-mono-data">
                  <span>{categoryPosts.length} {categoryPosts.length === 1 ? "Research Article" : "Research Articles"}</span>
                </span>
              </div>

              <h1 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
                {isHindi ? details.hindiTitle : details.title}
              </h1>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                {isHindi ? details.hindiDescription : details.description}
              </p>
            </div>

            {/* Contextual Quick Tool Card */}
            {details.recommendedTool && (
              <div className="shrink-0 w-full lg:w-72 bg-[#FAF9F5] border border-[#E2DFD4] rounded-2xl p-4 space-y-3">
                <div className="text-[11px] font-mono-data font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isHindi ? "संबंधित वित्तीय साधन" : "Contextual Tool"}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-stone-900">
                    {isHindi ? details.recommendedTool.hindiLabel : details.recommendedTool.label}
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {isHindi
                      ? "इस श्रेणी के फंड्स का प्रत्यक्ष संख्यात्मक विश्लेषण करें।"
                      : "Run interactive quantitative simulations for schemes in this cluster."}
                  </p>
                </div>
                <button
                  onClick={() => handleToolClick(details.recommendedTool)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium font-mono-data tracking-wide transition-all shadow-xs cursor-pointer"
                >
                  <span>{isHindi ? "टूल लॉन्च करें" : "Launch Companion Tool"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
                </button>
              </div>
            )}
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isHindi ? `${category} में खोजें...` : `Filter within ${category}...`}
                value={localCategoryFilter}
                onChange={(e) => setLocalCategoryFilter(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 focus:bg-white text-stone-900 text-xs rounded-xl pl-9 pr-8 py-2 transition-all outline-none"
              />
              {localCategoryFilter && (
                <button
                  onClick={() => setLocalCategoryFilter("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 text-xs font-mono-data text-stone-500">
              <span>
                {filteredCategoryPosts.length} of {categoryPosts.length} {isHindi ? "लेख प्रदर्शित" : "articles shown"}
              </span>
              <button
                onClick={() => onSelectCategory("all")}
                className="inline-flex items-center gap-1 text-xs text-stone-800 hover:text-black underline font-medium cursor-pointer ml-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isHindi ? "सभी शोध पर लौटें" : "View All Research"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Category Articles Listing */}
        {filteredCategoryPosts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
            <p className="text-sm font-serif-editorial text-stone-700">
              {isHindi
                ? `"${localCategoryFilter || searchQuery}" के लिए ${category} में कोई लेख नहीं मिला।`
                : `No articles in ${category} matched your search "${localCategoryFilter || searchQuery}".`}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setLocalCategoryFilter("")}
                className="text-xs px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium cursor-pointer"
              >
                {isHindi ? "फ़िल्टर हटाएं" : "Clear Filter"}
              </button>
              <button
                onClick={() => onSelectCategory("all")}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-white hover:bg-black font-medium cursor-pointer"
              >
                {isHindi ? "सभी श्रेणियों के लेख देखें" : "Browse All Categories"}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategoryPosts.map((post) => (
              <ArticleCard
                key={post.id}
                post={post}
                onOpen={onNavigateArticle}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer with category navigation */}
      <Footer
        settings={settings}
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
      />
    </div>
  );
}
