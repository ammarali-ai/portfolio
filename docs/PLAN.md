# Portfolio v2: plan

## Context

Build a distinctive, content-rich AI/automation portfolio (prompt in conversation; depth reference nadeem.cloud).
Audit findings that shape the plan:

- `OneDrive\Desktop\my_portfolio` is a **broken partial copy**: only 13 route/page files remain. It has no package.json, layout, components or lib, and `.git` has no HEAD. The likely cause is OneDrive sync. The full old version (5 commits: Gemini chat, CV ranker, admin panel, blog, OG images) is on GitHub under `ammarali-ai`.
- Decisions made: **fresh build** in **`C:\dev\my_portfolio`**, porting good old parts; **Claude Haiku** for AI features.
- Reusable old code (copy and adapt):
  - `app/api/contact/route.ts`: Resend plus per-IP limit. Add Zod.
  - `app/api/chat/route.ts`: SSE streaming and guards. Swap Gemini for Anthropic.
  - `app/api/rank-cv/route.ts`: the CV ranker becomes a "live AI tool" demo.
  - `app/projects/[slug]/opengraph-image.tsx`, `app/blog/[slug]/opengraph-image.tsx`: OG images.
  - Old blog posts: recover from the GitHub repo.
- Drop: the admin panel (bcrypt/session). Content becomes typed files edited in git, which is simpler and safer.

## Content sources (what we found)

- **Resume**: the single source of truth. Phone number stays off the site; contact uses the Gmail address only.
- **Photos**: use photo 1 (yellow polo, outdoor, natural light) for hero/about and crop it to a portrait. Don't use photo 2 (bathroom mirror selfie). `OneDrive\Desktop\my pic.jpeg` is a backup option.
- **Real project folders on Desktop** (stronger than resume bullets):
  - Call Analyzer / Daniel-Call-Analyzer (Next.js app + n8n)
  - AI Meeting Notes Bot (n8n + Discord + Gemini + docx service)
  - TASKBoard Discord bot
  - Report generator / WBT lead intel
  - LangGraph project
  - LangChain models
  - Fake News Detection
- **Discrepancy to resolve**: `Fake News Detection/main.py` is Streamlit + TF-IDF + Multinomial NB (`.pkl`). The resume says BERT + SVM. The site will state only what the code or notebook proves. Check the notebook for BERT before publishing.
- **n8n workspace** (from screenshots), about 70+ workflows (exact count marked TODO):
  - Folders: practice 27, DANIEL-CALL-ANALYZER 10, reports 7, Office project 5, Call Analyzer 4, Metaviz Discord Bot 3
  - Loose workflows: about 20

  Grouped into showcase categories:

  | Category          | Workflows                                                                                                        |
  | ----------------- | ---------------------------------------------------------------------------------------------------------------- |
  | RAG & agents      | Drive+Gemini RAG chatbot, RAG Workflow vs RAG Agent, Inventory AI agent                                          |
  | Sales & leads     | Lead routing w/ Gemini sentiment + **model evaluation framework**, LinkedIn content creator                      |
  | Data extraction   | EmailHarvest Pro, Firecrawl extract, website email scrapers                                                      |
  | Ops & monitoring  | Metaviz Discord bot, task reminder → Discord DM, Unified Daily Schedule (Calendar+Discord+Sheets+Voice), reports |
  | Customer-facing   | Customer support workflow, Bella Vista bookings (demo), invoice workflow                                         |
  | Call intelligence | Call Analyzer suites                                                                                             |

  Practice/test duplicates (`test web email scrapper`, `My workflow 30`, `MANNUAL AUTOMATION`) get counted, not showcased.

## Stack options (summary) and pick

| Option                            | Pros                                                                                       | Cons                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Next.js 16 App Router + TS** ✅ | Route handlers for AI/contact, ISR, `next/og`, Vercel-native, your old code ports directly | Heavier than Astro                                                                |
| Astro + React islands             | Best raw Lighthouse                                                                        | Streaming chat/API routes and R3F islands are more awkward; old code doesn't port |
| Vite SPA                          | Simple                                                                                     | Poor SEO, no server routes                                                        |

**Final stack:**

- **Framework and UI:** Next.js 16 + TypeScript strict, Tailwind v4 + shadcn/ui, `motion` (Framer Motion), Lenis
- **3D and diagrams:** R3F + drei + postprocessing; `@xyflow/react` (React Flow)
- **Content:** Velite (typed MDX for projects/research)
- **AI and backend:** `@anthropic-ai/sdk` (Claude Haiku), Resend + Zod, Upstash Ratelimit (falls back to in-memory)
- **Hosting:** Vercel + `@vercel/analytics`, built-in sitemap/robots

