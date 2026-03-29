import { Button } from '@/compLib/Button'

import {
  Divider,
  DividerContainer,
  DividerText,
  GuestLoginContainer,
  GuestLoginWrapper
} from './GuestLogin.styles'

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
        <DividerText size="sm" muted>
          or
        </DividerText>
        <Divider />
      </DividerContainer>
      <Button
        variant="outlined"
        size="md"
        fullWidth
        leftIcon="person-outline"
        onPress={onGuestLogin}
        disabled={loading}
        loading={loading}
        label={loading ? 'Continuing as guest…' : 'Continue as Guest'}
      />
    </GuestLoginContainer>
  </GuestLoginWrapper>
  )
}
