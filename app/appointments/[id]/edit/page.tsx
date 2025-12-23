'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useData } from '@/components/DataContext'
import { Save, X, Plus as PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default function EditAppointmentPage() {
  const router = useRouter()
  const params = useParams()
  const { appointments, residents, updateAppointment } = useData()
  const appointment = appointments.find(a => a.id === params.id)

  const [formData, setFormData] = useState({
    residentId: '',
    type: '',
    doctorName: '',
    date: '',
    time: '',
    location: '',
    address: '',
    notes: '',
    checklist: [] as { id: string; text: string; completed: boolean }[],
  })
  
  const [newChecklistItem, setNewChecklistItem] = useState('')

  useEffect(() => {
    if (appointment) {
      setFormData({
        residentId: appointment.residentId || '',
        type: appointment.type || '',
        doctorName: appointment.doctorName || '',
        date: appointment.date || '',
        time: appointment.time || '',
        location: appointment.location || '',
        address: appointment.address || '',
        notes: appointment.notes || '',
        checklist: appointment.checklist || [],
      })
    }
  }, [appointment])

  if (!appointment) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Appointment Not Found</h1>
          <Link href="/appointments" className="text-xl text-warm-600 hover:underline">
            ← Back to Appointments
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const resident = residents.find(r => r.id === formData.residentId)
    updateAppointment(appointment.id, {
      ...formData,
      residentName: resident?.name || appointment.residentName,
    })
    router.push('/appointments')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setFormData({
        ...formData,
        checklist: [
          ...formData.checklist,
          {
            id: `item-${Date.now()}`,
            text: newChecklistItem,
            completed: false,
          },
        ],
      })
      setNewChecklistItem('')
    }
  }

  const removeChecklistItem = (id: string) => {
    setFormData({
      ...formData,
      checklist: formData.checklist.filter(item => item.id !== id),
    })
  }

  const toggleChecklistItem = (id: string) => {
    setFormData({
      ...formData,
      checklist: formData.checklist.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    })
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-warm-500 to-warm-600 bg-clip-text text-transparent mb-3">
          Edit Appointment
        </h1>
        <p className="text-xl text-gray-700">Update appointment information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-warm-50 border-4 border-warm-300 p-8 rounded-2xl shadow-xl">
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
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
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
                Appointment Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Doctor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
              />
            </div>
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
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
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
                className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Preparation Checklist</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
                className="flex-1 px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
                placeholder="Add checklist item..."
              />
              <button
                type="button"
                onClick={addChecklistItem}
                className="px-6 py-3 bg-warm-500 text-white rounded-xl hover:bg-warm-600 transition-colors"
              >
                <PlusIcon size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {formData.checklist.map(item => (
                <div key={item.id} className="flex items-center justify-between px-4 py-2 bg-warm-100 rounded-lg">
                  <label className="flex items-center flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)}
                      className="mr-3 w-5 h-5"
                    />
                    <span className={`text-lg ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {item.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeChecklistItem(item.id)}
                    className="text-warm-700 hover:text-warm-900"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-warm-200 focus:border-warm-500"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-warm-500 to-warm-600 text-white text-xl font-bold border-4 border-warm-700 hover:from-warm-600 hover:to-warm-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem]"
          >
            <Save size={24} className="mr-3" />
            Save Changes
          </button>
          <Link
            href="/appointments"
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


