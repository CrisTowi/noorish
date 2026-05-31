'use client';

import React, { useState } from 'react';
import { Icon } from '../Icons';
import { MEAL_LABELS, getIngredientSwaps, getDefaultIngredients, MealType } from '@/lib/meal-data';
import styles from './MealDetailSheet.module.css';

interface Ingredient {
  id: string;
  name: string;
  qty: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FavoriteItem {
  name: string;
  mealType: MealType;
  protein: number;
  calories: number;
  savedAt: number;
}

interface MealDetailSheetProps {
  meal: { name: string; protein: number };
  mealType: MealType;
  favorites: Record<string, FavoriteItem>;
  setFavorites: (favorites: Record<string, FavoriteItem>) => void;
  onClose: () => void;
  onSave?: (data: { meal: { name: string; protein: number }; mealType: MealType; ingredients: Ingredient[]; totals: { cal: number; protein: number; carbs: number; fat: number } }) => void;
}

export function MealDetailSheet({ meal, mealType, favorites, setFavorites, onClose, onSave }: MealDetailSheetProps) {
  const favKey = `${mealType}::${meal.name}`;
  const isFav = !!favorites[favKey];
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => getDefaultIngredients(mealType));
  const [addText, setAddText] = useState('');
  const [swapTarget, setSwapTarget] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const totals = ingredients.reduce(
    (acc, i) => ({
      cal: acc.cal + i.calories,
      protein: acc.protein + i.protein,
      carbs: acc.carbs + i.carbs,
      fat: acc.fat + i.fat,
    }),
    { cal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  async function toggleFav() {
    const newFavKey = favKey;
    
    if (isFav) {
      // Remove from favorites
      const newFavorites = { ...favorites };
      delete newFavorites[newFavKey];
      setFavorites(newFavorites);
      
      try {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mealName: meal.name, action: 'remove' })
        });
      } catch (e) {
        console.error('Failed to remove favorite:', e);
      }
    } else {
      // Add to favorites
      const newFavorites = {
        ...favorites,
        [newFavKey]: {
          name: meal.name,
          mealType,
          protein: totals.protein,
          calories: totals.cal,
          savedAt: Date.now(),
        }
      };
      setFavorites(newFavorites);
      
      try {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mealName: meal.name,
            mealType,
            proteinGrams: totals.protein,
            calories: totals.cal
          })
        });
      } catch (e) {
        console.error('Failed to add favorite:', e);
      }
    }
  }

  function deleteIngredient(id: string) {
    setIngredients(prev => prev.filter(i => i.id !== id));
    setSaved(false);
  }

  function addIngredient() {
    if (!addText.trim()) return;
    setIngredients(prev => [
      ...prev,
      { id: 'custom_' + Date.now(), name: addText.trim(), qty: 1, unit: 'serving', calories: 50, protein: 5, carbs: 5, fat: 2 },
    ]);
    setAddText('');
    setSaved(false);
  }

  function handleSave() {
    onSave && onSave({ meal, mealType, ingredients, totals });
    setSaved(true);
    setTimeout(onClose, 700);
  }

  return (
    <div className={styles.sheetOverlay}>
      <div className={styles.sheet} onClick={e => e.stopPropagation()}>
        {/* Handle row */}
        <div className={styles.sheetHandleRow}>
          <span className={styles.sheetHandleSpacer} />
          <div className={styles.sheetHandleBar} />
          <span className={styles.sheetHandleSpacerEnd}>
            <button className={styles.sheetClose} onClick={onClose} aria-label="Close">
              <Icon name="x" size={14} />
            </button>
          </span>
        </div>

        {/* Header */}
        <header className={styles.sheetHeader}>
          <div className={styles.sheetBadge}>{MEAL_LABELS[mealType]}</div>
          <div className={styles.sheetTitleRow}>
            <h2 className={styles.sheetTitle}>{meal.name}</h2>
            <button className={`${styles.sheetFavBtn} ${isFav ? styles.sheetFavBtnActive : ''}`} onClick={toggleFav} aria-label="Save to favourites">
              <Icon name="bookmark" size={15} />
            </button>
          </div>
          <div className={styles.sheetMacros}>
            <div className={styles.macroPill}>
              <div className={styles.macroVal}>{totals.cal}</div>
              <div className={styles.macroLabel}>kcal</div>
            </div>
            <div className={styles.macroPill}>
              <div className={`${styles.macroVal} ${styles.macroValProtein}`}>{totals.protein}g</div>
              <div className={styles.macroLabel}>protein</div>
            </div>
            <div className={styles.macroPill}>
              <div className={styles.macroVal}>{totals.carbs}g</div>
              <div className={styles.macroLabel}>carbs</div>
            </div>
            <div className={styles.macroPill}>
              <div className={styles.macroVal}>{totals.fat}g</div>
              <div className={styles.macroLabel}>fat</div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className={styles.sheetBody}>
          <p className={styles.sheetSectionLabel}>Ingredients</p>
          {ingredients.map(ing => (
            <div key={ing.id}>
              <div className={styles.ingredientRow}>
                <div className={styles.ingredientInfo}>
                  <div className={styles.ingredientName}>{ing.name}</div>
                  <div className={styles.ingredientQty}>
                    {ing.qty} {ing.unit}
                  </div>
                </div>
                <div className={styles.ingredientCal}>{ing.calories} kcal</div>
                <div className={styles.ingredientActions}>
                  <button
                    className={styles.ingredientBtn}
                    onClick={() => setSwapTarget(swapTarget === ing.id ? null : ing.id)}
                    aria-label="Swap ingredient"
                  >
                    <Icon name="swap" size={13} />
                  </button>
                  <button
                    className={`${styles.ingredientBtn} ${styles.ingredientBtnDel}`}
                    onClick={() => deleteIngredient(ing.id)}
                    aria-label="Remove ingredient"
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
                      className={styles.swapPanelOption}
                      onClick={() => {
                        setIngredients(prev => prev.map(x => (x.id === ing.id ? { ...x, name: s } : x)));
                        setSwapTarget(null);
                        setSaved(false);
                      }}
                    >
                      <div className={styles.swapPanelDot} />
                      <div className={styles.swapPanelText}>{s}</div>
                    </div>
                  ))}
                  <div className={styles.swapPanelCancel} onClick={() => setSwapTarget(null)}>
                    Cancel
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add ingredient */}
        <div className={styles.sheetAddRow}>
          <input
            className={styles.sheetAddInput}
            placeholder="Add ingredient…"
            value={addText}
            onChange={e => setAddText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addIngredient()}
          />
          <button className={styles.sheetAddBtn} onClick={addIngredient}>
            Add
          </button>
        </div>

        {/* Footer */}
        <footer className={styles.sheetFooter}>
          <button className={`${styles.sheetSaveBtn} ${saved ? styles.sheetSaveBtnSaved : ''}`} onClick={handleSave}>
            {saved ? 'Saved ✓' : 'Save changes'}
          </button>
        </footer>
      </div>
    </div>
  );
}
