"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, Loader2, Sparkles, Square, X } from "lucide-react";
import { CHAT_LIMITS, type ChatErrorBody, type ChatEvent, type ChatMessage } from "@/lib/chat";
import { RichText } from "./rich-text";
import { cn } from "@/lib/utils";

export interface ChatCopy {
  launcher: string;
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  suggestions: readonly string[];
  disclaimer: string;
}

/** History sent to the API: last N messages, starting with a user turn. */
function historyFor(messages: ChatMessage[]): ChatMessage[] {
  const recent = messages.slice(-CHAT_LIMITS.maxMessages);
  const firstUser = recent.findIndex((m) => m.role === "user");
  return recent.slice(Math.max(0, firstUser)).map((m) => ({
    role: m.role,
    content: m.content.slice(0, CHAT_LIMITS.assistantChars),
  }));
}

/** Floating "Ask Ammar" assistant: streams answers from /api/chat (Claude, grounded in the site). */
export function ChatWidget({ copy }: { copy: ChatCopy }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, error]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const appendToReply = (text: string) =>
    setMessages((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last?.role === "assistant")
        next[next.length - 1] = { ...last, content: last.content + text };
      return next;
    });

  const dropEmptyReply = () =>
    setMessages((prev) =>
      prev.at(-1)?.role === "assistant" && !prev.at(-1)?.content ? prev.slice(0, -1) : prev,
    );

  async function send(text: string) {
    const question = text.trim().slice(0, CHAT_LIMITS.userChars);
    if (!question || streaming) return;

    const history = [...messages, { role: "user" as const, content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyFor(history) }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const body = (await res.json().catch(() => null)) as ChatErrorBody | null;
        setError(body?.error ?? "Something went wrong. Please try again.");
        dropEmptyReply();
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as ChatEvent;
          if (event.type === "delta") appendToReply(event.text);
          else if (event.type === "error") {
            setError(event.message);
            dropEmptyReply();
          }
        }
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setError("Network error. Please check your connection and try again.");
      }
      dropEmptyReply();
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="ask-ammar"
        className={cn(
          "fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-card px-4 py-3 text-sm font-medium text-foreground shadow-[0_8px_32px_-8px_var(--brand)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6",
          open && "max-sm:hidden",
        )}
      >
        {open ? (
          <X className="size-4" aria-hidden="true" />
        ) : (
          <Sparkles className="size-4 text-brand" aria-hidden="true" />
        )}
        {open ? "Close" : copy.launcher}
      </button>

      {open && (
        <section
          id="ask-ammar"
          role="dialog"
          aria-label={copy.title}
          className="fixed inset-x-2 bottom-2 z-40 flex h-[min(36rem,calc(100dvh-1rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-22 sm:w-[24rem]"
        >
          <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
            <div>
              <h2 className="flex items-center gap-1.5 font-heading text-base font-semibold">
                <Sparkles className="size-4 text-brand" aria-hidden="true" />
                {copy.title}
              </h2>
              <p className="text-xs text-muted-foreground">{copy.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            data-lenis-prevent
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 text-sm leading-relaxed"
          >
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2">
              {copy.greeting}
            </div>

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-primary-foreground"
                >
                  {m.content}
                </div>
              ) : (
                <div key={i} className="max-w-[90%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2">
                  {m.content ? (
                    <RichText text={m.content} />
                  ) : (
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                      Thinking…
                    </span>
                  )}
                </div>
              ),
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-destructive"
              >
                {error}
              </p>
            )}

            {messages.length === 0 && (
              <ul className="flex flex-wrap gap-2 pt-1" aria-label="Suggested questions">
                {copy.suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-border p-3">
            <div className="flex items-end gap-2 rounded-xl border border-input bg-background/70 p-1.5 focus-within:border-ring">
              <label htmlFor="ask-ammar-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="ask-ammar-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={CHAT_LIMITS.userChars}
                placeholder={copy.placeholder}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              {streaming ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  aria-label="Stop generating"
                  className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground hover:bg-muted/70"
                >
                  <Square className="size-3.5 fill-current" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send"
                  className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
                >
                  <ArrowUp className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground">{copy.disclaimer}</p>
          </form>
        </section>
      )}
    </>
  );
}
