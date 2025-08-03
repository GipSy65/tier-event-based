'use client'
import { useAuth } from '@/contexts/AuthContext'

export default function LogoutButton() {
    const { signOut } = useAuth()

    return (
        <button
            onClick={() => signOut()}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
            Logout
        </button>
    )
}
