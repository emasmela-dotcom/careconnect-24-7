'use client'

import Link from 'next/link'
import { Plus, User } from 'lucide-react'
import { useData } from '@/components/DataContextAPI'

export default function MyProfilePage() {
  // User's own profile - for active boomers managing their own health
  const { residents, loading } = useData()
  const hasProfile = residents.length > 0
  const profile = residents[0] // Use first resident as the user's profile

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-black mb-3">My Profile</h1>
          <p className="text-xl text-gray-800">Manage your personal information and emergency contacts</p>
        </div>
        {!hasProfile && (
          <Link
            href="/residents/new"
            className="flex items-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem]"
          >
            <Plus size={24} className="mr-3" />
            Set Up My Profile
          </Link>
        )}
      </div>

      {/* Profile Section */}
      {!hasProfile ? (
        <div className="bg-white border-2 border-gray-300 p-16 text-center shadow-sm">
          <div className="text-gray-600 mb-6">
            <User size={80} className="mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold text-black mb-4">Set Up Your Profile</h3>
          <p className="text-xl text-gray-800 mb-8">Add your personal information, emergency contacts, and health details to get started.</p>
          <Link
            href="/residents/new"
            className="inline-flex items-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem]"
          >
            <Plus size={24} className="mr-3" />
            Create My Profile
          </Link>
        </div>
      ) : (
        <div className="bg-white border-2 border-gray-300 p-8 shadow-sm">
          {loading ? (
            <p className="text-lg text-gray-700">Loading...</p>
          ) : profile ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">{profile.name}</h2>
                {profile.dateOfBirth && (
                  <p className="text-lg text-gray-700"><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
                )}
                {profile.phone && (
                  <p className="text-lg text-gray-700"><strong>Phone:</strong> {profile.phone}</p>
                )}
                {profile.email && (
                  <p className="text-lg text-gray-700"><strong>Email:</strong> {profile.email}</p>
                )}
                {profile.emergencyContact && (
                  <p className="text-lg text-gray-700"><strong>Emergency Contact:</strong> {profile.emergencyContact}</p>
                )}
                {profile.medicalConditions && (
                  <p className="text-lg text-gray-700"><strong>Medical Conditions:</strong> {profile.medicalConditions}</p>
                )}
                {profile.allergies && (
                  <p className="text-lg text-gray-700"><strong>Allergies:</strong> {profile.allergies}</p>
                )}
                {profile.notes && (
                  <p className="text-lg text-gray-700"><strong>Notes:</strong> {profile.notes}</p>
                )}
              </div>
              <Link
                href={`/residents/${profile.id}/edit`}
                className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-semibold border-2 border-blue-800 hover:bg-blue-800"
              >
                Edit Profile
              </Link>
            </div>
          ) : (
            <p className="text-lg text-gray-700">No profile found.</p>
          )}
        </div>
      )}
    </div>
  )
}
