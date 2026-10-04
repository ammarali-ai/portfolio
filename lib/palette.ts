import type { DomainId } from "@/content/schema";

/**
 * Hex mirrors of the CSS tokens (globals.css) for places that can't read CSS variables,
 * i.e. the WebGL Neural Core. Keep in sync with --brand, --brand-2, --leaf, --sun, --flare.
 */
export const palette = {
  dark: {
    particle: "#5fdcf0",
    line: "#5fdcf0",
    domain: {
      automation: "#3fd6ef",
      agriculture: "#3fd9a4",
      cybersecurity: "#ff7a8a",
      fintech: "#f7c948",
      healthcare: "#a98bff",
    } satisfies Record<DomainId, string>,
  },
  light: {
    particle: "#0e7490",
    line: "#0e7490",
    domain: {
      automation: "#0e7490",
      agriculture: "#047857",
      cybersecurity: "#e11d48",
      fintech: "#b45309",
      healthcare: "#6d28d9",
    } satisfies Record<DomainId, string>,
  },
} as const;

/** Tailwind token classes per domain, for HTML legends next to the 3D scene. */
export const domainDotClass: Record<DomainId, string> = {
  automation: "bg-brand",
  agriculture: "bg-leaf",
  cybersecurity: "bg-flare",
  fintech: "bg-sun",
  healthcare: "bg-brand-2",
};
