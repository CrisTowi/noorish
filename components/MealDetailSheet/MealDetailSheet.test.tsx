import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MealDetailSheet } from './';
import { MealType } from '@/lib/meal-data';

describe('MealDetailSheet', () => {
  const mockSetFavorites = vi.fn();
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  const defaultProps = {
    meal: { name: 'Greek Yogurt Bowl', protein: 20 },
    mealType: 'breakfast' as MealType,
    favorites: {},
    setFavorites: mockSetFavorites,
    onClose: mockOnClose,
    onSave: mockOnSave,
  };

  it('renders meal name in header', () => {
    render(<MealDetailSheet {...defaultProps} />);
    
    expect(screen.getByText('Greek Yogurt Bowl')).toBeDefined();
  });

  it('renders meal type badge', () => {
    render(<MealDetailSheet {...defaultProps} />);
    
    expect(screen.getByText('Breakfast')).toBeDefined();
  });

  it('renders macro pills', () => {
    render(<MealDetailSheet {...defaultProps} />);
    
    expect(screen.getByText('kcal')).toBeDefined();
    expect(screen.getByText('protein')).toBeDefined();
    expect(screen.getByText('carbs')).toBeDefined();
    expect(screen.getByText('fat')).toBeDefined();
  });

  it('renders ingredients section', () => {
    render(<MealDetailSheet {...defaultProps} />);
    
    expect(screen.getByText('Ingredients')).toBeDefined();
  });

  it('renders add ingredient input', () => {
    render(<MealDetailSheet {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Add ingredient…')).toBeDefined();
  });

  it('renders save button', () => {
    render(<MealDetailSheet {...defaultProps} />);
    
    expect(screen.getByText('Save changes')).toBeDefined();
  });

  it('calls onClose when close button is clicked', async () => {
    render(<MealDetailSheet {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: 'Close' });
    await fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('adds ingredient when pressing enter', async () => {
    render(<MealDetailSheet {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add ingredient…');
    await fireEvent.change(input, { target: { value: 'New Ingredient' } });
    await fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(screen.getByText('New Ingredient')).toBeDefined();
  });
});
