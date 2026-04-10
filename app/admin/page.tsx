import { redirect } from "next/navigation";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { FileText, Edit3, AlertTriangle } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { isGithubConfigured } from "@/lib/github";

export const dynamic = "force-dynamic";

function listMarkdownFiles(): string[] {
  const root = path.join(process.cwd(), "content");
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  function walk(dir: string, rel: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const relPath = path.posix.join(rel, entry.name);
      if (entry.isDirectory()) walk(full, relPath);
      else if (entry.name.endsWith(".md")) out.push(relPath);
    }
  }
  walk(root, "");
  return out.sort();
}

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const files = listMarkdownFiles();
  const githubReady = isGithubConfigured();

  return (
    <div className="space-y-6">
      {!githubReady && (
        <div className="card border-amber-500/40 bg-amber-500/5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-300">GitHub not configured</p>
            <p className="text-xs text-fg-muted mt-1">
              Set <code className="font-mono text-accent-cyan">GITHUB_TOKEN</code>, <code className="font-mono text-accent-cyan">GITHUB_OWNER</code>, and <code className="font-mono text-accent-cyan">GITHUB_REPO</code> in your environment to enable saving from this panel. Without it, you can preview but not commit changes.
            </p>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="text-sm font-mono uppercase tracking-wider text-accent-cyan">Markdown Files</h2>
        <p className="text-xs text-fg-muted mt-1">
          Edit any file to update the live site. Changes commit to GitHub and Vercel auto-redeploys.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {files.map((f) => (
            <li key={f}>
              <Link
                href={`/admin/edit?file=${encodeURIComponent(f)}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-subtle px-4 py-3 hover:border-accent-cyan/40 transition group"
              >
                <span className="flex items-center gap-2 text-sm font-mono">
                  <FileText className="h-4 w-4 text-fg-muted group-hover:text-accent-cyan" />
                  {f}
                </span>
                <Edit3 className="h-4 w-4 text-fg-muted opacity-0 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
