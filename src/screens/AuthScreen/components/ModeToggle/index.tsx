import * as React from 'react'
import { useEffect } from 'react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import type { AuthState } from '../../index'
import {
  ToggleActiveIndicator,
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

  const loginOpacity = useSharedValue(1)
  const registerOpacity = useSharedValue(0)

  const loginIndicatorStyle = useAnimatedStyle(() => ({ opacity: loginOpacity.value }))
  const registerIndicatorStyle = useAnimatedStyle(() => ({ opacity: registerOpacity.value }))

  useEffect(() => {
    loginOpacity.value = withTiming(authState.mode === 'login' ? 1 : 0, { duration: 200 })
    registerOpacity.value = withTiming(authState.mode === 'register' ? 1 : 0, { duration: 200 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.mode])

  return (
    <ToggleContainer>
      <ToggleBackground>
        <ToggleButton onPress={() => setMode('login')}>
          <ToggleActiveIndicator style={loginIndicatorStyle} />
          <ToggleText
            size="md"
            weight="semibold"
            colorVariant={authState.mode === 'login' ? 'primaryContrast' : 'text'}
            muted={authState.mode !== 'login'}
          >
            Sign In
          </ToggleText>
        </ToggleButton>
        <ToggleButton onPress={() => setMode('register')}>
          <ToggleActiveIndicator style={registerIndicatorStyle} />
          <ToggleText
            size="md"
            weight="semibold"
            colorVariant={authState.mode === 'register' ? 'primaryContrast' : 'text'}
            muted={authState.mode !== 'register'}
          >
            Create Account
          </ToggleText>
        </ToggleButton>
      </ToggleBackground>
    </ToggleContainer>
  )
}
