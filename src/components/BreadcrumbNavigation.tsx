import React from "react";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

export interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
  includeSchema?: boolean;
  siteUrl?: string;
}

export function BreadcrumbNavigation({
  items,
  className = "",
  includeSchema = true,
  siteUrl = "https://www.yieldnest.online",
}: BreadcrumbNavigationProps) {
  if (!items || items.length === 0) return null;

  // Build Schema.org BreadcrumbList JSON-LD payload
  const schemaData = includeSchema
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => {
          const itemUrl = item.href
            ? item.href.startsWith("http")
              ? item.href
              : `${siteUrl}${item.href}`
            : undefined;

          return {
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(itemUrl ? { item: itemUrl } : {}),
          };
        }),
      }
    : null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-mono-data text-stone-500 overflow-x-auto whitespace-nowrap scrollbar-none py-1 ${className}`}
    >
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <ol className="flex items-center gap-1.5 list-none m-0 p-0">
        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1 || crumb.isCurrent;
          const isFirst = idx === 0;

          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight
                  className="w-3 h-3 text-stone-400 shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="text-stone-900 font-semibold truncate max-w-[200px] sm:max-w-[340px] md:max-w-md"
                  title={crumb.label}
                >
                  {crumb.label}
                </span>
              ) : crumb.onClick || crumb.href ? (
                <a
                  href={crumb.href || "#"}
                  onClick={(e) => {
                    if (
                      e.button === 0 &&
                      !e.metaKey &&
                      !e.ctrlKey &&
                      !e.shiftKey &&
                      !e.altKey &&
                      crumb.onClick
                    ) {
                      e.preventDefault();
                      crumb.onClick();
                    }
                  }}
                  className="hover:text-stone-900 text-stone-600 transition-colors inline-flex items-center gap-1 text-inherit no-underline"
                >
                  {isFirst && <Home className="w-3 h-3 text-stone-500 shrink-0" aria-hidden="true" />}
                  <span className="truncate max-w-[160px] sm:max-w-[220px]">{crumb.label}</span>
                </a>
              ) : (
                <span className="text-stone-600 truncate max-w-[160px] sm:max-w-[220px]">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
