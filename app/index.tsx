import { useAuthRoute } from '@/hooks'
import { Redirect } from 'expo-router'

const Index = () => {
  const route = useAuthRoute()
  if (route === 'loading') return null
  if (route === 'auth') return <Redirect href="/(auth)" />
  if (route === 'onboarding') return <Redirect href="/onboarding" />
  return <Redirect href="/(app)/(tabs)" />
}

export default Index
