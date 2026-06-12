# Noorish 🌿

> Eat with intention. Feel the difference.

A personalised 14-day nutrition protocol app — mobile-first, 5-screen iOS-style tracker built on Next.js 16 (App Router) and React 19.

## Features

- 📅 14-day personalised meal plans across **4 programs** (Hormone & Fat Loss, Muscle & Strength, Gut Reset, Energy & Focus)
- 🌱 5-step onboarding flow (name → goal → dietary preferences → confirmation)
- 🏅 Badge system — day badges (7 nature variants, each with unique motion) and weekly streak badges
- 🛒 Smart shopping list across Proteins, Produce, and Pantry
- 🤖 **AI-powered shopping suggestions** via Anthropic Claude Sonnet, personalised from your meal logs and swaps
- 🍽️ Meal logging, ingredient swaps, add/delete ingredients, weekly prep guide
- ❤️ Save favourite meals
- ✅ Track daily meal completion — earn a day badge when all four meals are checked
- 🎉 Celebration sheet when you complete a full week
- 🛡️ Error boundary with branded recovery screen
- 📱 Mobile-first responsive design (430 px max-width)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TypeScript (strict), CSS Modules per component
- **Fonts**: Cormorant Garamond + DM Sans via Google Fonts
- **AI**: Anthropic Claude Sonnet via `/api/suggestions` server-side proxy
- **Storage**: `localStorage` only (no database)
- **Auth**: None (public app, single-user)
- **Tooling**: Vitest, Storybook, ESLint (flat + legacy), Husky, lint-staged, Playwright (Storybook browser tests)

## Quick start

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local (optional — the app falls back to mock suggestions if unset)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run test` | Vitest in watch mode |
| `npm run test:run` | Vitest single run |
| `npm run test:ui` | Vitest with the Storybook browser test runner |
| `npm run storybook` | Launch Storybook on port 6006 |
| `npm run build-storybook` | Build the static Storybook |

## Deployment to Vercel

1. Connect the repo to Vercel (framework auto-detected: Next.js).
2. Set environment variable in **Vercel → Settings → Environment Variables**:
   - `ANTHROPIC_API_KEY` = `sk-ant-…` (optional, enables real AI suggestions; otherwise the app uses mock suggestions)
3. Deploy. The included `app/api/suggestions/route.ts` keeps the Anthropic key server-side; the `ShopScreen` client posts to `/api/suggestions`.

## Project structure

```
noorish-app/
├── app/
│   ├── api/
│   │   └── suggestions/
│   │       └── route.ts            # Anthropic API proxy (POST)
│   ├── globals.css                 # Reset, design tokens, shared keyframes
│   ├── layout.tsx                  # Root layout + metadata + Google Fonts
│   └── page.tsx                    # Entry — renders <NoorishApp />
├── components/
│   ├── NoorishApp/                 # Top-level orchestrator (ErrorBoundary + AppInner)
│   ├── ErrorBoundary/              # Crash-recovery class component
│   ├── Onboarding/                 # 5-step first-run flow
│   ├── TodayScreen/                # Today tab: meal checks, swap, log
│   ├── PlanScreen/                 # Plan tab: week tabs, day pills, meals, prep guide
│   ├── ShopScreen/                 # Shop tab: categories + AI suggestions
│   ├── SavedScreen/                # Saved tab: favourites
│   ├── ProfileScreen/              # Profile tab: lifetime stats, badges
│   ├── MealSheet/                  # Bottom sheet: meal detail + ingredients + swap
│   ├── Celebration/                # Weekly badge celebration sheet
│   ├── ProgramSheet/               # Program switcher with quit-confirm
│   ├── NavBtn/                     # Bottom-nav item
│   ├── BadgeIcon/                  # 7 animated nature-variant SVGs
│   ├── BadgeCircle/                # Badge wrapper (sand circle)
│   ├── Icon/                       # Inline SVG icon set
│   └── lib/                        # Shared logic
│       ├── types.ts
│       ├── persistence.ts          # loadState / saveState / usePersistedState
│       ├── meals.ts                # MEALS data, getMealDetails, getTotalProtein
│       ├── shopping.ts             # SHOPPING categories, swaps, prep steps
│       └── programs.ts             # PROGRAMS, GOALS, PREFS
├── docs/
│   ├── style-guide.html            # Full design system reference
│   └── CLAUDE_CODE_PROMPT.md       # Designer handoff brief
├── public/                         # Static assets
├── .storybook/                     # Storybook 10 config
├── .husky/                         # Pre-commit hook
└── vitest.config.ts                # Vitest + Playwright browser for Storybook
```

## Design system

The full design system — colors, typography, spacing, motion, all component patterns — is documented in `docs/style-guide.html`. Open it in a browser for the canonical reference.

Tokens are defined once in `app/globals.css` (`:root`) and consumed across every component via CSS Module `var(--…)` references.

## License

Private — internal Noorish project.
