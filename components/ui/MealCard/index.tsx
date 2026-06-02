'use client';

import React from 'react';
import { Badge } from '../Badge';
import { CheckButton } from '../CheckButton';
import { SwapButton } from '../SwapButton';
import styles from './MealCard.module.css';

type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

const mealLabels: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  snack: 'Snack',
  dinner: 'Dinner',
};

interface MealCardProps {
  mealType: MealType;
  mealName: string;
  time: string;
  protein: number;
  done?: boolean;
  animating?: boolean;
  onToggle?: () => void;
  onSwap?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  className?: string;
}

export function MealCard({
  mealType,
  mealName,
  time,
  protein,
  done = false,
  animating = false,
  onToggle,
  onSwap,
  onClick,
  className,
}: MealCardProps) {
  return (
    <div className={`${styles.mealCard} ${done ? styles.eaten : ''} ${className || ''}`}>
      <CheckButton
        done={done}
        animating={animating}
        onClick={onToggle}
        aria-label={`Mark ${mealLabels[mealType]} as eaten`}
      />
      <div className={styles.cardBody} onClick={onClick}>
        <div className={`${styles.badge}`}>
          <Badge variant="olive">{mealLabels[mealType]}</Badge>
        </div>
        <div className={styles.name}>{mealName}</div>
        <div className={styles.meta}>{time} · ~{protein}g protein</div>
      </div>
      {!done && !animating && onSwap && (
        <SwapButton onClick={onSwap} aria-label="Swap meal" />
      )}
    </div>
  );
}