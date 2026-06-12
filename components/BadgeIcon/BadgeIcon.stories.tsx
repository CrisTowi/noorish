import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BadgeIcon } from './index';

const meta: Meta<typeof BadgeIcon> = {
  title: 'Atoms/BadgeIcon',
  component: BadgeIcon,
  argTypes: {
    variant: { control: { type: 'range', min: 0, max: 6 } },
    size: { control: { type: 'number', min: 16, max: 160 } },
    animate: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof BadgeIcon>;

export const Sprout: Story = { args: { variant: 0, size: 96 } };
export const Sunflower: Story = { args: { variant: 1, size: 96 } };
export const Seed: Story = { args: { variant: 2, size: 96 } };
export const Branch: Story = { args: { variant: 3, size: 96 } };
export const Leaf: Story = { args: { variant: 4, size: 96 } };
export const Crystal: Story = { args: { variant: 5, size: 96 } };
export const Roots: Story = { args: { variant: 6, size: 96 } };
