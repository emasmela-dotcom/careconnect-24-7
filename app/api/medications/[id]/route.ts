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

// GET /api/medications/[id]
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
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Medication not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in GET /api/medications/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch medication' },
      { status: 500 }
    )
  }
}

// PUT /api/medications/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      UPDATE medications
      SET
        name = COALESCE(${body.name}, name),
        dosage = COALESCE(${body.dosage}, dosage),
        frequency = COALESCE(${body.frequency}, frequency),
        times = COALESCE(${body.times}, times),
        photo_url = COALESCE(${body.photoUrl}, photo_url),
        start_date = COALESCE(${body.startDate}::date, start_date),
        end_date = COALESCE(${body.endDate}::date, end_date),
        notes = COALESCE(${body.notes}, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
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
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Medication not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in PUT /api/medications/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update medication' },
      { status: 500 }
    )
  }
}

// DELETE /api/medications/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
      DELETE FROM medications
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
      RETURNING id
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Medication not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/medications/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete medication' },
      { status: 500 }
    )
  }
}

