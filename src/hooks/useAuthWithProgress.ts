import { clearUserProgress, initializeUserProgress, refreshUserProgress } from '@/data/theoryData'
import { useState } from 'react'

// User type definition
interface User {
  id: string
  email?: string
  name?: string
}

// Example integration with your auth system
export const useAuthWithProgress = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)
  const [isProgressLoaded, setIsProgressLoaded] = useState(false)

  // Handle successful authentication
  const handleAuthSuccess = async (userData: User) => {
    setIsInitializing(true)
    
    try {
      console.log('User authenticated, initializing progress...')
      
      // Initialize user progress data
      await initializeUserProgress(userData.id)
      
      setUser(userData)
      setIsProgressLoaded(true)
      
      console.log('User progress initialized successfully')
    } catch (error) {
      console.error('Failed to initialize user progress:', error)
      // Still set user but mark progress as failed
      setUser(userData)
      setIsProgressLoaded(false)
    } finally {
      setIsInitializing(false)
    }
  }

  // Smart refresh progress when needed
  const refreshProgress = async () => {
    if (user) {
      await refreshUserProgress(user.id)
    }
  }

  // Logout handler
  const handleLogout = () => {
    clearUserProgress() // Clear cached progress data
    setUser(null)
    setIsProgressLoaded(false)
  }

  return {
    user,
    isInitializing,
    isProgressLoaded,
    handleAuthSuccess,
    refreshProgress,
    handleLogout
  }
}

// Usage example in your auth flow:
/*
const { 
  user, 
  isInitializing, 
  isProgressLoaded, 
  handleAuthSuccess 
} = useAuthWithProgress()

// In your login success handler
const onLoginSuccess = (userData) => {
  handleAuthSuccess(userData)
}

// Show loading during initialization
if (isInitializing) {
  return <LoadingScreen message="Loading your progress..." />
}

// Navigate to app once ready
if (user && isProgressLoaded) {
  router.replace('/(tabs)')
}
*/
