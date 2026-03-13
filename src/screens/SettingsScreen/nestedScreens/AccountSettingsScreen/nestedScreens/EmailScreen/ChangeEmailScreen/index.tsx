import { updateUserEmailAddress } from '@/config/firebase/auth'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { Button3D } from '@/sharedComponents/Button3D'
import { Icon } from '@/sharedComponents/Icon'
import { useState } from 'react'
import { Keyboard, ScrollView } from 'react-native'

import { ScreenIntroHeader } from '../../../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../../../components/SettingItemHeader'
import { ContentContainer } from '../../../../../../SettingsScreen.styles'
import {
  ErrorContainer,
  ErrorText,
  FormCard,
  Input,
  InputField,
  PrimaryButtonText,
  SaveButtonContent,
  SuccessContainer,
  SuccessText
} from './ChangeEmailScreen.styles'

export const ChangeEmailScreen = () => {
  const { authUser } = useUser()

  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleConfirm = async () => {
    Keyboard.dismiss()
    setError('')
    setSuccess(false)

    const trimmedEmail = newEmail.trim()
    if (!trimmedEmail) {
      setError('Please enter a new email address')
      return
    }
    if (!password) {
      setError('Please enter your current password')
      return
    }
    if (trimmedEmail === authUser?.email) {
      setError('New email is the same as your current email')
      return
    }

    setLoading(true)
    try {
      await updateUserEmailAddress(password, trimmedEmail)
      setSuccess(true)
      setNewEmail('')
      setPassword('')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update email'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Change Email" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContentContainer>
          <ScreenIntroHeader
            icon="mail-outline"
            description="Update the email address linked to your account. We&apos;ll verify it before applying the change."
          />

          {success ? (
            <SuccessContainer>
              <SuccessText>
                A verification link has been sent to your new email address.
              </SuccessText>
            </SuccessContainer>
          ) : (
            <FormCard>
              {error ? (
                <ErrorContainer>
                  <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
                  <ErrorText>{error}</ErrorText>
                </ErrorContainer>
              ) : null}

              <InputField disabled={loading}>
                <Icon name="mail-outline" sizeVariant="sm" colorVariant="primary" />
                <Input
                  placeholder="New Email"
                  value={newEmail}
                  onChangeText={setNewEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  editable={!loading}
                  returnKeyType="next"
                />
              </InputField>

              <InputField disabled={loading}>
                <Icon name="lock-closed-outline" sizeVariant="sm" colorVariant="primary" />
                <Input
                  placeholder="Current Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  returnKeyType="done"
                  onSubmitEditing={handleConfirm}
                />
              </InputField>
              <Button3D
                disabled={loading}
                onPress={handleConfirm}
                color="blue"
                layoutType="row"
                fullWidth
              >
                {() => (
                  <SaveButtonContent>
                    <PrimaryButtonText>{loading ? 'Confirming...' : 'Confirm'}</PrimaryButtonText>
                  </SaveButtonContent>
                )}
              </Button3D>
            </FormCard>
          )}
        </ContentContainer>
      </ScrollView>
    </ScreenContainer>
  )
}

