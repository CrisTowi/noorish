import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from './index';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'select', options: ['house', 'calendar', 'bag', 'bookmark', 'user', 'x', 'swap', 'trash', 'check'] },
    size: { control: { type: 'number', min: 8, max: 64 } },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = { args: { name: 'house', size: 24 } };
export const Bookmark: Story = { args: { name: 'bookmark', size: 24 } };
export const Swap: Story = { args: { name: 'swap', size: 24 } };