## Key idea borrowed from nadeem.cloud, made unique

nadeem.cloud wins on **proof of volume**: deployment counts, an industries grid, "64 n8n workflows", and categorized tech.
Ammar's equivalent:

- **Automation Gallery**: category cards with honest workflow counts.
- **n8n JSON → React Flow renderer**: the 4–6 flagship workflows are exported from n8n (credentials stripped) to `content/workflows/*.json` and rendered as live, animated diagrams. That is real proof, not screenshots. It generalizes signature feature #4 (Monitoring & Alert flow).
- Skip: an empty testimonials section, fake client counts, and WhatsApp/phone links.

## Folder structure

```
app/(site)/page.tsx, projects/, projects/[slug]/, research/, research/[slug]/, automations/, resume/
app/api/chat/route.ts, api/contact/route.ts, api/rank-cv/route.ts
app/opengraph-image.tsx, sitemap.ts, robots.ts, layout.tsx
components/{layout,sections,three,flow,chat,terminal,ui}/
content/{profile,experience,skills,certifications,education,stats,domains,workflows-index}.ts
content/projects/*.mdx, content/research/*.mdx, content/workflows/*.json, content/knowledge.md
lib/{anthropic,ratelimit,n8n-to-flow,utils}.ts
public/img/me.jpg, public/resume.pdf
```

## Phases (stop for review after each)

1. **Setup**:
   - Scaffold in `C:\dev\my_portfolio`.
   - Clone the old repo alongside (`C:\dev\old_portfolio`) for reference and git history.
   - Connect a new GitHub repo/remote (ask before pushing).
   - Add `.env.example` (ANTHROPIC_API_KEY, RESEND_API_KEY, CONTACT_TO_EMAIL, RESEND_FROM_EMAIL, UPSTASH_REDIS_REST_URL/TOKEN).
2. **Foundation**:
   - Design tokens: navy/near-black background, cyan accent, violet secondary; dark-first with a light toggle.
   - Fonts: Space Grotesk / Inter / JetBrains Mono.
   - Navbar, footer, Lenis, reduced-motion handling.
   - All `content/*.ts` populated from the resume, with `TODO:` markers.
3. **Core sections**:
   - Hero (static poster), stats strip, tech marquee, domains, bento projects, experience timeline, skills, certifications, education, contact.
   - Stats come from the resume only: 92%, 900+, 3 languages, 2+ yrs. The workflow count is marked TODO.
4. **Signature features**:
   - 3D Neural Core (lazy, `ssr:false`, mobile/reduced-motion fallback)
   - Role rotator
   - n8n→React Flow renderer + Automation Gallery (`/automations`)
   - Terminal easter egg
5. **AI**:
   - `/api/chat` streams from Claude Haiku, grounded in `content/knowledge.md`, refuses off-topic requests, rate-limited.
   - Port the CV ranker as a `/tools/cv-ranker` demo on Claude.
6. **Projects & research**:
   - Velite MDX routes with filters.
   - Case-study template: Problem → Approach → Architecture → Results → Stack → Links.
   - Seed content: Call Analyzer, Meeting Notes Bot, Monitoring & Alert System, Rice Leaf, Cotton, Fake News, LangGraph project, and one draft research note per domain.
   - Recover the old blog posts.
7. **Polish & ship**:
   - Contact (Resend + Zod)
   - SEO: metadata, JSON-LD Person, OG images
   - Lighthouse ≥ 90, a11y pass, README, Vercel deploy

## Inputs needed from you (as phases reach them)

- The old repo's GitHub URL (or `gh` installed). Workflow JSON exports for flagship flows.
- Hugging Face Space URLs and GitHub links per project.
- Confirm the Fake News stack.
- Anthropic and Resend API keys (local `.env.local` only).

## Verification

- `npm run build`, `npm run lint`, `tsc --noEmit` clean each phase.
- `npm run dev`: click through every section at 375px, 768px and 1440px, toggle the theme, and emulate reduced motion.
- Chat: stream a response, then check off-topic refusal and a 429 after the limit.
- Contact: send a test email.
- Lighthouse on a Vercel preview: ≥ 90 on all four categories, with LCP not blocked by the canvas.
