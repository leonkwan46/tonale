import { updateUserEmailAddress } from '@/config/firebase/auth'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { Button } from '@/compLib/Button'
import { Icon } from '@/compLib/Icon'
import { InputField } from '@/compLib/InputField'
import { getUserFacingErrorMessage } from '@/utils/errorMessages'
import { useState } from 'react'
import { Keyboard, ScrollView } from 'react-native'

import { ScreenIntroHeader } from '../../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../../components/SettingItemHeader'
import { ContentContainer } from '../../../../../SettingsScreen.styles'
import {
  ErrorContainer,
  ErrorText,
  FormCard,
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
      setError(
        getUserFacingErrorMessage(
          err,
          'Couldn’t update your email. Please try again.'
        )
      )
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

              <InputField
                leftIcon="mail-outline"
                placeholder="New Email"
                value={newEmail}
                onChangeText={setNewEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                disabled={loading}
                returnKeyType="next"
              />

              <InputField
                leftIcon="lock-closed-outline"
                placeholder="Current Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                disabled={loading}
                returnKeyType="done"
                onSubmitEditing={handleConfirm}
              />
              <Button
                variant="filled"
                color="primary"
                depth
                depthLayout="row"
                fullWidth
                disabled={loading}
                loading={loading}
                onPress={handleConfirm}
                label={loading ? 'Updating email…' : 'Confirm'}
              />
            </FormCard>
          )}
        </ContentContainer>
      </ScrollView>
    </ScreenContainer>
  )
}

