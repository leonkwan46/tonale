import { auth } from '@/config/firebase/firebase'
import { createUserData } from '@/config/firebase/functions'
import { useUser } from '@/hooks'
import { useTheme } from '@emotion/react'
import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Platform, useColorScheme } from 'react-native'

import { useDevice } from '../../hooks/useDevice'
import {
  Container,
  KeyboardContainer,
  ScrollContainer,
  ScrollContentContainer
} from './AuthScreen.styles'
import { AuthForm } from './components/AuthForm'
import { GuestLogin } from './components/GuestLogin'
import { LogoSectionComponent } from './components/LogoSection'
import { ModeToggle } from './components/ModeToggle'
import { useAuthScreenAnimations } from './hooks/useAuthScreenAnimations'
import type { AuthFormData, AuthMode, AuthState } from './types'

export function AuthScreen() {
  const colorScheme = useColorScheme() ?? 'light'
  const theme = useTheme()
  const { setProfile, setIsRegistering } = useUser()
  
  // Form state
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [authState, setAuthState] = useState<AuthState>({
    mode: 'login',
    loading: false,
    error: '',
    showPassword: false,
    showConfirmPassword: false
  })
  
  const { logoAnimatedStyle, formAnimatedStyle } = useAuthScreenAnimations(authState.mode)
  
  useEffect(() => {
    setAuthState(prev => ({ ...prev, error: '' }))
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
  }, [authState.mode])
  
  const updateFormData = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }))
  }
  
  const setMode = (mode: AuthMode) => {
    updateAuthState({ mode })
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
      // Use profile data from createUserData response to avoid extra getUserData call
      if (result.data.success && result.data.data) {
        setProfile(result.data.data)
      }
    } finally {
      setIsRegistering(false)
    }
  }

  const handleAuth = async () => {
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
  
  const handleGuestLogin = async () => {
    try {
      updateAuthState({ loading: true, error: '' })
      await signInAnonymously(auth)
    } catch (err) {
      updateAuthState({ error: (err as Error).message || 'Failed to login as guest' })
    } finally {
      updateAuthState({ loading: false })
    }
  }
  
  // Theme colors
  const backgroundColor = theme.colors.background
  const textColor = theme.colors.text
  const inputBackgroundColor = theme.colors.surface
  const borderColor = theme.colors.border
  const { isTablet } = useDevice()
  return (
    <Container backgroundColor={backgroundColor}>
      <KeyboardContainer 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollContainer 
          contentContainerStyle={ScrollContentContainer({ isTablet })}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <LogoSectionComponent
            colorScheme={colorScheme}
            authState={authState}
            textColor={textColor}
            logoAnimatedStyle={logoAnimatedStyle}
            inputBackgroundColor={inputBackgroundColor}
          />
          
          {/* Mode Toggle */}
          <ModeToggle
            authState={authState}
            setMode={setMode}
            textColor={textColor}
            inputBackgroundColor={inputBackgroundColor}
          />
          
          {/* Form Section */}
          <AuthForm
            authState={authState}
            formData={formData}
            colorScheme={colorScheme}
            textColor={textColor}
            inputBackgroundColor={inputBackgroundColor}
            borderColor={borderColor}
            updateFormData={updateFormData}
            updateAuthState={updateAuthState}
            handleAuth={handleAuth}
            handleGuestLogin={handleGuestLogin}
            formAnimatedStyle={formAnimatedStyle}
          />
          
          {/* Guest Login - Always present but conditionally visible */}
          <GuestLogin
            loading={authState.loading}
            borderColor={borderColor}
            textColor={textColor}
            onGuestLogin={handleGuestLogin}
            isVisible={authState.mode === 'login'}
          />
        </ScrollContainer>
      </KeyboardContainer>
    </Container>
  )
}

