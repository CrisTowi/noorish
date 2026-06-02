import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BottomNav } from './index';

const meta: Meta<typeof BottomNav> = {
  component: BottomNav,
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'select',
      options: ['today', 'plan', 'shopping', 'favorites'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const TodayActive: Story = {
  args: {
    active: 'today',
  },
};

export const PlanActive: Story = {
  args: {
    active: 'plan',
  },
};

export const ShopActive: Story = {
  args: {
    active: 'shopping',
  },
};

export const SavedActive: Story = {
  args: {
    active: 'favorites',
  },
};