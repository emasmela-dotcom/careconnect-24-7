'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Calendar, FileText, Activity, Heart, Shield, Menu, X, Share2, Pill, Activity as ActivityIcon, ClipboardList, Star } from 'lucide-react'
import { clsx } from 'clsx'
import { useFavorites } from './FavoritesContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'My Medications', href: '/medications', icon: Pill },
  { name: 'My Appointments', href: '/appointments', icon: Calendar },
  { name: 'Vital Signs', href: '/vitals', icon: ActivityIcon },
  { name: 'Symptoms', href: '/symptoms', icon: ClipboardList },
  { name: 'Health Records', href: '/health-records', icon: FileText },
  { name: 'My Care Team', href: '/caregivers', icon: Heart },
  { name: 'My Schedule', href: '/schedules', icon: Calendar },
  { name: 'Activities', href: '/activities', icon: Activity },
  { name: 'Family Sharing', href: '/family', icon: Share2 },
  { name: 'My Profile', href: '/residents', icon: Users },
  { name: 'Safety', href: '/safety', icon: Shield },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { favorites } = useFavorites()

  return (
    <nav className="bg-white shadow-sm border-b-2 border-senior-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Heart className="text-senior-blue-700" size={24} />
            <Link href="/" className="text-xl font-bold text-gray-900 hover:no-underline">
              CareConnect 24/7
            </Link>
          </div>
          
          {/* Desktop Navigation - Clear buttons */}
          <div className="hidden lg:flex space-x-2">
            {favorites.length > 0 && (
              <Link
                href="/"
                className="flex items-center px-4 py-2 text-base font-bold border-b-2 min-h-[3rem] border-transparent text-black hover:bg-blue-50 hover:border-blue-700"
              >
                <Star size={18} className="mr-2 fill-yellow-500 text-yellow-500" />
                Favorites ({favorites.length})
              </Link>
            )}
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              const isFav = favorites.includes(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'flex items-center px-4 py-2 text-base font-bold border-b-2 min-h-[3rem] relative rounded-t-lg transition-all',
                    isActive
                      ? 'border-senior-blue-700 text-gray-900 bg-senior-blue-50'
                      : 'border-transparent text-gray-800 hover:bg-senior-gray-100 hover:border-senior-blue-500'
                  )}
                >
                  <Icon size={18} className="mr-2" />
                  {item.name}
                  {isFav && (
                    <Star size={14} className="ml-2 fill-yellow-500 text-yellow-500" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button - Clear for easy clicking */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-lg text-black hover:bg-gray-200 min-w-[3rem] min-h-[3rem] border-2 border-gray-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu - Clear buttons */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-gray-400 py-4">
            <div className="flex flex-col space-y-2">
              {favorites.length > 0 && (
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-base font-bold min-h-[3rem] border-2 border-transparent text-black hover:bg-blue-50 hover:border-blue-700 bg-white"
                >
                  <Star size={18} className="mr-3 fill-yellow-500 text-yellow-500" />
                  Favorites ({favorites.length})
                </Link>
              )}
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                const isFav = favorites.includes(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'flex items-center px-4 py-3 rounded-lg text-base font-bold min-h-[3rem] border-2 bg-white transition-all',
                      isActive
                        ? 'bg-senior-blue-50 text-gray-900 border-senior-blue-500'
                        : 'text-gray-800 hover:bg-senior-gray-100 border-senior-gray-300'
                    )}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.name}
                    {isFav && (
                      <Star size={14} className="ml-2 fill-yellow-500 text-yellow-500" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

