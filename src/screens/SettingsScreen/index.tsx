import { auth } from '@/config/firebase/firebase'
import { useProgress } from '@/hooks'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import { Alert, useColorScheme } from 'react-native'

import { AccountInfo } from './components/AccountInfo'
import { SettingItem } from './components/SettingItem'
import {
    Card,
    Container,
    SectionTitle,
    Title,
    TitleContainer
} from './SettingsScreen.styles'

export function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light'
  const router = useRouter()
  const { clearAllUserData } = useProgress()
  const currentUser = auth.currentUser

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Sign out from Firebase first (before clearing data)
              // This ensures we can recover if signOut fails
              await signOut(auth)
              
              // Only clear data after successful sign out
              try {
                // Clear all user-specific data from AsyncStorage
                await clearAllUserData()
              } catch (clearError) {
                // Log but don't block logout if data clearing fails
                // User is already signed out, so they can't access the data anyway
                console.error('Failed to clear some user data:', clearError)
              }
              
              // Note: Streak data is stored in user profile, not AsyncStorage
              // It persists with the user account
              
              router.replace('/(auth)')
            } catch (error) {
              console.error('Failed to logout:', error)
              Alert.alert('Error', 'Failed to logout. Please try again.')
            }
          }
        }
      ]
    )
  }

  const accountInfo = {
    displayName: currentUser?.displayName || null,
    email: currentUser?.email || null
  }

  return (
    <Container colorScheme={colorScheme}>
      <TitleContainer>
        <Title colorScheme={colorScheme}>Settings</Title>
      </TitleContainer>

      {/* Account Card */}
      <Card colorScheme={colorScheme}>
        <SectionTitle colorScheme={colorScheme}>Account</SectionTitle>
        <AccountInfo accountInfo={accountInfo} colorScheme={colorScheme} />
      </Card>

      {/* Account Actions Card */}
      <Card colorScheme={colorScheme}>
        <SectionTitle colorScheme={colorScheme}>Account Actions</SectionTitle>
        <SettingItem
          icon="log-out-outline"
          label="Logout"
          type="button"
          destructive
          colorScheme={colorScheme}
          onPress={handleLogout}
        />
      </Card>
    </Container>
  )
}
