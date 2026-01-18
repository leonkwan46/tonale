import { useRef, useState } from 'react'
import { Keyboard, TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'

import { useDevice } from '@/hooks'
import { KeyboardAwareScrollView } from '@/sharedComponents'
import { ScreenIntroHeader } from '@/screens/SettingsScreen/components/ScreenIntroHeader'

import {
  ErrorContainer,
  ErrorIcon,
  ErrorText,
  Input,
  InputField,
  PrimaryButton,
  PrimaryButtonText,
  PrimaryIcon,
  ScrollContainer
} from './PasswordResetForm.styles'

interface PasswordResetFormProps {
  email: string
  code: string
  onReset: (code: string, newPassword: string) => Promise<void>
  isLoading?: boolean
  error?: string
}

export const PasswordResetForm = ({
  email,
  code,
  onReset,
  isLoading = false,
  error
}: PasswordResetFormProps) => {
  const { isTablet } = useDevice()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const newPasswordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const handleSubmit = async () => {
    Keyboard.dismiss()
    setLocalError('')

    if (!newPassword) {
      setLocalError('New password is required')
      return
    }

    if (newPassword.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    try {
      await onReset(code, newPassword)
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const displayError = localError || error

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <ScrollContainer>
        <ScreenIntroHeader
          icon="lock-closed-outline"
          description="Choose a strong password to keep your account secure. Your password should be at least 6 characters long."
        />

        {displayError ? (
          <ErrorContainer isTablet={isTablet}>
            <ErrorIcon name="alert-circle" size={isTablet ? scale(14) : scale(20)} />
            <ErrorText isTablet={isTablet}>{displayError}</ErrorText>
          </ErrorContainer>
        ) : null}

        <InputField isTablet={isTablet}>
          <PrimaryIcon name="lock-closed-outline" size={isTablet ? scale(16) : scale(20)} />
          <Input
            ref={newPasswordInputRef}
            isTablet={isTablet}
            placeholder="Enter your new password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            editable={!isLoading}
          />
        </InputField>

        <InputField isTablet={isTablet}>
          <PrimaryIcon name="lock-closed-outline" size={isTablet ? scale(16) : scale(20)} />
          <Input
            ref={confirmPasswordInputRef}
            isTablet={isTablet}
            placeholder="Confirm your new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            editable={!isLoading}
          />
        </InputField>

        <PrimaryButton
          disabled={isLoading || !newPassword || !confirmPassword}
          isTablet={isTablet}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <PrimaryButtonText isTablet={isTablet}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </PrimaryButtonText>
        </PrimaryButton>
      </ScrollContainer>
    </KeyboardAwareScrollView>
  )
}
