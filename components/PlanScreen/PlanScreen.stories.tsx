import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PlanScreen } from './index';

const meta: Meta<typeof PlanScreen> = {
  title: 'Screens/PlanScreen',
  component: PlanScreen,
};
export default meta;
type Story = StoryObj<typeof PlanScreen>;

export const Default: Story = {
  args: {
    onMeal: () => {},
    activeProgram: 'hormone',
    setActiveProgram: () => {},
    onQuit: () => {},
  },
};
