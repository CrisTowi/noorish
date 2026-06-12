import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Celebration } from './index';

describe('Celebration', () => {
  it('renders the week streak copy', () => {
    render(<Celebration weekNum={1} variant={0} onCollect={vi.fn()} onDismiss={vi.fn()} />);
    expect(screen.getByText('1 Week Streak')).toBeTruthy();
    expect(screen.getByText('You crushed it this week!')).toBeTruthy();
    expect(screen.getByText('Collect badge')).toBeTruthy();
  });
});
