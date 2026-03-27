import { sendPasswordResetEmailToUser } from '@/config/firebase/auth'
import { auth } from '@/config/firebase/firebase'
import { createUserData } from '@/config/firebase/functions'
import { useUser } from '@/hooks'
import { Button } from '@/compLib/Button'
import { Icon } from '@/compLib/Icon'
import { getUserFacingErrorMessage } from '@/utils/errorMessages'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Keyboard, TextInput } from 'react-native'
import type { AuthFormData, AuthState } from '../../index'
import {
  EyeIcon,
  ForgotPasswordWrap,
  FormSection,
  Input,
  InputField,
  InputsContainer,
  RequirementsText,
  StatusContainer,
  StatusText
} from './AuthForm.styles'

interface AuthFormProps {
  authState: AuthState;
  formData: AuthFormData;
  setFormData: React.Dispatch<React.SetStateAction<AuthFormData>>;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthForm = ({
  authState,
  formData,
  setFormData,
  setAuthState
}: AuthFormProps) => {
  const isLoginMode = authState.mode === 'login'
  const isRegisterMode = authState.mode === 'register'

  const { setUserData, setIsRegistering } = useUser()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false)

  useEffect(() => {
    if (authState.mode === 'register') setForgotPasswordSuccess(false)
  }, [authState.mode])

