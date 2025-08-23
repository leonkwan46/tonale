import { AppTheme } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
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
}

export const GuestLogin: React.FC<GuestLoginProps> = ({
  loading,
  borderColor,
  textColor,
  onGuestLogin
}) => (
  <>
    <DividerContainer>
      <Divider backgroundColor={borderColor} />
      <DividerText color={textColor}>or</DividerText>
      <Divider backgroundColor={borderColor} />
    </DividerContainer>
    <SecondaryButton
      borderColor={AppTheme.gold}
      opacity={loading ? 0.7 : 1}
      onPress={onGuestLogin}
      disabled={loading}
    >
      <ButtonIcon>
        <Ionicons name="person-outline" size={20} color={AppTheme.gold} />
      </ButtonIcon>
      <SecondaryButtonText color={AppTheme.gold}>
        Continue as Guest
      </SecondaryButtonText>
    </SecondaryButton>
  </>
)