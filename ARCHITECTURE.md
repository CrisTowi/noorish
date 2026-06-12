# Architecture

A short tour of how Noorish v2 is organised.

## One folder per component

Every visual component lives in its own folder under `components/`:

```
components/<Name>/
  index.tsx              # the component (TypeScript, default export)
  <Name>.module.css      # colocated, scoped styles
  <Name>.test.tsx        # Vitest + Testing Library
  <Name>.stories.tsx     # Storybook story
```

Atoms (`Icon`, `BadgeIcon`, `BadgeCircle`, `NavBtn`) have stories but no tests where the story is sufficient. Screens and orchestrators get both.

## Shared logic lives in `components/lib/`

Pure functions and data, no React:

- `types.ts` — `MealType`, `MEAL_LABELS`, `MEAL_TIMES`, `WeekId`
- `persistence.ts` — `loadState`, `saveState`, `usePersistedState` (all `noorish_*` keys)
- `meals.ts` — `MEALS` data (week1 + week2), `getMealDetails`, `getTotalProtein`
- `shopping.ts` — `SHOPPING` categories, `getIngredientSwaps`, `PREP_STEPS`
- `programs.ts` — `PROGRAMS`, `GOALS`, `PREFS`

## The orchestrator: `components/NoorishApp/`

`NoorishApp` is the entry component exported by `app/page.tsx`. It is intentionally small:

```tsx
<ErrorBoundary>
  <AppInner />
</ErrorBoundary>
```

`AppInner` owns the top-level state (onboarded, user name, eaten, favourites, badges, active program, meal log, current sheet/tab/toast/celebration) and routes between screens. Screens are passed only the props they need — they don't share a store.

## State: `localStorage` only

Every persisted key is prefixed `noorish_` to avoid collisions. The hook `usePersistedState` handles SSR safety (returns `fallback` on the server) and writes on every change. No database, no auth, no user accounts.

## Styling: CSS Modules + design tokens

- `app/globals.css` declares design tokens (colors, fonts, spacing) in `:root` and the global keyframes used by multiple components.
- Each component's `<Name>.module.css` consumes those tokens via `var(--olive)`, `var(--ink-soft)`, etc. — **never** hard-code colors in module CSS.
- Class names inside module files use kebab-case (`.meal-row`, `.check-on`); the JSX uses `styles.mealRow`, `styles.checkOn`.
- Inline `style={{…}}` is reserved for genuinely dynamic values (computed widths, opacity based on state, animation flags).

## The AI feature

`ShopScreen` posts meal logs + overrides to `/api/suggestions`, which forwards the request to Anthropic with the server-side `ANTHROPIC_API_KEY` env var. If the key is unset or the call fails, the UI falls back to mock suggestions so the screen never breaks. Toggle real AI by setting the env var in Vercel and in `.env.local` for development.

## Testing

- Unit/interaction tests: Vitest + Testing Library (`npm run test:run`)
- Visual stories: Storybook 10 with the Vitest addon for in-browser story tests (`npm run storybook`, `npm run test:ui`)

ESLint runs on every commit via husky + lint-staged, and on every PR via `.github/workflows/ci.yml`.

## Adding a new screen

1. Create `components/<Name>/` with `index.tsx`, `<Name>.module.css`, `<Name>.test.tsx`, `<Name>.stories.tsx`.
2. Add a new entry to `NAV_ITEMS` in `components/NoorishApp/index.tsx` and a `{tab === '<id>' && <YourScreen … />}` branch in the orchestrator's scroll container.
3. Add new design tokens to `app/globals.css` if needed.
4. Update `README.md` and `docs/style-guide.html` if the screen introduces a new pattern.
