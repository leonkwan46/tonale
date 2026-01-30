import { sendPasswordResetEmailToUser } from '@/config/firebase/auth'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { Icon } from '@/sharedComponents/Icon'
import { useState } from 'react'
import { ScrollView } from 'react-native'

import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import { ContentContainer } from '../../../../SettingsScreen.styles'
import {
  Card,
  ErrorContainer,
  ErrorText,
  MessageText,
  PrimaryButton,
  PrimaryButtonText,
  SuccessContainer,
  SuccessText
} from './ChangePasswordScreen.styles'

export const ChangePasswordScreen = () => {
  const { authUser } = useUser()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSendResetEmail = async () => {
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await sendPasswordResetEmailToUser()
      setSuccess(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send password reset email'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Change Password" />
      <ScrollView>
        <ContentContainer>
          <ScreenIntroHeader
            icon="lock-closed-outline"
            description="Choose a strong password to keep your account safe. We'll send you a link to reset it."
          />
          <Card>
            {error ? (
              <ErrorContainer>
                <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
                <ErrorText>{error}</ErrorText>
              </ErrorContainer>
            ) : null}

            {success ? (
              <SuccessContainer>
                <Icon name="checkmark-circle" sizeVariant="xs" colorVariant="success" />
                <SuccessText>
                  Password reset email sent! Check your inbox at {authUser?.email}.
                </SuccessText>
              </SuccessContainer>
            ) : (
              <>
                <MessageText>
                  We&apos;ll send a password reset link to {authUser?.email}. Click the link to reset your password.
                </MessageText>

                <PrimaryButton
                  disabled={loading}
                  onPress={handleSendResetEmail}
                  activeOpacity={0.7}
                >
                  <PrimaryButtonText>
                    {loading ? 'Sending...' : 'Send Password Reset Email'}
                  </PrimaryButtonText>
                </PrimaryButton>
              </>
            )}
          </Card>
        </ContentContainer>
      </ScrollView>
    </ScreenContainer>
  )
}

