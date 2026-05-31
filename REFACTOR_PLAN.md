# CSS Modules Migration Plan

## Overview
Migrate from global CSS classes in `globals.css` to CSS Modules for component-scoped styling.

---

## Phase 1: Project Setup

### 1.1 Install Dependencies
```bash
npm install --save-dev vitest @testing-library/react @testing-library/dom jsdom @vitejs/plugin-react husky lint-staged
```

### 1.2 Configure Vitest
Create `vitest.config.ts` in project root:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

### 1.3 Update package.json Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix"
  }
}
```

---

## Phase 2: CSS Modules Structure

### 2.1 Design Tokens (CSS Variables)
Extract tokens to `styles/tokens.css` (imported in globals.css):
- Colors: `--ink`, `--ink-soft`, `--muted`, `--olive`, etc.
- Typography: `--font-serif`, `--font-sans`
- Spacing: `--space-1` through `--space-12`
- Radius: `--radius`, `--radius-sm`, `--radius-full`
- Overlays: `--overlay-sheet`, `--overlay-modal`

### 2.2 Component Folder Structure
Each component has its own folder with related files:

```
components/
├── BottomNavigation/
│   ├── index.tsx
│   ├── BottomNavigation.module.css
│   └── BottomNavigation.test.tsx
├── TodayScreen/
│   ├── index.tsx
│   ├── TodayScreen.module.css
│   └── TodayScreen.test.tsx
├── MealDetailSheet/
│   ├── index.tsx
│   ├── MealDetailSheet.module.css
│   └── MealDetailSheet.test.tsx
├── FavoritesScreen/
│   ├── index.tsx
│   ├── FavoritesScreen.module.css
│   └── FavoritesScreen.test.tsx
├── PlanScreen/
│   ├── index.tsx
│   ├── PlanScreen.module.css
│   └── PlanScreen.test.tsx
├── ShoppingScreen/
│   ├── index.tsx
│   ├── ShoppingScreen.module.css
│   └── ShoppingScreen.test.tsx
└── Icons.tsx
```

### 2.3 Shared/Utility Classes
Create `styles/shared.module.css` for:
- Utility spacing classes (`mt-auto`, `mb-0`, `mb-1`, etc.)
- Shared layout classes (`flex-row-between`, `flex-col-center`)
- Text utility classes
- Loading/spinner styles

---

## Phase 3: Component Migration Order

### 3.1 Icons.tsx
- **Status**: No styling needed, skip

### 3.2 BottomNavigation.tsx → BottomNavigation.module.css
**Classes to extract:**
- `.bottomNav` → `.nav`
- `.navItem` → `.item`
- `.navIcon` → `.icon`
- `.navLabel` → `.label`

### 3.3 TodayScreen.tsx → TodayScreen.module.css
**Classes to extract:**
- `.pageHeader`, `.pageEyebrow`, `.pageTitle`, `.pageSubtitle`
- `.todayHero`, `.todayHeroDate`, `.todayHeroDay`, `.todayHeroMeta`, `.todayHeroPill`, `.todayHeroSub`
- `.progressRow`, `.progressTrack`, `.progressFill`, `.progressLabel`
- `.mealList`, `.sectionLabel`
- `.mealCard`, `.mealCardBody`, `.mealCardEaten`
- `.mealCheck`, `.mealCheckDone`, `.mealCheckAnimating`
- `.mealTypeBadge`, `.mealName`, `.mealMeta`
- `.mealSwapBtn`
- `.carouselScroll`, `.carouselTrack`, `.carouselCard`, `.carouselCardTop`
- `.modalOverlay`, `.modalSheet`, `.modalHandle`, `.modalTitle`, `.modalSub`
- `.swapOption`, `.swapDot`, `.swapOptionInfo`, `.swapOptionDay`, `.swapOptionName`, `.swapOptionProtein`
- Animation keyframes: `checkFill`, `checkmarkDraw`, `ringBurst`, `particle`

### 3.4 MealDetailSheet.tsx → MealDetailSheet.module.css
**Classes to extract:**
- `.sheetOverlay`, `.sheet`
- `.sheetHandleRow`, `.sheetHandleSpacer`, `.sheetHandleBar`, `.sheetHandleSpacerEnd`
- `.sheetClose`
- `.sheetHeader`, `.sheetBadge`, `.sheetTitleRow`, `.sheetTitle`, `.sheetFavBtn`
- `.sheetMacros`, `.macroPill`, `.macroVal`, `.macroValProtein`, `.macroLabel`
- `.sheetBody`, `.sheetSectionLabel`
- `.ingredientRow`, `.ingredientInfo`, `.ingredientName`, `.ingredientQty`, `.ingredientCal`
- `.ingredientActions`, `.ingredientBtn`, `.ingredientBtnDel`
- `.swapPanel`, `.swapPanelTitle`, `.swapPanelOption`, `.swapPanelDot`, `.swapPanelText`, `.swapPanelCancel`
- `.sheetAddRow`, `.sheetAddInput`, `.sheetAddBtn`
- `.sheetFooter`, `.sheetSaveBtn`, `.sheetSaveBtnSaved`
- Animation: `sheetUp`

### 3.5 FavoritesScreen.tsx → FavoritesScreen.module.css
**Classes to extract:**
- `.favEmpty`, `.favEmptyIcon`, `.favEmptyText`
- `.favCard`, `.favCardInfo`, `.favCardName`, `.favCardMeta`, `.favCardBordered`

### 3.6 PlanScreen.tsx → PlanScreen.module.css
**Classes to extract:**
- `.weekToggle`, `.weekBtn`
- `.dayScrollWrap`, `.dayScroll`, `.dayPill`, `.dpLabel`, `.dpNum`
- `.planCard`, `.planCardHeader`, `.planCardDay`, `.planCardMeta`
- `.planMealRow`, `.planMealType`, `.planMealName`, `.planMealProtein`
- `.prepBtn`, `.prepBtnLabel`, `.prepBadge`
- `.prepStep`, `.prepStepNum`, `.prepStepTitle`, `.prepStepDesc`
- `.prepStepNumDone`, `.prepStepTitleDone`, `.prepStepDescDone`

### 3.7 ShoppingScreen.tsx → ShoppingScreen.module.css
**Classes to extract:**
- `.catScroll`, `.catChips`, `.catChip`
- `.shopList`, `.shopItem`, `.shopItemInfo`
- `.shopCheck`, `.shopItemName`, `.shopItemQty`, `.shopSwapBtn`
- `.shopCheckChecked`, `.shopItemNameChecked`

---

## Phase 4: ESLint Configuration

###4.1 Create `.eslintrc.json`
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "prefer-const": "error",
    "no-var": "error",
    "eqeqeq": ["error", "always"],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "import/order": ["error", {
      "groups": [["external", "builtin"], "internal", "parent", "sibling", "index"],
      "newlines-between": "always",
      "alphabetize": { "order": "asc" }
    }],
    "import/no-duplicates": "error",
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/anchor-has-content": "warn",
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/no-noninteractive-tabindex": "warn"
  }
}
```

