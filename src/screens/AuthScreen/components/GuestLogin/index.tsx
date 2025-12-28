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
}

export const GuestLogin: React.FC<GuestLoginProps> = ({
  loading,
  onGuestLogin,
  isVisible
}) => {
  const theme = useTheme()
  
  return (
  <View style={{ 
    opacity: isVisible ? 1 : 0,
    height: isVisible ? 'auto' : 0,
    overflow: 'hidden',
    width: '100%'
  }}>
    <GuestLoginContainer>
      <DividerContainer>
        <Divider />
        <DividerText>or</DividerText>
        <Divider />
      </DividerContainer>
      <SecondaryButton
        onPress={onGuestLogin}
        disabled={loading}
      >
        <ButtonIcon>
          <Ionicons name="person-outline" size={scale(20)} color={theme.colors.primary} />
        </ButtonIcon>
        <SecondaryButtonText>
          Continue as Guest
        </SecondaryButtonText>
      </SecondaryButton>
    </GuestLoginContainer>
  </View>
  )
}
