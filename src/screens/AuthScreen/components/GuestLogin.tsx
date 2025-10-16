import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { View } from 'react-native'
import {
  ButtonIcon,
  Divider,
  DividerContainer,
  DividerText,
  SecondaryButton,
  SecondaryButtonText
} from '../AuthScreen.styles'

interface GuestLoginProps {
  loading: boolean
  borderColor: string
  textColor: string
  onGuestLogin: () => void
  isVisible: boolean
}

export const GuestLogin: React.FC<GuestLoginProps> = ({
  loading,
  borderColor,
  textColor,
  onGuestLogin,
  isVisible
}) => {
  const theme = useTheme()
  
  return (
  <View style={{ 
    opacity: isVisible ? 1 : 0,
    height: isVisible ? 'auto' : 0,
    overflow: 'hidden'
  }}>
    <DividerContainer>
      <Divider backgroundColor={borderColor} />
      <DividerText color={textColor}>or</DividerText>
      <Divider backgroundColor={borderColor} />
    </DividerContainer>
    <SecondaryButton
      borderColor={theme.colors.primary}
      opacity={loading ? 0.7 : 1}
      onPress={onGuestLogin}
      disabled={loading}
    >
      <ButtonIcon>
        <Ionicons name="person-outline" size={20} color={theme.colors.primary} />
      </ButtonIcon>
      <SecondaryButtonText color={theme.colors.primary}>
        Continue as Guest
      </SecondaryButtonText>
    </SecondaryButton>
  </View>
  )
}
