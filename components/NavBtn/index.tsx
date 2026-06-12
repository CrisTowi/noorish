'use client';

import type { IconName } from '../Icon';
import { Icon } from '../Icon';
import styles from './NavBtn.module.css';

interface NavBtnProps {
  icon: IconName;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function NavBtn({ icon, label, active, onClick }: NavBtnProps) {
  return (
    <button type="button" onClick={onClick} className={styles.btn} aria-label={label}>
      <div className={active ? styles.iconActive : styles.icon}>
        <Icon name={icon} size={18} />
      </div>
      <span className={active ? styles.labelActive : styles.label}>{label}</span>
    </button>
  );
}
