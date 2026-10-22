import React, { useState } from "react";
import { AlertCircle, Check, X, Shield, FileText, Calendar, DollarSign } from "lucide-react";
import { ManualFundComparisonItem, validateFundComparisonItem } from "../../types/fundComparison";
import { formatDateDDMonYYYY } from "../../lib/dateUtils";

interface ManualFundComparisonFormProps {
  initialItem?: ManualFundComparisonItem | null;
  onSave: (item: ManualFundComparisonItem) => void;
  onCancel: () => void;
}

export function ManualFundComparisonForm({
  initialItem,
  onSave,
  onCancel,
}: ManualFundComparisonFormProps) {
  const [scheme, setScheme] = useState(initialItem?.scheme || "");
  const [plan, setPlan] = useState<"Direct" | "Regular">(initialItem?.plan || "Direct");
  const [category, setCategory] = useState(initialItem?.category || "Flexi Cap");
  const [nav, setNav] = useState<string>(initialItem?.nav !== undefined ? String(initialItem.nav) : "");
  const [navDate, setNavDate] = useState(initialItem?.navDate || "30 Sep 2026");
  const [cagr1Y, setCagr1Y] = useState<string>(initialItem?.cagr1Y !== undefined ? String(initialItem.cagr1Y) : "");
  const [cagr3Y, setCagr3Y] = useState<string>(initialItem?.cagr3Y !== undefined ? String(initialItem.cagr3Y) : "");
  const [cagr5Y, setCagr5Y] = useState<string>(initialItem?.cagr5Y !== undefined ? String(initialItem.cagr5Y) : "");
  const [cagr10Y, setCagr10Y] = useState<string>(initialItem?.cagr10Y !== undefined && initialItem.cagr10Y !== null ? String(initialItem.cagr10Y) : "");
  const [ter, setTer] = useState<string>(initialItem?.ter !== undefined ? String(initialItem.ter) : "");
  const [aum, setAum] = useState<string>(initialItem?.aum !== undefined ? String(initialItem.aum) : "");
  const [benchmark, setBenchmark] = useState(initialItem?.benchmark || "Nifty 500 TRI");
  const [sourceDocument, setSourceDocument] = useState(initialItem?.sourceDocument || "");
  const [sourceDate, setSourceDate] = useState(initialItem?.sourceDate || "Sep 2026");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const draftItem: Partial<ManualFundComparisonItem> = {
      scheme: scheme.trim(),
      plan,
      category: category.trim(),
      nav: nav ? parseFloat(nav) : 0,
      navDate: navDate.trim(),
      cagr1Y: cagr1Y ? parseFloat(cagr1Y) : 0,
      cagr3Y: cagr3Y ? parseFloat(cagr3Y) : 0,
      cagr5Y: cagr5Y ? parseFloat(cagr5Y) : 0,
      cagr10Y: cagr10Y ? parseFloat(cagr10Y) : null,
      ter: ter ? parseFloat(ter) : 0,
      aum: aum ? parseFloat(aum) : 0,
      benchmark: benchmark.trim(),
      sourceDocument: sourceDocument.trim(),
      sourceDate: sourceDate.trim(),
    };

    const validation = validateFundComparisonItem(draftItem);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const finalItem: ManualFundComparisonItem = {
      id: initialItem?.id || `fc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      scheme: draftItem.scheme!,
      plan: draftItem.plan!,
      category: draftItem.category!,
      nav: draftItem.nav!,
      navDate: formatDateDDMonYYYY(draftItem.navDate!),
      cagr1Y: draftItem.cagr1Y!,
      cagr3Y: draftItem.cagr3Y!,
      cagr5Y: draftItem.cagr5Y!,
      cagr10Y: draftItem.cagr10Y,
      ter: draftItem.ter!,
      aum: draftItem.aum!,
      benchmark: draftItem.benchmark!,
      sourceDocument: draftItem.sourceDocument!,
      sourceDate: draftItem.sourceDate!,
      publishedAt: initialItem?.publishedAt || formatDateDDMonYYYY(new Date()),
      dateModified: formatDateDDMonYYYY(new Date()),
    };

    onSave(finalItem);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-xs font-mono font-medium mb-1">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Manual Verified Entry (No AI Numbers)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
              {initialItem ? "Edit Fund Comparison Entry" : "Add Mutual Fund Comparison Entry"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-stone-400 hover:text-stone-600 p-2 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Publishing Blocked – Missing Required Verification Fields</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Scheme Name & Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold">
                Scheme Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={scheme}
                onChange={(e) => setScheme(e.target.value)}
                placeholder="e.g. Parag Parikh Flexi Cap Fund"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-stone-900 focus:outline-hidden"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold">
                Plan Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlan("Direct")}
                  className={`py-2 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                    plan === "Direct"
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  Direct
                </button>
                <button
                  type="button"
                  onClick={() => setPlan("Regular")}
                  className={`py-2 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                    plan === "Regular"
                      ? "bg-amber-700 text-white border-amber-700"
                      : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  Regular
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Category & Benchmark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-stone-900 focus:outline-hidden bg-white"
              >
                <option value="Flexi Cap">Flexi Cap</option>
                <option value="Large Cap">Large Cap</option>
                <option value="Mid Cap">Mid Cap</option>
                <option value="Small Cap">Small Cap</option>
                <option value="Large & Mid Cap">Large &amp; Mid Cap</option>
                <option value="Index Funds">Index Funds</option>
                <option value="ELSS / Tax Saver">ELSS / Tax Saver</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Debt">Debt</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold">
                Benchmark Index <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={benchmark}
                onChange={(e) => setBenchmark(e.target.value)}
                placeholder="e.g. Nifty 500 TRI"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-stone-900 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Row 3: NAV, NAV Date, TER, AUM */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 font-bold">
                NAV (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.0001"
                value={nav}
                onChange={(e) => setNav(e.target.value)}
                placeholder="84.52"
                className="w-full px-3 py-2 rounded border border-stone-300 text-sm font-mono focus:border-stone-900 focus:outline-hidden bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 font-bold">
                NAV Date (DD Mon YYYY) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={navDate}
                onChange={(e) => setNavDate(e.target.value)}
                placeholder="30 Sep 2026"
                className="w-full px-3 py-2 rounded border border-stone-300 text-sm font-mono focus:border-stone-900 focus:outline-hidden bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 font-bold">
                TER (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={ter}
                onChange={(e) => setTer(e.target.value)}
                placeholder="0.62"
                className="w-full px-3 py-2 rounded border border-stone-300 text-sm font-mono focus:border-stone-900 focus:outline-hidden bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 font-bold">
                AUM (₹ Cr) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="1"
                value={aum}
                onChange={(e) => setAum(e.target.value)}
                placeholder="72450"
                className="w-full px-3 py-2 rounded border border-stone-300 text-sm font-mono focus:border-stone-900 focus:outline-hidden bg-white"
                required
              />
            </div>
          </div>

          {/* Row 4: CAGR Returns (1Y, 3Y, 5Y, 10Y) */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold">
              CAGR Performance (%) <span className="text-stone-400 font-normal">(Annualized)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-stone-500">1Y CAGR (%) *</span>
                <input
                  type="number"
                  step="0.01"
                  value={cagr1Y}
                  onChange={(e) => setCagr1Y(e.target.value)}
                  placeholder="18.2"
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm font-mono focus:border-stone-900 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-stone-500">3Y CAGR (%) *</span>
                <input
                  type="number"
                  step="0.01"
                  value={cagr3Y}
                  onChange={(e) => setCagr3Y(e.target.value)}
                  placeholder="21.4"
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm font-mono focus:border-stone-900 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-stone-500">5Y CAGR (%) *</span>
                <input
                  type="number"
                  step="0.01"
                  value={cagr5Y}
                  onChange={(e) => setCagr5Y(e.target.value)}
                  placeholder="24.1"
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm font-mono focus:border-stone-900 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-stone-500">10Y CAGR (%) (Optional)</span>
                <input
                  type="number"
                  step="0.01"
                  value={cagr10Y}
                  onChange={(e) => setCagr10Y(e.target.value)}
                  placeholder="19.8"
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm font-mono focus:border-stone-900 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Source Document & Source Date (Required to publish) */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-900">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>Mandatory Statutory Source Disclosure (Prevents Unverified Data)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                  Source Document <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={sourceDocument}
                  onChange={(e) => setSourceDocument(e.target.value)}
                  placeholder="e.g. PPFAS AMC Monthly Factsheet"
                  className="w-full px-3 py-2 rounded border border-amber-300 text-sm focus:border-amber-900 focus:outline-hidden bg-white"
                  required
                />
                <span className="text-[10px] text-amber-700 block">Must specify official AMC factsheet or disclosure.</span>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                  Source Date / Month <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={sourceDate}
                  onChange={(e) => setSourceDate(e.target.value)}
                  placeholder="e.g. Sep 2026"
                  className="w-full px-3 py-2 rounded border border-amber-300 text-sm focus:border-amber-900 focus:outline-hidden bg-white"
                  required
                />
                <span className="text-[10px] text-amber-700 block">Month and year of the published factsheet.</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-mono font-medium hover:bg-stone-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-mono font-semibold tracking-wide transition-all shadow-sm cursor-pointer inline-flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Save &amp; Publish Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
