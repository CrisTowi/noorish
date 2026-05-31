'use client';

import { Icon } from '../Icons';
import styles from './BottomNavigation.module.css';

type NavItem = 'today' | 'plan' | 'shopping' | 'favorites';

interface BottomNavigationProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
}

const navItems: { key: NavItem; label: string; iconName: 'house' | 'calendar' | 'bag' | 'bookmark' }[] = [
  { key: 'today', label: 'Today', iconName: 'house' },
  { key: 'plan', label: 'Plan', iconName: 'calendar' },
  { key: 'shopping', label: 'Shop', iconName: 'bag' },
  { key: 'favorites', label: 'Saved', iconName: 'bookmark' },
];

export function BottomNavigation({ active, onNavigate }: BottomNavigationProps) {
  return (
    <nav className={styles.nav}>
      {navItems.map(item => (
        <button
          key={item.key}
          className={`${styles.item} ${active === item.key ? styles.active : ''}`}
          onClick={() => onNavigate(item.key)}
          aria-label={item.label}
        >
          <div className={styles.icon}>
            <Icon name={item.iconName} size={28} />
          </div>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
