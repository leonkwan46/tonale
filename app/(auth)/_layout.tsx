import { useUser } from '@/hooks'
import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function AuthLayout() {
  const { user, loading } = useUser()
  const router = useRouter()
  
  // Use an effect for navigation
  useEffect(() => {
    if (user && !loading) {
      // Navigate programmatically instead of using Redirect
      router.replace('../(tabs)')
    }
  }, [user, loading, router])
  
  // While loading, return nothing
  if (loading) return null
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}


