'use client'

import { useState } from 'react'
import { useData } from '@/components/DataContextAPI'
import { MapPin, Phone, Clock, DollarSign, TrendingDown } from 'lucide-react'
import { needsRefill, getRefillDate } from '@/lib/pharmacy'

interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  distance?: number
  hours?: string
}

interface MedicationPrice {
  pharmacy: string
  price: number
  genericAvailable: boolean
  savings?: number
}

export default function PharmacyPage() {
  const { medications } = useData()
  const [zipCode, setZipCode] = useState('')
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [prices, setPrices] = useState<Record<string, MedicationPrice[]>>({})
  const [loading, setLoading] = useState(false)

  const handleFindPharmacies = async () => {
    if (!zipCode.trim()) {
      alert('Please enter a zip code')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/pharmacy?zipCode=${zipCode}`)
      const data = await response.json()
      setPharmacies(data.pharmacies || [])
    } catch (error) {
      console.error('Error finding pharmacies:', error)
      alert('Failed to find pharmacies')
    } finally {
      setLoading(false)
    }
  }

  const handleCheckPrices = async (medicationName: string, dosage: string) => {
    if (!zipCode.trim()) {
      alert('Please enter a zip code first')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/pharmacy?zipCode=${zipCode}&medication=${encodeURIComponent(medicationName)}&dosage=${encodeURIComponent(dosage)}`
      )
      const data = await response.json()
      setPrices(prev => ({
        ...prev,
        [medicationName]: data.prices || [],
      }))
    } catch (error) {
      console.error('Error checking prices:', error)
      alert('Failed to check prices')
    } finally {
      setLoading(false)
    }
  }

  // Find medications that need refills
  const medicationsNeedingRefill = medications.filter(med => {
    if (!med.startDate) return false
    return needsRefill(med.startDate, med.frequency)
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Pharmacy Services</h1>
        <p className="text-xl text-gray-700">Find pharmacies and compare medication prices</p>
      </div>

      {/* Zip Code Search */}
      <div className="bg-white border-4 border-blue-300 p-6 rounded-xl mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          Enter Your Zip Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="12345"
            className="flex-1 px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
            maxLength={5}
          />
          <button
            onClick={handleFindPharmacies}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Find Pharmacies'}
          </button>
        </div>
      </div>

      {/* Refill Reminders */}
      {medicationsNeedingRefill.length > 0 && (
        <div className="bg-yellow-50 border-4 border-yellow-400 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">⚠️ Medications Needing Refill</h2>
          <div className="space-y-3">
            {medicationsNeedingRefill.map(med => (
              <div key={med.id} className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{med.name} {med.dosage}</p>
                    <p className="text-sm text-gray-600">
                      Refill needed by: {getRefillDate(med.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCheckPrices(med.name, med.dosage)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Check Prices
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Pharmacies */}
      {pharmacies.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby Pharmacies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pharmacies.map(pharmacy => (
              <div key={pharmacy.id} className="bg-white border-4 border-gray-300 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pharmacy.name}</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-start gap-2">
                    <MapPin size={20} className="mt-1 flex-shrink-0" />
                    <p className="text-sm">{pharmacy.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={20} />
                    <p className="text-sm">{pharmacy.phone}</p>
                  </div>
                  {pharmacy.distance && (
                    <p className="text-sm font-semibold text-blue-600">
                      {pharmacy.distance} miles away
                    </p>
                  )}
                  {pharmacy.hours && (
                    <div className="flex items-start gap-2">
                      <Clock size={20} className="mt-1 flex-shrink-0" />
                      <p className="text-sm">{pharmacy.hours}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Comparisons */}
      {Object.keys(prices).length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Price Comparisons</h2>
          {Object.entries(prices).map(([medication, medPrices]) => (
            <div key={medication} className="bg-white border-4 border-green-300 p-6 rounded-xl mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{medication}</h3>
              <div className="space-y-3">
                {medPrices
                  .sort((a, b) => a.price - b.price)
                  .map((price, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        idx === 0
                          ? 'bg-green-50 border-green-400'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">{price.pharmacy}</p>
                          {price.genericAvailable && (
                            <p className="text-sm text-gray-600">Generic available</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">${price.price.toFixed(2)}</p>
                          {price.savings && (
                            <p className="text-sm text-green-600 flex items-center gap-1">
                              <TrendingDown size={16} />
                              Save ${price.savings.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My Medications - Price Check */}
      {medications.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Prices for Your Medications</h2>
          <div className="space-y-3">
            {medications.map(med => (
              <div key={med.id} className="bg-white border-2 border-gray-300 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{med.name} {med.dosage}</p>
                  <p className="text-sm text-gray-600">{med.frequency}</p>
                </div>
                <button
                  onClick={() => handleCheckPrices(med.name, med.dosage)}
                  disabled={loading || !zipCode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Check Prices
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


