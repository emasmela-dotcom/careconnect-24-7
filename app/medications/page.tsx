'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pill, Clock, Calendar, Image as ImageIcon } from 'lucide-react'

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  times: string[]
  residentId: string
  residentName: string
  photoUrl?: string
  startDate: string
  endDate?: string
  notes?: string
}

export default function MedicationsPage() {
  const [medications] = useState<Medication[]>([])

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-black mb-3">Medication Reminders</h1>
          <p className="text-xl text-gray-800">Manage medications with visual pill identification and reminders</p>
        </div>
        <Link
          href="/medications/new"
          className="flex items-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem]"
        >
          <Plus size={24} className="mr-3" />
          Add Medication
        </Link>
      </div>

      {medications.length === 0 ? (
        <div className="bg-white border-2 border-gray-300 p-16 text-center shadow-sm">
          <Pill className="mx-auto h-20 w-20 text-gray-600 mb-6" />
          <h3 className="text-2xl font-semibold text-black mb-4">No medications yet</h3>
          <p className="text-xl text-gray-800 mb-8">Add medications to set up reminders with pill photos.</p>
          <Link
            href="/medications/new"
            className="inline-flex items-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem]"
          >
            <Plus size={24} className="mr-3" />
            Add Medication
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {medications.map((med) => (
            <div key={med.id} className="bg-white border-2 border-gray-300 p-8 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6 flex-1">
                  {med.photoUrl ? (
                    <img 
                      src={med.photoUrl} 
                      alt={med.name}
                      className="w-24 h-24 object-cover border-2 border-gray-400"
                    />
                  ) : (
                    <div className="w-24 h-24 border-2 border-gray-400 flex items-center justify-center bg-gray-50">
                      <ImageIcon className="text-gray-600" size={32} />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-2xl font-semibold text-black">{med.name}</h3>
                      <span className="text-lg text-gray-800">{med.dosage}</span>
                    </div>
                    <p className="text-lg text-gray-800 mb-4 font-medium">{med.residentName}</p>
                    <div className="flex flex-wrap gap-6 text-lg text-gray-800">
                      <div className="flex items-center">
                        <Clock size={20} className="mr-2" />
                        <span>{med.frequency}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={20} className="mr-2" />
                        <span>{med.times.join(', ')}</span>
                      </div>
                    </div>
                    {med.notes && (
                      <p className="text-lg text-gray-800 mt-4">{med.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 ml-6">
                  <Link
                    href={`/medications/${med.id}/edit`}
                    className="px-6 py-3 text-lg font-semibold border-2 border-gray-400 text-black hover:bg-gray-100 min-h-[3.5rem] inline-flex items-center"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

