import { getUserData } from '@/config/firebase/functions'
import { isFirebaseError, type UserData } from '@types'
import { onAuthStateChanged, User } from 'firebase/auth'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import { auth } from '../config/firebase/firebase'

// ============================================================================
// TYPES
// ============================================================================

export type UserDataStatus = 'idle' | 'not-found' | 'found' | 'error'

// The canonical route the user should be on, derived from auth + profile state.
// Consume via useAuthRoute() — never re-derive this logic in individual screens.
export type AuthRoute = 'loading' | 'auth' | 'onboarding' | 'app'

export interface UserContextType {
  authUser: User | null
  userData: UserData | null
  userDataStatus: UserDataStatus
  loading: boolean
  fetchUserData: () => Promise<UserData | null>
  setUserData: (userData: UserData | null) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

// ============================================================================
// USER PROVIDER
// ============================================================================

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [userDataStatus, setUserDataStatus] = useState<UserDataStatus>('idle')
  const [loading, setLoading] = useState(true)

  const fetchUserData = useCallback(async (): Promise<UserData | null> => {
    try {
      const result = await getUserData()
      const profileData = result.data.data
      setUserData(profileData)
      setUserDataStatus('found')
      return profileData
    } catch (error) {
      if (isFirebaseError(error) && error.code === 'not-found') {
        setUserData(null)
        setUserDataStatus('not-found')
        return null
      }
      console.error('[fetchUserData] Error fetching user data:', error)
      setUserData(null)
      setUserDataStatus('error')
      return null
    }
  }, [])

  useEffect(() => {
    const authTimeout = setTimeout(() => {
      if (loading) {
        console.warn(`Authentication still loading after 10 seconds on ${Platform.OS}`)
      }
    }, 10000)

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          try {
            await firebaseUser.getIdToken(true)
            await fetchUserData()
          } catch {
            setUserDataStatus('error')
          }
          setAuthUser(firebaseUser)
          clearTimeout(authTimeout)
          setLoading(false)
        } else {
          setAuthUser(null)
          setUserData(null)
          setUserDataStatus('idle')
          clearTimeout(authTimeout)
          setLoading(false)
        }
      },
      (error) => {
        console.error(`❌ Authentication error on ${Platform.OS}:`, error)
        clearTimeout(authTimeout)
        setAuthUser(null)
        setUserData(null)
        setUserDataStatus('idle')
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(authTimeout)
      unsubscribe()
    }
  }, [fetchUserData])

  // Wraps the raw setter so callers that bypass fetchUserData still update the status
  const setUserDataWithStatus = useCallback((data: UserData | null) => {
    setUserData(data)
    setUserDataStatus(data !== null ? 'found' : 'idle')
  }, [])

  const contextValue = useMemo(
    () => ({ authUser, userData, userDataStatus, loading, fetchUserData, setUserData: setUserDataWithStatus }),
    [authUser, userData, userDataStatus, loading, fetchUserData, setUserDataWithStatus]
  )

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

// ============================================================================
// HOOKS
// ============================================================================

export const useUser = () => {
  return useContext(UserContext)!
}

// Single source of truth for routing decisions.
// index.tsx, (auth)/_layout.tsx, and screen guards all consume this.
export const useAuthRoute = (): AuthRoute => {
  const { authUser, userData, userDataStatus, loading } = useUser()
  if (loading) return 'loading'
  if (!authUser) return 'auth'
  switch (userDataStatus) {
    case 'idle': return 'loading'
    case 'error': return 'auth'
    case 'not-found': return 'onboarding'
    case 'found': return userData?.onboardingCompleted === true ? 'app' : 'onboarding'
  }
}
