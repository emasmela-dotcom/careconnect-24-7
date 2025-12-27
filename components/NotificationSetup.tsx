'use client'

import { useEffect } from 'react'
import { registerServiceWorker, requestNotificationPermission } from '@/lib/push-notifications'

export default function NotificationSetup() {
  useEffect(() => {
    // Register service worker and request notification permission
    const setupNotifications = async () => {
      // Register service worker
      await registerServiceWorker()
      
      // Request notification permission (will show browser prompt)
      // Only request if not already granted/denied
      if (Notification.permission === 'default') {
        await requestNotificationPermission()
      }
    }

    setupNotifications()
  }, [])

  return null // This component doesn't render anything
}


