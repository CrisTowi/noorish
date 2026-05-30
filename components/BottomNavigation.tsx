'use client';

import { Icon } from './Icons';

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
    <nav className="bottom-nav">
      {navItems.map(item => (
        <button
          key={item.key}
          className={`nav-item ${active === item.key ? 'active' : ''}`}
          onClick={() => onNavigate(item.key)}
          aria-label={item.label}
        >
          <div className="nav-icon">
            <Icon name={item.iconName} size={28} />
          </div>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}