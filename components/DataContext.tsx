'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Data types
export interface Resident {
  id: string
  name: string
  roomNumber?: string
  dateOfBirth?: string
  phone?: string
  email?: string
  emergencyContact?: string
  medicalConditions?: string
  allergies?: string
  notes?: string
  createdAt: string
}

export interface Caregiver {
  id: string
  name: string
  role: string
  phone?: string
  email?: string
  shift?: string
  notes?: string
  createdAt: string
}

export interface Medication {
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
  createdAt: string
}

export interface VitalSign {
  id: string
  residentId: string
  residentName: string
  date: string
  time: string
  bloodPressure?: { systolic: number; diastolic: number }
  heartRate?: number
  temperature?: number
  weight?: number
  glucose?: number
  recordedBy: string
  createdAt: string
}

export interface Appointment {
  id: string
  residentId: string
  residentName: string
  type: string
  doctorName: string
  date: string
  time: string
  location?: string
  address?: string
  notes?: string
  checklist: ChecklistItem[]
  createdAt: string
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export interface SymptomLog {
  id: string
  residentId: string
  residentName: string
  date: string
  time: string
  symptoms: string
  severity: 'mild' | 'moderate' | 'severe'
  duration?: string
  triggers?: string
  notes?: string
  recordedBy: string
  createdAt: string
}

interface DataContextType {
  // Residents
  residents: Resident[]
  addResident: (resident: Omit<Resident, 'id' | 'createdAt'>) => void
  updateResident: (id: string, resident: Partial<Resident>) => void
  deleteResident: (id: string) => void
  getResident: (id: string) => Resident | undefined
  
  // Caregivers
  caregivers: Caregiver[]
  addCaregiver: (caregiver: Omit<Caregiver, 'id' | 'createdAt'>) => void
  updateCaregiver: (id: string, caregiver: Partial<Caregiver>) => void
  deleteCaregiver: (id: string) => void
  getCaregiver: (id: string) => Caregiver | undefined
  
  // Medications
  medications: Medication[]
  addMedication: (medication: Omit<Medication, 'id' | 'createdAt'>) => void
  updateMedication: (id: string, medication: Partial<Medication>) => void
  deleteMedication: (id: string) => void
  
  // Vital Signs
  vitals: VitalSign[]
  addVital: (vital: Omit<VitalSign, 'id' | 'createdAt'>) => void
  updateVital: (id: string, vital: Partial<VitalSign>) => void
  deleteVital: (id: string) => void
  
  // Appointments
  appointments: Appointment[]
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void
  deleteAppointment: (id: string) => void
  
  // Symptoms
  symptoms: SymptomLog[]
  addSymptom: (symptom: Omit<SymptomLog, 'id' | 'createdAt'>) => void
  updateSymptom: (id: string, symptom: Partial<SymptomLog>) => void
  deleteSymptom: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [residents, setResidents] = useState<Resident[]>([])
  const [caregivers, setCaregivers] = useState<Caregiver[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [vitals, setVitals] = useState<VitalSign[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadData = () => {
        try {
          const savedResidents = localStorage.getItem('careconnect-residents')
          if (savedResidents) setResidents(JSON.parse(savedResidents))
          
          const savedCaregivers = localStorage.getItem('careconnect-caregivers')
          if (savedCaregivers) setCaregivers(JSON.parse(savedCaregivers))
          
          const savedMedications = localStorage.getItem('careconnect-medications')
          if (savedMedications) setMedications(JSON.parse(savedMedications))
          
          const savedVitals = localStorage.getItem('careconnect-vitals')
          if (savedVitals) setVitals(JSON.parse(savedVitals))
          
          const savedAppointments = localStorage.getItem('careconnect-appointments')
          if (savedAppointments) setAppointments(JSON.parse(savedAppointments))
          
          const savedSymptoms = localStorage.getItem('careconnect-symptoms')
          if (savedSymptoms) setSymptoms(JSON.parse(savedSymptoms))
        } catch (e) {
          console.error('Error loading data:', e)
        }
      }
      loadData()
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('careconnect-residents', JSON.stringify(residents))
    }
  }, [residents])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('careconnect-caregivers', JSON.stringify(caregivers))
    }
  }, [caregivers])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('careconnect-medications', JSON.stringify(medications))
    }
  }, [medications])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('careconnect-vitals', JSON.stringify(vitals))
    }
  }, [vitals])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('careconnect-appointments', JSON.stringify(appointments))
    }
  }, [appointments])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('careconnect-symptoms', JSON.stringify(symptoms))
    }
  }, [symptoms])

  // Residents
  const addResident = (resident: Omit<Resident, 'id' | 'createdAt'>) => {
    const newResident: Resident = {
      ...resident,
      id: `resident-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setResidents([...residents, newResident])
  }

  const updateResident = (id: string, updates: Partial<Resident>) => {
    setResidents(residents.map(r => r.id === id ? { ...r, ...updates } : r))
  }

  const deleteResident = (id: string) => {
    setResidents(residents.filter(r => r.id !== id))
    // Also delete related medications, vitals, appointments, symptoms
    setMedications(medications.filter(m => m.residentId !== id))
    setVitals(vitals.filter(v => v.residentId !== id))
    setAppointments(appointments.filter(a => a.residentId !== id))
    setSymptoms(symptoms.filter(s => s.residentId !== id))
  }

  const getResident = (id: string) => residents.find(r => r.id === id)

  // Caregivers
  const addCaregiver = (caregiver: Omit<Caregiver, 'id' | 'createdAt'>) => {
    const newCaregiver: Caregiver = {
      ...caregiver,
      id: `caregiver-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setCaregivers([...caregivers, newCaregiver])
  }

  const updateCaregiver = (id: string, updates: Partial<Caregiver>) => {
    setCaregivers(caregivers.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const deleteCaregiver = (id: string) => {
    setCaregivers(caregivers.filter(c => c.id !== id))
  }

  const getCaregiver = (id: string) => caregivers.find(c => c.id === id)

  // Medications
  const addMedication = (medication: Omit<Medication, 'id' | 'createdAt'>) => {
    const newMedication: Medication = {
      ...medication,
      id: `medication-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setMedications([...medications, newMedication])
  }

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications(medications.map(m => m.id === id ? { ...m, ...updates } : m))
  }

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id))
  }

  // Vital Signs
  const addVital = (vital: Omit<VitalSign, 'id' | 'createdAt'>) => {
    const newVital: VitalSign = {
      ...vital,
      id: `vital-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setVitals([...vitals, newVital])
  }

  const updateVital = (id: string, updates: Partial<VitalSign>) => {
    setVitals(vitals.map(v => v.id === id ? { ...v, ...updates } : v))
  }

  const deleteVital = (id: string) => {
    setVitals(vitals.filter(v => v.id !== id))
  }

  // Appointments
  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setAppointments([...appointments, newAppointment])
  }

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, ...updates } : a))
  }

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id))
  }

  // Symptoms
  const addSymptom = (symptom: Omit<SymptomLog, 'id' | 'createdAt'>) => {
    const newSymptom: SymptomLog = {
      ...symptom,
      id: `symptom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setSymptoms([...symptoms, newSymptom])
  }

  const updateSymptom = (id: string, updates: Partial<SymptomLog>) => {
    setSymptoms(symptoms.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const deleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id))
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


