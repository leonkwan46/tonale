import { auth } from '@/config/firebase/firebase'
import { ScreenContainer } from '@/sharedComponents'
import { signInAnonymously } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { useDevice } from '../../hooks/useDevice'
import {
  AuthActionsContainer,
  ContentWrapper,
  KeyboardContainer,
  ScrollContainer
} from './AuthScreen.styles'
import { AuthForm } from './components/AuthForm'
import { GuestLogin } from './components/GuestLogin'
import { Header } from './components/Header'
import { ModeToggle } from './components/ModeToggle'

export type AuthMode = 'login' | 'register'

export interface AuthFormData {
  email: string
  password: string
  confirmPassword: string
}

export interface AuthState {
  mode: AuthMode
  loading: boolean
  error: string
  showPassword: boolean
  showConfirmPassword: boolean
}

export function AuthScreen() {
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
  
  useEffect(() => {
    setAuthState(prev => ({ ...prev, error: '' }))
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
  }, [authState.mode])
  
  
  const handleGuestLogin = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: '' }))
      await signInAnonymously(auth)
    } catch (err) {
      setAuthState(prev => ({ ...prev, error: (err as Error).message || 'Failed to login as guest' }))
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }))
    }
  }
  
  const { isTablet } = useDevice()
  
  return (
    <ScreenContainer>
      <KeyboardContainer 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollContainer 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ContentWrapper isTablet={isTablet}>
            <Header
              authState={authState}
              isTablet={isTablet}
            />
                        <AuthActionsContainer>

            <ModeToggle
              authState={authState}
              setAuthState={setAuthState}
            />
            
              <AuthForm
                authState={authState}
                formData={formData}
                setFormData={setFormData}
                setAuthState={setAuthState}
              />
              
              <GuestLogin
                loading={authState.loading}
                onGuestLogin={handleGuestLogin}
                isVisible={authState.mode === 'login'}
              />
            </AuthActionsContainer>
          </ContentWrapper>
        </ScrollContainer>
      </KeyboardContainer>
    </ScreenContainer>
  )
}

