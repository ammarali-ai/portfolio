# Deployment Guide

Deploy this portfolio to Vercel for free in ~10 minutes.

## 1. Push to GitHub

```bash
cd c:/Users/User/Desktop/my_portfolio
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/ammarali-ai/portfolio.git
git push -u origin main
```

> If the repo doesn't exist yet, create it at https://github.com/new (name: `portfolio`, public).

## 2. Get Free API Keys

| Service | Where | Free Tier |
|---|---|---|
| [Google Gemini](https://aistudio.google.com/app/apikey) | AI Studio → Get API key | 15 RPM, 1M tokens/day |
| [Resend](https://resend.com/api-keys) | Sign up → API Keys | 3,000 emails/mo |
| GitHub Token | https://github.com/settings/personal-access-tokens → Fine-grained token, **Contents: Read & write** on this repo | Free |

## 3. Generate Admin Secrets

```bash
# bcrypt password hash
node -e "console.log(require('bcryptjs').hashSync('your-admin-password', 10))"

# session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Deploy on Vercel

1. Go to https://vercel.com/new and import the GitHub repo.
2. Framework: **Next.js** (auto-detected).
3. Click **Environment Variables** and add:

   ```
   NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
   GOOGLE_GENERATIVE_AI_API_KEY=...
   RESEND_API_KEY=...
   RESEND_FROM_EMAIL=onboarding@resend.dev
   RESEND_TO_EMAIL=muhammadammaralibhutta@gmail.com
   ADMIN_PASSWORD_HASH=...
   ADMIN_SESSION_SECRET=...
   GITHUB_TOKEN=...
   GITHUB_OWNER=ammarali-ai
   GITHUB_REPO=portfolio
   GITHUB_BRANCH=main
   ```

4. Click **Deploy**. Wait ~2 minutes.

## 5. Verify

- Visit your `*.vercel.app` URL — every page should render.
- Open the chatbot widget → ask "What's his NLP experience?" → should answer from CV.
- Submit the contact form → email should arrive.
- Visit `/admin/login` → log in → edit a markdown file → save → check that GitHub got a new commit.

## 6. Custom Domain (optional)

In Vercel → Project → Settings → Domains, add your custom domain and follow the DNS instructions.

## Notes

- The site is fully static + serverless functions. **Total cost on free tier: $0/month.**
- Vercel auto-deploys every push to `main`.
- The admin panel commits to `main` via the GitHub API, which triggers a redeploy.
- All AI/email/auth features degrade gracefully if env vars are missing — the site never breaks.
