'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackToolUsage } from '@/lib/usage-tracking'

const toolNames: Record<string, string> = {
  '/': 'Dashboard',
  '/residents': 'My Profile',
  '/caregivers': 'My Care Team',
  '/medications': 'My Medications',
  '/vitals': 'Vital Signs',
  '/appointments': 'My Appointments',
  '/symptoms': 'Symptoms',
  '/health-records': 'Health Records',
  '/documents': 'Documents',
  '/pharmacy': 'Pharmacy',
  '/wearables': 'Wearables',
  '/activities': 'Activities',
  '/safety': 'Safety',
  '/family': 'Family Sharing',
  '/backup': 'Backup & Export',
}

export default function UsageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname && toolNames[pathname]) {
      trackToolUsage(pathname, toolNames[pathname])
    }
  }, [pathname])

  return null // This component doesn't render anything
}


