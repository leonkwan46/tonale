import { sendPasswordResetEmailToUser } from '@/config/firebase/auth'
import { useDevice, useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import { ContentContainer } from '../../../../SettingsScreen.styles'
import {
  Card,
  ErrorContainer,
  ErrorIcon,
  ErrorText,
  MessageText,
  PrimaryButton,
  PrimaryButtonText,
  SuccessContainer,
  SuccessIcon,
  SuccessText
} from './ChangePasswordScreen.styles'

export const ChangePasswordScreen = () => {
  const { authUser } = useUser()
  const { isTablet } = useDevice()
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
            description="Choose a strong password to keep your account secure. We'll send you a secure link to reset your password."
          />
          <Card>
            {error ? (
              <ErrorContainer isTablet={isTablet}>
                <ErrorIcon name="alert-circle" size={isTablet ? scale(14) : scale(20)} />
                <ErrorText isTablet={isTablet}>{error}</ErrorText>
              </ErrorContainer>
            ) : null}

            {success ? (
              <SuccessContainer isTablet={isTablet}>
                <SuccessIcon name="checkmark-circle" size={isTablet ? scale(14) : scale(20)} />
                <SuccessText isTablet={isTablet}>
                  Password reset email sent! Please check your inbox at {authUser?.email} and follow the instructions to reset your password.
                </SuccessText>
              </SuccessContainer>
            ) : (
              <>
                <MessageText isTablet={isTablet}>
                  We&apos;ll send a password reset link to {authUser?.email}. Click the link in the email to reset your password securely.
                </MessageText>

                <PrimaryButton
                  disabled={loading}
                  isTablet={isTablet}
                  onPress={handleSendResetEmail}
                  activeOpacity={0.7}
                >
                  <PrimaryButtonText isTablet={isTablet}>
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

