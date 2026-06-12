'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { Icon } from '../Icon';
import { MEAL_LABELS, MEAL_TIMES, MEAL_TYPES, type MealType } from '../lib/types';
import { MEALS, type Meal } from '../lib/meals';
import styles from './TodayScreen.module.css';

export type EatenMap = Record<MealType, boolean>;
export type MealLog = Partial<Record<MealType, string>>;
export type MealOverrides = Partial<Record<MealType, Meal>>;
export type DayBadge = { day: string; earnedAt: number };

interface TodayScreenProps {
  eaten: EatenMap;
  setEaten: Dispatch<SetStateAction<EatenMap>>;
  mealLog: MealLog;
  setMealLog: Dispatch<SetStateAction<MealLog>>;
  dayBadges: DayBadge[];
  setDayBadges: Dispatch<SetStateAction<DayBadge[]>>;
  setDayBadgeClaimed: (v: boolean) => void;
  setShowCel: (v: boolean) => void;
  userName: string;
  onMeal: (meal: Meal, mealType: MealType) => void;
}

export function TodayScreen({
  eaten,
  setEaten,
  mealLog,
  setMealLog,
  dayBadges,
  setDayBadges,
  setDayBadgeClaimed,
  setShowCel,
  userName,
  onMeal,
}: TodayScreenProps) {
  const now = new Date();
  const todayIdx = Math.min(now.getDay() === 0 ? 6 : now.getDay() - 1, 6);
  const today = MEALS.week1[todayIdx]!;
  const tomorrow = MEALS.week1[(todayIdx + 1) % 7]!;
  const doneCount = MEAL_TYPES.filter((t) => eaten[t]).length;
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  void dayBadges; // surfaced via callback only

  const [swapModal, setSwapModal] = useState<MealType | null>(null);
  const [swapClosing, setSwapClosing] = useState(false);
  const [mealOverrides, setMealOverrides] = useState<MealOverrides>({});
  const [logTarget, setLogTarget] = useState<MealType | null>(null);
  const [logText, setLogText] = useState('');
  const [logClosing, setLogClosing] = useState(false);

  function closeSwap() {
    setSwapClosing(true);
    setTimeout(() => {
      setSwapModal(null);
      setSwapClosing(false);
    }, 280);
  }

  function applySwap(type: MealType, newMeal: Meal) {
    setMealOverrides((p) => ({ ...p, [type]: newMeal }));
    closeSwap();
  }

  function getMeal(type: MealType): Meal {
    return mealOverrides[type] || today.meals[type];
  }

  function openLog(type: MealType) {
    setLogTarget(type);
    setLogText(mealLog[type] || '');
  }

  function closeLog() {
    setLogClosing(true);
    setTimeout(() => {
      setLogTarget(null);
      setLogClosing(false);
    }, 280);
  }

  function saveLog() {
    setMealLog((p) => {
      const n = { ...p };
      if (logText.trim()) {
        n[logTarget!] = logText.trim();
      } else {
        delete n[logTarget!];
      }
      return n;
    });
    closeLog();
  }

  const allDays: { week: 'week1' | 'week2'; dayIdx: number; label: string; meals: DayMealsLite }[] = [];
  (['week1', 'week2'] as const).forEach((w) => {
    MEALS[w].forEach((d, i) => {
      allDays.push({
        week: w,
        dayIdx: i,
        label: (w === 'week1' ? 'Wk1' : 'Wk2') + ' ' + d.day,
        meals: d.meals,
      });
    });
  });

  return (
    <div>
      <div className={styles.headBlock}>
        <p className={styles.eyebrow}>
          Today &middot; {date}
        </p>
        <h1 className={styles.title}>
          Hi {userName ? userName.split(' ')[0] + ',' : ''} today&apos;s meals.
        </h1>
        <p className={styles.subtitle}>Week 1 &middot; Insulin Sensitivity &amp; Gut Health</p>
      </div>

      <div className={styles.list}>
        <div className={styles.listHead}>
          <p className={styles.listLabel}>Today&apos;s meals</p>
          <div className={styles.listMeta}>
            <button
              type="button"
              onClick={() => {
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                setDayBadges((p) => {
                  const n = p.slice();
                  for (let i = 0; i < 7; i++) n.push({ day: days[i]!, earnedAt: Date.now() + i });
                  return n;
                });
                setDayBadgeClaimed(true);
                setTimeout(() => setShowCel(true), 400);
              }}
              className={styles.demoBtn}
              aria-label="Demo shortcut — earn all day badges"
            >
              demo
            </button>
            <span className={styles.proteinPill}>{doneCount * 30}g</span>
            <span className={styles.proteinTotal}>of 120g protein</span>
          </div>
        </div>
        <div className={styles.progressRow}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: doneCount === 0 ? '4%' : (doneCount / 4) * 100 + '%' }}
            />
          </div>
          <span className={styles.progressLabel}>{doneCount}/4</span>
        </div>
        {MEAL_TYPES.map((type) => {
          const meal = getMeal(type);
          const done = !!eaten[type];
          const hasNote = !!mealLog[type];
          const isSwapped = !!mealOverrides[type];
          return (
            <div
              key={type}
              className={styles.mealRow}
              style={{ opacity: done ? 0.45 : 1 }}
            >
              <button
                type="button"
                onClick={() =>
                  setEaten((p) => {
                    const n = { ...p };
                    n[type] = !p[type];
                    return n;
                  })
                }
                className={done ? styles.checkOn : styles.checkOff}
                aria-label={done ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {done && <Icon name="check" size={12} />}
              </button>
              <div className={styles.mealBody} onClick={() => onMeal(meal, type)}>
                <div className={styles.mealHead}>
                  <div className={styles.mealType}>{MEAL_LABELS[type]}</div>
                  {isSwapped && <div className={styles.swappedTag}>swapped</div>}
                </div>
                <div className={styles.mealName}>{meal.name}</div>
                <div className={styles.mealMeta}>
                  {MEAL_TIMES[type]} &middot; ~{meal.protein}g protein
                </div>
              </div>
              {!done && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSwapModal(type);
                  }}
                  className={styles.swapBtn}
                  aria-label="Swap meal"
                >
                  <Icon name="swap" size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openLog(type);
                }}
                className={hasNote ? styles.logBtnOn : styles.logBtn}
                aria-label="Log meal"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {swapModal && (
        <div
          className={`${styles.overlay} ${swapClosing ? styles.overlayClosing : ''}`}
          onClick={closeSwap}
        >
          <div
            className={`${styles.swapSheet} ${swapClosing ? styles.swapSheetClosing : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.sheetHandleRow}>
              <span className={styles.spacer} />
              <div className={styles.handle} />
              <span className={styles.spacerEnd}>
                <button type="button" onClick={closeSwap} className={styles.sheetClose} aria-label="Close">
                  <Icon name="x" size={12} />
                </button>
              </span>
            </div>
            <div className={styles.sheetTitle}>Swap {MEAL_LABELS[swapModal]}</div>
            <div className={styles.sheetSub}>Choose a day to swap with</div>
            <div className={styles.swapList}>
              {allDays
                .filter((d) => !(d.week === 'week1' && d.dayIdx === todayIdx))
                .map((d, i) => {
                  const m = d.meals[swapModal];
                  return (
                    <div
                      key={i}
                      onClick={() => applySwap(swapModal, m)}
                      className={styles.swapRow}
                    >
                      <div className={styles.swapDot} />
                      <div className={styles.swapInfo}>
                        <div className={styles.swapDay}>{d.label}</div>
                        <div className={styles.swapName}>{m.name}</div>
                      </div>
                      <span className={styles.swapProtein}>~{m.protein}g</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      <div className={styles.tomorrowBlock}>
        <p className={styles.tomorrowLabel}>Tomorrow</p>
        <div className={styles.tomorrowScroll}>
          <div className={styles.tomorrowTrack}>
            {MEAL_TYPES.map((type, i) => (
              <div
                key={type}
                onClick={() => onMeal(tomorrow.meals[type], type)}
                className={styles.tomorrowCard}
                style={{ marginLeft: i === 0 ? 20 : 0 }}
              >
                <div className={styles.tomorrowType}>{MEAL_LABELS[type]}</div>
                <div className={styles.tomorrowName}>{tomorrow.meals[type].name}</div>
                <div className={styles.tomorrowMeta}>
                  ~{tomorrow.meals[type].protein}g protein
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {logTarget && (
        <div
          className={`${styles.overlay} ${logClosing ? styles.overlayClosing : ''}`}
          onClick={closeLog}
        >
          <div
            className={`${styles.logSheet} ${logClosing ? styles.swapSheetClosing : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.sheetHandleRow}>
              <span className={styles.spacer} />
              <div className={styles.handle} />
              <span className={styles.spacerEnd}>
                <button type="button" onClick={closeLog} className={styles.sheetClose} aria-label="Close">
                  <Icon name="x" size={12} />
                </button>
              </span>
            </div>
            <div className={styles.logBody}>
              <div className={styles.logEyebrow}>
                {MEAL_LABELS[logTarget]} &middot; Log
              </div>
              <h3 className={styles.logTitle}>
                {getMeal(logTarget) ? getMeal(logTarget)!.name : ''}
              </h3>
              {mealOverrides[logTarget] && (
                <div className={styles.swappedNote}>Swapped from original plan</div>
              )}
              <div className={styles.logHelp}>
                What did you actually eat? Note any deviations, swaps, or how you felt.
              </div>
              <textarea
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                placeholder="e.g. Swapped salmon for sardines, felt bloated after, skipped the snack..."
                className={styles.logInput}
              />
              <div className={styles.logActions}>
                <button type="button" onClick={saveLog} className={styles.logSave}>
                  Save note
                </button>
                {mealLog[logTarget] && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogText('');
                      saveLog();
                    }}
                    className={styles.logClear}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type DayMealsLite = { breakfast: Meal; lunch: Meal; snack: Meal; dinner: Meal };
