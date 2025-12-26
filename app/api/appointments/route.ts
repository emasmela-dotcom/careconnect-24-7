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

// GET /api/appointments
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    const appointments = await sql`
      SELECT 
        id,
        resident_id as "residentId",
        resident_name as "residentName",
        type,
        doctor_name as "doctorName",
        date::text as "date",
        time::text as "time",
        location,
        address,
        notes,
        checklist,
        created_at as "createdAt"
      FROM appointments
      WHERE user_id = ${userId}::uuid
      ORDER BY date DESC, time DESC
    `
    
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error in GET /api/appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

// POST /api/appointments
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      INSERT INTO appointments (
        user_id,
        resident_id,
        resident_name,
        type,
        doctor_name,
        date,
        time,
        location,
        address,
        notes,
        checklist
      )
      VALUES (
        ${userId}::uuid,
        ${body.residentId || null}::uuid,
        ${body.residentName},
        ${body.type},
        ${body.doctorName},
        ${body.date}::date,
        ${body.time}::time,
        ${body.location || null},
        ${body.address || null},
        ${body.notes || null},
        ${JSON.stringify(body.checklist || [])}::jsonb
      )
      RETURNING 
        id,
        resident_id as "residentId",
        resident_name as "residentName",
        type,
        doctor_name as "doctorName",
        date::text as "date",
        time::text as "time",
        location,
        address,
        notes,
        checklist,
        created_at as "createdAt"
    `
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in POST /api/appointments:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

