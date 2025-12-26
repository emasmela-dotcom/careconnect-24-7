'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type {
  Resident,
  Caregiver,
  Medication,
  VitalSign,
  Appointment,
  SymptomLog,
} from './DataContext'

// Re-export types for convenience
export type {
  Resident,
  Caregiver,
  Medication,
  VitalSign,
  Appointment,
  SymptomLog,
}

// API base URL
const API_BASE = '/api'

// Helper function to make API calls
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

interface DataContextType {
  // Residents
  residents: Resident[]
  addResident: (resident: Omit<Resident, 'id' | 'createdAt'>) => Promise<void>
  updateResident: (id: string, resident: Partial<Resident>) => Promise<void>
  deleteResident: (id: string) => Promise<void>
  getResident: (id: string) => Resident | undefined
  
  // Caregivers
  caregivers: Caregiver[]
  addCaregiver: (caregiver: Omit<Caregiver, 'id' | 'createdAt'>) => Promise<void>
  updateCaregiver: (id: string, caregiver: Partial<Caregiver>) => Promise<void>
  deleteCaregiver: (id: string) => Promise<void>
  getCaregiver: (id: string) => Caregiver | undefined
  
  // Medications
  medications: Medication[]
  addMedication: (medication: Omit<Medication, 'id' | 'createdAt'>) => Promise<void>
  updateMedication: (id: string, medication: Partial<Medication>) => Promise<void>
  deleteMedication: (id: string) => Promise<void>
  
  // Vital Signs
  vitals: VitalSign[]
  addVital: (vital: Omit<VitalSign, 'id' | 'createdAt'>) => Promise<void>
  updateVital: (id: string, vital: Partial<VitalSign>) => Promise<void>
  deleteVital: (id: string) => Promise<void>
  
  // Appointments
  appointments: Appointment[]
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<void>
  updateAppointment: (id: string, appointment: Partial<Appointment>) => Promise<void>
  deleteAppointment: (id: string) => Promise<void>
  
  // Symptoms
  symptoms: SymptomLog[]
  addSymptom: (symptom: Omit<SymptomLog, 'id' | 'createdAt'>) => Promise<void>
  updateSymptom: (id: string, symptom: Partial<SymptomLog>) => Promise<void>
  deleteSymptom: (id: string) => Promise<void>
  
