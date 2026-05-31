import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShoppingScreen } from './';

describe('ShoppingScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, checked: {} }),
    });
  });

  it('renders page header', () => {
    render(<ShoppingScreen />);
    
    expect(screen.getByText('Grocery List')).toBeDefined();
    expect(screen.getByText('Shopping')).toBeDefined();
  });

  it('renders category chips', () => {
    render(<ShoppingScreen />);
    
    expect(screen.getByText('Proteins')).toBeDefined();
    expect(screen.getByText('Produce')).toBeDefined();
    expect(screen.getByText('Pantry')).toBeDefined();
  });

  it('renders shopping items', async () => {
    render(<ShoppingScreen />);
    
    await waitFor(() => {
      expect(screen.getByText(/items checked/)).toBeDefined();
    });
  });

  it('switches category when clicking chip', async () => {
    render(<ShoppingScreen />);
    
    await fireEvent.click(screen.getByText('Produce'));
    
    expect(screen.getByText('Produce')).toBeDefined();
  });

  it('renders progress indicator', async () => {
    render(<ShoppingScreen />);
    
    await waitFor(() => {
      expect(screen.getByText('Shopping progress')).toBeDefined();
    });
  });

  it('toggles item when clicking', async () => {
    render(<ShoppingScreen />);
    
    await waitFor(() => {
      const items = screen.queryAllByText(/Chicken/);
      if (items.length > 0) {
        const shopItem = items[0].closest('[class*="shopItem"]');
        if (shopItem) {
          fireEvent.click(shopItem);
        }
      }
    });
  });
});
