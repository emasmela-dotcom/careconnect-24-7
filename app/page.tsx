import Link from 'next/link'
import { Users, Calendar, FileText, Activity, Heart, Shield, Share2, Smartphone, Pill, Activity as ActivityIcon, ClipboardList } from 'lucide-react'

export default function Home() {
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
      {/* Hero Section - Large spacing and text */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-black mb-6">
          CareConnect 24/7
        </h1>
        <p className="text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          Comprehensive 24/7 care management platform for elderly and senior care.
        </p>
      </div>

      {/* Stats Section - Larger cards with more spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white border-2 border-gray-300 p-8 text-center shadow-sm">
          <div className="text-4xl font-bold text-black mb-4">0</div>
          <div className="text-lg text-gray-800 font-medium">Active Residents</div>
        </div>
        <div className="bg-white border-2 border-gray-300 p-8 text-center shadow-sm">
          <div className="text-4xl font-bold text-black mb-4">0</div>
          <div className="text-lg text-gray-800 font-medium">Caregivers</div>
        </div>
        <div className="bg-white border-2 border-gray-300 p-8 text-center shadow-sm">
          <div className="text-4xl font-bold text-black mb-4">0</div>
          <div className="text-lg text-gray-800 font-medium">Today&apos;s Appointments</div>
        </div>
        <div className="bg-white border-2 border-gray-300 p-8 text-center shadow-sm">
          <div className="text-4xl font-bold text-black mb-4">0</div>
          <div className="text-lg text-gray-800 font-medium">Pending Tasks</div>
        </div>
      </div>

      {/* Features Grid - Larger cards with more spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link
              key={feature.title}
              href={feature.href}
              className="bg-white border-2 border-gray-300 p-8 hover:border-blue-700 hover:shadow-md block min-h-[200px]"
            >
              <div className="w-16 h-16 border-2 border-gray-400 flex items-center justify-center mb-6 bg-gray-50">
                <Icon className="text-gray-800" size={28} />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">{feature.description}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions - Large buttons */}
      <div className="mt-16 bg-white border-2 border-gray-300 p-10 shadow-sm">
        <h2 className="text-3xl font-semibold text-black mb-8">Quick Actions</h2>
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

