import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SavedScreen } from './index';

const meta: Meta<typeof SavedScreen> = {
  title: 'Screens/SavedScreen',
  component: SavedScreen,
};
export default meta;
type Story = StoryObj<typeof SavedScreen>;

export const Empty: Story = {
  args: { favs: {}, setFavs: () => {}, onMeal: () => {} },
};

export const WithItems: Story = {
  args: {
    favs: {
      'lunch::Kale & Quinoa w/ Salmon': {
        name: 'Kale & Quinoa w/ Salmon',
        mealType: 'lunch',
        protein: 35,
        calories: 450,
        savedAt: 1,
      },
    },
    setFavs: () => {},
    onMeal: () => {},
  },
};