  // Loading state
  loading: boolean
  error: string | null
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [residents, setResidents] = useState<Resident[]>([])
  const [caregivers, setCaregivers] = useState<Caregiver[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [vitals, setVitals] = useState<VitalSign[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load all data on mount
  useEffect(() => {
    loadAllData()
  }, [])

  async function loadAllData() {
    setLoading(true)
    setError(null)
    try {
      const [residentsData, caregiversData, medicationsData, vitalsData, appointmentsData, symptomsData] = await Promise.all([
        apiCall<Resident[]>('/residents'),
        apiCall<Caregiver[]>('/caregivers'),
        apiCall<Medication[]>('/medications'),
        apiCall<VitalSign[]>('/vitals'),
        apiCall<Appointment[]>('/appointments'),
        apiCall<SymptomLog[]>('/symptoms'),
      ])

      setResidents(residentsData)
      setCaregivers(caregiversData)
      setMedications(medicationsData)
      setVitals(vitalsData)
      setAppointments(appointmentsData)
      setSymptoms(symptomsData)
    } catch (err) {
      console.error('Error loading data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Residents
  const addResident = async (resident: Omit<Resident, 'id' | 'createdAt'>) => {
    try {
      const newResident = await apiCall<Resident>('/residents', {
        method: 'POST',
        body: JSON.stringify(resident),
      })
      setResidents(prev => [...prev, newResident])
    } catch (err) {
      console.error('Error adding resident:', err)
      throw err
    }
  }

  const updateResident = async (id: string, updates: Partial<Resident>) => {
    try {
      const updated = await apiCall<Resident>(`/residents/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setResidents(prev => prev.map(r => r.id === id ? updated : r))
    } catch (err) {
      console.error('Error updating resident:', err)
      throw err
    }
  }

  const deleteResident = async (id: string) => {
    try {
      await apiCall(`/residents/${id}`, { method: 'DELETE' })
      setResidents(prev => prev.filter(r => r.id !== id))
      // Also delete related data
      setMedications(prev => prev.filter(m => m.residentId !== id))
      setVitals(prev => prev.filter(v => v.residentId !== id))
      setAppointments(prev => prev.filter(a => a.residentId !== id))
      setSymptoms(prev => prev.filter(s => s.residentId !== id))
    } catch (err) {
      console.error('Error deleting resident:', err)
      throw err
    }
  }

  const getResident = (id: string) => residents.find(r => r.id === id)

  // Caregivers
  const addCaregiver = async (caregiver: Omit<Caregiver, 'id' | 'createdAt'>) => {
    try {
      const newCaregiver = await apiCall<Caregiver>('/caregivers', {
        method: 'POST',
        body: JSON.stringify(caregiver),
      })
      setCaregivers(prev => [...prev, newCaregiver])
    } catch (err) {
      console.error('Error adding caregiver:', err)
      throw err
    }
  }

  const updateCaregiver = async (id: string, updates: Partial<Caregiver>) => {
    try {
      const updated = await apiCall<Caregiver>(`/caregivers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setCaregivers(prev => prev.map(c => c.id === id ? updated : c))
    } catch (err) {
      console.error('Error updating caregiver:', err)
      throw err
    }
  }

  const deleteCaregiver = async (id: string) => {
    try {
      await apiCall(`/caregivers/${id}`, { method: 'DELETE' })
      setCaregivers(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      console.error('Error deleting caregiver:', err)
      throw err
    }
  }

  const getCaregiver = (id: string) => caregivers.find(c => c.id === id)

  // Medications
  const addMedication = async (medication: Omit<Medication, 'id' | 'createdAt'>) => {
    try {
      const newMedication = await apiCall<Medication>('/medications', {
        method: 'POST',
        body: JSON.stringify(medication),
      })
      setMedications(prev => [...prev, newMedication])
    } catch (err) {
      console.error('Error adding medication:', err)
      throw err
    }
  }

  const updateMedication = async (id: string, updates: Partial<Medication>) => {
    try {
      const updated = await apiCall<Medication>(`/medications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setMedications(prev => prev.map(m => m.id === id ? updated : m))
    } catch (err) {
      console.error('Error updating medication:', err)
      throw err
    }
  }

  const deleteMedication = async (id: string) => {
    try {
      await apiCall(`/medications/${id}`, { method: 'DELETE' })
      setMedications(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      console.error('Error deleting medication:', err)
      throw err
    }
  }

  // Vital Signs
  const addVital = async (vital: Omit<VitalSign, 'id' | 'createdAt'>) => {
    try {
      const newVital = await apiCall<VitalSign>('/vitals', {
        method: 'POST',
        body: JSON.stringify(vital),
      })
      setVitals(prev => [...prev, newVital])
    } catch (err) {
      console.error('Error adding vital:', err)
      throw err
    }
  }

  const updateVital = async (id: string, updates: Partial<VitalSign>) => {
    try {
      const updated = await apiCall<VitalSign>(`/vitals/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setVitals(prev => prev.map(v => v.id === id ? updated : v))
    } catch (err) {
      console.error('Error updating vital:', err)
      throw err
    }
  }

  const deleteVital = async (id: string) => {
    try {
      await apiCall(`/vitals/${id}`, { method: 'DELETE' })
      setVitals(prev => prev.filter(v => v.id !== id))
    } catch (err) {
      console.error('Error deleting vital:', err)
      throw err
    }
  }

  // Appointments
  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    try {
      const newAppointment = await apiCall<Appointment>('/appointments', {
        method: 'POST',
        body: JSON.stringify(appointment),
      })
      setAppointments(prev => [...prev, newAppointment])
    } catch (err) {
      console.error('Error adding appointment:', err)
      throw err
    }
  }

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const updated = await apiCall<Appointment>(`/appointments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setAppointments(prev => prev.map(a => a.id === id ? updated : a))
    } catch (err) {
      console.error('Error updating appointment:', err)
      throw err
    }
  }

  const deleteAppointment = async (id: string) => {
    try {
      await apiCall(`/appointments/${id}`, { method: 'DELETE' })
      setAppointments(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      console.error('Error deleting appointment:', err)
      throw err
    }
  }

  // Symptoms
  const addSymptom = async (symptom: Omit<SymptomLog, 'id' | 'createdAt'>) => {
    try {
      const newSymptom = await apiCall<SymptomLog>('/symptoms', {
        method: 'POST',
        body: JSON.stringify(symptom),
      })
      setSymptoms(prev => [...prev, newSymptom])
    } catch (err) {
      console.error('Error adding symptom:', err)
      throw err
    }
  }

  const updateSymptom = async (id: string, updates: Partial<SymptomLog>) => {
    try {
      const updated = await apiCall<SymptomLog>(`/symptoms/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setSymptoms(prev => prev.map(s => s.id === id ? updated : s))
    } catch (err) {
      console.error('Error updating symptom:', err)
      throw err
    }
  }

  const deleteSymptom = async (id: string) => {
    try {
      await apiCall(`/symptoms/${id}`, { method: 'DELETE' })
      setSymptoms(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      console.error('Error deleting symptom:', err)
      throw err
    }
  }

  return (
    <DataContext.Provider
      value={{
        residents,
        addResident,
        updateResident,
        deleteResident,
        getResident,
        caregivers,
        addCaregiver,
        updateCaregiver,
        deleteCaregiver,
        getCaregiver,
        medications,
        addMedication,
        updateMedication,
        deleteMedication,
        vitals,
        addVital,
        updateVital,
        deleteVital,
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        symptoms,
        addSymptom,
        updateSymptom,
        deleteSymptom,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

