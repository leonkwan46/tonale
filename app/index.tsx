import { useUser } from '@/hooks'
import { Redirect } from 'expo-router'

const Index = () => {
  const { authUser, userData, loading, cachedOnboardingCompleted } = useUser()

  if (loading) return null

  if (authUser) {
    if (userData?.onboardingCompleted === true) {
      return <Redirect href="/(tabs)" />
    }
    if (userData && userData.onboardingCompleted === false) {
      return <Redirect href="/onboarding" />
    }

    if (cachedOnboardingCompleted === true) {
      return <Redirect href="/(tabs)" />
    }
    return <Redirect href="/onboarding" />
  } else {
    return <Redirect href="/(auth)" />
  }
}

export default Index

