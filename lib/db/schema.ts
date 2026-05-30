// Database Schema - Drizzle ORM
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Meal Plans (static data with customizations)
export const mealPlans = sqliteTable('meal_plans', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  weekKey: text('week_key').notNull(),  // 'week1' or 'week2'
  dayIndex: integer('day_index').notNull(),  // 0-6
  dayName: text('day_name').notNull(),  // 'Mon', 'Tue', etc.
  dayFullName: text('day_full_name').notNull(),  // 'Monday', etc.
  mealType: text('meal_type').notNull(),  // 'breakfast', 'lunch', 'snack', 'dinner'
  mealName: text('meal_name').notNull(),
  proteinGrams: integer('protein_grams').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Ingredient swaps for meals
export const ingredientSwaps = sqliteTable('ingredient_swaps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ingredientKey: text('ingredient_key').notNull(),
  mealPlanId: integer('meal_plan_id').references(() => mealPlans.id),
  originalIngredient: text('original_ingredient').notNull(),
  swappedIngredient: text('swapped_ingredient').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// User meal logs (tracking what was eaten)
export const mealLogs = sqliteTable('meal_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull(),  // 'YYYY-MM-DD'
  mealType: text('meal_type').notNull(),
  mealPlanId: integer('meal_plan_id').references(() => mealPlans.id),
  mealName: text('meal_name').notNull(),
  proteinGrams: integer('protein_grams').notNull(),
  calories: integer('calories'),
  wasEaten: integer('was_eaten', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Custom ingredients for meals
export const customIngredients = sqliteTable('custom_ingredients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mealPlanId: integer('meal_plan_id').references(() => mealPlans.id),
  name: text('name').notNull(),
  quantity: real('quantity').notNull(),
  unit: text('unit').notNull(),
  calories: integer('calories').default(0),
  proteinGrams: integer('protein_grams').default(0),
  carbsGrams: integer('carbs_grams').default(0),
  fatGrams: integer('fat_grams').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Favorite meals
export const favorites = sqliteTable('favorites', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mealName: text('meal_name').notNull(),
  mealType: text('meal_type').notNull(),
  proteinGrams: integer('protein_grams'),
  calories: integer('calories'),
  savedAt: integer('saved_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Shopping list items
export const shoppingItems = sqliteTable('shopping_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  category: text('category').notNull(),  // 'proteins', 'produce', 'pantry'
  itemName: text('item_name').notNull(),
  quantity: text('quantity'),
  wasChecked: integer('was_checked', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Prep steps (user progress)
export const prepSteps = sqliteTable('prep_steps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  stepKey: text('step_key').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' }).default(false),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// User settings
export const userSettings = sqliteTable('user_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});