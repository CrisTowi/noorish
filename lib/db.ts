// Database module - Turso for production
import { createClient } from '@libsql/client';
import type { MealType } from './meal-data';
import { SHOPPING_LIST } from './meal-data';

// Database configuration from environment
const databaseUrl = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Check if we're using Turso
const isProduction = !!databaseUrl && !!authToken;

// Database client (lazy initialization)
let db: ReturnType<typeof createClient> | null = null;
let initialized = false;

function getDb() {
  if (!db && isProduction && databaseUrl && authToken) {
    try {
      db = createClient({ url: databaseUrl, authToken });
    } catch (e) {
      console.error('Failed to create DB client:', e);
    }
  }
  return db;
}

// Types
export interface MealLog {
  id: number;
  date: string;
  mealType: MealType;
  mealName: string;
  proteinGrams: number;
  wasEaten: boolean;
}

export interface FavoriteItem {
  id: number;
  name: string;
  mealType: MealType;
  proteinGrams: number;
  calories: number;
  savedAt: number;
}

export interface ShoppingItem {
  id: number;
  category: 'proteins' | 'produce' | 'pantry';
  itemName: string;
  quantity: string;
  wasChecked: boolean;
}

// Initialize database tables
export async function initDatabase() {
  if (initialized) return;
  
  const client = getDb();
  if (!client) {
    console.log('DB not available, skipping initialization');
    return;
  }

  try {
    // Create tables if they don't exist
    await client.executeMultiple(`
      CREATE TABLE IF NOT EXISTS meal_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        meal_type TEXT NOT NULL,
        meal_name TEXT NOT NULL,
        protein_grams INTEGER DEFAULT 0,
        was_eaten INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
      );

      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        meal_type TEXT NOT NULL,
        protein_grams INTEGER DEFAULT 0,
        calories INTEGER DEFAULT 0,
        saved_at INTEGER DEFAULT (strftime('%s', 'now'))
      );

      CREATE TABLE IF NOT EXISTS shopping_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        item_name TEXT NOT NULL,
        quantity TEXT,
        was_checked INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS prep_steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        step_key TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        is_completed INTEGER DEFAULT 0,
        completed_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS user_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at INTEGER DEFAULT (strftime('%s', 'now'))
      );
    `);

    // Seed shopping items if empty
    const shopping = await client.execute('SELECT COUNT(*) as count FROM shopping_items');
    if (shopping.rows[0] && Number(shopping.rows[0].count) === 0) {
      const categories = ['proteins', 'produce', 'pantry'] as const;
      for (const category of categories) {
        for (const item of SHOPPING_LIST[category]) {
          await client.execute({
            sql: 'INSERT INTO shopping_items (category, item_name, quantity, was_checked) VALUES (?, ?, ?, 0)',
            args: [category, item.item, item.qty]
          });
        }
      }
    }

    initialized = true;
    console.log('Database initialized successfully');
  } catch (e) {
    console.error('Failed to initialize database:', e);
  }
}

// Meal logs
export async function getMealLogs(date: string): Promise<MealLog[]> {
  const client = getDb();
  if (!client) return [];

  try {
    const result = await client.execute({
      sql: 'SELECT id, date, meal_type, meal_name, protein_grams, was_eaten FROM meal_logs WHERE date = ?',
      args: [date]
    });

    return result.rows.map((row) => ({
      id: Number(row.id),
      date: String(row.date),
      mealType: row.meal_type as MealType,
      mealName: String(row.meal_name),
      proteinGrams: Number(row.protein_grams),
      wasEaten: Boolean(row.was_eaten)
    }));
  } catch (e) {
    console.error('Error getting meal logs:', e);
    return [];
  }
}

export async function addMealLog(log: Omit<MealLog, 'id'>): Promise<MealLog> {
  const client = getDb();
  if (!client) {
    return { ...log, id: Date.now() };
  }

  try {
    const result = await client.execute({
      sql: 'INSERT INTO meal_logs (date, meal_type, meal_name, protein_grams, was_eaten) VALUES (?, ?, ?, ?, ?)',
      args: [log.date, log.mealType, log.mealName, log.proteinGrams, log.wasEaten ? 1 : 0]
    });

    return { ...log, id: Number(result.lastInsertRowid) };
  } catch (e) {
    console.error('Error adding meal log:', e);
    return { ...log, id: Date.now() };
  }
}

export async function updateMealLog(id: number, wasEaten: boolean): Promise<void> {
  const client = getDb();
  if (!client) return;

  await client.execute({
    sql: 'UPDATE meal_logs SET was_eaten = ? WHERE id = ?',
    args: [wasEaten ? 1 : 0, id]
  });
}

// Favorites
export async function getFavorites(): Promise<FavoriteItem[]> {
  const client = getDb();
  if (!client) return [];

  try {
    const result = await client.execute(
      'SELECT id, name, meal_type, protein_grams, calories, saved_at FROM favorites ORDER BY saved_at DESC'
    );

    return result.rows.map((row) => ({
      id: Number(row.id),
      name: String(row.name),
      mealType: row.meal_type as MealType,
      proteinGrams: Number(row.protein_grams),
      calories: Number(row.calories),
      savedAt: Number(row.saved_at)
    }));
  } catch (e) {
    console.error('Error getting favorites:', e);
    return [];
  }
}

export async function addFavorite(fav: Omit<FavoriteItem, 'id'>): Promise<FavoriteItem> {
  const client = getDb();
  if (!client) {
    return { ...fav, id: Date.now() };
  }

  try {
    const result = await client.execute({
      sql: 'INSERT OR REPLACE INTO favorites (name, meal_type, protein_grams, calories, saved_at) VALUES (?, ?, ?, ?, ?)',
      args: [fav.name, fav.mealType, fav.proteinGrams, fav.calories, fav.savedAt]
    });

    return { ...fav, id: Number(result.lastInsertRowid) };
  } catch (e) {
    console.error('Error adding favorite:', e);
    return { ...fav, id: Date.now() };
  }
}

export async function removeFavorite(name: string): Promise<void> {
  const client = getDb();
  if (!client) return;

  await client.execute({
    sql: 'DELETE FROM favorites WHERE name = ?',
    args: [name]
  });
}

// Shopping
export async function getShoppingItems(): Promise<ShoppingItem[]> {
  const client = getDb();
  if (!client) {
    // Return default shopping list for local dev
    const items: ShoppingItem[] = [];
    const categories = ['proteins', 'produce', 'pantry'] as const;
    let id = 1;
    for (const category of categories) {
      for (const item of SHOPPING_LIST[category]) {
        items.push({ id: id++, category, itemName: item.item, quantity: item.qty, wasChecked: false });
      }
    }
    return items;
  }

  try {
    const result = await client.execute(
      'SELECT id, category, item_name, quantity, was_checked FROM shopping_items'
    );

    return result.rows.map((row) => ({
      id: Number(row.id),
      category: row.category as 'proteins' | 'produce' | 'pantry',
      itemName: String(row.item_name),
      quantity: String(row.quantity),
      wasChecked: Boolean(row.was_checked)
    }));
  } catch (e) {
    console.error('Error getting shopping items:', e);
    return [];
  }
}

export async function updateShoppingItem(itemName: string, wasChecked: boolean): Promise<void> {
  const client = getDb();
  if (!client) return;

  await client.execute({
    sql: 'UPDATE shopping_items SET was_checked = ? WHERE item_name = ?',
    args: [wasChecked ? 1 : 0, itemName]
  });
}

// Check if Turso is available
export function hasTurso(): boolean {
  return isProduction && !!db;
}

export { MealType };