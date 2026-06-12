'use client';

import { Icon } from '../Icon';
import type { MealType } from '../lib/types';
import { MEAL_LABELS } from '../lib/types';
import styles from './SavedScreen.module.css';

export interface SavedMeal {
  name: string;
  mealType: MealType;
  protein: number;
  calories: number;
  savedAt: number;
}

export type FavsMap = Record<string, SavedMeal>;

interface SavedScreenProps {
  favs: FavsMap;
  setFavs: React.Dispatch<React.SetStateAction<FavsMap>>;
  onMeal: (meal: { name: string; protein: number }, mealType: MealType) => void;
}

export function SavedScreen({ favs, setFavs, onMeal }: SavedScreenProps) {
  const list = Object.values(favs);

  function unsave(key: string) {
    setFavs((p) => {
      const n = { ...p };
      delete n[key];
      return n;
    });
  }

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Saved</p>
        <h1 className={styles.title}>Favourites</h1>
      </div>
      {list.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <Icon name="bookmark" size={40} />
          </div>
          <p className={styles.emptyText}>Open any meal and tap the bookmark to save it here.</p>
        </div>
      ) : (
        list.map((f, i) => {
          const key = f.mealType + '::' + f.name;
          return (
            <div key={i} className={styles.row}>
              <div
                className={styles.rowBody}
                onClick={() => onMeal({ name: f.name, protein: f.protein }, f.mealType)}
              >
                <div className={styles.rowType}>{MEAL_LABELS[f.mealType]}</div>
                <div className={styles.rowName}>{f.name}</div>
                <div className={styles.rowMeta}>
                  {f.protein}g protein &middot; {f.calories} kcal
                </div>
              </div>
              <button
                type="button"
                onClick={() => unsave(key)}
                className={styles.unsaveBtn}
                aria-label="Remove from favourites"
              >
                <Icon name="bookmark" size={15} />
              </button>
            </div>
          );
        })
      )}
      <div className={styles.bottomSpacer} />
    </div>
  );
}
