'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/components/DataContext'
import { Save, X } from 'lucide-react'
import Link from 'next/link'

export default function NewResidentPage() {
  const router = useRouter()
  const { addResident } = useData()
  
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    emergencyContact: '',
    medicalConditions: '',
    allergies: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addResident(formData)
    router.push('/residents')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-happy-500 to-happy-600 bg-clip-text text-transparent mb-3">
          Add New Resident
        </h1>
        <p className="text-xl text-gray-700">Create a new resident profile</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-happy-50 border-4 border-happy-300 p-8 rounded-2xl shadow-xl">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
              placeholder="Enter resident's full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Room Number
              </label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
                placeholder="e.g., 101"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
                placeholder="resident@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Emergency Contact
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
              placeholder="Name and phone number"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Medical Conditions
            </label>
            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
              placeholder="List any medical conditions..."
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Allergies
            </label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
              placeholder="List any allergies..."
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-happy-200 focus:border-happy-500"
              placeholder="Any additional information..."
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-happy-500 to-happy-600 text-white text-xl font-bold border-4 border-happy-700 hover:from-happy-600 hover:to-happy-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem]"
          >
            <Save size={24} className="mr-3" />
            Save Resident
          </button>
          <Link
            href="/residents"
            className="flex items-center justify-center px-8 py-4 bg-white text-gray-700 text-xl font-bold border-4 border-gray-400 hover:bg-gray-100 rounded-xl shadow-lg min-h-[4rem]"
          >
            <X size={24} className="mr-3" />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}


