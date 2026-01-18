import {
  ButtonIcon,
  Divider,
  DividerContainer,
  DividerText,
  GuestLoginContainer,
  GuestLoginWrapper,
  SecondaryButton,
  SecondaryButtonText
} from './GuestLogin.styles'
import { PersonIcon } from './PersonIcon'

interface GuestLoginProps {
  loading: boolean
  onGuestLogin: () => void
  isVisible: boolean
}

export const GuestLogin = ({
  loading,
  onGuestLogin,
  isVisible
}: GuestLoginProps) => {
  return (
  <GuestLoginWrapper isVisible={isVisible}>
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
          <PersonIcon name="person-outline" sizeVariant="sm" />
        </ButtonIcon>
        <SecondaryButtonText>
          Continue as Guest
        </SecondaryButtonText>
      </SecondaryButton>
    </GuestLoginContainer>
  </GuestLoginWrapper>
  )
}
