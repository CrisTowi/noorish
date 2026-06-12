import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BadgeCircle } from './index';

const meta: Meta<typeof BadgeCircle> = {
  title: 'Atoms/BadgeCircle',
  component: BadgeCircle,
};
export default meta;
type Story = StoryObj<typeof BadgeCircle>;

export const Default: Story = { args: { variant: 0, size: 120 } };
export const Small: Story = { args: { variant: 2, size: 52 } };
