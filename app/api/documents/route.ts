import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getDefaultUserId } from '@/lib/user-helper'

// GET /api/documents
export async function GET(request: NextRequest) {
  try {
    const userId = await getDefaultUserId()
    
    const documents = await sql`
      SELECT 
        id,
        name,
        type,
        url,
        size,
        category,
        created_at as "createdAt"
      FROM documents
      WHERE user_id = ${userId}::uuid
      ORDER BY created_at DESC
    `
    
    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error in GET /api/documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

// POST /api/documents
export async function POST(request: NextRequest) {
  try {
    const userId = await getDefaultUserId()
    const body = await request.json()
    
    const result = await sql`
      INSERT INTO documents (
        user_id,
        name,
        type,
        url,
        size,
        category
      )
      VALUES (
        ${userId}::uuid,
        ${body.name},
        ${body.type},
        ${body.url},
        ${body.size},
        ${body.category || 'other'}
      )
      RETURNING 
        id,
        name,
        type,
        url,
        size,
        category,
        created_at as "createdAt"
    `
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error in POST /api/documents:', error)
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    )
  }
}


