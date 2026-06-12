import type { DayMeals, Meal, WeekId } from './types';

export type { Meal };

export const MEALS: Record<WeekId, DayMeals[]> = {
  week1: [
    {
      day: 'Mon',
      full: 'Monday',
      meals: {
        breakfast: { name: 'Avocado & 3 Poached Eggs', protein: 30 },
        lunch: { name: 'Kale & Quinoa w/ Salmon', protein: 35 },
        snack: { name: 'Pumpkin Seeds', protein: 15 },
        dinner: { name: 'Beef & Broccoli Stir-fry', protein: 40 },
      },
    },
    {
      day: 'Tue',
      full: 'Tuesday',
      meals: {
        breakfast: { name: 'Pumpkin Seed Chia Pudding', protein: 30 },
        lunch: { name: 'Leftover Beef & Broccoli', protein: 35 },
        snack: { name: '2 Hard Boiled Eggs', protein: 15 },
        dinner: { name: 'Baked Cod w/ Asparagus', protein: 40 },
      },
    },
    {
      day: 'Wed',
      full: 'Wednesday',
      meals: {
        breakfast: { name: '3-Egg Scramble w/ Spinach', protein: 30 },
        lunch: { name: 'Green Salad w/ Sardines', protein: 35 },
        snack: { name: 'Walnuts & Blueberries', protein: 15 },
        dinner: { name: 'Roasted Chicken', protein: 40 },
      },
    },
    {
      day: 'Thu',
      full: 'Thursday',
      meals: {
        breakfast: { name: 'Berry Protein Smoothie', protein: 30 },
        lunch: { name: 'Turkey & Avocado Wraps', protein: 35 },
        snack: { name: 'Almond Butter & Celery', protein: 15 },
        dinner: { name: 'Ground Turkey & Zucchini', protein: 40 },
      },
    },
    {
      day: 'Fri',
      full: 'Friday',
      meals: {
        breakfast: { name: 'Omelet w/ Turmeric', protein: 30 },
        lunch: { name: 'Mediterranean Bowl', protein: 35 },
        snack: { name: 'Avocado & Seeds', protein: 15 },
        dinner: { name: 'Wild Salmon', protein: 40 },
      },
    },
    {
      day: 'Sat',
      full: 'Saturday',
      meals: {
        breakfast: { name: 'Smoked Salmon on Cucumber', protein: 30 },
        lunch: { name: 'Chickpea & Grilled Chicken', protein: 35 },
        snack: { name: 'Apple & Almonds', protein: 15 },
        dinner: { name: 'Slow-cooked Lamb', protein: 40 },
      },
    },
    {
      day: 'Sun',
      full: 'Sunday',
      meals: {
        breakfast: { name: 'Tofu Scramble', protein: 30 },
        lunch: { name: 'Roast Chicken Salad', protein: 35 },
        snack: { name: 'Brazil Nuts', protein: 15 },
        dinner: { name: 'White Fish & Cauliflower', protein: 40 },
      },
    },
  ],
  week2: [
    {
      day: 'Mon',
      full: 'Monday',
      meals: {
        breakfast: { name: 'Greek Yogurt w/ Berries', protein: 30 },
        lunch: { name: 'Chicken & Brussels Sprouts', protein: 35 },
        snack: { name: 'Chicken Strips', protein: 15 },
        dinner: { name: 'Beef Stuffed Peppers', protein: 40 },
      },
    },
    {
      day: 'Tue',
      full: 'Tuesday',
      meals: {
        breakfast: { name: 'Shakshuka (3 Eggs)', protein: 30 },
        lunch: { name: 'Leftover Stuffed Peppers', protein: 35 },
        snack: { name: 'Greek Yogurt', protein: 15 },
        dinner: { name: 'Garlic Shrimp & Asparagus', protein: 40 },
      },
    },
    {
      day: 'Wed',
      full: 'Wednesday',
      meals: {
        breakfast: { name: 'Protein Pancakes', protein: 30 },
        lunch: { name: 'Salmon Salad w/ Pecans', protein: 35 },
        snack: { name: 'Pecans', protein: 15 },
        dinner: { name: 'Herb Roasted Chicken', protein: 40 },
      },
    },
    {
      day: 'Thu',
      full: 'Thursday',
      meals: {
        breakfast: { name: 'Spinach & Feta Egg Muffins', protein: 30 },
        lunch: { name: 'Quinoa & Veggie Soup', protein: 35 },
        snack: { name: 'Eggs & Pumpkin Seeds', protein: 15 },
        dinner: { name: 'Grass-fed Burger', protein: 40 },
      },
    },
    {
      day: 'Fri',
      full: 'Friday',
      meals: {
        breakfast: { name: 'Chia Pudding w/ Protein', protein: 30 },
        lunch: { name: 'Big Salad & Hard Boiled Eggs', protein: 35 },
        snack: { name: 'Cottage Cheese & Seeds', protein: 15 },
        dinner: { name: 'Baked Trout w/ Cabbage', protein: 40 },
      },
    },
    {
      day: 'Sat',
      full: 'Saturday',
      meals: {
        breakfast: { name: 'Steak & 2 Eggs', protein: 30 },
        lunch: { name: 'Chicken & Avocado Salad', protein: 35 },
        snack: { name: 'Sunflower Seeds', protein: 15 },
        dinner: { name: 'Roasted Chicken & Root Mash', protein: 40 },
      },
    },
    {
      day: 'Sun',
      full: 'Sunday',
      meals: {
        breakfast: { name: '3-Egg Veggie Omelet', protein: 30 },
        lunch: { name: 'Root Mash & Chicken', protein: 35 },
        snack: { name: 'Dark Chocolate & Walnuts', protein: 15 },
        dinner: { name: 'Baked Cod w/ Pesto', protein: 40 },
      },
    },
  ],
};

