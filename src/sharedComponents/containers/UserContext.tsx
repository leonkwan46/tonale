import { getUserData } from '@/config/firebase/functions'
import { initializeUserProgress } from '@/data/theoryData/theoryDataHelpers'
import { isFirebaseError, type UserProfile } from '@types'
import { onAuthStateChanged, User } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { auth } from '../../config/firebase/firebase'

export interface UserContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  fetchProfile: () => Promise<void>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      const result = await getUserData()
      setProfile(result.data.data)
    } catch (error) {
      if (isFirebaseError(error) && error.code === 'not-found') {
        setProfile(null)
      } else {
        console.error('Error fetching user profile:', error)
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
      async (user) => {
        if (user) {
          setUser(user)

          // Fetch profile for existing users (not brand new registrations)
          const metadata = user.metadata
          const isNewUser = metadata.creationTime === metadata.lastSignInTime

          if (!isNewUser) {
            // Existing user logging in - fetch their profile
            await fetchProfile()
          }
          
          // Initialize lesson progress for ALL users (new and existing)
          // New users will have empty progress, existing users will load their data
          try {
            await initializeUserProgress(user.uid)
            console.log('✅ Lesson progress initialized for user:', user.uid)
          } catch (error) {
            console.error('❌ Failed to initialize lesson progress:', error)
          }
        } else {
          setUser(null)
          setProfile(null)
        }

        clearTimeout(authTimeout)
        setLoading(false)
      },
      (error) => {
        console.error(`Authentication error on ${Platform.OS}:`, error)
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

