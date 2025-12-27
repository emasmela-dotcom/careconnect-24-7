'use client'

import { useState, useEffect } from 'react'
import { Activity, Heart, TrendingUp, CheckCircle, XCircle } from 'lucide-react'
import {
  connectAppleHealth,
  connectGoogleFit,
  connectFitbit,
  syncHealthData,
  isDeviceConnected,
  type HealthData,
} from '@/lib/wearable-integration'

export default function WearablesPage() {
  const [connectedDevices, setConnectedDevices] = useState<{
    apple: boolean
    google: boolean
    fitbit: boolean
  }>({
    apple: false,
    google: false,
    fitbit: false,
  })
  const [syncing, setSyncing] = useState<string | null>(null)
  const [healthData, setHealthData] = useState<HealthData[]>([])

  useEffect(() => {
    checkConnections()
  }, [])

  const checkConnections = async () => {
    const apple = await isDeviceConnected('apple')
    const google = await isDeviceConnected('google')
    const fitbit = await isDeviceConnected('fitbit')
    setConnectedDevices({ apple, google, fitbit })
  }

  const handleConnect = async (device: 'apple' | 'google' | 'fitbit') => {
    let success = false
    switch (device) {
      case 'apple':
        success = await connectAppleHealth()
        break
      case 'google':
        success = await connectGoogleFit()
        break
      case 'fitbit':
        success = await connectFitbit()
        break
    }

    if (success) {
      setConnectedDevices(prev => ({ ...prev, [device]: true }))
      alert(`${device} connected successfully!`)
    } else {
      alert(`Failed to connect ${device}. This feature requires API setup.`)
    }
  }

  const handleSync = async (device: 'apple' | 'google' | 'fitbit') => {
    setSyncing(device)
    try {
      const data = await syncHealthData(device)
      setHealthData(prev => [...data, ...prev])
      alert(`Synced ${data.length} data points from ${device}`)
    } catch (error) {
      console.error('Sync failed:', error)
      alert('Failed to sync data')
    } finally {
      setSyncing(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Wearable Device Integration</h1>
        <p className="text-xl text-gray-700">Connect your fitness trackers and sync health data</p>
      </div>

      {/* Device Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Apple Health */}
        <div className="bg-white border-4 border-gray-300 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity size={32} className="text-gray-700" />
              <h3 className="text-xl font-bold text-gray-900">Apple Health</h3>
            </div>
            {connectedDevices.apple ? (
              <CheckCircle className="text-green-600" size={24} />
            ) : (
              <XCircle className="text-gray-400" size={24} />
            )}
          </div>
          <p className="text-gray-600 mb-4">
            Sync steps, heart rate, and other health metrics from Apple Watch and iPhone
          </p>
          {connectedDevices.apple ? (
            <button
              onClick={() => handleSync('apple')}
              disabled={syncing === 'apple'}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {syncing === 'apple' ? 'Syncing...' : 'Sync Now'}
            </button>
          ) : (
            <button
              onClick={() => handleConnect('apple')}
              className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Connect Apple Health
            </button>
          )}
        </div>

        {/* Google Fit */}
        <div className="bg-white border-4 border-gray-300 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp size={32} className="text-gray-700" />
              <h3 className="text-xl font-bold text-gray-900">Google Fit</h3>
            </div>
            {connectedDevices.google ? (
              <CheckCircle className="text-green-600" size={24} />
            ) : (
              <XCircle className="text-gray-400" size={24} />
            )}
          </div>
          <p className="text-gray-600 mb-4">
            Sync activity data from Android devices and Google Fit compatible apps
          </p>
          {connectedDevices.google ? (
            <button
              onClick={() => handleSync('google')}
              disabled={syncing === 'google'}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {syncing === 'google' ? 'Syncing...' : 'Sync Now'}
            </button>
          ) : (
            <button
              onClick={() => handleConnect('google')}
              className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Connect Google Fit
            </button>
          )}
        </div>

        {/* Fitbit */}
        <div className="bg-white border-4 border-gray-300 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Heart size={32} className="text-gray-700" />
              <h3 className="text-xl font-bold text-gray-900">Fitbit</h3>
            </div>
            {connectedDevices.fitbit ? (
              <CheckCircle className="text-green-600" size={24} />
            ) : (
              <XCircle className="text-gray-400" size={24} />
            )}
          </div>
          <p className="text-gray-600 mb-4">
            Sync steps, heart rate, sleep, and weight from Fitbit devices
          </p>
          {connectedDevices.fitbit ? (
            <button
              onClick={() => handleSync('fitbit')}
              disabled={syncing === 'fitbit'}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {syncing === 'fitbit' ? 'Syncing...' : 'Sync Now'}
            </button>
          ) : (
            <button
              onClick={() => handleConnect('fitbit')}
              className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Connect Fitbit
            </button>
          )}
        </div>
      </div>

      {/* Synced Data */}
      {healthData.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Synced Health Data</h2>
          <div className="bg-white border-4 border-gray-300 p-6 rounded-xl">
            <div className="space-y-4">
              {healthData.map((data, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                  <p className="font-semibold text-gray-900 mb-2">
                    {data.date.toLocaleDateString()}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {data.steps && (
                      <div>
                        <span className="text-gray-600">Steps: </span>
                        <span className="font-semibold">{data.steps.toLocaleString()}</span>
                      </div>
                    )}
                    {data.heartRate && (
                      <div>
                        <span className="text-gray-600">Heart Rate: </span>
                        <span className="font-semibold">{data.heartRate} bpm</span>
                      </div>
                    )}
                    {data.weight && (
                      <div>
                        <span className="text-gray-600">Weight: </span>
                        <span className="font-semibold">{data.weight} lbs</span>
                      </div>
                    )}
                    {data.sleepHours && (
                      <div>
                        <span className="text-gray-600">Sleep: </span>
                        <span className="font-semibold">{data.sleepHours} hrs</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-8 bg-blue-50 border-4 border-blue-300 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-blue-900 mb-2">📱 Setup Instructions</h3>
        <p className="text-blue-800 mb-2">
          <strong>Note:</strong> Wearable device integration requires API setup and OAuth authentication.
        </p>
        <p className="text-blue-800">
          For production use, you'll need to:
        </p>
        <ul className="list-disc list-inside text-blue-800 mt-2 space-y-1">
          <li>Register your app with Apple HealthKit, Google Fit, or Fitbit</li>
          <li>Set up OAuth2 credentials</li>
          <li>Configure API endpoints</li>
          <li>Handle authentication flows</li>
        </ul>
      </div>
    </div>
  )
}


