import { NextRequest, NextResponse } from 'next/server'
import { checkDrugInteractions, checkFoodInteractions } from '@/lib/drug-interactions'
import { sql } from '@/lib/db'
import { getDefaultUserId } from '@/lib/user-helper'

// POST /api/drug-interactions
// Check for drug interactions when adding a new medication
export async function POST(request: NextRequest) {
  try {
    const userId = await getDefaultUserId()
    const body = await request.json()
    const { medicationName } = body
    
    if (!medicationName) {
      return NextResponse.json(
        { error: 'Medication name is required' },
        { status: 400 }
      )
    }
    
    // Get user's existing medications
    const existingMedications = await sql`
      SELECT name
      FROM medications
      WHERE user_id = ${userId}::uuid
      AND name != ${medicationName}
    `
    
    const existingMedNames = existingMedications.map(m => m.name)
    
    // Check for drug-drug interactions
    const drugInteractions = checkDrugInteractions(medicationName, existingMedNames)
    
    // Check for food interactions
    const foodInteractions = checkFoodInteractions(medicationName)
    
    return NextResponse.json({
      drugInteractions,
      foodInteractions,
      hasInteractions: drugInteractions.length > 0 || foodInteractions.length > 0
    })
  } catch (error) {
    console.error('Error checking drug interactions:', error)
    return NextResponse.json(
      { error: 'Failed to check drug interactions' },
      { status: 500 }
    )
  }
}


