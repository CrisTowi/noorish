'use client';

import { BadgeCircle } from '../BadgeCircle';
import { BadgeIcon } from '../BadgeIcon';
import styles from './ProfileScreen.module.css';

export interface WeekBadge {
  protein: number;
  calories: number;
  meals: number;
  variant: number;
}

export interface DayBadge {
  day: string;
  earnedAt: number;
}

interface ProfileScreenProps {
  badges: WeekBadge[];
  dayBadges?: DayBadge[];
}

export function ProfileScreen({ badges, dayBadges = [] }: ProfileScreenProps) {
  const tP = badges.reduce((s, b) => s + b.protein, 0);
  const tK = badges.reduce((s, b) => s + b.calories, 0);
  const tM = badges.reduce((s, b) => s + b.meals, 0);
  void tK;

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Your Journey</p>
        <h1 className={styles.title}>Profile</h1>
      </div>

      <div className={styles.statsWrap}>
        <div className={styles.statsCard}>
          <div className={styles.statsLabel}>Lifetime Stats</div>
          <div className={styles.statsRow}>
            {[
              { v: badges.length, l: 'Weeks' },
              { v: dayBadges.length, l: 'Days' },
              { v: tM, l: 'Meals' },
              { v: tP + 'g', l: 'Protein' },
            ].map((s, i, a) => (
              <div
                key={i}
                className={i < a.length - 1 ? styles.statCell : styles.statCellLast}
              >
                <div className={styles.statL}>{s.l}</div>
                <div className={styles.statV}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {dayBadges.length > 0 && (
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Day Badges</p>
          <div className={styles.dayGrid}>
            {dayBadges.map((b, i) => (
              <div key={i} className={styles.dayChip}>
                <div className={styles.dayIcon}>
                  <BadgeIcon variant={i % 7} size={16} animate={false} />
                </div>
                <div>
                  <div className={styles.dayName}>{b.day}</div>
                  <div className={styles.dayMeta}>All meals done</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Week Badges</p>
        {badges.length === 0 ? (
          <div className={styles.emptyWeek}>
            <div className={styles.emptyIcon}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className={styles.emptyText}>Complete a full week to earn your first week badge.</div>
          </div>
        ) : (
          badges.map((b, i) => (
            <div key={i} className={styles.weekRow}>
              <BadgeCircle variant={b.variant} size={52} animate={true} />
              <div className={styles.weekBody}>
                <div className={styles.weekTitle}>Week {i + 1} Complete</div>
                <div className={styles.weekMeta}>
                  {b.protein}g protein &middot; {b.calories.toLocaleString()} kcal
                </div>
              </div>
              <div className={styles.weekTag}>Earned</div>
            </div>
          ))
        )}
      </div>
      <div className={styles.bottomSpacer} />
    </div>
  );
}