###4.2 Create `.eslintignore`
```
node_modules/
.next/
coverage/
*.config.js
*.config.ts
vitest.config.ts
```

### 4.3 Configure Pre-commit Hooks
Pre-commit hooks run ESLint + tests on staged files before each commit.

Create `lint-staged.config.js`:
```javascript
module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'vitest run'],
};
```

Initialize husky and add the pre-commit hook:
```bash
npx husky init
npx husky add .husky/pre-commit "npx lint-staged"
```

Update `package.json` prepare script:
```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

**Flow:** lint-staged → ESLint (fix) → Vitest → (all pass) → commit allowed

---

## Phase 5: Test Files (Vitest)

###5.1 Test File Structure
```
components/
├── __tests__/
│   ├── BottomNavigation.test.tsx
│   ├── TodayScreen.test.tsx
│   ├── MealDetailSheet.test.tsx
│   ├── FavoritesScreen.test.tsx
│   ├── PlanScreen.test.tsx
│   └── ShoppingScreen.test.tsx
```

### 5.2 Test Coverage Goals
- **Unit tests**: Test component rendering with props
- **Interaction tests**: Test button clicks, state changes
- **Snapshot tests**: Optional for complex components

### 5.3 Example Test Structure
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BottomNavigation } from '../BottomNavigation';

describe('BottomNavigation', () => {
  it('renders all nav items', () => {
    const onNavigate = vi.fn();
    render(<BottomNavigation active="today" onNavigate={onNavigate} />);
    
    expect(screen.getByRole('button', { name: 'Today' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Plan' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Shop' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Saved' })).toBeDefined();
  });

  it('calls onNavigate with correct key', async () => {
    const onNavigate = vi.fn();
    render(<BottomNavigation active="today" onNavigate={onNavigate} />);
    
    await fireEvent.click(screen.getByRole('button', { name: 'Plan' }));
    expect(onNavigate).toHaveBeenCalledWith('plan');
  });
});
```

