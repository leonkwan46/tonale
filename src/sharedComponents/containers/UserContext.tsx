import { getUserData } from '@/config/firebase/functions'
import { initializeUserProgress } from '@/utils/userProgress'
import { isProgressInitialized } from '@/utils/progress'
import { isFirebaseError, type UserProfile } from '@types'
import { onAuthStateChanged, User } from 'firebase/auth'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { auth } from '../../config/firebase/firebase'

export interface UserContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  progressInitialized: boolean
  fetchProfile: () => Promise<void>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [progressInitialized, setProgressInitialized] = useState(false)
  const initializationInProgressRef = useRef<string | null>(null)

  const fetchProfile = async () => {
    try {
      const result = await getUserData()
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

  const waitForProgressInitialization = async (userId: string, maxWaitTime = 5000): Promise<void> => {
    const startTime = Date.now()
    while (!isProgressInitialized() && Date.now() - startTime < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    if (!isProgressInitialized()) {
      console.warn('Progress initialization did not complete within expected time')
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
        // Cancel previous initialization if user changed
        if (initializationInProgressRef.current && initializationInProgressRef.current !== authUser?.uid) {
          initializationInProgressRef.current = null
        }

        if (authUser) {
          const currentUserId = authUser.uid
          initializationInProgressRef.current = currentUserId
          setUser(authUser)

          // Fetch profile for existing users (not brand new registrations)
          const metadata = authUser.metadata
          const isNewUser = metadata.creationTime === metadata.lastSignInTime

          await authUser.getIdToken(true)

          if (!isNewUser) {
            await fetchProfile()
          }
          
          try {
            await initializeUserProgress(currentUserId)
            // Wait for progress initialization to complete
            // Only wait if this is still the current user (not cancelled by rapid auth change)
            if (initializationInProgressRef.current === currentUserId) {
              await waitForProgressInitialization(currentUserId)
              // Update reactive state
              if (initializationInProgressRef.current === currentUserId) {
                setProgressInitialized(true)
              }
            }
          } catch (error) {
            console.error('Failed to initialize lesson progress:', error)
            // Still proceed even if initialization fails to prevent app from being stuck
            if (initializationInProgressRef.current === currentUserId) {
              setProgressInitialized(true) // Mark as initialized even on error to prevent stuck state
            }
          }
          
          // Only set loading to false if this is still the current user
          if (initializationInProgressRef.current === currentUserId) {
            clearTimeout(authTimeout)
            setLoading(false)
          }
        } else {
          setUser(null)
          setProfile(null)
          setProgressInitialized(false)
          initializationInProgressRef.current = null
          clearTimeout(authTimeout)
          setLoading(false)
        }
      },
      (error) => {
        console.error(`❌ Authentication error on ${Platform.OS}:`, error)
        clearTimeout(authTimeout)
        setUser(null)
        setProfile(null)
        setProgressInitialized(false)
        initializationInProgressRef.current = null
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
    <UserContext.Provider value={{ user, profile, loading, progressInitialized, fetchProfile }}>
      {children}
    </UserContext.Provider>
  )
}

