'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Lock, Heart, CheckCircle, ArrowLeft } from 'lucide-react'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token')
    }
  }, [token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!token) {
      setError('Invalid reset token')
      return
    }

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
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Reset failed' }))
        throw new Error(errorData.error || 'Failed to reset password')
      }

      setSuccess(true)
      
      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push('/auth/signin')
      }, 3000)
    } catch (err: any) {
      console.error('Reset password error:', err)
      setError(err.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white border-4 border-green-300 rounded-2xl shadow-xl p-8 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successful!</h2>
            <p className="text-lg text-gray-700 mb-6">
              Your password has been reset. You can now sign in with your new password.
            </p>
            <p className="text-sm text-gray-600 mb-6">Redirecting to sign in page...</p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-bold border-4 border-blue-700 hover:bg-blue-700 rounded-xl shadow-lg transition-all"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
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
          <p className="text-lg text-gray-700">Reset your password</p>
        </div>

        {/* Reset Password Form */}
        <div className="bg-white border-4 border-blue-300 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-4 border-red-400 text-red-800 p-4 rounded-xl text-center font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                New Password
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
                Confirm New Password
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
              disabled={loading || !token}
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold border-4 border-blue-700 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock size={24} className="mr-3" />
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}

