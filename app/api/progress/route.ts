// API route: GET /api/progress - Get meal progress for a date
// API route: POST /api/progress - Update meal eaten status
import { NextRequest, NextResponse } from 'next/server';
import { getLocalDb } from '@/lib/db';
import { mealLogs } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const db = getLocalDb();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    const logs = db.select().from(mealLogs)
      .where(eq(mealLogs.date, date))
      .all();
    
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
    const db = getLocalDb();
    const body = await request.json();
    
    const { date, mealType, wasEaten } = body;
    
    if (!date || !mealType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if log exists for this date and meal
    const existing = db.select().from(mealLogs)
      .where(and(eq(mealLogs.date, date), eq(mealLogs.mealType, mealType)))
      .get();
    
    if (existing) {
      db.update(mealLogs)
        .set({ wasEaten })
        .where(eq(mealLogs.id, existing.id))
        .run();
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