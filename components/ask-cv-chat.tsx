"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";

type Msg = { role: "user" | "model"; text: string };

export function AskCvChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "model",
      text: "Hi! I'm an AI assistant trained on Ammar's CV. Ask me anything about his experience, skills, or projects.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      // Non-stream fallback (e.g. when key missing -> JSON response)
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("text/event-stream")) {
        const data = await res.json();
        setMessages((m) => [
          ...m,
          {
            role: "model",
            text: data.answer ?? data.error ?? "Sorry, something went wrong.",
          },
        ]);
        return;
      }

      // Start a new assistant message we'll append to as tokens arrive
      setMessages((m) => [...m, { role: "model", text: "" }]);

      const reader = res.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          try {
            const payload = JSON.parse(line.slice(5).trim());
            if (payload.delta) {
              setMessages((m) => {
                const copy = m.slice();
                const last = copy[copy.length - 1];
                if (last && last.role === "model") {
                  copy[copy.length - 1] = { ...last, text: last.text + payload.delta };
                }
                return copy;
              });
            } else if (payload.error) {
              setMessages((m) => {
                const copy = m.slice();
                copy[copy.length - 1] = { role: "model", text: payload.error };
                return copy;
              });
            }
          } catch {
            // ignore malformed line
          }
        }
      }
    } catch {
      setMessages((m) => [...m, { role: "model", text: "Network error. Try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ask my CV"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet text-bg shadow-[0_0_30px_rgb(var(--accent-cyan)/0.5)] hover:scale-105 transition"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl glass shadow-2xl flex flex-col overflow-hidden"
            style={{ height: "min(70vh, 560px)" }}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Sparkles className="h-4 w-4 text-accent-cyan" />
              <div>
                <p className="text-sm font-semibold">Ask my CV</p>
                <p className="text-[10px] text-fg-muted">Powered by Gemini</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-accent-cyan to-accent-violet text-bg"
                        : "bg-bg-subtle border border-border text-fg"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-bg-subtle border border-border rounded-2xl px-3.5 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-fg-muted" />
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="border-t border-border p-3 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What's his NLP experience?"
                className="flex-1 bg-bg-subtle border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-accent-cyan/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet text-bg disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
