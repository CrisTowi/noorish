'use client';

import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, max = 100, label, className }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`${styles.progressRow} ${className || ''}`}>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
      </div>
      {label && <span className={styles.progressLabel}>{label}</span>}
    </div>
  );
}