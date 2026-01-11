import { useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useRouter } from 'expo-router'

import { SettingItemHeader } from '../../components/SettingItemHeader'
import { SettingsItem } from '../../components/SettingsItem'
import { ContentContainer } from '../../SettingsScreen.styles'
import { Card, FullScreenScrollView } from './AccountSettingsScreen.styles'

export const AccountSettingsScreen = () => {
  const { userData, authUser } = useUser()
  const router = useRouter()

  const handleDisplayNamePress = () => {
    router.push('/(tabs)/settings/account/edit-name')
  }

  const handleChangeEmail = () => {
    router.push('/(tabs)/settings/account/change-email')
  }

  const handleChangePassword = () => {
    router.push('/(tabs)/settings/account/change-password')
  }

  const handleChangeInstrument = () => {
    router.push('/(tabs)/settings/account/change-instrument')
  }

  const handleChangeGender = () => {
    router.push('/(tabs)/settings/account/change-gender')
  }

  const formatInstrument = (instrument: string | undefined): string => {
    if (!instrument) return 'Not set'
    return instrument.charAt(0).toUpperCase() + instrument.slice(1)
  }

  const formatGender = (gender: string | undefined): string => {
    if (!gender) return 'Not set'
    return gender.charAt(0).toUpperCase() + gender.slice(1)
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Account" />
      <FullScreenScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ContentContainer>
          <Card>
            <SettingsItem
              icon="person-outline"
              label={userData?.name || 'Not set'}
              onPress={handleDisplayNamePress}
              showSeparator={true}
            />
            <SettingsItem
              icon="people-outline"
              label={formatGender(userData?.gender)}
              onPress={handleChangeGender}
              showSeparator={true}
            />
            <SettingsItem
              icon="musical-notes-outline"
              label={formatInstrument(userData?.instrument)}
              onPress={handleChangeInstrument}
              showSeparator={true}
            />
            <SettingsItem
              icon="mail-outline"
              label={authUser?.email || 'Not set'}
              onPress={handleChangeEmail}
              showSeparator={true}
              showVerifyIcon={true}
              isVerified={authUser?.emailVerified || false}
            />
            <SettingsItem
              icon="lock-closed-outline"
              label="Change Password"
              onPress={handleChangePassword}
              showSeparator={false}
            />
          </Card>
        </ContentContainer>
      </FullScreenScrollView>
    </ScreenContainer>
  )
}
