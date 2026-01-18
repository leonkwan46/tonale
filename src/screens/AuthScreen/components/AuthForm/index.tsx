import { auth } from '@/config/firebase/firebase'
import { createUserData } from '@/config/firebase/functions'
import { useUser } from '@/hooks'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import * as React from 'react'
import { useRef } from 'react'
import { Keyboard, TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'
import type { AuthFormData, AuthState } from '../../index'
import {
  ErrorContainer,
  ErrorIcon,
  ErrorText,
  EyeIcon,
  FormSection,
  Input,
  InputField,
  InputsContainer,
  PrimaryButton,
  PrimaryButtonText,
  PrimaryIcon,
  RequirementsText,
  TextIcon
} from './AuthForm.styles'

interface AuthFormProps {
  authState: AuthState
  formData: AuthFormData
  setFormData: React.Dispatch<React.SetStateAction<AuthFormData>>
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
  isTablet: boolean
}

export const AuthForm = ({
  authState,
  formData,
  setFormData,
  setAuthState,
  isTablet
}: AuthFormProps) => {
  const { setUserData, setIsRegistering } = useUser()

  // Refs for TextInputs to manage focus
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const updateFormData = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }))
  }

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      updateAuthState({ error: 'Email and password are required' })
      return false
    }
    if (authState.mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        updateAuthState({ error: 'Passwords do not match' })
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
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      await user.getIdToken(true)
      const result = await createUserData({ email: user.email || formData.email })
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
      
      if (authState.mode === 'login') {
        await handleLogin()
      } else {
        await handleRegister()
      }
    } catch (err) {
      updateAuthState({ error: (err as Error).message || `Failed to ${authState.mode}` })
    } finally {
      updateAuthState({ loading: false })
    }
  }

  // Handle submit from email field - move to password
  const handleEmailSubmit = () => {
    passwordInputRef.current?.focus()
  }

  // Handle submit from password field
  const handlePasswordSubmit = () => {
    if (authState.mode === 'register') {
      confirmPasswordInputRef.current?.focus()
    } else {
      // In login mode, submit the form
      handleAuth()
    }
  }

  // Handle submit from confirm password field
  const handleConfirmPasswordSubmit = () => {
    handleAuth()
  }
  
  return (
  <FormSection isTablet={isTablet}>
    {authState.error ? (
      <ErrorContainer isTablet={isTablet}>
        <ErrorIcon name="alert-circle" size={isTablet ? scale(14) : scale(20)} />
        <ErrorText isTablet={isTablet}>{authState.error}</ErrorText>
      </ErrorContainer>
    ) : null}

    <InputsContainer isTablet={isTablet}>
      <InputField isTablet={isTablet}>
        <PrimaryIcon name="mail-outline" size={isTablet ? scale(16) : scale(20)} />
        <Input
          ref={emailInputRef}
          isTablet={isTablet}
          placeholder="Email"
          onChangeText={(text: string) => updateFormData('email', text)}
          value={formData.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType={authState.mode === 'login' ? 'username' : 'emailAddress'}
          autoComplete={authState.mode === 'login' ? 'username' : 'email'}
          returnKeyType="next"
          onSubmitEditing={handleEmailSubmit}
        />
      </InputField>

      <InputField isTablet={isTablet}>
        <PrimaryIcon name="lock-closed-outline" size={isTablet ? scale(16) : scale(20)} />
        <Input
          ref={passwordInputRef}
          isTablet={isTablet}
          placeholder="Password"
          onChangeText={(text: string) => updateFormData('password', text)}
          value={formData.password}
          secureTextEntry={!authState.showPassword}
          textContentType={authState.mode === 'login' ? 'password' : 'newPassword'}
          autoComplete={authState.mode === 'login' ? 'current-password' : 'new-password'}
          returnKeyType={authState.mode === 'register' ? 'next' : 'done'}
          onSubmitEditing={handlePasswordSubmit}
        />
        <EyeIcon
          isTablet={isTablet}
          onPress={() => updateAuthState({ showPassword: !authState.showPassword })}
        >
          <PrimaryIcon 
            name={authState.showPassword ? 'eye-outline' : 'eye-off-outline'} 
            size={isTablet ? scale(16) : scale(18)} 
          />
        </EyeIcon>
      </InputField>

      {authState.mode === 'register' && (
        <InputField isTablet={isTablet}>
          <PrimaryIcon name="lock-closed-outline" size={isTablet ? scale(16) : scale(20)} />
          <Input
            ref={confirmPasswordInputRef}
            isTablet={isTablet}
            placeholder="Confirm Password"
            onChangeText={(text: string) => updateFormData('confirmPassword', text)}
            value={formData.confirmPassword}
            secureTextEntry={!authState.showConfirmPassword}
            textContentType="newPassword"
            autoComplete="new-password"
            returnKeyType="done"
            onSubmitEditing={handleConfirmPasswordSubmit}
          />
          <EyeIcon
            isTablet={isTablet}
            onPress={() => updateAuthState({ showConfirmPassword: !authState.showConfirmPassword })}
          >
            <PrimaryIcon 
              name={authState.showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} 
              size={isTablet ? scale(16) : scale(20)} 
            />
          </EyeIcon>
        </InputField>
      )}

      {authState.mode === 'register' && (
        <RequirementsText isTablet={isTablet}>
          Password must be at least 6 characters
        </RequirementsText>
      )}
    </InputsContainer>

    <PrimaryButton
      testID="auth-submit-button"
      onPress={handleAuth}
      disabled={authState.loading}
      isTablet={isTablet}
    >
      <PrimaryButtonText isTablet={isTablet}>
        {authState.loading 
          ? (authState.mode === 'login' ? 'Signing In...' : 'Creating Account...')
          : (authState.mode === 'login' ? 'Sign In' : 'Create Account')
        }
      </PrimaryButtonText>
      <TextIcon 
        name={authState.mode === 'login' ? 'arrow-forward' : 'person-add'} 
        size={isTablet ? scale(16) : scale(20)} 
      />
    </PrimaryButton>
  </FormSection>
  )
}
