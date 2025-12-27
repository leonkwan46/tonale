import { getUserData } from '@/config/firebase/functions'
import { isFirebaseError, type UserProfile } from '@types'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { auth } from '../config/firebase/firebase'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface UserContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  fetchProfile: () => Promise<UserProfile | null>
  setProfile: (profile: UserProfile | null) => void
  setIsRegistering: (isRegistering: boolean) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

// ============================================================================
// USER PROVIDER COMPONENT
// ============================================================================

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  // Track if this is the first auth state change (app start/restore)
  // This helps distinguish between app restart vs active session registration
  const isFirstAuthStateChange = useRef(true)
  // Track if registration is in progress to prevent wasted fetchProfile calls
  const isRegisteringRef = useRef(false)

  const fetchProfile = async (): Promise<UserProfile | null> => {
    try {
      const result = await getUserData()
      const profileData = result.data.data
      setProfile(profileData)
      return profileData
    } catch (error) {
      if (isFirebaseError(error) && error.code === 'not-found') {
        // "not-found" is expected for new users who haven't completed onboarding yet
        // Set profile to null, which will trigger onboarding flow
        setProfile(null)
        return null
      } else {
        // Log actual errors (network issues, permissions, etc.)
        console.error('[fetchProfile] Error fetching user profile:', error)
        setProfile(null)
        return null
      }
    }
  }

  const handleOnboardingCheck = async (
    profileData: UserProfile | null,
    isFirstAuthStateChange: React.MutableRefObject<boolean>
  ): Promise<boolean> => {
    if (!isFirstAuthStateChange.current) return true

    // If profile exists but onboarding is incomplete, this means they started onboarding
    // before but didn't finish. On app restart, sign them out to prevent auto-login.
    // If profile doesn't exist, this is a new registration - allow onboarding flow.
    if (profileData && profileData.onboardingCompleted !== true) {
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
      async (authUser) => {
        if (authUser) {
          await authUser.getIdToken(true)
          // Skip fetchProfile during registration to avoid wasted call before user document exists
          // handleRegister sets profile directly from createUserData response
          let profileData = profile
          if (profileData === null && !isRegisteringRef.current) {
            profileData = await fetchProfile()
          }
          const shouldAllowAuth = await handleOnboardingCheck(profileData, isFirstAuthStateChange)
          if (!shouldAllowAuth) return
          isFirstAuthStateChange.current = false
          setUser(authUser)
          
          clearTimeout(authTimeout)
          setLoading(false)
        } else {
          isFirstAuthStateChange.current = true
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

  const setIsRegistering = useCallback((isRegistering: boolean) => {
    isRegisteringRef.current = isRegistering
  }, [])

  return (
    <UserContext.Provider value={{ user, profile, loading, fetchProfile, setProfile, setIsRegistering }}>
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

