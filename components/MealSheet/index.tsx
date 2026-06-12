'use client';

import { useMemo, useState } from 'react';
import { Icon } from '../Icon';
import { MEAL_LABELS, type MealType } from '../lib/types';
import { getMealDetails, type MealDetail, type Meal } from '../lib/meals';
import { getIngredientSwaps } from '../lib/shopping';
import type { FavsMap } from '../SavedScreen';
import styles from './MealSheet.module.css';

interface MealSheetProps {
  meal: Meal;
  mealType: MealType;
  favs: FavsMap;
  setFavs: React.Dispatch<React.SetStateAction<FavsMap>>;
  onClose: () => void;
  onSaveToast?: (saved: boolean, name: string) => void;
}

interface Totals {
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function MealSheet({ meal, mealType, favs, setFavs, onClose, onSaveToast }: MealSheetProps) {
  const [closing, setClosing] = useState(false);
  const [ingredients, setIngredients] = useState<MealDetail[]>(() => getMealDetails(mealType));
  const [addText, setAddText] = useState('');
  const [swapTarget, setSwapTarget] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const totals = useMemo<Totals>(
    () =>
      ingredients.reduce(
        (acc, i) => ({
          cal: acc.cal + i.calories,
          protein: acc.protein + i.protein,
          carbs: acc.carbs + i.carbs,
          fat: acc.fat + i.fat,
        }),
        { cal: 0, protein: 0, carbs: 0, fat: 0 }
      ),
    [ingredients]
  );

  const favKey = mealType + '::' + meal.name;
  const isFav = !!favs[favKey];

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 300);
  }

  function toggleFav() {
    const nowSaved = !isFav;
    setFavs((p) => {
      const n = { ...p };
      if (n[favKey]) {
        delete n[favKey];
      } else {
        n[favKey] = {
          name: meal.name,
          mealType,
          protein: totals.protein,
          calories: totals.cal,
          savedAt: Date.now(),
        };
      }
      return n;
    });
    if (onSaveToast) onSaveToast(nowSaved, meal.name);
  }

  function deleteIngredient(id: string) {
    setIngredients((p) => p.filter((i) => i.id !== id));
    setSaved(false);
  }

  function addIngredient() {
    if (!addText.trim()) return;
    setIngredients((p) => [
      ...p,
      {
        id: 'c_' + Date.now(),
        name: addText.trim(),
        qty: 1,
        unit: 'serving',
        calories: 50,
        protein: 5,
        carbs: 5,
        fat: 2,
      },
    ]);
    setAddText('');
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(handleClose, 700);
  }

  function swapIngredient(id: string, newName: string) {
    setIngredients((p) => p.map((x) => (x.id === id ? { ...x, name: newName } : x)));
    setSwapTarget(null);
    setSaved(false);
  }

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.overlayClosing : ''}`}
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

        <div className={styles.headerBlock}>
          <div className={styles.mealType}>{MEAL_LABELS[mealType]}</div>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{meal.name}</h2>
            <button
              type="button"
              onClick={toggleFav}
              className={isFav ? styles.favBtnOn : styles.favBtn}
              aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
            >
              <Icon name="bookmark" size={15} />
            </button>
          </div>
          <div className={styles.macroRow}>
            {[
              { v: totals.cal, l: 'kcal' },
              { v: totals.protein + 'g', l: 'protein', p: true },
              { v: totals.carbs + 'g', l: 'carbs' },
              { v: totals.fat + 'g', l: 'fat' },
            ].map((m, i) => (
              <div key={i} className={styles.macroPill}>
                <div className={m.p ? styles.macroValAccent : styles.macroVal}>{m.v}</div>
                <div className={styles.macroLabel}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ingList}>
          <div className={styles.ingLabel}>Ingredients</div>
          {ingredients.map((ing) => (
            <div key={ing.id}>
              <div className={styles.ingRow}>
                <div className={styles.ingInfo}>
                  <div className={styles.ingName}>{ing.name}</div>
                  <div className={styles.ingQty}>
                    {ing.qty} {ing.unit}
                  </div>
                </div>
                <div className={styles.ingCal}>{ing.calories} kcal</div>
                <div className={styles.ingCal}>{ing.calories} kcal</div>
                <div className={styles.ingActions}>
                  <button
                    type="button"
                    onClick={() => setSwapTarget(swapTarget === ing.id ? null : ing.id)}
                    className={styles.ingBtn}
                    aria-label="Swap ingredient"
                  >
                    <Icon name="swap" size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteIngredient(ing.id)}
                    className={styles.ingBtn}
                    aria-label="Delete ingredient"
                  >
                    <Icon name="trash" size={13} />
                  </button>
                </div>
              </div>
              {swapTarget === ing.id && (
                <div className={styles.swapPanel}>
                  <div className={styles.swapPanelTitle}>Swaps for {ing.name}</div>
                  {getIngredientSwaps(ing.name).map((s, i) => (
                    <div
                      key={i}
                      onClick={() => swapIngredient(ing.id, s)}
                      className={i < 2 ? styles.swapOption : styles.swapOptionLast}
                    >
                      <div className={styles.swapDot} />
                      <div className={styles.swapName}>{s}</div>
                    </div>
                  ))}
                  <div onClick={() => setSwapTarget(null)} className={styles.swapCancel}>
                    Cancel
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.addRow}>
          <input
            value={addText}
            onChange={(e) => setAddText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addIngredient();
            }}
            placeholder="Add ingredient..."
            className={styles.addInput}
          />
          <button type="button" onClick={addIngredient} className={styles.addBtn}>
            Add
          </button>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            onClick={handleSave}
            className={saved ? styles.saveBtnSaved : styles.saveBtn}
          >
            {saved ? 'Saved!' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
