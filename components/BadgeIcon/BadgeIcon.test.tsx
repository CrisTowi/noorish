import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BadgeIcon } from './index';

describe('BadgeIcon', () => {
  it('renders for every variant 0..6', () => {
    for (let v = 0; v < 7; v++) {
      const { container, unmount } = render(<BadgeIcon variant={v} size={48} animate={false} />);
      expect(container.querySelector('svg')).toBeTruthy();
      unmount();
    }
  });
});
