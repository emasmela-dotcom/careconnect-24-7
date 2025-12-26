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

// GET /api/vitals
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    
    const vitals = await sql`
      SELECT 
        id,
        resident_id as "residentId",
        resident_name as "residentName",
        date::text as "date",
        time::text as "time",
        blood_pressure_systolic as "bloodPressureSystolic",
        blood_pressure_diastolic as "bloodPressureDiastolic",
        heart_rate as "heartRate",
        temperature,
        weight,
        glucose,
        recorded_by as "recordedBy",
        created_at as "createdAt"
      FROM vitals
      WHERE user_id = ${userId}::uuid
      ORDER BY date DESC, time DESC
    `
    
    // Transform to match frontend format
    const transformed = vitals.map(v => ({
      ...v,
      bloodPressure: v.bloodPressureSystolic && v.bloodPressureDiastolic
        ? { systolic: v.bloodPressureSystolic, diastolic: v.bloodPressureDiastolic }
        : undefined,
      heartRate: v.heartRate,
    }))
    
    return NextResponse.json(transformed)
  } catch (error) {
    console.error('Error in GET /api/vitals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vitals' },
      { status: 500 }
    )
  }
}

// POST /api/vitals
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      INSERT INTO vitals (
        user_id,
        resident_id,
        resident_name,
        date,
        time,
        blood_pressure_systolic,
        blood_pressure_diastolic,
        heart_rate,
        temperature,
        weight,
        glucose,
        recorded_by
      )
      VALUES (
        ${userId}::uuid,
        ${body.residentId || null}::uuid,
        ${body.residentName},
        ${body.date}::date,
        ${body.time}::time,
        ${body.bloodPressure?.systolic || null},
        ${body.bloodPressure?.diastolic || null},
        ${body.heartRate || null},
        ${body.temperature || null},
        ${body.weight || null},
        ${body.glucose || null},
        ${body.recordedBy || 'User'}
      )
      RETURNING 
        id,
        resident_id as "residentId",
        resident_name as "residentName",
        date::text as "date",
        time::text as "time",
        blood_pressure_systolic as "bloodPressureSystolic",
        blood_pressure_diastolic as "bloodPressureDiastolic",
        heart_rate as "heartRate",
        temperature,
        weight,
        glucose,
        recorded_by as "recordedBy",
        created_at as "createdAt"
    `
    
    const vital = result[0]
    return NextResponse.json({
      ...vital,
      bloodPressure: vital.bloodPressureSystolic && vital.bloodPressureDiastolic
        ? { systolic: vital.bloodPressureSystolic, diastolic: vital.bloodPressureDiastolic }
        : undefined,
    })
  } catch (error) {
    console.error('Error in POST /api/vitals:', error)
    return NextResponse.json(
      { error: 'Failed to create vital' },
      { status: 500 }
    )
  }
}

