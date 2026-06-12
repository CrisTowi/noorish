# Noorish — Claude Code Deployment Brief

## What this is
Noorish is a personalised 14-day nutrition protocol app built in React. It is structured as a Next.js 14 project using the App Router. The entire UI lives in a single component file: `src/components/NoorishApp.jsx`.

## Stack
- **Framework**: Next.js 14 (App Router)
- **UI**: Single React component (~1,935 lines), inline styles only, no CSS framework
- **Fonts**: Cormorant Garamond + DM Sans via Google Fonts (loaded in component)
- **AI**: Anthropic Claude Sonnet via `/api/suggestions` proxy route
- **Storage**: localStorage (client-side only, no database required)
- **Auth**: None (public app, no login)

## Project structure
```
noorish/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout + metadata
│   │   ├── page.js            # Renders <NoorishApp />
│   │   ├── globals.css        # Minimal global reset
│   │   └── api/
│   │       └── suggestions/
│   │           └── route.js   # Anthropic API proxy (POST)
│   └── components/
│       └── NoorishApp.jsx     # Entire app (1,935 lines)
├── docs/
│   ├── style-guide.html       # Full design system reference
│   └── CLAUDE_CODE_PROMPT.md  # This file
├── public/                    # Empty, no static assets needed
├── package.json
├── next.config.js
├── .env.local.example
└── .gitignore
```

## Deploy to Vercel (recommended)

### Step 1 — Install and push
```bash
npm install
git init && git add . && git commit -m "Initial Noorish commit"
```

### Step 2 — Connect to Vercel
```bash
npx vercel
```
Follow the prompts. Select "Next.js" as framework (auto-detected).

### Step 3 — Set environment variable
In Vercel dashboard → Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-your-key-here
```
Or via CLI:
```bash
vercel env add ANTHROPIC_API_KEY
```

### Step 4 — Wire AI to the proxy
In `src/components/NoorishApp.jsx`, find the `generateSuggestions` function and change the fetch URL:
```js
// FROM:
fetch("https://api.anthropic.com/v1/messages", {
// TO:
fetch("/api/suggestions", {
```
Then remove the hardcoded headers (`Content-Type` stays, remove `x-api-key` and `anthropic-version`) since the proxy handles auth:
```js
fetch("/api/suggestions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }]
  })
})
```

### Step 5 — Deploy
```bash
vercel --prod
```

## Before going live — checklist
- [ ] Remove the DEMO SHORTCUT button in `NoorishApp.jsx` (search `DEMO SHORTCUT`)
- [ ] Set `ANTHROPIC_API_KEY` in Vercel environment variables
- [ ] Wire `/api/suggestions` proxy (Step 4 above)
- [ ] Add Privacy Policy link (recommended for public app using AI)
- [ ] Test on mobile Safari (iOS) — the primary target platform

## Key architecture decisions
- **No database** — all user state in localStorage (`noorish_*` keys). Simple, private, no GDPR complexity for MVP.
- **Single component** — intentional for this build. If splitting is needed, each screen (`TodayScreen`, `PlanScreen`, etc.) is already a named function and can be extracted.
- **AI is optional** — if `ANTHROPIC_API_KEY` is not set, the app falls back to mock suggestions. Everything else works without it.
- **Error boundary** — `ErrorBoundary` class wraps the whole app. Any crash shows a branded recovery screen.

## Future backend (when ready)
When you want to add user accounts and cloud sync, connect:
- **Auth**: Clerk or NextAuth
- **Database**: Supabase (Postgres) or PlanetScale
- **Schema**: `users`, `meal_logs`, `badges`, `programs` — map directly to existing localStorage keys
- **API routes**: Add `src/app/api/user/route.js` to sync state on login

## Design system
See `docs/style-guide.html` for the complete design system including colors, typography, spacing, motion, and all component patterns.
