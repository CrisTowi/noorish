'use client';

import React, { useState } from 'react';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import { MacroPill } from '../MacroPill';
import styles from './BottomSheet.module.css';

type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

const mealLabels: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  snack: 'Snack',
  dinner: 'Dinner',
};

interface BottomSheetProps {
  mealType: MealType;
  mealName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isFavorite?: boolean;
  onClose?: () => void;
  onToggleFavorite?: () => void;
  onSave?: () => void;
  className?: string;
}

export function BottomSheet({
  mealType,
  mealName,
  calories,
  protein,
  carbs,
  fat,
  isFavorite = false,
  onClose,
  onToggleFavorite,
  onSave,
  className,
}: BottomSheetProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave?.();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose?.();
    }, 700);
  };

  return (
    <div className={`${styles.overlay} ${className || ''}`}>
      <div className={styles.sheet} onClick={e => e.stopPropagation()}>
        <div className={styles.handleRow}>
          <span className={styles.handleSpacer} />
          <div className={styles.handleBar} />
          <span className={styles.handleSpacerEnd}>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <Icon name="x" size={14} />
            </button>
          </span>
        </div>

        <header className={styles.header}>
          <div className={styles.badge}>
            <Badge variant="olive">{mealLabels[mealType]}</Badge>
          </div>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{mealName}</h2>
            {onToggleFavorite && (
              <button
                className={`${styles.favBtn} ${isFavorite ? styles.favBtnActive : ''}`}
                onClick={onToggleFavorite}
                aria-label="Save to favorites"
              >
                <Icon name="bookmark" size={15} />
              </button>
            )}
          </div>
          <div className={styles.macros}>
            <MacroPill type="kcal" value={calories} />
            <MacroPill type="protein" value={`${protein}g`} />
            <MacroPill type="carbs" value={`${carbs}g`} />
            <MacroPill type="fat" value={`${fat}g`} />
          </div>
        </header>

        <footer className={styles.footer}>
          <button
            className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ''}`}
            onClick={handleSave}
          >
            {saved ? 'Saved ✓' : 'Save changes'}
          </button>
        </footer>
      </div>
    </div>
  );
}