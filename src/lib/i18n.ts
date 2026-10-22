// YieldNest Internationalization & Hindi Localization Module
// Compliant with SEBI (Securities and Exchange Board of India) and AMFI (Association of Mutual Funds in India) official terminology.

export type SupportedLanguage = "en" | "hi";

export interface LanguageOption {
  code: SupportedLanguage | "ta" | "te" | "bn" | "mr";
  label: string;
  nativeLabel: string;
  enabled: boolean;
  comingSoonText?: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", enabled: true },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", enabled: true },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", enabled: false, comingSoonText: "விரைவில் / Coming Soon" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", enabled: false, comingSoonText: "త్వరలో / Coming Soon" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", enabled: false, comingSoonText: "শীঘ্রই / Coming Soon" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", enabled: false, comingSoonText: "लवकरच / Coming Soon" },
];

// Regulatory Bilingual Lexicon to ensure zero distortion of financial facts
export interface FinancialTerm {
  termEn: string;
  termHi: string;
  definitionEn: string;
  definitionHi: string;
  regulatorySource: string;
}

export const FINANCIAL_LEXICON: Record<string, FinancialTerm> = {
  mutual_fund: {
    termEn: "Mutual Fund",
    termHi: "म्यूचुअल फंड (सामूहिक निवेश योजना)",
    definitionEn: "A trust that collects money from investors and invests it in equities, bonds, or other securities under SEBI regulations.",
    definitionHi: "एक ऐसा ट्रस्ट जो कई निवेशकों से पूंजी एकत्रित कर उसे सेबी के नियमों के तहत शेयर, बॉन्ड या अन्य वित्तीय प्रतिभूतियों में निवेश करता है।",
    regulatorySource: "SEBI (Mutual Funds) Regulations, 1996",
  },
  direct_plan: {
    termEn: "Direct Plan",
    termHi: "डायरेक्ट प्लान (प्रत्यक्ष योजना)",
    definitionEn: "A mutual fund plan bought directly from the AMC without distributor commission, resulting in a lower expense ratio and higher compounding NAV.",
    definitionHi: "म्यूचुअल फंड की वह योजना जो बिना किसी वितरक या ब्रोकर के सीधे एएमसी (फंड हाउस) से खरीदी जाती है। इसमें कमीशन न होने से व्यय अनुपात (TER) कम और एनएवी (NAV) अधिक होता है।",
    regulatorySource: "SEBI Circular CIR/IMD/DF/21/2012",
  },
  regular_plan: {
    termEn: "Regular Plan",
    termHi: "रेगुलर प्लान (वितरक योजना)",
    definitionEn: "A mutual fund plan bought through a distributor or intermediary, where recurring trail commissions are deducted from the fund's NAV.",
    definitionHi: "वह योजना जो किसी डिस्ट्रीब्यूटर, ब्रोकर या बैंक के माध्यम से खरीदी जाती है, जिसमें निवेशक की एनएवी में से लगातार ट्रेल कमीशन काटा जाता है।",
    regulatorySource: "AMFI Guidelines / SEBI 2012 Mandate",
  },
  nav: {
    termEn: "Net Asset Value (NAV)",
    termHi: "नेट एसेट वैल्यू (NAV - प्रति यूनिट शुद्ध संपत्ति मूल्य)",
    definitionEn: "The market value per unit of a mutual fund scheme after deducting all liabilities and expenses.",
    definitionHi: "सभी देनदारियों और खर्चों को घटाने के बाद म्यूचुअल फंड की प्रति यूनिट का बाजार मूल्य।",
    regulatorySource: "AMFI Knowledge Centre (zoneName=NetAssetValueNAV)",
  },
  ter: {
    termEn: "Total Expense Ratio (TER)",
    termHi: "कुल व्यय अनुपात (TER / Expense Ratio)",
    definitionEn: "The annual percentage fee charged by the fund house to manage the portfolio, capped under Regulation 52 of SEBI MF Regulations.",
    definitionHi: "फंड प्रबंधन के लिए एएमसी द्वारा वसूला जाने वाला वार्षिक प्रतिशत शुल्क, जो सेबी विनियम 52 के तहत सीमित है।",
    regulatorySource: "SEBI Regulation 52",
  },
  sip: {
    termEn: "Systematic Investment Plan (SIP)",
    termHi: "सिस्टेमैटिक इन्वेस्टमेंट प्लान (SIP - व्यवस्थित निवेश योजना)",
    definitionEn: "A disciplined investment facility allowing periodic (monthly/quarterly) fixed investments, capturing rupee cost averaging.",
    definitionHi: "नियमित समयांतराल (मासिक/त्रैमासिक) पर निश्चित राशि निवेश करने की अनुशासित सुविधा, जिससे रुपया लागत औसत (Rupee Cost Averaging) का लाभ मिलता है।",
    regulatorySource: "AMFI Knowledge Centre (zoneName=SystematicInvestmentPlan)",
  },
  swp: {
    termEn: "Systematic Withdrawal Plan (SWP)",
    termHi: "सिस्टेमैटिक विथड्रॉल प्लान (SWP - व्यवस्थित निकासी योजना)",
    definitionEn: "A facility to withdraw a predetermined amount from a mutual fund scheme at specified regular intervals.",
    definitionHi: "म्यूचुअल फंड योजना से नियमित अंतरालों पर एक निश्चित राशि निकालने की सुविधा, जो नियमित आय और कर-कुशल नकदी प्रवाह प्रदान करती है।",
    regulatorySource: "AMFI Guidelines",
  },
  cagr: {
    termEn: "Compound Annual Growth Rate (CAGR)",
    termHi: "चक्रवृद्धि वार्षिक वृद्धि दर (CAGR)",
    definitionEn: "The mean annual growth rate of an investment over a specified time period longer than one year.",
    definitionHi: "एक वर्ष से अधिक की अवधि में किसी निवेश के वार्षिक चक्रवृद्धि विकास की सटीक औसत दर।",
    regulatorySource: "Standard Financial Reporting",
  },
  rolling_returns: {
    termEn: "Rolling Returns",
    termHi: "रोलिंग रिटर्न (Rolling Returns)",
    definitionEn: "Annualized returns calculated on a continuous basis across overlapping periods to eliminate point-to-point entry date bias.",
    definitionHi: "किसी निश्चित समयावधि (जैसे 3 वर्ष या 5 वर्ष) के दौरान हर दिन की गणना से प्राप्त रिटर्न, जो किसी एक दिन के बाजार स्तर के पक्षपात को समाप्त करता है।",
    regulatorySource: "Quantitative Analytics Standard",
  },
  large_cap: {
    termEn: "Large Cap",
    termHi: "लार्ज कैप (शीर्ष 100 सूचीबद्ध कंपनियां)",
    definitionEn: "1st to 100th companies in terms of full market capitalization as officially published semi-annually by AMFI.",
    definitionHi: "एम्फी द्वारा छमाही आधार पर प्रकाशित सूची के अनुसार पूर्ण बाजार पूंजीकरण के आधार पर शीर्ष 1 से 100 भारतीय कंपनियां।",
    regulatorySource: "SEBI Circular SEBI/HO/IMD/DF3/CIR/P/2017/114",
  },
  mid_cap: {
    termEn: "Mid Cap",
    termHi: "मिड कैप (101वीं से 250वीं कंपनी)",
    definitionEn: "101st to 250th companies in terms of full market capitalization as officially categorized by AMFI.",
    definitionHi: "पूर्ण बाजार पूंजीकरण के क्रम में 101वीं से लेकर 250वीं भारतीय कंपनियां।",
    regulatorySource: "SEBI Circular SEBI/HO/IMD/DF3/CIR/P/2017/114",
  },
  small_cap: {
    termEn: "Small Cap",
    termHi: "स्मॉल कैप (251वीं और आगे की कंपनियां)",
    definitionEn: "251st company onwards in terms of full market capitalization.",
    definitionHi: "पूर्ण बाजार पूंजीकरण में 251वें स्थान और उससे नीचे आने वाली सभी सूचीबद्ध कंपनियां।",
    regulatorySource: "SEBI Circular SEBI/HO/IMD/DF3/CIR/P/2017/114",
  },
};

