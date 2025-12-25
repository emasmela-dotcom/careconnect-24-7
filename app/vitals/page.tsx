'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Heart, Activity, Scale, Droplet } from 'lucide-react'
import { useData, VitalSign } from '@/components/DataContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, parse, subDays } from 'date-fns'

export default function VitalsPage() {
  const { vitals } = useData()
  const [selectedMetric, setSelectedMetric] = useState<'bloodPressure' | 'heartRate' | 'weight' | 'glucose'>('bloodPressure')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vital Signs Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor blood pressure, weight, glucose, and other vital signs with charts</p>
        </div>
        <Link
          href="/vitals/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Record Vitals
        </Link>
      </div>

      {vitals.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vital signs recorded yet</h3>
          <p className="text-gray-600 mb-4">Start tracking vital signs to monitor health trends over time.</p>
          <Link
            href="/vitals/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Record Vitals
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">View Charts</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('bloodPressure')}
                className={`px-4 py-2 text-sm border ${
                  selectedMetric === 'bloodPressure'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Blood Pressure
              </button>
              <button
                onClick={() => setSelectedMetric('heartRate')}
                className={`px-4 py-2 text-sm border ${
                  selectedMetric === 'heartRate'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Heart Rate
              </button>
              <button
                onClick={() => setSelectedMetric('weight')}
                className={`px-4 py-2 text-sm border ${
                  selectedMetric === 'weight'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Weight
              </button>
              <button
                onClick={() => setSelectedMetric('glucose')}
                className={`px-4 py-2 text-sm border ${
                  selectedMetric === 'glucose'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Glucose
              </button>
            </div>
            <div className="mt-6 h-64 border border-gray-200 p-4">
              <VitalSignsChart vitals={vitals} metric={selectedMetric} />
            </div>
          </div>

          <div className="space-y-4">
            {vitals.map((vital) => (
              <div key={vital.id} className="bg-white border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{vital.residentName}</h3>
                    <p className="text-sm text-gray-600">{vital.date} at {vital.time}</p>
                    <p className="text-sm text-gray-500">Recorded by {vital.recordedBy}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {vital.bloodPressure && (
                    <div className="border border-gray-200 p-3">
                      <div className="flex items-center mb-1">
                        <Heart size={16} className="text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">Blood Pressure</span>
                      </div>
                      <div className="text-xl font-semibold text-gray-900">
                        {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                      </div>
                    </div>
                  )}
                  {vital.heartRate && (
                    <div className="border border-gray-200 p-3">
                      <div className="flex items-center mb-1">
                        <Activity size={16} className="text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">Heart Rate</span>
                      </div>
                      <div className="text-xl font-semibold text-gray-900">{vital.heartRate} bpm</div>
                    </div>
                  )}
                  {vital.weight && (
                    <div className="border border-gray-200 p-3">
                      <div className="flex items-center mb-1">
                        <Scale size={16} className="text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">Weight</span>
                      </div>
                      <div className="text-xl font-semibold text-gray-900">{vital.weight} lbs</div>
                    </div>
                  )}
                  {vital.glucose && (
                    <div className="border border-gray-200 p-3">
                      <div className="flex items-center mb-1">
                        <Droplet size={16} className="text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">Glucose</span>
                      </div>
                      <div className="text-xl font-semibold text-gray-900">{vital.glucose} mg/dL</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function VitalSignsChart({ vitals, metric }: { vitals: VitalSign[]; metric: 'bloodPressure' | 'heartRate' | 'weight' | 'glucose' }) {
  const chartData = useMemo(() => {
    if (vitals.length === 0) return []

    // Get last 1 year of data
    const oneYearAgo = subDays(new Date(), 365)
    const filteredVitals = vitals
      .filter(v => {
        try {
          const vitalDate = parse(v.date, 'yyyy-MM-dd', new Date())
          return vitalDate >= oneYearAgo
        } catch {
          return false
        }
      })
      .sort((a, b) => {
        try {
          const dateA = parse(a.date, 'yyyy-MM-dd', new Date())
          const dateB = parse(b.date, 'yyyy-MM-dd', new Date())
          return dateA.getTime() - dateB.getTime()
        } catch {
          return 0
        }
      })

    if (metric === 'bloodPressure') {
      return filteredVitals
        .filter(v => v.bloodPressure)
        .map(v => ({
          date: format(parse(v.date, 'yyyy-MM-dd', new Date()), 'MMM dd'),
          systolic: v.bloodPressure!.systolic,
          diastolic: v.bloodPressure!.diastolic,
        }))
    } else if (metric === 'heartRate') {
      return filteredVitals
        .filter(v => v.heartRate)
        .map(v => ({
          date: format(parse(v.date, 'yyyy-MM-dd', new Date()), 'MMM dd'),
          value: v.heartRate,
        }))
    } else if (metric === 'weight') {
      return filteredVitals
        .filter(v => v.weight)
        .map(v => ({
          date: format(parse(v.date, 'yyyy-MM-dd', new Date()), 'MMM dd'),
          value: v.weight,
        }))
    } else if (metric === 'glucose') {
      return filteredVitals
        .filter(v => v.glucose)
        .map(v => ({
          date: format(parse(v.date, 'yyyy-MM-dd', new Date()), 'MMM dd'),
          value: v.glucose,
        }))
    }
    return []
  }, [vitals, metric])

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No data available for the selected metric</p>
      </div>
    )
  }

  if (metric === 'bloodPressure') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" strokeWidth={2} />
          <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#8884d8" 
          name={metric === 'heartRate' ? 'Heart Rate (bpm)' : metric === 'weight' ? 'Weight (lbs)' : 'Glucose (mg/dL)'}
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

