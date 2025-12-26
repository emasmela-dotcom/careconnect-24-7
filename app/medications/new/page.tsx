'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/components/DataContextAPI'
import { Save, X, Plus as PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default function NewMedicationPage() {
  const router = useRouter()
  const { residents, addMedication } = useData()
  
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    times: [] as string[],
    residentId: '',
    startDate: '',
    endDate: '',
    notes: '',
  })
  
  const [newTime, setNewTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const resident = residents.find(r => r.id === formData.residentId)
    addMedication({
      ...formData,
      residentName: resident?.name || 'Unknown',
    })
    router.push('/medications')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addTime = () => {
    if (newTime && !formData.times.includes(newTime)) {
      setFormData({
        ...formData,
        times: [...formData.times, newTime],
      })
      setNewTime('')
    }
  }

  const removeTime = (time: string) => {
    setFormData({
      ...formData,
      times: formData.times.filter(t => t !== time),
    })
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-3">
          Add Medication
        </h1>
        <p className="text-xl text-gray-700">Add a new medication with reminders</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-purple-50 border-4 border-purple-300 p-8 rounded-2xl shadow-xl">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Medication Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
              placeholder="e.g., Aspirin, Metformin"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Dosage <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
                placeholder="e.g., 100mg, 2 tablets"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Frequency <span className="text-red-500">*</span>
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
              >
                <option value="">Select frequency...</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="Four times daily">Four times daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Resident <span className="text-red-500">*</span>
            </label>
            <select
              name="residentId"
              value={formData.residentId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
            >
              <option value="">Select resident...</option>
              {residents.map(resident => (
                <option key={resident.id} value={resident.id}>{resident.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Times <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={addTime}
                className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
              >
                <PlusIcon size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.times.map(time => (
                <span
                  key={time}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg flex items-center gap-2"
                >
                  {time}
                  <button
                    type="button"
                    onClick={() => removeTime(time)}
                    className="text-purple-700 hover:text-purple-900"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">End Date (if applicable)</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
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
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
              placeholder="Additional medication instructions..."
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xl font-bold border-4 border-purple-700 hover:from-purple-600 hover:to-purple-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem]"
          >
            <Save size={24} className="mr-3" />
            Save Medication
          </button>
          <Link
            href="/medications"
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


