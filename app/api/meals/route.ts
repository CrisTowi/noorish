// API route: GET /api/meals - Get all meal plan data
// API route: POST /api/meals - Log a meal as eaten
import { NextRequest, NextResponse } from 'next/server';
import { getLocalDb } from '@/lib/db';
import { mealLogs } from '@/lib/db/schema';
import { MEAL_PLAN, MealType } from '@/lib/meal-data';

export async function GET() {
  try {
    const db = getLocalDb();
    
    // Return the full meal plan data
    return NextResponse.json({
      success: true,
      data: MEAL_PLAN,
      meta: {
        totalWeeks: Object.keys(MEAL_PLAN).length,
        totalDays: Object.values(MEAL_PLAN).reduce((sum, w) => sum + w.days.length, 0)
      }
    });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch meals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getLocalDb();
    const body = await request.json();
    
    const { date, mealType, mealName, proteinGrams, wasEaten } = body;
    
    if (!date || !mealType || !mealName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Find the corresponding meal plan entry
    let mealPlanId: number | null = null;
    const type = mealType as MealType;
    for (const [weekKey, week] of Object.entries(MEAL_PLAN)) {
      for (let i = 0; i < week.days.length; i++) {
        const day = week.days[i];
        if (day.meals[type]?.name === mealName) {
          mealPlanId = parseInt(`${weekKey.replace('week', '')}${i}${mealType.charCodeAt(0)}`);
          break;
        }
      }
    }
    
    const newLog = db.insert(mealLogs).values({
      date,
      mealType: type,
      mealName,
      mealPlanId,
      proteinGrams: proteinGrams || 0,
      wasEaten: wasEaten || false,
    }).returning().get();
    
    return NextResponse.json({ success: true, data: newLog });
  } catch (error) {
    console.error('Error logging meal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log meal' },
      { status: 500 }
    );
  }
}