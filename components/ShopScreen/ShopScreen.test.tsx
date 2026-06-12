import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShopScreen } from './index';

describe('ShopScreen', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  it('renders header and category chips', () => {
    render(<ShopScreen activeProgram="hormone" />);
    expect(screen.getByText('Shopping')).toBeTruthy();
    expect(screen.getByText('Proteins')).toBeTruthy();
    expect(screen.getByText('Produce')).toBeTruthy();
    expect(screen.getByText('Pantry')).toBeTruthy();
  });
});
