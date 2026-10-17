import React, { useState } from "react";
import {
  Scale,
  ArrowRight,
  Layers,
  Trophy,
  TrendingUp,
  Percent,
  CheckCircle2,
  Sparkles,
  ArrowRightLeft,
  Search,
  Filter,
  Database,
} from "lucide-react";
import { FundComparisonDossier, FundProfile } from "../../types/comparison";
import {
  getAllFundComparisons,
  getAvailableFunds,
  generateDynamicComparison,
} from "../../data/fundComparisonsData";

interface FundComparisonsHubPageProps {
  onSelectDuel: (slug: string) => void;
  onDynamicDuelGenerated?: (dossier: FundComparisonDossier) => void;
  onNavigateDatabase?: () => void;
}

export function FundComparisonsHubPage({
  onSelectDuel,
  onDynamicDuelGenerated,
  onNavigateDatabase,
}: FundComparisonsHubPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [fundAId, setFundAId] = useState<string>("parag-parikh-flexi-cap");
  const [fundBId, setFundBId] = useState<string>("hdfc-flexi-cap");
  const [customError, setCustomError] = useState<string | null>(null);

  const allComparisons = getAllFundComparisons();
  const availableFunds = getAvailableFunds();

  const categories = ["All", "Flexi Cap", "Small Cap", "Large & Mid Cap"];

  const filteredComparisons =
    selectedCategory === "All"
      ? allComparisons
      : allComparisons.filter((c) => c.category === selectedCategory);

  const handleLaunchCustomDuel = () => {
    if (fundAId === fundBId) {
      setCustomError("Please choose two different mutual funds to compare.");
      return;
    }
    setCustomError(null);
    const dynamic = generateDynamicComparison(fundAId, fundBId);
    if (dynamic) {
      if (onDynamicDuelGenerated) {
        onDynamicDuelGenerated(dynamic);
      } else {
        onSelectDuel(dynamic.slug);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E1E1E] pb-24">
      {/* Header Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        {/* Badge & Title */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono uppercase tracking-wider bg-stone-900 text-white px-2.5 py-1 rounded font-semibold flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            Research Desk
          </span>
          <span className="text-xs font-mono text-stone-500">
            AMFI Verified Data & Portfolio Overlap Analytics
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-stone-900 leading-[1.15] mb-4">
          Mutual Fund Head-to-Head Dossiers
        </h1>

        <p className="text-base sm:text-lg text-stone-600 font-serif leading-relaxed max-w-3xl mb-8">
          Not another 2,000-word generic blog post. We strip away the fluff to give you
          <strong> 10-second verdicts</strong>, <strong>side-by-side metric battlecards</strong>,
          <strong> true portfolio stock overlap %</strong>, and <strong>live SIP outcome simulators</strong>.
        </p>

        {/* Live AMFI Database Feature Strip */}
        <div className="bg-stone-900 text-white rounded-xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-stone-800 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Official AMFI Registry
                </span>
                <span className="text-[10px] font-mono bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
                  Daily NAVs · ISINs · Supabase Sync
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-100 mt-0.5">
                Explore Full 400+ AMFI Mutual Fund Database
              </h3>
            </div>
          </div>
          <button
            onClick={onNavigateDatabase || (() => {
              window.history.pushState({}, "", "/database");
              window.dispatchEvent(new PopStateEvent("popstate"));
            })}
            className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono text-xs font-bold px-4 py-2.5 rounded transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
          >
            <span>Open Database</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* =========================================================================
            CUSTOM DUEL BUILDER WIDGET
            ========================================================================= */}
        <div className="bg-white border-2 border-stone-900 rounded p-5 sm:p-7 mb-12 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-200">
            <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
              Build Your Own Head-to-Head Duel
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 mb-6">
            Select any two funds from our master registry to generate an instant tear sheet
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
            {/* Fund A Picker */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-stone-600 uppercase tracking-wide mb-1.5">
                Corner A (Fund 1)
              </label>
              <select
                value={fundAId}
                onChange={(e) => setFundAId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
              >
                {availableFunds.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.shortName} ({f.category})
                  </option>
                ))}
              </select>
            </div>

            {/* VS Pill */}
            <div className="sm:col-span-1 text-center">
              <span className="inline-block bg-stone-100 border border-stone-300 text-stone-700 font-mono text-xs font-bold px-3 py-1.5 rounded-full">
                VS
              </span>
            </div>

            {/* Fund B Picker */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-stone-600 uppercase tracking-wide mb-1.5">
                Corner B (Fund 2)
              </label>
              <select
                value={fundBId}
                onChange={(e) => setFundBId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
              >
                {availableFunds.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.shortName} ({f.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {customError && (
            <p className="text-xs font-mono text-rose-600 mt-3">{customError}</p>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleLaunchCustomDuel}
              className="w-full sm:w-auto bg-stone-900 hover:bg-black text-white px-6 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Generate Comparison Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            CURATED FLAGSHIP SHOWDOWNS
            ========================================================================= */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Curated Flagship Showdowns
            </h2>
            <p className="text-xs font-mono text-stone-500 mt-0.5">
              In-depth research battlecards for India's most fiercely debated fund pairs
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-stone-900 text-white font-semibold"
                    : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Matchup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredComparisons.map((item) => {
            const { fundA, fundB, executiveVerdict, portfolioOverlap } = item;
            return (
              <div
                key={item.id}
                className="bg-white border border-stone-300 rounded p-5 flex flex-col justify-between hover:border-stone-900 hover:shadow-sm transition-all"
              >
                <div>
                  {/* Category & Overlap Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                      {item.category}
                    </span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                        portfolioOverlap.overlapPercentage > 45
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : portfolioOverlap.overlapPercentage > 30
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>{portfolioOverlap.overlapPercentage}% Overlap</span>
                    </span>
                  </div>

                  {/* Fund Versus Title */}
                  <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug mb-3">
                    {fundA.shortName} <span className="text-stone-400 font-mono text-sm">vs</span> {fundB.shortName}
                  </h3>

                  {/* Quick Stat Comparison Bar */}
                  <div className="bg-stone-50 border border-stone-200 rounded p-3 mb-4 space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center pb-1.5 border-b border-stone-200">
                      <span className="text-stone-500">5Y CAGR:</span>
                      <div className="flex items-center gap-2 font-bold">
                        <span className={fundA.cagr5Y >= fundB.cagr5Y ? "text-emerald-700" : "text-stone-700"}>
                          {fundA.cagr5Y}%
                        </span>
                        <span className="text-stone-400">vs</span>
                        <span className={fundB.cagr5Y > fundA.cagr5Y ? "text-indigo-700" : "text-stone-700"}>
                          {fundB.cagr5Y}%
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pb-1.5 border-b border-stone-200">
                      <span className="text-stone-500">Std Dev (Risk):</span>
                      <div className="flex items-center gap-2">
                        <span>{fundA.standardDeviation}%</span>
                        <span className="text-stone-400">vs</span>
                        <span>{fundB.standardDeviation}%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Direct TER:</span>
                      <div className="flex items-center gap-2">
                        <span>{fundA.expenseRatioDirect}%</span>
                        <span className="text-stone-400">vs</span>
                        <span>{fundB.expenseRatioDirect}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Verdict Snippet */}
                  <div className="text-xs text-stone-600 font-serif leading-relaxed mb-4 line-clamp-3">
                    <strong>Overall Edge:</strong> {executiveVerdict.overallWinner === "A" ? fundA.shortName : fundB.shortName} —{" "}
                    {executiveVerdict.overallSummary}
                  </div>
                </div>

                {/* Open Dossier Button */}
                <button
                  onClick={() => onSelectDuel(item.slug)}
                  className="w-full bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-mono font-medium py-2 rounded border border-stone-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Full Tear Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Educational Why It Matters Section */}
        <section className="bg-stone-100/70 border border-stone-300 rounded p-6 sm:p-8">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 mb-3">
            Why Mutual Fund Duels Beat Generic Blog Posts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-700 font-serif leading-relaxed">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-stone-900 mb-1">
                1. True Overlap Measurement
              </h4>
              <p>
                Holding multiple funds from the same category often gives you false diversification. We calculate the exact mathematical stock overlap between schemes so you never pay double fees on identical holdings.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-stone-900 mb-1">
                2. Risk-Adjusted Reality
              </h4>
              <p>
                Trailing 1-year returns are deceptive in bull runs. Our dossiers analyze standard deviation, beta, and maximum drawdown to show how each scheme survives real bear markets.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-stone-900 mb-1">
                3. Total Fee Drag Impact
              </h4>
              <p>
                A 0.30% difference in expense ratios seems trivial today, but compounds into lakhs of rupees lost over a 15-year SIP. We quantify the exact rupee impact.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
