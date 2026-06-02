'use client';

import React from 'react';
import styles from './HeroCard.module.css';

interface HeroCardProps {
  date?: string;
  dayName?: string;
  proteinEaten?: number;
  proteinGoal?: number;
  className?: string;
}

export function HeroCard({
  date = 'Friday, May 30',
  dayName = 'Monday',
  proteinEaten = 54,
  proteinGoal = 120,
  className,
}: HeroCardProps) {
  return (
    <div className={`${styles.heroCard} ${className || ''}`}>
      <div className={styles.heroDate}>{date}</div>
      <div className={styles.heroDay}>{dayName}</div>
      <div className={styles.heroMeta}>
        <span className={styles.heroPill}>{proteinEaten}g eaten</span>
        <span className={styles.heroSub}>of {proteinGoal}g protein</span>
      </div>
    </div>
  );
}