import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getDefaultUserId } from '@/lib/user-helper'

async function getUserId(request: NextRequest): Promise<string> {
  const headerUserId = request.headers.get('x-user-id')
  if (headerUserId) {
    return headerUserId
  }
  return await getDefaultUserId()
}

// GET /api/caregivers
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    const caregivers = await sql`
      SELECT 
        id,
        name,
        role,
        phone,
        email,
        shift,
        notes,
        created_at as "createdAt"
      FROM caregivers
      WHERE user_id = ${userId}::uuid
      ORDER BY created_at DESC
    `
    
    return NextResponse.json(caregivers)
  } catch (error) {
    console.error('Error in GET /api/caregivers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch caregivers' },
      { status: 500 }
    )
  }
}

// POST /api/caregivers
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      INSERT INTO caregivers (
        user_id,
        name,
        role,
        phone,
        email,
        shift,
        notes
      )
      VALUES (
        ${userId}::uuid,
        ${body.name},
        ${body.role || null},
        ${body.phone || null},
        ${body.email || null},
        ${body.shift || null},
        ${body.notes || null}
      )
      RETURNING 
        id,
        name,
        role,
        phone,
        email,
        shift,
        notes,
        created_at as "createdAt"
    `
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in POST /api/caregivers:', error)
    return NextResponse.json(
      { error: 'Failed to create caregiver' },
      { status: 500 }
    )
  }
}

