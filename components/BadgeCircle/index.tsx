'use client';

import { BadgeIcon } from '../BadgeIcon';
import styles from './BadgeCircle.module.css';

interface BadgeCircleProps {
  variant?: number;
  size?: number;
  animate?: boolean;
}

export function BadgeCircle({ variant = 0, size = 120, animate = true }: BadgeCircleProps) {
  const iconSize = Math.round(size * 0.58);
  return (
    <div
      className={animate ? styles.animate : undefined}
      style={{ width: size, height: size }}
    >
      <BadgeIcon variant={variant} size={iconSize} animate={animate} />
    </div>
  );
}
