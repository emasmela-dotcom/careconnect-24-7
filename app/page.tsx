'use client'

import Link from 'next/link'
import { Users, Calendar, FileText, Activity, Heart, Shield, Share2, Smartphone, Pill, Activity as ActivityIcon, ClipboardList, Star } from 'lucide-react'
import { useFavorites } from '@/components/FavoritesContext'

export default function Home() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const features = [
    {
      icon: Pill,
      title: 'My Medications',
      description: 'Never miss a dose with gentle reminders, pill photos, and easy scheduling',
      href: '/medications',
    },
    {
      icon: Calendar,
      title: 'My Appointments',
      description: 'Keep track of all your doctor visits and appointments in one place',
      href: '/appointments',
    },
    {
      icon: FileText,
      title: 'My Health Records',
      description: 'Keep track of your medical history, medications, and important health information',
      href: '/health-records',
    },
    {
      icon: ActivityIcon,
      title: 'Vital Signs',
      description: 'Track your blood pressure, weight, and glucose levels with easy-to-read charts',
      href: '/vitals',
    },
    {
      icon: ClipboardList,
      title: 'Symptom Logging',
      description: 'Keep daily health notes to share with your doctor at your next visit',
      href: '/symptoms',
    },
    {
      icon: Heart,
      title: 'My Care Team',
      description: 'Manage your family members, helpers, and people who care for you',
      href: '/caregivers',
    },
    {
      icon: Share2,
      title: 'Family Sharing',
      description: 'Share your health information and schedules with trusted family members',
      href: '/family',
    },
    {
      icon: Activity,
      title: 'Daily Activities',
      description: 'Track your daily routines, exercise, and activities',
      href: '/activities',
    },
    {
      icon: Calendar,
      title: 'My Schedule',
      description: 'View your daily and weekly schedule of medications, appointments, and tasks',
      href: '/schedules',
    },
    {
      icon: Shield,
      title: 'Safety & Emergency',
      description: 'Emergency contacts, medical alerts, and important safety information',
      href: '/safety',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Access everything on your phone with our easy-to-use mobile view',
      href: '/caregiver-mobile',
    },
    {
      icon: Users,
      title: 'My Profile',
      description: 'Manage your personal information, preferences, and account settings',
      href: '/residents',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section - Clear text that fits on screen */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-senior-blue-900 mb-4">
          Welcome to CareConnect 24/7
        </h1>
        <div className="w-24 h-1 bg-senior-blue-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed mb-4 font-medium">
          Simplify your life with easy-to-use tools for managing your health, medications, and daily activities.
        </p>
        <p className="text-base text-gray-800 max-w-2xl mx-auto leading-relaxed">
          Everything you need in one place, designed to be simple and clear.
        </p>
      </div>

      {/* Stats Section - High contrast cards with calming colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border-2 border-senior-gray-400 p-6 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-senior-blue-700 mb-3">0</div>
          <div className="text-lg text-gray-900 font-semibold mb-1">My Medications</div>
          <div className="text-sm text-gray-700">Active prescriptions</div>
        </div>
        <div className="bg-white border-2 border-senior-gray-400 p-6 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-senior-blue-700 mb-3">0</div>
          <div className="text-lg text-gray-900 font-semibold mb-1">Today&apos;s Appointments</div>
          <div className="text-sm text-gray-700">Scheduled for today</div>
        </div>
        <div className="bg-white border-2 border-senior-gray-400 p-6 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-senior-blue-700 mb-3">0</div>
          <div className="text-lg text-gray-900 font-semibold mb-1">My Care Team</div>
          <div className="text-sm text-gray-700">Family and helpers</div>
        </div>
        <div className="bg-white border-2 border-senior-gray-400 p-6 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-senior-blue-700 mb-3">0</div>
          <div className="text-lg text-gray-900 font-semibold mb-1">Upcoming Tasks</div>
          <div className="text-sm text-gray-700">Things to do today</div>
        </div>
      </div>

      {/* Favorites Section - Show if user has favorites */}
      {favorites.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Star className="fill-yellow-500 text-yellow-500" size={24} />
            <h2 className="text-2xl font-bold text-black">Your Favorite Features</h2>
          </div>
          <p className="text-base text-black mb-6 font-medium">Quick access to the tools you use most often</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {features
              .filter(feature => favorites.includes(feature.href))
              .map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="relative">
                    <Link
                      href={feature.href}
                      className="bg-white border-2 border-senior-gray-300 p-6 rounded-lg shadow-sm block min-h-[180px] hover:shadow-md hover:border-senior-blue-500 transition-all"
                    >
                      <div className="w-16 h-16 border-2 border-senior-blue-500 flex items-center justify-center mb-4 bg-senior-blue-50 rounded-lg">
                        <Icon className="text-senior-blue-700" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{feature.description}</p>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(feature.href)
                      }}
                      className="absolute top-4 right-4 p-2 bg-senior-blue-500 text-white rounded-full hover:bg-senior-blue-600 min-w-[3rem] min-h-[3rem] flex items-center justify-center border-2 border-senior-blue-700 shadow-sm hover:shadow-md transition-all"
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

      {/* All Features Grid - Simple, clear cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">Everything You Need, Right Here</h2>
        <p className="text-base text-black mb-6 font-medium">Explore all our care management tools. Click the star to save your favorites for quick access.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon
            const favorite = isFavorite(feature.href)
          return (
              <div key={feature.title} className="relative">
            <Link
              href={feature.href}
                  className={`bg-white border-2 p-6 rounded-lg shadow-sm block min-h-[180px] hover:shadow-md transition-all ${
                    favorite ? 'border-senior-blue-500 bg-senior-blue-50' : 'border-senior-gray-300 hover:border-senior-blue-500'
                  }`}
                >
                  <div className={`w-16 h-16 border-2 flex items-center justify-center mb-4 rounded-lg ${
                    favorite ? 'border-senior-blue-600 bg-senior-blue-100' : 'border-senior-gray-400 bg-senior-gray-100'
                  }`}>
                    <Icon className={favorite ? 'text-senior-blue-800' : 'text-gray-800'} size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{feature.description}</p>
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
                  className={`absolute top-4 right-4 p-2 rounded-full min-w-[3rem] min-h-[3rem] flex items-center justify-center border-2 shadow-sm hover:shadow-md transition-all ${
                    favorite
                      ? 'bg-senior-blue-500 text-white border-senior-blue-700 hover:bg-senior-blue-600'
                      : 'bg-white text-gray-800 border-senior-gray-400 hover:bg-senior-gray-100 hover:border-senior-blue-500'
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

      {/* Quick Actions - High contrast, accessible buttons */}
      <div className="mt-12 bg-white border-2 border-senior-gray-300 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started Quickly</h2>
        <p className="text-base text-gray-700 mb-6 font-medium">Common tasks to help you get things done faster</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/medications/new"
            className="px-6 py-3 bg-senior-blue-500 text-white text-base font-bold border-2 border-senior-blue-700 hover:bg-senior-blue-600 min-h-[3rem] min-w-[10rem] inline-flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Add Medication
          </Link>
          <Link
            href="/appointments/new"
            className="px-6 py-3 bg-senior-blue-500 text-white text-base font-bold border-2 border-senior-blue-700 hover:bg-senior-blue-600 min-h-[3rem] min-w-[10rem] inline-flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Schedule Appointment
          </Link>
          <Link
            href="/vitals/new"
            className="px-6 py-3 border-2 border-senior-gray-400 text-gray-800 text-base font-bold hover:bg-senior-gray-100 hover:border-senior-blue-500 min-h-[3rem] min-w-[10rem] inline-flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all bg-white"
          >
            Record Vital Signs
          </Link>
          <Link
            href="/symptoms/new"
            className="px-6 py-3 border-2 border-senior-gray-400 text-gray-800 text-base font-bold hover:bg-senior-gray-100 hover:border-senior-blue-500 min-h-[3rem] min-w-[10rem] inline-flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all bg-white"
          >
            Log Symptoms
          </Link>
        </div>
      </div>
    </div>
  )
}

