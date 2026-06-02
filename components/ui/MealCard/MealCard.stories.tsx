import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MealCard } from './index';

const meta: Meta<typeof MealCard> = {
  component: MealCard,
  tags: ['autodocs'],
  argTypes: {
    mealType: {
      control: 'select',
      options: ['breakfast', 'lunch', 'snack', 'dinner'],
    },
    done: { control: 'boolean' },
    animating: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MealCard>;

export const Default: Story = {
  args: {
    mealType: 'breakfast',
    mealName: 'Avocado & 3 Poached Eggs',
    time: '8:00 AM',
    protein: 30,
    done: false,
    animating: false,
  },
};

export const Done: Story = {
  args: {
    mealType: 'lunch',
    mealName: 'Kale & Quinoa w/ Salmon',
    time: '12:30 PM',
    protein: 35,
    done: true,
    animating: false,
  },
};

export const Animating: Story = {
  args: {
    mealType: 'dinner',
    mealName: 'Grilled Chicken & Veggies',
    time: '7:00 PM',
    protein: 40,
    done: false,
    animating: true,
  },
};