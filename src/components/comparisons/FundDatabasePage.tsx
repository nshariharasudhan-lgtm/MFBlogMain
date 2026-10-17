import React, { useState, useEffect, useMemo } from "react";
import {
  Database,
  RefreshCw,
  Search,
  Filter,
  Check,
  AlertCircle,
  ExternalLink,
  Scale,
  ArrowRight,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  ChevronRight,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import {
  AMFIFundRecord,
  fetchAmfiRealtimeFunds,
  syncAmfiDataToSupabase,
  getStoredAmfiFunds,
  getLastAmfiSyncTime,
  fetchFundWithReturns,
} from "../../lib/amfiService";
import { getSupabaseClient } from "../../lib/supabaseClient";

interface FundDatabasePageProps {
  onNavigateHome?: () => void;
  onNavigateCompare?: () => void;
  onLaunchDuel?: (fundAId: string, fundBId: string) => void;
}

export function FundDatabasePage({
  onNavigateHome,
  onNavigateCompare,
  onLaunchDuel,
}: FundDatabasePageProps) {
  const [funds, setFunds] = useState<AMFIFundRecord[]>(() => getStoredAmfiFunds());
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    message: string;
    type: "success" | "warning" | "error";
  } | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(getLastAmfiSyncTime());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFundHouse, setSelectedFundHouse] = useState("all");
  const [planFilter, setPlanFilter] = useState<"all" | "direct" | "regular">("direct");
  const [optionFilter, setOptionFilter] = useState<"all" | "growth" | "idcw">("growth");

  // Selected for Comparison Duel
  const [selectedForDuel, setSelectedForDuel] = useState<AMFIFundRecord[]>([]);

  // Detailed Fund Drawer Modal
  const [inspectedFund, setInspectedFund] = useState<AMFIFundRecord | null>(null);
  const [inspectLoading, setInspectLoading] = useState(false);

  const isSupabaseConfigured = Boolean(getSupabaseClient());

  // Fetch fresh funds on component mount
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const fetched = await fetchAmfiRealtimeFunds({ limit: 400 });
        if (mounted && fetched.length > 0) {
          setFunds(fetched);
          setLastSync(getLastAmfiSyncTime());
        }
      } catch (err) {
        console.warn("FundDatabasePage initial load notice:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Handle Sync to AMFI & Supabase
  const handleSyncData = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      // 1. Fetch fresh real-time data from AMFI
      const freshFunds = await fetchAmfiRealtimeFunds({ limit: 500 });
      // 2. Ingest into Supabase (and local storage)
      const result = await syncAmfiDataToSupabase(freshFunds);

      setFunds(freshFunds);
      setLastSync(result.syncedAt);
      setSyncStatus({
        message: result.message,
        type: result.mode === "supabase" ? "success" : "warning",
      });
    } catch (err: any) {
      setSyncStatus({
        message: `Sync failed: ${err?.message || "Check network connection"}`,
        type: "error",
      });
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatus(null), 8000);
    }
  };

  // Inspect scheme with historical returns
  const handleInspectScheme = async (fund: AMFIFundRecord) => {
    setInspectedFund(fund);
    setInspectLoading(true);
    try {
      const detailed = await fetchFundWithReturns(fund.schemeCode);
      if (detailed) {
        setInspectedFund(detailed);
      }
    } catch (err) {
      console.warn("Historical returns inspect notice:", err);
    } finally {
      setInspectLoading(false);
    }
  };

  // Filter Categories & Fund Houses for Dropdowns
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    funds.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set).sort();
  }, [funds]);

  const fundHousesList = useMemo(() => {
    const set = new Set<string>();
    funds.forEach((f) => {
      if (f.fundHouse) set.add(f.fundHouse);
    });
    return Array.from(set).sort();
  }, [funds]);

  // Filtered List
  const filteredFunds = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return funds.filter((f) => {
      if (q) {
        const matchName = f.schemeName.toLowerCase().includes(q);
        const matchCode = f.schemeCode.includes(q);
        const matchIsin = f.isinGrowth?.toLowerCase().includes(q) || f.isinDivPayout?.toLowerCase().includes(q);
        const matchHouse = f.fundHouse.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchIsin && !matchHouse) return false;
      }

      if (selectedCategory !== "all" && f.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      if (selectedFundHouse !== "all" && f.fundHouse.toLowerCase() !== selectedFundHouse.toLowerCase()) {
        return false;
      }

      if (planFilter === "direct" && !f.isDirect) return false;
      if (planFilter === "regular" && f.isDirect) return false;

      if (optionFilter === "growth" && !f.isGrowth) return false;
      if (optionFilter === "idcw" && f.isGrowth) return false;

      return true;
    });
  }, [funds, searchQuery, selectedCategory, selectedFundHouse, planFilter, optionFilter]);

  // Toggle Selection for Head-to-Head Duel
  const toggleSelectForDuel = (fund: AMFIFundRecord) => {
    if (selectedForDuel.some((s) => s.schemeCode === fund.schemeCode)) {
      setSelectedForDuel((prev) => prev.filter((s) => s.schemeCode !== fund.schemeCode));
    } else {
      if (selectedForDuel.length >= 2) {
        setSelectedForDuel([selectedForDuel[1], fund]);
      } else {
        setSelectedForDuel((prev) => [...prev, fund]);
      }
    }
  };

  // Export Filtered Table to CSV
  const handleExportCSV = () => {
    const headers = ["Scheme Code", "Scheme Name", "Fund House", "Category", "NAV", "NAV Date", "Plan", "Option", "ISIN Growth"];
    const rows = filteredFunds.map((f) => [
      f.schemeCode,
      `"${f.schemeName.replace(/"/g, '""')}"`,
      `"${f.fundHouse.replace(/"/g, '""')}"`,
      `"${f.category}"`,
      f.nav,
      f.navDate,
      f.isDirect ? "Direct" : "Regular",
      f.isGrowth ? "Growth" : "IDCW",
      f.isinGrowth || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AMFI_Funds_YieldNest_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E1E1E] pb-28">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-stone-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={onNavigateCompare}
            className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Fund Comparisons</span>
          </button>
          <span>/</span>
          <span className="text-stone-800 font-medium">AMFI Live Fund Database</span>
        </nav>

        {/* Top Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider bg-stone-900 text-white px-2.5 py-1 rounded font-semibold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                Live Ingestion Engine
              </span>
              <span className="text-xs font-mono text-stone-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {lastSync ? `Last Sync: ${new Date(lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Real-time AMFI Feed"}
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                  isSupabaseConfigured
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-amber-50 text-amber-800 border-amber-300"
                }`}
              >
                {isSupabaseConfigured ? "Supabase Connected" : "Local Storage Active"}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 leading-[1.15]">
              AMFI Mutual Fund Registry & Metadata Database
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed mt-1 max-w-2xl">
              Query official real-time daily NAVs, ISIN codes, and categorization directly from AMFI disclosures. Synchronize records with your Supabase database in one click.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 text-xs font-mono font-medium px-3.5 py-2 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Export current filtered view to CSV file"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleSyncData}
              disabled={isSyncing}
              className="bg-stone-900 hover:bg-black text-white text-xs font-mono font-semibold px-4 py-2 rounded transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-emerald-400" : ""}`} />
              <span>{isSyncing ? "Syncing AMFI & Supabase..." : "Sync with AMFI & Supabase"}</span>
            </button>
          </div>
        </div>

        {/* Sync Status Banner */}
        {syncStatus && (
          <div
            className={`mb-6 p-3.5 rounded text-xs font-mono flex items-start gap-2.5 border ${
              syncStatus.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                : syncStatus.type === "warning"
                ? "bg-amber-50 text-amber-900 border-amber-300"
                : "bg-rose-50 text-rose-900 border-rose-300"
            }`}
          >
            {syncStatus.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <span className="font-semibold block mb-0.5">Database Ingestion Notice</span>
              <span>{syncStatus.message}</span>
            </div>
            <button
              onClick={() => setSyncStatus(null)}
              className="text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Search & Multi-Filter Control Console */}
        <div className="bg-white border border-stone-300 rounded p-4 sm:p-5 mb-6 shadow-xs space-y-4">
          {/* Top Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scheme name, AMFI scheme code (e.g. 122639), ISIN (e.g. INF879O01019), or AMC..."
              className="w-full pl-10 pr-24 py-2.5 bg-stone-50 border border-stone-300 rounded text-xs font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-mono text-stone-500 uppercase tracking-wide mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800 font-mono focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
              >
                <option value="all">All Scheme Categories ({categoriesList.length})</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Fund House Filter */}
            <div>
              <label className="block text-[11px] font-mono text-stone-500 uppercase tracking-wide mb-1">
                Fund House (AMC)
              </label>
              <select
                value={selectedFundHouse}
                onChange={(e) => setSelectedFundHouse(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800 font-mono focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
              >
                <option value="all">All AMCs ({fundHousesList.length})</option>
                {fundHousesList.map((fh) => (
                  <option key={fh} value={fh}>
                    {fh}
                  </option>
                ))}
              </select>
            </div>

            {/* Plan Filter */}
            <div>
              <label className="block text-[11px] font-mono text-stone-500 uppercase tracking-wide mb-1">
                Plan Type
              </label>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800 font-mono focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
              >
                <option value="all">All Plans</option>
                <option value="direct">Direct Plan Only (Zero Commission)</option>
                <option value="regular">Regular Plan Only (Distributor)</option>
              </select>
            </div>

            {/* Option Filter */}
            <div>
              <label className="block text-[11px] font-mono text-stone-500 uppercase tracking-wide mb-1">
                Dividend / Growth
              </label>
              <select
                value={optionFilter}
                onChange={(e) => setOptionFilter(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800 font-mono focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
              >
                <option value="all">All Options</option>
                <option value="growth">Growth Option (Compounding)</option>
                <option value="idcw">IDCW (Dividend Payout / Reinvestment)</option>
              </select>
            </div>
          </div>

          {/* Quick Metrics & Results Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200 text-xs font-mono text-stone-500">
            <div>
              Showing <strong>{filteredFunds.length}</strong> matching schemes out of{" "}
              <strong>{funds.length}</strong> total in database
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>AMFI Daily NAV Live Pipeline</span>
            </div>
          </div>
        </div>

        {/* Database Table */}
        <div className="bg-white border border-stone-300 rounded overflow-hidden shadow-xs mb-10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead className="bg-stone-100 text-stone-600 border-b border-stone-300 font-semibold">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">Duel</th>
                  <th className="py-3 px-4">Scheme Name & Code</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Fund House</th>
                  <th className="py-3 px-3 text-right">Latest NAV</th>
                  <th className="py-3 px-3">NAV Date</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-500 font-mono">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-stone-400" />
                      Loading real-time AMFI mutual fund records...
                    </td>
                  </tr>
                ) : filteredFunds.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-500 font-serif">
                      No mutual funds found matching your search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredFunds.map((fund) => {
                    const isSelected = selectedForDuel.some((s) => s.schemeCode === fund.schemeCode);
                    return (
                      <tr
                        key={fund.schemeCode}
                        className={`hover:bg-stone-50 transition-colors ${
                          isSelected ? "bg-indigo-50/70" : ""
                        }`}
                      >
                        {/* Duel Checkbox */}
                        <td className="py-3 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectForDuel(fund)}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            title="Select to compare head-to-head"
                          />
                        </td>

                        {/* Scheme Name & Identifiers */}
                        <td className="py-3 px-4">
                          <div className="font-serif text-sm font-semibold text-stone-900 leading-snug">
                            {fund.schemeName}
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-stone-500 font-mono">
                            <span className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200">
                              Code: {fund.schemeCode}
                            </span>
                            {fund.isinGrowth && (
                              <span className="text-stone-400">ISIN: {fund.isinGrowth}</span>
                            )}
                            {fund.isDirect && (
                              <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                                Direct
                              </span>
                            )}
                            {fund.isGrowth && (
                              <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px]">
                                Growth
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-3 text-stone-700">
                          <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                            {fund.category}
                          </span>
                        </td>

                        {/* Fund House */}
                        <td className="py-3 px-3 text-stone-700 truncate max-w-[150px]">
                          {fund.fundHouse}
                        </td>

                        {/* NAV */}
                        <td className="py-3 px-3 text-right font-bold text-stone-900">
                          ₹{fund.nav.toFixed(4)}
                        </td>

                        {/* NAV Date */}
                        <td className="py-3 px-3 text-stone-500 text-[11px]">
                          {fund.navDate}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleInspectScheme(fund)}
                            className="text-stone-700 hover:text-black bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded transition-colors text-[11px] cursor-pointer"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            STICKY BOTTOM BAR: DUAL COMPARISON LAUNCHER
            ========================================================================= */}
        {selectedForDuel.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xl bg-stone-900 text-white p-4 rounded-xl shadow-2xl border border-stone-700 z-50 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wide font-bold flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Head-to-Head Duel Queue ({selectedForDuel.length}/2)</span>
              </div>
              <div className="text-xs font-serif text-stone-200 truncate max-w-sm mt-0.5">
                {selectedForDuel.map((s) => s.schemeName.split("-")[0].trim()).join(" vs ")}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedForDuel([])}
                className="text-xs font-mono text-stone-400 hover:text-white px-2 py-1"
              >
                Clear
              </button>

              <button
                onClick={() => {
                  if (selectedForDuel.length >= 2 && onLaunchDuel) {
                    onLaunchDuel(selectedForDuel[0].schemeCode, selectedForDuel[1].schemeCode);
                  } else if (onNavigateCompare) {
                    onNavigateCompare();
                  }
                }}
                disabled={selectedForDuel.length < 2}
                className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono text-xs font-bold px-3.5 py-2 rounded transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <span>Launch Duel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCHEME INSPECTION MODAL DRAWER
            ========================================================================= */}
        {inspectedFund && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-stone-300 max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                    {inspectedFund.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 leading-snug">
                    {inspectedFund.schemeName}
                  </h3>
                  <div className="text-xs font-mono text-stone-500 mt-0.5">
                    {inspectedFund.fundHouse}
                  </div>
                </div>
                <button
                  onClick={() => setInspectedFund(null)}
                  className="p-1 rounded hover:bg-stone-100 text-stone-400 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {inspectLoading && (
                <div className="text-center py-4 text-xs font-mono text-stone-500 flex items-center justify-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Calculating rolling historical CAGRs from AMFI...
                </div>
              )}

              {/* Data Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-stone-50 p-4 rounded border border-stone-200">
                <div>
                  <span className="text-stone-500 block">AMFI Scheme Code:</span>
                  <span className="font-bold text-stone-900">{inspectedFund.schemeCode}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Current NAV:</span>
                  <span className="font-bold text-stone-900">₹{inspectedFund.nav.toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">NAV Date:</span>
                  <span className="text-stone-800">{inspectedFund.navDate}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Plan & Option:</span>
                  <span className="text-stone-800">
                    {inspectedFund.isDirect ? "Direct" : "Regular"} · {inspectedFund.isGrowth ? "Growth" : "IDCW"}
                  </span>
                </div>
              </div>

              {/* Rolling Return Estimates */}
              <div className="border border-stone-200 rounded p-3">
                <div className="text-xs font-mono text-stone-500 uppercase tracking-wide mb-2 font-semibold">
                  Calculated Compound Annual Growth Rates (CAGR)
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-stone-50 p-2 rounded border border-stone-200">
                    <span className="text-stone-400 text-[10px] block">1-Year CAGR</span>
                    <span className="font-bold text-stone-900">
                      {inspectedFund.cagr1Y != null ? `${inspectedFund.cagr1Y}%` : "Calculating..."}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-2 rounded border border-stone-200">
                    <span className="text-stone-400 text-[10px] block">3-Year CAGR</span>
                    <span className="font-bold text-stone-900">
                      {inspectedFund.cagr3Y != null ? `${inspectedFund.cagr3Y}%` : "Calculating..."}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-2 rounded border border-stone-200">
                    <span className="text-stone-400 text-[10px] block">5-Year CAGR</span>
                    <span className="font-bold text-emerald-800">
                      {inspectedFund.cagr5Y != null ? `${inspectedFund.cagr5Y}%` : "Calculating..."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    toggleSelectForDuel(inspectedFund);
                    setInspectedFund(null);
                  }}
                  className="bg-stone-900 hover:bg-black text-white px-4 py-2 rounded text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>
                    {selectedForDuel.some((s) => s.schemeCode === inspectedFund.schemeCode)
                      ? "Remove from Duel"
                      : "Add to Head-to-Head Duel"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
