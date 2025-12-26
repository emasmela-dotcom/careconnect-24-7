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

// GET /api/caregivers/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
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
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Caregiver not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in GET /api/caregivers/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch caregiver' },
      { status: 500 }
    )
  }
}

// PUT /api/caregivers/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    const result = await sql`
      UPDATE caregivers
      SET
        name = COALESCE(${body.name}, name),
        role = COALESCE(${body.role}, role),
        phone = COALESCE(${body.phone}, phone),
        email = COALESCE(${body.email}, email),
        shift = COALESCE(${body.shift}, shift),
        notes = COALESCE(${body.notes}, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
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
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Caregiver not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in PUT /api/caregivers/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update caregiver' },
      { status: 500 }
    )
  }
}

// DELETE /api/caregivers/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
      DELETE FROM caregivers
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
      RETURNING id
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Caregiver not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/caregivers/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete caregiver' },
      { status: 500 }
    )
  }
}

