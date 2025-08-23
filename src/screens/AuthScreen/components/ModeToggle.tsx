import React from 'react'
import {
    ToggleBackground,
    ToggleButton,
    ToggleContainer,
    ToggleText
} from '../AuthScreen.styles'

interface ModeToggleProps {
  authState: { mode: string }
  setMode: (mode: 'login' | 'register') => void
  textColor: string
  inputBackgroundColor: string
}

export const ModeToggle: React.FC<ModeToggleProps> = ({
  authState,
  setMode,
  textColor,
  inputBackgroundColor
}) => (
  <ToggleContainer>
    <ToggleBackground backgroundColor={inputBackgroundColor}>
      <ToggleButton
        isActive={authState.mode === 'login'}
        onPress={() => setMode('login')}
      >
        <ToggleText color={authState.mode === 'login' ? '#000' : textColor}>
          Sign In
        </ToggleText>
      </ToggleButton>
      <ToggleButton
        isActive={authState.mode === 'register'}
        onPress={() => setMode('register')}
      >
        <ToggleText color={authState.mode === 'register' ? '#000' : textColor}>
          Create Account
        </ToggleText>
      </ToggleButton>
    </ToggleBackground>
  </ToggleContainer>
)