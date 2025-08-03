'use client'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden pt-0">
      <div className="max-w-2xl mx-auto text-center rounded-2xl p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-xl">
        <div className="bg-white bg-opacity-95 rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700">
            Welcome to Tier-Based Events
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover exclusive events tailored to your membership tier. Join today and unlock access to premium experiences!
          </p>

          {user ? (
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-8 py-4 rounded-lg shadow-lg hover:opacity-90 transition-all text-lg font-semibold"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/events"
                className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:opacity-90 transition-all text-lg font-semibold"
              >
                View Events
              </Link>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-8 py-4 rounded-lg shadow-lg hover:opacity-90 transition-all text-lg font-semibold"
            >
              Get Started - Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
