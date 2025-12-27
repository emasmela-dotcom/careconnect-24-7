import { NextRequest, NextResponse } from 'next/server'
import { findNearbyPharmacies, getMedicationPrices } from '@/lib/pharmacy'

// GET /api/pharmacy?zipCode=12345
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const zipCode = searchParams.get('zipCode')
    const medication = searchParams.get('medication')
    const dosage = searchParams.get('dosage')

    if (!zipCode) {
      return NextResponse.json(
        { error: 'Zip code is required' },
        { status: 400 }
      )
    }

    // If medication and dosage provided, get prices
    if (medication && dosage) {
      const prices = await getMedicationPrices(medication, dosage, zipCode)
      return NextResponse.json({ prices })
    }

    // Otherwise, get nearby pharmacies
    const pharmacies = await findNearbyPharmacies(zipCode)
    return NextResponse.json({ pharmacies })
  } catch (error) {
    console.error('Error in GET /api/pharmacy:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pharmacy data' },
      { status: 500 }
    )
  }
}


