import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckButton } from './index';

const meta: Meta<typeof CheckButton> = {
  component: CheckButton,
  tags: ['autodocs'],
  argTypes: {
    done: { control: 'boolean' },
    animating: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckButton>;

export const Idle: Story = {
  args: {
    done: false,
    animating: false,
  },
};

export const Done: Story = {
  args: {
    done: true,
    animating: false,
  },
};

export const Animating: Story = {
  args: {
    done: false,
    animating: true,
  },
};

export const Disabled: Story = {
  args: {
    done: false,
    animating: false,
    disabled: true,
  },
};