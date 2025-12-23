'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/components/DataContext'
import { Save, X } from 'lucide-react'
import Link from 'next/link'

export default function NewSymptomPage() {
  const router = useRouter()
  const { residents, addSymptom } = useData()
  
  const [formData, setFormData] = useState({
    residentId: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    symptoms: '',
    severity: 'mild' as 'mild' | 'moderate' | 'severe',
    duration: '',
    triggers: '',
    notes: '',
    recordedBy: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const resident = residents.find(r => r.id === formData.residentId)
    addSymptom({
      ...formData,
      residentName: resident?.name || 'Unknown',
      recordedBy: formData.recordedBy || 'Caregiver',
    })
    router.push('/symptoms')
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cheerful-500 to-cheerful-600 bg-clip-text text-transparent mb-3">
          Log Symptoms
        </h1>
        <p className="text-xl text-gray-700">Record symptoms for doctor visit preparation</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-cheerful-50 border-4 border-cheerful-300 p-8 rounded-2xl shadow-xl">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Resident <span className="text-red-500">*</span>
            </label>
            <select
              name="residentId"
              value={formData.residentId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
            >
              <option value="">Select resident...</option>
              {residents.map(resident => (
                <option key={resident.id} value={resident.id}>{resident.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Symptoms <span className="text-red-500">*</span>
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
              placeholder="Describe the symptoms in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Severity <span className="text-red-500">*</span>
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
                placeholder="e.g., 2 hours, since morning"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Possible Triggers</label>
            <textarea
              name="triggers"
              value={formData.triggers}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
              placeholder="What might have caused these symptoms?"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
              placeholder="Any other relevant information..."
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Recorded By</label>
            <input
              type="text"
              name="recordedBy"
              value={formData.recordedBy}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-cheerful-200 focus:border-cheerful-500"
              placeholder="Caregiver name"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cheerful-500 to-cheerful-600 text-white text-xl font-bold border-4 border-cheerful-700 hover:from-cheerful-600 hover:to-cheerful-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem]"
          >
            <Save size={24} className="mr-3" />
            Save Symptom Log
          </button>
          <Link
            href="/symptoms"
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


