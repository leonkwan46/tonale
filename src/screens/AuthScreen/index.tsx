import { auth } from '@/config/firebase/firebase'
import { createUserData } from '@/config/firebase/functions'
import { useUser } from '@/hooks'
import { useTheme } from '@emotion/react'
import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Platform, useColorScheme } from 'react-native'
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated'

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
import type { AuthFormData, AuthMode, AuthState } from './types'

export function AuthScreen() {
  const colorScheme = useColorScheme() ?? 'light'
  const theme = useTheme()
  const { fetchProfile } = useUser()
  
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
  
  // Animation values
  const logoScale = useSharedValue(0.8)
  const modeTransition = useSharedValue(0)
  
  useEffect(() => {
    logoScale.value = withTiming(1.0, { duration: 1000, easing: Easing.out(Easing.ease) })
    modeTransition.value = authState.mode === 'login' ? 0 : 1
  }, [authState.mode, logoScale, modeTransition])
  
  useEffect(() => {
    modeTransition.value = withSpring(authState.mode === 'login' ? 0 : 1, {
      damping: 20,
      stiffness: 100
    })
    setAuthState(prev => ({ ...prev, error: '' }))
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
  }, [authState.mode, modeTransition])
  
  const updateFormData = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }))
  }
  
  const setMode = (mode: AuthMode) => {
    updateAuthState({ mode })
  }
  
  const handleAuth = async () => {
    if (!formData.email || !formData.password) {
      updateAuthState({ error: 'Email and password are required' })
      return
    }
    if (authState.mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        updateAuthState({ error: 'Passwords do not match' })
        return
      }
      if (formData.password.length < 6) {
        updateAuthState({ error: 'Password must be at least 6 characters' })
        return
      }
    }
    try {
      updateAuthState({ loading: true, error: '' })
      if (authState.mode === 'login') {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        await createUserData({ email: formData.email })
        await fetchProfile()
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
  
  // Animation styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }]
  }))
  
  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1
  }))
  
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


