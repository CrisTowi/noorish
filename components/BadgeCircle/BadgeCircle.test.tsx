import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BadgeCircle } from './index';

describe('BadgeCircle', () => {
  it('renders with default props', () => {
    const { container } = render(<BadgeCircle />);
    expect(container.firstChild).toBeTruthy();
  });

  it('respects size prop', () => {
    const { container } = render(<BadgeCircle size={52} animate={false} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.width).toBe('52px');
  });
});
