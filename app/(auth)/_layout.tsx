import { useUser } from '@/hooks'
import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function AuthLayout() {
  const { user, profile, loading } = useUser()
  const router = useRouter()
  
  // Use an effect for navigation
  useEffect(() => {
    if (user && !loading) {
      // Check onboarding status before redirecting
      if (profile?.onboardingCompleted === true) {
        router.replace('../(tabs)')
      } else {
        // Profile doesn't exist or onboarding not completed
        router.replace('../onboarding')
      }
    }
  }, [user, profile, loading, router])
  
  // While loading, return nothing
  if (loading) return null
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}


