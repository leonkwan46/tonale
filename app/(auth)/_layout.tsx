import { useAuthRoute } from '@/hooks'
import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

const AuthLayout = () => {
  const route = useAuthRoute()
  const router = useRouter()

  useEffect(() => {
    if (route === 'app') router.replace('../(tabs)')
    else if (route === 'onboarding') router.replace('../onboarding')
  }, [route, router])

  if (route === 'loading') return null

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default AuthLayout
