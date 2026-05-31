'use client';

import { useState, useEffect } from 'react';
import { Icon } from '../Icons';
import { SHOPPING_LIST, ShoppingCategory } from '@/lib/meal-data';
import styles from './ShoppingScreen.module.css';

type ShoppingCategoryKey = keyof ShoppingCategory;

export function ShoppingScreen() {
  const [activeCategory, setActiveCategory] = useState<ShoppingCategoryKey>('proteins');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const categories: ShoppingCategoryKey[] = ['proteins', 'produce', 'pantry'];
  
  const categoryLabels: Record<ShoppingCategoryKey, string> = {
    proteins: 'Proteins',
    produce: 'Produce',
    pantry: 'Pantry',
  };

  // Load checked items from API on mount
  useEffect(() => {
    async function loadShoppingList() {
      try {
        const response = await fetch('/api/shopping');
        const data = await response.json();
        
        if (data.success && data.checked) {
          setCheckedItems(data.checked);
        }
      } catch (e) {
        console.error('Failed to load shopping list:', e);
      }
      setLoading(false);
    }
    
    loadShoppingList();
  }, []);

  async function toggleItem(itemName: string) {
    const newChecked = !checkedItems[itemName];
    
    // Optimistic update
    setCheckedItems(prev => ({ ...prev, [itemName]: newChecked }));
    
    // Save to API
    try {
      await fetch('/api/shopping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName, wasChecked: newChecked })
      });
    } catch (e) {
      console.error('Failed to save shopping item:', e);
      // Revert on error
      setCheckedItems(prev => ({ ...prev, [itemName]: !newChecked }));
    }
  }

  const currentItems = SHOPPING_LIST[activeCategory];
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = categories.reduce((sum, cat) => sum + SHOPPING_LIST[cat].length, 0);

  return (
    <main className="screen">
      <div className="page-header">
        <p className="page-eyebrow">Shopping</p>
        <h1 className="page-title">Grocery List</h1>
        <p className="page-subtitle">{checkedCount}/{totalCount} items checked</p>
      </div>

      {/* Category chips */}
      <div className={styles.catScroll}>
        <div className={styles.catChips}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.catChip} ${activeCategory === cat ? styles.catChipActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Shopping list */}
      <div className={styles.shopList}>
        {currentItems.map((item, index) => (
          <div
            key={index}
            className={styles.shopItem}
            onClick={() => !loading && toggleItem(item.item)}
          >
            <div className={`${styles.shopCheck} ${checkedItems[item.item] ? styles.shopCheckChecked : ''}`}>
              {checkedItems[item.item] && '✓'}
            </div>
            <div className={styles.shopItemInfo}>
              <div className={`${styles.shopItemName} ${checkedItems[item.item] ? styles.shopItemNameChecked : ''}`}>
                {item.item}
              </div>
              <div className={styles.shopItemQty}>{item.qty}</div>
            </div>
            <button className={styles.shopSwapBtn} onClick={e => { e.stopPropagation(); /* TODO: swap modal */ }}>
              <Icon name="swap" size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className={`card ${styles.my5}`}>
        <div className="card-padding">
          <div className={`${styles.flexRowBetween} ${styles.mb2}`}>
            <span className={styles.textCaption}>Shopping progress</span>
            <span className={styles.textCaptionBold}>{checkedCount}/{totalCount}</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${(checkedCount / totalCount) * 100}%` }} />
          </div>
        </div>
      </div>
    </main>
  );
}
