import * as React from 'react'
import type { AuthState } from '../../index'
import {
  ToggleBackground,
  ToggleButton,
  ToggleContainer,
  ToggleText
} from './ModeToggle.styles'

interface ModeToggleProps {
  authState: AuthState
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
  isTablet: boolean
}

export const ModeToggle = ({
  authState,
  setAuthState,
  isTablet
}: ModeToggleProps) => {
  const setMode = (mode: 'login' | 'register') => {
    setAuthState(prev => ({ ...prev, mode, error: '' }))
  }
  
  return (
  <ToggleContainer>
    <ToggleBackground>
      <ToggleButton
        isActive={authState.mode === 'login'}
        onPress={() => setMode('login')}
        isTablet={isTablet}
      >
        <ToggleText isActive={authState.mode === 'login'} isTablet={isTablet}>
          Sign In
        </ToggleText>
      </ToggleButton>
      <ToggleButton
        isActive={authState.mode === 'register'}
        onPress={() => setMode('register')}
        isTablet={isTablet}
      >
        <ToggleText isActive={authState.mode === 'register'} isTablet={isTablet}>
          Create Account
        </ToggleText>
      </ToggleButton>
    </ToggleBackground>
  </ToggleContainer>
  )
}
