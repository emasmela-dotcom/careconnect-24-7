import { Resident, Caregiver, Medication, VitalSign, Appointment, SymptomLog } from '@/components/DataContext'

export interface ExportData {
  version: string
  exportDate: string
  data: {
    residents: Resident[]
    caregivers: Caregiver[]
    medications: Medication[]
    vitals: VitalSign[]
    appointments: Appointment[]
    symptoms: SymptomLog[]
  }
}

export function exportAllData(data: {
  residents: Resident[]
  caregivers: Caregiver[]
  medications: Medication[]
  vitals: VitalSign[]
  appointments: Appointment[]
  symptoms: SymptomLog[]
}): string {
  const exportData: ExportData = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    data,
  }
  return JSON.stringify(exportData, null, 2)
}

export function importAllData(jsonString: string): ExportData | null {
  try {
    const parsed = JSON.parse(jsonString)
    if (parsed.data && typeof parsed.data === 'object') {
      return parsed as ExportData
    }
    return null
  } catch (e) {
    console.error('Error parsing import data:', e)
    return null
  }
}

export function downloadJSON(data: string, filename: string = 'careconnect-backup.json') {
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}



