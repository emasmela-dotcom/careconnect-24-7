'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Users, Calendar, FileText, Activity, Heart, Shield, Menu, X, Share2, Pill, Activity as ActivityIcon, ClipboardList, Star, Download, LogIn, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { useFavorites } from './FavoritesContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'My Profile', href: '/residents', icon: Users },
  { name: 'My Care Team', href: '/caregivers', icon: Heart },
  { name: 'My Medications', href: '/medications', icon: Pill },
  { name: 'Vital Signs', href: '/vitals', icon: ActivityIcon },
  { name: 'My Appointments', href: '/appointments', icon: Calendar },
  { name: 'Symptoms', href: '/symptoms', icon: ClipboardList },
  { name: 'Health Records', href: '/health-records', icon: FileText },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Pharmacy', href: '/pharmacy', icon: Pill },
  { name: 'Wearables', href: '/wearables', icon: Activity },
  { name: 'Activities', href: '/activities', icon: Activity },
  { name: 'Safety', href: '/safety', icon: Shield },
  { name: 'Family Sharing', href: '/family', icon: Share2 },
  { name: 'Backup & Export', href: '/backup', icon: Download },
]

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { favorites } = useFavorites()

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('careconnect-user')
      if (userStr) {
        try {
          setUser(JSON.parse(userStr))
        } catch {
          setUser(null)
        }
      }
    }
  }, [pathname])

  const handleSignOut = () => {
    localStorage.removeItem('careconnect-user')
    localStorage.removeItem('careconnect-token')
    setUser(null)
    router.push('/auth/signin')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-50 via-white to-green-50 shadow-lg border-b-2 border-blue-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" size={28} />
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent hover:no-underline">
              CareConnect 24/7
            </Link>
          </div>
          
          {/* Desktop Navigation - Large, clear buttons */}
          <div className="hidden lg:flex items-center space-x-2 h-16">
            {user ? (
              <div className="flex items-center gap-2 h-full">
                <span className="text-sm text-gray-700 font-semibold whitespace-nowrap">Hi, {user.name}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center px-4 py-2 text-base font-bold border-2 border-red-400 text-red-600 hover:bg-red-50 rounded-lg h-[3rem]"
                >
                  <LogOut size={20} className="mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center justify-center px-4 py-2 text-base font-bold border-2 border-blue-400 text-blue-600 hover:bg-blue-50 rounded-lg h-[3rem]"
              >
                <LogIn size={20} className="mr-2" />
                Sign In
              </Link>
            )}
            {favorites.length > 0 && (
              <Link
                href="/"
                className="flex items-center justify-center px-4 py-2 text-base font-bold border-b-2 h-[3rem] border-transparent text-gray-800 hover:bg-blue-50 hover:border-blue-500"
              >
                <Star size={20} className="mr-2 fill-yellow-500 text-yellow-500" />
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
                    'flex items-center justify-center px-4 py-2 text-base font-bold border-b-2 h-[3rem] relative',
                    isActive
                      ? 'border-blue-500 text-gray-900 bg-gradient-to-b from-blue-100 to-blue-50'
                      : 'border-transparent text-gray-800 hover:bg-gradient-to-b hover:from-blue-50 hover:to-white hover:border-blue-400'
                  )}
                >
                  <Icon size={20} className="mr-2" />
                  {item.name}
                  {isFav && (
                    <Star size={16} className="ml-2 fill-yellow-500 text-yellow-500" />
                  )}
                </Link>
              )
            })}
          </div>


          {/* Mobile Menu Button - Extra large for easy clicking */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-lg text-black hover:bg-gray-200 min-w-[3rem] min-h-[3rem] border-2 border-gray-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu - Large, clear buttons */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-gray-400 py-4">
            <div className="flex flex-col space-y-2">
              {user ? (
                <div className="px-4 py-3 bg-blue-50 border-2 border-blue-400 rounded-lg mb-2">
                  <p className="text-sm text-gray-700 font-semibold mb-2">Signed in as: {user.name}</p>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-3 text-base font-bold border-2 border-red-400 text-red-600 hover:bg-red-50 rounded-lg min-h-[3rem]"
                  >
                    <LogOut size={20} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-base font-bold border-2 border-blue-400 text-blue-600 hover:bg-blue-50 rounded-lg min-h-[3rem] bg-white"
                >
                  <LogIn size={20} className="mr-2" />
                  Sign In
                </Link>
              )}
              {favorites.length > 0 && (
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-base font-bold min-h-[3rem] border-2 border-transparent text-gray-800 hover:bg-blue-50 hover:border-blue-500 bg-white"
                >
                  <Star size={20} className="mr-3 fill-yellow-500 text-yellow-500" />
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
                      'flex items-center px-4 py-3 rounded-lg text-base font-bold min-h-[3rem] border-2 bg-white',
                      isActive
                        ? 'bg-blue-100 text-gray-900 border-blue-500'
                        : 'text-gray-800 hover:bg-gray-100 border-gray-400'
                    )}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.name}
                    {isFav && (
                      <Star size={16} className="ml-2 fill-yellow-500 text-yellow-500" />
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

