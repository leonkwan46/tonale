import { useUser } from '@/hooks'
import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function AuthLayout() {
  const { authUser, userData, loading } = useUser()
  const router = useRouter()
  
  // Use an effect for navigation
  useEffect(() => {
    if (authUser && !loading) {
      // Check onboarding status before redirecting
      if (userData?.onboardingCompleted === true) {
        router.replace('../(tabs)')
      } else {
        // userData doesn't exist or onboarding not completed
        router.replace('../onboarding')
      }
    }
  }, [authUser, userData, loading, router])
  
  // While loading, return nothing
  if (loading) return null
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}


