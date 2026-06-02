'use client';

import React from 'react';
import styles from './MacroPill.module.css';

type MacroType = 'kcal' | 'protein' | 'carbs' | 'fat';

interface MacroPillProps {
  type?: MacroType;
  value: string | number;
  label?: string;
  className?: string;
}

const defaultLabels: Record<MacroType, string> = {
  kcal: 'kcal',
  protein: 'protein',
  carbs: 'carbs',
  fat: 'fat',
};

export function MacroPill({ type = 'kcal', value, label, className }: MacroPillProps) {
  const displayLabel = label ?? defaultLabels[type];
  const isProtein = type === 'protein';

  return (
    <div className={`${styles.macroPill} ${className || ''}`}>
      <div className={`${styles.macroVal} ${isProtein ? styles.macroValProtein : ''}`}>
        {value}
      </div>
      <div className={styles.macroLabel}>{displayLabel}</div>
    </div>
  );
}