import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'
import {
  ButtonIcon,
  Divider,
  DividerContainer,
  DividerText,
  GuestLoginContainer,
  SecondaryButton,
  SecondaryButtonText
} from './GuestLogin.styles'

interface GuestLoginProps {
  loading: boolean
  onGuestLogin: () => void
  isVisible: boolean
  isTablet: boolean
}

export const GuestLogin = ({
  loading,
  onGuestLogin,
  isVisible,
  isTablet
}: GuestLoginProps) => {
  const theme = useTheme()
  
  return (
  <View style={{ 
    opacity: isVisible ? 1 : 0,
    height: isVisible ? 'auto' : 0,
    overflow: 'hidden',
    width: '100%'
  }}>
    <GuestLoginContainer isTablet={isTablet}>
      <DividerContainer>
        <Divider />
        <DividerText isTablet={isTablet}>or</DividerText>
        <Divider />
      </DividerContainer>
      <SecondaryButton
        onPress={onGuestLogin}
        disabled={loading}
        isTablet={isTablet}
      >
        <ButtonIcon isTablet={isTablet}>
          <Ionicons name="person-outline" size={isTablet ? scale(16) : scale(20)} color={theme.colors.primary} />
        </ButtonIcon>
        <SecondaryButtonText isTablet={isTablet}>
          Continue as Guest
        </SecondaryButtonText>
      </SecondaryButton>
    </GuestLoginContainer>
  </View>
  )
}
