import { TIER_COLORS } from '@/lib/constants'

export default function EventCard({ event }) {
    return (
        <div className="rounded-2xl shadow-lg p-1 mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-dark bg-opacity-95 rounded-2xl p-5 flex flex-col gap-2">
                

                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-black bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700">
                        {event.title}
                    </h3>
                    <span className="px-3 py-1 rounded text-white text-sm font-semibold shadow bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 capitalize">
                        {event.tier}
                    </span>
                </div>
                <p className="text-gray-700">{event.description}</p>
                <p className="text-xs text-black"><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}
