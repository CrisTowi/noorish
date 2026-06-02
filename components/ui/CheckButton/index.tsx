'use client';

import React from 'react';
import styles from './CheckButton.module.css';

interface CheckButtonProps {
  done?: boolean;
  animating?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

export function CheckButton({
  done = false,
  animating = false,
  onClick,
  disabled = false,
  'aria-label': ariaLabel = 'Mark as done',
  className,
}: CheckButtonProps) {
  return (
    <button
      className={`${styles.checkButton} ${done ? styles.done : ''} ${animating ? styles.animating : ''} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      type="button"
    >
      <span className={styles.checkParticles}>
        {[1, 2, 3, 4, 5, 6].map(n => (
          <span key={n} className={styles.checkParticle} />
        ))}
      </span>
      <span className={styles.checkRing} />
      {(done || animating) && (
        <svg className={styles.checkSvg} viewBox="0 0 13 10">
          <path className={styles.checkPath} d="M1.5 5L5 8.5L11.5 1.5" />
        </svg>
      )}
    </button>
  );
}