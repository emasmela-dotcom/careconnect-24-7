'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { X, Clock, TrendingUp, Activity, Pill, Calendar, FileText, Heart, Zap } from 'lucide-react'
import { useData } from './DataContextAPI'
import { useFavorites } from './FavoritesContext'
import { getRecentlyUsedTools, getFrequentlyUsedTools, trackToolUsage } from '@/lib/usage-tracking'
import { format, isToday, isTomorrow } from 'date-fns'

const toolIcons: Record<string, any> = {
  '/': Activity,
  '/residents': Heart,
  '/caregivers': Heart,
  '/medications': Pill,
  '/vitals': Activity,
  '/appointments': Calendar,
  '/symptoms': FileText,
  '/health-records': FileText,
  '/documents': FileText,
  '/pharmacy': Pill,
  '/wearables': Activity,
}

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
}

export default function MyToolsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [recentlyUsed, setRecentlyUsed] = useState<any[]>([])
  const [frequentlyUsed, setFrequentlyUsed] = useState<any[]>([])
  const pathname = usePathname()
  const { medications, appointments } = useData()
  const { favorites } = useFavorites()

  // Track current page usage
  useEffect(() => {
    if (pathname && toolNames[pathname]) {
      trackToolUsage(pathname, toolNames[pathname])
    }
  }, [pathname])

  // Load usage data
  useEffect(() => {
    setRecentlyUsed(getRecentlyUsedTools(5))
    setFrequentlyUsed(getFrequentlyUsedTools(5))
  }, [pathname]) // Reload when pathname changes

  // Get active tools (medications with reminders today, appointments today, etc.)
  const activeTools = []
  
  // Medications with reminders today
  const medicationsToday = medications.filter(med => {
    if (!med.times || med.times.length === 0) return false
    const now = new Date()
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    return med.times.some(time => time >= currentTime)
  })
  if (medicationsToday.length > 0) {
    activeTools.push({
      href: '/medications',
      name: 'Medications',
      count: medicationsToday.length,
      icon: Pill,
      urgency: 'high',
    })
  }

  // Appointments today
  const appointmentsToday = appointments.filter(apt => {
    if (!apt.date) return false
    return isToday(new Date(apt.date))
  })
  if (appointmentsToday.length > 0) {
    activeTools.push({
      href: '/appointments',
      name: 'Appointments',
      count: appointmentsToday.length,
      icon: Calendar,
      urgency: 'high',
    })
  }

  // Appointments tomorrow
  const appointmentsTomorrow = appointments.filter(apt => {
    if (!apt.date) return false
    return isTomorrow(new Date(apt.date))
  })
  if (appointmentsTomorrow.length > 0) {
    activeTools.push({
      href: '/appointments',
      name: 'Appointments Tomorrow',
      count: appointmentsTomorrow.length,
      icon: Calendar,
      urgency: 'medium',
    })
  }

  return (
    <>
      {/* Floating Button - Mobile Optimized */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all flex items-center justify-center min-w-[5rem] min-h-[5rem] sm:min-w-[4rem] sm:min-h-[4rem] border-4 border-white touch-manipulation"
        style={{ padding: '1.25rem' }}
        aria-label="My Tools"
        title="My Tools - Quick Access"
      >
        <Zap size={32} className="fill-white sm:w-7 sm:h-7" />
      </button>

      {/* Panel Overlay - Mobile Optimized */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 touch-none"
          onClick={() => setIsOpen(false)}
          onTouchStart={(e) => {
            // Close on swipe right (swipe away from panel)
            const touch = e.touches[0]
            if (touch.clientX < 50) {
              setIsOpen(false)
            }
          }}
        />
      )}

      {/* Tools Panel - Mobile Optimized */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full overflow-y-auto p-4 sm:p-6 pb-24">
          {/* Header - Mobile Optimized */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-blue-300">
            <h2 className="text-3xl sm:text-2xl font-bold text-gray-900">My Tools</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 sm:p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg touch-manipulation min-w-[3.5rem] min-h-[3.5rem] sm:min-w-[2.5rem] sm:min-h-[2.5rem] flex items-center justify-center"
              aria-label="Close"
            >
              <X size={28} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Active Tools (High Priority) - Mobile Optimized */}
          {activeTools.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-red-600" size={24} />
                <h3 className="text-xl sm:text-lg font-bold text-gray-900">Active Now</h3>
              </div>
              <div className="space-y-3">
                {activeTools.map((tool, idx) => {
                  const Icon = tool.icon
                  return (
                    <Link
                      key={idx}
                      href={tool.href}
                      onClick={() => setIsOpen(false)}
                      className={`block p-5 sm:p-4 rounded-xl border-4 active:scale-95 touch-manipulation ${
                        tool.urgency === 'high'
                          ? 'bg-red-50 border-red-400 active:bg-red-100'
                          : 'bg-yellow-50 border-yellow-400 active:bg-yellow-100'
                      } transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Icon size={32} className="text-gray-700 sm:w-6 sm:h-6 flex-shrink-0" />
                          <div>
                            <p className="font-bold text-lg sm:text-base text-gray-900">{tool.name}</p>
                            <p className="text-base sm:text-sm text-gray-600">
                              {tool.count} {tool.count === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                        </div>
                        <span className={`px-4 py-2 sm:px-3 sm:py-1 rounded-full text-base sm:text-sm font-bold flex-shrink-0 ${
                          tool.urgency === 'high'
                            ? 'bg-red-600 text-white'
                            : 'bg-yellow-600 text-white'
                        }`}>
                          {tool.count}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Favorites - Mobile Optimized */}
          {favorites.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-yellow-600 fill-yellow-600" size={24} />
                <h3 className="text-xl sm:text-lg font-bold text-gray-900">Favorites</h3>
              </div>
              <div className="space-y-3">
                {favorites.slice(0, 5).map((href) => {
                  const Icon = toolIcons[href] || FileText
                  const name = toolNames[href] || 'Tool'
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="block p-5 sm:p-4 bg-blue-50 border-4 border-blue-300 rounded-xl active:bg-blue-100 active:scale-95 touch-manipulation transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Icon size={32} className="text-blue-700 sm:w-6 sm:h-6 flex-shrink-0" />
                        <p className="font-bold text-lg sm:text-base text-gray-900">{name}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Recently Used - Mobile Optimized */}
          {recentlyUsed.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-blue-600" size={24} />
                <h3 className="text-xl sm:text-lg font-bold text-gray-900">Recently Used</h3>
              </div>
              <div className="space-y-3">
                {recentlyUsed.map((tool) => {
                  const Icon = toolIcons[tool.href] || FileText
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setIsOpen(false)}
                      className="block p-5 sm:p-4 bg-gray-50 border-4 border-gray-300 rounded-xl active:bg-gray-100 active:scale-95 touch-manipulation transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Icon size={32} className="text-gray-700 sm:w-6 sm:h-6 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-lg sm:text-base text-gray-900">{tool.name}</p>
                          <p className="text-sm sm:text-xs text-gray-600">
                            {format(new Date(tool.lastUsed), 'MMM d, h:mm a')}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Frequently Used - Mobile Optimized */}
          {frequentlyUsed.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-green-600" size={24} />
                <h3 className="text-xl sm:text-lg font-bold text-gray-900">Most Used</h3>
              </div>
              <div className="space-y-3">
                {frequentlyUsed.map((tool) => {
                  const Icon = toolIcons[tool.href] || FileText
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setIsOpen(false)}
                      className="block p-5 sm:p-4 bg-green-50 border-4 border-green-300 rounded-xl active:bg-green-100 active:scale-95 touch-manipulation transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Icon size={32} className="text-green-700 sm:w-6 sm:h-6 flex-shrink-0" />
                          <p className="font-bold text-lg sm:text-base text-gray-900">{tool.name}</p>
                        </div>
                        <span className="px-3 py-2 sm:px-2 sm:py-1 bg-green-600 text-white text-base sm:text-xs font-bold rounded-full flex-shrink-0">
                          {tool.useCount}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Quick Actions - Mobile Optimized */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/medications/new"
                onClick={() => setIsOpen(false)}
                className="p-5 sm:p-3 bg-purple-50 border-4 border-purple-300 rounded-xl active:bg-purple-100 active:scale-95 touch-manipulation text-center transition-all"
              >
                <Pill size={28} className="mx-auto mb-2 sm:mb-1 text-purple-700 sm:w-5 sm:h-5" />
                <p className="text-base sm:text-sm font-bold text-gray-900">Add Medication</p>
              </Link>
              <Link
                href="/appointments/new"
                onClick={() => setIsOpen(false)}
                className="p-5 sm:p-3 bg-blue-50 border-4 border-blue-300 rounded-xl active:bg-blue-100 active:scale-95 touch-manipulation text-center transition-all"
              >
                <Calendar size={28} className="mx-auto mb-2 sm:mb-1 text-blue-700 sm:w-5 sm:h-5" />
                <p className="text-base sm:text-sm font-bold text-gray-900">Schedule Appointment</p>
              </Link>
              <Link
                href="/vitals/new"
                onClick={() => setIsOpen(false)}
                className="p-5 sm:p-3 bg-green-50 border-4 border-green-300 rounded-xl active:bg-green-100 active:scale-95 touch-manipulation text-center transition-all"
              >
                <Activity size={28} className="mx-auto mb-2 sm:mb-1 text-green-700 sm:w-5 sm:h-5" />
                <p className="text-base sm:text-sm font-bold text-gray-900">Log Vital Signs</p>
              </Link>
              <Link
                href="/symptoms/new"
                onClick={() => setIsOpen(false)}
                className="p-5 sm:p-3 bg-orange-50 border-4 border-orange-300 rounded-xl active:bg-orange-100 active:scale-95 touch-manipulation text-center transition-all"
              >
                <FileText size={28} className="mx-auto mb-2 sm:mb-1 text-orange-700 sm:w-5 sm:h-5" />
                <p className="text-base sm:text-sm font-bold text-gray-900">Log Symptoms</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

