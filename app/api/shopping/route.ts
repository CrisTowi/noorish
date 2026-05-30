// API route: GET /api/shopping - Get shopping list
// API route: POST /api/shopping - Check/uncheck item
import { NextRequest, NextResponse } from 'next/server';
import { getLocalDb } from '@/lib/db';
import { shoppingItems } from '@/lib/db/schema';
import { SHOPPING_LIST } from '@/lib/meal-data';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getLocalDb();
    
    // Check if shopping list exists in DB
    const existingItems = db.select().from(shoppingItems).all();
    
    // If empty, seed the shopping list
    if (existingItems.length === 0) {
      const categories = ['proteins', 'produce', 'pantry'] as const;
      for (const category of categories) {
        const items = SHOPPING_LIST[category];
        for (const item of items) {
          db.insert(shoppingItems).values({
            category,
            itemName: item.item,
            quantity: item.qty,
            wasChecked: false,
          }).run();
        }
      }
      return NextResponse.json({
        success: true,
        data: SHOPPING_LIST,
        checked: {}
      });
    }
    
    // Return existing items with their checked status
    const checkedMap: Record<string, boolean> = {};
    existingItems.forEach(item => {
      checkedMap[item.itemName] = item.wasChecked ?? false;
    });
    
    return NextResponse.json({
      success: true,
      data: SHOPPING_LIST,
      checked: checkedMap
    });
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shopping list' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getLocalDb();
    const body = await request.json();
    
    const { itemName, wasChecked } = body;
    
    if (!itemName) {
      return NextResponse.json(
        { success: false, error: 'Item name is required' },
        { status: 400 }
      );
    }
    
    // Update the item status
    db.update(shoppingItems)
      .set({ wasChecked })
      .where(eq(shoppingItems.itemName, itemName))
      .run();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating shopping item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update item' },
      { status: 500 }
    );
  }
}