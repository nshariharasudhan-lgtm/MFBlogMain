import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGE_OPTIONS, SupportedLanguage } from "../lib/i18n";

interface LanguageSelectorProps {
  variant?: "header" | "pill" | "footer";
  align?: "left" | "right" | "auto";
  className?: string;
}

export function LanguageSelector({
  variant = "header",
  align = "auto",
  className = "",
}: LanguageSelectorProps) {
  const { language, setLanguage, isHindi } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking or tapping outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  const handleSelect = (code: string, enabled: boolean) => {
    if (!enabled) return;
    setLanguage(code as SupportedLanguage);
    setIsOpen(false);
  };

  if (variant === "pill") {
    return (
      <div className={`inline-flex items-center rounded-lg p-0.5 bg-stone-200/80 border border-stone-300 text-xs ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer text-xs ${
            language === "en"
              ? "bg-white text-stone-900 shadow-2xs font-semibold"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLanguage("hi")}
          className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer text-xs ${
            language === "hi"
              ? "bg-[#1A1A1A] text-white shadow-2xs font-semibold"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          हिन्दी
        </button>
      </div>
    );
  }

  // Alignment classes for dropdown
  const alignmentClass =
    align === "left"
      ? "left-0 origin-top-left"
      : align === "right"
      ? "right-0 origin-top-right"
      : "left-0 sm:left-auto sm:right-0 origin-top-left sm:origin-top-right";

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 min-h-[38px] rounded-full text-xs font-medium border transition-all cursor-pointer shadow-2xs bg-white border-stone-300 text-stone-800 hover:bg-stone-50 hover:border-stone-400 active:scale-95 shrink-0"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change Language / भाषा बदलें"
      >
        <Globe className="w-3.5 h-3.5 text-stone-600 shrink-0" />
        <span className="font-medium tracking-tight text-xs">
          {currentOption.nativeLabel}
        </span>
        <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
          ({currentOption.code.toUpperCase()})
        </span>
        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={`${alignmentClass} absolute mt-1.5 w-64 max-w-[calc(100vw-2rem)] rounded-xl shadow-xl bg-white border border-stone-200 ring-1 ring-black/5 divide-y divide-stone-100 z-50 animate-in fade-in zoom-in-95 duration-100`}
        >
          <div className="p-2.5 bg-stone-50/80 rounded-t-xl border-b border-stone-100">
            <div className="text-[11px] font-semibold text-stone-900 flex items-center justify-between">
              <span>Select Language</span>
              <span className="font-normal text-stone-500">भाषा चुनें</span>
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              SEBI &amp; AMFI regulatory disclosures verified
            </div>
          </div>

          <div className="p-1 space-y-0.5 max-h-72 overflow-y-auto">
            {LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  disabled={!opt.enabled}
                  onClick={() => handleSelect(opt.code, opt.enabled)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-stone-100 text-stone-950 font-semibold"
                      : opt.enabled
                      ? "text-stone-700 hover:bg-stone-50 hover:text-stone-900 cursor-pointer"
                      : "text-stone-400 bg-transparent cursor-not-allowed opacity-75"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{opt.nativeLabel}</span>
                    <span className="text-[11px] text-stone-400">({opt.label})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {opt.enabled ? (
                      isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="text-[9px] font-mono uppercase bg-amber-50 text-amber-700 border border-amber-200/80 px-1.5 py-0.5 rounded">
                        {isHindi ? "शीघ्र" : "Soon"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-2 text-[10px] text-stone-500 bg-stone-50/50 rounded-b-xl text-center">
            {isHindi
              ? "सटीक वित्तीय शब्दावली व नियमों के साथ"
              : "Exact regulatory terminology & data integrity"}
          </div>
        </div>
      )}
    </div>
  );
}
