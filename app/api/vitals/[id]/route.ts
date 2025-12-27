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

// GET /api/vitals/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
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
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Vital not found' },
        { status: 404 }
      )
    }
    
    const vital = result[0]
    return NextResponse.json({
      ...vital,
      bloodPressure: vital.bloodPressureSystolic && vital.bloodPressureDiastolic
        ? { systolic: vital.bloodPressureSystolic, diastolic: vital.bloodPressureDiastolic }
        : undefined,
    })
  } catch (error) {
    console.error('Error in GET /api/vitals/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vital' },
      { status: 500 }
    )
  }
}

// PUT /api/vitals/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      UPDATE vitals
      SET
        date = COALESCE(${body.date}::date, date),
        time = COALESCE(${body.time}::time, time),
        blood_pressure_systolic = COALESCE(${body.bloodPressure?.systolic || null}, blood_pressure_systolic),
        blood_pressure_diastolic = COALESCE(${body.bloodPressure?.diastolic || null}, blood_pressure_diastolic),
        heart_rate = COALESCE(${body.heartRate || null}, heart_rate),
        temperature = COALESCE(${body.temperature || null}, temperature),
        weight = COALESCE(${body.weight || null}, weight),
        glucose = COALESCE(${body.glucose || null}, glucose),
        recorded_by = COALESCE(${body.recordedBy || null}, recorded_by),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
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
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Vital not found' },
        { status: 404 }
      )
    }
    
    const vital = result[0]
    return NextResponse.json({
      ...vital,
      bloodPressure: vital.bloodPressureSystolic && vital.bloodPressureDiastolic
        ? { systolic: vital.bloodPressureSystolic, diastolic: vital.bloodPressureDiastolic }
        : undefined,
    })
  } catch (error) {
    console.error('Error in PUT /api/vitals/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update vital' },
      { status: 500 }
    )
  }
}

// DELETE /api/vitals/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
      DELETE FROM vitals
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
      RETURNING id
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Vital not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/vitals/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete vital' },
      { status: 500 }
    )
  }
}



