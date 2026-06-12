export interface ShoppingItem {
  item: string;
  qty: string;
}

export interface ShoppingCategory {
  proteins: ShoppingItem[];
  produce: ShoppingItem[];
  pantry: ShoppingItem[];
}

export const SHOPPING: ShoppingCategory = {
  proteins: [
    { item: 'Eggs (Pasture-raised)', qty: '5 Dozen' },
    { item: 'Chicken Breast/Thighs', qty: '6 lbs' },
    { item: 'Grass-fed Beef', qty: '3 lbs' },
    { item: 'Salmon / White Fish', qty: '5 lbs' },
    { item: 'Greek Yogurt / Cottage Cheese', qty: '5-6 tubs' },
    { item: 'Protein Powder & Collagen', qty: '1 tub each' },
  ],
  produce: [
    { item: 'Greens (Spinach/Kale/Arugula)', qty: '4 large bags' },
    { item: 'Broccoli, Cauliflower, Brussels', qty: '1 head each' },
    { item: 'Asparagus', qty: '2 bunches' },
    { item: 'Avocados', qty: '10' },
    { item: 'Berries', qty: '6 pints' },
    { item: 'Ginger, Turmeric, Garlic', qty: 'Fresh' },
  ],
  pantry: [
    { item: 'Pumpkin, Sunflower & Chia Seeds', qty: '1 bag each' },
    { item: 'Walnuts, Pecans, Brazil Nuts', qty: '1 bag each' },
    { item: 'Quinoa', qty: '1 large bag' },
    { item: 'Bone Broth', qty: '4 cartons' },
    { item: 'Olive Oil', qty: '1 bottle' },
  ],
};

const INGREDIENT_SWAPS: Record<string, string[]> = {
  egg: ['Egg whites (2 per egg)', 'Tofu scramble (equal volume)', 'Duck egg (1:1)'],
  salmon: ['Canned sardines (same omega-3)', 'Trout fillet (1:1)', 'Mackerel (1:1)'],
  chicken: ['Turkey breast (1:1)', 'Pork tenderloin (1:1)', 'Tempeh (equal weight)'],
  beef: ['Bison (1:1, leaner)', 'Lamb (1:1)', 'Portobello (double volume)'],
  avocado: ['Tahini 2 tbsp', 'Pumpkin seed butter 2 tbsp', 'Hummus 1/4 cup'],
  quinoa: ['Millet (1:1)', 'Buckwheat groats (1:1)', 'Cauliflower rice (double)'],
  seeds: ['Hemp seeds (more protein)', 'Flaxseeds ground', 'Chia seeds'],
  default: ['Whole food alternative', 'Plant-based swap', 'Higher-protein option'],
};

export function getIngredientSwaps(name: string): string[] {
  const lower = name.toLowerCase();
  for (const key of Object.keys(INGREDIENT_SWAPS)) {
    if (key !== 'default' && lower.includes(key)) {
      return INGREDIENT_SWAPS[key]!;
    }
  }
  return INGREDIENT_SWAPS.default!;
}

export interface PrepStep {
  id: string;
  title: string;
  desc: string;
  duration: string;
}

export const PREP_STEPS: PrepStep[] = [
  { id: 'p1', title: 'Boil eggs', desc: 'Boil 18 pasture-raised eggs. Store in fridge up to 7 days.', duration: '12 min' },
  { id: 'p2', title: 'Roast chicken', desc: 'Season 3 lbs chicken thighs with turmeric, garlic, olive oil. Roast at 400°F for 40 min.', duration: '45 min' },
  { id: 'p3', title: 'Cook quinoa', desc: 'Rinse 3 cups quinoa. Cook in bone broth 1:2 ratio, 15 min. Portion into 5 containers.', duration: '20 min' },
  { id: 'p4', title: 'Chop & roast veg', desc: 'Chop broccoli, cauliflower, Brussels sprouts. Toss with olive oil, roast at 425°F for 25 min.', duration: '30 min' },
  { id: 'p5', title: 'Portion seeds & nuts', desc: 'Divide pumpkin seeds, walnuts, pecans into ¼ cup portions in small containers.', duration: '10 min' },
];
