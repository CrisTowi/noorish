// API route: GET /api/shopping - Get shopping list
// API route: POST /api/shopping - Check/uncheck item
import { NextRequest, NextResponse } from 'next/server';
import { getShoppingItems, updateShoppingItem } from '@/lib/db';
import { SHOPPING_LIST } from '@/lib/meal-data';

export async function GET() {
  try {
    const items = getShoppingItems();
    
    // Create checked map
    const checkedMap: Record<string, boolean> = {};
    items.forEach(item => {
      checkedMap[item.itemName] = item.wasChecked;
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
    const body = await request.json();
    
    const { itemName, wasChecked } = body;
    
    if (!itemName) {
      return NextResponse.json(
        { success: false, error: 'Item name is required' },
        { status: 400 }
      );
    }
    
    updateShoppingItem(itemName, wasChecked);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating shopping item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update item' },
      { status: 500 }
    );
  }
}