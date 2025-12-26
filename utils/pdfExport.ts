import jsPDF from 'jspdf'
import { Resident, Medication, VitalSign, Appointment, SymptomLog } from '@/components/DataContext'
import { format } from 'date-fns'

export function generateHealthSummaryPDF(data: {
  resident: Resident
  medications: Medication[]
  vitals: VitalSign[]
  appointments: Appointment[]
  symptoms: SymptomLog[]
}) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let yPos = margin

  // Header
  doc.setFontSize(20)
  doc.text('Health Summary Report', margin, yPos)
  yPos += 10

  doc.setFontSize(12)
  doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy')}`, margin, yPos)
  yPos += 15

  // Resident Information
  doc.setFontSize(16)
  doc.text('Personal Information', margin, yPos)
  yPos += 8
  doc.setFontSize(11)
  doc.text(`Name: ${data.resident.name}`, margin, yPos)
  yPos += 6
  if (data.resident.dateOfBirth) {
    doc.text(`Date of Birth: ${format(new Date(data.resident.dateOfBirth), 'MMMM dd, yyyy')}`, margin, yPos)
    yPos += 6
  }
  if (data.resident.phone) {
    doc.text(`Phone: ${data.resident.phone}`, margin, yPos)
    yPos += 6
  }
  if (data.resident.email) {
    doc.text(`Email: ${data.resident.email}`, margin, yPos)
    yPos += 6
  }
  if (data.resident.emergencyContact) {
    doc.text(`Emergency Contact: ${data.resident.emergencyContact}`, margin, yPos)
    yPos += 6
  }
  if (data.resident.medicalConditions) {
    doc.text(`Medical Conditions: ${data.resident.medicalConditions}`, margin, yPos)
    yPos += 6
  }
  if (data.resident.allergies) {
    doc.text(`Allergies: ${data.resident.allergies}`, margin, yPos)
    yPos += 6
  }
  yPos += 5

  // Check if we need a new page
  if (yPos > 250) {
    doc.addPage()
    yPos = margin
  }

  // Medications
  if (data.medications.length > 0) {
    doc.setFontSize(16)
    doc.text('Current Medications', margin, yPos)
    yPos += 8
    doc.setFontSize(11)
    data.medications.forEach((med) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = margin
      }
      
      // Add medication photo if available
      if (med.photoUrl) {
        try {
          // Check if it's a base64 data URL
          if (med.photoUrl.startsWith('data:image')) {
            const imgData = med.photoUrl
            // Add image (max 30mm width, 30mm height)
            const imgWidth = 30
            const imgHeight = 30
            doc.addImage(imgData, 'JPEG', margin, yPos, imgWidth, imgHeight)
            yPos += imgHeight + 3
          }
        } catch (e) {
          console.error('Error adding medication image to PDF:', e)
          // Continue without image if there's an error
        }
      }
      
      doc.text(`${med.name} - ${med.dosage}`, margin, yPos)
      yPos += 6
      doc.text(`Frequency: ${med.frequency} at ${med.times.join(', ')}`, margin + 5, yPos)
      yPos += 6
      if (med.notes) {
        doc.text(`Notes: ${med.notes}`, margin + 5, yPos)
        yPos += 6
      }
      yPos += 3
    })
    yPos += 5
  }

  // Recent Vital Signs
  if (data.vitals.length > 0) {
    if (yPos > 250) {
      doc.addPage()
      yPos = margin
    }
    doc.setFontSize(16)
    doc.text('Recent Vital Signs', margin, yPos)
    yPos += 8
    doc.setFontSize(11)
    const recentVitals = data.vitals.slice(0, 10).sort((a, b) => 
      new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime()
    )
    recentVitals.forEach((vital) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = margin
      }
      doc.text(`${format(new Date(vital.date), 'MMM dd, yyyy')} at ${vital.time}`, margin, yPos)
      yPos += 6
      if (vital.bloodPressure) {
        doc.text(`Blood Pressure: ${vital.bloodPressure.systolic}/${vital.bloodPressure.diastolic}`, margin + 5, yPos)
        yPos += 6
      }
      if (vital.heartRate) {
        doc.text(`Heart Rate: ${vital.heartRate} bpm`, margin + 5, yPos)
        yPos += 6
      }
      if (vital.weight) {
        doc.text(`Weight: ${vital.weight} lbs`, margin + 5, yPos)
        yPos += 6
      }
      if (vital.glucose) {
        doc.text(`Glucose: ${vital.glucose} mg/dL`, margin + 5, yPos)
        yPos += 6
      }
      yPos += 3
    })
    yPos += 5
  }

  // Upcoming Appointments
  if (data.appointments.length > 0) {
    if (yPos > 250) {
      doc.addPage()
      yPos = margin
    }
    doc.setFontSize(16)
    doc.text('Upcoming Appointments', margin, yPos)
    yPos += 8
    doc.setFontSize(11)
    const upcomingAppointments = data.appointments
      .filter(apt => new Date(apt.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10)
    upcomingAppointments.forEach((apt) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = margin
      }
      doc.text(`${apt.type} with ${apt.doctorName}`, margin, yPos)
      yPos += 6
      doc.text(`${format(new Date(apt.date), 'MMMM dd, yyyy')} at ${apt.time}`, margin + 5, yPos)
      yPos += 6
      if (apt.location) {
        doc.text(`Location: ${apt.location}`, margin + 5, yPos)
        yPos += 6
      }
      if (apt.notes) {
        doc.text(`Notes: ${apt.notes}`, margin + 5, yPos)
        yPos += 6
      }
      yPos += 3
    })
    yPos += 5
  }

  // Recent Symptoms
  if (data.symptoms.length > 0) {
    if (yPos > 250) {
      doc.addPage()
      yPos = margin
    }
    doc.setFontSize(16)
    doc.text('Recent Symptoms', margin, yPos)
    yPos += 8
    doc.setFontSize(11)
    const recentSymptoms = data.symptoms.slice(0, 10).sort((a, b) => 
      new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime()
    )
    recentSymptoms.forEach((symptom) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = margin
      }
      doc.text(`${format(new Date(symptom.date), 'MMM dd, yyyy')} at ${symptom.time}`, margin, yPos)
      yPos += 6
      doc.text(`Symptoms: ${symptom.symptoms}`, margin + 5, yPos)
      yPos += 6
      doc.text(`Severity: ${symptom.severity}`, margin + 5, yPos)
      yPos += 6
      if (symptom.notes) {
        doc.text(`Notes: ${symptom.notes}`, margin + 5, yPos)
        yPos += 6
      }
      yPos += 3
    })
  }

  return doc
}

