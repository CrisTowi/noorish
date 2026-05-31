'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import { Icon } from '../Icons';
import { MEAL_LABELS, MEAL_TIMES, MEAL_PLAN, getTotalProtein, getAllDays, MealType } from '@/lib/meal-data';
import { MealDetailSheet } from '../MealDetailSheet';
import styles from './TodayScreen.module.css';

interface FavoriteItem {
  name: string;
  mealType: MealType;
  protein: number;
  calories: number;
  savedAt: number;
}

interface TodayScreenProps {
  eaten: Record<MealType, boolean>;
  setEaten: Dispatch<SetStateAction<Record<MealType, boolean>>>;
  mealOverrides: Record<string, { name: string; protein: number }>;
  setMealOverrides: Dispatch<SetStateAction<Record<string, { name: string; protein: number }>>>;
  favorites: Record<string, FavoriteItem>;
  setFavorites: Dispatch<SetStateAction<Record<string, FavoriteItem>>>;
}

export function TodayScreen({ eaten, setEaten, mealOverrides, setMealOverrides, favorites, setFavorites }: TodayScreenProps) {
  const week = 'week1';
  const dayIdx = 0;
  const tomorrowDayIdx = 1;
  const tomorrowWeek = 'week1';
  const todayData = MEAL_PLAN[week].days[dayIdx];
  const tomorrowData = MEAL_PLAN[tomorrowWeek].days[tomorrowDayIdx];
  const eatenCount = Object.values(eaten).filter(Boolean).length;

  const [swapModal, setSwapModal] = useState<{ mealType: MealType; forToday: boolean } | null>(null);
  const [swapStep, setSwapStep] = useState<{ mealType: MealType; srcWeek: string; srcDay: number } | null>(null);
  const [detailSheet, setDetailSheet] = useState<{ meal: { name: string; protein: number }; mealType: MealType } | null>(null);
  const [animating, setAnimating] = useState<Record<MealType, boolean>>({} as Record<MealType, boolean>);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  function getEffectiveMeal(w: string, d: number, type: MealType) {
    return mealOverrides[`${w}-${d}-${type}`] || MEAL_PLAN[w].days[d].meals[type];
  }

  async function toggleEaten(type: MealType) {
    const meal = getEffectiveMeal(week, dayIdx, type);
    
    if (!eaten[type]) {
      // Mark as eaten - save to database
      setAnimating((prev) => ({ ...prev, [type]: true }));
      
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: today,
            mealType: type,
            mealName: meal.name,
            proteinGrams: meal.protein,
            wasEaten: true
          })
        });
      } catch (e) {
        console.error('Failed to save meal:', e);
      }
      
      setTimeout(() => {
        setEaten((prev) => ({ ...prev, [type]: true }));
        setAnimating((prev) => ({ ...prev, [type]: false }));
      }, 480);
    } else {
      // Unmark - update database
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: today,
            mealType: type,
            mealName: meal.name,
            proteinGrams: meal.protein,
            wasEaten: false
          })
        });
      } catch (e) {
        console.error('Failed to update meal:', e);
      }
      
      setEaten((prev) => ({ ...prev, [type]: false }));
    }
  }

  function openSwap(mealType: MealType, forToday: boolean, e?: React.MouseEvent) {
    e?.stopPropagation();
    const srcWeek = forToday ? week : tomorrowWeek;
    const srcDay = forToday ? dayIdx : tomorrowDayIdx;
    setSwapModal({ mealType, forToday });
    setSwapStep({ mealType, srcWeek, srcDay });
  }

  function confirmSwap(tgtWeek: string, tgtDay: number) {
    if (!swapStep) return;
    const { mealType, srcWeek, srcDay } = swapStep;
    const srcKey = `${srcWeek}-${srcDay}-${mealType}`;
    const tgtKey = `${tgtWeek}-${tgtDay}-${mealType}`;
    const srcMeal = mealOverrides[srcKey] || MEAL_PLAN[srcWeek].days[srcDay].meals[mealType];
    const tgtMeal = mealOverrides[tgtKey] || MEAL_PLAN[tgtWeek].days[tgtDay].meals[mealType];
    setMealOverrides((prev) => ({ ...prev, [srcKey]: tgtMeal, [tgtKey]: srcMeal }));
    setSwapModal(null);
    setSwapStep(null);
  }

  const allDays = getAllDays();
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <main className="screen">
      <div className={styles.pageHeader}>
        <p className={styles.pageEyebrow}>Today · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
        <h1 className={styles.pageTitle}>Your Day</h1>
        <p className={styles.pageSubtitle}>120g protein goal · Fat loss protocol</p>
      </div>

      {/* Hero */}
      <div className={styles.todayHero}>
        <div className={styles.todayHeroDate}>{dateStr}</div>
        <div className={styles.todayHeroDay}>{todayData.full}</div>
        <div className={styles.todayHeroMeta}>
          <span className={styles.todayHeroPill}>{eatenCount * 27}g eaten</span>
          <span className={styles.todayHeroSub}>of {getTotalProtein(todayData)}g protein</span>
        </div>
      </div>

      {/* Progress */}
      <div className={styles.progressRow}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${(eatenCount / 4) * 100}%` }} />
        </div>
        <span className={styles.progressLabel}>{eatenCount}/4 meals</span>
      </div>

      {/* Today meals */}
      <div className={styles.mealList}>
        <p className={styles.sectionLabel}>Today&apos;s meals</p>
        {(Object.keys(MEAL_LABELS) as MealType[]).map((type) => {
          const meal = getEffectiveMeal(week, dayIdx, type);
          const isDone = !!eaten[type];
          const isAnim = !!animating[type];

          return (
            <div key={type} className={`${styles.mealCard} ${isDone ? styles.mealCardEaten : ''}`}>
              <button
                className={`${styles.mealCheck} ${isAnim ? styles.mealCheckAnimating : ''} ${isDone ? styles.mealCheckDone : ''}`}
                onClick={() => toggleEaten(type)}
                aria-label={`Mark ${MEAL_LABELS[type]} as eaten`}
              >
                <span className={styles.checkRing} />
                <span className={styles.checkParticles}>
                  {[1, 2, 3, 4, 5, 6].map((n) => <span key={n} className={styles.checkParticle} />)}
                </span>
                {(isDone || isAnim) && (
                  <svg className={styles.checkSvg} viewBox="0 0 13 10">
                    <path className={styles.checkPath} d="M1.5 5L5 8.5L11.5 1.5" />
                  </svg>
                )}
              </button>
              <div className={styles.mealCardBody} onClick={() => setDetailSheet({ meal, mealType: type })}>
                <div className={styles.mealTypeBadge}>{MEAL_LABELS[type]}</div>
                <div className={styles.mealName}>{meal.name}</div>
                <div className={styles.mealMeta}>{MEAL_TIMES[type]} · ~{meal.protein}g protein</div>
              </div>
              {!isDone && !isAnim && (
                <button className={styles.mealSwapBtn} onClick={(e) => openSwap(type, true, e)} aria-label="Swap meal">
                  <Icon name="swap" size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.h5} />

      {/* Tomorrow carousel */}
      <div className={`${styles.px5} ${styles.mb3}`}>
        <div className={styles.flexRowBetween}>
          <p className={`${styles.sectionLabel} ${styles.mb0}`}>Tomorrow · {tomorrowData.full}</p>
          <span className={styles.textSwipeHint}>swipe ›</span>
        </div>
      </div>
      <div className={styles.carouselScroll}>
        <div className={styles.carouselTrack}>
          {(Object.keys(MEAL_LABELS) as MealType[]).map((type) => {
            const meal = getEffectiveMeal(tomorrowWeek, tomorrowDayIdx, type);
            return (
              <div key={type} className={styles.carouselCard} onClick={() => setDetailSheet({ meal, mealType: type })}>
                <div className={styles.carouselCardTop}>
                  <div className={styles.mealTypeBadge}>{MEAL_LABELS[type]}</div>
                  <button className={styles.mealSwapBtn} onClick={(e) => openSwap(type, false, e)} aria-label="Swap meal">
                    <Icon name="swap" size={14} />
                  </button>
                </div>
                <div className={styles.mealName}>{meal.name}</div>
                <div className={`${styles.mealMeta} ${styles.mt1}`}>~{meal.protein}g protein · {MEAL_TIMES[type]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swap modal */}
      {swapModal && (
        <div className={styles.modalOverlay} onClick={() => { setSwapModal(null); setSwapStep(null); }}>
          <div className={styles.modalSheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHandle} />
            <div className={styles.modalTitle}>Swap {MEAL_LABELS[swapModal.mealType]}</div>
            <div className={styles.modalSub}>Choose a day to swap with</div>
            <div className="scroll-auto">
              {allDays.filter((d) => !(d.week === swapStep?.srcWeek && d.dayIdx === swapStep?.srcDay)).map((d, i) => {
                const m = mealOverrides[`${d.week}-${d.dayIdx}-${swapModal.mealType}`] || MEAL_PLAN[d.week].days[d.dayIdx].meals[swapModal.mealType];
                return (
                  <div key={i} className={styles.swapOption} onClick={() => confirmSwap(d.week, d.dayIdx)}>
                    <div className={styles.swapDot} />
                    <div className={styles.swapOptionInfo}>
                      <div className={styles.swapOptionDay}>{d.label}</div>
                      <div className={styles.swapOptionName}>{m.name}</div>
                    </div>
                    <span className={styles.swapOptionProtein}>~{m.protein}g</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Detail sheet */}
      {detailSheet && (
        <MealDetailSheet
          meal={detailSheet.meal}
          mealType={detailSheet.mealType}
          favorites={favorites}
          setFavorites={setFavorites}
          onClose={() => setDetailSheet(null)}
          onSave={({ meal, mealType, ingredients, totals }) => console.log('Save', { meal, mealType, ingredients, totals })}
        />
      )}
    </main>
  );
}
