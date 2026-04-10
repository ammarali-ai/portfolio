"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, AlertCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: fd.get("password") }),
    });
    if (res.ok) router.push("/admin");
    else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-fg-muted uppercase tracking-wider mb-1.5">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full rounded-xl border border-border bg-bg-subtle px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/50"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        {loading ? "Signing in..." : "Sign in"}
      </button>

      {error && (
        <p className="flex items-center gap-2 text-sm text-rose-400">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}
    </form>
  );
}
