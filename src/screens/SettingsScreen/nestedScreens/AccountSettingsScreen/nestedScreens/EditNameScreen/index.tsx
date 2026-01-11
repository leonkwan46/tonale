import { sendEmailVerificationToUser, updateUserDisplayName } from '@/config/firebase/auth'
import { updateUserData } from '@/config/firebase/functions'
import { useDevice, useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Keyboard, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import {
  Card,
  ErrorContainer,
  ErrorIcon,
  ErrorText,
  Input,
  InputField,
  MessageText,
  PrimaryButton,
  PrimaryButtonText,
  PrimaryIcon,
  RefreshButton,
  RefreshButtonText,
  SuccessContainer,
  SuccessIcon,
  SuccessText
} from './EditNameScreen.styles'

export function EditNameScreen() {
  const { userData, setUserData, authUser } = useUser()
  const router = useRouter()
  const { isTablet } = useDevice()
  const [name, setName] = useState(userData?.name || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Email verification state
  const [isVerified, setIsVerified] = useState(authUser?.emailVerified || false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState(false)

  useEffect(() => {
    setIsVerified(authUser?.emailVerified || false)
  }, [authUser?.emailVerified])

  const handleSave = async () => {
    Keyboard.dismiss()
    setError('')

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Name cannot be empty')
      return
    }

    // Only update if name actually changed
    if (trimmedName === userData?.name) {
      router.back()
      return
    }

    setLoading(true)
    try {
      // Update Firebase Auth displayName and Firestore user data in parallel
      const [result] = await Promise.all([
        updateUserData({ name: trimmedName }),
        updateUserDisplayName(trimmedName)
      ])
      if (result.data.success && result.data.data) {
        setUserData(result.data.data)
        router.back()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update name'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const refreshVerificationStatus = async () => {
    if (authUser) {
      try {
        await authUser.reload()
        setIsVerified(authUser.emailVerified)
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
      <SettingItemHeader title="Edit Name" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, padding: scale(20), gap: scale(20) }}
      >
        <ScreenIntroHeader
          icon="person-outline"
          description="Your name helps personalize your experience in Tonalè. This name will be visible in your profile and progress tracking."
        />
        {/* Display Name Section */}
        <Card>
          {error ? (
            <ErrorContainer isTablet={isTablet}>
              <ErrorIcon name="alert-circle" size={isTablet ? scale(14) : scale(20)} />
              <ErrorText isTablet={isTablet}>{error}</ErrorText>
            </ErrorContainer>
          ) : null}

          <InputField isTablet={isTablet}>
            <PrimaryIcon name="person-outline" size={isTablet ? scale(16) : scale(20)} />
            <Input
              isTablet={isTablet}
              placeholder="Enter your name"
              onChangeText={setName}
              value={name}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSave}
              editable={!loading}
            />
          </InputField>

          <PrimaryButton
            disabled={loading || !name.trim()}
            isTablet={isTablet}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <PrimaryButtonText isTablet={isTablet}>Save</PrimaryButtonText>
          </PrimaryButton>
        </Card>

        {/* Email Verification Section */}
        {authUser?.email && (
          <Card>
            {isVerified ? (
              <>
                <SuccessContainer isTablet={isTablet}>
                  <SuccessIcon name="checkmark-circle" size={isTablet ? scale(14) : scale(20)} />
                  <SuccessText isTablet={isTablet}>Your email is already verified!</SuccessText>
                </SuccessContainer>
                <RefreshButton isTablet={isTablet} onPress={refreshVerificationStatus} activeOpacity={0.7}>
                  <RefreshButtonText isTablet={isTablet}>Refresh Status</RefreshButtonText>
                </RefreshButton>
              </>
            ) : (
              <>
                <MessageText isTablet={isTablet}>
                  We&apos;ll send a verification email to {authUser.email}. Please check your inbox and click the
                  verification link.
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
                  disabled={emailLoading || emailSuccess}
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
      </ScrollView>
    </ScreenContainer>
  )
}

