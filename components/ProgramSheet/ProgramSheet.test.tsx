import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgramSheet } from './index';
import { PROGRAMS } from '../lib/programs';

describe('ProgramSheet', () => {
  it('renders the list of programs', () => {
    render(
      <ProgramSheet
        activeProgram="hormone"
        setActiveProgram={vi.fn()}
        onClose={vi.fn()}
        programs={PROGRAMS}
      />
    );
    expect(screen.getByText('Hormone & Fat Loss')).toBeTruthy();
    expect(screen.getByText('Muscle & Strength')).toBeTruthy();
  });
});
