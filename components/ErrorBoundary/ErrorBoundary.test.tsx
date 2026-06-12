import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ErrorBoundary } from './index';

function Bomb(): ReactElement {
  throw new Error('boom');
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <span>hello</span>
      </ErrorBoundary>
    );
    expect(getByText('hello')).toBeTruthy();
  });

  it('renders fallback on error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Your progress is saved. Refresh to continue.')).toBeTruthy();
  });
});
