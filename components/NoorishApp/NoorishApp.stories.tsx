import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NoorishApp } from './index';

const meta: Meta<typeof NoorishApp> = {
  title: 'App/NoorishApp',
  component: NoorishApp,
};
export default meta;
type Story = StoryObj<typeof NoorishApp>;

export const Onboarding: Story = {};
