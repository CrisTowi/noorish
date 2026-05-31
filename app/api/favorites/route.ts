// API route: GET /api/favorites - Get all favorites
// POST /api/favorites - Add/remove favorite
import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, getFavorites, addFavorite, removeFavorite } from '@/lib/db';
import { MealType } from '@/lib/meal-data';

export async function GET() {
  try {
    await initDatabase();
    
    const allFavorites = await getFavorites();
    return NextResponse.json({ success: true, data: allFavorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    
    const body = await request.json();
    const { mealName, mealType, proteinGrams, calories, action } = body;
    
    if (action === 'remove') {
      await removeFavorite(mealName);
      return NextResponse.json({ success: true, removed: true });
    }
    
    if (!mealName || !mealType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await addFavorite({
      name: mealName,
      mealType: mealType as MealType,
      proteinGrams: proteinGrams || 0,
      calories: calories || 0,
      savedAt: Date.now(),
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving favorite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save favorite' },
      { status: 500 }
    );
  }
}