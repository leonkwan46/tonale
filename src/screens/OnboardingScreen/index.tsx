import { useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { OnboardingBody } from './OnboardingBody'
import { ContentContainer } from './OnboardingScreen.styles'

export const OnboardingScreen = () => {
  const router = useRouter()
  const { authUser, userData, loading: userLoading, setUserData } = useUser()

  useEffect(() => {
    if (userLoading) return
    if (!authUser) {
      router.replace('/(auth)')
      return
    }
    if (userData?.onboardingCompleted === true) {
      router.replace('/(tabs)')
    }
  }, [authUser, userData, userLoading, router])

  if (userLoading) {
    return (
      <ScreenContainer>
        <ContentContainer>
          <ActivityIndicator size="large" />
        </ContentContainer>
      </ScreenContainer>
    )
  }

  if (!authUser || userData?.onboardingCompleted === true) return null

  return (
    <ScreenContainer includeBottomPadding>
      <OnboardingBody authUser={authUser} setUserData={setUserData} />
    </ScreenContainer>
  )
}
