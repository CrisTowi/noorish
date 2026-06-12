import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MealSheet } from './index';

const meta: Meta<typeof MealSheet> = {
  title: 'Screens/MealSheet',
  component: MealSheet,
};
export default meta;
type Story = StoryObj<typeof MealSheet>;

const meal = { name: 'Kale & Quinoa w/ Salmon', protein: 35 };

export const Default: Story = {
  args: {
    meal,
    mealType: 'lunch',
    favs: {},
    setFavs: () => {},
    onClose: () => {},
  },
};

export const AlreadyFavourited: Story = {
  args: {
    meal,
    mealType: 'lunch',
    favs: {
      'lunch::Kale & Quinoa w/ Salmon': {
        name: 'Kale & Quinoa w/ Salmon',
        mealType: 'lunch',
        protein: 35,
        calories: 450,
        savedAt: 1,
      },
    },
    setFavs: () => {},
    onClose: () => {},
  },
};
