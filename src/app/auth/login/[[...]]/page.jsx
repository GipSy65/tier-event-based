'use client'
import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md p-6 rounded-2xl bg-white bg-opacity-90 shadow-lg">
                <SignIn path="/auth/login" routing="path" />
            </div>
        </div>
    )
}
