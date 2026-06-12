import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavBtn } from './index';

const meta: Meta<typeof NavBtn> = {
  title: 'Atoms/NavBtn',
  component: NavBtn,
};
export default meta;
type Story = StoryObj<typeof NavBtn>;

export const Default: Story = { args: { icon: 'house', label: 'Today', active: false, onClick: () => {} } };
export const Active: Story = { args: { icon: 'house', label: 'Today', active: true, onClick: () => {} } };
