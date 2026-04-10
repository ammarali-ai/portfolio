"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function MarkdownEditor({ file, initial }: { file: string; initial: string }) {
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  async function save() {
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file, content }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("saved");
        setMessage("Saved. Vercel will redeploy in ~30s.");
      } else {
        setStatus("error");
        setMessage(data.error || "Save failed.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  }

  return (
    <div className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={28}
        className="w-full rounded-xl border border-border bg-bg-subtle px-4 py-3 font-mono text-xs outline-none focus:border-accent-cyan/50 resize-y"
        spellCheck={false}
      />
      <div className="flex items-center gap-3">
        <button onClick={save} disabled={status === "saving"} className="btn-primary">
          {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {status === "saving" ? "Saving..." : "Save & commit"}
        </button>
        {status === "saved" && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> {message}
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-1.5 text-xs text-rose-400">
            <AlertCircle className="h-3.5 w-3.5" /> {message}
          </span>
        )}
      </div>
    </div>
  );
}
