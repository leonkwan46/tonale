import { sendPasswordResetEmailToUser } from '@/config/firebase/auth'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { Icon } from '@/sharedComponents/Icon'
import { Button3D } from '@/sharedComponents/Button3D'
import { useState } from 'react'
import { ScrollView } from 'react-native'

import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import { ContentContainer } from '../../../../SettingsScreen.styles'
import {
  ErrorContainer,
  ErrorText,
  PrimaryButtonText,
  SaveButtonContent,
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
            description="Reset your password to keep your account secure. We&apos;ll send you a reset link."
          />
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
                Password reset email sent! Check your email at {authUser?.email}.
              </SuccessText>
            </SuccessContainer>
          ) : (
            <Button3D
              disabled={loading}
              onPress={handleSendResetEmail}
              color="blue"
              layoutType="row"
              fullWidth
            >
              {() => (
                <SaveButtonContent>
                  <PrimaryButtonText>
                    {loading ? 'Sending...' : 'Send Password Reset Email'}
                  </PrimaryButtonText>
                </SaveButtonContent>
              )}
            </Button3D>
          )}
        </ContentContainer>
      </ScrollView>
    </ScreenContainer>
  )
}

