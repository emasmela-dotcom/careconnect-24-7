import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getDefaultUserId } from '@/lib/user-helper'

// Helper to get user ID (for now, using default)
async function getUserId(request: NextRequest): Promise<string> {
  const headerUserId = request.headers.get('x-user-id')
  if (headerUserId) {
    return headerUserId
  }
  return await getDefaultUserId()
}

// GET /api/residents - Get all residents for user
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    const residents = await sql`
      SELECT 
        id,
        name,
        date_of_birth as "dateOfBirth",
        phone,
        email,
        emergency_contact as "emergencyContact",
        medical_conditions as "medicalConditions",
        allergies,
        notes,
        created_at as "createdAt"
      FROM residents
      WHERE user_id = ${userId}::uuid
      ORDER BY created_at DESC
    `
    
    return NextResponse.json(residents)
  } catch (error) {
    console.error('Error in GET /api/residents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch residents' },
      { status: 500 }
    )
  }
}

// POST /api/residents - Create new resident
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      INSERT INTO residents (
        user_id,
        name,
        date_of_birth,
        phone,
        email,
        emergency_contact,
        medical_conditions,
        allergies,
        notes
      )
      VALUES (
        ${userId}::uuid,
        ${body.name},
        ${body.dateOfBirth || null},
        ${body.phone || null},
        ${body.email || null},
        ${body.emergencyContact || null},
        ${body.medicalConditions || null},
        ${body.allergies || null},
        ${body.notes || null}
      )
      RETURNING 
        id::text,
        name,
        date_of_birth::text as "dateOfBirth",
        phone,
        email,
        emergency_contact as "emergencyContact",
        medical_conditions as "medicalConditions",
        allergies,
        notes,
        created_at::text as "createdAt"
    `
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in POST /api/residents:', error)
    return NextResponse.json(
      { error: 'Failed to create resident' },
      { status: 500 }
    )
  }
}

