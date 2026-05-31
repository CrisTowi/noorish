import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BottomNavigation } from './';

describe('BottomNavigation', () => {
  it('renders all nav items', () => {
    const onNavigate = vi.fn();
    render(<BottomNavigation active="today" onNavigate={onNavigate} />);
    
    expect(screen.getByRole('button', { name: 'Today' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Plan' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Shop' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Saved' })).toBeDefined();
  });

  it('calls onNavigate with correct key when clicking nav item', async () => {
    const onNavigate = vi.fn();
    render(<BottomNavigation active="today" onNavigate={onNavigate} />);
    
    await fireEvent.click(screen.getByRole('button', { name: 'Plan' }));
    expect(onNavigate).toHaveBeenCalledWith('plan');
  });

  it('calls onNavigate with correct key for shopping', async () => {
    const onNavigate = vi.fn();
    render(<BottomNavigation active="today" onNavigate={onNavigate} />);
    
    await fireEvent.click(screen.getByRole('button', { name: 'Shop' }));
    expect(onNavigate).toHaveBeenCalledWith('shopping');
  });

  it('calls onNavigate with correct key for favorites', async () => {
    const onNavigate = vi.fn();
    render(<BottomNavigation active="today" onNavigate={onNavigate} />);
    
    await fireEvent.click(screen.getByRole('button', { name: 'Saved' }));
    expect(onNavigate).toHaveBeenCalledWith('favorites');
  });

  it('renders nav element', () => {
    const onNavigate = vi.fn();
    const { container } = render(<BottomNavigation active="today" onNavigate={onNavigate} />);
    
    expect(container.querySelector('nav')).toBeDefined();
  });
});
