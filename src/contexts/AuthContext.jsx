'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getSession() {
            const { data } = await supabase.auth.getSession()
            setUser(data.session?.user ?? null)
            setLoading(false)
        }
        getSession()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setProfile(null)
            return
        }

        const fetchProfile = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('profiles')
                .select('tier, id, email')
                .eq('id', user.id)
                .single()
            if (error) {
                console.error('Error fetching profile:', error)
                setProfile(null)
            } else {
                setProfile(data)
            }
            setLoading(false)
        }

        fetchProfile()
    }, [user])

    const signOut = () => supabase.auth.signOut()

    return (
        <AuthContext.Provider value={{ user, profile, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
