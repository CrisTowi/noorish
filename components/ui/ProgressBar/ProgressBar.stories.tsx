import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgressBar } from './index';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } },
    max: { control: { type: 'number', min: 1 } },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Empty: Story = {
  args: {
    value: 0,
    max: 4,
    label: '0/4 meals',
  },
};

export const Half: Story = {
  args: {
    value: 2,
    max: 4,
    label: '2/4 meals',
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 3,
    max: 4,
    label: '3/4 meals',
  },
};

export const Complete: Story = {
  args: {
    value: 4,
    max: 4,
    label: '4/4 meals',
  },
};

export const NoLabel: Story = {
  args: {
    value: 72,
    max: 100,
  },
};