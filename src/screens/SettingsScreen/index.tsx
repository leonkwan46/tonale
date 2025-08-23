import { auth } from '@/config/firebaseAuth'
import { Alert, useColorScheme } from 'react-native'
import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'

import { AccountInfo } from './components/AccountInfo'
import { SettingItem } from './components/SettingItem'
import {
  Container,
  Title,
  TitleContainer,
  Card,
  SectionTitle
} from './SettingsScreen.styles'

export function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light'
  const router = useRouter()
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
              await signOut(auth)
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
