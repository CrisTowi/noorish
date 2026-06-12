export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'snack', 'dinner'];

export const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  snack: 'Snack',
  dinner: 'Dinner',
};

export const MEAL_TIMES: Record<MealType, string> = {
  breakfast: '8:00 AM',
  lunch: '12:30 PM',
  snack: '3:30 PM',
  dinner: '7:00 PM',
};

export interface Meal {
  name: string;
  protein: number;
}

export interface DayMeals {
  day: string;
  full: string;
  meals: Record<MealType, Meal>;
}

export type WeekId = 'week1' | 'week2';
