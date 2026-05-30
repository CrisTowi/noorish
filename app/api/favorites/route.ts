// API route: GET /api/favorites - Get all favorites
// API route: POST /api/favorites - Add/remove favorite
import { NextRequest, NextResponse } from 'next/server';
import { getLocalDb } from '@/lib/db';
import { favorites } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getLocalDb();
    const allFavorites = db.select().from(favorites).all();
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
    const db = getLocalDb();
    const body = await request.json();
    
    const { mealName, mealType, proteinGrams, calories, action } = body;
    
    if (action === 'remove') {
      db.delete(favorites).where(eq(favorites.mealName, mealName)).run();
      return NextResponse.json({ success: true, removed: true });
    }
    
    if (!mealName || !mealType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if already exists
    const existing = db.select().from(favorites)
      .where(eq(favorites.mealName, mealName))
      .get();
    
    if (existing) {
      return NextResponse.json({ success: true, data: existing, alreadyExists: true });
    }
    
    const newFavorite = db.insert(favorites).values({
      mealName,
      mealType,
      proteinGrams: proteinGrams || null,
      calories: calories || null,
    }).returning().get();
    
    return NextResponse.json({ success: true, data: newFavorite });
  } catch (error) {
    console.error('Error saving favorite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save favorite' },
      { status: 500 }
    );
  }
}