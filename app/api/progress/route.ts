// API route: GET /api/progress - Get meal progress for a date
// POST /api/progress - Update meal eaten status
import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, getMealLogs, updateMealLog } from '@/lib/db';
import { MealType } from '@/lib/meal-data';

export async function GET(request: NextRequest) {
  try {
    await initDatabase();
    
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    const logs = await getMealLogs(date);
    
    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    
    const body = await request.json();
    const { date, mealType, wasEaten } = body;
    
    if (!date || !mealType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const logs = await getMealLogs(date);
    const log = logs.find(l => l.mealType === mealType);
    
    if (log) {
      await updateMealLog(log.id, wasEaten);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}