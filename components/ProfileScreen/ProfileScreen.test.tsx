import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileScreen } from './index';

describe('ProfileScreen', () => {
  it('renders the lifetime stats card', () => {
    render(<ProfileScreen badges={[]} dayBadges={[]} />);
    expect(screen.getByText('Profile')).toBeTruthy();
    expect(screen.getByText('Lifetime Stats')).toBeTruthy();
    expect(screen.getByText(/Complete a full week/)).toBeTruthy();
  });

  it('renders week badges when present', () => {
    render(
      <ProfileScreen
        badges={[{ protein: 840, calories: 12600, meals: 28, variant: 0 }]}
        dayBadges={[{ day: 'Mon', earnedAt: 1 }]}
      />
    );
    expect(screen.getByText('Week 1 Complete')).toBeTruthy();
    expect(screen.getByText('Mon')).toBeTruthy();
  });
});
