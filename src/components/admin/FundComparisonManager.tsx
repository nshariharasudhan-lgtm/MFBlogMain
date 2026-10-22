import React, { useState } from "react";
import {
  Scale,
  Plus,
  Shield,
  Layers,
  Check,
  Eye,
  Trash2,
  RefreshCw,
  FileText,
  Calendar,
  Edit,
} from "lucide-react";
import { ManualFundComparisonItem } from "../../types/fundComparison";
import {
  getFundComparisonItems,
  saveFundComparisonItem,
  deleteFundComparisonItem,
  resetFundComparisonItems,
} from "../../lib/fundComparisonStore";
import { ManualFundComparisonForm } from "./ManualFundComparisonForm";

interface FundComparisonManagerProps {
  onPreviewDuel?: (slug: string) => void;
}

export function FundComparisonManager({ onPreviewDuel }: FundComparisonManagerProps) {
  const [items, setItems] = useState<ManualFundComparisonItem[]>(() => getFundComparisonItems());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ManualFundComparisonItem | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSave = (item: ManualFundComparisonItem) => {
    saveFundComparisonItem(item);
    setItems(getFundComparisonItems());
    setIsFormOpen(false);
    setEditingItem(null);
    setSuccessMsg(`Successfully saved and published data for ${item.scheme} (${item.plan})!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the fund data for ${name}?`)) {
      deleteFundComparisonItem(id);
      setItems(getFundComparisonItems());
      setSuccessMsg(`Deleted ${name}.`);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  const handleResetToSeeds = () => {
    if (confirm("Reset to default verified AMC factsheet data?")) {
      resetFundComparisonItems();
      setItems(getFundComparisonItems());
      setSuccessMsg("Reset to verified seed factsheet dataset.");
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-700" />
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Mutual Fund Comparison Tables Manager
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Manual verified data entry only. Hard requirement: Source Document, Source Date, and "Data as on" date. Zero AI generation.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetToSeeds}
            className="border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-mono px-3 py-2 rounded transition-colors flex items-center gap-1 cursor-pointer"
            title="Reset to default seed data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingItem(null);
              setIsFormOpen(true);
            }}
            className="bg-stone-900 hover:bg-black text-white text-xs font-mono font-medium px-4 py-2.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Fund Data</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Manual Data Verification Policy Notice */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs space-y-1 font-sans">
        <div className="flex items-center gap-2 font-bold font-mono">
          <Shield className="w-4 h-4 text-amber-700" />
          <span>Statutory Compliance Policy (Section 4 Compliance)</span>
        </div>
        <p className="text-stone-700 leading-relaxed">
          All numbers published to the public Fund Comparison table must be entered manually from official AMC monthly factsheets or SEBI regulatory filings. Publishing is permanently blocked if the official source document name or the "as on" reporting date is missing.
        </p>
      </div>

      {/* Fund Data List Table */}
      <div className="overflow-x-auto border border-stone-200 rounded-xl">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-stone-100/80 text-stone-700 font-mono uppercase text-[11px] border-b border-stone-200">
            <tr>
              <th className="py-3 px-4 font-semibold">Scheme &amp; Plan</th>
              <th className="py-3 px-3 font-semibold">Category</th>
              <th className="py-3 px-3 font-semibold">NAV (₹)</th>
              <th className="py-3 px-3 font-semibold">1Y CAGR</th>
              <th className="py-3 px-3 font-semibold">3Y CAGR</th>
              <th className="py-3 px-3 font-semibold">5Y CAGR</th>
              <th className="py-3 px-3 font-semibold">TER (%)</th>
              <th className="py-3 px-3 font-semibold">AUM (₹ Cr)</th>
              <th className="py-3 px-3 font-semibold">Source &amp; As On Date</th>
              <th className="py-3 px-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 font-mono text-stone-800">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                <td className="py-3.5 px-4 font-sans font-medium text-stone-900">
                  <div className="flex items-center gap-1.5">
                    <span>{item.scheme}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        item.plan === "Direct"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.plan}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                    Benchmark: {item.benchmark}
                  </div>
                </td>
                <td className="py-3.5 px-3 font-sans text-stone-600">
                  {item.category}
                </td>
                <td className="py-3.5 px-3 font-semibold">
                  ₹{item.nav.toFixed(2)}
                </td>
                <td className="py-3.5 px-3">
                  <span className={item.cagr1Y >= 0 ? "text-emerald-700" : "text-red-600"}>
                    {item.cagr1Y > 0 ? "+" : ""}{item.cagr1Y.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className={item.cagr3Y >= 0 ? "text-emerald-700" : "text-red-600"}>
                    {item.cagr3Y > 0 ? "+" : ""}{item.cagr3Y.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className={item.cagr5Y >= 0 ? "text-emerald-700" : "text-red-600"}>
                    {item.cagr5Y > 0 ? "+" : ""}{item.cagr5Y.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  {item.ter.toFixed(2)}%
                </td>
                <td className="py-3.5 px-3">
                  ₹{item.aum.toLocaleString("en-IN")}
                </td>
                <td className="py-3.5 px-3 text-[11px] text-stone-600 font-sans">
                  <div className="font-medium text-stone-800">{item.sourceDocument} ({item.sourceDate})</div>
                  <div className="text-stone-500 text-[10px] font-mono">As on: {item.navDate}</div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(item);
                        setIsFormOpen(true);
                      }}
                      className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded cursor-pointer transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.scheme)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ManualFundComparisonForm
          initialItem={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}
