'use client';

import { useState, useEffect } from 'react';
import { Icon } from './Icons';
import { SHOPPING_LIST, ShoppingCategory } from '@/lib/meal-data';

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
      <div className="cat-scroll">
        <div className="cat-chips">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Shopping list */}
      <div className="shop-list">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="shop-item"
            onClick={() => !loading && toggleItem(item.item)}
          >
            <div className={`shop-check ${checkedItems[item.item] ? 'checked' : ''}`}>
              {checkedItems[item.item] && '✓'}
            </div>
            <div className="shop-item-info">
              <div className={`shop-item-name ${checkedItems[item.item] ? 'checked' : ''}`}>
                {item.item}
              </div>
              <div className="shop-item-qty">{item.qty}</div>
            </div>
            <button className="shop-swap-btn" onClick={e => { e.stopPropagation(); /* TODO: swap modal */ }}>
              <Icon name="swap" size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="card my-5">
        <div className="card-padding">
          <div className="flex-row-between mb-2">
            <span className="text-caption">Shopping progress</span>
            <span className="text-caption-bold">{checkedCount}/{totalCount}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(checkedCount / totalCount) * 100}%` }} />
          </div>
        </div>
      </div>
    </main>
  );
}