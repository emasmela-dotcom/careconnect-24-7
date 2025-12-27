'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogIn, Mail, Lock, Heart } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Sign in failed' }))
        throw new Error(errorData.error || 'Sign in failed')
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
      console.error('Sign in error:', err)
      setError(err.message || 'Failed to sign in')
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
          <p className="text-lg text-gray-700">Sign in to your account</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white border-4 border-blue-300 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="bg-green-50 border-4 border-green-400 text-green-800 p-4 rounded-xl text-center font-semibold">
                ✓ Signed in! Redirecting...
              </div>
            )}
            {error && (
              <div className="bg-red-50 border-4 border-red-400 text-red-800 p-4 rounded-xl text-center font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold border-4 border-blue-700 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn size={24} className="mr-3" />
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <div>
              <Link
                href="/auth/forgot-password"
                className="text-blue-600 hover:text-blue-700 font-semibold text-base underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div>
              <p className="text-gray-700 mb-2">Don't have an account?</p>
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

