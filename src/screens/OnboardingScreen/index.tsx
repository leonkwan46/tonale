import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useAuthRoute, useUser } from '@/hooks'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { OnboardingBody } from './OnboardingBody'

export const OnboardingScreen = () => {
  const route = useAuthRoute()
  const router = useRouter()
  const { authUser, setUserData } = useUser()

  useEffect(() => {
    if (route === 'auth') router.replace('/(auth)')
    else if (route === 'app') router.replace('/(app)/(tabs)')
  }, [route, router])

  if (route !== 'onboarding') return null

  return (
    <ScreenContainer includeBottomPadding>
      <OnboardingBody authUser={authUser} setUserData={setUserData} />
    </ScreenContainer>
  )
}
