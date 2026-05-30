# Noorish App

A Next.js nutrition-focused meal planning app with 2-week meal plans, shopping lists, and ingredient swaps.

## Features

- 📅 2-week meal plan with daily protein targets
- 🛒 Shopping list organized by category (Proteins, Produce, Pantry)
- 🔄 Ingredient swaps for dietary preferences
- ❤️ Save favorite meals
- ✅ Track daily meal completion
- 📱 Mobile-first responsive design

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API routes
- **Database**: SQLite (local) / Turso (production)
- **ORM**: Drizzle ORM

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Seed the database:
```bash
npx tsx scripts/seed.ts
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Local SQLite (Development)
```bash
vercel
```

### Turso Database (Production)

1. Create a Turso database:
```bash
turso db create noorish
turso db show noorish --url
```

2. Update `.env.local` with your Turso credentials:
```
DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```

3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `TURSO_AUTH_TOKEN`

4. Deploy:
```bash
vercel --prod
```

## Project Structure

```
noorish-app/
├── app/
│   ├── api/
│   │   ├── meals/         # Meal plan API
│   │   ├── shopping/      # Shopping list API
│   │   ├── favorites/     # Favorites API
│   │   └── progress/      # Meal tracking API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main app page
├── components/
│   ├── Icons.tsx          # SVG icons
│   ├── BottomNavigation.tsx
│   ├── TodayScreen.tsx
│   ├── PlanScreen.tsx
│   ├── ShoppingScreen.tsx
│   ├── FavoritesScreen.tsx
│   └── MealDetailSheet.tsx
├── lib/
│   ├── db/
│   │   ├── schema.ts      # Database schema
│   │   └── index.ts       # Database connection
│   └── meal-data.ts       # Meal plan data
├── scripts/
│   └── seed.ts            # Database seeding
└── drizzle.config.ts     # Drizzle configuration
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/meals` | GET | Get all meal plans |
| `/api/meals` | POST | Log a meal as eaten |
| `/api/shopping` | GET | Get shopping list |
| `/api/shopping` | POST | Check/uncheck item |
| `/api/favorites` | GET | Get all favorites |
| `/api/favorites` | POST | Add/remove favorite |
| `/api/progress` | GET | Get daily progress |
| `/api/progress` | POST | Update meal status |