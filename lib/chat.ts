/** Chat contract shared by the /api/chat route and the widget (no server-only imports). */

export const CHAT_LIMITS = {
  /** Max characters in a visitor's message. */
  userChars: 800,
  /** Max characters of an earlier assistant reply sent back as history. */
  assistantChars: 4000,
  /** Max messages of history sent per request (oldest are dropped client-side). */
  maxMessages: 12,
} as const;

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** One line of the newline-delimited JSON stream returned by /api/chat. */
export type ChatEvent =
  { type: "delta"; text: string } | { type: "done" } | { type: "error"; message: string };

/** Non-stream error body (400 / 429 / 503). */
export interface ChatErrorBody {
  error: string;
}
