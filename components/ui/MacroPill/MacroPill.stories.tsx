import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MacroPill } from './index';

const meta: Meta<typeof MacroPill> = {
  component: MacroPill,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['kcal', 'protein', 'carbs', 'fat'],
    },
    value: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MacroPill>;

export const Kcal: Story = {
  args: {
    type: 'kcal',
    value: '377',
  },
};

export const Protein: Story = {
  args: {
    type: 'protein',
    value: '20g',
  },
};

export const Carbs: Story = {
  args: {
    type: 'carbs',
    value: '8g',
  },
};

export const Fat: Story = {
  args: {
    type: 'fat',
    value: '31g',
  },
};

export const AllMacros: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', maxWidth: '300px' }}>
      <MacroPill type="kcal" value="377" />
      <MacroPill type="protein" value="20g" />
      <MacroPill type="carbs" value="8g" />
      <MacroPill type="fat" value="31g" />
    </div>
  ),
};