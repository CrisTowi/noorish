import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageHeader } from './index';

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    eyebrow: 'Today · May 30',
    title: 'Your Day',
    subtitle: '120g protein goal · Fat loss protocol',
  },
};

export const WithoutEyebrow: Story = {
  args: {
    title: 'Your Day',
    subtitle: '120g protein goal · Fat loss protocol',
  },
};

export const WithoutSubtitle: Story = {
  args: {
    eyebrow: 'Today · May 30',
    title: 'Your Day',
  },
};