import { deleteUserAccount } from '@/config/firebase/auth'
import { deleteUserData } from '@/config/firebase/functions'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useSafeNavigation, useUser } from '@/hooks'
import { GENDER, type UserGender, INSTRUMENT, type UserInstrument } from '@types'
import { capitalize } from '@/utils/string'
import { Alert } from 'react-native'

import { SettingItemHeader } from '../../components/SettingItemHeader'
import { SettingSection } from '../../components/SettingSection'
import { SettingsItem } from '../../components/SettingsItem'
import { ContentContainer } from '../../SettingsScreen.styles'
import {
    DeleteAccountCard,
    Divider,
    FullScreenScrollView,
    ScrollContentContainer
} from './AccountSettingsScreen.styles'

export const AccountSettingsScreen = () => {
  const { userData, authUser } = useUser()
  const { navigate, navigateReplace } = useSafeNavigation()

  const handleDisplayNamePress = () => {
    navigate('/(tabs)/settings/account/edit-name')
  }

  const handleChangeEmail = () => {
    navigate('/(tabs)/settings/account/change-email')
  }

  const handleChangePassword = () => {
    navigate('/(tabs)/settings/account/change-password')
  }

  const handleChangeInstrument = () => {
    navigate('/(tabs)/settings/account/change-instrument')
  }

  const handleChangeGender = () => {
    navigate('/(tabs)/settings/account/change-gender')
  }

  const handleDeleteAccountPress = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This cannot be undone and all your progress will be permanently lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDeleteAccount
        }
      ]
    )
  }

  const handleDeleteAccount = async () => {
    try {
      // Delete user data from Firestore
      await deleteUserData()
      // Delete Firebase Auth account
      await deleteUserAccount()
      // Redirect to auth screen
      // Note: Using replace here is intentional - we don't want back navigation after account deletion
      navigateReplace('/(auth)')
    } catch (error) {
      console.error('Error deleting account:', error)
      Alert.alert('Error', 'Failed to delete account. Please try again.')
    }
  }

  const formatInstrument = (instrument: UserInstrument | string): string => {
    if (!instrument) return 'Not set'
    const lower = instrument.toLowerCase()

    if (lower === INSTRUMENT.PIANO) return 'Piano'
    if (lower === INSTRUMENT.GUITAR) return 'Guitar'
    if (lower === INSTRUMENT.VIOLIN) return 'Violin'
    if (lower === INSTRUMENT.VOCAL) return 'Vocal'
    if (lower === INSTRUMENT.OTHER) return 'Other'

    return capitalize(instrument)
  }

  const formatGender = (gender: UserGender | null): string => {
    if (!gender) return 'Not set'
    if (gender === GENDER.NEUTRAL) return 'Gender'
    return capitalize(gender)
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Account" />
      <FullScreenScrollView showsVerticalScrollIndicator={false}>
        <ScrollContentContainer>
          <ContentContainer>
            <SettingSection variant="list">
              <SettingsItem
                icon="person-outline"
                label={userData?.name || 'Not set'}
                onPress={handleDisplayNamePress}
                showSeparator={true}
              />
              <SettingsItem
                icon="male-female-outline"
                label={formatGender(userData?.gender ?? null)}
                onPress={handleChangeGender}
                showSeparator={true}
              />
              <SettingsItem
                icon="musical-notes-outline"
                label={formatInstrument(userData?.instrument ?? '')}
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
            </SettingSection>
            <Divider />
            <DeleteAccountCard>
              <SettingsItem
                icon="trash-outline"
                label="Delete Account"
                onPress={handleDeleteAccountPress}
                showSeparator={false}
                variant="red"
              />
            </DeleteAccountCard>
          </ContentContainer>
        </ScrollContentContainer>
      </FullScreenScrollView>
    </ScreenContainer>
  )
}
