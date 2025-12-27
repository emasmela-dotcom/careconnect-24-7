import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { FavoritesProvider } from '@/components/FavoritesContext'
import { DataProvider } from '@/components/DataContextAPI'
import ReminderNotification from '@/components/ReminderNotification'
import NotificationSetup from '@/components/NotificationSetup'
import MyToolsPanel from '@/components/MyToolsPanel'
import UsageTracker from '@/components/UsageTracker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareConnect 24/7 - Caregiver Management Platform',
  description: '24/7 comprehensive care management platform for elderly and senior care. Mobile-first design for caregivers and families.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CareConnect 24/7',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={inter.className}>
        <FavoritesProvider>
          <DataProvider>
            <UsageTracker />
            <NotificationSetup />
            <Navigation />
            <main className="min-h-screen">
              <div className="py-8">
                {children}
              </div>
            </main>
            <ReminderNotification />
            <MyToolsPanel />
          </DataProvider>
        </FavoritesProvider>
      </body>
    </html>
  )
}

