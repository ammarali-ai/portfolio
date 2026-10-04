/** CV Ranker contract shared by the route and the UI (no server-only imports). */

export const RANKER_LIMITS = { cvMin: 50, cvMax: 12_000, jdMin: 50, jdMax: 6_000 } as const;

export interface RankResult {
  /** 0–100 match score. */
  score: number;
  verdict: string;
  matched: string[];
  missing: string[];
  suggestions: string[];
}

export interface RankResponse {
  result?: RankResult;
  error?: string;
}
