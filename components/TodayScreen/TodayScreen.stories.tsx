import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TodayScreen } from './index';
import type { EatenMap, MealLog } from './index';

const meta: Meta<typeof TodayScreen> = {
  title: 'Screens/TodayScreen',
  component: TodayScreen,
};
export default meta;
type Story = StoryObj<typeof TodayScreen>;

const baseArgs = {
  eaten: { breakfast: false, lunch: false, snack: false, dinner: false } as EatenMap,
  setEaten: () => {},
  mealLog: {} as MealLog,
  setMealLog: () => {},
  dayBadges: [],
  setDayBadges: () => {},
  setDayBadgeClaimed: () => {},
  setShowCel: () => {},
  userName: 'Alex',
  onMeal: () => {},
};

export const Default: Story = { args: baseArgs };

export const MostlyEaten: Story = {
  args: {
    ...baseArgs,
    eaten: { breakfast: true, lunch: true, snack: false, dinner: false } as EatenMap,
  },
};
