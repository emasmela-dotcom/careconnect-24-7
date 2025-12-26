'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/components/DataContextAPI'
import { exportAllData, importAllData, downloadJSON } from '@/utils/exportData'
import { generateHealthSummaryPDF } from '@/utils/pdfExport'
import { Download, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'

export default function BackupPage() {
  const data = useData()
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [importMessage, setImportMessage] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const handleExportJSON = () => {
    setIsExporting(true)
    try {
      const jsonData = exportAllData({
        residents: data.residents,
        caregivers: data.caregivers,
        medications: data.medications,
        vitals: data.vitals,
        appointments: data.appointments,
        symptoms: data.symptoms,
      })
      downloadJSON(jsonData, `careconnect-backup-${new Date().toISOString().split('T')[0]}.json`)
    } catch (error) {
      console.error('Export error:', error)
      alert('Error exporting data. Please try again.')
    } finally {
      setTimeout(() => setIsExporting(false), 500)
    }
  }

  const handleExportPDF = () => {
    if (data.residents.length === 0) {
      alert('Please set up your profile first before exporting a PDF.')
      return
    }

    setIsExporting(true)
    try {
      const resident = data.residents[0] // Use first resident for now
      const residentMedications = data.medications.filter(m => m.residentId === resident.id)
      const residentVitals = data.vitals.filter(v => v.residentId === resident.id)
      const residentAppointments = data.appointments.filter(a => a.residentId === resident.id)
      const residentSymptoms = data.symptoms.filter(s => s.residentId === resident.id)

      const pdf = generateHealthSummaryPDF({
        resident,
        medications: residentMedications,
        vitals: residentVitals,
        appointments: residentAppointments,
        symptoms: residentSymptoms,
      })

      pdf.save(`health-summary-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('PDF export error:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setTimeout(() => setIsExporting(false), 500)
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // File size validation (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      setImportStatus('error')
      setImportMessage('File is too large. Maximum file size is 10MB.')
      return
    }

    setIsImporting(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importData = importAllData(content)

        if (!importData || !importData.data) {
          setImportStatus('error')
          setImportMessage('Invalid backup file format.')
          return
        }

        // Confirm with user before importing
        const confirmed = window.confirm(
          'This will replace all your current data. Are you sure you want to continue?'
        )

        if (!confirmed) {
          setImportStatus('idle')
          setImportMessage('')
          return
        }

        // Import data
        if (importData.data.residents) {
          importData.data.residents.forEach(r => {
            const existing = data.residents.find(ex => ex.id === r.id)
            if (existing) {
              data.updateResident(r.id, r)
            } else {
              data.addResident(r)
            }
          })
        }

        if (importData.data.medications) {
          importData.data.medications.forEach(m => {
            const existing = data.medications.find(ex => ex.id === m.id)
            if (existing) {
              data.updateMedication(m.id, m)
            } else {
              data.addMedication(m)
            }
          })
        }

        if (importData.data.vitals) {
          importData.data.vitals.forEach(v => {
            const existing = data.vitals.find(ex => ex.id === v.id)
            if (existing) {
              data.updateVital(v.id, v)
            } else {
              data.addVital(v)
            }
          })
        }

        if (importData.data.appointments) {
          importData.data.appointments.forEach(a => {
            const existing = data.appointments.find(ex => ex.id === a.id)
            if (existing) {
              data.updateAppointment(a.id, a)
            } else {
              data.addAppointment(a)
            }
          })
        }

        if (importData.data.symptoms) {
          importData.data.symptoms.forEach(s => {
            const existing = data.symptoms.find(ex => ex.id === s.id)
            if (existing) {
              data.updateSymptom(s.id, s)
            } else {
              data.addSymptom(s)
            }
          })
        }

        if (importData.data.caregivers) {
          importData.data.caregivers.forEach(c => {
            const existing = data.caregivers.find(ex => ex.id === c.id)
            if (existing) {
              data.updateCaregiver(c.id, c)
            } else {
              data.addCaregiver(c)
            }
          })
        }

        setImportStatus('success')
        setImportMessage('Data imported successfully!')
        
        // Reset after 3 seconds
        setTimeout(() => {
          setImportStatus('idle')
          setImportMessage('')
        }, 3000)
      } catch (error) {
        setImportStatus('error')
        setImportMessage('Error reading file. Please make sure it is a valid backup file.')
        console.error('Import error:', error)
      } finally {
        setIsImporting(false)
      }
    }
    reader.onerror = () => {
      setImportStatus('error')
      setImportMessage('Error reading file. Please try again.')
      setIsImporting(false)
    }
    reader.readAsText(file)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Backup & Export</h1>
      <p className="text-lg text-gray-700 mb-8">
        Export your data to share with family or doctors, or import data from another device.
      </p>

      {/* Export Section */}
      <div className="bg-white border-2 border-gray-300 p-6 mb-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Download className="mr-2" size={24} />
          Export Your Data
        </h2>
        <p className="text-base text-gray-700 mb-6">
          Download your health data to share with family members, doctors, or to use on another device.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleExportJSON}
            disabled={isExporting}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold border-2 border-blue-700 hover:bg-blue-700 rounded-lg min-h-[3rem] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2" size={20} />
                Export as JSON
              </>
            )}
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center px-6 py-3 bg-green-600 text-white font-semibold border-2 border-green-700 hover:bg-green-700 rounded-lg min-h-[3rem] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <FileText className="mr-2" size={20} />
                Export as PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white border-2 border-gray-300 p-6 mb-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Upload className="mr-2" size={24} />
          Import Data
        </h2>
        <p className="text-base text-gray-700 mb-6">
          Import data from another device or restore from a backup. This will merge with your existing data.
        </p>

        <div className="mb-4">
          <label className="block mb-2 text-base font-semibold text-gray-900">
            Select Backup File (max 10MB)
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            disabled={isImporting}
            className="block w-full text-base text-gray-700 border-2 border-gray-300 rounded-lg p-2 cursor-pointer hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {isImporting && (
            <div className="mt-2 flex items-center text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span>Importing data...</span>
            </div>
          )}
        </div>

        {importStatus !== 'idle' && (
          <div
            className={`p-4 rounded-lg flex items-center ${
              importStatus === 'success'
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-red-50 border-2 border-red-300'
            }`}
          >
            {importStatus === 'success' ? (
              <CheckCircle className="mr-2 text-green-600" size={20} />
            ) : (
              <AlertCircle className="mr-2 text-red-600" size={20} />
            )}
            <span
              className={
                importStatus === 'success' ? 'text-green-800' : 'text-red-800'
              }
            >
              {importMessage}
            </span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-2 border-blue-300 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h3>
        <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
          <li>
            <strong>Export as JSON:</strong> Download all your data in a format that can be imported on another device or used as a backup.
          </li>
          <li>
            <strong>Export as PDF:</strong> Create a printable health summary to share with your doctor or keep for your records.
          </li>
          <li>
            <strong>Import Data:</strong> Select a previously exported JSON file to restore your data or sync from another device.
          </li>
        </ul>
      </div>
    </div>
  )
}

