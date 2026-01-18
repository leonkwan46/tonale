import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { scale } from 'react-native-size-matters'
import {
  ButtonIcon,
  Divider,
  DividerContainer,
  DividerText,
  GuestLoginContainer,
  GuestLoginWrapper,
  PersonIcon,
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
  return (
  <GuestLoginWrapper isVisible={isVisible}>
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
          <PersonIcon name="person-outline" size={isTablet ? scale(16) : scale(20)} />
        </ButtonIcon>
        <SecondaryButtonText isTablet={isTablet}>
          Continue as Guest
        </SecondaryButtonText>
      </SecondaryButton>
    </GuestLoginContainer>
  </GuestLoginWrapper>
  )
}
