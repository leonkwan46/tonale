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
