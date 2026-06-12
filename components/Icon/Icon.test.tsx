import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './index';

describe('Icon', () => {
  it('renders an icon by name', () => {
    const { container } = render(<Icon name="house" />);
    expect(container.querySelector('span')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('respects size prop', () => {
    const { container } = render(<Icon name="check" size={32} />);
    const span = container.querySelector('span');
    expect(span).toBeTruthy();
  });
});
