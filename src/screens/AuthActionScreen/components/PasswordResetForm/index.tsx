import { useRef, useState } from 'react'
import { Keyboard, TextInput } from 'react-native'

import { Icon } from '@/sharedComponents/Icon'
import { KeyboardAwareScrollView } from '@/sharedComponents/containers/KeyboardAwareScrollView'
import { ScreenIntroHeader } from '@/screens/SettingsScreen/components/ScreenIntroHeader'

import {
  ErrorContainer,
  ErrorText,
  Input,
  InputField,
  PrimaryButton,
  PrimaryButtonText,
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
          <ErrorContainer>
            <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
            <ErrorText>{displayError}</ErrorText>
          </ErrorContainer>
        ) : null}

        <InputField>
          <Icon name="lock-closed-outline" sizeVariant="sm" colorVariant="primary" />
          <Input
            ref={newPasswordInputRef}
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

        <InputField>
          <Icon name="lock-closed-outline" sizeVariant="sm" colorVariant="primary" />
          <Input
            ref={confirmPasswordInputRef}
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
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <PrimaryButtonText>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </PrimaryButtonText>
        </PrimaryButton>
      </ScrollContainer>
    </KeyboardAwareScrollView>
  )
}
