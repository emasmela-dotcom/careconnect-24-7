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
    <div className="container mx-auto px-8 py-16 max-w-6xl">
      {/* Hero Section - Extra large spacing and clear text */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-black mb-6">
          Welcome to CareConnect 24/7
        </h1>
        <div className="w-32 h-2 bg-blue-700 mx-auto mb-8"></div>
        <p className="text-2xl text-black max-w-3xl mx-auto leading-relaxed mb-6 font-medium">
          Your trusted partner in providing compassionate, around-the-clock care.
        </p>
        <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed">
          We&apos;re here to make care management simple, organized, and stress-free for you and your loved ones.
        </p>
      </div>

      {/* Stats Section - Simple, clear cards with strong borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div className="bg-white border-4 border-blue-700 p-10 text-center shadow-lg">
          <div className="text-5xl font-bold text-blue-700 mb-6">0</div>
          <div className="text-xl text-black font-semibold mb-2">Active Residents</div>
          <div className="text-lg text-black">People we&apos;re caring for</div>
        </div>
        <div className="bg-white border-4 border-blue-700 p-10 text-center shadow-lg">
          <div className="text-5xl font-bold text-blue-700 mb-6">0</div>
          <div className="text-xl text-black font-semibold mb-2">Caregivers</div>
          <div className="text-lg text-black">Dedicated team members</div>
        </div>
        <div className="bg-white border-4 border-blue-700 p-10 text-center shadow-lg">
          <div className="text-5xl font-bold text-blue-700 mb-6">0</div>
          <div className="text-xl text-black font-semibold mb-2">Today&apos;s Appointments</div>
          <div className="text-lg text-black">Scheduled for today</div>
        </div>
        <div className="bg-white border-4 border-blue-700 p-10 text-center shadow-lg">
          <div className="text-5xl font-bold text-blue-700 mb-6">0</div>
          <div className="text-xl text-black font-semibold mb-2">Pending Tasks</div>
          <div className="text-lg text-black">Items to complete</div>
        </div>
      </div>

      {/* Favorites Section - Show if user has favorites */}
      {favorites.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <Star className="fill-yellow-500 text-yellow-500" size={40} />
            <h2 className="text-3xl font-bold text-black">Your Favorite Features</h2>
          </div>
          <p className="text-xl text-black mb-8 font-medium">Quick access to the tools you use most often</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features
              .filter(feature => favorites.includes(feature.href))
              .map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="relative">
                    <Link
                      href={feature.href}
                      className="bg-white border-4 border-blue-700 p-10 shadow-lg block min-h-[240px] hover:shadow-xl"
                    >
                      <div className="w-20 h-20 border-4 border-blue-700 flex items-center justify-center mb-8 bg-blue-100">
                        <Icon className="text-blue-800" size={36} />
                      </div>
                      <h3 className="text-2xl font-bold text-black mb-6">
                        {feature.title}
                      </h3>
                      <p className="text-xl text-black leading-relaxed">{feature.description}</p>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(feature.href)
                      }}
                      className="absolute top-6 right-6 p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 min-w-[4rem] min-h-[4rem] flex items-center justify-center border-4 border-blue-800 shadow-lg"
                      aria-label="Remove from favorites"
                    >
                      <Star size={28} className="fill-white" />
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* All Features Grid - Simple, clear cards */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-black mb-6">Everything You Need, Right Here</h2>
        <p className="text-xl text-black mb-10 font-medium">Explore all our care management tools. Click the star to save your favorites for quick access.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
            const favorite = isFavorite(feature.href)
          return (
              <div key={feature.title} className="relative">
            <Link
              href={feature.href}
                  className={`bg-white border-4 p-10 shadow-lg block min-h-[240px] hover:shadow-xl ${
                    favorite ? 'border-blue-700' : 'border-gray-400 hover:border-blue-700'
                  }`}
                >
                  <div className={`w-20 h-20 border-4 flex items-center justify-center mb-8 ${
                    favorite ? 'border-blue-700 bg-blue-100' : 'border-gray-500 bg-gray-100'
                  }`}>
                    <Icon className={favorite ? 'text-blue-800' : 'text-black'} size={36} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-6">
                {feature.title}
              </h3>
              <p className="text-xl text-black leading-relaxed">{feature.description}</p>
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
                  className={`absolute top-6 right-6 p-3 rounded-full min-w-[4rem] min-h-[4rem] flex items-center justify-center border-4 shadow-lg ${
                    favorite
                      ? 'bg-blue-700 text-white border-blue-800 hover:bg-blue-800'
                      : 'bg-white text-black border-gray-500 hover:bg-gray-100 hover:border-blue-700'
                  }`}
                  aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star size={28} className={favorite ? 'fill-white' : 'fill-gray-400'} />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions - Extra large, obvious buttons */}
      <div className="mt-20 bg-white border-4 border-blue-700 p-12 shadow-lg">
        <h2 className="text-3xl font-bold text-black mb-6">Get Started Quickly</h2>
        <p className="text-xl text-black mb-10 font-medium">Common tasks to help you get things done faster</p>
        <div className="flex flex-wrap gap-6">
          <Link
            href="/caregiver-mobile"
            className="px-10 py-5 bg-blue-700 text-white text-xl font-bold border-4 border-blue-800 hover:bg-blue-800 min-h-[4rem] min-w-[12rem] inline-flex items-center justify-center shadow-lg"
          >
            Mobile Caregiver View
          </Link>
          <Link
            href="/family"
            className="px-10 py-5 bg-blue-700 text-white text-xl font-bold border-4 border-blue-800 hover:bg-blue-800 min-h-[4rem] min-w-[12rem] inline-flex items-center justify-center shadow-lg"
          >
            Family Sharing
          </Link>
          <Link
            href="/residents/new"
            className="px-10 py-5 border-4 border-gray-600 text-black text-xl font-bold hover:bg-gray-100 min-h-[4rem] min-w-[12rem] inline-flex items-center justify-center shadow-lg bg-white"
          >
            Add New Resident
          </Link>
          <Link
            href="/schedules/new"
            className="px-10 py-5 border-4 border-gray-600 text-black text-xl font-bold hover:bg-gray-100 min-h-[4rem] min-w-[12rem] inline-flex items-center justify-center shadow-lg bg-white"
          >
            Create Schedule
          </Link>
        </div>
      </div>
    </div>
  )
}

