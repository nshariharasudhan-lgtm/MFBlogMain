import React, { useState } from "react";
import {
  ShieldCheck,
  Database,
  Calculator,
  RefreshCw,
  Scale,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  Download,
  BookOpen,
} from "lucide-react";
import { downloadCsv } from "./calculators/calculatorUtils";

interface MethodologyPageProps {
  onNavigateHome: () => void;
  onNavigateCalculators: (url?: string) => void;
  onNavigateHub: (slug: string) => void;
}

export function MethodologyPage({
  onNavigateHome,
  onNavigateCalculators,
  onNavigateHub,
}: MethodologyPageProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Live data timestamp formatting
  const today = new Date();
  const currentMonthYear = today.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const handleDownloadSampleCsv = () => {
    const headers = [
      "Month",
      "Year",
      "Regular_Plan_NAV",
      "Direct_Plan_NAV",
      "TER_Delta_Percent",
      "Monthly_SIP_Invested_INR",
      "Direct_Corpus_INR",
      "Regular_Corpus_INR",
      "Distributor_Commission_Loss_INR",
    ];

    const rows: (string | number)[][] = [];
    let directCorpus = 0;
    let regularCorpus = 0;
    const monthlySip = 10000;
    const directMonthlyReturn = 0.125 / 12; // 12.5% p.a.
    const regularMonthlyReturn = 0.115 / 12; // 11.5% p.a. (1% TER drag)

    for (let m = 1; m <= 60; m++) {
      directCorpus = (directCorpus + monthlySip) * (1 + directMonthlyReturn);
      regularCorpus = (regularCorpus + monthlySip) * (1 + regularMonthlyReturn);
      const year = Math.ceil(m / 12);
      const monthNum = ((m - 1) % 12) + 1;
      const commissionLoss = Math.round(directCorpus - regularCorpus);

      rows.push([
        `Month ${monthNum}`,
        `Year ${year}`,
        (100 * Math.pow(1 + regularMonthlyReturn, m)).toFixed(4),
        (100 * Math.pow(1 + directMonthlyReturn, m)).toFixed(4),
        "1.00%",
        monthlySip * m,
        Math.round(directCorpus),
        Math.round(regularCorpus),
        commissionLoss,
      ]);
    }

    downloadCsv("yieldnest_ter_compounding_methodology_sample", headers, rows);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12 font-serif-editorial">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs font-mono-data text-stone-500">
        <button
          onClick={onNavigateHome}
          className="text-stone-700 hover:text-black underline cursor-pointer"
        >
          Home
        </button>{" "}
        / <span className="text-stone-900 font-semibold">Methodology & Data Sources</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 border-b border-[#EAE8E0] pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono-data uppercase tracking-wider text-stone-500">
            Institutional Research Standards
          </span>
          <span className="text-xs font-mono-data text-stone-400">·</span>
          <span className="text-xs font-mono-data text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Data as on {currentMonthYear}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
          Research Methodology &amp; Data Sources
        </h1>
        <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed max-w-3xl">
          Complete mathematical formulas, regulatory data pipelines, benchmark selection standards, and calculator assumptions powering YieldNest.online.
        </p>
      </header>

      {/* 1. Executive Non-Technical Summary */}
      <section className="bg-white border border-[#E5E1D3] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs font-sans">
        <div className="flex items-center gap-2.5 text-stone-900 font-serif-editorial text-xl font-bold">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <h2>Plain-Language Summary: How YieldNest Works</h2>
        </div>
        <p className="text-sm text-stone-700 leading-relaxed">
          YieldNest is an independent analytical research platform built exclusively for Indian mutual fund investors. We operate under three non-negotiable editorial and mathematical safeguards:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#FAF9F5] rounded-xl border border-stone-200 space-y-1.5">
            <div className="text-xs font-mono-data font-bold text-stone-900">1. Zero Commissions</div>
            <p className="text-xs text-stone-600 leading-normal">
              We hold no AMFI distributor code (ARN), sell zero financial products, and accept zero sponsored placement fees from asset management companies (AMCs).
            </p>
          </div>
          <div className="p-4 bg-[#FAF9F5] rounded-xl border border-stone-200 space-y-1.5">
            <div className="text-xs font-mono-data font-bold text-stone-900">2. Statutory Data Only</div>
            <p className="text-xs text-stone-600 leading-normal">
              All performance tables, expense ratios, portfolio allocations, and categorizations are sourced directly from statutory AMFI and SEBI daily disclosures.
            </p>
          </div>
          <div className="p-4 bg-[#FAF9F5] rounded-xl border border-stone-200 space-y-1.5">
            <div className="text-xs font-mono-data font-bold text-stone-900">3. Transparent Math</div>
            <p className="text-xs text-stone-600 leading-normal">
              Every calculator uses verifiable client-side formulas with explicit assumptions. No black-box projections or promotional return promises.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Primary Data Sources & Refresh Frequency */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-3">
          <Database className="w-5 h-5 text-stone-700" />
          <h2 className="text-2xl font-bold">1. Data Sources &amp; Update Frequencies</h2>
        </div>
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-xs text-left border-collapse border border-stone-200 bg-white rounded-xl">
            <thead>
              <tr className="bg-[#F6F4ED] border-b border-stone-200 text-stone-800 font-mono-data">
                <th className="p-3 font-semibold">Data Category</th>
                <th className="p-3 font-semibold">Primary Source</th>
                <th className="p-3 font-semibold">Refresh Frequency</th>
                <th className="p-3 font-semibold">Standard Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700">
              <tr>
                <td className="p-3 font-medium text-stone-900">Scheme Net Asset Values (NAV)</td>
                <td className="p-3">AMFI Official NAV Portal (amfiindia.com)</td>
                <td className="p-3 font-mono-data">Daily (Business days by 11:00 PM IST)</td>
                <td className="p-3">Direct plan vs Regular plan split validated against CAMS/KFintech RTAs</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-stone-900">Total Expense Ratios (TER)</td>
                <td className="p-3">SEBI Mandatory Daily TER Disclosures</td>
                <td className="p-3 font-mono-data">Monthly &amp; on regulatory change</td>
                <td className="p-3">Cross-referenced with monthly scheme factsheet disclosures</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-stone-900">Scheme Categorization Norms</td>
                <td className="p-3">SEBI Circular SEBI/HO/IMD/DF3/CIR/P/2017/114</td>
                <td className="p-3 font-mono-data">Semi-Annual AMFI reclassification</td>
                <td className="p-3">Market capitalization thresholds (Large Cap: 1–100, Mid: 101–250, Small: 251+)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-stone-900">Benchmark Return Indices</td>
                <td className="p-3">NSE Indices &amp; BSE Asia Total Return Indices (TRI)</td>
                <td className="p-3 font-mono-data">Daily</td>
                <td className="p-3">Strict Total Return Index (TRI) format factoring dividend reinvestments</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-stone-900">Capital Gains Tax Rules</td>
                <td className="p-3">Income Tax Department of India (Finance Act 2024)</td>
                <td className="p-3 font-mono-data">Annual budget amendments</td>
                <td className="p-3">Section 112A equity LTCG (12.5% over ₹1.25 Lakh) &amp; STCG (20%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Rolling Returns Mathematical Specification */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-3">
          <TrendingUp className="w-5 h-5 text-stone-700" />
          <h2 className="text-2xl font-bold">2. Rolling Returns vs. Point-to-Point CAGR</h2>
        </div>
        <p className="font-sans text-sm text-stone-700 leading-relaxed">
          Traditional trailing returns (e.g., "1-Year CAGR" or "3-Year CAGR") suffer from severe <strong>end-point bias</strong>. If a market rally occurs immediately before the measurement date, a fund's reported returns will appear artificially inflated; conversely, an abrupt correction understates long-term managerial skill.
        </p>
        <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 space-y-3 font-sans">
          <div className="text-xs font-mono-data font-semibold text-stone-900 uppercase">
            Mathematical Formulation: Rolling CAGR
          </div>
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-mono text-xs text-stone-900 overflow-x-auto">
            {"Rolling CAGR(t, N) = [ NAV(t) / NAV(t - N years) ] ^ (1 / N) - 1"}
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Where <code>t</code> shifts daily across the entire historical observation horizon (typically 5 to 10 years) and <code>N</code> represents the holding duration (3 years = 750 trading sessions, 5 years = 1,250 trading sessions). YieldNest evaluates median rolling returns, minimum rolling returns (worst-case drawdown), and probability of delivering negative returns over 5-year investment horizons.
          </p>
        </div>
      </section>

      {/* 4. Total Expense Ratio Compounding Drag */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-3">
          <Scale className="w-5 h-5 text-stone-700" />
          <h2 className="text-2xl font-bold">3. Total Expense Ratio (TER) &amp; Commission Drag Math</h2>
        </div>
        <p className="font-sans text-sm text-stone-700 leading-relaxed">
          A common misconception among retail investors is that a 1% distributor commission is a one-time deduction. In reality, under SEBI guidelines, the Total Expense Ratio is deducted continuously from the scheme's net assets on a <strong>daily pro-rata basis</strong> before publishing the NAV:
        </p>
        <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 space-y-3 font-sans">
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-mono text-xs text-stone-900 overflow-x-auto">
            {"NAV_daily(t) = NAV(t - 1) * [ 1 + (Gross Return - TER) / 365 ]"}
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Over a 20-year horizon, an apparently small 0.85% to 1.15% TER delta between Direct and Regular plans compounds aggressively against the investor. In our Direct vs Regular Calculator, the commission loss is computed as:
          </p>
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-mono text-xs text-stone-900 overflow-x-auto">
            {"Commission Drag(T) = Final Corpus (Direct Plan) - Final Corpus (Regular Plan)"}
          </div>
        </div>
      </section>

      {/* 5. Financial Calculators Specification */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-3">
          <Calculator className="w-5 h-5 text-stone-700" />
          <h2 className="text-2xl font-bold">4. Calculator Formulas &amp; Explicit Assumptions</h2>
        </div>
        <div className="space-y-4 font-sans text-xs">
          {/* SIP */}
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
            <div className="font-serif-editorial text-base font-bold text-stone-900">
              A. Standard Systematic Investment Plan (SIP)
            </div>
            <p className="text-stone-600">
              Future value with monthly compounding and annuity-due beginning-of-period installments:
            </p>
            <div className="p-2 bg-[#FAF9F5] rounded border border-stone-200 font-mono text-[11px] text-stone-800">
              {"FV = P * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)"}
            </div>
            <p className="text-stone-500 text-[11px]">
              <code>P</code> = Monthly installment (INR), <code>r</code> = Monthly rate of return (Annual Rate / 12), <code>n</code> = Total number of monthly installments.
            </p>
          </div>

          {/* Step Up */}
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
            <div className="font-serif-editorial text-base font-bold text-stone-900">
              B. Step-Up SIP (Annual Escalation)
            </div>
            <p className="text-stone-600">
              Models income growth by escalating the monthly installment by an annual step-up rate <code>s</code> (typically 5% to 15%) at the start of each investment year:
            </p>
            <div className="p-2 bg-[#FAF9F5] rounded border border-stone-200 font-mono text-[11px] text-stone-800">
              {"P(year k) = P_initial * (1 + s)^(k - 1)  for k = 1 to Total Years"}
            </div>
          </div>

          {/* Cost of delay */}
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
            <div className="font-serif-editorial text-base font-bold text-stone-900">
              C. Cost of Delay (Procrastination Penalty)
            </div>
            <p className="text-stone-600">
              Measures the compounding opportunity lost by postponing investment start date by <code>d</code> months:
            </p>
            <div className="p-2 bg-[#FAF9F5] rounded border border-stone-200 font-mono text-[11px] text-stone-800">
              {"Penalty = FV(No Delay, N years) - FV(Delayed, N years - d months)"}
            </div>
          </div>

          {/* SWP */}
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
            <div className="font-serif-editorial text-base font-bold text-stone-900">
              D. Systematic Withdrawal Plan (SWP) Portfolio Depletion
            </div>
            <p className="text-stone-600">
              Calculates monthly compounding interest earned on remaining balance minus end-of-month cash withdrawals:
            </p>
            <div className="p-2 bg-[#FAF9F5] rounded border border-stone-200 font-mono text-[11px] text-stone-800">
              {"Corpus(m) = Corpus(m - 1) * (1 + r_monthly) - Monthly Withdrawal"}
            </div>
          </div>
        </div>

        {/* Download CSV Sample button */}
        <div className="pt-2 flex items-center justify-between p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl font-sans">
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-stone-900 font-mono-data">
              Download Calculation Sample
            </div>
            <p className="text-[11px] text-stone-600">
              Download a 60-month CSV projection of Direct vs Regular plan compounding calculations.
            </p>
          </div>
          <button
            onClick={handleDownloadSampleCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1A1A1A] hover:bg-black text-white text-xs font-medium font-mono-data transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadSuccess ? "Downloaded!" : "Export CSV"}</span>
          </button>
        </div>
      </section>

      {/* 6. Portfolio Overlap Methodology */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-3">
          <BookOpen className="w-5 h-5 text-stone-700" />
          <h2 className="text-2xl font-bold">5. Portfolio Overlap Formula</h2>
        </div>
        <p className="font-sans text-sm text-stone-700 leading-relaxed">
          To calculate commonality between two mutual funds (Fund A and Fund B), YieldNest applies the standard <strong>Szymkiewicz-Simpson minimum weight overlap coefficient</strong> across monthly factsheet holdings:
        </p>
        <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 space-y-3 font-sans">
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-mono text-xs text-stone-900 overflow-x-auto">
            {"Portfolio Overlap % = Sum_{i=1 to N} min(Weight_A(i), Weight_B(i))"}
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Where <code>Weight_A(i)</code> is the percentage holding of stock <code>i</code> in Fund A, and <code>Weight_B(i)</code> is the percentage holding of stock <code>i</code> in Fund B. Overlap greater than 40% typically indicates redundant portfolio replication.
          </p>
        </div>
      </section>

      {/* 7. Regulatory Disclaimers & Limits */}
      <section className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 space-y-3 font-sans">
        <div className="flex items-center gap-2 text-amber-950 font-serif-editorial text-lg font-bold">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <h3>Statutory Disclaimers, Limitations &amp; Scope</h3>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          <strong>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.</strong>
        </p>
        <ul className="text-xs text-amber-900/90 list-disc pl-5 space-y-1.5 leading-relaxed">
          <li>
            <strong>Past Performance Is Not Indicative of Future Returns:</strong> Historical rolling returns, CAGR rankings, and standard deviation metrics are descriptive of past performance and cannot guarantee future scheme outcomes.
          </li>
          <li>
            <strong>Education &amp; Research Only:</strong> YieldNest.online is an educational analytics portal. We do not provide personalized financial planning, portfolio advisory, investment recommendations, or tax counseling.
          </li>
          <li>
            <strong>Mathematical Approximations:</strong> Projections and simulations assume constant rate of return models. In real capital markets, returns are volatile and sequence-of-returns risk can significantly alter final wealth.
          </li>
        </ul>
      </section>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#EAE8E0] flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
        <button
          onClick={onNavigateHome}
          className="text-stone-700 hover:text-black font-semibold flex items-center gap-1 cursor-pointer"
        >
          ← Return to Homepage
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateCalculators()}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-800 font-medium cursor-pointer"
          >
            Launch Calculators
          </button>
          <button
            onClick={() => onNavigateHub("comparisons")}
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white rounded-lg font-medium cursor-pointer"
          >
            Explore Fund Comparisons →
          </button>
        </div>
      </div>
    </div>
  );
}
