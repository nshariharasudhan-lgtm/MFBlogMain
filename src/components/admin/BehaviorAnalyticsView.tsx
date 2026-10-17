import React, { useState, useEffect } from "react";
import {
  Database,
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  Search,
  Eye,
  Clock,
  Share2,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Compass,
  ArrowRight,
  Sparkles,
  Smartphone,
  Laptop,
  Tablet,
  Check,
  Info,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  AnalyticsOverviewData,
  ContentAffinityItem,
  ToolUsageItem,
  UserJourneyPattern,
  SearchQueryItem,
  UserBehaviorSession,
} from "../../types";

interface BehaviorAnalyticsViewProps {
  onDraftFromSearch?: (query: string) => void;
  onOpenArticleByPath?: (path: string) => void;
}

export function BehaviorAnalyticsView({
  onDraftFromSearch,
  onOpenArticleByPath,
}: BehaviorAnalyticsViewProps) {
  const [data, setData] = useState<AnalyticsOverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<"all" | "30d" | "7d" | "24h">("all");
  const [activeSubTab, setActiveSubTab] = useState<
    "content" | "tools" | "journeys" | "search" | "sessions"
  >("content");
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/analytics/overview?timeFilter=${timeFilter}`);
      if (!res.ok) {
        throw new Error(`Failed to load analytics (Status ${res.status})`);
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error("Error fetching behavioral analytics:", err);
      setError(err?.message || "Failed to load behavioral analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeFilter]);

  const handleExportJson = () => {
    window.location.href = "/api/analytics/export";
  };

  const handleResetDatabase = async () => {
    try {
      setIsResetting(true);
      const res = await fetch("/api/analytics/reset", { method: "POST" });
      if (res.ok) {
        setShowResetModal(false);
        showToast("Behavioral database successfully reset to clean baseline.");
        await fetchAnalytics();
      } else {
        showToast("Error resetting database. Check administrator credentials.");
      }
    } catch (err) {
      showToast("Network error resetting database.");
    } finally {
      setIsResetting(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Format seconds to mm:ss or hrs
  const formatDuration = (totalSeconds: number) => {
    if (!totalSeconds) return "0s";
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins >= 60) {
      const hrs = (mins / 60).toFixed(1);
      return `${hrs}h`;
    }
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-stone-700 flex items-center gap-2 animate-fade-in font-mono-data">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Confirmation Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif-editorial">
                Reset Behavioral Intelligence Store?
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                This will reset the dedicated behavioral analytics database to its initial calibrated baseline.
                <strong className="text-stone-900 block mt-1">
                  Note: This ONLY affects the dedicated behavior database. Your Supabase articles, comments, and settings are completely separate and untouched.
                </strong>
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetDatabase}
                disabled={isResetting}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-1.5"
              >
                {isResetting ? "Resetting..." : "Confirm Reset"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Database Architecture Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-[#1F1F1F] to-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-stone-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold font-serif-editorial text-stone-100">
                  Behavioral & Content Intelligence System
                </h2>
                <span className="text-[10px] font-mono-data bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  100% AUTHENTIC TELEMETRY (ZERO MOCK FIGURES)
                </span>
                <span className="text-[10px] font-mono-data bg-stone-700 text-stone-300 px-2 py-0.5 rounded-full">
                  ISOLATED JSON STORE
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
                Real-time reader intelligence tracking authentic content affinity, reading dwell time, scroll completion, tool usages, and search demand. All synthetic/dummy seed figures have been eliminated — all metrics represent verified, real-world user engagement.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              onClick={fetchAnalytics}
              disabled={loading}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono-data flex items-center gap-1.5 transition-colors border border-stone-700"
              title="Refresh live data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleExportJson}
              className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Download raw database backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export DB (.json)</span>
            </button>
            <button
              onClick={() => setShowResetModal(true)}
              className="p-2 rounded-xl bg-stone-800 hover:bg-rose-950 text-stone-400 hover:text-rose-300 transition-colors border border-stone-700"
              title="Reset Database Baseline"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Database Health Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-800/80 text-xs font-mono-data">
          <div>
            <span className="text-stone-400 block text-[10px]">DATABASE ENGINE</span>
            <span className="text-stone-200 font-medium">Atomic Isolated JSON</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px]">STORE LOCATION</span>
            <span className="text-stone-200 font-medium truncate block">data/behavior_analytics.json</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px]">SUPABASE STATUS</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> Fully Distinct & Unaffected
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px]">LAST FLUSHED TO DISK</span>
            <span className="text-stone-200 font-medium">
              {data?.databaseStatus?.lastUpdated
                ? new Date(data.databaseStatus.lastUpdated).toLocaleTimeString()
                : "Synchronized"}
            </span>
          </div>
        </div>
      </div>

      {/* Top Behavioral KPIs Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#EAE8E0] shadow-xs">
          <div className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-3 h-3 text-stone-400" />
            <span>Tracked Sessions</span>
          </div>
          <div className="text-2xl font-bold text-stone-900 mt-1 font-serif-editorial">
            {data?.summary?.totalSessions ?? 0}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">
            {data?.summary && data.summary.totalSessions > 0 ? "Unique visitor journeys" : "Awaiting visitor sessions"}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#EAE8E0] shadow-xs">
          <div className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <Eye className="w-3 h-3 text-stone-400" />
            <span>Page Impressions</span>
          </div>
          <div className="text-2xl font-bold text-stone-900 mt-1 font-serif-editorial">
            {data?.summary?.totalPageViews ?? 0}
          </div>
          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
            {data?.summary && data.summary.totalSessions > 0
              ? `${(data.summary.totalPageViews / data.summary.totalSessions).toFixed(1)} pages/session`
              : "0.0 pages/session"}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#EAE8E0] shadow-xs">
          <div className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <Sliders className="w-3 h-3 text-amber-500" />
            <span>Tool Interactions</span>
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-1 font-serif-editorial">
            {data?.summary?.totalToolInteractions ?? 0}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">Calculators & quiz events</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#EAE8E0] shadow-xs">
          <div className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>Reading Time</span>
          </div>
          <div className="text-2xl font-bold text-stone-900 mt-1 font-serif-editorial">
            {data?.summary?.totalActiveReadingMinutes
              ? Math.round(data.summary.totalActiveReadingMinutes).toLocaleString()
              : "0"}
            <span className="text-xs font-normal text-stone-500 ml-1">mins</span>
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">Active focused reading</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#EAE8E0] shadow-xs col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono-data text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>Avg Session Dwell</span>
          </div>
          <div className="text-2xl font-bold text-stone-900 mt-1 font-serif-editorial">
            {data?.summary?.avgDwellSecondsPerSession
              ? formatDuration(data.summary.avgDwellSecondsPerSession)
              : "0s"}
          </div>
          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
            {data?.summary && data.summary.totalSessions > 0 ? "Real retention index" : "Live telemetry active"}
          </div>
        </div>
      </div>

      {/* Sub-Navigation & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE8E0] pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
          {[
            { id: "content", label: "Content Preference & Affinity", icon: Layers, count: data?.contentAffinity?.length },
            { id: "tools", label: "Tool Usage & Stickiness", icon: Sliders, count: data?.toolUsage?.length },
            { id: "journeys", label: "User Journey Funnels", icon: Compass, count: data?.journeyPatterns?.length },
            { id: "search", label: "Search Intent & Content Demand", icon: Search, count: data?.searchTrends?.length },
            { id: "sessions", label: "Recent Sessions Trail", icon: Activity, count: data?.recentSessions?.length },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeSubTab === tab.id
                    ? "bg-[#1A1A1A] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-[#F0EEE6]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-data ${
                      activeSubTab === tab.id
                        ? "bg-stone-700 text-stone-200"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto text-xs font-mono-data bg-white p-1 rounded-xl border border-[#EAE8E0]">
          {(["all", "30d", "7d", "24h"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeFilter(period)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                timeFilter === period
                  ? "bg-amber-400 text-stone-950 font-bold"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              {period === "all" ? "All Time" : period.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-VIEW 1: Content Preference & Affinity Scoring Algorithm */}
      {activeSubTab === "content" && (
        <div className="space-y-4">
          {/* Algorithm Explainer Box */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-stone-700 leading-relaxed">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900">
                How YieldNest Content Affinity Algorithm Works:
              </div>
              <p className="mt-0.5 text-stone-600">
                Score (0 to 100) mathematically evaluates four behavioral signals:
                <span className="font-mono-data text-[11px] block mt-1 text-stone-800">
                  Affinity = [Avg Dwell Time × 20%] + [Scroll Depth 75-100% Completion × 45%] + [Social Share Velocity × 25%] + [Log View Density × 10%]
                </span>
                Articles with high affinity reveal high investor retention, low bounce skims, and prime candidates for social syndication or newsletter spotlights.
              </p>
            </div>
          </div>

          {/* Ranked Content Table */}
          <div className="bg-white rounded-xl border border-[#EAE8E0] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#EAE8E0] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-serif-editorial">
                  Content Preference Leaderboard
                </h3>
                <p className="text-xs text-stone-500">
                  Ranked by behavioral affinity score, dwell duration, and scroll completion
                </p>
              </div>
              <span className="text-xs text-stone-500 font-mono-data">
                {data?.contentAffinity?.length || 0} publications evaluated
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F5] text-stone-500 uppercase font-mono-data text-[10px] border-b border-[#EAE8E0]">
                  <tr>
                    <th className="px-4 py-3">Rank & Article Title</th>
                    <th className="px-3 py-3">Category</th>
                    <th className="px-3 py-3 text-center">Affinity Score</th>
                    <th className="px-3 py-3 text-right">Views</th>
                    <th className="px-3 py-3 text-right">Avg Dwell</th>
                    <th className="px-4 py-3">Scroll Funnel (25% → 100%)</th>
                    <th className="px-3 py-3 text-center">Shares</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE8E0]">
                  {data?.contentAffinity && data.contentAffinity.length > 0 ? (
                    data.contentAffinity.map((item, index) => {
                      const scrollRate =
                        item.views > 0
                          ? Math.round(((item.scroll75 + item.scroll100) / (2 * item.views)) * 100)
                          : 0;

                      return (
                        <tr key={item.path} className="hover:bg-[#FAF9F5]/70 transition-colors">
                          <td className="px-4 py-3.5 max-w-md">
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center font-mono-data text-[10px] font-bold shrink-0 mt-0.5 ${
                                  index === 0
                                    ? "bg-amber-400 text-stone-950"
                                    : index === 1
                                    ? "bg-stone-300 text-stone-800"
                                    : index === 2
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-stone-100 text-stone-500"
                                }`}
                              >
                                {index + 1}
                              </span>
                              <div>
                                <a
                                  href={item.path}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-medium text-stone-900 hover:text-amber-600 transition-colors line-clamp-1"
                                >
                                  {item.title}
                                </a>
                                <span className="text-[10px] text-stone-400 font-mono-data block truncate">
                                  {item.path}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-3.5 whitespace-nowrap">
                            <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-mono-data font-medium">
                              {item.category}
                            </span>
                          </td>

                          <td className="px-3 py-3.5 text-center">
                            <div className="inline-flex items-center gap-1.5">
                              <div
                                className={`px-2 py-0.5 rounded-lg font-mono-data font-bold text-xs ${
                                  item.affinityScore >= 85
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                    : item.affinityScore >= 70
                                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                                    : "bg-blue-100 text-blue-800 border border-blue-300"
                                }`}
                              >
                                {item.affinityScore}/100
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-3.5 text-right font-mono-data font-medium text-stone-800">
                            {item.views.toLocaleString()}
                          </td>

                          <td className="px-3 py-3.5 text-right font-mono-data text-stone-700">
                            {formatDuration(item.avgDwellSeconds)}
                          </td>

                          <td className="px-4 py-3.5 min-w-[180px]">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono-data">
                                <span>25%:{item.scroll25}</span>
                                <span>50%:{item.scroll50}</span>
                                <span>75%:{item.scroll75}</span>
                                <span>100%:{item.scroll100}</span>
                              </div>
                              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden flex">
                                <div
                                  className="h-full bg-emerald-500"
                                  style={{
                                    width: `${item.views ? Math.min(100, (item.scroll100 / item.views) * 100) : 0}%`,
                                  }}
                                  title="100% full read"
                                />
                                <div
                                  className="h-full bg-emerald-300"
                                  style={{
                                    width: `${item.views ? Math.min(100, ((item.scroll75 - item.scroll100) / item.views) * 100) : 0}%`,
                                  }}
                                  title="75% read"
                                />
                                <div
                                  className="h-full bg-stone-300"
                                  style={{
                                    width: `${item.views ? Math.min(100, ((item.scroll50 - item.scroll75) / item.views) * 100) : 0}%`,
                                  }}
                                  title="50% read"
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-3.5 text-center font-mono-data text-stone-700">
                            <span className="inline-flex items-center gap-1 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                              <Share2 className="w-2.5 h-2.5 text-stone-400" />
                              {item.shares}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-12 px-4">
                        <div className="max-w-md mx-auto space-y-1.5 text-stone-500">
                          <Layers className="w-8 h-8 text-stone-300 mx-auto" />
                          <div className="font-semibold text-stone-800 text-xs">No Authentic Content Reads Recorded Yet</div>
                          <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                            As visitors read articles, the affinity engine will automatically measure dwell time, scroll depths (25% → 100%), and social shares to rank content here with real metrics.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: Tool Usage & Stickiness Index */}
      {activeSubTab === "tools" && (
        <div className="space-y-4">
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-stone-700 leading-relaxed">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900">
                Tool Stickiness Index Formulation:
              </div>
              <p className="mt-0.5 text-stone-600">
                Stickiness Index (0 to 100) identifies which utilities drive actual investor action versus surface glances:
                <span className="font-mono-data text-[11px] block mt-1 text-stone-800">
                  Stickiness = [(Interactions per Launch) × 18%] + [(Share & Copy Actions) × 15%] + [Dwell Multiplier]
                </span>
                Calculators with &gt;85 index indicate high repeat replay value, ideal for contextual callouts inside research reports.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.toolUsage && data.toolUsage.length > 0 ? (
              data.toolUsage.map((tool, idx) => (
                <div
                  key={tool.toolId}
                  className="bg-white p-4 rounded-xl border border-[#EAE8E0] shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-mono-data text-xs font-bold shrink-0">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900 font-serif-editorial">
                          {tool.toolName}
                        </h4>
                        <span className="text-[10px] text-stone-400 font-mono-data block">
                          {tool.path}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`px-2.5 py-1 rounded-lg font-mono-data font-bold text-xs shrink-0 ${
                        tool.stickinessIndex >= 85
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : tool.stickinessIndex >= 75
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-blue-100 text-blue-800 border border-blue-300"
                      }`}
                    >
                      {tool.stickinessIndex} Stickiness
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-center font-mono-data text-xs">
                    <div className="bg-[#FAF9F5] p-2 rounded-lg">
                      <span className="text-[10px] text-stone-400 block">USES</span>
                      <span className="font-bold text-stone-800">{tool.usesCount}</span>
                    </div>
                    <div className="bg-[#FAF9F5] p-2 rounded-lg">
                      <span className="text-[10px] text-stone-400 block">STEPS/ADJ</span>
                      <span className="font-bold text-stone-800">{tool.interactionsCount}</span>
                    </div>
                    <div className="bg-[#FAF9F5] p-2 rounded-lg">
                      <span className="text-[10px] text-stone-400 block">AVG TIME</span>
                      <span className="font-bold text-stone-800">{formatDuration(tool.avgSessionSeconds)}</span>
                    </div>
                    <div className="bg-[#FAF9F5] p-2 rounded-lg">
                      <span className="text-[10px] text-stone-400 block">SHARES</span>
                      <span className="font-bold text-stone-800">{tool.shareClicks}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span className="flex items-center gap-1 font-mono-data text-[10px]">
                      <Clock className="w-3 h-3 text-stone-400" /> Last used:{" "}
                      {new Date(tool.lastUsed).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <a
                      href={tool.path}
                      target="_blank"
                      rel="noreferrer"
                      className="text-stone-700 hover:text-amber-600 font-medium flex items-center gap-1 text-xs"
                    >
                      <span>Open Tool</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 px-4 bg-white rounded-xl border border-[#EAE8E0]">
                <div className="max-w-md mx-auto space-y-1.5 text-stone-500">
                  <Sliders className="w-8 h-8 text-stone-300 mx-auto" />
                  <div className="font-semibold text-stone-800 text-xs">No Real Tool Interactions Recorded Yet</div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                    When visitors interact with SIP calculators, step-up sliders, tax estimators, or checklists, authentic stickiness metrics and usage counts will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: User Journey Funnels */}
      {activeSubTab === "journeys" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#EAE8E0] p-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 font-serif-editorial">
              Top User Transition Funnels
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Sequence of page routes and tool migrations taken by investors during active sessions
            </p>

            <div className="mt-4 space-y-2.5">
              {data?.journeyPatterns && data.journeyPatterns.length > 0 ? (
                data.journeyPatterns.map((pattern, index) => (
                  <div
                    key={`${pattern.fromPath}->${pattern.toPath}`}
                    className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-mono-data text-[10px] font-bold shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex items-center gap-2 flex-wrap font-mono-data">
                        <span className="bg-white px-2.5 py-1 rounded-md border border-stone-300 text-stone-800 font-medium">
                          {pattern.fromPath}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="bg-amber-100/70 border border-amber-300 text-amber-900 px-2.5 py-1 rounded-md font-semibold">
                          {pattern.toPath}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 font-mono-data text-xs">
                      <div>
                        <span className="text-[10px] text-stone-400 block">TRAFFIC</span>
                        <span className="font-bold text-stone-900">{pattern.count} transitions</span>
                      </div>
                      <div className="w-20">
                        <div className="flex justify-between text-[10px] text-stone-500 mb-0.5">
                          <span>SHARE</span>
                          <span>{pattern.transitionProbability}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${Math.min(100, pattern.transitionProbability * 3)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-4 bg-[#FAF9F5] rounded-xl border border-stone-200/80">
                  <div className="max-w-md mx-auto space-y-1.5 text-stone-500">
                    <Compass className="w-8 h-8 text-stone-300 mx-auto" />
                    <div className="font-semibold text-stone-800 text-xs">No Multi-Page Transitions Recorded Yet</div>
                    <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                      As visitors navigate between categories, articles, and calculators, journey funnel flows will automatically map their navigation paths.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: Search Intent & Unmet Content Demand */}
      {activeSubTab === "search" && (
        <div className="space-y-4">
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-stone-700 leading-relaxed">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900">
                Editorial Search Demand Intelligence:
              </div>
              <p className="mt-0.5 text-stone-600">
                Identifies real-time reader queries on YieldNest. Queries marked with
                <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-semibold text-[10px] mx-1 border border-rose-300">
                  Zero Results / Gap Detected
                </span>
                indicate high reader demand where no article currently exists. Click "Draft in Studio" to immediately launch article generation.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#EAE8E0] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#EAE8E0] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-serif-editorial">
                  Search Query Intent & Gaps
                </h3>
                <p className="text-xs text-stone-500">
                  Top internal search terms ordered by frequency
                </p>
              </div>
              <span className="text-xs text-stone-500 font-mono-data">
                {data?.searchTrends?.length || 0} unique intents
              </span>
            </div>

            <div className="divide-y divide-[#EAE8E0]">
              {data?.searchTrends && data.searchTrends.length > 0 ? (
                data.searchTrends.map((q) => (
                  <div
                    key={q.query}
                    className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF9F5] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                        <Search className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-stone-900 capitalize">
                            "{q.query}"
                          </span>
                          {q.resultsFound ? (
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono-data font-medium">
                              Results Served
                            </span>
                          ) : (
                            <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-mono-data font-semibold animate-pulse">
                              Content Gap Detected
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono-data">
                          Last queried: {new Date(q.lastSearched).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span className="text-xs font-mono-data text-stone-700 font-semibold bg-stone-100 px-2.5 py-1 rounded-lg">
                        {q.count} searches
                      </span>
                      {onDraftFromSearch && (
                        <button
                          onClick={() => onDraftFromSearch(q.query)}
                          className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-amber-400 hover:text-stone-950 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Draft in Studio</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="max-w-md mx-auto space-y-1.5 text-stone-500">
                    <Search className="w-8 h-8 text-stone-300 mx-auto" />
                    <div className="font-semibold text-stone-800 text-xs">No Internal Searches Logged Yet</div>
                    <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                      Queries typed into the site search bar will be captured here in real time to highlight investor demand and content opportunities.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: Recent Sessions Trail */}
      {activeSubTab === "sessions" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#EAE8E0] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#EAE8E0] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-serif-editorial">
                  Live Session Explorer
                </h3>
                <p className="text-xs text-stone-500">
                  Granular chronological inspector of investor sessions
                </p>
              </div>
              <span className="text-xs text-stone-500 font-mono-data">
                Displaying last 15 tracked sessions
              </span>
            </div>

            <div className="divide-y divide-[#EAE8E0]">
              {data?.recentSessions && data.recentSessions.length > 0 ? (
                data.recentSessions.map((session) => (
                  <div key={session.sessionId} className="p-4 space-y-2.5 hover:bg-[#FAF9F5] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-data text-stone-800 font-bold bg-stone-100 px-2 py-0.5 rounded">
                          {session.sessionId}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-stone-500 font-mono-data">
                          {session.deviceType === "mobile" ? (
                            <Smartphone className="w-3.5 h-3.5 text-stone-500" />
                          ) : session.deviceType === "tablet" ? (
                            <Tablet className="w-3.5 h-3.5 text-stone-500" />
                          ) : (
                            <Laptop className="w-3.5 h-3.5 text-stone-500" />
                          )}
                          <span className="capitalize">{session.deviceType}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3 font-mono-data text-[11px] text-stone-500">
                        <span>Started: {new Date(session.startedAt).toLocaleTimeString()}</span>
                        <span>•</span>
                        <span className="font-semibold text-stone-800">
                          Duration: {formatDuration(session.totalDurationSeconds)}
                        </span>
                      </div>
                    </div>

                    {/* Navigation Path Breadcrumbs */}
                    <div className="flex items-center gap-1.5 flex-wrap text-xs">
                      <span className="text-[10px] text-stone-400 font-mono-data uppercase mr-1">
                        Trail:
                      </span>
                      {session.pagesVisited.map((page, idx) => (
                        <React.Fragment key={idx}>
                          <span className="bg-white border border-stone-200 px-2 py-0.5 rounded font-mono-data text-[11px] text-stone-700">
                            {page}
                          </span>
                          {idx < session.pagesVisited.length - 1 && (
                            <ChevronRight className="w-3 h-3 text-stone-300" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Tools Used Badge */}
                    {session.toolsUsed && session.toolsUsed.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1 text-xs">
                        <span className="text-[10px] text-amber-700 font-mono-data uppercase font-semibold">
                          Tools Operated:
                        </span>
                        {session.toolsUsed.map((tool) => (
                          <span
                            key={tool}
                            className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono-data text-[10px] font-semibold"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="max-w-md mx-auto space-y-1.5 text-stone-500">
                    <Activity className="w-8 h-8 text-stone-300 mx-auto" />
                    <div className="font-semibold text-stone-800 text-xs">No Active Visitor Sessions Logged Yet</div>
                    <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                      Real visitor sessions with device types, page trails, dwell durations, and tool operations will stream here live.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
