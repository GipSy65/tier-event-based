'use client'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function AuthCallback() {
    const { isLoaded, user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded) {
            if (user) {
                router.replace('/dashboard')
            } else {
                router.replace('/auth/login')
            }
        }
    }, [isLoaded, user, router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">Logging you in...</p>
        </div>
    )
}
