import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const GuestLoginContainer = styled.View(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.device.isTablet ? scale(6) : scale(theme.spacing.md),
  width: '100%'
}))

export const DividerContainer = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%'
}))

export const Divider = styled.View(({ theme }) => ({
  flex: 1,
  height: 1,
  backgroundColor: theme.colors.border
}))

export const DividerText = styled.Text(({ theme }) => ({
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  fontSize: theme.device.isTablet ? scale(theme.typography.xs) : scale(theme.typography.base),
  opacity: 0.6,
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const SecondaryButton = styled(TouchableOpacity)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  borderRadius: scale(theme.borderRadius.md),
  borderWidth: 2,
  borderColor: theme.colors.primary,
  opacity: disabled ? 0.7 : 1
}))

export const SecondaryButtonText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  color: theme.colors.primary,
  fontFamily: getSourGummyFontFamily('500')
}))

export const ButtonIcon = styled.View(({ theme }) => ({
  marginLeft: theme.device.isTablet ? scale(3) : scale(theme.spacing.xs)
}))

export const PersonIconStyled = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))

export const GuestLoginWrapper = styled.View<{ isVisible: boolean }>(({ isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  height: isVisible ? 'auto' : 0,
  overflow: 'hidden',
  width: '100%'
}))
