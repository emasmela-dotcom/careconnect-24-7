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

// GET /api/symptoms
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    const symptoms = await sql`
      SELECT 
        id,
        resident_id as "residentId",
        resident_name as "residentName",
        date::text as "date",
        time::text as "time",
        symptoms,
        severity,
        duration,
        triggers,
        notes,
        recorded_by as "recordedBy",
        created_at as "createdAt"
      FROM symptoms
      WHERE user_id = ${userId}::uuid
      ORDER BY date DESC, time DESC
    `
    
    return NextResponse.json(symptoms)
  } catch (error) {
    console.error('Error in GET /api/symptoms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch symptoms' },
      { status: 500 }
    )
  }
}

// POST /api/symptoms
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      INSERT INTO symptoms (
        user_id,
        resident_id,
        resident_name,
        date,
        time,
        symptoms,
        severity,
        duration,
        triggers,
        notes,
        recorded_by
      )
      VALUES (
        ${userId}::uuid,
        ${body.residentId || null}::uuid,
        ${body.residentName},
        ${body.date}::date,
        ${body.time}::time,
        ${body.symptoms},
        ${body.severity || null},
        ${body.duration || null},
        ${body.triggers || null},
        ${body.notes || null},
        ${body.recordedBy || 'User'}
      )
      RETURNING 
        id,
        resident_id as "residentId",
        resident_name as "residentName",
        date::text as "date",
        time::text as "time",
        symptoms,
        severity,
        duration,
        triggers,
        notes,
        recorded_by as "recordedBy",
        created_at as "createdAt"
    `
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in POST /api/symptoms:', error)
    return NextResponse.json(
      { error: 'Failed to create symptom' },
      { status: 500 }
    )
  }
}

