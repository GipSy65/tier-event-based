'use client'
import Link from 'next/link'
import { useUser, useAuth } from '@clerk/nextjs'

export default function Navbar() {
    const { user } = useUser()
    const { signOut } = useAuth()

    return (
        <nav className="fixed top-0 left-0 w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 shadow-xl z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/">
                    <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-pink-200 select-none">
                        Tier-Based Events
                    </span>
                </Link>
                <div>
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="mr-3 py-1 px-5 "
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="mr-3 py-1 px-5"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="py-2 px-5 rounded-lg font-semibold text-white bg-gradient-to-r from-white/25 via-purple-200/30 to-blue-300/20 hover:bg-white hover:text-blue-800 shadow-md transition-all"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
