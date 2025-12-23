'use client'

import Link from 'next/link'
import { Users, Calendar, FileText, Activity, Heart, Shield, Share2, Smartphone, Pill, Activity as ActivityIcon, ClipboardList, Star, RefreshCw, CheckCircle2 } from 'lucide-react'
import { useFavorites } from '@/components/FavoritesContext'

export default function Home() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const features = [
    {
      icon: RefreshCw,
      title: 'Calendar Sync',
      description: 'Automatically sync with Google Calendar and other online services to keep all your appointments in one place',
      href: '/calendar-sync',
    },
    {
      icon: Calendar,
      title: 'My Appointments',
      description: 'View and manage all your appointments in one simple place, synced from your calendars',
      href: '/appointments',
    },
    {
      icon: CheckCircle2,
      title: 'My Daily Tasks',
      description: 'Simplify your day with a clear list of tasks you need to complete, all in one place',
      href: '/tasks',
    },
    {
      icon: Pill,
      title: 'Medication Reminders',
      description: 'Never miss a dose with gentle reminders, pill photos, and easy scheduling',
      href: '/medications',
    },
    {
      icon: FileText,
      title: 'My Health Records',
      description: 'Keep track of your medical history, medications, and important health information',
      href: '/health-records',
    },
    {
      icon: ActivityIcon,
      title: 'Vital Signs Tracking',
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
      icon: Share2,
      title: 'Family Sharing',
      description: 'Share your health information and schedules with trusted family members',
      href: '/family',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Access everything on your phone with our easy-to-use mobile interface',
      href: '/mobile',
    },
    {
      icon: Activity,
      title: 'Activity Tracking',
      description: 'Track your daily activities and stay active with personalized reminders',
      href: '/activities',
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
          Simplify your day with one place for all your tasks and appointments.
        </p>
        <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed">
          We sync with Google Calendar and your online services to bring everything together. Manage your medications, appointments, and daily tasks all in one simple place.
        </p>
      </div>

      {/* Stats Section - Simple, clear cards with strong borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div className="bg-white border-4 border-blue-700 p-8 text-center shadow-lg">
          <div className="text-4xl font-bold text-blue-700 mb-4">0</div>
          <div className="text-lg text-black font-semibold mb-2">My Appointments Today</div>
          <div className="text-base text-black">Synced from your calendars</div>
        </div>
        <div className="bg-white border-4 border-blue-700 p-8 text-center shadow-lg">
          <div className="text-4xl font-bold text-blue-700 mb-4">0</div>
          <div className="text-lg text-black font-semibold mb-2">Tasks to Complete</div>
          <div className="text-base text-black">Items on your list today</div>
        </div>
        <div className="bg-white border-4 border-blue-700 p-8 text-center shadow-lg">
          <div className="text-4xl font-bold text-blue-700 mb-4">0</div>
          <div className="text-lg text-black font-semibold mb-2">Medications Due</div>
          <div className="text-base text-black">Reminders for today</div>
        </div>
        <div className="bg-white border-4 border-blue-700 p-8 text-center shadow-lg">
          <div className="text-4xl font-bold text-blue-700 mb-4">0</div>
          <div className="text-lg text-black font-semibold mb-2">Calendars Synced</div>
          <div className="text-base text-black">Connected services</div>
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
        <p className="text-xl text-black mb-10 font-medium">All your tasks and appointments in one place. Click the star to save your favorite features for quick access.</p>
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
        <p className="text-xl text-black mb-10 font-medium">Connect your calendars and start simplifying your day</p>
        <div className="flex flex-wrap gap-6">
          <Link
            href="/calendar-sync"
            className="px-10 py-5 bg-blue-700 text-white text-xl font-bold border-4 border-blue-800 hover:bg-blue-800 min-h-[4rem] min-w-[12rem] inline-flex items-center justify-center shadow-lg"
          >
            Sync Google Calendar
          </Link>
          <Link
            href="/tasks"
            className="px-10 py-5 bg-blue-700 text-white text-xl font-bold border-4 border-blue-800 hover:bg-blue-800 min-h-[4rem] min-w-[12rem] inline-flex items-center justify-center shadow-lg"
          >
            View My Tasks
          </Link>
          <Link
            href="/appointments"
            className="px-10 py-5 border-4 border-gray-600 text-black text-xl font-bold hover:bg-gray-100 min-h-[4rem] min-w-[12rem] inline-flex items-center justify-center shadow-lg bg-white"
          >
            My Appointments
          </Link>
          <Link
            href="/medications"
            className="px-10 py-5 border-4 border-gray-600 text-black text-xl font-bold hover:bg-gray-100 min-h-[4rem] min-w-[12rem] inline-flex items-center justify-center shadow-lg bg-white"
          >
            Medication Reminders
          </Link>
        </div>
      </div>
    </div>
  )
}

