import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SwapButton } from './index';

const meta: Meta<typeof SwapButton> = {
  component: SwapButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SwapButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};