import { useUser } from '@/hooks'
import { Redirect } from 'expo-router'

const Index = () => {
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

export default Index

