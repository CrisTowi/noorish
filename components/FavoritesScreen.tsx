'use client';

import { Icon } from './Icons';

interface FavoritesScreenProps {
  favorites: Record<string, { name: string; mealType: string; protein: number; calories: number; savedAt: number }>;
}

export function FavoritesScreen({ favorites }: FavoritesScreenProps) {
  const favoritesList = Object.values(favorites);

  return (
    <main className="screen">
      <div className="page-header">
        <p className="page-eyebrow">Saved</p>
        <h1 className="page-title">Favorites</h1>
        <p className="page-subtitle">{favoritesList.length} saved meals</p>
      </div>

      {favoritesList.length === 0 ? (
        <div className="fav-empty">
          <div className="fav-empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <p className="fav-empty-text">
            No saved meals yet.<br />
            Tap the bookmark icon on any meal to save it here.
          </p>
        </div>
      ) : (
        <div className="card" style={{ margin: '0 20px' }}>
          {favoritesList.map((fav, index) => (
            <div key={index} className="fav-card" style={{ borderBottom: index < favoritesList.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div className="fav-card-info">
                <div className="fav-card-name">{fav.name}</div>
                <div className="fav-card-meta">{fav.protein}g protein · {fav.calories} kcal</div>
              </div>
              <button className="meal-swap-btn" aria-label="Remove from favorites">
                <Icon name="trash" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}