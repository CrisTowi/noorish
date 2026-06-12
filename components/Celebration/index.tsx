'use client';

import { useEffect, useState } from 'react';
import { BadgeCircle } from '../BadgeCircle';
import styles from './Celebration.module.css';

interface CelebrationProps {
  weekNum: number;
  variant: number;
  onCollect: () => void;
  onDismiss: () => void;
}

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function Celebration({ weekNum, variant, onCollect, onDismiss }: CelebrationProps) {
  const [vis, setVis] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  function handleClose(fn: () => void) {
    setClosing(true);
    setTimeout(fn, 300);
  }

  return (
    <div className={`${styles.overlay} ${closing ? styles.overlayClosing : ''}`}>
      <div className={`${styles.sheet} ${closing ? styles.sheetClosing : ''}`}>
        <div className={styles.handleRow}>
          <div className={styles.handle} />
        </div>
        <div className={styles.body}>
          <div className={vis ? styles.badge : styles.badgeHidden}>
            <BadgeCircle variant={variant} size={130} animate={vis} />
          </div>

          <div className={vis ? styles.title : styles.titleHidden}>{weekNum} Week Streak</div>
          <div className={vis ? styles.subtitle : styles.subtitleHidden}>You crushed it this week!</div>

          <div className={vis ? styles.weekRow : styles.weekRowHidden}>
            {WEEK_DAYS.map((d, i) => {
              const done = i < 4;
              return (
                <div key={i} className={styles.weekCell}>
                  <div className={done ? styles.weekLabelDone : styles.weekLabel}>{d}</div>
                  <div className={done ? styles.weekDotDone : styles.weekDot}>
                    {done && (
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={vis ? styles.statsCard : styles.statsCardHidden}>
            <div className={styles.statsLabel}>Your Stats</div>
            <div className={styles.statsRow}>
              {[
                { v: 7, l: 'Days' },
                { v: 28, l: 'Meals' },
                { v: '840g', l: 'Protein' },
                { v: '12,600', l: 'kcal' },
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

          <div className={vis ? styles.actions : styles.actionsHidden}>
            <button type="button" onClick={() => handleClose(onCollect)} className={styles.primaryBtn}>
              Collect badge
            </button>
            <button type="button" onClick={() => handleClose(onDismiss)} className={styles.secondaryBtn}>
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
