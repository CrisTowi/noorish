'use client';

import React from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'olive' | 'sky' | 'sand';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'olive', children, className }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className || ''}`}>
      {children}
    </span>
  );
}