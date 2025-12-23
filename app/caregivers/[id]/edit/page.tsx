'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useData } from '@/components/DataContext'
import { Save, X } from 'lucide-react'
import Link from 'next/link'

export default function EditCaregiverPage() {
  const router = useRouter()
  const params = useParams()
  const { getCaregiver, updateCaregiver } = useData()
  const caregiver = getCaregiver(params.id as string)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    shift: '',
    notes: '',
  })

  useEffect(() => {
    if (caregiver) {
      setFormData({
        name: caregiver.name || '',
        role: caregiver.role || '',
        phone: caregiver.phone || '',
        email: caregiver.email || '',
        shift: caregiver.shift || '',
        notes: caregiver.notes || '',
      })
    }
  }, [caregiver])

  if (!caregiver) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Caregiver Not Found</h1>
          <Link href="/caregivers" className="text-xl text-friendly-600 hover:underline">
            ← Back to Caregivers
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateCaregiver(caregiver.id, formData)
    router.push('/caregivers')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-friendly-500 to-friendly-600 bg-clip-text text-transparent mb-3">
          Edit Caregiver
        </h1>
        <p className="text-xl text-gray-700">Update caregiver information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-friendly-50 border-4 border-friendly-300 p-8 rounded-2xl shadow-xl">
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
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-friendly-200 focus:border-friendly-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-friendly-200 focus:border-friendly-500"
              >
                <option value="Registered Nurse">Registered Nurse</option>
                <option value="Licensed Practical Nurse">Licensed Practical Nurse</option>
                <option value="Certified Nursing Assistant">Certified Nursing Assistant</option>
                <option value="Caregiver">Caregiver</option>
                <option value="Therapist">Therapist</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">Shift</label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-friendly-200 focus:border-friendly-500"
              >
                <option value="">Select shift...</option>
                <option value="Day">Day</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-friendly-200 focus:border-friendly-500"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-friendly-200 focus:border-friendly-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-friendly-200 focus:border-friendly-500"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-friendly-500 to-friendly-600 text-white text-xl font-bold border-4 border-friendly-700 hover:from-friendly-600 hover:to-friendly-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem]"
          >
            <Save size={24} className="mr-3" />
            Save Changes
          </button>
          <Link
            href="/caregivers"
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


