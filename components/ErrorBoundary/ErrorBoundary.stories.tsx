import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ErrorBoundary } from './index';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Atoms/ErrorBoundary',
  component: ErrorBoundary,
};
export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  args: { children: <div style={{ padding: 24 }}>App is running fine.</div> },
};
