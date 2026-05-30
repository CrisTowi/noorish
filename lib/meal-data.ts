// Seed data for the Noorish app

export const MEAL_TYPES = ["breakfast", "lunch", "snack", "dinner"] as const;
export type MealType = typeof MEAL_TYPES[number];

export const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snack: "Snack",
  dinner: "Dinner"
};

export const MEAL_TIMES: Record<MealType, string> = {
  breakfast: "8:00 AM",
  lunch: "12:30 PM",
  snack: "3:30 PM",
  dinner: "7:00 PM"
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

export interface WeekPlan {
  label: string;
  subtitle: string;
  days: DayMeals[];
}

export const MEAL_PLAN: Record<string, WeekPlan> = {
  week1: {
    label: "Week 1",
    subtitle: "Insulin Sensitivity & Gut Health",
    days: [
      { day: "Mon", full: "Monday", meals: { breakfast: { name: "Avocado & 3 Poached Eggs", protein: 30 }, lunch: { name: "Kale & Quinoa w/ 6oz Salmon", protein: 35 }, snack: { name: "¼ cup Pumpkin Seeds", protein: 15 }, dinner: { name: "6oz Beef & Broccoli Stir-fry", protein: 40 } } },
      { day: "Tue", full: "Tuesday", meals: { breakfast: { name: "Pumpkin Seed Chia Pudding w/ Collagen", protein: 30 }, lunch: { name: "Leftover Beef & Broccoli", protein: 35 }, snack: { name: "2 Hard Boiled Eggs w/ Sea Salt", protein: 15 }, dinner: { name: "6oz Baked Cod w/ Asparagus", protein: 40 } } },
      { day: "Wed", full: "Wednesday", meals: { breakfast: { name: "3-Egg Scramble w/ Spinach", protein: 30 }, lunch: { name: "Green Salad w/ 1.5 cans Sardines", protein: 35 }, snack: { name: "12 Walnuts & ½ cup Blueberries", protein: 15 }, dinner: { name: "6oz Roasted Chicken w/ Cauliflower", protein: 40 } } },
      { day: "Thu", full: "Thursday", meals: { breakfast: { name: "Berry Protein Smoothie (30g Whey/Pea)", protein: 30 }, lunch: { name: "6oz Turkey & Avocado Lettuce Wraps", protein: 35 }, snack: { name: "2 tbsp Almond Butter w/ Celery", protein: 15 }, dinner: { name: "6oz Ground Turkey w/ Zucchini Noodles", protein: 40 } } },
      { day: "Fri", full: "Friday", meals: { breakfast: { name: "Omelet w/ 3 Eggs & Turmeric", protein: 30 }, lunch: { name: "Mediterranean Bowl (6oz Chicken)", protein: 35 }, snack: { name: "½ Avocado w/ 2 tbsp Sunflower Seeds", protein: 15 }, dinner: { name: "6oz Wild Salmon w/ Bok Choy", protein: 40 } } },
      { day: "Sat", full: "Saturday", meals: { breakfast: { name: "6oz Smoked Salmon on Cucumber", protein: 30 }, lunch: { name: "Chickpea & Arugula w/ 5oz Grilled Chicken", protein: 35 }, snack: { name: "1 Apple w/ 15 Almonds", protein: 15 }, dinner: { name: "6oz Slow-cooked Lamb w/ Carrots", protein: 40 } } },
      { day: "Sun", full: "Sunday", meals: { breakfast: { name: "1 cup Tofu Scramble or 3 Eggs", protein: 30 }, lunch: { name: "6oz Roast Chicken Salad", protein: 35 }, snack: { name: "3 Brazil Nuts & 1 string cheese (A2)", protein: 15 }, dinner: { name: "6oz White Fish w/ Cauliflower", protein: 40 } } },
    ],
  },
  week2: {
    label: "Week 2",
    subtitle: "Estrogen Detox & Muscle Support",
    days: [
      { day: "Mon", full: "Monday", meals: { breakfast: { name: "1 cup A2 Greek Yogurt w/ Berries", protein: 30 }, lunch: { name: "6oz Chicken w/ Brussels Sprouts", protein: 35 }, snack: { name: "3oz Grilled Chicken Strips", protein: 15 }, dinner: { name: "6oz Beef Stuffed Peppers", protein: 40 } } },
      { day: "Tue", full: "Tuesday", meals: { breakfast: { name: "Shakshuka (3 Eggs in Tomato)", protein: 30 }, lunch: { name: "Leftover Stuffed Peppers", protein: 35 }, snack: { name: "1 cup Greek Yogurt (A2/Goat)", protein: 15 }, dinner: { name: "6oz Garlic Shrimp w/ Asparagus", protein: 40 } } },
      { day: "Wed", full: "Wednesday", meals: { breakfast: { name: "Protein Pancakes (2 Eggs + 1 scoop Protein)", protein: 30 }, lunch: { name: "6oz Salmon Salad w/ Pecans", protein: 35 }, snack: { name: "¼ cup Pecans", protein: 15 }, dinner: { name: "Herb Roasted Chicken w/ Greens", protein: 40 } } },
      { day: "Thu", full: "Thursday", meals: { breakfast: { name: "3 Spinach & Feta Egg Muffins", protein: 30 }, lunch: { name: "Quinoa & Veggie Soup (Bone Broth base)", protein: 35 }, snack: { name: "2 Hard Boiled Eggs & Pumpkin Seeds", protein: 15 }, dinner: { name: "6oz Grass-fed Burger (No bun)", protein: 40 } } },
      { day: "Fri", full: "Friday", meals: { breakfast: { name: "Chia Pudding w/ 1 scoop Protein", protein: 30 }, lunch: { name: "Big Salad w/ 3 Hard Boiled Eggs", protein: 35 }, snack: { name: "1 cup Cottage Cheese (A2) w/ Sunflower Seeds", protein: 15 }, dinner: { name: "6oz Baked Trout w/ Cabbage", protein: 40 } } },
      { day: "Sat", full: "Saturday", meals: { breakfast: { name: "5oz Steak & 2 Eggs w/ Greens", protein: 30 }, lunch: { name: "6oz Chicken & Avocado Salad", protein: 35 }, snack: { name: "¼ cup Sunflower Seeds", protein: 15 }, dinner: { name: "6oz Roasted Chicken w/ Root Mash", protein: 40 } } },
      { day: "Sun", full: "Sunday", meals: { breakfast: { name: "3-Egg Veggie Omelet", protein: 30 }, lunch: { name: "Leftover Root Mash & 5oz Chicken", protein: 35 }, snack: { name: "1oz Dark Chocolate & 10 Walnuts", protein: 15 }, dinner: { name: "6oz Baked Cod w/ Pesto", protein: 40 } } },
    ],
  },
};

// Shopping list data
export interface ShoppingItem {
  item: string;
  qty: string;
  swaps?: string[];
}

export interface ShoppingCategory {
  proteins: ShoppingItem[];
  produce: ShoppingItem[];
  pantry: ShoppingItem[];
}

export const SHOPPING_LIST: ShoppingCategory = {
  proteins: [
    { item: "Eggs (Pasture-raised)", qty: "5 Dozen", swaps: ["Liquid egg whites (2:1)", "Duck eggs (1:1)"] },
    { item: "Chicken Breast/Thighs", qty: "6 lbs", swaps: ["Turkey breast (1:1)", "Pork tenderloin (1:1)"] },
    { item: "Grass-fed Beef", qty: "3 lbs", swaps: ["Bison (1:1, leaner)", "Lamb (1:1)"] },
    { item: "Salmon / White Fish", qty: "5 lbs", swaps: ["Canned sardines (same omega-3)", "Trout (1:1)"] },
    { item: "Ground Turkey", qty: "2 lbs", swaps: ["Ground chicken (1:1)", "Ground bison (leaner)"] },
    { item: "Greek Yogurt / Cottage Cheese (A2)", qty: "5–6 tubs", swaps: ["Kefir (probiotic-rich)", "Skyr (higher protein)"] },
    { item: "Protein Powder & Collagen", qty: "1 tub each", swaps: ["Hemp protein (plant-based)", "Pea protein isolate"] },
  ],
  produce: [
    { item: "Greens (Spinach/Kale/Arugula)", qty: "4 large bags", swaps: ["Swiss chard", "Romaine"] },
    { item: "Cruciferous Veg (Broccoli, Cauliflower, Brussels, Cabbage)", qty: "1 head each", swaps: ["Kohlrabi", "Bok choy"] },
    { item: "Asparagus", qty: "2 bunches", swaps: ["Green beans", "Broccolini"] },
    { item: "Avocados", qty: "10", swaps: ["Tahini 2 tbsp", "Pumpkin seed butter 2 tbsp"] },
    { item: "Zucchini", qty: "4", swaps: ["Cucumber noodles", "Hearts of palm noodles"] },
    { item: "Bell Peppers", qty: "6", swaps: ["Poblano peppers", "Banana peppers"] },
    { item: "Celery", qty: "1 bunch", swaps: ["Cucumber sticks", "Jicama sticks"] },
    { item: "Berries", qty: "6 pints", swaps: ["Frozen berries (same nutrients)", "Pomegranate seeds"] },
    { item: "Apples", qty: "5", swaps: ["Pears (similar fiber)", "Asian pear"] },
    { item: "Ginger, Turmeric, Garlic", qty: "Fresh", swaps: ["Powder (½ tsp = 1 tsp fresh)", "Turmeric paste"] },
  ],
  pantry: [
    { item: "Pumpkin, Sunflower & Chia Seeds", qty: "1 bag each", swaps: ["Hemp seeds (more protein)", "Flaxseeds ground"] },
    { item: "Walnuts, Pecans, Brazil Nuts", qty: "1 bag each", swaps: ["Macadamia nuts", "Hazelnuts"] },
    { item: "Quinoa", qty: "1 large bag", swaps: ["Millet (1:1)", "Buckwheat groats (1:1)"] },
    { item: "Bone Broth", qty: "4 cartons", swaps: ["Veggie broth + collagen", "Mushroom broth"] },
    { item: "Dark Chocolate (85%+)", qty: "2 bars", swaps: ["Cacao nibs", "Carob chips (caffeine-free)"] },
    { item: "Olive Oil", qty: "1 bottle", swaps: ["Avocado oil (higher smoke point)", "Ghee"] },
    { item: "Spearmint Tea", qty: "1 box", swaps: ["Peppermint tea", "Raspberry leaf tea"] },
  ],
};

// Prep steps data
export interface PrepStep {
  title: string;
  description: string;
}

export const PREP_STEPS: PrepStep[] = [
  { title: "Boil Eggs", description: "Boil 18 eggs for snacks and breakfasts throughout the week." },
  { title: "Roast Chicken", description: "Roast 3 lbs chicken — 1 lb sliced for snacks, 2 lbs for meals." },
  { title: "Cook Quinoa", description: "Cook 3 cups quinoa (dry). Store in fridge for up to 5 days." },
  { title: "Chop & Roast Veg", description: "Chop all cruciferous veg. Roast one large tray immediately." },
  { title: "Portion Seeds & Nuts", description: "Divide seeds and nuts into ¼ cup servings in small containers." },
];

// Ingredient swap suggestions
export const INGREDIENT_SWAPS: Record<string, string[]> = {
  egg: ["Egg whites (2 per egg)", "Tofu scramble (equal volume)", "Duck egg (1:1)"],
  salmon: ["Canned sardines (same omega-3)", "Trout fillet (1:1)", "Mackerel (1:1)"],
  chicken: ["Turkey breast (1:1)", "Pork tenderloin (1:1)", "Tempeh (equal weight)"],
  beef: ["Bison (1:1, leaner)", "Lamb (1:1)", "Portobello (double volume)"],
  avocado: ["Tahini 2 tbsp", "Pumpkin seed butter 2 tbsp", "Hummus ¼ cup"],
  quinoa: ["Millet (1:1)", "Buckwheat groats (1:1)", "Cauliflower rice (double)"],
  default: ["Whole food alternative", "Plant-based swap", "Higher-protein option"],
};

// Helper function to get ingredient swaps
export function getIngredientSwaps(ingredientName: string): string[] {
  const lower = ingredientName.toLowerCase();
  for (const [key, swaps] of Object.entries(INGREDIENT_SWAPS)) {
    if (lower.includes(key)) return swaps;
  }
  return INGREDIENT_SWAPS.default;
}

// Get default ingredients for a meal
export function getDefaultIngredients(mealType: MealType) {
  const base = {
    breakfast: [
      { id: "b1", name: "Pasture-raised eggs", qty: 3, unit: "large", calories: 210, protein: 18, carbs: 1, fat: 15 },
      { id: "b2", name: "Avocado", qty: 0.5, unit: "whole", calories: 120, protein: 1, carbs: 6, fat: 11 },
      { id: "b3", name: "Baby spinach", qty: 1, unit: "cup", calories: 7, protein: 1, carbs: 1, fat: 0 },
      { id: "b4", name: "Olive oil", qty: 1, unit: "tsp", calories: 40, protein: 0, carbs: 0, fat: 5 },
    ],
    lunch: [
      { id: "l1", name: "Chicken breast", qty: 6, unit: "oz", calories: 185, protein: 35, carbs: 0, fat: 4 },
      { id: "l2", name: "Kale, chopped", qty: 2, unit: "cups", calories: 34, protein: 2, carbs: 7, fat: 0 },
      { id: "l3", name: "Quinoa, cooked", qty: 0.5, unit: "cup", calories: 111, protein: 4, carbs: 20, fat: 2 },
      { id: "l4", name: "Extra virgin olive oil", qty: 1, unit: "tbsp", calories: 120, protein: 0, carbs: 0, fat: 14 },
    ],
    snack: [
      { id: "s1", name: "Pumpkin seeds", qty: 0.25, unit: "cup", calories: 180, protein: 9, carbs: 3, fat: 14 },
      { id: "s2", name: "Sea salt", qty: 1, unit: "pinch", calories: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    dinner: [
      { id: "d1", name: "Grass-fed beef", qty: 6, unit: "oz", calories: 270, protein: 38, carbs: 0, fat: 13 },
      { id: "d2", name: "Broccoli florets", qty: 2, unit: "cups", calories: 54, protein: 4, carbs: 10, fat: 1 },
      { id: "d3", name: "Garlic cloves", qty: 2, unit: "cloves", calories: 9, protein: 0, carbs: 2, fat: 0 },
      { id: "d4", name: "Coconut aminos", qty: 1, unit: "tbsp", calories: 15, protein: 0, carbs: 4, fat: 0 },
      { id: "d5", name: "Sesame oil", qty: 1, unit: "tsp", calories: 40, protein: 0, carbs: 0, fat: 5 },
    ],
  };
  return base[mealType] || base.lunch;
}

// Calculate total protein for a day
export function getTotalProtein(day: DayMeals): number {
  return Object.values(day.meals).reduce((sum, m) => sum + m.protein, 0);
}

// Get all days flattened for easy access
export function getAllDays() {
  return [
    ...MEAL_PLAN.week1.days.map((d, i) => ({ week: "week1", dayIdx: i, label: `W1 · ${d.day}`, full: d.full })),
    ...MEAL_PLAN.week2.days.map((d, i) => ({ week: "week2", dayIdx: i, label: `W2 · ${d.day}`, full: d.full })),
  ];
}