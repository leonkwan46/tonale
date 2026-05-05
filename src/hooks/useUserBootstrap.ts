import { auth } from '@/config/firebase/firebase'
import { useUserStore } from '@/stores/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Platform } from 'react-native'

export const useUserBootstrap = () => {
  useEffect(() => {
    const authTimeout = setTimeout(() => {
      if (useUserStore.getState().loading) {
        console.warn(`Authentication still loading after 10 seconds on ${Platform.OS}`)
      }
    }, 10000)

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        const {
          fetchUserData,
          setAuthUser,
          setLoading,
          setUserDataStatus,
          setUserData,
          setSkipNextFetch,
          skipNextFetch
        } = useUserStore.getState()

        if (firebaseUser) {
          // Consume the one-shot skip flag set by the registration flow.
          if (skipNextFetch) setSkipNextFetch(false)

          try {
            await firebaseUser.getIdToken(true)
            if (skipNextFetch) {
              // We're mid-registration; createUserData will populate userData via
              // setUserData. Pre-set 'not-found' so a failed createUserData still
              // routes to onboarding instead of stalling on 'loading'.
              setUserDataStatus('not-found')
            } else {
              await fetchUserData()
            }
          } catch {
            setUserDataStatus('error')
          }
          // Set authUser only after user data has been fetched, so screens
          // guarded by authUser don't render before profile data arrives.
          setAuthUser(firebaseUser)
          clearTimeout(authTimeout)
          setLoading(false)
        } else {
          setAuthUser(null)
          setUserData(null)
          setSkipNextFetch(false)
          clearTimeout(authTimeout)
          setLoading(false)
        }
      },
      (error) => {
        console.error(`❌ Authentication error on ${Platform.OS}:`, error)
        const { setAuthUser, setUserData, setLoading, setSkipNextFetch } =
          useUserStore.getState()
        clearTimeout(authTimeout)
        setAuthUser(null)
        setUserData(null)
        setSkipNextFetch(false)
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(authTimeout)
      unsubscribe()
    }
  }, [])
}
