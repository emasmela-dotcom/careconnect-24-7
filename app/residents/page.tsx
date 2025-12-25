import Link from 'next/link'
import { Plus, User } from 'lucide-react'

export default function MyProfilePage() {
  // User's own profile - for active boomers managing their own health
  const hasProfile = false

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
          {/* Profile information will be displayed here */}
          <p className="text-lg text-gray-700">Your profile information will appear here.</p>
        </div>
      )}
    </div>
  )
}
