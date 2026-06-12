'use client';

import { useState } from 'react';
import { BadgeCircle } from '../BadgeCircle';
import { GOALS, PREFS, PROGRAMS } from '../lib/programs';
import styles from './Onboarding.module.css';

interface OnboardingData {
  name: string;
  program: string;
  prefs: string[];
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const TOTAL = 5;

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [goal, setGoal] = useState('');
  const [prefs, setPrefs] = useState<string[]>([]);
  const [dir, setDir] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [loading, setLoading] = useState(false);

  function goTo(n: number) {
    setDir(n > step ? 1 : -1);
    setAnimKey((k) => k + 1);
    setStep(n);
  }

  function next() {
    goTo(step + 1);
  }

  function back() {
    goTo(step - 1);
  }

  function togglePref(id: string) {
    setPrefs((p) => (p.indexOf(id) > -1 ? p.filter((x) => x !== id) : p.concat([id])));
  }

  function finish() {
    setLoading(true);
    setTimeout(() => {
      const programId = goal || 'hormone';
      onComplete({ name: userName.trim() || 'there', program: programId, prefs });
    }, 2600);
  }

  const slideAnim = dir > 0 ? styles.slideInRight : styles.slideInLeft;

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.breathe}>
          <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="36" fill="var(--olive-pale)" />
            <path d="M36 52V28" stroke="var(--olive)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M36 40 C36 40 26 36 22 26 C28 24 38 28 38 38" fill="var(--olive)" opacity="0.85" />
            <path d="M36 34 C36 34 44 30 50 20 C44 18 34 24 34 34" fill="var(--olive-light)" opacity="0.8" />
          </svg>
        </div>
        <div className={styles.loadingTitle}>Building your plan</div>
        <div className={styles.dots}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={styles.dot}
              style={{ animationDelay: i * 0.2 + 's' }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {step > 0 && step < TOTAL - 1 && (
        <div className={styles.dotsRow}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={step === i ? styles.dotActive : step > i ? styles.dotDone : styles.dotPending}
            />
          ))}
        </div>
      )}

      {step > 0 && step < TOTAL - 1 && (
        <button type="button" onClick={back} className={styles.backBtn} aria-label="Back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
      )}

      <div key={animKey} className={step === 0 ? undefined : slideAnim}>
        {step === 0 && (
          <div className={styles.step0}>
            <div className={styles.brand}>noorish</div>
            <h1 className={styles.heroTitle}>
              Eat with intention.
              <br />
              Feel the difference.
            </h1>
            <p className={styles.heroSub}>
              A personalised 14-day nutrition protocol built around your body and your goals.
            </p>
            <button type="button" onClick={next} className={styles.cta}>
              Get started
            </button>
            <p className={styles.tiny}>Takes about 1 minute</p>
          </div>
        )}

        {step === 1 && (
          <div className={styles.stepBody}>
            <p className={styles.eyebrow}>Step 1 of 4</p>
            <h2 className={styles.stepTitle}>What should we call you?</h2>
            <p className={styles.stepSub}>We&apos;ll use this to personalise your experience.</p>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && userName.trim()) next();
              }}
              placeholder="Your first name"
              autoFocus={true}
              className={styles.input}
            />
            <button
              type="button"
              onClick={next}
              disabled={!userName.trim()}
              className={!userName.trim() ? styles.ctaDisabled : styles.cta}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepBody}>
            <p className={styles.eyebrow}>Step 2 of 4</p>
            <h2 className={styles.stepTitle}>What&apos;s your main goal?</h2>
            <p className={styles.stepSub}>We&apos;ll tailor your 14-day plan around this.</p>
            <div className={styles.goalList}>
              {GOALS.map((g) => {
                const sel = goal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={sel ? styles.goalOn : styles.goal}
                  >
                    <div className={styles.goalInfo}>
                      <div className={styles.goalLabel}>{g.label}</div>
                      <div className={styles.goalDesc}>{g.desc}</div>
                    </div>
                    <div className={sel ? styles.radioOn : styles.radioOff}>
                      {sel && (
                        <svg width="10" height="8" viewBox="0 0 14 11" fill="none">
                          <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={next}
              disabled={!goal}
              className={!goal ? styles.ctaDisabled : styles.cta}
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepBody}>
            <p className={styles.eyebrow}>Step 3 of 4</p>
            <h2 className={styles.stepTitle}>Any dietary needs?</h2>
            <p className={styles.stepSub}>Select all that apply. You can change these later.</p>
            <div className={styles.prefWrap}>
              {PREFS.map((pref) => {
                const sel = prefs.indexOf(pref.id) > -1;
                return (
                  <div
                    key={pref.id}
                    onClick={() => togglePref(pref.id)}
                    className={sel ? styles.prefOn : styles.pref}
                  >
                    {pref.label}
                  </div>
                );
              })}
            </div>
            <button type="button" onClick={next} className={styles.cta}>
              Continue
            </button>
            <button type="button" onClick={next} className={styles.skip}>
              Skip for now
            </button>
          </div>
        )}

        {step === 4 && (
          <div className={styles.step4}>
            <div className={styles.step4Badge}>
              <BadgeCircle variant={0} size={100} animate={true} />
            </div>
            <h2 className={styles.step4Title}>
              {userName.trim() ? "You're all set, " + userName.trim().split(' ')[0] + '.' : "You're all set."}
            </h2>
            <p className={styles.step4Sub}>
              Your {PROGRAMS.find((p) => p.id === goal)?.name || 'plan'} starts today. Mark your meals each day to earn badges and track your progress.
            </p>
            <div className={styles.summary}>
              <div className={styles.summaryCell}>
                <div className={styles.summaryLabel}>Program</div>
                <div className={styles.summaryVal}>{PROGRAMS.find((p) => p.id === goal)?.name || 'Hormone & Fat Loss'}</div>
              </div>
              <div className={styles.summaryCell}>
                <div className={styles.summaryLabel}>Duration</div>
                <div className={styles.summaryVal}>14 days</div>
              </div>
              <div className={styles.summaryCellLast}>
                <div className={styles.summaryLabel}>Meals/day</div>
                <div className={styles.summaryVal}>4</div>
              </div>
            </div>
            <button type="button" onClick={finish} className={styles.cta}>
              Start my plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
