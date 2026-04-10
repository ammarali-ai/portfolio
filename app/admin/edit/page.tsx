import { redirect } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import { isAuthenticated } from "@/lib/auth";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

export const dynamic = "force-dynamic";

export default async function EditPage({
  searchParams,
}: {
  searchParams: Promise<{ file?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { file } = await searchParams;
  if (!file || !file.endsWith(".md") || file.includes("..")) {
    return <p className="text-fg-muted">Invalid file.</p>;
  }
  const fullPath = path.join(process.cwd(), "content", file);
  if (!fs.existsSync(fullPath)) {
    return <p className="text-fg-muted">File not found.</p>;
  }
  const initial = fs.readFileSync(fullPath, "utf8");

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-sm text-accent-cyan">{file}</h2>
      <MarkdownEditor file={file} initial={initial} />
    </div>
  );
}
