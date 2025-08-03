'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useUser } from '@clerk/nextjs'
import { filterEventsByUserTier } from '@/lib/utils'
import EventCard from '@/components/events/EventCard'

export default function EventsPage() {
    const { user, isLoaded } = useUser()
    const [profile, setProfile] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [events, setEvents] = useState([])
    const [loadingEvents, setLoadingEvents] = useState(true)
    const [error, setError] = useState(null)

    // Fetch user profile (tier)
    useEffect(() => {
        async function fetchProfile() {
            if (!user) return
            const { data, error } = await supabase
                .from('profiles')
                .select('tier')
                .eq('id', user.id)
                .single()
            if (error) {
                console.error('Error fetching profile:', error)
                setProfile({ tier: 'Free' }) // Default fallback
            } else {
                setProfile(data)
            }
            setLoadingProfile(false)
        }
        fetchProfile()
    }, [user])

    // Fetch all events
    useEffect(() => {
        async function fetchEvents() {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('event_date', { ascending: true })
            if (error) {
                setError(error.message)
                setEvents([])
            } else {
                setEvents(data)
                setError(null)
            }
            setLoadingEvents(false)
        }
        fetchEvents()
    }, [])

    if (!isLoaded || loadingProfile || loadingEvents) {
        return (
            <div className="p-8 text-center text-gray-700">
                Loading events...
            </div>
        )
    }

    if (!user) {
        return (
            <div className="p-8 text-center text-gray-800">
                Please <a href="/auth/login" className="text-blue-600 underline">log in</a> to view events.
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-8 max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-6 rounded-2xl text-center shadow mb-4">
                    Error loading events: {error}
                </div>
            </div>
        )
    }

    // Filter events by user tier
    const visibleEvents = filterEventsByUserTier(events, profile?.tier || 'Free')

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700">
                Events for your Tier: {profile?.tier || 'Free'}
            </h1>

            {visibleEvents.length === 0 ? (
                <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-6 rounded-2xl text-center shadow mb-4">
                    No events available for your current tier.
                </div>
            ) : (
                <div>
                    {visibleEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    )
}
