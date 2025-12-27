import { Medication, Appointment } from '@/components/DataContext'
import { format, parse, isToday, isTomorrow, addMinutes, differenceInMinutes } from 'date-fns'

export interface Reminder {
  id: string
  type: 'medication' | 'appointment'
  title: string
  description: string
  dueTime: Date
  medicationId?: string
  appointmentId?: string
  completed: boolean
}

export function generateMedicationReminders(medications: Medication[]): Reminder[] {
  const reminders: Reminder[] = []
  const now = new Date()
  const today = format(now, 'yyyy-MM-dd')

  medications.forEach((med) => {
    // Check if medication is active
    const startDate = new Date(med.startDate)
    const endDate = med.endDate ? new Date(med.endDate) : null
    
    if (startDate > now || (endDate && endDate < now)) {
      return // Medication not active
    }

    // Generate reminders for each scheduled time
    med.times.forEach((timeStr) => {
      try {
        const [hours, minutes] = timeStr.split(':').map(Number)
        const reminderTime = new Date()
        reminderTime.setHours(hours, minutes || 0, 0, 0)

        // If time has passed today, schedule for tomorrow
        if (reminderTime < now) {
          reminderTime.setDate(reminderTime.getDate() + 1)
        }

        reminders.push({
          id: `med-${med.id}-${timeStr}`,
          type: 'medication',
          title: `Take ${med.name}`,
          description: `${med.dosage} - ${med.frequency}`,
          dueTime: reminderTime,
          medicationId: med.id,
          completed: false,
        })
      } catch (e) {
        console.error('Error parsing medication time:', timeStr, e)
      }
    })
  })

  return reminders.sort((a, b) => a.dueTime.getTime() - b.dueTime.getTime())
}

export function generateAppointmentReminders(appointments: Appointment[]): Reminder[] {
  const reminders: Reminder[] = []
  const now = new Date()

  appointments.forEach((apt) => {
    try {
      const appointmentDate = parse(apt.date, 'yyyy-MM-dd', new Date())
      const [hours, minutes] = apt.time.split(':').map(Number)
      appointmentDate.setHours(hours, minutes || 0, 0, 0)

      // Only create reminders for future appointments
      if (appointmentDate < now) {
        return
      }

      // Create reminder 1 day before
      const reminderTime = new Date(appointmentDate)
      reminderTime.setDate(reminderTime.getDate() - 1)
      reminderTime.setHours(9, 0, 0, 0) // 9 AM the day before

      if (reminderTime > now) {
        reminders.push({
          id: `apt-${apt.id}-reminder`,
          type: 'appointment',
          title: `Upcoming: ${apt.type}`,
          description: `Appointment with ${apt.doctorName} tomorrow at ${apt.time}`,
          dueTime: reminderTime,
          appointmentId: apt.id,
          completed: false,
        })
      }

      // Create reminder 1 hour before
      const oneHourBefore = new Date(appointmentDate)
      oneHourBefore.setHours(oneHourBefore.getHours() - 1)

      if (oneHourBefore > now) {
        reminders.push({
          id: `apt-${apt.id}-1hour`,
          type: 'appointment',
          title: `Appointment in 1 hour`,
          description: `${apt.type} with ${apt.doctorName} at ${apt.time}`,
          dueTime: oneHourBefore,
          appointmentId: apt.id,
          completed: false,
        })
      }
    } catch (e) {
      console.error('Error parsing appointment date/time:', apt.date, apt.time, e)
    }
  })

  return reminders.sort((a, b) => a.dueTime.getTime() - b.dueTime.getTime())
}

export function getUpcomingReminders(reminders: Reminder[], minutesAhead: number = 60): Reminder[] {
  const now = new Date()
  const futureTime = addMinutes(now, minutesAhead)
  
  return reminders.filter(reminder => 
    !reminder.completed &&
    reminder.dueTime >= now &&
    reminder.dueTime <= futureTime
  )
}

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return Promise.resolve('denied')
  }

  if (Notification.permission === 'granted') {
    return Promise.resolve('granted')
  }

  if (Notification.permission === 'denied') {
    return Promise.resolve('denied')
  }

  return Notification.requestPermission()
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options,
    })
  }
}



