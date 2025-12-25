'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useData } from '@/components/DataContext'
import { Save, X } from 'lucide-react'
import Link from 'next/link'

export default function EditSymptomPage() {
  const router = useRouter()
  const params = useParams()
  const { symptoms, residents, updateSymptom } = useData()
  const symptom = symptoms.find(s => s.id === params.id)

  const [formData, setFormData] = useState({
    residentId: '',
    date: '',
    time: '',
    symptoms: '',
    severity: 'mild' as 'mild' | 'moderate' | 'severe',
    duration: '',
    triggers: '',
    notes: '',
    recordedBy: '',
  })

  useEffect(() => {
    if (symptom) {
      setFormData({
        residentId: symptom.residentId || '',
        date: symptom.date || '',
        time: symptom.time || '',
        symptoms: symptom.symptoms || '',
        severity: symptom.severity || 'mild',
        duration: symptom.duration || '',
        triggers: symptom.triggers || '',
        notes: symptom.notes || '',
        recordedBy: symptom.recordedBy || '',
      })
    }
  }, [symptom])

  if (!symptom) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Symptom Log Not Found</h1>
          <Link href="/symptoms" className="text-xl text-cheerful-600 hover:underline">
            ← Back to Symptoms
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const resident = residents.find(r => r.id === formData.residentId)
    updateSymptom(symptom.id, {
      ...formData,
      residentName: resident?.name || symptom.residentName,
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
          Edit Symptom Log
        </h1>
        <p className="text-xl text-gray-700">Update symptom information</p>
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
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cheerful-500 to-cheerful-600 text-white text-xl font-bold border-4 border-cheerful-700 hover:from-cheerful-600 hover:to-cheerful-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem]"
          >
            <Save size={24} className="mr-3" />
            Save Changes
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



