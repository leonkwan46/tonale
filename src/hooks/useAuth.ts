import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { auth } from '../config/firebaseAuth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const initialized = useRef(false)
  const startTime = useRef<number>(Date.now())

  useEffect(() => {
    console.log(`🔥 Firebase Auth: Starting authentication check on ${Platform.OS}...`)
    startTime.current = Date.now()

    // Add a timeout to detect extremely slow auth responses
    const authTimeout = setTimeout(() => {
      if (loading) {
        console.warn(`⚠️ Firebase Auth: Still loading after 10 seconds on ${Platform.OS}. This might indicate a network or configuration issue.`)
      }
    }, 10000)

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const elapsedTime = Date.now() - startTime.current
      
      if (!initialized.current) {
        console.log(`🔥 Firebase Auth: Initial state received in ${elapsedTime}ms on ${Platform.OS}`)
        initialized.current = true
      }
      
      if (user) {
        console.log(`✅ User authenticated in ${elapsedTime}ms:`, user.email || user.uid)
      } else {
        console.log(`🔒 No user authenticated (${elapsedTime}ms)`)
      }
      
      clearTimeout(authTimeout)
      setUser(user)
      setLoading(false)
    }, (error) => {
      const elapsedTime = Date.now() - startTime.current
      console.error(`❌ Authentication error after ${elapsedTime}ms on ${Platform.OS}:`, error)
      clearTimeout(authTimeout)
      setUser(null)
      setLoading(false)
    })

    return () => {
      clearTimeout(authTimeout)
      unsubscribe()
    }
  }, [loading])

  return { user, loading }
}



