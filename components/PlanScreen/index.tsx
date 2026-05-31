'use client';

import { useState } from 'react';
import { MEAL_LABELS, MEAL_PLAN, PREP_STEPS, getTotalProtein, MealType } from '@/lib/meal-data';
import styles from './PlanScreen.module.css';

export function PlanScreen() {
  const [selectedWeek, setSelectedWeek] = useState<'week1' | 'week2'>('week1');
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const weekData = MEAL_PLAN[selectedWeek];
  const dayData = weekData.days[selectedDay];

  function togglePrepStep(index: number) {
    const key = `prep-${index}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <main className="screen">
      <div className="page-header">
        <p className="page-eyebrow">Meal Plan</p>
        <h1 className="page-title">Weekly Plan</h1>
        <p className="page-subtitle">{weekData.subtitle}</p>
      </div>

      {/* Week toggle */}
      <div className={styles.weekToggle}>
        {Object.entries(MEAL_PLAN).map(([key, week]) => (
          <button
            key={key}
            className={`${styles.weekBtn} ${selectedWeek === key ? styles.weekBtnActive : ''}`}
            onClick={() => setSelectedWeek(key as 'week1' | 'week2')}
          >
            {week.label}
          </button>
        ))}
      </div>

      {/* Day scroll */}
      <div className={styles.dayScrollWrap}>
        <div className={styles.dayScroll}>
          {weekData.days.map((day, index) => (
            <button
              key={day.day}
              className={`${styles.dayPill} ${selectedDay === index ? styles.dayPillActive : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              <span className={styles.dpLabel}>{day.day}</span>
              <span className={styles.dpNum}>{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Day card */}
      <div className={styles.planCard}>
        <div className={styles.planCardHeader}>
          <div>
            <div className={styles.planCardDay}>{dayData.full}</div>
            <div className={styles.planCardMeta}>~{getTotalProtein(dayData)}g protein</div>
          </div>
        </div>
        {(Object.keys(MEAL_LABELS) as MealType[]).map(type => (
          <div key={type} className={styles.planMealRow}>
            <div className={styles.planMealType}>{MEAL_LABELS[type]}</div>
            <div className={styles.planMealName}>{dayData.meals[type].name}</div>
            <span className={styles.planMealProtein}>{dayData.meals[type].protein}g</span>
          </div>
        ))}
      </div>

      {/* Prep section */}
      <button className={styles.prepBtn}>
        <span className={styles.prepBtnLabel}>Weekly Prep</span>
        <span className={styles.prepBadge}>{Object.values(completedSteps).filter(Boolean).length}/{PREP_STEPS.length}</span>
      </button>

      <div className={`card ${styles.my5}`}>
        {PREP_STEPS.map((step, index) => (
          <div
            key={index}
            className={styles.prepStep}
            onClick={() => togglePrepStep(index)}
          >
            <div className={`${styles.prepStepNum} ${completedSteps[`prep-${index}`] ? styles.prepStepNumDone : ''}`}>
              {completedSteps[`prep-${index}`] ? '✓' : index + 1}
            </div>
            <div>
              <div className={`${styles.prepStepTitle} ${completedSteps[`prep-${index}`] ? styles.prepStepTitleDone : ''}`}>
                {step.title}
              </div>
              <div className={`${styles.prepStepDesc} ${completedSteps[`prep-${index}`] ? styles.prepStepDescDone : ''}`}>
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
