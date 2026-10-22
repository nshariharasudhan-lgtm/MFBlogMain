import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  FileText,
  Calendar,
  CheckSquare,
  Square,
  Scale,
  Shield,
  Info,
  ExternalLink,
} from "lucide-react";
import { ManualFundComparisonItem } from "../../types/fundComparison";
import { getFundComparisonItems } from "../../lib/fundComparisonStore";

interface FundComparisonTableViewProps {
  initialCategory?: string;
  onOpenCalculator?: (calcUrl: string) => void;
}

type SortField = "scheme" | "category" | "nav" | "cagr1Y" | "cagr3Y" | "cagr5Y" | "cagr10Y" | "ter" | "aum";
type SortDirection = "asc" | "desc";

export function FundComparisonTableView({
  initialCategory = "all",
  onOpenCalculator,
}: FundComparisonTableViewProps) {
  const [items] = useState<ManualFundComparisonItem[]>(() => getFundComparisonItems());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [planFilter, setPlanFilter] = useState<"all" | "Direct" | "Regular">("Direct");
  const [sortField, setSortField] = useState<SortField>("scheme");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => set.add(item.category));
    return ["all", ...Array.from(set)];
  }, [items]);

  // Filtering & Sorting (strictly neutral, non-ranked)
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (planFilter !== "all") {
      result = result.filter((item) => item.plan === planFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.scheme.toLowerCase().includes(q) ||
          item.benchmark.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.sourceDocument.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === "string" && typeof valB === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      const numA = Number(valA);
      const numB = Number(valB);
      return sortDirection === "asc" ? numA - numB : numB - numA;
    });

    return result;
  }, [items, selectedCategory, planFilter, searchQuery, sortField, sortDirection]);

  // Toggle selection for side-by-side comparison
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const selectedFunds = useMemo(() => {
    return items.filter((item) => selectedIds.includes(item.id));
  }, [items, selectedIds]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection(field === "scheme" || field === "category" ? "asc" : "desc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-stone-100/90 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-800">
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>Official AMC Factsheet Data · Verified Manual Entry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            Mutual Fund Scheme Comparison Table
          </h2>
          <p className="text-xs text-stone-600 max-w-2xl">
            Neutral, non-ranked side-by-side metrics extracted from official AMC monthly factsheets. Sort any column to inspect historical performance, expense ratios, and asset bases.
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[11px] font-mono text-stone-500">Benchmark Reporting Standard</div>
          <div className="text-xs font-semibold text-stone-800">AMFI Categorization &amp; SEBI Mandates</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-sans">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme name, category, or benchmark..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-hidden focus:border-stone-400 transition-colors"
          />
        </div>

        {/* Plan & Category Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Plan filter */}
          <div className="inline-flex p-0.5 rounded-lg border border-stone-200 bg-stone-100 text-xs font-mono">
            <button
              onClick={() => setPlanFilter("Direct")}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                planFilter === "Direct"
                  ? "bg-white text-stone-900 font-semibold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Direct Plans
            </button>
            <button
              onClick={() => setPlanFilter("Regular")}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                planFilter === "Regular"
                  ? "bg-white text-stone-900 font-semibold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Regular
            </button>
            <button
              onClick={() => setPlanFilter("all")}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                planFilter === "all"
                  ? "bg-white text-stone-900 font-semibold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              All
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs font-sans text-stone-800 focus:outline-hidden"
          >
            <option value="all">All Categories</option>
            {categories
              .filter((c) => c !== "all")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Pin Bar (if 2+ funds selected) */}
      {selectedFunds.length >= 2 && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 font-sans space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold font-mono text-emerald-900 uppercase">
                Side-by-Side Comparison ({selectedFunds.length} Funds Selected)
              </span>
            </div>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-emerald-700 hover:underline cursor-pointer font-mono"
            >
              Clear Selection
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {selectedFunds.map((fund) => (
              <div
                key={fund.id}
                className="p-3 bg-white rounded-lg border border-emerald-200 shadow-xs space-y-2 text-xs"
              >
                <div className="font-bold text-stone-900 truncate" title={fund.scheme}>
                  {fund.scheme}
                </div>
                <div className="text-[11px] font-mono text-emerald-800 font-medium">
                  {fund.plan} · {fund.category}
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono pt-1 border-t border-stone-100">
                  <span className="text-stone-500">NAV:</span>
                  <span className="font-semibold text-right">₹{fund.nav.toFixed(2)}</span>
                  <span className="text-stone-500">TER:</span>
                  <span className="font-semibold text-right">{fund.ter.toFixed(2)}%</span>
                  <span className="text-stone-500">3Y CAGR:</span>
                  <span className="font-semibold text-right text-emerald-700">+{fund.cagr3Y.toFixed(1)}%</span>
                  <span className="text-stone-500">5Y CAGR:</span>
                  <span className="font-semibold text-right text-emerald-700">+{fund.cagr5Y.toFixed(1)}%</span>
                  <span className="text-stone-500">10Y CAGR:</span>
                  <span className="font-semibold text-right text-emerald-700">
                    {fund.cagr10Y !== undefined && fund.cagr10Y !== null ? `+${fund.cagr10Y.toFixed(1)}%` : "—"}
                  </span>
                  <span className="text-stone-500">AUM:</span>
                  <span className="font-semibold text-right">₹{fund.aum.toLocaleString("en-IN")} Cr</span>
                </div>
                <div className="text-[10px] text-stone-500 pt-1 border-t border-stone-100 font-sans">
                  Source: {fund.sourceDocument} ({fund.sourceDate})<br />
                  Data as on {fund.navDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Neutral Comparison Table */}
      <div className="overflow-x-auto border border-stone-200 rounded-xl bg-white shadow-xs">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-stone-50 text-stone-700 font-mono uppercase text-[11px] border-b border-stone-200 select-none">
            <tr>
              <th className="py-3 px-3 w-10 text-center">Compare</th>
              <th
                onClick={() => handleSort("scheme")}
                className="py-3 px-4 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>Scheme &amp; Plan</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("category")}
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>Category</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("nav")}
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>NAV (₹)</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("cagr1Y")}
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>1Y CAGR</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("cagr3Y")}
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>3Y CAGR</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("cagr5Y")}
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>5Y CAGR</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("cagr10Y")}
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>10Y CAGR</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("ter")}
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>TER (%)</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("aum")}
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-stone-100"
              >
                <div className="flex items-center gap-1.5">
                  <span>AUM (₹ Cr)</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="py-3 px-4 font-semibold text-stone-600">
                Mandatory Source &amp; As On Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 font-mono text-stone-800">
            {filteredAndSortedItems.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-8 text-center text-stone-500 font-sans">
                  No schemes match your filter. Try adjusting your search query or category.
                </td>
              </tr>
            ) : (
              filteredAndSortedItems.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-stone-50/80 transition-colors ${
                      isSelected ? "bg-emerald-50/40" : ""
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => toggleSelect(item.id)}
                        className="text-stone-400 hover:text-emerald-700 cursor-pointer"
                        title="Select for side-by-side comparison"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-300" />
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 font-sans font-medium text-stone-900">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{item.scheme}</span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
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

                    <td className="py-3.5 px-3 font-sans text-stone-600 text-xs">
                      {item.category}
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-stone-900">
                      ₹{item.nav.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={item.cagr1Y >= 0 ? "text-emerald-700 font-medium" : "text-red-600 font-medium"}>
                        {item.cagr1Y > 0 ? "+" : ""}{item.cagr1Y.toFixed(1)}%
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={item.cagr3Y >= 0 ? "text-emerald-700 font-medium" : "text-red-600 font-medium"}>
                        {item.cagr3Y > 0 ? "+" : ""}{item.cagr3Y.toFixed(1)}%
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={item.cagr5Y >= 0 ? "text-emerald-700 font-medium" : "text-red-600 font-medium"}>
                        {item.cagr5Y > 0 ? "+" : ""}{item.cagr5Y.toFixed(1)}%
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      {item.cagr10Y !== undefined && item.cagr10Y !== null ? (
                        <span className={item.cagr10Y >= 0 ? "text-emerald-700 font-medium" : "text-red-600 font-medium"}>
                          {item.cagr10Y > 0 ? "+" : ""}{item.cagr10Y.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-stone-400 font-sans">N/A (&lt;10Y)</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3">
                      {item.ter.toFixed(2)}%
                    </td>

                    <td className="py-3.5 px-3">
                      ₹{item.aum.toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4 font-sans text-xs">
                      <div className="font-medium text-stone-800">
                        Source: {item.sourceDocument}, {item.sourceDate}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        Data as on {item.navDate}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Statutory Regulatory Disclaimer */}
      <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 font-sans space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-stone-800 font-mono">
          <Info className="w-3.5 h-3.5 text-stone-500" />
          <span>Statutory Regulatory Notice &amp; Compliance Policy</span>
        </div>
        <p className="leading-relaxed">
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. This table provides factual historical metrics and data tools for educational purposes only and does not constitute an investment recommendation or financial advice. All data points are compiled directly from published AMC monthly factsheets.
        </p>
      </div>
    </div>
  );
}
