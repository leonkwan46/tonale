import { sendEmailVerificationToUser } from '@/config/firebase/auth'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { Icon } from '@/sharedComponents/Icon'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import { ContentContainer } from '../../../../SettingsScreen.styles'
import {
  Card,
  ErrorContainer,
  ErrorText,
  Input,
  InputField,
  LabelText,
  MessageText,
  PrimaryButton,
  PrimaryButtonText,
  RefreshButton,
  RefreshButtonText,
  SuccessContainer,
  SuccessText
} from './ChangeEmailScreen.styles'

export const ChangeEmailScreen = () => {
  const { authUser } = useUser()
  
  const [isVerified, setIsVerified] = useState(authUser?.emailVerified || false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState(false)

  useEffect(() => {
    setIsVerified(authUser?.emailVerified || false)
  }, [authUser?.emailVerified])

  const refreshVerificationStatus = async () => {
    if (authUser) {
      try {
        await authUser.reload()
        setIsVerified(authUser.emailVerified)
        setEmailSuccess(false)
        setEmailError('')
      } catch {
        // Failed to refresh authUser
      }
    }
  }

  const sendVerification = async () => {
    setEmailLoading(true)
    setEmailError('')
    setEmailSuccess(false)

    try {
      await sendEmailVerificationToUser()
      setEmailSuccess(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send verification email'
      setEmailError(errorMessage)
    } finally {
      setEmailLoading(false)
    }
  }

    return (
      <ScreenContainer>
      <SettingItemHeader title="Email" />
      <ScrollView>
        <ContentContainer>
          <ScreenIntroHeader
            icon="mail-outline"
            description="Email helps us verify your account or reach you in case of security or support issues. Your email address won't be visible to others."
          />
          <Card>
            <LabelText>Email Address</LabelText>
            <InputField disabled={true}>
              <Icon name="mail-outline" sizeVariant="sm" colorVariant="primary" />
              <Input
                value={authUser?.email || ''}
                editable={false}
                placeholder="Email address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </InputField>
            <MessageText>
              Email address cannot be changed at this time.
            </MessageText>
          </Card>

          {/* Email Verification Section */}
          {authUser?.email && (
        <Card>
              <LabelText>Email Verification</LabelText>
              {isVerified ? (
                <>
                  <SuccessContainer>
                    <Icon name="checkmark-circle" sizeVariant="xs" colorVariant="success" />
                    <SuccessText>Your email is verified!</SuccessText>
                  </SuccessContainer>
                  <RefreshButton onPress={refreshVerificationStatus} activeOpacity={0.7}>
                    <RefreshButtonText>Refresh Status</RefreshButtonText>
                  </RefreshButton>
                </>
              ) : (
                <>
                  <MessageText>
                    Verify your email address to access all features. We&apos;ll send a verification email to {authUser.email}.
                  </MessageText>

                  {emailError ? (
            <ErrorContainer>
              <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
                      <ErrorText>{emailError}</ErrorText>
            </ErrorContainer>
          ) : null}

                  {emailSuccess ? (
                    <SuccessContainer>
                      <Icon name="checkmark-circle" sizeVariant="xs" colorVariant="success" />
                      <SuccessText>
                        Verification email sent! Please check your inbox and click the verification link.
                      </SuccessText>
                    </SuccessContainer>
                  ) : null}

          <PrimaryButton
                    // disabled={emailLoading || emailSuccess}
                    onPress={sendVerification}
            activeOpacity={0.7}
          >
            <PrimaryButtonText>
                      {emailLoading ? 'Sending...' : 'Send Verification Email'}
            </PrimaryButtonText>
          </PrimaryButton>

                  <RefreshButton onPress={refreshVerificationStatus} activeOpacity={0.7}>
                    <RefreshButtonText>Refresh Status</RefreshButtonText>
                  </RefreshButton>
                </>
              )}
        </Card>
          )}
      </ContentContainer>
      </ScrollView>
    </ScreenContainer>
  )
}