---

## Phase 6: Vercel CI Configuration

### 6.1 Create `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

### 6.2 Create GitHub Actions Workflow (`.github/workflows/ci.yml`)
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run tests
        run: npm run test:run
      
      - name: Build
        run: npm run build
```

---

## Phase 7: Implementation Checklist

- [x] **Phase 1**: Install test dependencies + husky + lint-staged
- [x] **Phase 1**: Configure Vitest
- [x] **Phase 1**: Update package.json scripts
- [x] **Phase 2**: Create `styles/tokens.css`
- [x] **Phase 2**: Create `styles/shared.module.css`
- [x] **Phase 3.2**: Create `BottomNavigation.module.css` + update component
- [x] **Phase 3.3**: Create `TodayScreen.module.css` + update component
- [x] **Phase 3.4**: Create `MealDetailSheet.module.css` + update component
- [x] **Phase 3.5**: Create `FavoritesScreen.module.css` + update component
- [x] **Phase 3.6**: Create `PlanScreen.module.css` + update component
- [x] **Phase 3.7**: Create `ShoppingScreen.module.css` + update component
- [x] **Phase 4**: Create `.eslintrc.json`
- [x] **Phase 4**: Create `.eslintignore`
- [x] **Phase 4**: Configure pre-commit hooks with husky + lint-staged
- [x] **Phase 5**: Create test files for all components
- [x] **Phase 6**: Create `.github/workflows/ci.yml`
- [x] **Phase 6**: Verify CI passes

---

## File Changes Summary

### New Files to Create (16 files)
1. `vitest.config.ts`
2. `src/test/setup.ts`
3. `styles/tokens.css`
4. `styles/shared.module.css`
5. `components/BottomNavigation/index.tsx` + `.module.css` + `.test.tsx`
6. `components/TodayScreen/index.tsx` + `.module.css` + `.test.tsx`
7. `components/MealDetailSheet/index.tsx` + `.module.css` + `.test.tsx`
8. `components/FavoritesScreen/index.tsx` + `.module.css` + `.test.tsx`
9. `components/PlanScreen/index.tsx` + `.module.css` + `.test.tsx`
10. `components/ShoppingScreen/index.tsx` + `.module.css` + `.test.tsx`
11. `.eslintrc.json`
12. `.eslintignore`
13. `.github/workflows/ci.yml`
14. `lint-staged.config.js`
15. `.husky/pre-commit`

### Files Modified
1. `package.json` - Add test dependencies + scripts
2. `app/globals.css` - Cleanup, keep tokens only
3. `app/page.tsx` - Import updates for new component paths
4. `lib/db.ts` - Add FavoriteApiResponse type
5. `components/MealDetailSheet.tsx` - Import CSS module
6. `components/FavoritesScreen.tsx` - Import CSS module
7. `components/PlanScreen.tsx` - Import CSS module
8. `components/ShoppingScreen.tsx` - Import CSS module

---

## Migration Notes

### CSS Module Naming Convention
- Use camelCase for class names in JSX
- Keep original kebab-case names in CSS files
- Example: `className={styles.bottomNav}` → CSS class `.bottomNav`

### Keyframe Animations
- Animations can be defined in CSS Modules
- Global animations needed by multiple components should stay in `globals.css`

### CSS Custom Properties (Variables)
- Tokens defined in `:root` remain globally available
- Components can use `var(--token-name)` in CSS Modules

### Global CSS Cleanup
After migration, `globals.css` should only contain:
- CSS custom properties (design tokens)
- HTML/body reset styles
- Global animation keyframes
- `#app` container styles
