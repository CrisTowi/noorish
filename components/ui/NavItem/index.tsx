'use client';

import React from 'react';
import { Icon } from '../Icon';
import styles from './NavItem.module.css';

type NavIconName = 'house' | 'calendar' | 'bag' | 'bookmark';

interface NavItemProps {
  label: string;
  iconName: NavIconName;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavItem({
  label,
  iconName,
  active = false,
  onClick,
  className,
}: NavItemProps) {
  return (
    <button
      className={`${styles.navItem} ${active ? styles.active : ''} ${className || ''}`}
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
    >
      <div className={styles.icon}>
        <Icon name={iconName} size={28} />
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  );
}