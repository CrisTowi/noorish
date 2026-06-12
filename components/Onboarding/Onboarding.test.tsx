import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Onboarding } from './index';

describe('Onboarding', () => {
  it('renders the welcome step', () => {
    render(<Onboarding onComplete={vi.fn()} />);
    expect(screen.getByText(/Eat with intention/)).toBeTruthy();
    expect(screen.getByText('Get started')).toBeTruthy();
  });
});
