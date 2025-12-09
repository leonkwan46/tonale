import { getUserData } from '@/config/firebase/functions'
import { isFirebaseError, type UserProfile } from '@types'
import { onAuthStateChanged, User } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { auth } from '../config/firebase/firebase'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface UserContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  fetchProfile: () => Promise<void>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

// ============================================================================
// USER PROVIDER COMPONENT
// ============================================================================

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      const result = await getUserData()
      console.log('[fetchProfile] Response:', JSON.stringify(result.data, null, 2))
      setProfile(result.data.data)
    } catch (error) {
      console.error('[fetchProfile] Error fetching user profile:', error)
      if (isFirebaseError(error) && error.code === 'not-found') {
        console.error('[fetchProfile] User data not found (not-found error)')
        setProfile(null)
      } else {
        console.error('[fetchProfile] Other error:', error)
      }
    }
  }

  useEffect(() => {
    const authTimeout = setTimeout(() => {
      if (loading) {
        console.warn(`Authentication still loading after 10 seconds on ${Platform.OS}`)
      }
    }, 10000)

    const unsubscribe = onAuthStateChanged(
      auth,
      async (authUser) => {
        if (authUser) {
          setUser(authUser)

          // Fetch profile for existing users (not brand new registrations)
          const metadata = authUser.metadata
          const isNewUser = metadata.creationTime === metadata.lastSignInTime

          await authUser.getIdToken(true)

          if (!isNewUser) {
            await fetchProfile()
          }
          
          // Progress initialization is handled by ProgressContext
          
          clearTimeout(authTimeout)
          setLoading(false)
        } else {
          setUser(null)
          setProfile(null)
          clearTimeout(authTimeout)
          setLoading(false)
        }
      },
      (error) => {
        console.error(`❌ Authentication error on ${Platform.OS}:`, error)
        clearTimeout(authTimeout)
        setUser(null)
        setProfile(null)
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(authTimeout)
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider value={{ user, profile, loading, fetchProfile }}>
      {children}
    </UserContext.Provider>
  )
}

// ============================================================================
// HOOK
// ============================================================================

export function useUser() {
  return useContext(UserContext)!
}

