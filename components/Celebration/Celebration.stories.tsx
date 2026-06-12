import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Celebration } from './index';

const meta: Meta<typeof Celebration> = {
  title: 'Screens/Celebration',
  component: Celebration,
};
export default meta;
type Story = StoryObj<typeof Celebration>;

export const Default: Story = {
  args: { weekNum: 1, variant: 0, onCollect: () => {}, onDismiss: () => {} },
};
