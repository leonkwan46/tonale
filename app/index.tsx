import { useUser } from '@/hooks'
import { Redirect } from 'expo-router'

export default function Index() {
  const { user, loading } = useUser()
  
  // While loading, return nothing
  if (loading) return null
  
  // Redirect based on authentication state
  if (user) {
    return <Redirect href="/(tabs)" />
  } else {
    return <Redirect href="/(auth)" />
  }
}

