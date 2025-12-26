'use client'

import Link from 'next/link'
import { Users, Calendar, FileText, Activity, Heart, Shield, Share2, Smartphone, Pill, Activity as ActivityIcon, ClipboardList, Star, RefreshCw, CheckCircle2 } from 'lucide-react'
import { useFavorites } from '@/components/FavoritesContext'
import { useData } from '@/components/DataContextAPI'
import { format, isToday } from 'date-fns'

export default function Home() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { medications, appointments, caregivers, vitals } = useData()
  
  // Calculate real stats
  const medicationCount = medications.length
  const todayAppointments = appointments.filter(apt => {
    if (!apt.date) return false
    try {
      return isToday(new Date(apt.date))
    } catch {
      return false
    }
  }).length
  const caregiverCount = caregivers.length
  const upcomingTasks = appointments.filter(apt => {
    if (!apt.date) return false
    try {
      const aptDate = new Date(apt.date)
      return aptDate >= new Date() && aptDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    } catch {
      return false
    }
  }).length
  
  // Colorful feature cards with different warm colors
  const features = [
    {
      icon: Pill,
      title: 'My Medications',
      description: 'Never miss a dose with gentle reminders, pill photos, and easy scheduling',
      href: '/medications',
      color: 'warm-blue',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-400',
      iconBg: 'bg-blue-200',
      iconColor: 'text-blue-700',
    },
    {
      icon: Calendar,
      title: 'My Appointments',
      description: 'View and manage all your appointments in one simple place',
      href: '/appointments',
      color: 'warm-green',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-green-400',
      iconBg: 'bg-green-200',
      iconColor: 'text-green-700',
    },
    {
      icon: CheckCircle2,
      title: 'My Daily Tasks',
      description: 'Simplify your day with a clear list of tasks you need to complete',
      href: '/tasks',
      color: 'warm-orange',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-400',
      iconBg: 'bg-orange-200',
      iconColor: 'text-orange-700',
    },
    {
      icon: ActivityIcon,
      title: 'Vital Signs',
      description: 'Track your blood pressure, weight, and glucose levels with easy-to-read charts',
      href: '/vitals',
      color: 'warm-purple',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-400',
      iconBg: 'bg-purple-200',
      iconColor: 'text-purple-700',
    },
    {
      icon: ClipboardList,
      title: 'Symptom Logging',
      description: 'Keep daily health notes to share with your doctor at your next visit',
      href: '/symptoms',
      color: 'warm-blue',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-400',
      iconBg: 'bg-blue-200',
      iconColor: 'text-blue-700',
    },
    {
      icon: FileText,
      title: 'My Health Records',
      description: 'Keep track of your medical history, medications, and important health information',
      href: '/health-records',
      color: 'warm-green',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-green-400',
      iconBg: 'bg-green-200',
      iconColor: 'text-green-700',
    },
    {
      icon: Share2,
      title: 'Family Sharing',
      description: 'Share your health information and schedules with trusted family members',
      href: '/family',
      color: 'warm-orange',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-400',
      iconBg: 'bg-orange-200',
      iconColor: 'text-orange-700',
    },
    {
      icon: Heart,
      title: 'My Care Team',
      description: 'Manage your family members, helpers, and people who care for you',
      href: '/caregivers',
      color: 'warm-purple',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-400',
      iconBg: 'bg-purple-200',
      iconColor: 'text-purple-700',
    },
    {
      icon: Activity,
      title: 'Activities',
      description: 'Track your daily activities and stay active with personalized reminders',
      href: '/activities',
      color: 'warm-green',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-green-400',
      iconBg: 'bg-green-200',
      iconColor: 'text-green-700',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section - Warm and inviting */}
      <div className="text-center mb-8 bg-gradient-to-r from-blue-100 via-purple-50 to-green-100 p-6 rounded-2xl border-2 border-blue-300 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to CareConnect 24/7
        </h1>
        <div className="w-24 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed mb-3 font-medium">
          Simplify your life with easy-to-use tools for managing your health, medications, and daily activities.
        </p>
        <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Everything you need in one place, designed to be simple and clear.
        </p>
      </div>

      {/* Stats Section - Colorful cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-400 p-4 text-center shadow-md rounded-xl hover:shadow-lg transition-shadow">
          <div className="text-3xl font-bold text-blue-700 mb-2">{medicationCount}</div>
          <div className="text-base text-gray-900 font-semibold mb-1">My Medications</div>
          <div className="text-sm text-gray-700">Active prescriptions</div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-400 p-4 text-center shadow-md rounded-xl hover:shadow-lg transition-shadow">
          <div className="text-3xl font-bold text-green-700 mb-2">{todayAppointments}</div>
          <div className="text-base text-gray-900 font-semibold mb-1">Today&apos;s Appointments</div>
          <div className="text-sm text-gray-700">Scheduled for today</div>
        </div>
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-400 p-4 text-center shadow-md rounded-xl hover:shadow-lg transition-shadow">
          <div className="text-3xl font-bold text-orange-700 mb-2">{caregiverCount}</div>
          <div className="text-base text-gray-900 font-semibold mb-1">My Care Team</div>
          <div className="text-sm text-gray-700">Family and helpers</div>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-400 p-4 text-center shadow-md rounded-xl hover:shadow-lg transition-shadow">
          <div className="text-3xl font-bold text-purple-700 mb-2">{upcomingTasks}</div>
          <div className="text-base text-gray-900 font-semibold mb-1">Upcoming Tasks</div>
          <div className="text-sm text-gray-700">Next 7 days</div>
        </div>
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Star className="fill-yellow-400 text-yellow-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Your Favorite Features</h2>
          </div>
          <p className="text-base text-gray-800 mb-4 font-medium">Quick access to the tools you use most often</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {features
              .filter(feature => favorites.includes(feature.href))
              .map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="relative">
                    <Link
                      href={feature.href}
                      className={`bg-gradient-to-br ${feature.bgGradient} border-2 ${feature.borderColor} p-6 shadow-md block min-h-[180px] hover:shadow-lg rounded-xl transition-all hover:scale-105`}
                    >
                      <div className={`w-16 h-16 ${feature.iconBg} border-2 ${feature.borderColor} flex items-center justify-center mb-4 rounded-lg`}>
                        <Icon className={feature.iconColor} size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-base text-gray-800 leading-relaxed">{feature.description}</p>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(feature.href)
                      }}
                      className="absolute top-4 right-4 p-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 min-w-[3rem] min-h-[3rem] flex items-center justify-center border-2 border-yellow-600 shadow-md"
                      aria-label="Remove from favorites"
                    >
                      <Star size={20} className="fill-white" />
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* All Features Grid - Colorful and inviting */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Everything You Need, Right Here</h2>
        <p className="text-base text-gray-800 mb-4 font-medium">Explore all our care management tools. Click the star to save your favorites for quick access.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            const favorite = isFavorite(feature.href)
            return (
              <div key={feature.title} className="relative">
                <Link
                  href={feature.href}
                  className={`bg-gradient-to-br ${feature.bgGradient} border-2 ${feature.borderColor} p-6 shadow-md block min-h-[180px] hover:shadow-lg rounded-xl transition-all hover:scale-105`}
                >
                  <div className={`w-16 h-16 ${feature.iconBg} border-2 ${feature.borderColor} flex items-center justify-center mb-4 rounded-lg`}>
                    <Icon className={feature.iconColor} size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-800 leading-relaxed">{feature.description}</p>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleFavorite(feature.href)
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full min-w-[3rem] min-h-[3rem] flex items-center justify-center border-2 shadow-md ${
                    favorite
                      ? 'bg-yellow-400 text-white border-yellow-600 hover:bg-yellow-500'
                      : 'bg-white text-gray-600 border-gray-400 hover:bg-gray-100 hover:border-yellow-400'
                  }`}
                  aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star size={20} className={favorite ? 'fill-white' : 'fill-gray-400'} />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions - Colorful buttons */}
      <div className="mt-8 bg-gradient-to-r from-blue-100 via-purple-50 to-green-100 border-2 border-blue-300 p-6 shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Get Started Quickly</h2>
        <p className="text-base text-gray-800 mb-4 font-medium">Connect your calendars and start simplifying your day</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/appointments"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-base font-bold border-2 border-blue-700 hover:from-blue-600 hover:to-blue-700 min-h-[3rem] min-w-[10rem] inline-flex items-center justify-center shadow-md rounded-lg hover:scale-105 transition-all"
          >
            My Appointments
          </Link>
          <Link
            href="/medications"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-base font-bold border-2 border-green-700 hover:from-green-600 hover:to-green-700 min-h-[3rem] min-w-[10rem] inline-flex items-center justify-center shadow-md rounded-lg hover:scale-105 transition-all"
          >
            Medication Reminders
          </Link>
          <Link
            href="/vitals"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-base font-bold border-2 border-purple-700 hover:from-purple-600 hover:to-purple-700 min-h-[3rem] min-w-[10rem] inline-flex items-center justify-center shadow-md rounded-lg hover:scale-105 transition-all"
          >
            Vital Signs
          </Link>
          <Link
            href="/residents"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base font-bold border-2 border-orange-700 hover:from-orange-600 hover:to-orange-700 min-h-[3rem] min-w-[10rem] inline-flex items-center justify-center shadow-md rounded-lg hover:scale-105 transition-all"
          >
            My Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
