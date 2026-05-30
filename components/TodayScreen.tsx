'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import { Icon } from './Icons';
import { MEAL_LABELS, MEAL_TIMES, MEAL_PLAN, getTotalProtein, getAllDays, MealType } from '@/lib/meal-data';
import { MealDetailSheet } from './MealDetailSheet';

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

  function getEffectiveMeal(w: string, d: number, type: MealType) {
    return mealOverrides[`${w}-${d}-${type}`] || MEAL_PLAN[w].days[d].meals[type];
  }

  function toggleEaten(type: MealType) {
    if (!eaten[type]) {
      setAnimating((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setEaten((prev) => ({ ...prev, [type]: true }));
        setAnimating((prev) => ({ ...prev, [type]: false }));
      }, 480);
    } else {
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
      <div className="page-header">
        <p className="page-eyebrow">Today · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
        <h1 className="page-title">Your Day</h1>
        <p className="page-subtitle">120g protein goal · Fat loss protocol</p>
      </div>

      {/* Hero */}
      <div className="today-hero">
        <div className="today-hero-date">{dateStr}</div>
        <div className="today-hero-day">{todayData.full}</div>
        <div className="today-hero-meta">
          <span className="today-hero-pill">{eatenCount * 27}g eaten</span>
          <span className="today-hero-sub">of {getTotalProtein(todayData)}g protein</span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-row">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(eatenCount / 4) * 100}%` }} />
        </div>
        <span className="progress-label">{eatenCount}/4 meals</span>
      </div>

      {/* Today meals */}
      <div className="meal-list">
        <p className="section-label">Today's meals</p>
        {(Object.keys(MEAL_LABELS) as MealType[]).map((type) => {
          const meal = getEffectiveMeal(week, dayIdx, type);
          const isDone = !!eaten[type];
          const isAnim = !!animating[type];

          return (
            <div key={type} className={`meal-card${isDone ? ' eaten' : ''}`}>
              <button
                className={`meal-check${isAnim ? ' meal-check--animating' : ''}${isDone ? ' meal-check--done' : ''}`}
                onClick={() => toggleEaten(type)}
                aria-label={`Mark ${MEAL_LABELS[type]} as eaten`}
              >
                <span className="check-ring" />
                <span className="check-particles">
                  {[1, 2, 3, 4, 5, 6].map((n) => <span key={n} className="check-particle" />)}
                </span>
                {(isDone || isAnim) && (
                  <svg className="check-svg" viewBox="0 0 13 10">
                    <path className="check-path" d="M1.5 5L5 8.5L11.5 1.5" />
                  </svg>
                )}
              </button>
              <div className="meal-card-body" onClick={() => setDetailSheet({ meal, mealType: type })}>
                <div className="meal-type-badge">{MEAL_LABELS[type]}</div>
                <div className="meal-name">{meal.name}</div>
                <div className="meal-meta">{MEAL_TIMES[type]} · ~{meal.protein}g protein</div>
              </div>
              {!isDone && !isAnim && (
                <button className="meal-swap-btn" onClick={(e) => openSwap(type, true, e)} aria-label="Swap meal">
                  <Icon name="swap" size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ height: 20 }} />

      {/* Tomorrow carousel */}
      <div style={{ padding: '0 20px', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p className="section-label" style={{ marginBottom: 0 }}>Tomorrow · {tomorrowData.full}</p>
          <span style={{ fontSize: 10, color: 'var(--muted-light)' }}>swipe ›</span>
        </div>
      </div>
      <div className="carousel-scroll">
        <div className="carousel-track">
          {(Object.keys(MEAL_LABELS) as MealType[]).map((type) => {
            const meal = getEffectiveMeal(tomorrowWeek, tomorrowDayIdx, type);
            return (
              <div key={type} className="carousel-card" onClick={() => setDetailSheet({ meal, mealType: type })}>
                <div className="carousel-card-top">
                  <div className="meal-type-badge">{MEAL_LABELS[type]}</div>
                  <button className="meal-swap-btn" onClick={(e) => openSwap(type, false, e)} aria-label="Swap meal">
                    <Icon name="swap" size={14} />
                  </button>
                </div>
                <div className="meal-name">{meal.name}</div>
                <div className="meal-meta" style={{ marginTop: 4 }}>~{meal.protein}g protein · {MEAL_TIMES[type]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swap modal */}
      {swapModal && (
        <div className="modal-overlay" onClick={() => { setSwapModal(null); setSwapStep(null); }}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">Swap {MEAL_LABELS[swapModal.mealType]}</div>
            <div className="modal-sub">Choose a day to swap with</div>
            <div style={{ maxHeight: 360, overflowY: 'auto' }}>
              {allDays.filter((d) => !(d.week === swapStep?.srcWeek && d.dayIdx === swapStep?.srcDay)).map((d, i) => {
                const m = mealOverrides[`${d.week}-${d.dayIdx}-${swapModal.mealType}`] || MEAL_PLAN[d.week].days[d.dayIdx].meals[swapModal.mealType];
                return (
                  <div key={i} className="swap-option" onClick={() => confirmSwap(d.week, d.dayIdx)}>
                    <div className="swap-dot" />
                    <div className="swap-option-info">
                      <div className="swap-option-day">{d.label}</div>
                      <div className="swap-option-name">{m.name}</div>
                    </div>
                    <span className="swap-option-protein">~{m.protein}g</span>
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