import { TIER_HIERARCHY } from './constants'

export function filterEventsByUserTier(events, userTier) {
    const allowedTierLevel = TIER_HIERARCHY[userTier] ?? 0

    return events.filter(event => {
        const eventTierLevel = TIER_HIERARCHY[event.tier] ?? 0
        return eventTierLevel <= allowedTierLevel
    })
}
