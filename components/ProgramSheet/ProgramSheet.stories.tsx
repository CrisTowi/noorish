import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgramSheet } from './index';
import { PROGRAMS } from '../lib/programs';

const meta: Meta<typeof ProgramSheet> = {
  title: 'Screens/ProgramSheet',
  component: ProgramSheet,
};
export default meta;
type Story = StoryObj<typeof ProgramSheet>;

export const Default: Story = {
  args: {
    activeProgram: 'hormone',
    setActiveProgram: () => {},
    onClose: () => {},
    programs: PROGRAMS,
  },
};
