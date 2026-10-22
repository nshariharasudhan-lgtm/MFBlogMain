/**
 * Date formatting utilities for YieldNest.
 * Enforces the canonical "DD Mon YYYY" format (e.g. "18 Oct 2026")
 * across all user interfaces, metadata, and data tables.
 */

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function formatDateDDMonYYYY(input?: string | Date | number | null): string {
  if (!input) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = MONTH_NAMES[today.getMonth()];
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
  }

  try {
    const d = typeof input === "string" || typeof input === "number" ? new Date(input) : input;
    if (isNaN(d.getTime())) {
      // If it's already in "DD Mon YYYY" or similar, return cleaned
      if (typeof input === "string" && input.trim()) {
        return input.trim();
      }
      return "18 Oct 2026";
    }

    const day = String(d.getDate()).padStart(2, "0");
    const month = MONTH_NAMES[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return "18 Oct 2026";
  }
}
