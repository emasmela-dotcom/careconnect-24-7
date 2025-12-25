import Link from 'next/link'
import { Plus, Heart, Users } from 'lucide-react'

export default function MyCareTeamPage() {
  // Care team = family members, helpers, people who help the active boomer
  const careTeam = []

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-black mb-3">My Care Team</h1>
          <p className="text-xl text-gray-800">Manage your family members, helpers, and people who care for you</p>
        </div>
        <Link
          href="/caregivers/new"
          className="flex items-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem]"
        >
          <Plus size={24} className="mr-3" />
          Add to Care Team
        </Link>
      </div>

      {/* Care Team List */}
      {careTeam.length === 0 ? (
        <div className="bg-white border-2 border-gray-300 p-16 text-center shadow-sm">
          <div className="text-gray-600 mb-6">
            <Heart size={80} className="mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold text-black mb-4">No care team members yet</h3>
          <p className="text-xl text-gray-800 mb-8">Add family members, helpers, or people who help care for you.</p>
          <Link
            href="/caregivers/new"
            className="inline-flex items-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold border-2 border-blue-800 hover:bg-blue-800 min-h-[3.5rem]"
          >
            <Plus size={24} className="mr-3" />
            Add to Care Team
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Care team member cards will be rendered here */}
        </div>
      )}
    </div>
  )
}
