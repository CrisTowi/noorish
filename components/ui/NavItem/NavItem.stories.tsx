import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavItem } from './index';

const meta: Meta<typeof NavItem> = {
  component: NavItem,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Inactive: Story = {
  args: {
    label: 'Today',
    iconName: 'house',
    active: false,
  },
};

export const Active: Story = {
  args: {
    label: 'Today',
    iconName: 'house',
    active: true,
  },
};