'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Heart, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(errorData.error || 'Failed to send reset email')
      }

      const data = await response.json()
      
      // In development, if email failed, show the reset link on the page
      if (data.debugLink) {
        setSuccess(true)
        setError('Email sending failed, but here is your reset link: ' + data.debugLink)
      } else {
        setSuccess(true)
      }
    } catch (err: any) {
      console.error('Forgot password error:', err)
      setError(err.message || 'Failed to send reset email')
    } finally {
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
          <p className="text-lg text-gray-700">Reset your password</p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white border-4 border-blue-300 rounded-2xl shadow-xl p-8">
          {success ? (
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
              <p className="text-lg text-gray-700 mb-6">
                If an account exists with <strong>{email}</strong>, we've sent password reset instructions.
              </p>
              {error && error.includes('reset link') && (
                <div className="bg-yellow-50 border-4 border-yellow-400 text-yellow-900 p-4 rounded-xl mb-6 text-left">
                  <p className="font-bold mb-2">Email sending failed. Use this link instead:</p>
                  <a 
                    href={error.split('reset link: ')[1]} 
                    className="text-blue-600 underline break-all text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {error.split('reset link: ')[1]}
                  </a>
                </div>
              )}
              <p className="text-sm text-gray-600 mb-6">
                Please check your email (and spam folder) and follow the link to reset your password.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                💡 <strong>Tip:</strong> Check the terminal/console where your server is running - the reset link is also printed there!
              </p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-bold border-4 border-blue-700 hover:bg-blue-700 rounded-xl shadow-lg transition-all"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <p className="text-base text-gray-700 mb-6 text-center">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold border-4 border-blue-700 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transform hover:scale-105 transition-all min-h-[4rem] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail size={24} className="mr-3" />
                  {loading ? 'Sending...' : 'Send Reset Instructions'}
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}


