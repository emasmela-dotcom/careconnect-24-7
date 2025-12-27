import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getDefaultUserId } from '@/lib/user-helper'

// DELETE /api/documents/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getDefaultUserId()
    
    await sql`
      DELETE FROM documents
      WHERE id = ${params.id}::uuid
      AND user_id = ${userId}::uuid
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/documents/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}


