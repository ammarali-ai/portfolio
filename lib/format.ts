import type { YearMonth } from "@/content/schema";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-01" → "Jan 2026". */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "Jan 2026 – Jun 2026" or "Jan 2026 – Present". */
export function formatRange(start: YearMonth, end: YearMonth | "present"): string {
  return `${formatYearMonth(start)} – ${end === "present" ? "Present" : formatYearMonth(end)}`;
}
