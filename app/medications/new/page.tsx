'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/components/DataContextAPI'
import { Save, X, Plus as PlusIcon, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface DrugInteraction {
  severity: 'mild' | 'moderate' | 'severe' | 'contraindicated'
  description: string
  medications: string[]
  recommendation: string
}

export default function NewMedicationPage() {
  const router = useRouter()
  const { residents, addMedication, medications } = useData()
  
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
  const [interactions, setInteractions] = useState<{
    drugInteractions: DrugInteraction[]
    foodInteractions: DrugInteraction[]
    hasInteractions: boolean
  } | null>(null)
  const [checkingInteractions, setCheckingInteractions] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Warn if there are severe interactions
    if (interactions?.drugInteractions.some(i => i.severity === 'severe' || i.severity === 'contraindicated')) {
      const confirmed = window.confirm(
        '⚠️ WARNING: This medication has severe interactions with your existing medications. ' +
        'Are you sure you want to add it? Please consult your doctor first.'
      )
      if (!confirmed) return
    }
    
    const resident = residents.find(r => r.id === formData.residentId)
    await addMedication({
      ...formData,
      residentName: resident?.name || 'Unknown',
    })
    router.push('/medications')
  }
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
      case 'contraindicated':
        return 'bg-red-100 border-red-500 text-red-800'
      case 'moderate':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800'
      case 'mild':
        return 'bg-blue-100 border-blue-500 text-blue-800'
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800'
    }
  }
  
  const getSeverityIcon = (severity: string) => {
    if (severity === 'severe' || severity === 'contraindicated') {
      return <AlertTriangle className="text-red-600" size={24} />
    }
    return <AlertTriangle className="text-yellow-600" size={24} />
  }

  // Check for drug interactions when medication name changes
  useEffect(() => {
    if (formData.name.trim().length > 2) {
      checkInteractions()
    } else {
      setInteractions(null)
    }
  }, [formData.name])

  const checkInteractions = async () => {
    if (!formData.name.trim()) return
    
    setCheckingInteractions(true)
    try {
      const response = await fetch('/api/drug-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicationName: formData.name }),
      })
      const data = await response.json()
      setInteractions(data)
    } catch (error) {
      console.error('Error checking interactions:', error)
    } finally {
      setCheckingInteractions(false)
    }
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
            {checkingInteractions && (
              <p className="text-sm text-gray-600 mt-2">Checking for interactions...</p>
            )}
          </div>
          
          {/* Drug Interaction Warnings */}
          {interactions && interactions.hasInteractions && (
            <div className="space-y-4">
              {interactions.drugInteractions.length > 0 && (
                <div className="border-4 border-red-300 bg-red-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="text-red-600" size={24} />
                    <h3 className="text-lg font-bold text-red-800">⚠️ Drug Interaction Warning</h3>
                  </div>
                  {interactions.drugInteractions.map((interaction, idx) => (
                    <div key={idx} className={`mb-3 p-3 rounded-lg border-2 ${getSeverityColor(interaction.severity)}`}>
                      <div className="flex items-start gap-2 mb-2">
                        {getSeverityIcon(interaction.severity)}
                        <div className="flex-1">
                          <p className="font-semibold mb-1">
                            {interaction.medications.join(' + ')}
                          </p>
                          <p className="text-sm mb-2">{interaction.description}</p>
                          <p className="text-sm font-medium">{interaction.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {interactions.foodInteractions.length > 0 && (
                <div className="border-4 border-yellow-300 bg-yellow-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="text-yellow-600" size={24} />
                    <h3 className="text-lg font-bold text-yellow-800">🍽️ Food Interaction Warning</h3>
                  </div>
                  {interactions.foodInteractions.map((interaction, idx) => (
                    <div key={idx} className="mb-2 p-3 rounded-lg border-2 border-yellow-400 bg-yellow-100">
                      <p className="font-semibold mb-1">{interaction.description}</p>
                      <p className="text-sm">{interaction.recommendation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {interactions && !interactions.hasInteractions && formData.name.trim().length > 2 && (
            <div className="border-4 border-green-300 bg-green-50 p-4 rounded-xl flex items-center gap-2">
              <CheckCircle className="text-green-600" size={24} />
              <p className="text-green-800 font-semibold">✓ No known interactions detected</p>
            </div>
          )}

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


