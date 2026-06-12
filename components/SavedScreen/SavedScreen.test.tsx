import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SavedScreen } from './index';
import type { FavsMap } from './index';

describe('SavedScreen', () => {
  it('renders empty state when no favourites', () => {
    render(<SavedScreen favs={{} as FavsMap} setFavs={vi.fn()} onMeal={vi.fn()} />);
    expect(screen.getByText(/Open any meal and tap the bookmark/)).toBeTruthy();
  });

  it('renders favourite items', () => {
    const favs: FavsMap = {
      'lunch::Test Meal': {
        name: 'Test Meal',
        mealType: 'lunch',
        protein: 35,
        calories: 500,
        savedAt: 1,
      },
    };
    render(<SavedScreen favs={favs} setFavs={vi.fn()} onMeal={vi.fn()} />);
    expect(screen.getByText('Test Meal')).toBeTruthy();
    expect(screen.getByText('35g protein · 500 kcal')).toBeTruthy();
  });
});