// UI Translations dictionary
export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Navigation
    "nav.allResearch": "All Research",
    "nav.fundComparison": "Fund Comparisons",
    "nav.performanceAnalysis": "Performance Analysis",
    "nav.marketTrends": "Market Trends",
    "nav.categoryDeepDive": "Category Deep-Dive",
    "nav.sipTactics": "SIP Tactics",
    "nav.topicHubs": "Topic Hubs",
    "nav.calculators": "Calculators",
    "nav.faq": "FAQ",
    "nav.glossary": "Glossary",
    "nav.guides": "Guides",
    "nav.aboutUs": "About Us",
    "nav.terms": "Terms & Conditions",
    "nav.searchPlaceholder": "Search mutual funds, categories...",
    "nav.statutoryNotice": "Statutory Notice: Not SEBI or AMFI registered • Strictly for investor education",
    "nav.categoriesLabel": "Categories:",
    "nav.pagesToolsLabel": "Pages & Tools:",

    // Hero & Home
    "hero.badge": "Interactive Quantitative Suite",
    "hero.title": "Mutual Fund Interactive Calculators",
    "hero.subtitle": "Simulate Direct vs Regular TER drag, step-up SIP compounding, procrastination delay costs, and SIP vs lumpsum entry dynamics.",
    "hero.cta": "Launch All Calculators",
    "home.loading": "Loading data tools...",
    "home.noResults": "No mutual fund reports found matching",
    "home.clearFilters": "Clear all filters",
    "home.tagline": "Mutual Fund Data & Tools",
    "home.description": "Data-driven tools and historical metrics for Indian Mutual Funds. Scheme comparisons, compounding calculators, and factual educational guides on YieldNest.online.",

    // Article Reader
    "article.back": "Back to Guides",
    "article.copyLink": "Copy link",
    "article.copied": "Link copied",
    "article.readTime": "min read",
    "article.reads": "reads",
    "article.nonRegistered": "Non-SEBI / Non-AMFI Registered",
    "article.bylineDesk": "Editorial Desk",
    "article.bylineSub": "Quantitative Analysis",
    "article.toc": "Table of Contents",
    "article.disclaimerTitle": "Regulatory Disclaimer & Risk Notice",
    "article.disclaimerBody": "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Past performance does not guarantee future results. YieldNest is an independent data and tools publisher and does not provide investment advisory or brokerage services.",
    "article.languageToggle": "Read in",
    "article.provenanceTitle": "Regulatory & Factsheet Verification",
    "article.asOnDate": "As on date verified against official regulatory filings & AMFI disclosures.",

    // Calculators
    "calc.monthlyInvestment": "Monthly SIP Amount",
    "calc.expectedReturn": "Expected Annual Return (%)",
    "calc.timeHorizon": "Investment Horizon (Years)",
    "calc.totalInvested": "Total Amount Invested",
    "calc.estimatedGains": "Estimated Wealth Gain",
    "calc.futureCorpus": "Total Maturity Value",
    "calc.stepUpRate": "Annual Step-Up Rate (%)",
    "calc.lumpsumAmount": "One-Time Lumpsum Amount",
    "calc.monthlyWithdrawal": "Monthly Withdrawal Amount",
    "calc.directSavings": "Wealth Saved via Direct Plan",

    // Footer
    "footer.disclaimer": "YieldNest.online is an independent quantitative research and investor education publication. It is not an AMFI-registered Mutual Fund Distributor (ARN) nor a SEBI-registered Investment Adviser (RIA). We do not accept capital, execute financial transactions, or charge advisory fees. All content is strictly educational.",
    "footer.statutory": "Mutual fund investments are subject to market risks, read all scheme related documents carefully.",
    "footer.copyright": "YieldNest. All rights reserved. Data sourced from AMFI India, SEBI circulars, and official AMC disclosures.",
    "footer.language": "Language",
  },
  hi: {
    // Navigation
    "nav.allResearch": "सभी रिसर्च",
    "nav.fundComparison": "फंड तुलना",
    "nav.performanceAnalysis": "परफॉर्मेंस विश्लेषण",
    "nav.marketTrends": "मार्केट ट्रेंड्स",
    "nav.categoryDeepDive": "कैटेगरी विश्लेषण",
    "nav.sipTactics": "एसआईपी रणनीतियाँ",
    "nav.topicHubs": "विषय हब (Topic Hubs)",
    "nav.calculators": "कैलकुलेटर",
    "nav.faq": "अक्सर पूछे जाने वाले सवाल (FAQ)",
    "nav.glossary": "शब्दावली (Glossary)",
    "nav.guides": "गाइड्स",
    "nav.aboutUs": "हमारे बारे में",
    "nav.terms": "नियम व शर्तें",
    "nav.searchPlaceholder": "म्यूचुअल फंड, स्कीम या विषय खोजें...",
    "nav.statutoryNotice": "वैधानिक सूचना: सेबी या एम्फी में पंजीकृत नहीं • केवल निष्पक्ष निवेशक शिक्षा हेतु",
    "nav.categoriesLabel": "रिसर्च श्रेणियां:",
    "nav.pagesToolsLabel": "टूल्स और पेज:",

    // Hero & Home
    "hero.badge": "इंटरएक्टिव क्वांटिटेटिव कैलकुलेटर",
    "hero.title": "म्यूचुअल फंड गणना एवं योजना टूल्स",
    "hero.subtitle": "डायरेक्ट बनाम रेगुलर प्लान का कमीशन नुकसान, स्टेप-अप एसआईपी चक्रवृद्धि, निवेश में देरी की लागत और एकमुश्त बनाम एसआईपी की सटीक तुलना करें।",
    "hero.cta": "सभी कैलकुलेटर चलाएं",
    "home.loading": "रिसर्च इंडेक्स लोड हो रहा है...",
    "home.noResults": "इस खोज शब्द के लिए कोई म्यूचुअल फंड रिपोर्ट नहीं मिली",
    "home.clearFilters": "सभी फ़िल्टर हटाएं",
    "home.tagline": "स्वतंत्र म्यूचुअल फंड रिसर्च और डेटा एनालिटिक्स",
    "home.description": "भारतीय म्यूचुअल फंड्स पर डेटा-आधारित स्वतंत्र शोध। निष्पक्ष तुलना, रोलिंग रिटर्न का विश्लेषण, पोर्टफोलियो ओवरलैप और बाजार के रुझान।",

    // Article Reader
    "article.back": "रिसर्च सूची पर वापस जाएं",
    "article.copyLink": "लिंक कॉपी करें",
    "article.copied": "लिंक कॉपी हो गया",
    "article.readTime": "मिनट पढ़ने का समय",
    "article.reads": "बार पढ़ा गया",
    "article.nonRegistered": "गैर-सेबी / गैर-एम्फी पंजीकृत मंच",
    "article.bylineDesk": "रिसर्च डेस्क",
    "article.bylineSub": "क्वांटिटेटिव म्यूचुअल फंड एनालिसिस",
    "article.toc": "विषय-सूची (Table of Contents)",
    "article.disclaimerTitle": "नियामक अस्वीकरण एवं जोखिम सूचना",
    "article.disclaimerBody": "म्यूचुअल फंड निवेश बाजार के जोखिमों के अधीन हैं। योजना से संबंधित सभी दस्तावेजों (SID/KIM) को ध्यानपूर्वक पढ़ें। पिछला रिटर्न भविष्य के नतीजों की गारंटी नहीं देता है। YieldNest एक स्वतंत्र शैक्षिक शोध प्रकाशन है और किसी भी प्रकार की वित्तीय या ब्रोकरेज सलाह प्रदान नहीं करता है।",
    "article.languageToggle": "भाषा बदलें",
    "article.provenanceTitle": "नियामक व आधिकारिक फैक्टशीट सत्यापन",
    "article.asOnDate": "आधिकारिक सेबी सर्कुलर और एम्फी (AMFI) खुलासों के आधार पर सत्यापित डेटा।",

    // Calculators
    "calc.monthlyInvestment": "मासिक एसआईपी राशि",
    "calc.expectedReturn": "अपेक्षित वार्षिक रिटर्न (%)",
    "calc.timeHorizon": "निवेश समयावधि (वर्ष)",
    "calc.totalInvested": "कुल निवेशित राशि",
    "calc.estimatedGains": "अनुमानित लाभ (रिटर्न)",
    "calc.futureCorpus": "परिपक्वता पर कुल राशि",
    "calc.stepUpRate": "वार्षिक स्टेप-अप दर (%)",
    "calc.lumpsumAmount": "एकमुश्त निवेश राशि",
    "calc.monthlyWithdrawal": "मासिक निकासी राशि (SWP)",
    "calc.directSavings": "डायरेक्ट प्लान द्वारा अतिरिक्त बचत",

    // Footer
    "footer.disclaimer": "YieldNest.online एक स्वतंत्र विश्लेषणात्मक शोध एवं वित्तीय साक्षरता मंच है। यह न तो एम्फी पंजीकृत डिस्ट्रीब्यूटर (ARN) है और न ही सेबी पंजीकृत निवेश सलाहकार (RIA)। हम कोई निवेश राशि स्वीकार नहीं करते हैं और न ही कोई लेन-देन निष्पादित करते हैं। समस्त सामग्री केवल शैक्षिक उद्देश्यों के लिए है।",
    "footer.statutory": "म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं, योजना से जुड़े सभी दस्तावेजों को ध्यान से पढ़ें।",
    "footer.copyright": "YieldNest. सर्वाधिकार सुरक्षित। डेटा स्रोत: एम्फी इंडिया (AMFI), सेबी (SEBI) परिपत्र और आधिकारिक फंड हाउस फैक्टशीट।",
    "footer.language": "भाषा चयन (Language)",
  },
};

