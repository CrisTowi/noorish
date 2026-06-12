import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NoorishApp } from './index';

describe('NoorishApp', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('renders the onboarding flow when not onboarded', () => {
    render(<NoorishApp />);
    expect(screen.getByText(/Eat with intention/)).toBeTruthy();
    expect(screen.getByText('Get started')).toBeTruthy();
  });
});
