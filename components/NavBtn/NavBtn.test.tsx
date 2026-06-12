import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavBtn } from './index';

describe('NavBtn', () => {
  it('renders label and calls onClick', () => {
    const onClick = vi.fn();
    render(<NavBtn icon="house" label="Today" active={false} onClick={onClick} />);
    const btn = screen.getByRole('button', { name: 'Today' });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
