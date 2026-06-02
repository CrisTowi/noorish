'use client';

import React from 'react';
import { Icon } from '../Icon';
import styles from './IngredientRow.module.css';

interface IngredientRowProps {
  name: string;
  qty: number;
  unit: string;
  calories: number;
  onSwap?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function IngredientRow({
  name,
  qty,
  unit,
  calories,
  onSwap,
  onDelete,
  className,
}: IngredientRowProps) {
  return (
    <div className={`${styles.ingredientRow} ${className || ''}`}>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.qty}>
          {qty} {unit}
        </div>
      </div>
      <div className={styles.cal}>{calories} kcal</div>
      <div className={styles.actions}>
        {onSwap && (
          <button
            className={styles.actionBtn}
            onClick={onSwap}
            aria-label="Swap ingredient"
            type="button"
          >
            <Icon name="swap" size={13} />
          </button>
        )}
        {onDelete && (
          <button
            className={`${styles.actionBtn} ${styles.actionBtnDel}`}
            onClick={onDelete}
            aria-label="Remove ingredient"
            type="button"
          >
            <Icon name="trash" size={13} />
          </button>
        )}
      </div>
    </div>
  );
}