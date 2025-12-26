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

// GET /api/medications
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    const medications = await sql`
      SELECT 
        id,
        resident_id as "residentId",
        resident_name as "residentName",
        name,
        dosage,
        frequency,
        times,
        photo_url as "photoUrl",
        start_date::text as "startDate",
        end_date::text as "endDate",
        notes,
        created_at as "createdAt"
      FROM medications
      WHERE user_id = ${userId}::uuid
      ORDER BY created_at DESC
    `
    
    return NextResponse.json(medications)
  } catch (error) {
    console.error('Error in GET /api/medications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch medications' },
      { status: 500 }
    )
  }
}

// POST /api/medications
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      INSERT INTO medications (
        user_id,
        resident_id,
        resident_name,
        name,
        dosage,
        frequency,
        times,
        photo_url,
        start_date,
        end_date,
        notes
      )
      VALUES (
        ${userId}::uuid,
        ${body.residentId || null}::uuid,
        ${body.residentName},
        ${body.name},
        ${body.dosage || null},
        ${body.frequency || null},
        ${body.times || []},
        ${body.photoUrl || null},
        ${body.startDate},
        ${body.endDate || null},
        ${body.notes || null}
      )
      RETURNING 
        id,
        resident_id as "residentId",
        resident_name as "residentName",
        name,
        dosage,
        frequency,
        times,
        photo_url as "photoUrl",
        start_date::text as "startDate",
        end_date::text as "endDate",
        notes,
        created_at as "createdAt"
    `
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in POST /api/medications:', error)
    return NextResponse.json(
      { error: 'Failed to create medication' },
      { status: 500 }
    )
  }
}

