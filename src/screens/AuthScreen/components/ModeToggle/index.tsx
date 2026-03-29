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
}

export const ModeToggle = ({
  authState,
  setAuthState
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
      >
        <ToggleText
          size="md"
          weight="semibold"
          colorVariant={
            authState.mode === 'login' ? 'primaryContrast' : 'text'
          }
          muted={authState.mode !== 'login'}
        >
          Sign In
        </ToggleText>
      </ToggleButton>
      <ToggleButton
        isActive={authState.mode === 'register'}
        onPress={() => setMode('register')}
      >
        <ToggleText
          size="md"
          weight="semibold"
          colorVariant={
            authState.mode === 'register' ? 'primaryContrast' : 'text'
          }
          muted={authState.mode !== 'register'}
        >
          Create Account
        </ToggleText>
      </ToggleButton>
    </ToggleBackground>
  </ToggleContainer>
  )
}
