import { FEATURES, isFeatureEnabled } from '@/config/featureFlags'
import { signOutUser } from '@/config/firebase/auth'
import { useSafeNavigation, useUser } from '@/hooks'
import { useState } from 'react'
import { Alert } from 'react-native'

import { ProfileHeader } from './components/ProfileHeader'
import { SettingsItem } from './components/SettingsItem'
import { Card, Container, FullScreenScrollView, LogoutCard, ScrollContent, ScrollContentContainer } from './SettingsScreen.styles'

export const SettingsScreen = () => {
  const { userData } = useUser()
  const { navigate, navigateReplace } = useSafeNavigation()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleAccountPress = () => {
    navigate('/(tabs)/settings/account')
  }

  const handleBuyMeACoffeePress = () => {
    navigate('/(tabs)/settings/donation')
  }

  const handleFeedbackPress = () => {
    navigate('/(tabs)/settings/feedback')
  }

  const handleLogoutPress = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: handleLogout
        }
      ]
    )
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOutUser()
      // Navigate to auth screen after logout
      // Note: Using replace here is intentional - we don't want back navigation after logout
      navigateReplace('/(auth)')
    } catch (error) {
      console.error('Error signing out:', error)
      setLoggingOut(false)
      Alert.alert('Error', 'Failed to log out. Please try again.')
    }
  }

  return (
    <Container>
      <FullScreenScrollView
        showsVerticalScrollIndicator={false}
      >
        <ScrollContentContainer>
          <ScrollContent>
          <ProfileHeader name={userData?.name || null} gender={userData?.gender} />
          <Card>
            <SettingsItem
              icon="person-outline"
              label="Account"
              onPress={handleAccountPress}
              showSeparator={false}
            />
          </Card>
          {isFeatureEnabled(FEATURES.ENABLE_DONATION) && (
            <Card>
              <SettingsItem
                icon="cafe-outline"
                label="Buy me a coffee"
                onPress={handleBuyMeACoffeePress}
                showSeparator={false}
              />
            </Card>
          )}
          <Card>
            <SettingsItem
              icon="chatbubble-outline"
              label="Feedback"
              onPress={handleFeedbackPress}
              showSeparator={false}
            />
          </Card>
          <LogoutCard>
            <SettingsItem
              icon="log-out-outline"
              label={loggingOut ? 'Logging out...' : 'Log Out'}
              onPress={handleLogoutPress}
              showSeparator={false}
              variant="red"
            />
          </LogoutCard>
          </ScrollContent>
        </ScrollContentContainer>
      </FullScreenScrollView>
    </Container>
  )
}
