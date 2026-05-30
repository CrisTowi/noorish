// API route: GET /api/meals - Get all meal plan data
// API route: POST /api/meals - Log a meal as eaten
import { NextRequest, NextResponse } from 'next/server';
import { addMealLog, getMealLogs } from '@/lib/db';
import { MEAL_PLAN, MealType } from '@/lib/meal-data';

export async function GET() {
  try {
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
    const body = await request.json();
    
    const { date, mealType, mealName, proteinGrams, wasEaten } = body;
    
    if (!date || !mealType || !mealName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newLog = addMealLog({
      date,
      mealType: mealType as MealType,
      mealName,
      proteinGrams: proteinGrams || 0,
      wasEaten: wasEaten || false,
    });
    
    return NextResponse.json({ success: true, data: newLog });
  } catch (error) {
    console.error('Error logging meal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log meal' },
      { status: 500 }
    );
  }
}