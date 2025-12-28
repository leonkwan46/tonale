import { useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { OnboardingBody } from './OnboardingBody'
import { ContentContainer } from './OnboardingScreen.styles'

export function OnboardingScreen() {
  const router = useRouter()
  const { user, profile, loading: userLoading, setProfile } = useUser()

  useEffect(() => {
    if (userLoading) return
    if (!user) {
      router.replace('/(auth)')
      return
    }
    if (profile?.onboardingCompleted === true) {
      router.replace('/(tabs)')
    }
  }, [user, profile, userLoading, router])

  if (userLoading) {
    return (
      <ScreenContainer>
        <ContentContainer>
          <ActivityIndicator size="large" />
        </ContentContainer>
      </ScreenContainer>
    )
  }

  if (!user || profile?.onboardingCompleted === true) return null

  return (
    <ScreenContainer includeBottomPadding>
      <OnboardingBody user={user} setProfile={setProfile} />
    </ScreenContainer>
  )
}
