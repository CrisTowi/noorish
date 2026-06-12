import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShopScreen } from './index';

const meta: Meta<typeof ShopScreen> = {
  title: 'Screens/ShopScreen',
  component: ShopScreen,
};
export default meta;
type Story = StoryObj<typeof ShopScreen>;

export const Empty: Story = { args: { activeProgram: 'hormone' } };

export const WithLogs: Story = {
  args: {
    activeProgram: 'hormone',
    mealLog: { lunch: 'felt bloated' },
  },
};
