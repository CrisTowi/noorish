// Database seed script
// Run with: npx tsx scripts/seed.ts

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { mealPlans, shoppingItems, prepSteps } from '../lib/db/schema';
import { MEAL_PLAN, SHOPPING_LIST, PREP_STEPS } from '../lib/meal-data';

const dbPath = process.env.LOCAL_DB_PATH || './noorish.db';
const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
const db = drizzle(sqlite);

function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  sqlite.exec('DELETE FROM meal_plans');
  sqlite.exec('DELETE FROM shopping_items');
  sqlite.exec('DELETE FROM prep_steps');

  // Seed meal plans
  for (const [weekKey, week] of Object.entries(MEAL_PLAN)) {
    for (let dayIdx = 0; dayIdx < week.days.length; dayIdx++) {
      const day = week.days[dayIdx];
      for (const [mealType, meal] of Object.entries(day.meals)) {
        db.insert(mealPlans).values({
          weekKey,
          dayIndex: dayIdx,
          dayName: day.day,
          dayFullName: day.full,
          mealType: mealType as 'breakfast' | 'lunch' | 'snack' | 'dinner',
          mealName: meal.name,
          proteinGrams: meal.protein,
        }).run();
      }
    }
  }
  console.log('✓ Seeded meal plans');

  // Seed shopping list
  const categories = ['proteins', 'produce', 'pantry'] as const;
  for (const category of categories) {
    const items = SHOPPING_LIST[category];
    for (const item of items) {
      db.insert(shoppingItems).values({
        category,
        itemName: item.item,
        quantity: item.qty,
        wasChecked: false,
      }).run();
    }
  }
  console.log('✓ Seeded shopping list');

  // Seed prep steps
  for (let i = 0; i < PREP_STEPS.length; i++) {
    const step = PREP_STEPS[i];
    db.insert(prepSteps).values({
      stepKey: `prep-${i}`,
      title: step.title,
      description: step.description,
      isCompleted: false,
    }).run();
  }
  console.log('✓ Seeded prep steps');

  console.log('✨ Database seeded successfully!');
}

seed();