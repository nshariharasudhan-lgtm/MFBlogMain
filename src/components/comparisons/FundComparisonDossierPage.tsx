import React, { useState } from "react";
import {
  Trophy,
  Shield,
  Zap,
  Percent,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Share2,
  Check,
  TrendingUp,
  HelpCircle,
  Scale,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FundComparisonDossier } from "../../types/comparison";
import { simulateSipComparison } from "../../data/fundComparisonsData";

interface FundComparisonDossierPageProps {
  dossier: FundComparisonDossier;
  onNavigateCompareHub?: () => void;
  onSelectOtherDuel?: (slug: string) => void;
  onNavigateCalculator?: (url: string) => void;
}

export function FundComparisonDossierPage({
  dossier,
  onNavigateCompareHub,
  onSelectOtherDuel,
  onNavigateCalculator,
}: FundComparisonDossierPageProps) {
  const [copiedShare, setCopiedShare] = useState(false);
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipYears, setSipYears] = useState(5);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const { fundA, fundB, executiveVerdict, portfolioOverlap, analystPillars, faqList } = dossier;

  // Re-calculate SIP live on user slider input
  const liveSip = simulateSipComparison(fundA.cagr5Y, fundB.cagr5Y, sipMonthly, sipYears);

  // Copy structured summary for Reddit / WhatsApp
  const handleCopySummary = () => {
    const text = `📊 *${fundA.shortName} vs ${fundB.shortName} (Head-to-Head Dossier)*\n\n` +
      `🏆 *Overall Edge:* ${executiveVerdict.overallWinner === "A" ? fundA.shortName : fundB.shortName}\n` +
      `📈 *5-Year CAGR:* ${fundA.shortName}: ${fundA.cagr5Y}% vs ${fundB.shortName}: ${fundB.cagr5Y}%\n` +
      `📉 *Volatility (Std Dev):* ${fundA.shortName}: ${fundA.standardDeviation}% vs ${fundB.shortName}: ${fundB.standardDeviation}%\n` +
      `💰 *Direct TER:* ${fundA.shortName}: ${fundA.expenseRatioDirect}% vs ${fundB.shortName}: ${fundB.expenseRatioDirect}%\n` +
      `🔍 *Portfolio Overlap:* ${portfolioOverlap.overlapPercentage}% (${portfolioOverlap.verdict})\n\n` +
      `Read full research tear sheet on YieldNest:\nhttps://www.yieldnest.online/compare/${dossier.slug}`;

    navigator.clipboard?.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const getOverlapBadgeColor = (rating: string) => {
    switch (rating) {
      case "LOW":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "MODERATE":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "HIGH":
      case "VERY_HIGH":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-stone-50 text-stone-800 border-stone-200";
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF9F5] text-[#1E1E1E] pb-24">
      {/* SEO Structured Data: Schema.org FAQPage & Article for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: dossier.title,
                description: dossier.metaDescription,
                datePublished: "2026-01-01T00:00:00+05:30",
                dateModified: "2026-10-16T00:00:00+05:30",
                author: {
                  "@type": "Organization",
                  name: "YieldNest Research Desk",
                  url: "https://www.yieldnest.online",
                },
                publisher: {
                  "@type": "Organization",
                  name: "YieldNest",
                  url: "https://www.yieldnest.online",
                },
                mainEntityOfPage: `https://www.yieldnest.online/compare/${dossier.slug}`,
              },
              {
                "@type": "FAQPage",
                mainEntity: faqList.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-stone-500 mb-6">
          <button
            onClick={onNavigateCompareHub}
            className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Fund Comparisons</span>
          </button>
          <span>/</span>
          <span className="text-stone-800 font-medium truncate">{dossier.category}</span>
          <span>/</span>
          <span className="text-stone-400 truncate">{fundA.shortName} vs {fundB.shortName}</span>
        </nav>

        {/* Category & Freshness Tag */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-mono uppercase tracking-wider bg-stone-200/80 text-stone-800 px-2.5 py-0.5 rounded-sm font-semibold">
            {dossier.category} Battlecard
          </span>
          <span className="text-xs font-mono text-stone-500 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-stone-400" />
            Verified AMFI Data: {dossier.lastUpdated}
          </span>
          <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-sm">
            Direct Growth Plans
          </span>
        </div>

        {/* Main Dossier Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 leading-[1.15] mb-4">
          {dossier.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 font-serif leading-relaxed mb-6">
          {dossier.subtitle}
        </p>

        {/* Action Bar (Share + Overlap Quick Chip) */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-stone-200/80 mb-8">
          <div className="flex items-center gap-3">
            <div className={`text-xs font-mono px-2.5 py-1 rounded border flex items-center gap-1.5 ${getOverlapBadgeColor(portfolioOverlap.overlapRating)}`}>
              <Layers className="w-3.5 h-3.5" />
              <span>Portfolio Overlap: <strong>{portfolioOverlap.overlapPercentage}%</strong></span>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              {portfolioOverlap.verdict}
            </span>
          </div>

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 px-3 py-1.5 rounded transition-colors cursor-pointer"
            title="Copy formatted summary to paste on Reddit, Twitter, or WhatsApp"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied Dossier Summary!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Share Summary (Reddit / WhatsApp)</span>
              </>
            )}
          </button>
        </div>

        {/* =========================================================================
            SECTION 1: 10-SECOND EXECUTIVE VERDICT (TALE OF THE TAPE SUMMARY)
            ========================================================================= */}
        <section className="bg-white border-2 border-stone-900 rounded-sm p-5 sm:p-6 mb-10 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                The 10-Second Executive Verdict
              </h2>
            </div>
            <span className="text-xs font-mono bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-stone-300">
              Analyst Tear Sheet
            </span>
          </div>

          {/* High-level summary text */}
          <p className="text-sm sm:text-base text-stone-800 leading-relaxed mb-6 font-serif">
            {executiveVerdict.overallSummary}
          </p>

          {/* 3 Verdict Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-stone-50 border border-stone-200 p-3.5 rounded">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wide">Overall Long-Term</span>
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Winner: {executiveVerdict.overallWinner === "A" ? fundA.shortName : fundB.shortName}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-normal">
                {executiveVerdict.overallWinner === "A"
                  ? `${fundA.shortName} offers unmatched downside protection and foreign tech hedges.`
                  : `${fundB.shortName} delivers aggressive compounding through high-conviction momentum.`}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3.5 rounded">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wide">Aggressive Compounding</span>
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                  Edge: {executiveVerdict.aggressiveGrowthWinner === "A" ? fundA.shortName : fundB.shortName}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-normal">
                {executiveVerdict.aggressiveGrowthNote}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3.5 rounded">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wide">Downside Shield</span>
                <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                  Edge: {executiveVerdict.defensiveSipWinner === "A" ? fundA.shortName : fundB.shortName}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-normal">
                {executiveVerdict.defensiveSipNote}
              </p>
            </div>
          </div>

          {/* Persona Fit: Who Should Pick Which? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
            <div className="bg-[#FAF9F5] border-l-4 border-emerald-600 p-4 rounded-r">
              <div className="text-xs font-mono uppercase tracking-wider font-semibold text-emerald-800 mb-1">
                Pick {fundA.shortName} If:
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
                {executiveVerdict.whoShouldPickFundA}
              </p>
            </div>

            <div className="bg-[#FAF9F5] border-l-4 border-indigo-600 p-4 rounded-r">
              <div className="text-xs font-mono uppercase tracking-wider font-semibold text-indigo-800 mb-1">
                Pick {fundB.shortName} If:
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
                {executiveVerdict.whoShouldPickFundB}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: "TALE OF THE TAPE" SIDE-BY-SIDE METRICS MATRIX
            ========================================================================= */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-stone-900">
                Tale of the Tape: Side-by-Side Metric Battle
              </h2>
              <p className="text-xs font-mono text-stone-500">
                Key performance, volatility, fee, and manager metrics (Direct Plans)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white border border-stone-300 rounded shadow-sm">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="bg-stone-100/80 border-b border-stone-300">
                  <th className="py-3 px-4 font-mono text-xs uppercase text-stone-600 font-semibold w-1/3">
                    Metric
                  </th>
                  <th className="py-3 px-4 font-serif text-base text-stone-900 font-semibold w-1/3 bg-emerald-50/50">
                    <div className="flex items-center gap-1.5">
                      <span>{fundA.shortName}</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-serif text-base text-stone-900 font-semibold w-1/3 bg-indigo-50/50">
                    <div className="flex items-center gap-1.5">
                      <span>{fundB.shortName}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono text-xs">
                {/* 5Y CAGR */}
                <tr className="hover:bg-stone-50/60">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    5-Year Rolling CAGR
                    <span className="block text-[11px] font-mono text-stone-400">Annualized multi-year return</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-stone-900">
                    {fundA.cagr5Y}%
                    {fundA.cagr5Y > fundB.cagr5Y && (
                      <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Higher</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-bold text-stone-900">
                    {fundB.cagr5Y}%
                    {fundB.cagr5Y > fundA.cagr5Y && (
                      <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Higher</span>
                    )}
                  </td>
                </tr>

                {/* 3Y CAGR */}
                <tr className="hover:bg-stone-50/60">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    3-Year Rolling CAGR
                  </td>
                  <td className="py-3 px-4 text-stone-900 font-semibold">
                    {fundA.cagr3Y}%
                    {fundA.cagr3Y > fundB.cagr3Y && (
                      <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Higher</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-stone-900 font-semibold">
                    {fundB.cagr3Y}%
                    {fundB.cagr3Y > fundA.cagr3Y && (
                      <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Higher</span>
                    )}
                  </td>
                </tr>

                {/* 1Y Return */}
                <tr className="hover:bg-stone-50/60">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    1-Year Recent Return
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    {fundA.cagr1Y}%
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    {fundB.cagr1Y}%
                  </td>
                </tr>

                {/* Volatility: Standard Deviation */}
                <tr className="hover:bg-stone-50/60 bg-stone-50/30">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    Standard Deviation (Risk)
                    <span className="block text-[11px] font-mono text-stone-400">Lower is smoother ride</span>
                  </td>
                  <td className="py-3 px-4 text-stone-900">
                    {fundA.standardDeviation}%
                    {fundA.standardDeviation < fundB.standardDeviation && (
                      <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Calmer</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-stone-900">
                    {fundB.standardDeviation}%
                    {fundB.standardDeviation < fundA.standardDeviation && (
                      <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Calmer</span>
                    )}
                  </td>
                </tr>

                {/* Sharpe Ratio */}
                <tr className="hover:bg-stone-50/60">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    Sharpe Ratio (Risk-Adjusted Alpha)
                    <span className="block text-[11px] font-mono text-stone-400">Higher return per unit risk</span>
                  </td>
                  <td className="py-3 px-4 text-stone-900 font-semibold">
                    {fundA.sharpeRatio}
                    {fundA.sharpeRatio >= fundB.sharpeRatio && (
                      <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Better</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-stone-900 font-semibold">
                    {fundB.sharpeRatio}
                    {fundB.sharpeRatio > fundA.sharpeRatio && (
                      <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Better</span>
                    )}
                  </td>
                </tr>

                {/* Beta */}
                <tr className="hover:bg-stone-50/60">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    Market Beta
                    <span className="block text-[11px] font-mono text-stone-400">&lt;1.0 means less volatile than Nifty</span>
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    {fundA.beta}
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    {fundB.beta}
                  </td>
                </tr>

                {/* Expense Ratio (Direct) */}
                <tr className="hover:bg-stone-50/60 bg-emerald-50/20">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    Direct Plan Expense Ratio (TER)
                    <span className="block text-[11px] font-mono text-stone-400">Lower saves compounding wealth</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-stone-900">
                    {fundA.expenseRatioDirect}%
                    {fundA.expenseRatioDirect < fundB.expenseRatioDirect && (
                      <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Cheaper</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-bold text-stone-900">
                    {fundB.expenseRatioDirect}%
                    {fundB.expenseRatioDirect < fundA.expenseRatioDirect && (
                      <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Cheaper</span>
                    )}
                  </td>
                </tr>

                {/* AUM */}
                <tr className="hover:bg-stone-50/60">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    Assets Under Management (AUM)
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    ₹{fundA.aumCrores.toLocaleString("en-IN")} Cr
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    ₹{fundB.aumCrores.toLocaleString("en-IN")} Cr
                  </td>
                </tr>

                {/* Portfolio Turnover */}
                <tr className="hover:bg-stone-50/60">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    Portfolio Turnover Ratio
                    <span className="block text-[11px] font-mono text-stone-400">Annual stock churn %</span>
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    {fundA.portfolioTurnover}% (Low Churn)
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    {fundB.portfolioTurnover}%
                  </td>
                </tr>

                {/* Fund Managers */}
                <tr className="hover:bg-stone-50/60">
                  <td className="py-3 px-4 font-sans font-medium text-stone-800">
                    Fund Manager(s)
                  </td>
                  <td className="py-3 px-4 text-stone-800 font-sans">
                    {fundA.fundManagers.join(", ")}
                  </td>
                  <td className="py-3 px-4 text-stone-800 font-sans">
                    {fundB.fundManagers.join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: PORTFOLIO OVERLAP & DUPLICATION RISK (THE REDDIT MAGNET)
            ========================================================================= */}
        <section className="bg-white border border-stone-300 rounded-sm p-5 sm:p-6 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h2 className="font-serif text-2xl font-semibold text-stone-900">
                  Portfolio Overlap & Duplication Risk
                </h2>
              </div>
              <p className="text-xs font-mono text-stone-500 mt-0.5">
                Should you hold both funds together or choose just one?
              </p>
            </div>
            <div className={`px-3 py-1 rounded border text-xs font-mono font-bold ${getOverlapBadgeColor(portfolioOverlap.overlapRating)}`}>
              {portfolioOverlap.overlapPercentage}% Common Weight
            </div>
          </div>

          {/* Overlap Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-mono text-stone-600 mb-1.5">
              <span>0% (Completely Distinct)</span>
              <span className="font-bold text-stone-900">Effective Overlap: {portfolioOverlap.overlapPercentage}%</span>
              <span>100% (Exact Duplicate)</span>
            </div>
            <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  portfolioOverlap.overlapPercentage > 50
                    ? "bg-rose-500"
                    : portfolioOverlap.overlapPercentage > 30
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${portfolioOverlap.overlapPercentage}%` }}
              />
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-stone-50 border border-stone-200 rounded p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-stone-900 mb-1">
                  Analyst Overlap Verdict:
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
                  {portfolioOverlap.verdict}
                </p>
              </div>
            </div>
          </div>

          {/* Common Holdings Table */}
          {portfolioOverlap.commonHoldings.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold mb-2">
                Shared Top Holdings (Dual Exposure)
              </h4>
              <div className="overflow-x-auto border border-stone-200 rounded">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-stone-100 text-stone-600 border-b border-stone-200">
                    <tr>
                      <th className="py-2 px-3">Stock Name</th>
                      <th className="py-2 px-3">Sector</th>
                      <th className="py-2 px-3">{fundA.shortName} Weight</th>
                      <th className="py-2 px-3">{fundB.shortName} Weight</th>
                      <th className="py-2 px-3">Overlap Contribution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {portfolioOverlap.commonHoldings.map((c, idx) => (
                      <tr key={idx} className="hover:bg-stone-50">
                        <td className="py-2 px-3 font-semibold text-stone-900">{c.stock}</td>
                        <td className="py-2 px-3 text-stone-600">{c.sector}</td>
                        <td className="py-2 px-3 text-emerald-800">{c.weightA}%</td>
                        <td className="py-2 px-3 text-indigo-800">{c.weightB}%</td>
                        <td className="py-2 px-3 font-bold text-stone-800">
                          {c.minWeight.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Unique Holdings Column Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="border border-stone-200 rounded p-3 bg-stone-50/50">
              <h5 className="text-xs font-mono font-semibold text-emerald-900 mb-2">
                Distinctive Bets in {fundA.shortName}:
              </h5>
              <ul className="text-xs text-stone-700 space-y-1">
                {portfolioOverlap.uniqueHoldingsA.slice(0, 4).map((h, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{h.stock}</span>
                    <span className="font-mono text-stone-500">{h.weight}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-stone-200 rounded p-3 bg-stone-50/50">
              <h5 className="text-xs font-mono font-semibold text-indigo-900 mb-2">
                Distinctive Bets in {fundB.shortName}:
              </h5>
              <ul className="text-xs text-stone-700 space-y-1">
                {portfolioOverlap.uniqueHoldingsB.slice(0, 4).map((h, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{h.stock}</span>
                    <span className="font-mono text-stone-500">{h.weight}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SIP HEAD-TO-HEAD SIMULATOR
            ========================================================================= */}
        <section className="bg-stone-900 text-white rounded-sm p-6 sm:p-8 mb-12 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="font-serif text-2xl font-medium tracking-tight text-white">
              Interactive SIP Compounding Simulator
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-400 mb-6">
            Compare actual wealth creation using historical 5-year CAGR rates
          </p>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-stone-800/80 p-4 rounded border border-stone-700">
            <div>
              <div className="flex justify-between text-xs font-mono text-stone-300 mb-2">
                <span>Monthly SIP Amount:</span>
                <span className="font-bold text-white text-sm">₹{sipMonthly.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={sipMonthly}
                onChange={(e) => setSipMonthly(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
                <span>₹1,000</span>
                <span>₹25,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-stone-300 mb-2">
                <span>Investment Horizon:</span>
                <span className="font-bold text-white text-sm">{sipYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={sipYears}
                onChange={(e) => setSipYears(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
                <span>1 Year</span>
                <span>5 Years</span>
                <span>10 Years</span>
              </div>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-stone-800/60 border border-stone-700 p-4 rounded">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-1">
                Total Amount Invested
              </span>
              <span className="text-xl font-mono font-bold text-stone-200">
                ₹{liveSip.totalInvested.toLocaleString("en-IN")}
              </span>
              <span className="block text-[10px] font-mono text-stone-400 mt-1">
                Over {sipYears * 12} monthly installments
              </span>
            </div>

            <div className="bg-stone-800 border-2 border-emerald-500/80 p-4 rounded">
              <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider block mb-1">
                {fundA.shortName} ({fundA.cagr5Y}%)
              </span>
              <span className="text-2xl font-mono font-bold text-emerald-400">
                ₹{liveSip.fundAFinalCorpus.toLocaleString("en-IN")}
              </span>
              <span className="block text-[10px] font-mono text-emerald-200/70 mt-1">
                Gains: ₹{(liveSip.fundAFinalCorpus - liveSip.totalInvested).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-stone-800 border-2 border-indigo-400/80 p-4 rounded">
              <span className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider block mb-1">
                {fundB.shortName} ({fundB.cagr5Y}%)
              </span>
              <span className="text-2xl font-mono font-bold text-indigo-300">
                ₹{liveSip.fundBFinalCorpus.toLocaleString("en-IN")}
              </span>
              <span className="block text-[10px] font-mono text-indigo-200/70 mt-1">
                Gains: ₹{(liveSip.fundBFinalCorpus - liveSip.totalInvested).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Difference Callout */}
          <div className="mt-4 text-center text-xs font-mono text-stone-300">
            Net Corpus Difference:{" "}
            <strong className="text-white">₹{liveSip.corpusDelta.toLocaleString("en-IN")}</strong>{" "}
            in favor of{" "}
            <span className="underline decoration-emerald-400 text-emerald-300 font-bold">
              {liveSip.fundAFinalCorpus >= liveSip.fundBFinalCorpus ? fundA.shortName : fundB.shortName}
            </span>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: 3 FOCUSED ANALYST PILLARS (ZERO FLUFF)
            ========================================================================= */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Analyst Pillar Deep-Dives
            </h2>
            <p className="text-xs font-mono text-stone-500">
              Crisp qualitative evaluations of stress resistance, strategy DNA, and cost drag
            </p>
          </div>

          <div className="space-y-4">
            {analystPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-300 rounded p-5 hover:border-stone-400 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs font-mono font-bold text-stone-700">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-stone-900">
                      {pillar.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 self-start sm:self-auto">
                    Edge: {pillar.winner === "A" ? fundA.shortName : pillar.winner === "B" ? fundB.shortName : "Equal Ground"}
                  </span>
                </div>

                <p className="text-sm text-stone-800 font-serif leading-relaxed mb-4">
                  {pillar.takeaway}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-emerald-50/50 border border-emerald-200/80 p-2.5 rounded">
                    <span className="font-bold text-emerald-900 block mb-0.5">{fundA.shortName}:</span>
                    <span className="text-stone-700">{pillar.fundANote}</span>
                  </div>
                  <div className="bg-indigo-50/50 border border-indigo-200/80 p-2.5 rounded">
                    <span className="font-bold text-indigo-900 block mb-0.5">{fundB.shortName}:</span>
                    <span className="text-stone-700">{pillar.fundBNote}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
            ========================================================================= */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-stone-700" />
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="divide-y divide-stone-200 border border-stone-300 rounded bg-white overflow-hidden">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left py-4 px-5 flex items-center justify-between gap-4 font-serif text-base font-medium text-stone-900 hover:bg-stone-50 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-stone-700 leading-relaxed font-serif bg-stone-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: COMMUNITY ACTION & RELATED MATCHUPS
            ========================================================================= */}
        <section className="bg-stone-100 border border-stone-300 rounded p-6 text-center">
          <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
            Looking for more Head-to-Head Comparisons?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mb-5 font-serif">
            Explore our curated battlecards across Small Cap, Flexi Cap, and Large & Mid Cap schemes, or build your own custom duel.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNavigateCompareHub}
              className="bg-stone-900 text-white hover:bg-black text-xs font-mono font-medium px-4 py-2.5 rounded transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Browse All Fund Comparisons</span>
            </button>
            <button
              onClick={() => onNavigateCalculator?.("/calculators/direct-vs-regular")}
              className="bg-white text-stone-800 hover:bg-stone-50 border border-stone-300 text-xs font-mono font-medium px-4 py-2.5 rounded transition-colors cursor-pointer"
            >
              <span>Direct vs Regular Fee Calculator</span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
