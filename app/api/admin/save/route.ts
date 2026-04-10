import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { commitFile, isGithubConfigured } from "@/lib/github";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 200_000; // 200 KB cap per markdown file

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { file, content } = await req.json();
  if (
    typeof file !== "string" ||
    typeof content !== "string" ||
    !file.endsWith(".md") ||
    file.includes("..") ||
    file.startsWith("/")
  ) {
    return NextResponse.json({ error: "Invalid file path." }, { status: 400 });
  }
  if (Buffer.byteLength(content, "utf8") > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File too large." }, { status: 413 });
  }

  if (!isGithubConfigured()) {
    return NextResponse.json(
      { error: "GitHub not configured. Set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO." },
      { status: 503 },
    );
  }

  try {
    await commitFile(`content/${file}`, content, `chore(content): update ${file} via admin`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[save] error", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
