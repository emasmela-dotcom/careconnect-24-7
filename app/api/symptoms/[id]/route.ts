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

// GET /api/symptoms/[id]
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
        symptoms,
        severity,
        duration,
        triggers,
        notes,
        recorded_by as "recordedBy",
        created_at as "createdAt"
      FROM symptoms
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Symptom not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in GET /api/symptoms/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch symptom' },
      { status: 500 }
    )
  }
}

// PUT /api/symptoms/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      UPDATE symptoms
      SET
        symptoms = COALESCE(${body.symptoms}, symptoms),
        severity = COALESCE(${body.severity}, severity),
        duration = COALESCE(${body.duration}, duration),
        triggers = COALESCE(${body.triggers}, triggers),
        notes = COALESCE(${body.notes}, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
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
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Symptom not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in PUT /api/symptoms/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update symptom' },
      { status: 500 }
    )
  }
}

// DELETE /api/symptoms/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
      DELETE FROM symptoms
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
      RETURNING id
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Symptom not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/symptoms/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete symptom' },
      { status: 500 }
    )
  }
}

