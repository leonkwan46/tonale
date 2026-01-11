import { useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useRouter } from 'expo-router'

import { SettingItemHeader } from '../../components/SettingItemHeader'
import { SettingsItem } from '../../components/SettingsItem'
import { ContentContainer } from '../../SettingsScreen.styles'
import {
  Card,
  FullScreenScrollView,
  UserDataCard,
  UserDataLabel,
  UserDataRow,
  UserDataTitle,
  UserDataValue
} from './AccountSettingsScreen.styles'

export function AccountSettingsScreen() {
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

  const formatDate = (timestamp: string | undefined) => {
    if (!timestamp) return 'N/A'
    try {
      return new Date(timestamp).toLocaleString()
    } catch {
      return timestamp
    }
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Account" />
      <FullScreenScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ContentContainer>
          {authUser && (
          <UserDataCard>
            <UserDataTitle>Firebase Auth User Data</UserDataTitle>
            <UserDataRow>
              <UserDataLabel>User ID</UserDataLabel>
              <UserDataValue>{authUser.uid}</UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Email</UserDataLabel>
              <UserDataValue>{authUser.email || 'N/A'}</UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Email Verified</UserDataLabel>
              <UserDataValue>{authUser.emailVerified ? 'Yes' : 'No'}</UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Display Name</UserDataLabel>
              <UserDataValue>{authUser.displayName || 'N/A'}</UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Photo URL</UserDataLabel>
              <UserDataValue numberOfLines={1} ellipsizeMode="middle">
                {authUser.photoURL || 'N/A'}
              </UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Phone Number</UserDataLabel>
              <UserDataValue>{authUser.phoneNumber || 'N/A'}</UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Anonymous</UserDataLabel>
              <UserDataValue>{authUser.isAnonymous ? 'Yes' : 'No'}</UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Created At</UserDataLabel>
              <UserDataValue>{formatDate(authUser.metadata.creationTime)}</UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Last Sign In</UserDataLabel>
              <UserDataValue>{formatDate(authUser.metadata.lastSignInTime)}</UserDataValue>
            </UserDataRow>
            <UserDataRow>
              <UserDataLabel>Provider ID</UserDataLabel>
              <UserDataValue>
                {authUser.providerData.map((p) => p.providerId).join(', ') || 'N/A'}
              </UserDataValue>
            </UserDataRow>
          </UserDataCard>
          )}
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