export interface MealDetail {
  id: string;
  name: string;
  qty: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const BASE_DETAILS: Record<string, Omit<MealDetail, 'id'>[]> = {
  breakfast: [
    { name: 'Pasture-raised eggs', qty: 3, unit: 'large', calories: 210, protein: 18, carbs: 1, fat: 15 },
    { name: 'Avocado', qty: 0.5, unit: 'whole', calories: 120, protein: 1, carbs: 6, fat: 11 },
    { name: 'Baby spinach', qty: 1, unit: 'cup', calories: 7, protein: 1, carbs: 1, fat: 0 },
    { name: 'Olive oil', qty: 1, unit: 'tsp', calories: 40, protein: 0, carbs: 0, fat: 5 },
  ],
  lunch: [
    { name: 'Chicken breast', qty: 6, unit: 'oz', calories: 185, protein: 35, carbs: 0, fat: 4 },
    { name: 'Kale, chopped', qty: 2, unit: 'cups', calories: 34, protein: 2, carbs: 7, fat: 0 },
    { name: 'Quinoa, cooked', qty: 0.5, unit: 'cup', calories: 111, protein: 4, carbs: 20, fat: 2 },
    { name: 'Extra virgin olive oil', qty: 1, unit: 'tbsp', calories: 120, protein: 0, carbs: 0, fat: 14 },
  ],
  snack: [
    { name: 'Pumpkin seeds', qty: 0.25, unit: 'cup', calories: 180, protein: 9, carbs: 3, fat: 14 },
    { name: 'Sea salt', qty: 1, unit: 'pinch', calories: 0, protein: 0, carbs: 0, fat: 0 },
  ],
  dinner: [
    { name: 'Grass-fed beef', qty: 6, unit: 'oz', calories: 270, protein: 38, carbs: 0, fat: 13 },
    { name: 'Broccoli florets', qty: 2, unit: 'cups', calories: 54, protein: 4, carbs: 10, fat: 1 },
    { name: 'Garlic cloves', qty: 2, unit: 'cloves', calories: 9, protein: 0, carbs: 2, fat: 0 },
    { name: 'Coconut aminos', qty: 1, unit: 'tbsp', calories: 15, protein: 0, carbs: 4, fat: 0 },
    { name: 'Sesame oil', qty: 1, unit: 'tsp', calories: 40, protein: 0, carbs: 0, fat: 5 },
  ],
};

export function getMealDetails(mealType: string): MealDetail[] {
  const list = BASE_DETAILS[mealType] || BASE_DETAILS.lunch!;
  return list.map((i) => ({
    ...i,
    id: i.name + '_' + Math.random().toString(36).slice(2, 6),
  }));
}

export function getTotalProtein(day: DayMeals): number {
  return Object.values(day.meals).reduce((sum, meal) => sum + meal.protein, 0);
}
