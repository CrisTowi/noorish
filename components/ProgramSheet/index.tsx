'use client';

import { useState } from 'react';
import type { Program, ProgramId } from '../lib/programs';
import { Icon } from '../Icon';
import styles from './ProgramSheet.module.css';

interface ProgramSheetProps {
  activeProgram: ProgramId;
  setActiveProgram: (id: ProgramId) => void;
  onClose: () => void;
  onQuit?: () => void;
  programs: Program[];
}

export function ProgramSheet({
  activeProgram,
  setActiveProgram,
  onClose,
  onQuit,
  programs,
}: ProgramSheetProps) {
  const [closing, setClosing] = useState(false);
  const [confirmProgram, setConfirmProgram] = useState<Program | null>(null);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 300);
  }

  function selectProgram(p: Program) {
    if (p.id === activeProgram) {
      handleClose();
      return;
    }
    setConfirmProgram(p);
  }

  function confirmQuit() {
    if (!confirmProgram) return;
    setActiveProgram(confirmProgram.id);
    if (onQuit) onQuit();
    setClosing(true);
    setTimeout(onClose, 300);
  }

  const currentProgram = programs.find((p) => p.id === activeProgram) || programs[0]!;

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ''}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.sheet} ${closing ? styles.sheetClosing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handleRow}>
          <span className={styles.spacer} />
          <div className={styles.handle} />
          <span className={styles.spacerEnd}>
            <button type="button" onClick={handleClose} className={styles.closeBtn} aria-label="Close">
              <Icon name="x" size={12} />
            </button>
          </span>
        </div>

        {confirmProgram ? (
          <div className={styles.confirmBody}>
            <div className={styles.confirmHeader}>
              <p className={styles.eyebrow}>Switching plan</p>
              <h3 className={styles.confirmTitle}>Are you sure you want to quit?</h3>
              <p className={styles.confirmBody}>
                You&apos;re leaving <span className={styles.strong}>{currentProgram.name}</span> to start{' '}
                <span className={styles.strong}>{confirmProgram.name}</span>.
              </p>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>What happens when you quit</p>
              <div className={styles.sectionList}>
                {[
                  { label: 'Week badges', detail: 'All week badges from this plan will be removed' },
                  { label: 'Week streak', detail: 'Your current streak resets to zero' },
                  { label: 'Meal progress', detail: "Checked meals and this week's progress will reset" },
                ].map((item, i) => (
                  <div key={i} className={styles.sectionRow}>
                    <div className={styles.xCircle}>
                      <svg viewBox="0 0 14 14" width="8" height="8" fill="none">
                        <path d="M11 3L3 11M3 3l8 8" stroke="var(--muted-light)" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div className={styles.rowLabel}>{item.label}</div>
                      <div className={styles.rowDetail}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>What you keep</p>
              <div className={styles.sectionRow}>
                <div className={styles.checkCircle}>
                  <svg viewBox="0 0 14 11" width="8" height="7" fill="none">
                    <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className={styles.rowLabel}>Day badges</div>
                  <div className={styles.rowDetail}>
                    Every daily badge you&apos;ve earned stays in your profile regardless of which plan you follow.
                  </div>
                </div>
              </div>
            </div>

            <button type="button" onClick={confirmQuit} className={styles.primaryBtn}>
              Yes, quit and start {confirmProgram.name}
            </button>
            <button type="button" onClick={() => setConfirmProgram(null)} className={styles.secondaryBtn}>
              Keep current plan
            </button>
          </div>
        ) : (
          <div className={styles.body}>
            <div className={styles.bodyHeader}>
              <p className={styles.eyebrow}>Choose program</p>
              <h2 className={styles.bodyTitle}>Your Programs</h2>
            </div>
            <div className={styles.list}>
              {programs.map((p) => {
                const isActive = activeProgram === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => selectProgram(p)}
                    className={isActive ? styles.cardActive : styles.card}
                  >
                    <div className={styles.cardBody}>
                      <div className={styles.cardHead}>
                        <div className={styles.cardTitle}>{p.name}</div>
                        <div className={styles.cardDuration}>{p.duration}</div>
                        {isActive && <div className={styles.activeTag}>Active</div>}
                      </div>
                      <div className={styles.cardDesc}>{p.desc}</div>
                      <div className={styles.tags}>
                        {p.weeks.map((w, i) => (
                          <div key={i} className={styles.tag}>
                            {w}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={isActive ? styles.radioOn : styles.radioOff}>
                      {isActive && (
                        <svg width="10" height="8" viewBox="0 0 14 11" fill="none">
                          <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
