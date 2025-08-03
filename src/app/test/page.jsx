'use client'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function TestPage() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchEvents() {
            try {
                const { data, error } = await supabase.from('events').select('*')
                if (error) throw error
                setEvents(data || [])
            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchEvents()
    }, [])

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>
            <p className="mb-6 text-lg">Found <span className="font-semibold text-blue-600">{events.length}</span> events</p>

            <div className="grid gap-4">
                {events.map(event => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.tier_requirement === 'Free' ? 'bg-gray-100 text-gray-800' :
                                    event.tier_requirement === 'Silver' ? 'bg-gray-200 text-gray-800' :
                                        event.tier_requirement === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-purple-100 text-purple-800'
                                }`}>
                                {event.tier_requirement}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">{event.description}</p>
                        <div className="text-sm text-gray-500">
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
