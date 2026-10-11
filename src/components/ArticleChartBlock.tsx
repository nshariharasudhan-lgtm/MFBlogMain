import React, { useState } from "react";
import { BarChart3, TrendingUp, ShieldCheck, Layers, Award } from "lucide-react";

export interface ChartDataGroup {
  name: string;
  fund: number;
  benchmark: number;
  benchName: string;
  fund5Y?: number;
  benchmark5Y?: number;
}

export interface FundBarItem {
  name: string;
  category: string;
  cagr3Y: number;
  cagr5Y?: number;
  benchName: string;
  bench3Y: number;
  bench5Y?: number;
  aumCr?: number;
}

export interface AumCategoryItem {
  label: string;
  aumCr: number;
  percentage: number;
  fundCount: number;
}

export interface ChartDefinition {
  type: "category-comparison" | "fund-bars" | "aum-distribution";
  title: string;
  subtitle?: string;
  asOnDate?: string;
  categories?: ChartDataGroup[];
  funds?: FundBarItem[];
  items?: AumCategoryItem[];
}

interface ArticleChartBlockProps {
  chart: ChartDefinition;
}

export function ArticleChartBlock({ chart }: ArticleChartBlockProps) {
  const [horizon, setHorizon] = useState<"3Y" | "5Y">("3Y");
  const asOnDate = chart.asOnDate || "05-Oct-2026";

  if (chart.type === "category-comparison" && chart.categories && chart.categories.length > 0) {
    const has5Y = chart.categories.some((c) => c.fund5Y !== undefined && c.benchmark5Y !== undefined);
    const maxVal = Math.max(
      ...chart.categories.map((c) =>
        horizon === "3Y" ? Math.max(c.fund, c.benchmark) : Math.max(c.fund5Y || c.fund, c.benchmark5Y || c.benchmark)
      ),
      18
    );

    return (
      <div className="my-8 rounded-2xl border border-[#E3DFC2] bg-white p-5 sm:p-6 shadow-xs">
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0EEE6] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-100 text-emerald-900">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                {chart.title}
              </h3>
            </div>
            {chart.subtitle && (
              <p className="text-xs text-stone-600 font-sans mt-0.5">{chart.subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {has5Y && (
              <div className="inline-flex rounded-lg border border-stone-200 bg-[#FAF9F5] p-0.5 text-xs font-mono-data">
                <button
                  type="button"
                  onClick={() => setHorizon("3Y")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    horizon === "3Y"
                      ? "bg-stone-900 text-white font-medium"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  3-Year CAGR
                </button>
                <button
                  type="button"
                  onClick={() => setHorizon("5Y")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    horizon === "5Y"
                      ? "bg-stone-900 text-white font-medium"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  5-Year CAGR
                </button>
              </div>
            )}
            <span className="text-[10px] font-mono-data bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-1 rounded font-medium">
              AMFI As on {asOnDate}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 pb-4 text-xs font-mono-data text-stone-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-700"></span>
              <span className="text-stone-900 font-medium">Category Median Direct CAGR</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-stone-300"></span>
              <span className="text-stone-600">Total Return Index (TRI) Benchmark</span>
            </span>
          </div>
          <span className="text-[11px] text-stone-500 italic">
            *Alpha = Category Median − Benchmark TRI
          </span>
        </div>

        {/* Bars Grid */}
        <div className="space-y-4 pt-1">
          {chart.categories.map((cat, idx) => {
            const fundVal = horizon === "3Y" ? cat.fund : cat.fund5Y ?? cat.fund;
            const benchVal = horizon === "3Y" ? cat.benchmark : cat.benchmark5Y ?? cat.benchmark;
            const alpha = Number((fundVal - benchVal).toFixed(2));
            const fundWidth = Math.max(4, Math.min(100, (fundVal / maxVal) * 100));
            const benchWidth = Math.max(4, Math.min(100, (benchVal / maxVal) * 100));

            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EAE8E0] hover:border-emerald-700/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-stone-900 font-sans">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono-data">
                      ({cat.benchName})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10.5px] font-mono-data font-semibold px-2 py-0.5 rounded ${
                        alpha >= 0
                          ? "bg-emerald-100/80 text-emerald-900"
                          : "bg-rose-100/80 text-rose-900"
                      }`}
                    >
                      {alpha >= 0 ? `+${alpha}% Alpha` : `${alpha}% Alpha`}
                    </span>
                  </div>
                </div>

                {/* Fund Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-[10.5px] font-mono-data text-stone-600 shrink-0">
                      Fund Median:
                    </div>
                    <div className="flex-1 bg-stone-200/50 rounded-full h-4 relative overflow-hidden">
                      <div
                        className="bg-emerald-700 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-300"
                        style={{ width: `${fundWidth}%` }}
                      >
                        <span className="text-[9.5px] font-mono-data font-bold text-white leading-none">
                          {fundVal.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Benchmark Bar */}
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-[10.5px] font-mono-data text-stone-500 shrink-0">
                      Benchmark:
                    </div>
                    <div className="flex-1 bg-stone-200/50 rounded-full h-3.5 relative overflow-hidden">
                      <div
                        className="bg-stone-400 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-300"
                        style={{ width: `${benchWidth}%` }}
                      >
                        <span className="text-[9px] font-mono-data font-semibold text-white leading-none">
                          {benchVal.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-4 mt-3 border-t border-[#F0EEE6] flex items-center justify-between text-[11px] font-mono-data text-stone-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Direct Growth Plans • Total Return Index (TRI) Benchmarks</span>
          </span>
          <span>Source: amfiindia.com/otherdata/fund-performance</span>
        </div>
      </div>
    );
  }

  if (chart.type === "fund-bars" && chart.funds && chart.funds.length > 0) {
    const maxVal = Math.max(...chart.funds.map((f) => (horizon === "3Y" ? f.cagr3Y : f.cagr5Y || f.cagr3Y)), 20);

    return (
      <div className="my-8 rounded-2xl border border-[#E3DFC2] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0EEE6] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-100 text-amber-900">
                <TrendingUp className="w-4 h-4" />
              </span>
              <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                {chart.title}
              </h3>
            </div>
            {chart.subtitle && (
              <p className="text-xs text-stone-600 font-sans mt-0.5">{chart.subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex rounded-lg border border-stone-200 bg-[#FAF9F5] p-0.5 text-xs font-mono-data">
              <button
                type="button"
                onClick={() => setHorizon("3Y")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  horizon === "3Y"
                    ? "bg-stone-900 text-white font-medium"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                3-Year Return
              </button>
              <button
                type="button"
                onClick={() => setHorizon("5Y")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  horizon === "5Y"
                    ? "bg-stone-900 text-white font-medium"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                5-Year Return
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3.5 pt-4">
          {chart.funds.map((f, idx) => {
            const ret = horizon === "3Y" ? f.cagr3Y : f.cagr5Y || f.cagr3Y;
            const bench = horizon === "3Y" ? f.bench3Y : f.bench5Y || f.bench3Y;
            const alpha = Number((ret - bench).toFixed(2));
            const widthPct = Math.max(5, Math.min(100, (ret / maxVal) * 100));

            return (
              <div key={idx} className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EAE8E0]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-stone-900">
                      {f.name}
                    </span>
                    <span className="text-[10px] font-mono-data px-1.5 py-0.5 rounded bg-stone-200/70 text-stone-700">
                      {f.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-data">
                    {f.aumCr && (
                      <span className="text-[10.5px] text-stone-500">
                        AUM: ₹{f.aumCr.toLocaleString()} Cr
                      </span>
                    )}
                    <span
                      className={`text-[10.5px] font-semibold px-2 py-0.5 rounded ${
                        alpha >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {alpha >= 0 ? `+${alpha}% vs Bench` : `${alpha}% vs Bench`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-stone-200/60 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-stone-900 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-300"
                      style={{ width: `${widthPct}%` }}
                    >
                      <span className="text-[9.5px] font-mono-data font-bold text-white leading-none">
                        {ret.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-24 text-[10px] font-mono-data text-stone-500 text-right shrink-0">
                    Bench: {bench.toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 mt-3 border-t border-[#F0EEE6] flex items-center justify-between text-[11px] font-mono-data text-stone-500">
          <span>*Direct Plan Growth NAVs as of 05-Oct-2026</span>
          <span>Source: AMFI India Fund Performance</span>
        </div>
      </div>
    );
  }

  if (chart.type === "aum-distribution" && chart.items && chart.items.length > 0) {
    const totalAum = chart.items.reduce((acc, i) => acc + i.aumCr, 0);

    return (
      <div className="my-8 rounded-2xl border border-[#E3DFC2] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0EEE6] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-100 text-indigo-900">
                <Layers className="w-4 h-4" />
              </span>
              <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                {chart.title}
              </h3>
            </div>
            {chart.subtitle && (
              <p className="text-xs text-stone-600 font-sans mt-0.5">{chart.subtitle}</p>
            )}
          </div>
          <span className="text-[11px] font-mono-data bg-stone-100 text-stone-800 px-2.5 py-1 rounded font-semibold self-start sm:self-auto">
            Total: ₹{Math.round(totalAum).toLocaleString()} Cr
          </span>
        </div>

        {/* Proportional Stacked Strip */}
        <div className="w-full h-5 rounded-lg overflow-hidden flex my-4 border border-stone-200">
          {chart.items.map((item, idx) => {
            const colors = [
              "bg-emerald-700",
              "bg-indigo-700",
              "bg-amber-600",
              "bg-sky-600",
              "bg-teal-700",
              "bg-stone-600",
            ];
            const color = colors[idx % colors.length];
            return (
              <div
                key={idx}
                className={`${color} h-full transition-all`}
                style={{ width: `${item.percentage}%` }}
                title={`${item.label}: ₹${item.aumCr.toLocaleString()} Cr (${item.percentage}%)`}
              />
            );
          })}
        </div>

        {/* Detailed Breakdown List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {chart.items.map((item, idx) => {
            const colors = [
              "bg-emerald-700",
              "bg-indigo-700",
              "bg-amber-600",
              "bg-sky-600",
              "bg-teal-700",
              "bg-stone-600",
            ];
            const dotColor = colors[idx % colors.length];

            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EAE8E0] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${dotColor}`}></span>
                  <div>
                    <div className="font-semibold text-xs text-stone-900">{item.label}</div>
                    <div className="text-[10px] text-stone-500 font-mono-data">
                      {item.fundCount} schemes
                    </div>
                  </div>
                </div>
                <div className="text-right font-mono-data">
                  <div className="font-bold text-xs text-stone-900">
                    ₹{item.aumCr.toLocaleString()} Cr
                  </div>
                  <div className="text-[10px] text-stone-600 font-medium">{item.percentage}%</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 mt-3 border-t border-[#F0EEE6] flex items-center justify-between text-[11px] font-mono-data text-stone-500">
          <span>Active Open-Ended Indian Equity Classification</span>
          <span>Source: AMFI India Official Records</span>
        </div>
      </div>
    );
  }

  return null;
}
