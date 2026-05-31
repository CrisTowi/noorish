'use client';

import { useState, useEffect } from 'react';
import { Icon } from '../Icons';
import { MealType } from '@/lib/meal-data';
import styles from './FavoritesScreen.module.css';

interface FavoriteItem {
  name: string;
  mealType: MealType;
  protein: number;
  calories: number;
  savedAt: number;
}

interface FavoriteApiResponse {
  mealType: MealType;
  name: string;
  proteinGrams?: number;
  calories?: number;
  savedAt?: number;
}

interface FavoritesScreenProps {
  favorites: Record<string, FavoriteItem>;
  setFavorites: (favorites: Record<string, FavoriteItem>) => void;
}

export function FavoritesScreen({ favorites, setFavorites }: FavoritesScreenProps) {
  const [loading, setLoading] = useState(true);

  // Load favorites from API on mount
  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await fetch('/api/favorites');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Convert array to record
          const favoritesMap: Record<string, FavoriteItem> = {};
          data.data.forEach((fav: FavoriteApiResponse) => {
            const key = `${fav.mealType}::${fav.name}`;
            favoritesMap[key] = {
              name: fav.name,
              mealType: fav.mealType,
              protein: fav.proteinGrams || 0,
              calories: fav.calories || 0,
              savedAt: fav.savedAt || Date.now(),
            };
          });
          setFavorites(favoritesMap);
        }
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
      setLoading(false);
    }
    
    loadFavorites();
  }, [setFavorites]);

  async function removeFavorite(name: string) {
    const key = Object.keys(favorites).find(k => k.includes(`::${name}`));
    
    if (!key) return;
    
    // Optimistic update
    const newFavorites = { ...favorites };
    delete newFavorites[key];
    setFavorites(newFavorites);
    
    // Save to API
    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealName: name, action: 'remove' })
      });
    } catch (e) {
      console.error('Failed to remove favorite:', e);
      // Revert on error
      setFavorites(favorites);
    }
  }

  const favoritesList = Object.values(favorites);

  return (
    <main className="screen">
      <div className="page-header">
        <p className="page-eyebrow">Saved</p>
        <h1 className="page-title">Favorites</h1>
        <p className="page-subtitle">{favoritesList.length} saved meals</p>
      </div>

      {loading ? (
        <div className={styles.loadingCenter}>
          <span className={styles.loadingText}>Loading...</span>
        </div>
      ) : favoritesList.length === 0 ? (
        <div className={styles.favEmpty}>
          <div className={styles.favEmptyIcon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <p className={styles.favEmptyText}>
            No saved meals yet.<br />
            Tap the bookmark icon on any meal to save it here.
          </p>
        </div>
      ) : (
        <div className="card">
          {favoritesList.map((fav, index) => (
            <div key={index} className={`${styles.favCard} ${index < favoritesList.length - 1 ? styles.favCardBordered : ''}`}>
              <div className={styles.favCardInfo}>
                <div className={styles.favCardName}>{fav.name}</div>
                <div className={styles.favCardMeta}>{fav.protein}g protein · {fav.calories} kcal</div>
              </div>
              <button 
                className="meal-swap-btn" 
                aria-label="Remove from favorites"
                onClick={() => removeFavorite(fav.name)}
              >
                <Icon name="trash" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
