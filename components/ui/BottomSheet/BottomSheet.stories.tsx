import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BottomSheet } from './index';

const meta: Meta<typeof BottomSheet> = {
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {
    mealType: {
      control: 'select',
      options: ['breakfast', 'lunch', 'snack', 'dinner'],
    },
    isFavorite: { control: 'boolean' },
    calories: { control: 'number' },
    protein: { control: 'number' },
    carbs: { control: 'number' },
    fat: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  args: {
    mealType: 'breakfast',
    mealName: 'Avocado & 3 Poached Eggs',
    calories: 377,
    protein: 20,
    carbs: 8,
    fat: 31,
    isFavorite: false,
  },
};

export const Favorite: Story = {
  args: {
    mealType: 'lunch',
    mealName: 'Kale & Quinoa w/ Salmon',
    calories: 520,
    protein: 42,
    carbs: 35,
    fat: 22,
    isFavorite: true,
  },
};

export const Snack: Story = {
  args: {
    mealType: 'snack',
    mealName: 'Greek Yogurt & Berries',
    calories: 180,
    protein: 15,
    carbs: 22,
    fat: 5,
    isFavorite: false,
  },
};