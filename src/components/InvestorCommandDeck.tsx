import React from "react";
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
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface InvestorCommandDeckProps {
  onNavigateCalculator: (calculatorUrl?: string) => void;
  onNavigateCalculators: () => void;
  onNavigateGuide: (guideId?: "how-to-choose" | "redemption" | "index") => void;
  onNavigateHub: (hubSlug?: string) => void;
  onNavigateHubs: () => void;
  onNavigateGlossary: () => void;
  onNavigateToolkit: () => void;
  onNavigateCompare?: () => void;
}

export function InvestorCommandDeck({
  onNavigateCalculator,
  onNavigateCalculators,
  onNavigateGuide,
  onNavigateHub,
  onNavigateHubs,
  onNavigateGlossary,
  onNavigateToolkit,
  onNavigateCompare,
}: InvestorCommandDeckProps) {
  const { isHindi } = useLanguage();

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
    <section
      aria-label="YieldNest Investor Suite and Tools"
      className="bg-[#F6F4ED] border border-[#E3DFC2] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xs space-y-6"
    >
      {/* Masthead Header of the Command Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2DFD0]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono-data text-[10px] uppercase font-bold tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              {isHindi ? "निवेशक टूलकिट व मार्गदर्शक" : "Investor Toolsuite & Quick Access"}
            </span>
            <span className="text-[11px] font-mono-data text-stone-500 hidden sm:inline">
              {isHindi ? "7 कैलकुलेटर · 2 चेकलिस्ट · 7 विषय हब" : "7 Calculators · 2 Due Diligence Checklists · 7 Topic Hubs"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-[#1A1A1A] tracking-tight">
            {isHindi ? "निर्णय लेने के लिए सटीक वित्तीय साधन" : "Institutional Tools & Actionable Checklists"}
          </h2>
          <p className="text-xs sm:text-sm text-[#59554C] max-w-2xl leading-relaxed">
            {isHindi
              ? "केवल लेख नहीं — अपने म्यूचुअल फंड पोर्टफोलियो के रिटर्न, खर्च, एग्जिट लोड और विनियामक वर्गीकरण का सटीक विश्लेषण करें।"
              : "Beyond reading research: simulate compounding returns, audit distributor fee drag, and run pre-redemption tax checks."}
          </p>
        </div>

        {/* Directory Launch Buttons */}
        <div className="shrink-0 flex flex-wrap items-center gap-2">
          {onNavigateCompare && (
            <a
              href="/compare"
              onClick={(e) => handleLinkClick(e, onNavigateCompare, "/compare")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-semibold font-mono-data tracking-wide transition-all shadow-xs cursor-pointer group no-underline"
            >
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHindi ? "फंड तुलना (Head-to-Head Duels)" : "Fund Duels & Tear Sheets"}</span>
            </a>
          )}
          <a
            href="/toolkit"
            onClick={(e) => handleLinkClick(e, onNavigateToolkit, "/toolkit")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold font-mono-data tracking-wide transition-all shadow-xs cursor-pointer group no-underline"
          >
            <span>{isHindi ? "सभी साधन देखें (All Tools)" : "Explore All Tools Directory"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 4 Focused Pillar Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Interactive Calculators */}
        <div className="bg-[#FAF9F5] rounded-xl sm:rounded-2xl border border-[#E5E1D3] p-4 flex flex-col justify-between hover:border-[#CDC7B5] transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-900 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-emerald-800" />
              </div>
              <span className="text-[10px] font-mono-data text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                7 {isHindi ? "उपकरण" : "Tools"}
              </span>
            </div>
            <div>
              <h3 className="font-serif-editorial text-base font-bold text-[#1A1A1A] group-hover:text-emerald-900 transition-colors">
                {isHindi ? "वित्तीय कैलकुलेटर" : "Quantitative Calculators"}
              </h3>
              <p className="text-[11px] text-[#69655B] leading-relaxed mt-0.5">
                {isHindi
                  ? "एसआईपी, स्टेप-अप, एसडब्ल्यूपी और डायरेक्ट बनाम रेगुलर कमीशन बचत का सटीक हिसाब।"
                  : "Simulate SIP compounding, annual salary step-up increments, and distributor fee drag."}
              </p>
            </div>

            {/* Quick Chips */}
            <div className="space-y-1.5 pt-2 border-t border-[#EAE6D8]">
              <a
                href="/calculators/sip"
                onClick={(e) => handleLinkClick(e, () => onNavigateCalculator("/calculators/sip"), "/calculators/sip")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-emerald-700" />
                  {isHindi ? "एसआईपी कैलकुलेटर" : "SIP Returns & Compounding"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
              <a
                href="/calculators/step-up-sip"
                onClick={(e) => handleLinkClick(e, () => onNavigateCalculator("/calculators/step-up-sip"), "/calculators/step-up-sip")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <Sliders className="w-3 h-3 text-blue-700" />
                  {isHindi ? "स्टेप-अप एसआईपी" : "Step-Up SIP (Salary Top-Up)"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
              <a
                href="/calculators/direct-vs-regular"
                onClick={(e) => handleLinkClick(e, () => onNavigateCalculator("/calculators/direct-vs-regular"), "/calculators/direct-vs-regular")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <Scale className="w-3 h-3 text-amber-700" />
                  {isHindi ? "डायरेक्ट बनाम रेगुलर" : "Direct vs Regular TER Drag"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-[#EAE6D8]">
            <a
              href="/calculators"
              onClick={(e) => handleLinkClick(e, onNavigateCalculators, "/calculators")}
              className="text-[11px] font-mono-data font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 no-underline"
            >
              <span>{isHindi ? "सभी 7 कैलकुलेटर देखें" : "View All 7 Calculators"}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Card 2: Due Diligence Checklists */}
        <div className="bg-[#FAF9F5] rounded-xl sm:rounded-2xl border border-[#E5E1D3] p-4 flex flex-col justify-between hover:border-[#CDC7B5] transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-100/80 text-blue-900 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-blue-800" />
              </div>
              <span className="text-[10px] font-mono-data text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                {isHindi ? "चेकलिस्ट" : "Frameworks"}
              </span>
            </div>
            <div>
              <h3 className="font-serif-editorial text-base font-bold text-[#1A1A1A] group-hover:text-blue-900 transition-colors">
                {isHindi ? "निवेश चेकलिस्ट व गाइड" : "Investor Checklists"}
              </h3>
              <p className="text-[11px] text-[#69655B] leading-relaxed mt-0.5">
                {isHindi
                  ? "म्यूचुअल फंड बेचने से पहले 10-सूत्रीय टैक्स जांच और सही स्कीम चयन का संस्थागत फ्रेमवर्क।"
                  : "Step-by-step audit frameworks before redeeming mutual fund units or picking new funds."}
              </p>
            </div>

            {/* Quick Chips */}
            <div className="space-y-1.5 pt-2 border-t border-[#EAE6D8]">
              <a
                href="/guides/redemption-checklist"
                onClick={(e) => handleLinkClick(e, () => onNavigateGuide("redemption"), "/guides/redemption-checklist")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <FileCheck2 className="w-3 h-3 text-red-600" />
                  {isHindi ? "रिडेम्पशन पूर्व चेकलिस्ट" : "Pre-Redemption Tax Checklist"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
              <a
                href="/guides/how-to-choose-a-mutual-fund"
                onClick={(e) => handleLinkClick(e, () => onNavigateGuide("how-to-choose"), "/guides/how-to-choose-a-mutual-fund")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  {isHindi ? "सही फंड कैसे चुनें" : "How to Choose a Mutual Fund"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
              <a
                href="/article/consolidated-account-statement-cas-guide"
                onClick={(e) => handleLinkClick(e, () => onNavigateGuide("index"), "/article/consolidated-account-statement-cas-guide")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-stone-600" />
                  {isHindi ? "सीएएस (CAS) ऑडिट गाइड" : "CAS Statement Audit Guide"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-[#EAE6D8]">
            <a
              href="/guides"
              onClick={(e) => handleLinkClick(e, () => onNavigateGuide("index"), "/guides")}
              className="text-[11px] font-mono-data font-semibold text-blue-800 hover:text-blue-950 flex items-center gap-1 no-underline"
            >
              <span>{isHindi ? "सभी मार्गदर्शक देखें" : "View Complete Guides Hub"}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Card 3: Regulatory Topic Hubs */}
        <div className="bg-[#FAF9F5] rounded-xl sm:rounded-2xl border border-[#E5E1D3] p-4 flex flex-col justify-between hover:border-[#CDC7B5] transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-100/80 text-purple-900 flex items-center justify-center">
                <Compass className="w-5 h-5 text-purple-800" />
              </div>
              <span className="text-[10px] font-mono-data text-purple-800 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
                7 {isHindi ? "हब" : "Hubs"}
              </span>
            </div>
            <div>
              <h3 className="font-serif-editorial text-base font-bold text-[#1A1A1A] group-hover:text-purple-900 transition-colors">
                {isHindi ? "सेबी व एम्फी विषय हब" : "Regulatory Topic Hubs"}
              </h3>
              <p className="text-[11px] text-[#69655B] leading-relaxed mt-0.5">
                {isHindi
                  ? "सेबी की 36 श्रेणियों, कराधान नियमों और सुरक्षा मानकों का विषयवार संकलन।"
                  : "Curated research clusters on SEBI scheme categorizations, taxation, and safety norms."}
              </p>
            </div>

            {/* Quick Chips */}
            <div className="space-y-1.5 pt-2 border-t border-[#EAE6D8]">
              <a
                href="/hub/tax-and-elss"
                onClick={(e) => handleLinkClick(e, () => onNavigateHub("tax-and-elss"), "/hub/tax-and-elss")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3 text-emerald-600" />
                  {isHindi ? "कराधान व ईएलएसएस (ELSS)" : "Taxation & ELSS Hub"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
              <a
                href="/hub/safety-and-risk"
                onClick={(e) => handleLinkClick(e, () => onNavigateHub("safety-and-risk"), "/hub/safety-and-risk")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  {isHindi ? "सुरक्षा व जोखिम विश्लेषण" : "Safety & Stress Tests"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
              <a
                href="/hub/comparisons"
                onClick={(e) => handleLinkClick(e, () => onNavigateHub("comparisons"), "/hub/comparisons")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <PieChart className="w-3 h-3 text-amber-600" />
                  {isHindi ? "स्कीम तुलना व ओवरलैप" : "Scheme Comparisons & Overlap"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-[#EAE6D8]">
            <a
              href="/hubs"
              onClick={(e) => handleLinkClick(e, onNavigateHubs, "/hubs")}
              className="text-[11px] font-mono-data font-semibold text-purple-800 hover:text-purple-950 flex items-center gap-1 no-underline"
            >
              <span>{isHindi ? "सभी 7 विषय हब देखें" : "Explore All 7 Topic Hubs"}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Card 4: Glossary & Multilingual Edition */}
        <div className="bg-[#FAF9F5] rounded-xl sm:rounded-2xl border border-[#E5E1D3] p-4 flex flex-col justify-between hover:border-[#CDC7B5] transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-900 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-800" />
              </div>
              <span className="text-[10px] font-mono-data text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                {isHindi ? "शब्दावली" : "Reference"}
              </span>
            </div>
            <div>
              <h3 className="font-serif-editorial text-base font-bold text-[#1A1A1A] group-hover:text-amber-900 transition-colors">
                {isHindi ? "शब्दावली व भाषा समर्थन" : "Glossary & Reference"}
              </h3>
              <p className="text-[11px] text-[#69655B] leading-relaxed mt-0.5">
                {isHindi
                  ? "40+ सेबी विनियामक शब्दों की आसान परिभाषाएं और आधिकारिक हिन्दी अनुवाद।"
                  : "40+ official AMFI/SEBI definitions, mathematical formulas, and verified Hindi edition."}
              </p>
            </div>

            {/* Quick Chips */}
            <div className="space-y-1.5 pt-2 border-t border-[#EAE6D8]">
              <a
                href="/glossary"
                onClick={(e) => handleLinkClick(e, onNavigateGlossary, "/glossary")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-stone-700" />
                  {isHindi ? "वित्तीय शब्दावली (40+ शब्द)" : "Investor Glossary (40+ Terms)"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
              <a
                href="/calculators/swp"
                onClick={(e) => handleLinkClick(e, () => onNavigateCalculator("/calculators/swp"), "/calculators/swp")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-purple-700" />
                  {isHindi ? "एसडब्ल्यूपी रिटायरमेंट कैलकुलेटर" : "SWP Retirement Longevity"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
              <a
                href="/article/sebi-amfi-mutual-fund-categorization-guide-all-scheme-categories-rules"
                onClick={(e) => handleLinkClick(e, () => onNavigateHub("basics"), "/article/sebi-amfi-mutual-fund-categorization-guide-all-scheme-categories-rules")}
                className="flex items-center justify-between px-3 py-2 min-h-[40px] rounded-lg text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/80 transition-colors no-underline group/link"
              >
                <span className="font-medium text-[11px] flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-emerald-700" />
                  {isHindi ? "हिन्दी संस्करण (Hindi Edition)" : "Verified Hindi Edition"}
                </span>
                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/link:text-stone-700 group-hover/link:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-[#EAE6D8]">
            <a
              href="/toolkit"
              onClick={(e) => handleLinkClick(e, onNavigateToolkit, "/toolkit")}
              className="text-[11px] font-mono-data font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 no-underline"
            >
              <span>{isHindi ? "पूरा डायरेक्टरी इंडेक्स खोलें" : "Open Full Toolkit Catalog"}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
