import "server-only";
import Anthropic from "@anthropic-ai/sdk";

/** Model for the site's AI features. Owner chose Claude Haiku (fast, low cost); override via env. */
export const CLAUDE_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5";

let client: Anthropic | null = null;

/**
 * Shared Anthropic client, or null when no API key is configured (features then show a
 * friendly "not configured" state instead of failing).
 */
export function getAnthropic(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) return null;
  client ??= new Anthropic();
  return client;
}

export { Anthropic };
