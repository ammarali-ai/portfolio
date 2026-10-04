# Muhammad Ammar Ali: Portfolio v2

Personal portfolio of an AI / AI-Automation / ML engineer. It shows working AI rather than just listing skills:

- a 3D neural-network hero
- an "Ask Ammar" assistant grounded in his resume
- real n8n workflows rendered as animated diagrams
- an ML model playground
- a terminal easter egg

> **Status:** Phases 1–6 of 7 are done (setup, foundation, core sections, signature features, AI features, projects & research). See [docs/PLAN.md](docs/PLAN.md) for the roadmap.
> The v1 site (Gemini chat + admin panel) is preserved on `main` until v2 ships.

## Tech stack

| Area          | Choice                                                                |
| ------------- | --------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict)     |
| Styling       | Tailwind CSS v4, shadcn/ui, `next-themes`                             |
| Motion & 3D   | `motion`, Lenis, React Three Fiber, drei (custom shaders, no post-FX) |
| Diagrams      | `@xyflow/react` (React Flow)                                          |
| Content       | Typed `content/*.ts` + MDX via `@next/mdx` (case studies, research)   |
| AI            | `@anthropic-ai/sdk` (Claude Haiku), streamed from a Route Handler     |
| Contact       | Resend + Zod                                                          |
| Rate limiting | Upstash Ratelimit (in-memory fallback)                                |
| Hosting       | Vercel + `@vercel/analytics`                                          |

## Getting started

Requires **Node.js ≥ 20.9**.

```bash
git clone https://github.com/ammarali-ai/portfolio.git
cd portfolio
git checkout v2
npm install
cp .env.example .env.local   # then fill in keys (optional for local UI work)
npm run dev                  # http://localhost:3000
```

> Keep the project **outside OneDrive/Dropbox**. Syncing `node_modules` and `.git` corrupts them.

### Scripts

| Command                       | What it does                      |
| ----------------------------- | --------------------------------- |
| `npm run dev`                 | Dev server                        |
| `npm run build` / `npm start` | Production build / serve          |
| `npm run lint`                | ESLint                            |
| `npm run typecheck`           | `tsc --noEmit`                    |
| `npm run format`              | Prettier + Tailwind class sorting |

## Environment variables

See [.env.example](.env.example). All keys are **server-only**.

