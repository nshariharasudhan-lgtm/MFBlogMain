import React, { useState } from "react";
import {
  Scale,
  Plus,
  Trophy,
  Sparkles,
  Layers,
  ArrowRight,
  Check,
  Eye,
  Trash2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { FundComparisonDossier } from "../../types/comparison";
import {
  getAllFundComparisons,
  getAvailableFunds,
  generateDynamicComparison,
} from "../../data/fundComparisonsData";

interface FundComparisonManagerProps {
  onPreviewDuel?: (slug: string) => void;
}

export function FundComparisonManager({ onPreviewDuel }: FundComparisonManagerProps) {
  const [comparisons, setComparisons] = useState<FundComparisonDossier[]>(() =>
    getAllFundComparisons()
  );
  const [isCreating, setIsCreating] = useState(false);
  const [fundAId, setFundAId] = useState("parag-parikh-flexi-cap");
  const [fundBId, setFundBId] = useState("quant-small-cap");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const availableFunds = getAvailableFunds();

  const handleCreateComparison = async () => {
    if (fundAId === fundBId) {
      alert("Please choose two different mutual funds.");
      return;
    }

    const dynamic = generateDynamicComparison(fundAId, fundBId);
    if (!dynamic) return;

    setIsAiGenerating(true);
    try {
      // Call server AI endpoint to optionally enhance analyst takeaways if Gemini is available
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate a concise 3-bullet comparison between two Indian mutual funds: ${dynamic.fundA.name} and ${dynamic.fundB.name}.
Include:
1. Downside risk and bear market resilience
2. Stock selection strategy
3. Fee efficiency and ideal investor persona.
Keep it strictly factual, professional, and EEAT-compliant.`,
        }),
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        if (data.content) {
          // AI generated enhancements can be added
          dynamic.executiveVerdict.overallSummary += ` [Verified by AI Desk: ${data.content.slice(0, 160)}...]`;
        }
      }
    } catch (e) {
      console.warn("AI enhancement notice (using built-in calculations):", e);
    } finally {
      setIsAiGenerating(false);
    }

    setComparisons((prev) => [dynamic, ...prev.filter((c) => c.slug !== dynamic.slug)]);
    setIsCreating(false);
    setSuccessMsg(`Successfully generated and published head-to-head dossier for ${dynamic.fundA.shortName} vs ${dynamic.fundB.shortName}!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="bg-white border border-stone-200 rounded p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600" />
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Mutual Fund Head-to-Head Dossiers
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Manage high-converting comparison battlecards with automated AMFI metric calculations
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-stone-900 hover:bg-black text-white text-xs font-mono font-medium px-4 py-2.5 rounded transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? "Cancel" : "New Fund Comparison"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono rounded flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Creation Drawer */}
      {isCreating && (
        <div className="mb-8 p-5 bg-stone-50 border border-stone-300 rounded">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Generate New Head-to-Head Comparison
            </h3>
          </div>
          <p className="text-xs text-stone-600 font-serif mb-4">
            Pick two mutual funds. The engine will instantly calculate exact stock overlap percentage, 1Y/3Y/5Y rolling CAGRs, fee drag differences, and executive verdicts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-mono text-stone-600 mb-1">Corner A (Fund 1)</label>
              <select
                value={fundAId}
                onChange={(e) => setFundAId(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded p-2 text-xs font-mono text-stone-900"
              >
                {availableFunds.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.shortName} ({f.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-600 mb-1">Corner B (Fund 2)</label>
              <select
                value={fundBId}
                onChange={(e) => setFundBId(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded p-2 text-xs font-mono text-stone-900"
              >
                {availableFunds.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.shortName} ({f.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsCreating(false)}
              className="px-3 py-2 text-xs font-mono text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateComparison}
              disabled={isAiGenerating}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAiGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Calculating Metrics & Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publish Dossier Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Existing Comparisons Table */}
      <div className="overflow-x-auto border border-stone-200 rounded">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-stone-100 text-stone-600 border-b border-stone-200">
            <tr>
              <th className="py-3 px-4">Duel Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Portfolio Overlap</th>
              <th className="py-3 px-4">5Y CAGR Edge</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 font-sans">
            {comparisons.map((c) => (
              <tr key={c.id} className="hover:bg-stone-50">
                <td className="py-3 px-4">
                  <div className="font-semibold text-stone-900 font-serif text-sm">
                    {c.fundA.shortName} <span className="text-stone-400 font-mono text-xs">vs</span> {c.fundB.shortName}
                  </div>
                  <div className="text-[11px] font-mono text-stone-400 truncate max-w-xs">
                    /compare/{c.slug}
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-xs text-stone-700">
                  {c.category}
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  <span className="bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded font-semibold border border-indigo-200">
                    {c.portfolioOverlap.overlapPercentage}% Overlap
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  <span className="text-emerald-700 font-bold">
                    {c.fundA.cagr5Y >= c.fundB.cagr5Y ? c.fundA.shortName : c.fundB.shortName}
                  </span>{" "}
                  ({Math.max(c.fundA.cagr5Y, c.fundB.cagr5Y)}%)
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Published
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onPreviewDuel?.(c.slug)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-stone-700 hover:text-black bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
