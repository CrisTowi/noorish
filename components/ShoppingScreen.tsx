'use client';

import { useState } from 'react';
import { Icon } from './Icons';
import { SHOPPING_LIST, ShoppingCategory } from '@/lib/meal-data';

type ShoppingCategoryKey = keyof ShoppingCategory;

export function ShoppingScreen() {
  const [activeCategory, setActiveCategory] = useState<ShoppingCategoryKey>('proteins');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const categories: ShoppingCategoryKey[] = ['proteins', 'produce', 'pantry'];
  
  const categoryLabels: Record<ShoppingCategoryKey, string> = {
    proteins: 'Proteins',
    produce: 'Produce',
    pantry: 'Pantry',
  };

  function toggleItem(itemName: string) {
    setCheckedItems(prev => ({ ...prev, [itemName]: !prev[itemName] }));
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
            onClick={() => toggleItem(item.item)}
          >
            <div className={`shop-check ${checkedItems[item.item] ? 'checked' : ''}`}>
              {checkedItems[item.item] && '✓'}
            </div>
            <div style={{ flex: 1 }}>
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
      <div className="card" style={{ margin: '14px 20px 20px' }}>
        <div style={{ padding: '16px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Shopping progress</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>{checkedCount}/{totalCount}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(checkedCount / totalCount) * 100}%` }} />
          </div>
        </div>
      </div>
    </main>
  );
}