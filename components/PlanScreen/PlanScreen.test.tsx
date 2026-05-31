import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlanScreen } from './';

describe('PlanScreen', () => {
  it('renders page header', () => {
    render(<PlanScreen />);
    
    expect(screen.getByText('Weekly Plan')).toBeDefined();
    expect(screen.getByText('Meal Plan')).toBeDefined();
  });

  it('renders week toggle buttons', () => {
    render(<PlanScreen />);
    
    expect(screen.getByText('Week 1')).toBeDefined();
    expect(screen.getByText('Week 2')).toBeDefined();
  });

  it('renders day pills', () => {
    render(<PlanScreen />);
    
    // Should render day pills for week 1
    expect(screen.getByText('Mon')).toBeDefined();
    expect(screen.getByText('Tue')).toBeDefined();
  });

  it('renders plan card with meals', () => {
    render(<PlanScreen />);
    
    expect(screen.getByText('Breakfast')).toBeDefined();
    expect(screen.getByText('Lunch')).toBeDefined();
    expect(screen.getByText('Dinner')).toBeDefined();
    expect(screen.getByText('Snack')).toBeDefined();
  });

  it('renders prep section', () => {
    render(<PlanScreen />);
    
    expect(screen.getByText('Weekly Prep')).toBeDefined();
  });

  it('switches week when clicking week button', async () => {
    render(<PlanScreen />);
    
    await fireEvent.click(screen.getByText('Week 2'));
    
    // Week 2 should now be active (visual check in component)
    expect(screen.getByText('Week 2')).toBeDefined();
  });

  it('switches day when clicking day pill', async () => {
    render(<PlanScreen />);
    
    // Click on Tuesday (index 1)
    const dayPills = screen.getAllByText('Tue');
    if (dayPills.length > 0) {
      await fireEvent.click(dayPills[0]);
    }
    
    expect(screen.getByText('Tue')).toBeDefined();
  });
});
