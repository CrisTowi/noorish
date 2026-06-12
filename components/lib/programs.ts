export type ProgramId = 'hormone' | 'muscle' | 'reset' | 'energy';

export interface Program {
  id: ProgramId;
  name: string;
  duration: string;
  desc: string;
  weeks: string[];
  active: boolean;
}

export const PROGRAMS: Program[] = [
  {
    id: 'hormone',
    name: 'Hormone & Fat Loss',
    duration: '14 days',
    desc: 'Insulin sensitivity, gut health, and estrogen detox. Designed for PCOS and endometriosis support.',
    weeks: ['Insulin Sensitivity & Gut Health', 'Estrogen Detox & Muscle Support'],
    active: true,
  },
  {
    id: 'muscle',
    name: 'Muscle & Strength',
    duration: '14 days',
    desc: 'High-protein, progressive loading support. Prioritises muscle protein synthesis and recovery.',
    weeks: ['Foundation & Protein Loading', 'Progressive Overload Nutrition'],
    active: false,
  },
  {
    id: 'reset',
    name: 'Gut Reset',
    duration: '7 days',
    desc: 'Anti-inflammatory, elimination-friendly. Removes common triggers and rebuilds gut lining.',
    weeks: ['Elimination & Repair'],
    active: false,
  },
  {
    id: 'energy',
    name: 'Energy & Focus',
    duration: '14 days',
    desc: 'Blood sugar regulation and mitochondrial support. Designed to eliminate crashes and brain fog.',
    weeks: ['Stabilise & Fuel', 'Optimise & Sustain'],
    active: false,
  },
];

export interface Goal {
  id: string;
  label: string;
  desc: string;
  icon: string;
}

export const GOALS: Goal[] = [
  { id: 'hormone', label: 'Hormone Balance', desc: 'PCOS, endometriosis, cycle support', icon: '\u25CE' },
  { id: 'reset', label: 'Gut Reset', desc: 'Anti-inflammatory, reduce bloating', icon: '\u25CE' },
  { id: 'muscle', label: 'Muscle & Strength', desc: 'High-protein, recovery focused', icon: '\u25CE' },
  { id: 'energy', label: 'Energy & Focus', desc: 'Beat fatigue and brain fog', icon: '\u25CE' },
];

export interface Pref {
  id: string;
  label: string;
}

export const PREFS: Pref[] = [
  { id: 'dairy_free', label: 'Dairy-free' },
  { id: 'gluten_free', label: 'Gluten-free' },
  { id: 'no_fish', label: 'No fish' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'no_red_meat', label: 'No red meat' },
  { id: 'nut_free', label: 'Nut-free' },
];
