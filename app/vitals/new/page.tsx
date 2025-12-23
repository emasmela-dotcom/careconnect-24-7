'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/components/DataContext'
import { Save, X } from 'lucide-react'
import Link from 'next/link'

export default function NewVitalPage() {
  const router = useRouter()
  const { residents, addVital } = useData()
  
  const [formData, setFormData] = useState({
    residentId: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    temperature: '',
    weight: '',
    glucose: '',
    recordedBy: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const resident = residents.find(r => r.id === formData.residentId)
    
    const vitalData: any = {
      residentId: formData.residentId,
      residentName: resident?.name || 'Unknown',
      date: formData.date,
      time: formData.time,
      recordedBy: formData.recordedBy || 'Caregiver',
    }

    if (formData.bloodPressureSystolic && formData.bloodPressureDiastolic) {
      vitalData.bloodPressure = {
        systolic: parseInt(formData.bloodPressureSystolic),
        diastolic: parseInt(formData.bloodPressureDiastolic),
      }
    }
    if (formData.heartRate) vitalData.heartRate = parseInt(formData.heartRate)
    if (formData.temperature) vitalData.temperature = parseFloat(formData.temperature)
    if (formData.weight) vitalData.weight = parseFloat(formData.weight)
    if (formData.glucose) vitalData.glucose = parseInt(formData.glucose)

    addVital(vitalData)
    router.push('/vitals')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-calm-500 to-calm-600 bg-clip-text text-transparent mb-3">
          Record Vital Signs
        </h1>
        <p className="text-xl text-gray-700">Record vital signs for a resident</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-calm-50 border-4 border-calm-300 p-8 rounded-2xl shadow-xl">
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
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
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
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
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
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
              />
            </div>
          </div>

          <div className="border-t-4 border-calm-200 pt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vital Signs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Blood Pressure (Systolic)</label>
                <input
                  type="number"
                  name="bloodPressureSystolic"
                  value={formData.bloodPressureSystolic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
                  placeholder="120"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Blood Pressure (Diastolic)</label>
                <input
                  type="number"
                  name="bloodPressureDiastolic"
                  value={formData.bloodPressureDiastolic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
                  placeholder="80"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Heart Rate (bpm)</label>
                <input
                  type="number"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
                  placeholder="72"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Temperature (°F)</label>
                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
                  placeholder="98.6"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
                  placeholder="150"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Glucose (mg/dL)</label>
                <input
                  type="number"
                  name="glucose"
                  value={formData.glucose}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Recorded By</label>
            <input
              type="text"
              name="recordedBy"
              value={formData.recordedBy}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-calm-200 focus:border-calm-500"
              placeholder="Caregiver name"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-calm-500 to-calm-600 text-white text-xl font-bold border-4 border-calm-700 hover:from-calm-600 hover:to-calm-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem]"
          >
            <Save size={24} className="mr-3" />
            Save Vital Signs
          </button>
          <Link
            href="/vitals"
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


