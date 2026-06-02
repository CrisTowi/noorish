import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodayScreen } from './';
import { MealType } from '@/lib/meal-data';

describe('TodayScreen', () => {
  const mockSetEaten = vi.fn();
  const mockSetMealOverrides = vi.fn();
  const mockSetFavorites = vi.fn();
  const mockFavorites: Record<string, { name: string; mealType: MealType; protein: number; calories: number; savedAt: number }> = {};

  const defaultProps = {
    eaten: { breakfast: false, lunch: false, dinner: false, snack: false } as Record<MealType, boolean>,
    setEaten: mockSetEaten,
    mealOverrides: {},
    setMealOverrides: mockSetMealOverrides,
    favorites: mockFavorites,
    setFavorites: mockSetFavorites,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders page header', () => {
    render(<TodayScreen {...defaultProps} />);
    
    expect(screen.getByText('Your Day')).toBeDefined();
    expect(screen.getByText(/120g protein goal/)).toBeDefined();
  });

  it('renders progress bar', () => {
    render(<TodayScreen {...defaultProps} />);
    
    expect(screen.getByText('0/4 meals')).toBeDefined();
  });

  it('renders all meal cards', () => {
    render(<TodayScreen {...defaultProps} />);
    
    expect(screen.getAllByText('Breakfast').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Lunch').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dinner').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Snack').length).toBeGreaterThan(0);
  });

  it('renders tomorrow section', () => {
    render(<TodayScreen {...defaultProps} />);
    
    expect(screen.getByText(/Tomorrow/)).toBeDefined();
  });

  it('renders hero section with day name', () => {
    render(<TodayScreen {...defaultProps} />);
    
    const mondayElements = screen.getAllByText(/Monday/);
    expect(mondayElements.length).toBeGreaterThan(0);
  });
});
