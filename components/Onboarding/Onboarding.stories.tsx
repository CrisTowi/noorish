import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Onboarding } from './index';

const meta: Meta<typeof Onboarding> = {
  title: 'Screens/Onboarding',
  component: Onboarding,
};
export default meta;
type Story = StoryObj<typeof Onboarding>;

export const Welcome: Story = { args: { onComplete: () => {} } };
