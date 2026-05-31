import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FavoritesScreen } from './';
import { MealType } from '@/lib/meal-data';

describe('FavoritesScreen', () => {
  const mockSetFavorites = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, data: [] }),
    });
  });

  it('renders page header', () => {
    render(<FavoritesScreen favorites={{}} setFavorites={mockSetFavorites} />);
    
    expect(screen.getByText('Favorites')).toBeDefined();
    expect(screen.getByText('0 saved meals')).toBeDefined();
  });

  it('shows loading state initially', () => {
    render(<FavoritesScreen favorites={{}} setFavorites={mockSetFavorites} />);
    
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('shows empty state when no favorites', async () => {
    render(<FavoritesScreen favorites={{}} setFavorites={mockSetFavorites} />);
    
    await waitFor(() => {
      expect(screen.getByText(/No saved meals yet/)).toBeDefined();
    });
  });

  it('renders favorites when they exist', async () => {
    const favorites = {
      'breakfast::Greek Yogurt Bowl': {
        name: 'Greek Yogurt Bowl',
        mealType: 'breakfast' as MealType,
        protein: 20,
        calories: 300,
        savedAt: Date.now(),
      },
    };

    render(<FavoritesScreen favorites={favorites} setFavorites={mockSetFavorites} />);
    
    await waitFor(() => {
      expect(screen.getByText('Greek Yogurt Bowl')).toBeDefined();
      expect(screen.getByText('20g protein · 300 kcal')).toBeDefined();
    });
  });
});
