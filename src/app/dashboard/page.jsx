'use client'
import { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { TIER_COLORS } from '@/lib/constants'

export default function Dashboard() {
    const { user, isLoaded } = useUser()
    const { signOut } = useAuth()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchOrCreateProfile() {
            if (!user) {
                setLoading(false)
                return
            }

            try {
                // Try to fetch existing profile
                const { data, error } = await supabase
                    .from('profiles')
                    .select('tier, email')
                    .eq('id', user.id)
                    .single()

                if (error && error.code === 'PGRST116') {
                    // No profile found, create one
                    const { error: insertError } = await supabase
                        .from('profiles')
                        .insert({
                            id: user.id,
                            tier: 'Free',
                            email: user.primaryEmailAddress?.emailAddress || ''
                        })

                    if (insertError) {
                        setError('Failed to create profile')
                    } else {
                        setProfile({ tier: 'Free' })
                    }
                } else if (error) {
                    setError('Failed to load profile')
                } else {
                    setProfile(data)
                }
            } catch (err) {
                setError('Unexpected error')
            }
            setLoading(false)
        }

        fetchOrCreateProfile()
    }, [user])

    if (!isLoaded || loading) {
        return (
            <div className="p-8 text-center text-gray-700">
                Loading profile...
            </div>
        )
    }

    if (!user) {
        return (
            <div className="p-8 text-center text-gray-800">
                Please <Link href="/auth/login" className="text-blue-600 underline">log in</Link> to view your dashboard.
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto mt-12 rounded-2xl p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <div className="bg-white bg-opacity-95 rounded-2xl p-6">
                <h1 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700">
                    Dashboard
                </h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        Error: {error}
                    </div>
                )}

                <p className="mb-2 text-black">
                    Welcome: <span className="font-semibold">{user.fullName || user.primaryEmailAddress?.emailAddress}</span>
                </p>

                <p className="mb-6 text-black">
                    Your Tier:{' '}
                    <span className={`ml-2 inline-block px-3 py-1 rounded text-white font-semibold ${TIER_COLORS[profile?.tier || 'Free']}`}>
                        {profile?.tier || 'Free'}
                    </span>
                </p>

                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/events"
                        className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition-all text-center"
                    >
                        View Events
                    </Link>

                    <button
                        onClick={() => signOut()}
                        className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
