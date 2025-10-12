import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import type { ViewStyle } from 'react-native'
import {
  AppTitle,
  LogoContainer,
  LogoInner,
  LogoOuter,
  LogoSection,
  Subtitle
} from '../AuthScreen.styles'

interface LogoSectionProps {
  colorScheme: string
  authState: { mode: string }
  textColor: string
  logoAnimatedStyle: ViewStyle
  inputBackgroundColor: string
}

export const LogoSectionComponent: React.FC<LogoSectionProps> = ({
  colorScheme,
  authState,
  textColor,
  logoAnimatedStyle,
  inputBackgroundColor
}) => {
  const theme = useTheme()
  
  return (
  <LogoSection>
    <LogoContainer style={logoAnimatedStyle}>
      <LogoOuter backgroundColor={theme.colors.primary}>
        <LogoInner backgroundColor={inputBackgroundColor}>
          <Ionicons 
            name="musical-notes" 
            size={40} 
            color={textColor}
            style={{ opacity: 0.9 }}
          />
        </LogoInner>
      </LogoOuter>
    </LogoContainer>
    <AppTitle color={textColor}>
      tonale
    </AppTitle>
    <Subtitle color={textColor}>
      {authState.mode === 'login' 
        ? 'Welcome back to your musical journey'
        : 'Begin your musical journey today'}
    </Subtitle>
  </LogoSection>
  )
}