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

// GET /api/residents/[id] - Get single resident
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
      SELECT 
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
      FROM residents
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Resident not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in GET /api/residents/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resident' },
      { status: 500 }
    )
  }
}

// PUT /api/residents/[id] - Update resident
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    const body = await request.json()
    
    // Handle empty strings as null for optional fields
    const dateOfBirth = body.dateOfBirth && body.dateOfBirth.trim() !== '' ? body.dateOfBirth : null
    const phone = body.phone && body.phone.trim() !== '' ? body.phone : null
    const email = body.email && body.email.trim() !== '' ? body.email : null
    const emergencyContact = body.emergencyContact && body.emergencyContact.trim() !== '' ? body.emergencyContact : null
    const medicalConditions = body.medicalConditions && body.medicalConditions.trim() !== '' ? body.medicalConditions : null
    const allergies = body.allergies && body.allergies.trim() !== '' ? body.allergies : null
    const notes = body.notes && body.notes.trim() !== '' ? body.notes : null
    
    const result = await sql`
      UPDATE residents
      SET
        name = ${body.name},
        date_of_birth = ${dateOfBirth}::date,
        phone = ${phone},
        email = ${email},
        emergency_contact = ${emergencyContact},
        medical_conditions = ${medicalConditions},
        allergies = ${allergies},
        notes = ${notes},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
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
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Resident not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in PUT /api/residents/[id]:', error)
    console.error('Error details:', error)
    return NextResponse.json(
      { error: 'Failed to update resident', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// DELETE /api/residents/[id] - Delete resident
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    
    const result = await sql`
      DELETE FROM residents
      WHERE id = ${params.id}::uuid AND user_id = ${userId}::uuid
      RETURNING id
    `
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Resident not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/residents/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete resident' },
      { status: 500 }
    )
  }
}