| Variable                            | Needed for                                  | Required                |
| ----------------------------------- | ------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_SITE_URL`              | Canonical URLs, sitemap, OG images          | prod                    |
| `ANTHROPIC_API_KEY`                 | Ask Ammar assistant, CV ranker              | for AI features         |
| `ANTHROPIC_MODEL`                   | Model override (default `claude-haiku-4-5`) | no                      |
| `RESEND_API_KEY`                    | Contact form email                          | for contact             |
| `RESEND_FROM_EMAIL`                 | Verified sender address                     | for contact             |
| `CONTACT_TO_EMAIL`                  | Where contact messages go                   | for contact             |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | Distributed rate limiting                   | no (in-memory fallback) |

Without keys, the site still runs. AI and contact features show a friendly "not configured" message.

## Editing content

All text lives in `/content`. Components never hard-code copy. Types are in [content/schema.ts](content/schema.ts).

| What                                             | Where                                                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Name, roles, links, photo                        | `content/profile.ts`                                                                      |
| Stats strip                                      | `content/stats.ts` (every number has a `source`)                                          |
| Experience / education / skills / certifications | `content/*.ts`                                                                            |
| Research domains (match the 3D nodes)            | `content/domains.ts`                                                                      |
| Projects (cards + archive)                       | `content/projects.ts` (title, impact, tech, links, diagram)                               |
| Case study text (one per project)                | `content/case-studies/<slug>.mdx` (use `<Diagram />` for the animation)                   |
| Research posts                                   | `content/research.ts` (list) + `content/research/<slug>.mdx` (`draft: true` hides a post) |
| Contact automation (n8n / Zapier)                | `automations/README.md` + `automations/n8n/*.json`                                        |
| Automation gallery                               | `content/workflows-index.ts` + `content/workflows/*.json`                                 |
| AI assistant knowledge                           | `content/knowledge.md`                                                                    |

**Honesty rule:** only real, verifiable facts. Use `TODO:` for anything unknown.

### Animated diagrams (workflows and projects)

Every diagram is a `FlowSpec` in [content/flows.ts](content/flows.ts), animated with React Flow
(nodes light up rank by rank while data pulses travel along the edges). They appear on the homepage,
on each project card ("How it works") and on `/automations`.

**Adding one of your own n8n workflows:**

1. In n8n: open the workflow, then **⋯ → Download** to get the JSON.
2. Import it. The script keeps **only** node names, types and wiring, and drops parameters, prompts, URLs,
   credentials, webhook paths and pinned data:
   ```bash
   node scripts/import-n8n.mjs path/to/export.json my-workflow-slug
   ```
3. Check the node names in `content/workflows/my-workflow-slug.json` (they're published as-is), then
   register it in `content/flows.ts` with `n8nToFlow(...)`, add the id to `FlowId` in
   `content/schema.ts`, and list it in a category's `flagships` in `content/workflows-index.ts`.

**Client or employer work:** don't import the export. Hand-write the spec in `content/flows.ts` with generic
node labels (no client names) and `source: "n8n-anonymized"`.

### Resume PDF

`public/Muhammad-Ammar-Ali-Resume.pdf` is a **public copy with the phone number removed**. To update it:

1. Open a copy of the Word resume and delete the phone number from the contact line.
2. **File → Save As → PDF**, then replace `public/Muhammad-Ammar-Ali-Resume.pdf` (keep the filename).
3. Check it: run `pdftotext <file> -` and search the output for your number. It must not appear.

## AI features (Claude)

| Feature            | Where                         | How it works                                                                                                                                                                                            |
| ------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ask Ammar** chat | Floating button on every page | `/api/chat` streams Claude's answer as NDJSON. It's grounded only in the site's content: `lib/knowledge.ts` builds the knowledge base from `content/*.ts`, plus `content/knowledge.md` for extra facts. |
| **CV Ranker**      | `/tools/cv-ranker`            | `/api/rank-cv` uses Claude structured outputs (Zod schema) to return a score, matched and missing skills, and suggestions.                                                                              |

- **Model:** `claude-haiku-4-5` by default (fast and low-cost). Override with `ANTHROPIC_MODEL`.
- **Turning it on:** add `ANTHROPIC_API_KEY` to `.env.local` (local) or the Vercel project settings. Without a key, both features show a friendly "not switched on yet" message.
- **Cost guards:**

  | Feature   | Per-visitor limits               | Per-message limits                                          |
  | --------- | -------------------------------- | ----------------------------------------------------------- |
  | Chat      | 10 messages/minute and 60/day    | 800 characters, 12 messages of history, 1,024 output tokens |
  | CV Ranker | 5 runs per 10 minutes and 20/day | 12k-character CV, 6k-character job description              |

  Add Upstash keys so limits hold across serverless instances.

- **Safety:** the system prompt keeps the assistant on-topic and grounded, treats visitor text as untrusted, and never discusses anonymized client details. CV text is never logged.
- **Editing what the assistant knows:** change the content files (it updates automatically) or `content/knowledge.md`.

## Deploying to Vercel

1. Push to GitHub, then go to vercel.com → **Add New Project** and import `ammarali-ai/portfolio`.
2. Framework preset: Next.js (auto). Add the environment variables above.
3. The production branch is `main`. Branch `v2` gets preview deployments until it's merged.
4. Optional: add a custom domain and set `NEXT_PUBLIC_SITE_URL` to it.

## License

Code is MIT. Personal content (text, photos, resume) © Muhammad Ammar Ali, all rights reserved.
