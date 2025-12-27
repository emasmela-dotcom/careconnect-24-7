// Push Notification Utilities

export interface NotificationPayload {
  title: string
  body: string
  icon?: string
  tag?: string
  requireInteraction?: boolean
  url?: string
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission === 'denied') {
    console.warn('Notification permission denied')
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

// Register service worker for push notifications
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported')
    return null
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js')
    console.log('Service Worker registered:', registration)
    return registration
  } catch (error) {
    console.error('Service Worker registration failed:', error)
    return null
  }
}

// Subscribe to push notifications
export async function subscribeToPush(registration: ServiceWorkerRegistration): Promise<PushSubscription | null> {
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
      ),
    })
    return subscription
  } catch (error) {
    console.error('Push subscription failed:', error)
    return null
  }
}

// Send local notification (browser notification)
export async function sendLocalNotification(payload: NotificationPayload): Promise<void> {
  if (!('Notification' in window)) {
    return
  }

  const permission = await requestNotificationPermission()
  if (!permission) {
    return
  }

  const options: NotificationOptions = {
    body: payload.body,
    icon: payload.icon || '/icon-192.png',
    badge: '/icon-192.png',
    tag: payload.tag,
    requireInteraction: payload.requireInteraction,
    data: payload.url,
  }

  new Notification(payload.title, options)
}

// Schedule notification for medication reminder
export function scheduleMedicationReminder(
  medicationName: string,
  time: string,
  date: Date
): void {
  const now = new Date()
  const reminderTime = new Date(date)
  const [hours, minutes] = time.split(':').map(Number)
  reminderTime.setHours(hours, minutes, 0, 0)

  // If reminder time is in the past, schedule for tomorrow
  if (reminderTime < now) {
    reminderTime.setDate(reminderTime.getDate() + 1)
  }

  const delay = reminderTime.getTime() - now.getTime()

  setTimeout(() => {
    sendLocalNotification({
      title: '💊 Medication Reminder',
      body: `Time to take ${medicationName}`,
      tag: `medication-${medicationName}`,
      requireInteraction: true,
      url: '/medications',
    })
  }, delay)
}

// Schedule notification for appointment reminder
export function scheduleAppointmentReminder(
  appointmentType: string,
  doctorName: string,
  date: Date,
  time: string
): void {
  const now = new Date()
  const appointmentDate = new Date(date)
  const [hours, minutes] = time.split(':').map(Number)
  appointmentDate.setHours(hours, minutes, 0, 0)

  // Reminder 1 day before
  const oneDayBefore = new Date(appointmentDate)
  oneDayBefore.setDate(oneDayBefore.getDate() - 1)
  oneDayBefore.setHours(9, 0, 0, 0) // 9 AM reminder

  if (oneDayBefore > now) {
    const delay = oneDayBefore.getTime() - now.getTime()
    setTimeout(() => {
      sendLocalNotification({
        title: '📅 Appointment Reminder',
        body: `${appointmentType} with ${doctorName} tomorrow at ${time}`,
        tag: `appointment-${date.toISOString()}`,
        url: '/appointments',
      })
    }, delay)
  }

  // Reminder 1 hour before
  const oneHourBefore = new Date(appointmentDate)
  oneHourBefore.setHours(oneHourBefore.getHours() - 1)

  if (oneHourBefore > now) {
    const delay = oneHourBefore.getTime() - now.getTime()
    setTimeout(() => {
      sendLocalNotification({
        title: '⏰ Appointment in 1 Hour',
        body: `${appointmentType} with ${doctorName} at ${time}`,
        tag: `appointment-${date.toISOString()}`,
        requireInteraction: true,
        url: '/appointments',
      })
    }, delay)
  }
}

// Convert VAPID key from URL-safe base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}


