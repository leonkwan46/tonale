import { useUser } from '@/hooks'
import { Redirect } from 'expo-router'

export default function Index() {
  const { authUser, userData, loading } = useUser()

  if (loading) return null

  if (authUser) {
    if (userData?.onboardingCompleted === true) {
      return <Redirect href="/(tabs)" />
    } else {
      return <Redirect href="/onboarding" />
    }
  } else {
    return <Redirect href="/(auth)" />
  }
}

