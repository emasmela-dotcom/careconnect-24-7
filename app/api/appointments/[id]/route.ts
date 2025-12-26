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

// GET /api/appointments/[id]
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
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in GET /api/appointments/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointment' },
      { status: 500 }
    )
  }
}

// PUT /api/appointments/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      UPDATE appointments
      SET
        type = COALESCE(${body.type}, type),
        doctor_name = COALESCE(${body.doctorName}, doctor_name),
        date = COALESCE(${body.date}::date, date),
        time = COALESCE(${body.time}::time, time),
        location = COALESCE(${body.location}, location),
        address = COALESCE(${body.address}, address),
        notes = COALESCE(${body.notes}, notes),
        checklist = COALESCE(${JSON.stringify(body.checklist || [])}::jsonb, checklist),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
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
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in PUT /api/appointments/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    )
  }
}

// DELETE /api/appointments/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
      DELETE FROM appointments
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
      RETURNING id
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/appointments/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    )
  }
}

