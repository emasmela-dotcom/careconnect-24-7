'use client'

import { useEffect, useState } from 'react'
import { useData } from '@/components/DataContextAPI'
import { 
  generateMedicationReminders, 
  generateAppointmentReminders, 
  getUpcomingReminders,
  requestNotificationPermission,
  showNotification,
  Reminder
} from '@/utils/reminders'
import { Bell, X, CheckCircle } from 'lucide-react'

export default function ReminderNotification() {
  const data = useData()
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')
  const [completedReminders, setCompletedReminders] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Request notification permission on mount
    requestNotificationPermission().then(permission => {
      setNotificationPermission(permission)
    })
    
    // Load completed reminders from localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('careconnect-completed-reminders')
        if (saved) {
          const completed = JSON.parse(saved) as string[]
          setCompletedReminders(new Set(completed))
        }
      } catch (e) {
        console.error('Error loading completed reminders:', e)
      }
    }
  }, [])

  // Save completed reminders to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && completedReminders.size > 0) {
      try {
        localStorage.setItem('careconnect-completed-reminders', JSON.stringify(Array.from(completedReminders)))
      } catch (e) {
        console.error('Error saving completed reminders:', e)
      }
    }
  }, [completedReminders])

  // Generate reminders when medications or appointments change
  useEffect(() => {
    const medReminders = generateMedicationReminders(data.medications)
    const aptReminders = generateAppointmentReminders(data.appointments)
    const allReminders = [...medReminders, ...aptReminders]
    
    // Filter out completed reminders
    const activeReminders = allReminders.filter(r => !completedReminders.has(r.id))
    setReminders(activeReminders)
  }, [data.medications, data.appointments, completedReminders])

  // Check for upcoming reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const upcoming = getUpcomingReminders(reminders, 60) // Next 60 minutes
      if (upcoming.length > 0 && !activeReminder) {
        const nextReminder = upcoming[0]
        setActiveReminder(nextReminder)
        
        // Show browser notification
        if (notificationPermission === 'granted') {
          showNotification(nextReminder.title, {
            body: nextReminder.description,
            tag: nextReminder.id,
          })
        }
      }
    }

    checkReminders()
    const interval = setInterval(checkReminders, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [reminders, activeReminder, notificationPermission])

  const handleDismiss = () => {
    if (activeReminder) {
      // Mark reminder as completed
      setCompletedReminders(prev => new Set([...prev, activeReminder.id]))
      setActiveReminder(null)
    }
  }

  const handleSnooze = () => {
    if (activeReminder) {
      // Snooze for 10 minutes
      const snoozedReminder = {
        ...activeReminder,
        dueTime: new Date(activeReminder.dueTime.getTime() + 10 * 60 * 1000),
      }
      setActiveReminder(snoozedReminder)
    }
  }

  if (!activeReminder) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 shadow-lg rounded-lg p-6 max-w-md z-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Bell className="text-blue-600 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">{activeReminder.title}</h3>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Dismiss"
        >
          <X size={20} />
        </button>
      </div>
      <p className="text-base text-gray-700 mb-4">{activeReminder.description}</p>
      <div className="flex gap-3">
        <button
          onClick={handleDismiss}
          className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 min-h-[3rem]"
        >
          <CheckCircle className="mr-2" size={20} />
          Mark Complete
        </button>
        <button
          onClick={handleSnooze}
          className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 min-h-[3rem]"
        >
          Snooze 10 min
        </button>
      </div>
    </div>
  )
}

