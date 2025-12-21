'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Calendar, FileText, Activity, Heart, Shield, Menu, X, Share2, Pill, Activity as ActivityIcon, ClipboardList, Star } from 'lucide-react'
import { clsx } from 'clsx'
import { useFavorites } from './FavoritesContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Residents', href: '/residents', icon: Users },
  { name: 'Caregivers', href: '/caregivers', icon: Heart },
  { name: 'Medications', href: '/medications', icon: Pill },
  { name: 'Vital Signs', href: '/vitals', icon: ActivityIcon },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Symptoms', href: '/symptoms', icon: ClipboardList },
  { name: 'Health Records', href: '/health-records', icon: FileText },
  { name: 'Activities', href: '/activities', icon: Activity },
  { name: 'Safety', href: '/safety', icon: Shield },
  { name: 'Family Sharing', href: '/family', icon: Share2 },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { favorites } = useFavorites()

  return (
    <nav className="bg-white shadow-md border-b-2 border-gray-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Heart className="text-blue-700" size={32} />
            <Link href="/" className="text-3xl font-bold text-black hover:no-underline">
              CareConnect 24/7
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-2">
            {favorites.length > 0 && (
              <Link
                href="/"
                className="flex items-center px-6 py-3 text-lg font-semibold border-b-4 min-h-[3.5rem] border-transparent text-gray-800 hover:bg-gray-100 hover:text-black"
              >
                <Star size={22} className="mr-3 fill-yellow-400 text-yellow-400" />
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
                    'flex items-center px-6 py-3 text-lg font-semibold border-b-4 min-h-[3.5rem] relative',
                    isActive
                      ? 'border-blue-700 text-black bg-blue-50'
                      : 'border-transparent text-gray-800 hover:bg-gray-100 hover:text-black'
                  )}
                >
                  <Icon size={22} className="mr-3" />
                  {item.name}
                  {isFav && (
                    <Star size={16} className="ml-2 fill-yellow-400 text-yellow-400" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button - Large for easy clicking */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-4 rounded-lg text-black hover:bg-gray-200 min-w-[3.5rem] min-h-[3.5rem]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-gray-300 py-6">
            <div className="flex flex-col space-y-2">
              {favorites.length > 0 && (
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-6 py-4 rounded-lg text-lg font-semibold min-h-[3.5rem] border-2 border-transparent text-gray-800 hover:bg-gray-100 hover:text-black"
                >
                  <Star size={24} className="mr-4 fill-yellow-400 text-yellow-400" />
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
                      'flex items-center px-6 py-4 rounded-lg text-lg font-semibold min-h-[3.5rem] border-2',
                      isActive
                        ? 'bg-blue-100 text-black border-blue-700'
                        : 'text-gray-800 hover:bg-gray-100 hover:text-black border-transparent'
                    )}
                  >
                    <Icon size={24} className="mr-4" />
                    {item.name}
                    {isFav && (
                      <Star size={18} className="ml-2 fill-yellow-400 text-yellow-400" />
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

