import { sendEmailVerificationToUser } from '@/config/firebase/auth'
import { useDevice, useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { ContentContainer } from '../../../../SettingsScreen.styles'
import {
  Card,
  ErrorContainer,
  ErrorIcon,
  ErrorText,
  Input,
  InputField,
    LabelText,
    MessageText,
  PrimaryButton,
  PrimaryButtonText,
  PrimaryIcon,
    RefreshButton,
    RefreshButtonText,
  SuccessContainer,
  SuccessIcon,
  SuccessText
} from './ChangeEmailScreen.styles'
import { scale } from 'react-native-size-matters'

export const ChangeEmailScreen = () => {
  const { authUser } = useUser()
  const { isTablet } = useDevice()
  
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
            <LabelText isTablet={isTablet}>Email Address</LabelText>
            <InputField isTablet={isTablet} disabled={true}>
              <PrimaryIcon name="mail-outline" size={isTablet ? scale(16) : scale(20)} />
              <Input
                isTablet={isTablet}
                value={authUser?.email || ''}
                editable={false}
                placeholder="Email address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </InputField>
            <MessageText isTablet={isTablet}>
              Email address cannot be changed at this time.
            </MessageText>
          </Card>

          {/* Email Verification Section */}
          {authUser?.email && (
        <Card>
              <LabelText isTablet={isTablet}>Email Verification</LabelText>
              {isVerified ? (
                <>
                  <SuccessContainer isTablet={isTablet}>
                    <SuccessIcon name="checkmark-circle" size={isTablet ? scale(14) : scale(20)} />
                    <SuccessText isTablet={isTablet}>Your email is verified!</SuccessText>
                  </SuccessContainer>
                  <RefreshButton isTablet={isTablet} onPress={refreshVerificationStatus} activeOpacity={0.7}>
                    <RefreshButtonText isTablet={isTablet}>Refresh Status</RefreshButtonText>
                  </RefreshButton>
                </>
              ) : (
                <>
                  <MessageText isTablet={isTablet}>
                    Verify your email address to access all features. We&apos;ll send a verification email to {authUser.email}.
                  </MessageText>

                  {emailError ? (
            <ErrorContainer isTablet={isTablet}>
              <ErrorIcon name="alert-circle" size={isTablet ? scale(14) : scale(20)} />
                      <ErrorText isTablet={isTablet}>{emailError}</ErrorText>
            </ErrorContainer>
          ) : null}

                  {emailSuccess ? (
                    <SuccessContainer isTablet={isTablet}>
                      <SuccessIcon name="checkmark-circle" size={isTablet ? scale(14) : scale(20)} />
                      <SuccessText isTablet={isTablet}>
                        Verification email sent! Please check your inbox and click the verification link.
                      </SuccessText>
                    </SuccessContainer>
                  ) : null}

          <PrimaryButton
                    // disabled={emailLoading || emailSuccess}
            isTablet={isTablet}
                    onPress={sendVerification}
            activeOpacity={0.7}
          >
            <PrimaryButtonText isTablet={isTablet}>
                      {emailLoading ? 'Sending...' : 'Send Verification Email'}
            </PrimaryButtonText>
          </PrimaryButton>

                  <RefreshButton isTablet={isTablet} onPress={refreshVerificationStatus} activeOpacity={0.7}>
                    <RefreshButtonText isTablet={isTablet}>Refresh Status</RefreshButtonText>
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
