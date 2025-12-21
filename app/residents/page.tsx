import Link from 'next/link'
import { Plus, Search, Filter } from 'lucide-react'

export default function ResidentsPage() {
  // Mock data - replace with actual data fetching
  const residents = []

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-black mb-3">Residents</h1>
          <p className="text-xl text-gray-800">Manage resident profiles and information</p>
        </div>
        <Link
          href="/residents/new"
          className="flex items-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem]"
        >
          <Plus size={24} className="mr-3" />
          Add New Resident
        </Link>
      </div>

      {/* Search and Filter - Large inputs */}
      <div className="bg-white border-2 border-gray-300 p-6 mb-10 shadow-sm">
        <div className="flex gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={24} />
            <input
              type="text"
              placeholder="Search residents by name, room number, or ID..."
              className="w-full pl-14 pr-6 py-4 text-lg border-2 border-gray-400 focus:ring-4 focus:ring-blue-200 focus:border-blue-700"
            />
          </div>
          <button className="flex items-center px-8 py-4 text-lg font-semibold border-2 border-gray-400 hover:bg-gray-100 min-h-[3.5rem]">
            <Filter size={24} className="mr-3" />
            Filter
          </button>
        </div>
      </div>

      {/* Residents List */}
      {residents.length === 0 ? (
        <div className="bg-white border-2 border-gray-300 p-16 text-center shadow-sm">
          <div className="text-gray-600 mb-6">
            <svg
              className="mx-auto h-20 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-black mb-4">No residents yet</h3>
          <p className="text-xl text-gray-800 mb-8">Get started by adding your first resident.</p>
          <Link
            href="/residents/new"
            className="inline-flex items-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem]"
          >
            <Plus size={24} className="mr-3" />
            Add New Resident
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Resident cards will be rendered here */}
        </div>
      )}
    </div>
  )
}

