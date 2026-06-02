import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './index';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['olive', 'sky', 'sand'],
    },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Olive: Story = {
  args: {
    variant: 'olive',
    children: 'Breakfast',
  },
};

export const Sky: Story = {
  args: {
    variant: 'sky',
    children: 'Week 1',
  },
};

export const Sand: Story = {
  args: {
    variant: 'sand',
    children: 'Sunday Prep',
  },
};