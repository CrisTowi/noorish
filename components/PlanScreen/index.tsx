'use client';

import { useState } from 'react';
import { Icon } from '../Icon';
import { MEAL_LABELS, MEAL_TYPES, type MealType } from '../lib/types';
import { MEALS, getTotalProtein, type Meal } from '../lib/meals';
import type { ProgramId } from '../lib/programs';
import { ProgramSheet } from '../ProgramSheet';
import { PROGRAMS, type Program } from '../lib/programs';
import { PREP_STEPS } from '../lib/shopping';
import styles from './PlanScreen.module.css';

interface PlanScreenProps {
  onMeal: (meal: Meal, mealType: MealType) => void;
  activeProgram: ProgramId;
  setActiveProgram: (id: ProgramId) => void;
  onQuit?: () => void;
}

type WeekId = 'week1' | 'week2';

export function PlanScreen({ onMeal, activeProgram, setActiveProgram, onQuit }: PlanScreenProps) {
  const [activeWeek, setActiveWeek] = useState<WeekId>('week1');
  const [dayIdx, setDayIdx] = useState(0);
  const [showProgramSheet, setShowProgramSheet] = useState(false);
  const [showPrepSheet, setShowPrepSheet] = useState(false);
  const [prepDone, setPrepDone] = useState<Record<string, boolean>>({});
  const [prepClosing, setPrepClosing] = useState(false);

  const program = PROGRAMS.find((p) => p.id === activeProgram) || PROGRAMS[0]!;
  const subtitles: Record<WeekId, string> = {
    week1: program.weeks[0] || '',
    week2: program.weeks[1] || program.weeks[0] || '',
  };
  const day = MEALS[activeWeek][dayIdx]!;
  const total = getTotalProtein(day);
  const prepCount = Object.values(prepDone).filter(Boolean).length;

  function closePrepSheet() {
    setPrepClosing(true);
    setTimeout(() => {
      setShowPrepSheet(false);
      setPrepClosing(false);
    }, 300);
  }

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.eyebrow}>14-Day Protocol</p>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Meal Plan</h1>
            <p className={styles.subtitle}>{subtitles[activeWeek]}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowProgramSheet(true)}
            className={styles.changeBtn}
          >
            Change
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        {(['week1', 'week2'] as const).map((w, i) => {
          const active = activeWeek === w;
          return (
            <button
              key={w}
              type="button"
              onClick={() => {
                setActiveWeek(w);
                setDayIdx(0);
              }}
              className={active ? styles.tabActive : styles.tab}
            >
              Week {i + 1}
            </button>
          );
        })}
      </div>

      <div className={styles.dayScroll}>
        <div className={styles.dayTrack}>
          {MEALS[activeWeek].map((d, i) => {
            const active = dayIdx === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setDayIdx(i)}
                className={active ? styles.dayPillActive : styles.dayPill}
              >
                <span className={active ? styles.dayLabelActive : styles.dayLabel}>{d.day}</span>
                <span className={active ? styles.dayNumActive : styles.dayNum}>{i + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardTitle}>{day.full}</div>
          <div className={styles.cardMeta}>{total}g protein</div>
        </div>
        {MEAL_TYPES.map((type) => (
          <div
            key={type}
            onClick={() => onMeal(day.meals[type], type)}
            className={styles.mealRow}
          >
            <span className={styles.mealType}>{MEAL_LABELS[type]}</span>
            <span className={styles.mealName}>{day.meals[type].name}</span>
            <span className={styles.mealProtein}>{day.meals[type].protein}g</span>
          </div>
        ))}
      </div>

      <div className={styles.prepWrap}>
        <button type="button" onClick={() => setShowPrepSheet(true)} className={styles.prepBtn}>
          <div className={styles.prepInner}>
            <div className={styles.prepIcon}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div className={styles.prepText}>
              <div className={styles.prepTitle}>Sunday Prep Guide</div>
              <div className={styles.prepMeta}>
                {prepCount}/{PREP_STEPS.length} steps done
              </div>
            </div>
          </div>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--muted-light)" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className={styles.bottomSpacer} />

      {showProgramSheet && (
        <ProgramSheet
          activeProgram={activeProgram}
          setActiveProgram={(id) => setActiveProgram(id as ProgramId)}
          onClose={() => setShowProgramSheet(false)}
          onQuit={onQuit}
          programs={PROGRAMS as Program[]}
        />
      )}

      {showPrepSheet && (
        <div
          className={`${styles.overlay} ${prepClosing ? styles.overlayClosing : ''}`}
          onClick={closePrepSheet}
        >
          <div
            className={`${styles.sheet} ${prepClosing ? styles.sheetClosing : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.sheetHandleRow}>
              <span className={styles.spacer} />
              <div className={styles.handle} />
              <span className={styles.spacerEnd}>
                <button type="button" onClick={closePrepSheet} className={styles.sheetClose} aria-label="Close">
                  <Icon name="x" size={12} />
                </button>
              </span>
            </div>
            <div className={styles.sheetHead}>
              <p className={styles.sheetEyebrow}>Batch cooking</p>
              <h2 className={styles.sheetTitle}>Sunday Prep</h2>
              <div className={styles.prepProgress}>
                <div className={styles.prepTrack}>
                  <div
                    className={styles.prepFill}
                    style={{ width: (prepCount / PREP_STEPS.length) * 100 + '%' }}
                  />
                </div>
                <span className={styles.prepCount}>
                  {prepCount}/{PREP_STEPS.length}
                </span>
              </div>
            </div>
            <div className={styles.prepList}>
              {PREP_STEPS.map((step) => {
                const done = !!prepDone[step.id];
                return (
                  <div
                    key={step.id}
                    onClick={() =>
                      setPrepDone((p) => ({ ...p, [step.id]: !p[step.id] }))
                    }
                    className={styles.prepStep}
                    style={{ opacity: done ? 0.5 : 1 }}
                  >
                    <div className={done ? styles.prepCheckOn : styles.prepCheckOff}>
                      {done && <Icon name="check" size={11} />}
                    </div>
                    <div className={styles.prepStepBody}>
                      <div className={styles.prepStepHead}>
                        <div
                          className={done ? styles.prepStepTitleDone : styles.prepStepTitle}
                        >
                          {step.title}
                        </div>
                        <div className={styles.prepStepDur}>{step.duration}</div>
                      </div>
                      <div className={styles.prepStepDesc}>{step.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
