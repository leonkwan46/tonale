import { signOutUser } from '@/config/firebase/auth'
import { useUser } from '@/hooks'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert } from 'react-native'

import { ProfileHeader } from './components/ProfileHeader'
import { SettingsItem } from './components/SettingsItem'
import { Card, Container, FullScreenScrollView, LogoutCard, ScrollContent } from './SettingsScreen.styles'

export const SettingsScreen = () => {
  const { userData } = useUser()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleAccountPress = () => {
    router.push('/(tabs)/settings/account')
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
      router.replace('/(auth)')
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
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
      </FullScreenScrollView>
    </Container>
  )
}
