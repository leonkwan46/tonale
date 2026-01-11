import { getUserData } from '@/config/firebase/functions'
import { isFirebaseError, type UserData } from '@types'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { auth } from '../config/firebase/firebase'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface UserContextType {
  authUser: User | null
  userData: UserData | null
  loading: boolean
  fetchUserData: () => Promise<UserData | null>
  setUserData: (userData: UserData | null) => void
  setIsRegistering: (isRegistering: boolean) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

// ============================================================================
// USER PROVIDER COMPONENT
// ============================================================================

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  // Track if this is the first auth state change (app start/restore)
  // This helps distinguish between app restart vs active session registration
  const isFirstAuthStateChange = useRef(true)
  // Track if registration is in progress to prevent wasted fetchUserData calls
  const isRegisteringRef = useRef(false)

  const fetchUserData = async (): Promise<UserData | null> => {
    try {
      const result = await getUserData()
      const profileData = result.data.data
      setUserData(profileData)
      return profileData
    } catch (error) {
      if (isFirebaseError(error) && error.code === 'not-found') {
        // "not-found" is expected for new users who haven't completed onboarding yet
        // Set userData to null, which will trigger onboarding flow
        setUserData(null)
        return null
      } else {
        // Log actual errors (network issues, permissions, etc.)
        console.error('[fetchUserData] Error fetching user data:', error)
        setUserData(null)
        return null
      }
    }
  }

  const handleOnboardingCheck = async (
    userData: UserData | null,
    isFirstAuthStateChange: React.MutableRefObject<boolean>
  ): Promise<boolean> => {
    if (!isFirstAuthStateChange.current) return true

    // If userData exists but onboarding is incomplete, this means they started onboarding
    // before but didn't finish. On app restart, sign them out to prevent auto-login.
    // If userData doesn't exist, this is a new registration - allow onboarding flow.
    if (userData && userData.onboardingCompleted !== true) {
      await signOut(auth)
      isFirstAuthStateChange.current = false
      return false
    }

    return true
  }

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
          await firebaseUser.getIdToken(true)
          // Skip fetchUserData during registration to avoid wasted call before user document exists
          // handleRegister sets userData directly from createUserData response
          let fetchedUserData = userData
          if (fetchedUserData === null && !isRegisteringRef.current) {
            fetchedUserData = await fetchUserData()
          }
          const shouldAllowAuth = await handleOnboardingCheck(fetchedUserData, isFirstAuthStateChange)
          if (!shouldAllowAuth) return
          isFirstAuthStateChange.current = false
          setAuthUser(firebaseUser)
          
          clearTimeout(authTimeout)
          setLoading(false)
        } else {
          isFirstAuthStateChange.current = true
          setAuthUser(null)
          setUserData(null)
          clearTimeout(authTimeout)
          setLoading(false)
        }
      },
      (error) => {
        console.error(`❌ Authentication error on ${Platform.OS}:`, error)
        clearTimeout(authTimeout)
        setAuthUser(null)
        setUserData(null)
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(authTimeout)
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setIsRegistering = useCallback((isRegistering: boolean) => {
    isRegisteringRef.current = isRegistering
  }, [])

  return (
    <UserContext.Provider value={{ authUser, userData, loading, fetchUserData, setUserData, setIsRegistering }}>
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

