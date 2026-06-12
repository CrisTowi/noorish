import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MealSheet } from './index';
import type { FavsMap } from '../SavedScreen';

const meal = { name: 'Test Meal', protein: 35 };
const favs: FavsMap = {};

describe('MealSheet', () => {
  it('renders the meal name and macro pills', () => {
    render(
      <MealSheet
        meal={meal}
        mealType="lunch"
        favs={favs}
        setFavs={vi.fn()}
        onClose={vi.fn()}
      />
    );
    expect(screen.getByText('Test Meal')).toBeTruthy();
    expect(screen.getByText('Lunch')).toBeTruthy();
    expect(screen.getByText('Save changes')).toBeTruthy();
  });
});
