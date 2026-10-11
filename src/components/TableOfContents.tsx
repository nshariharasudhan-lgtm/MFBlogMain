import React, { useState } from "react";
import { ListTree, ChevronDown, ChevronUp, ArrowUp, Check, Copy, X } from "lucide-react";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  headings: TocHeading[];
  activeId: string;
  onHeadingClick: (e: React.MouseEvent, id: string) => void;
  readTimeMinutes?: number;
  className?: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export function TableOfContents({
  headings,
  activeId,
  onHeadingClick,
  readTimeMinutes,
  className = "",
  isMobileDrawer = false,
  onCloseMobileDrawer,
}: TableOfContentsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  // Calculate active index and progress
  const activeIndex = headings.findIndex((h) => h.id === activeId);
  const progressPercent = activeIndex >= 0 ? Math.round(((activeIndex + 1) / headings.length) * 100) : 0;

  const handleCopySectionLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = activeId
        ? `${window.location.origin}${window.location.pathname}#${activeId}`
        : window.location.href;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleTopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className={`bg-white rounded-2xl border border-[#EAE8E0] shadow-xs transition-all duration-200 overflow-hidden ${className}`}
    >
      {/* Header Bar */}
      <div
        className="p-4 sm:p-4.5 flex items-center justify-between cursor-pointer select-none border-b border-[#F0EEE6]"
        onClick={() => !isMobileDrawer && setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#FAF9F5] border border-stone-200/80 flex items-center justify-center text-stone-800 shrink-0">
            <ListTree className="w-3.5 h-3.5 text-stone-700" />
          </div>
          <div className="truncate">
            <h3 className="font-serif-editorial text-sm sm:text-base font-bold text-stone-900 tracking-tight leading-snug">
              Table of Contents
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] font-mono-data text-stone-500">
              <span>{headings.length} sections</span>
              {readTimeMinutes && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{readTimeMinutes} min</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {progressPercent > 0 && (
            <span className="text-[10px] font-mono-data font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
              {progressPercent}% read
            </span>
          )}

          {isMobileDrawer ? (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Close table of contents"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              className="p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label={isCollapsed ? "Expand table of contents" : "Collapse table of contents"}
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Reading Progress Indicator Bar */}
      {!isCollapsed && (
        <div className="w-full bg-[#FAF9F5] h-0.5 overflow-hidden">
          <div
            className="h-full bg-emerald-700 transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Headings List */}
      {!isCollapsed && (
        <div className="p-2 sm:p-2.5">
          <div className="max-h-[calc(100vh-18rem)] overflow-y-auto pr-1 space-y-0.5 overscroll-contain">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const isH3 = heading.level === 3;

              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    onHeadingClick(e, heading.id);
                    if (onCloseMobileDrawer) {
                      onCloseMobileDrawer();
                    }
                  }}
                  className={`group flex items-start gap-2 py-1.5 px-2.5 rounded-lg text-left transition-all relative ${
                    isH3 ? "pl-6 text-[11.5px]" : "text-xs font-medium"
                  } ${
                    isActive
                      ? "bg-emerald-50/90 text-emerald-950 font-semibold border-l-3 border-emerald-700"
                      : "text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F5] border-l-3 border-transparent"
                  }`}
                >
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                      isActive
                        ? "bg-emerald-700 ring-2 ring-emerald-200"
                        : isH3
                        ? "bg-stone-300 group-hover:bg-stone-400"
                        : "bg-stone-400 group-hover:bg-stone-600"
                    }`}
                  />
                  <span className="leading-snug break-words flex-1 line-clamp-2">
                    {heading.text}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Quick Nav Footer */}
          <div className="mt-2 pt-2 border-t border-[#F0EEE6] flex items-center justify-between text-[11px] font-mono-data text-stone-500 px-1.5">
            <button
              onClick={handleTopClick}
              className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors py-1"
            >
              <ArrowUp className="w-3 h-3 text-stone-500" />
              <span>Top of Article</span>
            </button>

            <button
              onClick={handleCopySectionLink}
              className="inline-flex items-center gap-1 text-stone-600 hover:text-emerald-700 transition-colors py-1"
              title="Copy link to current reading section"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-stone-400" />
                  <span>Copy Section</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
