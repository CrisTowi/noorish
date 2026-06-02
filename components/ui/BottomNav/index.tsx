'use client';

import React from 'react';
import { NavItem } from '../NavItem';
import styles from './BottomNav.module.css';

type NavItemKey = 'today' | 'plan' | 'shopping' | 'favorites';

const navItems: { key: NavItemKey; label: string; iconName: 'house' | 'calendar' | 'bag' | 'bookmark' }[] = [
  { key: 'today', label: 'Today', iconName: 'house' },
  { key: 'plan', label: 'Plan', iconName: 'calendar' },
  { key: 'shopping', label: 'Shop', iconName: 'bag' },
  { key: 'favorites', label: 'Saved', iconName: 'bookmark' },
];

interface BottomNavProps {
  active?: NavItemKey;
  onNavigate?: (item: NavItemKey) => void;
  className?: string;
}

export function BottomNav({ active = 'today', onNavigate, className }: BottomNavProps) {
  return (
    <nav className={`${styles.bottomNav} ${className || ''}`} aria-label="Main navigation">
      {navItems.map(item => (
        <NavItem
          key={item.key}
          label={item.label}
          iconName={item.iconName}
          active={active === item.key}
          onClick={() => onNavigate?.(item.key)}
        />
      ))}
    </nav>
  );
}