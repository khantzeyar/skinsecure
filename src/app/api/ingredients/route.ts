import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ingredients } from '@/db/schema';  

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export async function GET(req: NextRequest) {
  try {
    const rows = await db
      .select()
      .from(ingredients)
      .orderBy(ingredients.ingredient); 

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch ingredients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ingredients' },
      { status: 500 }
    );
  }
}
