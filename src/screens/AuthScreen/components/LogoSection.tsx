import { AppTheme } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
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
}) => (
  <LogoSection>
    <LogoContainer style={logoAnimatedStyle}>
      <LogoOuter backgroundColor={AppTheme.gold}>
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