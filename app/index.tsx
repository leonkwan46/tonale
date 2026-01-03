import { useUser } from '@/hooks'
import { Redirect } from 'expo-router'

export default function Index() {
  const { user, profile, loading } = useUser()

  if (loading) return null

  if (user) {
    if (profile?.onboardingCompleted === true) {
      return <Redirect href="/(tabs)" />
    } else {
      return <Redirect href="/onboarding" />
    }
  } else {
    return <Redirect href="/(auth)" />
  }
}

