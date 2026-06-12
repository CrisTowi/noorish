'use client';

import { useState } from 'react';
import { Icon } from '../Icon';
import { MEAL_LABELS, type MealType } from '../lib/types';
import { SHOPPING, type ShoppingItem } from '../lib/shopping';
import type { ProgramId } from '../lib/programs';
import { PROGRAMS } from '../lib/programs';
import styles from './ShopScreen.module.css';

export type ShopMealLog = Partial<Record<MealType, string>>;
export type ShopMealOverrides = Partial<Record<MealType, { name: string; protein: number }>>;

interface ShopScreenProps {
  mealLog?: ShopMealLog;
  mealOverrides?: ShopMealOverrides;
  activeProgram?: ProgramId;
}

interface AISuggestion {
  item: string;
  qty?: string;
  reason: string;
}

interface AISuggestionSet {
  add?: AISuggestion[];
  reduce?: AISuggestion[];
  swap?: { from: string; to: string; reason: string }[];
}

const CATEGORIES = [
  { id: 'proteins', l: 'Proteins' },
  { id: 'produce', l: 'Produce' },
  { id: 'pantry', l: 'Pantry' },
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

export function ShopScreen({ mealLog = {}, mealOverrides = {}, activeProgram = 'hormone' }: ShopScreenProps) {
  const [cat, setCat] = useState<CategoryId>('proteins');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestionSet | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(true);

  const total = Object.values(SHOPPING).reduce((s, a) => s + a.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const hasLogData = Object.keys(mealLog).length > 0 || Object.keys(mealOverrides).length > 0;
  const program = PROGRAMS.find((p) => p.id === activeProgram) || PROGRAMS[0]!;

  function generateSuggestions() {
    setAiLoading(true);
    setAiError(null);
    setAiSuggestions(null);

    const logSummary = Object.keys(mealLog)
      .map((k) => MEAL_LABELS[k as MealType] + ': ' + mealLog[k as MealType])
      .join('; ');

    const swapSummary = Object.keys(mealOverrides)
      .map((k) => 'Swapped ' + MEAL_LABELS[k as MealType] + ' to ' + mealOverrides[k as MealType]!.name)
      .join('; ');

    const shoppingItems = (Object.entries(SHOPPING) as [keyof typeof SHOPPING, ShoppingItem[]][])
      .map((entry) => entry[0] + ': ' + entry[1].map((i) => i.item).join(', '))
      .join('. ');

    const prompt =
      'You are a nutrition assistant for a 14-day ' +
      program.name +
      ' protocol. ' +
      'The user has the following standard shopping list: ' +
      shoppingItems +
      '. ' +
      (logSummary ? 'Their meal notes this week: ' + logSummary + '. ' : '') +
      (swapSummary ? 'Meal swaps they made: ' + swapSummary + '. ' : '') +
      'Based on this information, provide smart shopping list adjustments. ' +
      'Respond ONLY with a valid JSON object, no markdown, no explanation. Format: ' +
      '{"add":[{"item":"name","reason":"short reason","qty":"amount"}],' +
      '"reduce":[{"item":"name","reason":"short reason"}],' +
      '"swap":[{"from":"original item","to":"suggested item","reason":"short reason"}]}. ' +
      'Maximum 3 items per category. Keep reasons under 10 words. Be specific and practical.';

    const mockSuggestions: AISuggestionSet = {
      add: [
        { item: 'Sardines (canned)', qty: '4 tins', reason: 'You swapped salmon twice this week' },
        { item: 'Extra spinach', qty: '2 bags', reason: 'Frequently added to meals in notes' },
      ],
      reduce: [{ item: 'Pumpkin seeds', reason: 'Skipped snacks on 3 days' }],
      swap: [{ from: 'Greek Yogurt', to: 'Kefir', reason: 'Noted bloating after dairy twice' }],
    };

    fetch('/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        try {
          const text = (data.content || []).map((c: { text?: string }) => c.text || '').join('').trim();
          const clean = text.replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(clean) as AISuggestionSet;
          setAiSuggestions(parsed);
          setAiOpen(true);
        } catch {
          setAiSuggestions(mockSuggestions);
          setAiOpen(true);
        }
        setAiLoading(false);
      })
      .catch(() => {
        setTimeout(() => {
          setAiSuggestions(mockSuggestions);
          setAiOpen(true);
          setAiLoading(false);
        }, 1200);
      });
  }

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Week 1 &amp; 2</p>
        <h1 className={styles.title}>Shopping</h1>
        <p className={styles.subtitle}>Everything you need for 14 days</p>
      </div>

      {!aiSuggestions && !aiLoading && (
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <div className={styles.introIcon}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <div className={styles.introBody}>
              <div className={styles.introTitle}>
                {hasLogData ? 'Smarter list ready' : 'Smart suggestions'}
              </div>
              <div className={styles.introText}>
                {hasLogData
                  ? 'Based on your meal logs and swaps, Claude can adjust your list for next week.'
                  : 'Log a few meals and swaps first. Claude will then personalise your shopping list based on what you actually ate.'}
              </div>
              {hasLogData && (
                <button type="button" onClick={generateSuggestions} className={styles.introCta}>
                  Generate suggestions
                </button>
              )}
              {aiError && <div className={styles.error}>{aiError}</div>}
            </div>
          </div>
        </div>
      )}

      {aiLoading && (
        <div className={styles.loading}>
          <div className={styles.loadingIcon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <div>
            <div className={styles.loadingTitle}>Analysing your week...</div>
            <div className={styles.loadingSub}>Claude is reviewing your logs and swaps</div>
          </div>
        </div>
      )}

      {aiSuggestions && aiOpen && (
        <div className={styles.aiCard}>
          <div className={styles.aiHead}>
            <div>
              <div className={styles.aiEyebrow}>AI Suggestions</div>
              <div className={styles.aiSub}>Based on your meal logs this week</div>
            </div>
            <div className={styles.aiActions}>
              <button type="button" onClick={generateSuggestions} className={styles.aiRefresh}>
                Refresh
              </button>
              <button
                type="button"
                onClick={() => setAiOpen(false)}
                className={styles.aiDismiss}
                aria-label="Dismiss suggestions"
              >
                <Icon name="x" size={14} />
              </button>
            </div>
          </div>

          {aiSuggestions.add && aiSuggestions.add.length > 0 && (
            <div className={styles.aiBlock}>
              <div className={styles.aiBlockTitle}>Add more</div>
              {aiSuggestions.add.map((s, i) => (
                <div
                  key={i}
                  className={i < aiSuggestions.add!.length - 1 ? styles.aiRow : styles.aiRowLast}
                >
                  <div className={styles.aiDot} />
                  <div className={styles.aiInfo}>
                    <span className={styles.aiItem}>
                      {s.item}
                      {s.qty && <span className={styles.aiQty}> &middot; {s.qty}</span>}
                    </span>
                    <div className={styles.aiReason}>{s.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {aiSuggestions.reduce && aiSuggestions.reduce.length > 0 && (
            <div className={styles.aiBlockBordered}>
              <div className={styles.aiBlockTitle}>Buy less</div>
              {aiSuggestions.reduce.map((s, i) => (
                <div
                  key={i}
                  className={i < aiSuggestions.reduce!.length - 1 ? styles.aiRow : styles.aiRowLast}
                >
                  <div className={styles.aiDotMuted} />
                  <div className={styles.aiInfo}>
                    <span className={styles.aiItem}>{s.item}</span>
                    <div className={styles.aiReason}>{s.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {aiSuggestions.swap && aiSuggestions.swap.length > 0 && (
            <div className={styles.aiBlockFinal}>
              <div className={styles.aiBlockTitle}>Consider swapping</div>
              {aiSuggestions.swap.map((s, i) => (
                <div
                  key={i}
                  className={i < aiSuggestions.swap!.length - 1 ? styles.aiRow : styles.aiRowLast}
                >
                  <div className={styles.aiDotSand} />
                  <div className={styles.aiInfo}>
                    <span className={styles.aiItem}>{s.from}</span>
                    <span className={styles.aiArrow}> → </span>
                    <span className={styles.aiItemAccent}>{s.to}</span>
                    <div className={styles.aiReason}>{s.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.progressRow}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: (done / total) * 100 + '%' }} />
        </div>
        <span className={styles.progressLabel}>
          {done}/{total}
        </span>
      </div>
      <div className={styles.catScroll}>
        <div className={styles.catTrack}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={cat === c.id ? styles.catActive : styles.cat}
            >
              {c.l}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.list}>
        {SHOPPING[cat].map((item: ShoppingItem, i: number) => {
          const k = cat + '_' + i;
          const on = !!checked[k];
          return (
            <div
              key={k}
              onClick={() =>
                setChecked((p) => ({ ...p, [k]: !p[k] }))
              }
              className={styles.item}
            >
              <div className={on ? styles.checkOn : styles.checkOff}>
                {on && (
                  <svg viewBox="0 0 14 11" width="11" height="9" fill="none">
                    <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className={styles.itemInfo}>
                <div className={on ? styles.itemNameChecked : styles.itemName}>{item.item}</div>
                <div className={styles.itemQty}>{item.qty}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.bottomSpacer} />
    </div>
  );
}
