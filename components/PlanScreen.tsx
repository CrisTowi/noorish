'use client';

import { useState } from 'react';
import { Icon } from './Icons';
import { MEAL_LABELS, MEAL_PLAN, PREP_STEPS, getTotalProtein, MealType } from '@/lib/meal-data';

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
      <div className="week-toggle">
        {Object.entries(MEAL_PLAN).map(([key, week]) => (
          <button
            key={key}
            className={`week-btn ${selectedWeek === key ? 'active' : ''}`}
            onClick={() => setSelectedWeek(key as 'week1' | 'week2')}
          >
            {week.label}
          </button>
        ))}
      </div>

      {/* Day scroll */}
      <div className="day-scroll-wrap">
        <div className="day-scroll">
          {weekData.days.map((day, index) => (
            <button
              key={day.day}
              className={`day-pill ${selectedDay === index ? 'active' : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              <span className="dp-label">{day.day}</span>
              <span className="dp-num">{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Day card */}
      <div className="plan-card">
        <div className="plan-card-header">
          <div>
            <div className="plan-card-day">{dayData.full}</div>
            <div className="plan-card-meta">~{getTotalProtein(dayData)}g protein</div>
          </div>
        </div>
        {(Object.keys(MEAL_LABELS) as MealType[]).map(type => (
          <div key={type} className="plan-meal-row">
            <div className="plan-meal-type">{MEAL_LABELS[type]}</div>
            <div className="plan-meal-name">{dayData.meals[type].name}</div>
            <span className="plan-meal-protein">{dayData.meals[type].protein}g</span>
          </div>
        ))}
      </div>

      {/* Prep section */}
      <button className="prep-btn">
        <span className="prep-btn-label">Weekly Prep</span>
        <span className="prep-badge">{Object.values(completedSteps).filter(Boolean).length}/{PREP_STEPS.length}</span>
      </button>

      <div className="card" style={{ margin: '14px 20px 0' }}>
        {PREP_STEPS.map((step, index) => (
          <div
            key={index}
            className="prep-step"
            onClick={() => togglePrepStep(index)}
          >
            <div className={`prep-step-num ${completedSteps[`prep-${index}`] ? 'done' : ''}`}>
              {completedSteps[`prep-${index}`] ? '✓' : index + 1}
            </div>
            <div>
              <div className={`prep-step-title ${completedSteps[`prep-${index}`] ? 'done' : ''}`}>
                {step.title}
              </div>
              <div className={`prep-step-desc ${completedSteps[`prep-${index}`] ? 'done' : ''}`}>
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}