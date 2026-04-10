# Admin Guide

How to update your portfolio without writing code.

## Option 1 — Edit Markdown in VS Code (simplest)

1. Open any file in `content/` (e.g. `content/about.md`).
2. Change the text. Save.
3. Run `git add . && git commit -m "update about" && git push`.
4. Vercel redeploys automatically (~30s).

## Option 2 — Web Admin Panel

1. Go to `https://your-site.com/admin/login`.
2. Enter your admin password.
3. Click any markdown file in the dashboard.
4. Edit in the browser textarea.
5. Click **Save & commit** — the change commits to GitHub via API and Vercel redeploys.

### Setting Up the Admin Panel (one-time)

You need three env vars on Vercel:

1. **`ADMIN_PASSWORD_HASH`** — bcrypt hash of your admin password.
   Generate one with any online bcrypt tool, or run locally:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
   ```
2. **`ADMIN_SESSION_SECRET`** — random 32+ character string. Generate:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. **`GITHUB_TOKEN`** — fine-grained Personal Access Token with **Contents: Read & write** on this repo only.
   - https://github.com/settings/personal-access-tokens
   - Also set `GITHUB_OWNER` (e.g. `ammarali-ai`), `GITHUB_REPO` (e.g. `portfolio`), `GITHUB_BRANCH` (`main`).

Add all of these on Vercel → Project → Settings → Environment Variables → redeploy.

## Common Edits

### Update your bio
Edit `content/about.md` and `content/profile.md`.

### Add a project
Create `content/projects/<slug>.md` with frontmatter (see `README.md`). Done — it appears automatically.

### Update skills
Edit `content/skills.md`. Each category is a YAML entry with an `items` list.

### Add a job
Edit `content/experience.md` and add a new entry to the `items` list. Newest goes first.

### Add a certification
Edit `content/certifications.md`.

### Replace your resume PDF
Drop the new file at `public/resume/Muhammad_Ammar_Ali_Resume_2026.pdf` (same name) and push.

## Hard rules

- Do **not** invent content. Everything on the site should come from your CV unless you explicitly add it.
- Do **not** add paid services without thinking — the whole stack is free.
- The Office Taskboard is your personal project, displayed as a project card. Don't restyle the portfolio to look like a task board.
