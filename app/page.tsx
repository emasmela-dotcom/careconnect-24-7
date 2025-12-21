'use client'

import Link from 'next/link'
import { Users, Calendar, FileText, Activity, Heart, Shield, Share2, Smartphone, Pill, Activity as ActivityIcon, ClipboardList, Star } from 'lucide-react'
import { useFavorites } from '@/components/FavoritesContext'

export default function Home() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const features = [
    {
      icon: Users,
      title: 'Resident Management',
      description: 'Comprehensive profiles and health records for all residents',
      href: '/residents',
    },
    {
      icon: Calendar,
      title: 'Care Schedules',
      description: 'Manage medication, appointments, and daily care routines',
      href: '/schedules',
    },
    {
      icon: FileText,
      title: 'Health Records',
      description: 'Track medical history, medications, and vital signs',
      href: '/health-records',
    },
    {
      icon: Activity,
      title: 'Activity Tracking',
      description: 'Monitor daily activities and engagement programs',
      href: '/activities',
    },
    {
      icon: Heart,
      title: 'Caregiver Management',
      description: 'Staff scheduling, assignments, and performance tracking',
      href: '/caregivers',
    },
    {
      icon: Shield,
      title: 'Safety & Compliance',
      description: 'Incident reports, safety protocols, and regulatory compliance',
      href: '/safety',
    },
    {
      icon: Share2,
      title: 'Family Sharing',
      description: 'Share health data with family members and caregivers',
      href: '/family',
    },
    {
      icon: Smartphone,
      title: 'Mobile Caregiver View',
      description: 'Optimized mobile experience for caregivers',
      href: '/caregiver-mobile',
    },
    {
      icon: Pill,
      title: 'Medication Reminders',
      description: 'Push notifications with pill photos and scheduling',
      href: '/medications',
    },
    {
      icon: ActivityIcon,
      title: 'Vital Signs Tracking',
      description: 'Blood pressure, weight, glucose with charts',
      href: '/vitals',
    },
    {
      icon: Calendar,
      title: 'Appointment Management',
      description: 'Doctor visits with prep checklists',
      href: '/appointments',
    },
    {
      icon: ClipboardList,
      title: 'Symptom Logging',
      description: 'Daily health notes for doctor visits',
      href: '/symptoms',
    },
  ]

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      {/* Hero Section - Large spacing and text with personality */}
      <div className="text-center mb-16">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-black mb-4">
            Welcome to CareConnect 24/7
        </h1>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
        </div>
        <p className="text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed mb-4">
          Your trusted partner in providing compassionate, around-the-clock care.
        </p>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          We&apos;re here to make care management simple, organized, and stress-free for you and your loved ones.
        </p>
      </div>

      {/* Stats Section - Larger cards with more spacing and personality */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl font-bold text-blue-700 mb-4">0</div>
          <div className="text-lg text-gray-800 font-medium">Active Residents</div>
          <div className="text-sm text-gray-600 mt-2">People we&apos;re caring for</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl font-bold text-blue-700 mb-4">0</div>
          <div className="text-lg text-gray-800 font-medium">Caregivers</div>
          <div className="text-sm text-gray-600 mt-2">Dedicated team members</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl font-bold text-blue-700 mb-4">0</div>
          <div className="text-lg text-gray-800 font-medium">Today&apos;s Appointments</div>
          <div className="text-sm text-gray-600 mt-2">Scheduled for today</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl font-bold text-blue-700 mb-4">0</div>
          <div className="text-lg text-gray-800 font-medium">Pending Tasks</div>
          <div className="text-sm text-gray-600 mt-2">Items to complete</div>
        </div>
      </div>

      {/* Favorites Section - Show if user has favorites */}
      {favorites.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Star className="fill-yellow-400 text-yellow-400" size={32} />
            <h2 className="text-3xl font-semibold text-black">Your Favorite Features</h2>
          </div>
          <p className="text-lg text-gray-700 mb-6">Quick access to the tools you use most often</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {features
              .filter(feature => favorites.includes(feature.href))
              .map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="relative">
                    <Link
                      href={feature.href}
                      className="bg-white border-2 border-blue-700 p-8 hover:shadow-md block min-h-[200px]"
                    >
                      <div className="w-16 h-16 border-2 border-blue-700 flex items-center justify-center mb-6 bg-blue-50">
                        <Icon className="text-blue-800" size={28} />
                      </div>
                      <h3 className="text-2xl font-semibold text-black mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-800 leading-relaxed">{feature.description}</p>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(feature.href)
                      }}
                      className="absolute top-4 right-4 p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 min-w-[3rem] min-h-[3rem] flex items-center justify-center"
                      aria-label="Remove from favorites"
                    >
                      <Star size={24} className="fill-white" />
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* All Features Grid - Larger cards with more spacing */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-black mb-4">Everything You Need, Right Here</h2>
        <p className="text-lg text-gray-700 mb-8">Explore all our care management tools. Click the star to save your favorites for quick access.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon
            const favorite = isFavorite(feature.href)
          return (
              <div key={feature.title} className="relative">
            <Link
              href={feature.href}
                  className={`bg-white border-2 p-8 hover:shadow-md block min-h-[200px] ${
                    favorite ? 'border-blue-700' : 'border-gray-300 hover:border-blue-700'
                  }`}
                >
                  <div className={`w-16 h-16 border-2 flex items-center justify-center mb-6 ${
                    favorite ? 'border-blue-700 bg-blue-50' : 'border-gray-400 bg-gray-50'
                  }`}>
                    <Icon className={favorite ? 'text-blue-800' : 'text-gray-800'} size={28} />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">{feature.description}</p>
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
                  className={`absolute top-4 right-4 p-2 rounded-full min-w-[3rem] min-h-[3rem] flex items-center justify-center border-2 ${
                    favorite
                      ? 'bg-blue-700 text-white border-blue-800 hover:bg-blue-800'
                      : 'bg-white text-gray-600 border-gray-400 hover:bg-gray-100 hover:border-blue-700'
                  }`}
                  aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star size={24} className={favorite ? 'fill-white' : ''} />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions - Large buttons */}
      <div className="mt-16 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-10 shadow-sm">
        <h2 className="text-3xl font-semibold text-black mb-4">Get Started Quickly</h2>
        <p className="text-lg text-gray-700 mb-8">Common tasks to help you get things done faster</p>
        <div className="flex flex-wrap gap-6">
          <Link
            href="/caregiver-mobile"
            className="px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem] inline-flex items-center justify-center"
          >
            Mobile Caregiver View
          </Link>
          <Link
            href="/family"
            className="px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem] inline-flex items-center justify-center"
          >
            Family Sharing
          </Link>
          <Link
            href="/residents/new"
            className="px-8 py-4 border-2 border-gray-400 text-black text-lg font-semibold hover:bg-gray-100 min-h-[3.5rem] inline-flex items-center justify-center"
          >
            Add New Resident
          </Link>
          <Link
            href="/schedules/new"
            className="px-8 py-4 border-2 border-gray-400 text-black text-lg font-semibold hover:bg-gray-100 min-h-[3.5rem] inline-flex items-center justify-center"
          >
            Create Schedule
          </Link>
        </div>
      </div>
    </div>
  )
}

