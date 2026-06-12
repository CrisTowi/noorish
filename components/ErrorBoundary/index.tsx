'use client';

import { Component, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (typeof console !== 'undefined') {
      console.error('NoorishApp crashed:', error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrap}>
          <div className={styles.logo}>noorish</div>
          <div className={styles.icon}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <div className={styles.title}>Something went wrong</div>
          <div className={styles.body}>Your progress is saved. Refresh to continue.</div>
          <button type="button" onClick={() => window.location.reload()} className={styles.btn}>
            Refresh app
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
