import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useAuthRoute } from '@/hooks'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { OnboardingBody } from './OnboardingBody'

export const OnboardingScreen = () => {
  const route = useAuthRoute()
  const router = useRouter()
  const authUser = useUserStore(s => s.authUser)
  const setUserData = useUserStore(s => s.setUserData)

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
