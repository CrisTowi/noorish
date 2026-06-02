import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroCard } from './index';

const meta: Meta<typeof HeroCard> = {
  component: HeroCard,
  tags: ['autodocs'],
  argTypes: {
    date: { control: 'text' },
    dayName: { control: 'text' },
    proteinEaten: { control: 'number' },
    proteinGoal: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof HeroCard>;

export const Default: Story = {
  args: {
    date: 'Friday, May 30',
    dayName: 'Monday',
    proteinEaten: 54,
    proteinGoal: 120,
  },
};

export const HalfWay: Story = {
  args: {
    date: 'Saturday, May 31',
    dayName: 'Tuesday',
    proteinEaten: 60,
    proteinGoal: 120,
  },
};

export const NoProgress: Story = {
  args: {
    date: 'Sunday, June 1',
    dayName: 'Wednesday',
    proteinEaten: 0,
    proteinGoal: 120,
  },
};