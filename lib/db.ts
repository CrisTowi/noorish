// Database module - simplified for Vercel serverless compatibility
// For local dev, uses in-memory state
// For production, can use Turso or other serverless databases

import type { MealType } from './meal-data';
import { SHOPPING_LIST } from './meal-data';

export interface MealLog {
  id: number;
  date: string;
  mealType: MealType;
  mealName: string;
  proteinGrams: number;
  wasEaten: boolean;
}

export interface FavoriteItem {
  name: string;
  mealType: MealType;
  proteinGrams: number;
  calories: number;
  savedAt: number;
}

export interface ShoppingItem {
  category: 'proteins' | 'produce' | 'pantry';
  itemName: string;
  quantity: string;
  wasChecked: boolean;
}

// In-memory storage (for serverless compatibility)
// In production, replace with Turso or similar
let mealLogs: MealLog[] = [];
let favorites: FavoriteItem[] = [];
let shoppingItems: ShoppingItem[] = [];

function initShopping() {
  if (shoppingItems.length === 0) {
    const categories = ['proteins', 'produce', 'pantry'] as const;
    for (const category of categories) {
      for (const item of SHOPPING_LIST[category]) {
        shoppingItems.push({
          category,
          itemName: item.item,
          quantity: item.qty,
          wasChecked: false,
        });
      }
    }
  }
}

// Initialize on module load
initShopping();

// Meal logs
export function getMealLogs(date: string) {
  return mealLogs.filter(log => log.date === date);
}

export function addMealLog(log: Omit<MealLog, 'id'>) {
  const id = mealLogs.length + 1;
  const newLog = { ...log, id };
  mealLogs.push(newLog);
  return newLog;
}

export function updateMealLog(id: number, wasEaten: boolean) {
  const log = mealLogs.find(l => l.id === id);
  if (log) {
    log.wasEaten = wasEaten;
  }
}

// Favorites
export function getFavorites() {
  return favorites;
}

export function addFavorite(fav: FavoriteItem) {
  const exists = favorites.some(f => f.name === fav.name);
  if (!exists) {
    favorites.push(fav);
  }
  return fav;
}

export function removeFavorite(mealName: string) {
  favorites = favorites.filter(f => f.name !== mealName);
}

// Shopping
export function getShoppingItems() {
  return shoppingItems;
}

export function updateShoppingItem(itemName: string, wasChecked: boolean) {
  const item = shoppingItems.find(i => i.itemName === itemName);
  if (item) {
    item.wasChecked = wasChecked;
  }
}

export type { MealType };