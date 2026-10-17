import React, { useState, useMemo } from "react";
import {
  Calculator,
  CheckSquare,
  Compass,
  BookOpen,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Scale,
  Sparkles,
  PieChart,
  FileCheck2,
  DollarSign,
  Globe,
  Sliders,
  Search,
  Check,
  HelpCircle,
  ExternalLink,
  Layers,
} from "lucide-react";
import { BreadcrumbNavigation } from "./BreadcrumbNavigation";
import { SEOHead } from "./SEOHead";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SiteSettings, ArticleCategory } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface ToolkitDirectoryPageProps {
  settings: SiteSettings;
  onNavigateHome: () => void;
  onSelectCategory?: (category: ArticleCategory | "all") => void;
  onNavigateCalculator: (url?: string) => void;
  onNavigateCalculators: () => void;
  onNavigateGuide: (guideId?: "how-to-choose" | "redemption" | "index") => void;
  onNavigateHub: (hubSlug?: string) => void;
  onNavigateHubs: () => void;
  onNavigateGlossary: () => void;
  onNavigateFAQ: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
  onNavigateCompare?: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

interface ToolItem {
  id: string;
  category: "calculator" | "guide" | "hub" | "reference";
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  badge: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  href: string;
  action: () => void;
  tags: string[];
}

export function ToolkitDirectoryPage({
  settings,
  onNavigateHome,
  onSelectCategory,
  onNavigateCalculator,
  onNavigateCalculators,
  onNavigateGuide,
  onNavigateHub,
  onNavigateHubs,
  onNavigateGlossary,
  onNavigateFAQ,
  onNavigateAbout,
  onNavigateTerms,
  onNavigateToolkit,
  onNavigateCompare,
  onSearchChange,
  searchQuery,
}: ToolkitDirectoryPageProps) {
  const { isHindi } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<"all" | "calculator" | "guide" | "hub" | "reference">("all");
  const [localSearch, setLocalSearch] = useState("");

  const handleSelectCategory = (cat: ArticleCategory | "all") => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      const slugMap: Record<string, string> = {
        "Fund Comparison": "fund-comparison",
        "Performance Analysis": "performance-analysis",
        "Market Trends": "market-trends",
        "Category Deep-Dive": "category-deep-dive",
        "SIP Strategies": "sip-strategies",
      };
      if (cat === "all") {
        window.history.pushState({}, "", "/");
      } else {
        window.history.pushState({}, "", `/category/${slugMap[cat] || "fund-comparison"}`);
      }
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLinkClick = (e: React.MouseEvent, action: () => void, path: string) => {
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      action();
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const ALL_TOOLS: ToolItem[] = useMemo(
    () => [
      // 0. HEAD-TO-HEAD FUND COMPARISONS
      {
        id: "tool-fund-duels",
        category: "calculator",
        title: "Mutual Fund Head-to-Head Duels & Overlap Dossiers",
        hindiTitle: "म्यूचुअल फंड हेड-टू-हेड तुलना व ओवरलैप विश्लेषण",
        description: "10-second verdicts, rolling return battlecards, mathematical portfolio stock overlap percentage, and live SIP outcome simulators.",
        hindiDescription: "दो म्यूचुअल फंड्स के बीच लाइव रिटर्न, पोर्टफोलियो ओवरलैप प्रतिशत और एसआईपी अंतर का त्वरित विश्लेषण।",
        badge: "Institutional Research",
        icon: Scale,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-800",
        href: "/compare",
        action: () => (onNavigateCompare ? onNavigateCompare() : onNavigateCalculator("/compare")),
        tags: ["fund comparison", "fund overlap", "parag parikh vs hdfc", "nippon vs quant", "tear sheet", "compare"],
      },
      // 1. CALCULATORS
      {
        id: "calc-sip",
        category: "calculator",
        title: "SIP Compounding Calculator",
        hindiTitle: "एसआईपी कंपाउंडिंग कैलकुलेटर",
        description: "Calculate expected future maturity corpus and interest component for monthly Systematic Investment Plans in Indian equity and hybrid funds.",
        hindiDescription: "मासिक एसआईपी से बनने वाले कुल फंड, संचित ब्याज और लंबी अवधि के चक्रवृद्धि रिटर्न का सटीक हिसाब लगाएं।",
        badge: "Interactive Tool",
        icon: TrendingUp,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        href: "/calculators/sip",
        action: () => onNavigateCalculator("/calculators/sip"),
        tags: ["sip", "compounding", "returns", "mutual fund", "monthly investment"],
      },
      {
        id: "calc-step-up",
        category: "calculator",
        title: "Step-Up SIP Top-Up Calculator",
        hindiTitle: "स्टेप-अप एसआईपी कैलकुलेटर (वार्षिक वेतन वृद्धि)",
        description: "Simulate annual step-up top-ups (5% to 25%) linked to salary increments to accelerate retirement and financial independence targets.",
        hindiDescription: "वार्षिक वेतन वृद्धि के साथ अपनी एसआईपी को 5% से 25% बढ़ाकर देखें कि आपका वेल्थ क्रिएशन कितना तेजी से बढ़ता है।",
        badge: "Salary Top-Up",
        icon: Sliders,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
        href: "/calculators/step-up-sip",
        action: () => onNavigateCalculator("/calculators/step-up-sip"),
        tags: ["step up sip", "salary increment", "top up sip", "accelerated compounding"],
      },
      {
        id: "calc-direct-regular",
        category: "calculator",
        title: "Direct vs Regular Fund Fee Drag Calculator",
        hindiTitle: "डायरेक्ट बनाम रेगुलर कमीशन बचत कैलकुलेटर",
        description: "Calculate the compounding wealth loss caused by distributor trail commissions (0.50% to 1.25% TER difference) over 10 to 25 years.",
        hindiDescription: "जानें कि वितरक कमीशन और उच्च व्यय अनुपात (TER) के कारण 15-25 वर्षों में आपके लाखों रुपये कैसे कट जाते हैं।",
        badge: "Fee Audit",
        icon: Scale,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-700",
        href: "/calculators/direct-vs-regular",
        action: () => onNavigateCalculator("/calculators/direct-vs-regular"),
        tags: ["direct vs regular", "ter drag", "distributor commission", "expense ratio savings"],
      },
      {
        id: "calc-swp",
        category: "calculator",
        title: "Systematic Withdrawal Plan (SWP) Longevity Calculator",
        hindiTitle: "एसडब्ल्यूपी रिटायरमेंट पेंशन व फंड आयु कैलकुलेटर",
        description: "Model monthly pension payouts from a lump-sum mutual fund corpus. Track post-withdrawal balance, interest accruals, and depletion horizon.",
        hindiDescription: "रिटायरमेंट के बाद मासिक पेंशन निकासी, शेष बची पूंजी और पोर्टफोलियो की स्थिरता का संपूर्ण मॉडल तैयार करें।",
        badge: "Retirement",
        icon: DollarSign,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-700",
        href: "/calculators/swp",
        action: () => onNavigateCalculator("/calculators/swp"),
        tags: ["swp", "systematic withdrawal", "retirement pension", "corpus longevity"],
      },
      {
        id: "calc-lumpsum",
        category: "calculator",
        title: "Lumpsum Investment Compounding Calculator",
        hindiTitle: "एकमुश्त (Lumpsum) निवेश कैलकुलेटर",
        description: "Calculate compounded annual growth rate (CAGR) and multi-year maturity values for one-time lump-sum equity and debt investments.",
        hindiDescription: "एकमुश्त निवेश पर मिलने वाले चक्रवृद्धि रिटर्न, पूंजीगत लाभ और अवधि आधारित कॉर्पस का सटीक अनुमान लगाएं।",
        badge: "One-Time",
        icon: Layers,
        iconBg: "bg-teal-100",
        iconColor: "text-teal-700",
        href: "/calculators/lumpsum",
        action: () => onNavigateCalculator("/calculators/lumpsum"),
        tags: ["lumpsum", "cagr", "one time investment", "maturity"],
      },
      {
        id: "calc-goal",
        category: "calculator",
        title: "Inflation-Adjusted Goal Planner",
        hindiTitle: "मुद्रास्फीति समायोजित लक्ष्य योजनाकार (Goal Planner)",
        description: "Factor in 6% to 8% inflation to calculate real future costs of education, home purchase, or retirement, plus required monthly SIP.",
        hindiDescription: "महंगाई दर को जोड़कर बच्चों की उच्च शिक्षा, नया घर या रिटायरमेंट का वास्तविक भविष्य खर्च और जरूरी मासिक एसआईपी जानें।",
        badge: "Life Goals",
        icon: PieChart,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-700",
        href: "/calculators/goal-planner",
        action: () => onNavigateCalculator("/calculators/goal-planner"),
        tags: ["goal planner", "inflation", "child education", "retirement planning"],
      },
      {
        id: "calc-tax",
        category: "calculator",
        title: "Mutual Fund Capital Gains Tax Estimator (Finance Act 2024)",
        hindiTitle: "पूंजीगत लाभ कर (Capital Gains Tax) कैलकुलेटर",
        description: "Estimate STCG (20%) and LTCG (12.5% above ₹1.25 Lakh exemption) for equity, hybrid, and debt mutual fund redemptions.",
        hindiDescription: "इक्विटी और डेट म्यूचुअल फंड बेचने पर नए टैक्स नियमों (20% STCG, 12.5% LTCG) के अनुसार शुद्ध इन-हैंड राशि जानें।",
        badge: "Tax 2024-26",
        icon: DollarSign,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        href: "/calculators/tax-estimator",
        action: () => onNavigateCalculator("/calculators/tax-estimator"),
        tags: ["tax estimator", "ltcg", "stcg", "section 112a", "finance act"],
      },

      // 2. CHECKLISTS & ACTIONABLE GUIDES
      {
        id: "guide-redemption",
        category: "guide",
        title: "Pre-Redemption 10-Point Exit & Tax Checklist",
        hindiTitle: "म्यूचुअल फंड रिडेम्पशन पूर्व 10-सूत्रीय चेकलिस्ट",
        description: "Interactive due diligence checklist covering 1% exit loads, FIFO lot accounting, ₹1.25L LTCG limits, and bank mandate verification.",
        hindiDescription: "यूनिट्स बेचने से पहले एग्जिट लोड, फीफो टैक्स नियम, बैंक खाता सत्यापन और सेटलमेंट साइकिल की 10-सूत्रीय जांच करें।",
        badge: "Interactive Checklist",
        icon: FileCheck2,
        iconBg: "bg-red-100",
        iconColor: "text-red-700",
        href: "/guides/redemption-checklist",
        action: () => onNavigateGuide("redemption"),
        tags: ["redemption checklist", "exit load", "fifo", "selling mutual funds", "tax saving"],
      },
      {
        id: "guide-how-to-choose",
        category: "guide",
        title: "Institutional Framework: How to Choose a Mutual Fund",
        hindiTitle: "संस्थागत गाइड: सही म्यूचुअल फंड कैसे चुनें",
        description: "7-step institutional fund selection framework evaluating rolling return consistency, downside capture ratios, Sharpe ratios, and AUM size.",
        hindiDescription: "केवल 1-वर्षीय रिटर्न देखकर नहीं, बल्कि रोलिंग रिटर्न, शार्प रेशियो और डाउनसाइड कैप्चर के आधार पर सर्वश्रेष्ठ फंड चुनें।",
        badge: "Selection Framework",
        icon: ShieldCheck,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        href: "/guides/how-to-choose-a-mutual-fund",
        action: () => onNavigateGuide("how-to-choose"),
        tags: ["how to choose", "fund selection", "rolling returns", "sharpe ratio", "framework"],
      },
      {
        id: "guide-cas-audit",
        category: "guide",
        title: "Consolidated Account Statement (CAS) Audit Guide",
        hindiTitle: "सीएएस (CAS) स्टेटमेंट ऑडिट गाइड: संपूर्ण फोलियो जांच",
        description: "Complete tutorial to download, decrypt, and audit your consolidated mutual fund investments across CAMS, KFintech, and CDSL/NSDL under one PAN.",
        hindiDescription: "एक पैन कार्ड के तहत सभी एएमसी, कैम्स और कार्वी के फोलियो को एक समेकित विवरण (CAS) में देखने और ऑडिट करने की विधि।",
        badge: "Portfolio Audit",
        icon: BookOpen,
        iconBg: "bg-stone-100",
        iconColor: "text-stone-700",
        href: "/article/consolidated-account-statement-cas-guide",
        action: () => onNavigateGuide("index"),
        tags: ["cas", "consolidated account statement", "cams", "kfintech", "folio audit"],
      },

      // 3. REGULATORY TOPIC HUBS
      {
        id: "hub-basics",
        category: "hub",
        title: "Mutual Fund Basics & Scheme Categorization Hub",
        hindiTitle: "म्यूचुअल फंड मूल सिद्धांत व 36 स्कीम श्रेणियां हब",
        description: "Explore the 36 official SEBI categories across Large, Mid, Small Cap equity, Macaulay duration debt, and multi-asset hybrids.",
        hindiDescription: "सेबी के आधिकारिक 2017 परिपत्र के अनुसार सभी 36 स्कीमों के अनिवार्य एसेट एलोकेशन नियम और निवेश सीमाएं समझें।",
        badge: "SEBI Rules",
        icon: Compass,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-700",
        href: "/hub/basics",
        action: () => onNavigateHub("basics"),
        tags: ["sebi categorization", "mutual fund basics", "large cap", "mid cap", "debt duration"],
      },
      {
        id: "hub-tax",
        category: "hub",
        title: "Taxation, Capital Gains & ELSS Topic Hub",
        hindiTitle: "कराधान, पूंजीगत लाभ व ईएलएसएस (ELSS) हब",
        description: "Deep-dive archive into Section 112A, indexation removal on debt funds, Section 80C 3-year lock-in, and grandfathering clauses.",
        hindiDescription: "इक्विटी व डेट फंडों पर लागू नवीन आयकर नियम, इंडेक्सेशन, ईएलएसएस 3-वर्षीय लॉक-इन और टैक्स बचत का संपूर्ण संकलन।",
        badge: "Tax Laws",
        icon: DollarSign,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        href: "/hub/tax-and-elss",
        action: () => onNavigateHub("tax-and-elss"),
        tags: ["taxation", "elss", "section 80c", "capital gains", "income tax"],
      },
      {
        id: "hub-safety",
        category: "hub",
        title: "Safety, Risk & Stress Tests Hub",
        hindiTitle: "सुरक्षा, जोखिम व तनाव परीक्षण (Stress Test) हब",
        description: "SEBI & AMFI mandated small-cap liquidity stress tests, standard deviation volatility metrics, and credit rating risk audits.",
        hindiDescription: "सेबी द्वारा अनिवार्य स्मॉल-कैप लिक्विडिटी स्ट्रेस टेस्ट, वोलैटिलिटी और डिफॉल्ट जोखिम से सुरक्षा के व्यावहारिक नियम।",
        badge: "Risk Analytics",
        icon: ShieldCheck,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
        href: "/hub/safety-and-risk",
        action: () => onNavigateHub("safety-and-risk"),
        tags: ["safety", "stress test", "sebi liquidity", "small cap risk", "credit default"],
      },
      {
        id: "hub-fees",
        category: "hub",
        title: "Expense Ratios, Distributor Fees & TER Hub",
        hindiTitle: "व्यय अनुपात (TER), ब्रोकरेज व वितरक कमीशन हब",
        description: "SEBI Regulation 52 expense ratio caps, direct vs regular plan alpha decay, and AMC management fee structure.",
        hindiDescription: "सेबी विनियम 52 के तहत व्यय अनुपात सीमाएं, ट्रेल कमीशन और फंड हाउस के परिचालन खर्चों का पारदर्शी विश्लेषण।",
        badge: "Cost Transparency",
        icon: Scale,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-700",
        href: "/hub/fees",
        action: () => onNavigateHub("fees"),
        tags: ["expense ratio", "ter", "sebi regulation 52", "trail commission", "amc fees"],
      },
      {
        id: "hub-redemption",
        category: "hub",
        title: "Redemption, Exit Loads & Liquidity Hub",
        hindiTitle: "रिडेम्पशन, एग्जिट लोड व लिक्विडिटी हब",
        description: "Cut-off timings for same-day NAV allotment, T+1 settlement cycles, exit load deduction schedules, and instant redemption limits.",
        hindiDescription: "सेम-डे एनएवी कट-ऑफ समय, T+1 भुगतान चक्र, एग्जिट लोड अवधि और लिक्विड फंडों में तत्काल निकासी के नियम।",
        badge: "Liquidity",
        icon: FileCheck2,
        iconBg: "bg-red-100",
        iconColor: "text-red-700",
        href: "/hub/redemption",
        action: () => onNavigateHub("redemption"),
        tags: ["redemption", "exit loads", "cutoff timings", "t+1 settlement", "instant redemption"],
      },
      {
        id: "hub-sip",
        category: "hub",
        title: "SIP, SWP, and STP Systematic Tactics Hub",
        hindiTitle: "एसआईपी, एसडब्ल्यूपी व एसटीपी सिस्टेमैटिक रणनीतियां हब",
        description: "Optimal SIP dates, rupee cost averaging math, Systematic Transfer Plans (STP) for lump sums, and volatility mitigation.",
        hindiDescription: "रुपया लागत औसत, लम्पसम राशि के लिए एसटीपी (STP) ट्रांसफर और बाजार के उतार-चढ़ाव में अनुशासित निवेश की तकनीकें।",
        badge: "Tactics",
        icon: Sliders,
        iconBg: "bg-teal-100",
        iconColor: "text-teal-700",
        href: "/hub/sip-swp-stp",
        action: () => onNavigateHub("sip-swp-stp"),
        tags: ["sip", "swp", "stp", "rupee cost averaging", "systematic tactics"],
      },
      {
        id: "hub-comparisons",
        category: "hub",
        title: "Scheme Comparisons, Active vs Passive & Overlap Hub",
        hindiTitle: "स्कीम तुलना, एक्टिव बनाम पैसिव व ओवरलैप हब",
        description: "Direct comparative head-to-heads: Nifty 50 Index vs Active Large Cap, Flexi Cap vs Multi Cap, and portfolio stock overlap metrics.",
        hindiDescription: "निफ्टी 50 इंडेक्स बनाम एक्टिव लार्ज कैप, फ्लेक्सी कैप बनाम मल्टी कैप और पोर्टफोलियो ओवरलैप की हेड-टू-हेड तुलना।",
        badge: "Head-to-Head",
        icon: PieChart,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-700",
        href: "/hub/comparisons",
        action: () => onNavigateHub("comparisons"),
        tags: ["comparison", "overlap", "active vs passive", "nifty 50 vs active", "head to head"],
      },

      // 4. REFERENCE & MULTILINGUAL
      {
        id: "ref-glossary",
        category: "reference",
        title: "Investor Glossary: 40+ SEBI/AMFI Terms Decoded",
        hindiTitle: "निवेशक शब्दावली: 40+ सेबी व एम्फी वित्तीय शब्दों की परिभाषा",
        description: "Searchable dictionary of essential mutual fund terms: NAV, TER, Macaulay Duration, Beta, Alpha, Tracking Error, and Yield to Maturity.",
        hindiDescription: "एनएवी, व्यय अनुपात, मैकाले ड्यूरेशन, बीटा, अल्फा और ट्रैकिंग एरर जैसे जरूरी शब्दों की सरल व्याख्या व फॉर्मूले।",
        badge: "A-Z Dictionary",
        icon: BookOpen,
        iconBg: "bg-stone-100",
        iconColor: "text-stone-700",
        href: "/glossary",
        action: onNavigateGlossary,
        tags: ["glossary", "dictionary", "nav", "ter", "beta", "alpha", "macaulay duration"],
      },
      {
        id: "ref-faq",
        category: "reference",
        title: "Regulatory FAQ & Investor Grievance Knowledge Base",
        hindiTitle: "नियामक एफएक्यू (FAQ) व शिकायत निवारण नॉलेज बेस",
        description: "Answers to common investor doubts on SEBI SCORES portal, mutual fund nomination rules, minor investments, and joint holdings.",
        hindiDescription: "सेबी स्कोर्स (SCORES) शिकायत पोर्टल, नॉमिनी नियम, नाबालिग के नाम निवेश और संयुक्त खाते से जुड़े अक्सर पूछे जाने वाले सवाल।",
        badge: "Knowledge Base",
        icon: HelpCircle,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
        href: "/faq",
        action: onNavigateFAQ,
        tags: ["faq", "grievance", "sebi scores", "nomination rules", "investor rights"],
      },
      {
        id: "ref-hindi-edition",
        category: "reference",
        title: "Verified Hindi Flagship Research Edition",
        hindiTitle: "प्रमाणित हिन्दी संस्करण: प्रमुख मार्गदर्शक",
        description: "High-precision Hindi translations of flagship mutual fund guides, fully grounded in official AMFI Knowledge Centre disclosures.",
        hindiDescription: "एम्फी (AMFI) और सेबी के नियमों पर आधारित डायरेक्ट प्लान, 36 श्रेणियों और इंडेक्स फंड्स के प्रमाणित हिन्दी मार्गदर्शक।",
        badge: "हिन्दी संस्करण",
        icon: Globe,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        href: "/article/sebi-amfi-mutual-fund-categorization-guide-all-scheme-categories-rules",
        action: () => onNavigateHub("basics"),
        tags: ["hindi", "हिन्दी", "amfi hindi", "direct plan hindi", "bilingual"],
      },
    ],
    [
      onNavigateCalculator,
      onNavigateGuide,
      onNavigateHub,
      onNavigateGlossary,
      onNavigateFAQ,
    ]
  );

  // Filter tools by category and search
  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      // Category match
      if (filterCategory !== "all" && tool.category !== filterCategory) {
        return false;
      }

      // Search match
      if (localSearch.trim()) {
        const query = localSearch.toLowerCase().trim();
        const titleMatch = tool.title.toLowerCase().includes(query) || tool.hindiTitle.toLowerCase().includes(query);
        const descMatch = tool.description.toLowerCase().includes(query) || tool.hindiDescription.toLowerCase().includes(query);
        const tagMatch = tool.tags.some((tag) => tag.toLowerCase().includes(query));
        return titleMatch || descMatch || tagMatch;
      }

      return true;
    });
  }, [ALL_TOOLS, filterCategory, localSearch]);

  const seoTitle = isHindi
    ? "यील्डनेस्ट टूलकिट: सभी 7 कैलकुलेटर, चेकलिस्ट और विषय हब | YieldNest"
    : "YieldNest Investor Toolkit: Calculators, Checklists & Topic Hubs Directory";
  const seoDescription = isHindi
    ? "यील्डनेस्ट के सभी वित्तीय साधन: एसआईपी, स्टेप-अप, एसडब्ल्यूपी कैलकुलेटर, रिडेम्पशन पूर्व चेकलिस्ट, सेबी की 36 श्रेणियों के विषय हब और शब्दावली।"
    : "Complete directory of YieldNest tools: 7 mutual fund calculators, due diligence checklists, fund selection frameworks, 7 SEBI regulatory topic hubs, and investor glossary.";

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col font-sans text-[#1A1A1A]">
      <SEOHead
        settings={settings}
        customTitle={seoTitle}
        customDescription={seoDescription}
        urlPath="/toolkit"
        customKeywords="mutual fund toolkit, financial calculators india, SIP calculator, SWP calculator, redemption checklist, mutual fund selection framework, SEBI topic hubs, yieldnest tools"
      />

      <Navbar
        currentCategory="all"
        onSelectCategory={handleSelectCategory}
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
        settings={settings}
        onNavigateHome={onNavigateHome}
        isCalculatorView={false}
        onNavigateCalculators={onNavigateCalculators}
        activeMenu="toolkit"
        onNavigateFAQ={onNavigateFAQ}
        onNavigateGlossary={onNavigateGlossary}
        onNavigateGuides={() => onNavigateGuide("index")}
        onNavigateHubs={onNavigateHubs}
        onNavigateAbout={onNavigateAbout}
        onNavigateTerms={onNavigateTerms}
        onNavigateToolkit={onNavigateToolkit}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb Hierarchy */}
        <BreadcrumbNavigation
          items={[
            { label: "Home", href: "/", onClick: onNavigateHome },
            { label: isHindi ? "टूलकिट व साधन" : "Investor Toolkit", href: "/toolkit", isCurrent: true },
          ]}
          includeSchema={true}
        />

        {/* Hero Header Section */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-mono-data text-xs uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isHindi ? "सम्पूर्ण साधन निर्देशिका" : "YieldNest Master Directory"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#1A1A1A] tracking-tight leading-[1.15]">
            {isHindi
              ? "निवेशक टूलकिट: सभी वित्तीय साधन, चेकलिस्ट और मार्गदर्शक"
              : "Investor Toolkit: Interactive Calculators, Checklists & Regulatory Hubs"}
          </h1>

          <p className="text-base sm:text-lg text-[#524E45] leading-relaxed">
            {isHindi
              ? "म्यूचुअल फंड में आत्मविश्वास से निर्णय लेने के लिए आवश्यक सभी टूल्स एक ही स्थान पर। चक्रवृद्धि की गणना करें, कमीशन का नुकसान मापें और रिडेम्पशन से पहले वैधानिक जांच पूरी करें।"
              : "Everything you need to analyze, audit, and optimize your Indian mutual fund portfolio. Browse our full catalog of quantitative calculators, actionable pre-redemption checklists, and SEBI regulatory hubs."}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono-data text-stone-600 pt-2 border-t border-[#EAE8E0]">
            <span>✓ 7 {isHindi ? "वित्तीय कैलकुलेटर" : "Financial Calculators"}</span>
            <span>•</span>
            <span>✓ 3 {isHindi ? "जांच चेकलिस्ट व फ्रेमवर्क" : "Due Diligence Checklists"}</span>
            <span>•</span>
            <span>✓ 7 {isHindi ? "सेबी व एम्फी विषय हब" : "SEBI & AMFI Topic Hubs"}</span>
            <span>•</span>
            <span>✓ 40+ {isHindi ? "शब्दावली परिभाषाएं" : "Glossary Terms"}</span>
          </div>
        </header>

        {/* Filter & Live Search Toolbar */}
        <section className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isHindi ? "साधन, कैलकुलेटर या चेकलिस्ट खोजें..." : "Filter tools, calculators, checklists..."}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-xs focus:bg-white focus:border-stone-400 focus:outline-none transition-all placeholder:text-stone-400"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-800 text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-xs font-mono-data text-stone-500">
              {isHindi ? `दिखाए गए साधन: ${filteredTools.length}` : `Showing ${filteredTools.length} resources`}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterCategory === "all"
                  ? "bg-[#1A1A1A] text-white font-semibold"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {isHindi ? "सभी साधन" : "All Resources"} ({ALL_TOOLS.length})
            </button>
            <button
              onClick={() => setFilterCategory("calculator")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterCategory === "calculator"
                  ? "bg-emerald-800 text-white font-semibold"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{isHindi ? "कैलकुलेटर" : "Calculators"}</span>
            </button>
            <button
              onClick={() => setFilterCategory("guide")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterCategory === "guide"
                  ? "bg-blue-800 text-white font-semibold"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>{isHindi ? "चेकलिस्ट व गाइड" : "Checklists & Guides"}</span>
            </button>
            <button
              onClick={() => setFilterCategory("hub")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterCategory === "hub"
                  ? "bg-purple-800 text-white font-semibold"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isHindi ? "विषय हब" : "Topic Hubs"}</span>
            </button>
            <button
              onClick={() => setFilterCategory("reference")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterCategory === "reference"
                  ? "bg-amber-800 text-white font-semibold"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isHindi ? "शब्दावली व संदर्भ" : "Reference & Glossary"}</span>
            </button>
          </div>
        </section>

        {/* Tool Grid Cards */}
        {filteredTools.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <p className="text-base font-serif-editorial text-stone-700">
              {isHindi ? `"${localSearch}" के लिए कोई साधन नहीं मिला।` : `No tools found matching "${localSearch}".`}
            </p>
            <button
              onClick={() => {
                setLocalSearch("");
                setFilterCategory("all");
              }}
              className="text-xs text-stone-900 underline font-medium cursor-pointer"
            >
              {isHindi ? "फिल्टर साफ़ करें" : "Clear all filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const displayTitle = isHindi ? tool.hindiTitle : tool.title;
              const displayDesc = isHindi ? tool.hindiDescription : tool.description;

              return (
                <article
                  key={tool.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${tool.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-mono-data uppercase tracking-wider text-stone-500 font-medium px-2 py-0.5 rounded bg-stone-100">
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-serif-editorial text-lg font-bold text-[#1A1A1A] leading-snug group-hover:text-emerald-800 transition-colors">
                        <a
                          href={tool.href}
                          onClick={(e) => handleLinkClick(e, tool.action, tool.href)}
                          className="text-inherit no-underline"
                        >
                          {displayTitle}
                        </a>
                      </h2>
                      <p className="text-xs text-[#524E45] leading-relaxed mt-1 line-clamp-3">
                        {displayDesc}
                      </p>
                    </div>

                    {/* Tags preview */}
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-stone-100">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] font-mono-data text-stone-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-stone-100">
                    <a
                      href={tool.href}
                      onClick={(e) => handleLinkClick(e, tool.action, tool.href)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-[#1A1A1A] text-stone-800 hover:text-white text-xs font-semibold font-mono-data tracking-wide transition-all cursor-pointer no-underline group/btn"
                    >
                      <span>{isHindi ? "साधन खोलें" : "Launch Tool"}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Value Proposition Callout Card */}
        <section className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-emerald-400 font-mono-data text-[10px] uppercase font-bold tracking-wider">
              {isHindi ? "निष्पक्ष एवं पारदर्शी अनुसंधान" : "Independent & Unbiased Analytics"}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-editorial font-bold text-white">
              {isHindi
                ? "बिना किसी वितरक कमीशन या स्पॉन्सरशिप के पूर्ण पारदर्शी टूल"
                : "Zero Commissions, Zero Affiliate Bias, Pure Quantitative Math"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              {isHindi
                ? "यील्डनेस्ट के सभी कैलकुलेटर और चेकलिस्ट आधिकारिक सेबी (SEBI) और एम्फी (AMFI) विनियामक सूत्रों पर आधारित हैं। हम कोई म्यूचुअल फंड नहीं बेचते और न ही कोई वितरक कमीशन लेते हैं।"
                : "All YieldNest calculators and checklists are engineered strictly according to SEBI regulations and official AMFI mathematics. We do not distribute mutual funds or earn broker commissions."}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, onNavigateHome, "/")}
              className="px-4 py-2 rounded-xl bg-white text-stone-950 text-xs font-semibold font-mono-data hover:bg-stone-200 transition-colors no-underline"
            >
              {isHindi ? "नवीनतम अनुसंधान लेख पढ़ें" : "Read Latest Research Articles"}
            </a>
            <a
              href="/calculators"
              onClick={(e) => handleLinkClick(e, onNavigateCalculators, "/calculators")}
              className="px-4 py-2 rounded-xl bg-stone-800 text-stone-200 text-xs font-semibold font-mono-data hover:bg-stone-700 transition-colors no-underline"
            >
              {isHindi ? "कैलकुलेटर सूट देखें" : "Open Calculators Suite"}
            </a>
          </div>
        </section>
      </main>

      <Footer
        settings={settings}
        onSelectCategory={handleSelectCategory}
        onNavigateCalculators={onNavigateCalculators}
        onNavigateCalculator={onNavigateCalculator}
        onNavigateFAQ={onNavigateFAQ}
        onNavigateGlossary={onNavigateGlossary}
        onNavigateGuides={() => onNavigateGuide("index")}
        onNavigateHubs={onNavigateHubs}
        onNavigateAbout={onNavigateAbout}
        onNavigateTerms={onNavigateTerms}
        onNavigateToolkit={onNavigateToolkit}
      />
    </div>
  );
}
