import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlanScreen } from './index';

describe('PlanScreen', () => {
  it('renders the meal plan title and program subtitle', () => {
    render(
      <PlanScreen
        onMeal={vi.fn()}
        activeProgram="hormone"
        setActiveProgram={vi.fn()}
        onQuit={vi.fn()}
      />
    );
    expect(screen.getByText('Meal Plan')).toBeTruthy();
    expect(screen.getByText('Insulin Sensitivity & Gut Health')).toBeTruthy();
  });
});
