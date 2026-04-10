// Minimal GitHub Contents API wrapper for the admin panel.
// Commits a markdown file change to the configured repo.

const API = "https://api.github.com";

function env() {
  return {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || "main",
  };
}

export function isGithubConfigured() {
  const e = env();
  return Boolean(e.token && e.owner && e.repo);
}

export async function getFile(filePath: string) {
  const { token, owner, repo, branch } = env();
  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(filePath)}?ref=${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub getFile failed: ${res.status}`);
  return (await res.json()) as { sha: string; content: string };
}

export async function commitFile(
  filePath: string,
  newContent: string,
  message: string,
) {
  const { token, owner, repo, branch } = env();
  const existing = await getFile(filePath).catch(() => null);
  const body = {
    message,
    content: Buffer.from(newContent, "utf8").toString("base64"),
    branch,
    ...(existing?.sha ? { sha: existing.sha } : {}),
  };
  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(filePath)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub commit failed: ${res.status} ${text}`);
  }
  return res.json();
}
