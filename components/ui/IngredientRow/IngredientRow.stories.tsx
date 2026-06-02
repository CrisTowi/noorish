import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IngredientRow } from './index';

const meta: Meta<typeof IngredientRow> = {
  component: IngredientRow,
  tags: ['autodocs'],
  argTypes: {
    qty: { control: 'number' },
    calories: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof IngredientRow>;

export const Default: Story = {
  args: {
    name: 'Avocado',
    qty: 1,
    unit: 'whole',
    calories: 240,
  },
};

export const WithActions: Story = {
  args: {
    name: 'Eggs',
    qty: 3,
    unit: 'large',
    calories: 210,
    onSwap: () => console.log('swap'),
    onDelete: () => console.log('delete'),
  },
};

export const SmallQty: Story = {
  args: {
    name: 'Olive Oil',
    qty: 1,
    unit: 'tbsp',
    calories: 120,
  },
};