# Muhammad Ammar Ali: Portfolio v2

Personal portfolio of an AI / AI-Automation / ML engineer. It shows working AI rather than just listing skills:

- a 3D neural-network hero
- an "Ask Ammar" assistant grounded in his resume
- real n8n workflows rendered as animated diagrams
- an ML model playground
- a terminal easter egg

> **Status:** Phases 1–2 of 7 (setup, foundation) are done. See [docs/PLAN.md](docs/PLAN.md) for the roadmap.
> The v1 site (Gemini chat + admin panel) is preserved on `main` until v2 ships.

## Tech stack

| Area          | Choice                                                            |
| ------------- | ----------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict) |
| Styling       | Tailwind CSS v4, shadcn/ui, `next-themes`                         |
| Motion & 3D   | `motion`, Lenis, React Three Fiber, drei, postprocessing          |
| Diagrams      | `@xyflow/react` (React Flow)                                      |
| Content       | Typed `content/*.ts` + MDX via Velite                             |
| AI            | `@anthropic-ai/sdk` (Claude Haiku), streamed from a Route Handler |
| Contact       | Resend + Zod                                                      |
| Rate limiting | Upstash Ratelimit (in-memory fallback)                            |
| Hosting       | Vercel + `@vercel/analytics`                                      |

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

| What                                             | Where                                                     |
| ------------------------------------------------ | --------------------------------------------------------- |
| Name, roles, links, photo                        | `content/profile.ts`                                      |
| Stats strip                                      | `content/stats.ts` (every number has a `source`)          |
| Experience / education / skills / certifications | `content/*.ts`                                            |
| Research domains (match the 3D nodes)            | `content/domains.ts`                                      |
| Projects (case studies)                          | `content/projects/*.mdx`                                  |
| Research notes                                   | `content/research/*.mdx` (`draft: true` hides a post)     |
| Automation gallery                               | `content/workflows-index.ts` + `content/workflows/*.json` |
| AI assistant knowledge                           | `content/knowledge.md`                                    |

**Honesty rule:** only real, verifiable facts. Use `TODO:` for anything unknown.

### Adding an n8n workflow to the gallery

1. In n8n: open the workflow, then **⋯ → Download** to get the JSON.
2. **Remove credentials and secrets**: delete every `credentials` block and any API keys, webhook IDs, emails or
   tokens in node `parameters`.
3. Save it as `content/workflows/<slug>.json` and add the slug to a category's `flagships` in
   `content/workflows-index.ts`.

## Deploying to Vercel

1. Push to GitHub, then go to vercel.com → **Add New Project** and import `ammarali-ai/portfolio`.
2. Framework preset: Next.js (auto). Add the environment variables above.
3. The production branch is `main`. Branch `v2` gets preview deployments until it's merged.
4. Optional: add a custom domain and set `NEXT_PUBLIC_SITE_URL` to it.

## License

Code is MIT. Personal content (text, photos, resume) © Muhammad Ammar Ali, all rights reserved.
