'use client';

import React, { useState } from 'react';
import { Icon } from './Icons';
import { MEAL_LABELS, getIngredientSwaps, getDefaultIngredients, MealType } from '@/lib/meal-data';

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
    <div className="sheet-overlay">
      <div className="sheet" onClick={e => e.stopPropagation()}>
        {/* Handle row */}
        <div className="sheet-handle-row">
          <span className="sheet-handle-spacer" />
          <div className="sheet-handle-bar" />
          <span className="sheet-handle-spacer sheet-handle-spacer--end">
            <button className="sheet-close" onClick={onClose} aria-label="Close">
              <Icon name="x" size={14} />
            </button>
          </span>
        </div>

        {/* Header */}
        <header className="sheet-header">
          <div className="sheet-badge">{MEAL_LABELS[mealType]}</div>
          <div className="sheet-title-row">
            <h2 className="sheet-title">{meal.name}</h2>
            <button className={`sheet-fav-btn${isFav ? ' active' : ''}`} onClick={toggleFav} aria-label="Save to favourites">
              <Icon name="bookmark" size={15} />
            </button>
          </div>
          <div className="sheet-macros">
            <div className="macro-pill">
              <div className="macro-val">{totals.cal}</div>
              <div className="macro-label">kcal</div>
            </div>
            <div className="macro-pill">
              <div className="macro-val protein">{totals.protein}g</div>
              <div className="macro-label">protein</div>
            </div>
            <div className="macro-pill">
              <div className="macro-val">{totals.carbs}g</div>
              <div className="macro-label">carbs</div>
            </div>
            <div className="macro-pill">
              <div className="macro-val">{totals.fat}g</div>
              <div className="macro-label">fat</div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="sheet-body">
          <p className="sheet-section-label">Ingredients</p>
          {ingredients.map(ing => (
            <div key={ing.id}>
              <div className="ingredient-row">
                <div className="ingredient-info">
                  <div className="ingredient-name">{ing.name}</div>
                  <div className="ingredient-qty">
                    {ing.qty} {ing.unit}
                  </div>
                </div>
                <div className="ingredient-cal">{ing.calories} kcal</div>
                <div className="ingredient-actions">
                  <button
                    className="ingredient-btn"
                    onClick={() => setSwapTarget(swapTarget === ing.id ? null : ing.id)}
                    aria-label="Swap ingredient"
                  >
                    <Icon name="swap" size={13} />
                  </button>
                  <button
                    className="ingredient-btn del"
                    onClick={() => deleteIngredient(ing.id)}
                    aria-label="Remove ingredient"
                  >
                    <Icon name="trash" size={13} />
                  </button>
                </div>
              </div>
              {swapTarget === ing.id && (
                <div className="swap-panel">
                  <div className="swap-panel-title">Swaps for {ing.name}</div>
                  {getIngredientSwaps(ing.name).map((s, i) => (
                    <div
                      key={i}
                      className="swap-panel-option"
                      onClick={() => {
                        setIngredients(prev => prev.map(x => (x.id === ing.id ? { ...x, name: s } : x)));
                        setSwapTarget(null);
                        setSaved(false);
                      }}
                    >
                      <div className="swap-panel-dot" />
                      <div className="swap-panel-text">{s}</div>
                    </div>
                  ))}
                  <div className="swap-panel-cancel" onClick={() => setSwapTarget(null)}>
                    Cancel
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add ingredient */}
        <div className="sheet-add-row">
          <input
            className="sheet-add-input"
            placeholder="Add ingredient…"
            value={addText}
            onChange={e => setAddText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addIngredient()}
          />
          <button className="sheet-add-btn" onClick={addIngredient}>
            Add
          </button>
        </div>

        {/* Footer */}
        <footer className="sheet-footer">
          <button className={`sheet-save-btn${saved ? ' saved' : ''}`} onClick={handleSave}>
            {saved ? 'Saved ✓' : 'Save changes'}
          </button>
        </footer>
      </div>
    </div>
  );
}