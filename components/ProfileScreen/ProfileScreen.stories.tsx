import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileScreen } from './index';

const meta: Meta<typeof ProfileScreen> = {
  title: 'Screens/ProfileScreen',
  component: ProfileScreen,
};
export default meta;
type Story = StoryObj<typeof ProfileScreen>;

export const Empty: Story = { args: { badges: [], dayBadges: [] } };

export const WithBadges: Story = {
  args: {
    badges: [
      { protein: 840, calories: 12600, meals: 28, variant: 0 },
      { protein: 840, calories: 12600, meals: 28, variant: 3 },
    ],
    dayBadges: [
      { day: 'Mon', earnedAt: 1 },
      { day: 'Tue', earnedAt: 2 },
    ],
  },
};
