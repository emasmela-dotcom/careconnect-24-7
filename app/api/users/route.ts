import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// GET /api/users - Get or create user
export async function GET(request: NextRequest) {
  try {
    // For now, we'll use a simple user system
    // In production, you'd get user ID from authentication
    const userId = request.headers.get('x-user-id') || 'default-user'
    
    // Check if user exists, create if not
    let user = await sql`
      SELECT * FROM users WHERE id = ${userId}::uuid
    `
    
    if (user.length === 0) {
      // Create default user
      await sql`
        INSERT INTO users (id, email, name)
        VALUES (${userId}::uuid, ${`user-${userId}@careconnect.local`}, 'User')
      `
      user = await sql`
        SELECT * FROM users WHERE id = ${userId}::uuid
      `
    }
    
    return NextResponse.json(user[0])
  } catch (error) {
    console.error('Error in GET /api/users:', error)
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body
    
    const result = await sql`
      INSERT INTO users (email, name)
      VALUES (${email}, ${name})
      RETURNING *
    `
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in POST /api/users:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