const STORAGE_KEY = "yieldnest_preferred_language";

export function getStoredLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "hi" || stored === "en") {
      return stored;
    }
  } catch {}
  return "en";
}

export function setStoredLanguage(lang: SupportedLanguage): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent("yieldnest:lang_change", { detail: { lang } }));
  } catch {}
}

export function t(key: string, lang: SupportedLanguage = "en"): string {
  const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
  return dict[key] || UI_TRANSLATIONS.en[key] || key;
}

export function formatIndianWordsLocalized(amount: number, lang: SupportedLanguage = "en"): string {
  if (isNaN(amount) || !isFinite(amount)) return "₹0";
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (lang === "hi") {
    if (abs >= 10000000) {
      return `${sign}₹${(abs / 10000000).toFixed(2)} करोड़`;
    } else if (abs >= 100000) {
      return `${sign}₹${(abs / 100000).toFixed(2)} लाख`;
    } else if (abs >= 1000) {
      return `${sign}₹${(abs / 1000).toFixed(1)} हज़ार`;
    }
    return `${sign}₹${Math.round(abs).toLocaleString("en-IN")}`;
  }

  // English fallback
  if (abs >= 10000000) {
    return `${sign}₹${(abs / 10000000).toFixed(2)} Crore`;
  } else if (abs >= 100000) {
    return `${sign}₹${(abs / 100000).toFixed(2)} Lakh`;
  } else if (abs >= 1000) {
    return `${sign}₹${(abs / 1000).toFixed(1)} Thousand`;
  }
  return `${sign}₹${Math.round(abs).toLocaleString("en-IN")}`;
}
