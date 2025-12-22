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
    <nav className="bg-white shadow-lg border-b-4 border-blue-700">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-4">
            <Heart className="text-blue-700" size={40} />
            <Link href="/" className="text-4xl font-bold text-black hover:no-underline">
              CareConnect 24/7
            </Link>
          </div>
          
          {/* Desktop Navigation - Large, clear buttons */}
          <div className="hidden lg:flex space-x-3">
            {favorites.length > 0 && (
              <Link
                href="/"
                className="flex items-center px-8 py-4 text-xl font-bold border-b-4 min-h-[4rem] border-transparent text-black hover:bg-blue-50 hover:border-blue-700"
              >
                <Star size={28} className="mr-4 fill-yellow-500 text-yellow-500" />
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
                    'flex items-center px-8 py-4 text-xl font-bold border-b-4 min-h-[4rem] relative',
                    isActive
                      ? 'border-blue-700 text-black bg-blue-100'
                      : 'border-transparent text-black hover:bg-gray-100 hover:border-blue-500'
                  )}
                >
                  <Icon size={28} className="mr-4" />
                  {item.name}
                  {isFav && (
                    <Star size={20} className="ml-3 fill-yellow-500 text-yellow-500" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button - Extra large for easy clicking */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-5 rounded-lg text-black hover:bg-gray-200 min-w-[4rem] min-h-[4rem] border-4 border-gray-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Navigation Menu - Large, clear buttons */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-4 border-gray-400 py-8">
            <div className="flex flex-col space-y-3">
              {favorites.length > 0 && (
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-8 py-5 rounded-lg text-xl font-bold min-h-[4rem] border-4 border-transparent text-black hover:bg-blue-50 hover:border-blue-700 bg-white"
                >
                  <Star size={32} className="mr-5 fill-yellow-500 text-yellow-500" />
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
                      'flex items-center px-8 py-5 rounded-lg text-xl font-bold min-h-[4rem] border-4 bg-white',
                      isActive
                        ? 'bg-blue-100 text-black border-blue-700'
                        : 'text-black hover:bg-gray-100 border-gray-400'
                    )}
                  >
                    <Icon size={32} className="mr-5" />
                    {item.name}
                    {isFav && (
                      <Star size={24} className="ml-3 fill-yellow-500 text-yellow-500" />
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