  const updateFormData = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState((prev) => ({ ...prev, ...updates }))
  }

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      updateAuthState({ error: 'Please enter your email and password' })
      return false
    }
    if (isRegisterMode) {
      if (formData.password !== formData.confirmPassword) {
        updateAuthState({ error: 'Passwords don\'t match' })
        return false
      }
      if (formData.password.length < 6) {
        updateAuthState({ error: 'Password must be at least 6 characters' })
        return false
      }
    }
    return true
  }

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
  }

  const handleRegister = async () => {
    setIsRegistering(true)
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      await user.getIdToken(true)
      const result = await createUserData({
        email: user.email || formData.email
      })
      if (result.data.success && result.data.data) {
        setUserData(result.data.data)
      }
    } finally {
      setIsRegistering(false)
    }
  }

  const handleAuth = async () => {
    Keyboard.dismiss()
    emailInputRef.current?.blur()
    passwordInputRef.current?.blur()
    confirmPasswordInputRef.current?.blur()

    if (!validateForm()) return

    try {
      updateAuthState({ loading: true, error: '' })

      if (isLoginMode) {
        await handleLogin()
      } else {
        await handleRegister()
      }
    } catch (err) {
      updateAuthState({
        error: getUserFacingErrorMessage(
          err,
          isLoginMode
            ? 'Couldn’t sign in. Please try again.'
            : 'Couldn’t create your account. Please try again.'
        )
      })
    } finally {
      updateAuthState({ loading: false })
    }
  }

  const handleEmailSubmit = () => {
    passwordInputRef.current?.focus()
  }

  const handlePasswordSubmit = () => {
    if (isRegisterMode) {
      confirmPasswordInputRef.current?.focus()
    } else {
      handleAuth()
    }
  }

  const handleConfirmPasswordSubmit = () => {
    handleAuth()
  }

  const handleForgotPassword = async () => {
    Keyboard.dismiss()
    const email = formData.email?.trim()
    if (!email) {
      updateAuthState({ error: 'Please enter your email above to receive a password reset link.' })
      return
    }
    setForgotPasswordSuccess(false)
    updateAuthState({ error: '' })
    try {
      updateAuthState({ loading: true })
      await sendPasswordResetEmailToUser(email)
      setForgotPasswordSuccess(true)
      updateAuthState({ error: '' })
    } catch (err) {
      updateAuthState({
        error: getUserFacingErrorMessage(
          err,
          'Couldn’t send the reset email. Please try again.'
        )
      })
    } finally {
      updateAuthState({ loading: false })
    }
  }

  const statusMessage = authState.error
    ? { variant: 'error' as const, text: authState.error }
    : forgotPasswordSuccess
      ? { variant: 'success' as const, text: 'We’ve sent you an email with a link to reset your password.' }
      : null

  return (
    <FormSection>
      {statusMessage ? (
        <StatusContainer variant={statusMessage.variant}>
          <Icon
            name={statusMessage.variant === 'error' ? 'alert-circle' : 'checkmark-circle'}
            sizeVariant="xs"
            colorVariant={statusMessage.variant === 'error' ? 'error' : 'success'}
          />
          <StatusText variant={statusMessage.variant}>{statusMessage.text}</StatusText>
        </StatusContainer>
      ) : null}

      <InputsContainer>
        <InputField>
          <Icon name="mail-outline" sizeVariant="sm" colorVariant="primary" />
          <Input
            ref={emailInputRef}
            placeholder="Email"
            onChangeText={(text: string) => updateFormData('email', text)}
            value={formData.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType={
              isLoginMode ? 'username' : 'emailAddress'
            }
            autoComplete={isLoginMode ? 'username' : 'email'}
            returnKeyType="next"
            onSubmitEditing={handleEmailSubmit}
          />
        </InputField>

        <InputField>
          <Icon
            name="lock-closed-outline"
            sizeVariant="sm"
            colorVariant="primary"
          />
          <Input
            ref={passwordInputRef}
            placeholder="Password"
            onChangeText={(text: string) => updateFormData('password', text)}
            value={formData.password}
            secureTextEntry={!authState.showPassword}
            textContentType={
              isLoginMode ? 'password' : 'newPassword'
            }
            autoComplete={
              isLoginMode ? 'current-password' : 'new-password'
            }
            returnKeyType={isRegisterMode ? 'next' : 'done'}
            onSubmitEditing={handlePasswordSubmit}
          />
          <EyeIcon
            onPress={() =>
              updateAuthState({ showPassword: !authState.showPassword })
            }
          >
            <Icon
              name={authState.showPassword ? 'eye-outline' : 'eye-off-outline'}
              sizeVariant="sm"
              colorVariant="primary"
            />
          </EyeIcon>
        </InputField>

        {isLoginMode && (
          <ForgotPasswordWrap>
            <Button
              variant="ghost"
              size="sm"
              ghostTint="primary"
              onPress={handleForgotPassword}
              disabled={authState.loading}
              label="Forgot password?"
            />
          </ForgotPasswordWrap>
        )}

        {isRegisterMode && (
          <InputField>
            <Icon
              name="lock-closed-outline"
              sizeVariant="sm"
              colorVariant="primary"
            />
            <Input
              ref={confirmPasswordInputRef}
              placeholder="Confirm Password"
              onChangeText={(text: string) =>
                updateFormData('confirmPassword', text)
              }
              value={formData.confirmPassword}
              secureTextEntry={!authState.showConfirmPassword}
              textContentType="newPassword"
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={handleConfirmPasswordSubmit}
            />
            <EyeIcon
              onPress={() =>
                updateAuthState({
                  showConfirmPassword: !authState.showConfirmPassword
                })
              }
            >
              <Icon
                name={
                  authState.showConfirmPassword
                    ? 'eye-outline'
                    : 'eye-off-outline'
                }
                sizeVariant="sm"
                colorVariant="primary"
              />
            </EyeIcon>
          </InputField>
        )}

        {isRegisterMode && (
          <RequirementsText>
            Password must be at least 6 characters
          </RequirementsText>
        )}
      </InputsContainer>

      <Button
        testID="auth-submit-button"
        variant="filled"
        size="md"
        fullWidth
        withTopSpacing
        onPress={handleAuth}
        disabled={authState.loading}
        loading={authState.loading}
        rightIcon={isLoginMode ? 'arrow-forward' : 'person-add'}
        label={
          authState.loading
            ? isLoginMode
              ? 'Signing in…'
              : 'Creating your account…'
            : isLoginMode
              ? 'Sign In'
              : 'Create Account'
        }
      />
    </FormSection>
  )
}
