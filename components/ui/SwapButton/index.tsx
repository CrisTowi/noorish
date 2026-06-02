'use client';

import React from 'react';
import { Icon } from '../Icon';
import styles from './SwapButton.module.css';

interface SwapButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

export function SwapButton({
  onClick,
  disabled = false,
  'aria-label': ariaLabel = 'Swap',
  className,
}: SwapButtonProps) {
  return (
    <button
      className={`${styles.swapButton} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      type="button"
    >
      <Icon name="swap" size={14} />
    </button>
  );
}