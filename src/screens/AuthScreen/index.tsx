import { auth } from '@/config/firebase/firebase'
import { KeyboardAwareScrollView } from '@/globalComponents/KeyboardAwareScrollView'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { signInAnonymously } from 'firebase/auth'
import { useEffect, useState } from 'react'
import {
  AuthActionsContainer,
  ContentWrapper,
  ScrollContentContainer
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

export const AuthScreen = () => {
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
  
  return (
    <ScreenContainer>
      <KeyboardAwareScrollView 
        showsVerticalScrollIndicator={false}
      >
        <ScrollContentContainer>
        <ContentWrapper>
          <Header
            authState={authState}
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
        </ScrollContentContainer>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

