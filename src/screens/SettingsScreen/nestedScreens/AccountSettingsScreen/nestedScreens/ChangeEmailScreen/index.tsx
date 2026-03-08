import { sendEmailVerificationToUser, updateUserEmailAddress } from '@/config/firebase/auth'
import { KeyboardAwareScrollView } from '@/globalComponents/KeyboardAwareScrollView'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { Icon } from '@/sharedComponents/Icon'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

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

  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [changeLoading, setChangeLoading] = useState(false)
  const [changeError, setChangeError] = useState('')
  const [changeSuccess, setChangeSuccess] = useState(false)

  const [isVerified, setIsVerified] = useState(authUser?.emailVerified || false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState('')
  const [verifySuccess, setVerifySuccess] = useState(false)

  useEffect(() => {
    setIsVerified(authUser?.emailVerified || false)
  }, [authUser?.emailVerified])

  const refreshVerificationStatus = async () => {
    if (!authUser) return
    try {
      await authUser.reload()
      setIsVerified(authUser.emailVerified)
      setVerifySuccess(false)
      setVerifyError('')
    } catch {
      // Failed to refresh
    }
  }

  const handleChangeEmail = async () => {
    Keyboard.dismiss()
    setChangeError('')
    setChangeSuccess(false)

    const trimmedEmail = newEmail.trim()
    if (!trimmedEmail) {
      setChangeError('Please enter a new email address')
      return
    }
    if (!password) {
      setChangeError('Please enter your current password')
      return
    }
    if (trimmedEmail === authUser?.email) {
      setChangeError('New email is the same as your current email')
      return
    }

    setChangeLoading(true)
    try {
      await updateUserEmailAddress(password, trimmedEmail)
      setChangeSuccess(true)
      setIsVerified(false)
      setNewEmail('')
      setPassword('')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update email'
      setChangeError(errorMessage)
    } finally {
      setChangeLoading(false)
    }
  }

  const handleSendVerification = async () => {
    setVerifyLoading(true)
    setVerifyError('')
    setVerifySuccess(false)

    try {
      await sendEmailVerificationToUser()
      setVerifySuccess(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send verification email'
      setVerifyError(errorMessage)
    } finally {
      setVerifyLoading(false)
    }
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Email" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ContentContainer>
          <ScreenIntroHeader
            icon="mail-outline"
            description="Email helps us verify your account or reach you in case of security or support issues. Your email address won't be visible to others."
          />

          <Card>
            <LabelText>Change Email</LabelText>

            {changeError ? (
              <ErrorContainer>
                <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
                <ErrorText>{changeError}</ErrorText>
              </ErrorContainer>
            ) : null}

            {changeSuccess ? (
              <SuccessContainer>
                <Icon name="checkmark-circle" sizeVariant="xs" colorVariant="success" />
                <SuccessText>
                  Email updated! A verification email has been sent to your new address.
                </SuccessText>
              </SuccessContainer>
            ) : (
              <>
                <MessageText>
                  Your current email is {authUser?.email}. Enter your new email and current password to update it.
                </MessageText>

                <InputField>
                  <Icon name="mail-outline" sizeVariant="sm" colorVariant="primary" />
                  <Input
                    placeholder="New email address"
                    value={newEmail}
                    onChangeText={setNewEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    editable={!changeLoading}
                    returnKeyType="next"
                  />
                </InputField>

                <InputField>
                  <Icon name="lock-closed-outline" sizeVariant="sm" colorVariant="primary" />
                  <Input
                    placeholder="Current password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!changeLoading}
                    returnKeyType="done"
                    onSubmitEditing={handleChangeEmail}
                  />
                </InputField>

                <PrimaryButton
                  disabled={changeLoading || !newEmail.trim() || !password}
                  onPress={handleChangeEmail}
                  activeOpacity={0.7}
                >
                  <PrimaryButtonText>
                    {changeLoading ? 'Updating...' : 'Update Email'}
                  </PrimaryButtonText>
                </PrimaryButton>
              </>
            )}
          </Card>

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
                    Verify your email to access all features. We&apos;ll send a verification email to {authUser.email}.
                  </MessageText>

                  {verifyError ? (
                    <ErrorContainer>
                      <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
                      <ErrorText>{verifyError}</ErrorText>
                    </ErrorContainer>
                  ) : null}

                  {verifySuccess ? (
                    <SuccessContainer>
                      <Icon name="checkmark-circle" sizeVariant="xs" colorVariant="success" />
                      <SuccessText>
                        Verification email sent! Please check your inbox.
                      </SuccessText>
                    </SuccessContainer>
                  ) : null}

                  <PrimaryButton onPress={handleSendVerification} activeOpacity={0.7}>
                    <PrimaryButtonText>
                      {verifyLoading ? 'Sending...' : 'Send Verification Email'}
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
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}
