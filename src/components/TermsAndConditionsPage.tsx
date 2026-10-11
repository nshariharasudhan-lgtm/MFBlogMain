import React from "react";
import {
  FileText,
  ShieldAlert,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Mail,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { ToolLayout } from "./ToolLayout";
import { SEOHead } from "./SEOHead";
import { ArticleCategory, SiteSettings } from "../types";

interface TermsAndConditionsPageProps {
  settings: SiteSettings;
  onNavigateHome: () => void;
  onSelectCategory?: (category: ArticleCategory | "all") => void;
  onNavigateCalculators?: () => void;
  onNavigateCalculator?: (target: string) => void;
  onNavigateFAQ?: () => void;
  onNavigateGlossary?: () => void;
  onNavigateGuides?: (target?: "index" | "how-to-choose" | "redemption") => void;
  onNavigateHubs?: () => void;
  onNavigateAbout?: () => void;
  onNavigateTerms?: () => void;
  onNavigateToolkit?: () => void;
  onSearchChange?: (q: string) => void;
  searchQuery?: string;
}

export function TermsAndConditionsPage({
  settings,
  onNavigateHome,
  onSelectCategory,
  onNavigateCalculators,
  onNavigateCalculator,
  onNavigateFAQ,
  onNavigateGlossary,
  onNavigateGuides,
  onNavigateHubs,
  onNavigateAbout,
  onNavigateTerms,
  onNavigateToolkit,
  onSearchChange,
  searchQuery,
}: TermsAndConditionsPageProps) {
  const breadcrumbs = [
    { label: "Home", href: "/", onClick: onNavigateHome },
    { label: "Terms & Conditions" },
  ];

  return (
    <ToolLayout
      title="Terms & Conditions of Use"
      intro="Please read these Terms and Conditions carefully before accessing or using YieldNest.online. By using our website, you agree to be bound by these provisions."
      badge="Legal & Regulatory Terms"
      breadcrumbs={breadcrumbs}
      settings={settings}
      onNavigateHome={onNavigateHome}
      onSelectCategory={onSelectCategory}
      onNavigateCalculators={onNavigateCalculators}
      onNavigateCalculator={onNavigateCalculator}
      onNavigateFAQ={onNavigateFAQ}
      onNavigateGlossary={onNavigateGlossary}
      onNavigateGuides={onNavigateGuides}
      onNavigateHubs={onNavigateHubs}
      onNavigateAbout={onNavigateAbout}
      onNavigateTerms={onNavigateTerms}
      onNavigateToolkit={onNavigateToolkit}
      activeMenu="terms"
      onSearchChange={onSearchChange}
      searchQuery={searchQuery}
    >
      <SEOHead
        settings={settings}
        customTitle="Terms & Conditions | YieldNest.online"
        customDescription="Official terms of use, legal notices, SEBI statutory disclaimers, and user agreements for YieldNest.online educational research platform."
        customKeywords="terms and conditions, legal disclaimer, mutual fund terms of use, SEBI disclaimer, YieldNest legal terms"
        urlPath="/terms"
      />

      <div className="space-y-8 pb-8 text-stone-800 text-sm leading-relaxed max-w-4xl">
        {/* Effective Date & Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 flex items-start gap-3 text-xs sm:text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-semibold block">Last Updated: October 2026</strong>
            <p className="text-amber-900 leading-relaxed">
              YieldNest.online is an educational, analytical, and informational resource. We are not registered with the Securities and Exchange Board of India (SEBI) as an Investment Adviser, Research Analyst, or Portfolio Manager. Nothing on this website constitutes investment advice.
            </p>
          </div>
        </div>

        {/* Quick Section Jump Buttons (1-2 Lines, No Horizontal Scroll) */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#EAE8E0] shadow-2xs space-y-2">
          <div className="text-[10px] font-mono-data font-semibold text-stone-500 uppercase tracking-wider">
            Jump to Section (Individual Buttons):
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <a
              href="#sec-acceptance"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1 shadow-2xs"
            >
              <span>01. Acceptance</span>
            </a>
            <a
              href="#sec-non-advisory"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1 shadow-2xs"
            >
              <span>02. Non-Advisory (SEBI)</span>
            </a>
            <a
              href="#sec-market-risks"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1 shadow-2xs"
            >
              <span>03. Market Risks</span>
            </a>
            <a
              href="#sec-data-accuracy"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1 shadow-2xs"
            >
              <span>04. Data Accuracy</span>
            </a>
            <a
              href="#sec-calculators"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1 shadow-2xs"
            >
              <span>05. Calculators</span>
            </a>
            <a
              href="#sec-user-conduct"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1 shadow-2xs"
            >
              <span>06. IP &amp; Use</span>
            </a>
            <a
              href="#sec-liability"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1 shadow-2xs"
            >
              <span>08. Liability</span>
            </a>
            <a
              href="#sec-governing-law"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F5] border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white transition-all no-underline inline-flex items-center gap-1 shadow-2xs"
            >
              <span>09. Jurisdiction</span>
            </a>
          </div>
        </div>

        {/* 1. Acceptance of Terms */}
        <section id="sec-acceptance" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs scroll-mt-24">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">01.</span>
            Acceptance of Terms
          </h2>
          <p className="text-stone-600">
            By visiting, accessing, browsing, or using any part of <strong>YieldNest.online</strong> (&ldquo;Website&rdquo;, &ldquo;Platform&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo;, or &ldquo;Us&rdquo;), you acknowledge that you have read, understood, and agreed to be bound by these Terms &amp; Conditions (&ldquo;Terms&rdquo;) and our Privacy Policy. If you do not agree to all terms and conditions set forth herein, you must immediately discontinue use of this Website.
          </p>
        </section>

        {/* 2. Educational & Non-Advisory Mandate (SEBI Disclaimer) */}
        <section id="sec-non-advisory" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-4 shadow-2xs scroll-mt-24">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">02.</span>
            Educational Mandate &amp; Strict Non-Advisory Disclaimer
          </h2>
          <div className="space-y-3 text-stone-600">
            <p>
              <strong>YieldNest.online is NOT a SEBI-registered Investment Adviser (RIA), Research Analyst (RA), Portfolio Manager, or Mutual Fund Distributor (MFD) under the SEBI (Investment Advisers) Regulations, 2013 or any other regulations.</strong>
            </p>
            <p>
              All materials, articles, comparison tables, factsheet decoders, glossary definitions, and calculator simulations provided on this Website are designed <strong>strictly for general educational, analytical, and informational purposes</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li>
                <strong>No Personalized Advice:</strong> None of the content considers your personal financial situation, risk appetite, tax status, investment horizon, or unique financial goals.
              </li>
              <li>
                <strong>No Endorsement or Solicitation:</strong> The mention of specific mutual fund schemes, Asset Management Companies (AMCs), benchmark indices, or asset classes does not constitute a recommendation, endorsement, solicitation, or offer to buy, sell, or hold any security.
              </li>
              <li>
                <strong>Consult Professionals:</strong> You are strongly advised to consult a certified SEBI-Registered Investment Adviser (RIA) or qualified tax consultant before making any financial commitments.
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Statutory Mutual Fund Risk Disclosure */}
        <section id="sec-market-risks" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs scroll-mt-24">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">03.</span>
            Statutory Mutual Fund Market Risk Disclosure
          </h2>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 space-y-2 text-xs sm:text-sm">
            <p className="font-semibold text-stone-900">
              Mutual fund investments are subject to market risks. Please read all scheme-related documents (Scheme Information Document - SID, Key Information Memorandum - KIM, and Statement of Additional Information - SAI) carefully before investing.
            </p>
            <p>
              Past performance, rolling CAGRs, standard deviations, and historical NAV metrics do not guarantee, promise, or indicate future returns. Net Asset Values (NAVs) fluctuate in response to equity market conditions, interest rate movements, credit events, and general economic developments.
            </p>
          </div>
        </section>

        {/* 4. Data Accuracy, AMFI Sourcing & Disclaimers */}
        <section id="sec-data-accuracy" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs scroll-mt-24">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">04.</span>
            Data Sources, AMFI Disclosures &amp; Accuracy
          </h2>
          <p className="text-stone-600">
            YieldNest compiles metrics from publicly available disclosures published by the Association of Mutual Funds in India (AMFI), AMC monthly factsheets, and regulatory circulars from SEBI.
          </p>
          <p className="text-stone-600">
            While we take reasonable diligence to ensure factual accuracy and note the specific observation date (e.g. &ldquo;As on September 2026&rdquo;) next to figures, financial data, Total Expense Ratios (TER), portfolio holdings, and NAVs change continually. YieldNest makes no warranties, express or implied, regarding the real-time completeness, accuracy, or uninterrupted availability of any data displayed on this Website.
          </p>
        </section>

        {/* 5. Financial Calculators & Mathematical Simulations */}
        <section id="sec-calculators" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs scroll-mt-24">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">05.</span>
            Financial Calculators &amp; Compounding Simulations
          </h2>
          <p className="text-stone-600">
            Our interactive calculators (SIP Calculator, Step-Up SIP Calculator, Lumpsum Calculator, SWP Calculator, Goal Planner, Tax Estimator, Cost of Delay, and Direct vs Regular Drag Calculator) execute client-side mathematical simulations based upon hypothetical input assumptions entered by you.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-sm">
            <li>
              Calculators assume uniform, constant annualized rates of return, whereas actual equity and debt markets experience continuous non-linear volatility.
            </li>
            <li>
              Calculations do not account for individual tax deductions, stamp duties, brokerage charges, or AMC exit loads unless explicitly indicated.
            </li>
            <li>
              Results are strictly illustrative and must not be interpreted as financial guarantees or future earnings promises.
            </li>
          </ul>
        </section>

        {/* 6. Intellectual Property & Permitted Use */}
        <section id="sec-user-conduct" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs scroll-mt-24">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">06.</span>
            Intellectual Property &amp; Permitted Personal Use
          </h2>
          <p className="text-stone-600">
            All original research articles, educational guides, computational models, user interface designs, visual layouts, and branding on YieldNest.online are protected under applicable Indian copyright, trademark, and intellectual property laws.
          </p>
          <p className="text-stone-600">
            You are granted a limited, revocable, non-exclusive license for personal, non-commercial use. You may share excerpts or links with appropriate attribution to YieldNest.online. Automated web scraping, bulk content redistribution, or commercial reproduction without prior written permission is strictly prohibited.
          </p>
        </section>

        {/* 7. Third-Party Portals & External Hyperlinks */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">07.</span>
            Third-Party Portals &amp; External Links
          </h2>
          <p className="text-stone-600">
            For investor convenience, our articles may contain hyperlinks to official third-party web portals, including AMFI India (amfiindia.com), MFCentral, CAMS, KFintech, SEBI, and individual AMC websites.
          </p>
          <p className="text-stone-600">
            YieldNest has no control over the content, uptime, privacy practices, or security standards of third-party websites. Inclusion of an external link does not imply endorsement or affiliation. Accessing external links is solely at your own risk.
          </p>
        </section>

        {/* 8. Limitation of Liability */}
        <section id="sec-liability" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs scroll-mt-24">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">08.</span>
            Limitation of Liability &amp; Disclaimer of Warranties
          </h2>
          <p className="text-stone-600">
            To the fullest extent permitted by applicable Indian law, YieldNest.online, its founders, authors, researchers, and technical operators shall NOT be liable for any direct, indirect, incidental, punitive, special, or consequential damages, financial losses, capital erosion, missed market opportunities, or tax penalties resulting from your access to or reliance upon any content or calculations on this Website.
          </p>
        </section>

        {/* 9. Governing Law & Dispute Resolution */}
        <section id="sec-governing-law" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs scroll-mt-24">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">09.</span>
            Governing Law &amp; Jurisdiction
          </h2>
          <p className="text-stone-600">
            These Terms &amp; Conditions shall be governed by, construed, and enforced in accordance with the laws of the Republic of India. Any disputes arising out of or related to the use of this Website shall fall under the exclusive jurisdiction of the competent courts in India.
          </p>
        </section>

        {/* 10. Modifications & Contact Inquiries */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E0] space-y-3 shadow-2xs">
          <h2 className="text-lg sm:text-xl font-serif-editorial font-bold text-stone-900 flex items-center gap-2">
            <span className="text-emerald-700 font-mono-data text-sm">10.</span>
            Modifications &amp; Contact Information
          </h2>
          <p className="text-stone-600">
            We reserve the right to revise or amend these Terms &amp; Conditions at our sole discretion at any time without prior notice. Revisions become effective immediately upon posting. Your continued use of the Website after any modifications constitutes acceptance of the updated Terms.
          </p>
          <div className="pt-3 border-t border-[#EAE8E0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-data text-stone-600">
            <div>
              <span>Inquiries regarding these Terms: </span>
              <a href="mailto:research@yieldnest.online" className="text-stone-900 underline font-semibold">
                research@yieldnest.online
              </a>
            </div>
            <div>YieldNest.online • Independent Investor Education</div>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
