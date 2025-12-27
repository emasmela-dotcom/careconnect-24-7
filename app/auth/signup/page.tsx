'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, Mail, Lock, User, Heart } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Sign up failed' }))
        throw new Error(errorData.error || 'Sign up failed')
      }

      const data = await response.json()

      // Verify we got user data
      if (!data.user || !data.token) {
        throw new Error('Invalid response from server')
      }

      // Store session
      if (typeof window !== 'undefined') {
        localStorage.setItem('careconnect-user', JSON.stringify(data.user))
        localStorage.setItem('careconnect-token', data.token)
        
        // Show success message briefly
        setSuccess(true)
        setLoading(false)
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      }
    } catch (err: any) {
      console.error('Sign up error:', err)
      setError(err.message || 'Failed to create account')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="text-red-600" size={48} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CareConnect 24/7
            </h1>
          </div>
          <p className="text-lg text-gray-700">Create your account</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white border-4 border-blue-300 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="bg-green-50 border-4 border-green-400 text-green-800 p-4 rounded-xl text-center font-semibold">
                ✓ Account created! Redirecting...
              </div>
            )}
            {error && (
              <div className="bg-red-50 border-4 border-red-400 text-red-800 p-4 rounded-xl text-center font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-4 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-4 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold border-4 border-blue-700 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus size={24} className="mr-3" />
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-2">Already have an account?</p>
            <Link
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

