import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodayScreen } from './index';
import type { EatenMap, MealLog } from './index';

describe('TodayScreen', () => {
  const baseProps = {
    eaten: { breakfast: false, lunch: false, snack: false, dinner: false } as EatenMap,
    setEaten: vi.fn(),
    mealLog: {} as MealLog,
    setMealLog: vi.fn(),
    dayBadges: [],
    setDayBadges: vi.fn(),
    setDayBadgeClaimed: vi.fn(),
    setShowCel: vi.fn(),
    userName: 'Alex',
    onMeal: vi.fn(),
  };

  it('renders the page title and demo shortcut', () => {
    render(<TodayScreen {...baseProps} />);
    expect(screen.getByText(/Hi Alex,/)).toBeTruthy();
    expect(screen.getByLabelText(/Demo shortcut/)).toBeTruthy();
  });

  it('renders all four meal types', () => {
    render(<TodayScreen {...baseProps} />);
    expect(screen.getAllByText('Breakfast').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Lunch').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Snack').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dinner').length).toBeGreaterThan(0);
  });
});
