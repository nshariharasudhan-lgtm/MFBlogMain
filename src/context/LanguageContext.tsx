import React, { createContext, useContext, useState, useEffect } from "react";
import { SupportedLanguage, getStoredLanguage, setStoredLanguage, t, formatIndianWordsLocalized } from "../lib/i18n";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  formatWords: (val: number) => string;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  formatWords: (val: number) => String(val),
  isHindi: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => getStoredLanguage());

  const handleSetLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    setStoredLanguage(newLang);
  };

  useEffect(() => {
    // Sync html tag lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }

    const handleExternalChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: SupportedLanguage }>;
      if (customEvent.detail && customEvent.detail.lang) {
        setLanguageState(customEvent.detail.lang);
      }
    };

    window.addEventListener("yieldnest:lang_change", handleExternalChange);
    return () => {
      window.removeEventListener("yieldnest:lang_change", handleExternalChange);
    };
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t: (key: string) => t(key, language),
    formatWords: (val: number) => formatIndianWordsLocalized(val, language),
    isHindi: language === "hi",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
