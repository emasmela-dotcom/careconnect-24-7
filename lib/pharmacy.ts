// Pharmacy Integration Utilities
// For production, integrate with GoodRx API or similar

export interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  distance?: number
  hours?: string
}

export interface MedicationPrice {
  pharmacy: string
  price: number
  genericAvailable: boolean
  savings?: number
}

// Find nearby pharmacies (simplified - in production use Google Maps API)
export async function findNearbyPharmacies(
  zipCode: string,
  radius: number = 5
): Promise<Pharmacy[]> {
  // In production, use Google Maps Places API
  // For now, return mock data
  return [
    {
      id: '1',
      name: 'CVS Pharmacy',
      address: '123 Main St, Your City, ST 12345',
      phone: '(555) 123-4567',
      distance: 0.5,
      hours: 'Mon-Sun: 8AM-10PM',
    },
    {
      id: '2',
      name: 'Walgreens',
      address: '456 Oak Ave, Your City, ST 12345',
      phone: '(555) 234-5678',
      distance: 1.2,
      hours: 'Mon-Sun: 7AM-11PM',
    },
    {
      id: '3',
      name: 'Rite Aid',
      address: '789 Pine Rd, Your City, ST 12345',
      phone: '(555) 345-6789',
      distance: 2.1,
      hours: 'Mon-Sun: 9AM-9PM',
    },
  ]
}

// Get medication prices (simplified - in production use GoodRx API)
export async function getMedicationPrices(
  medicationName: string,
  dosage: string,
  zipCode: string
): Promise<MedicationPrice[]> {
  // In production, use GoodRx API
  // For now, return mock data
  return [
    {
      pharmacy: 'CVS Pharmacy',
      price: 15.99,
      genericAvailable: true,
      savings: 5.00,
    },
    {
      pharmacy: 'Walgreens',
      price: 12.99,
      genericAvailable: true,
      savings: 8.00,
    },
    {
      pharmacy: 'Rite Aid',
      price: 14.99,
      genericAvailable: true,
      savings: 6.00,
    },
    {
      pharmacy: 'Generic Online',
      price: 9.99,
      genericAvailable: true,
      savings: 11.00,
    },
  ]
}

// Check if medication needs refill
export function needsRefill(
  startDate: string,
  frequency: string,
  daysSupply: number = 30
): boolean {
  const start = new Date(startDate)
  const now = new Date()
  const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  
  // Calculate days until refill needed
  const daysUntilRefill = daysSupply - daysSinceStart
  
  // Alert if less than 7 days remaining
  return daysUntilRefill <= 7 && daysUntilRefill > 0
}

// Calculate refill date
export function getRefillDate(
  startDate: string,
  daysSupply: number = 30
): Date {
  const start = new Date(startDate)
  const refillDate = new Date(start)
  refillDate.setDate(refillDate.getDate() + daysSupply)
  return refillDate
}


