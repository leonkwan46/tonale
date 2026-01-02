import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const GuestLoginContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  flexDirection: 'column',
  gap: isTablet ? scale(6) : scale(16),
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

export const DividerText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  paddingHorizontal: isTablet ? scale(12) : scale(16),
  fontSize: isTablet ? scale(10) : scale(14),
  opacity: 0.6,
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const SecondaryButton = styled(TouchableOpacity)<{ disabled?: boolean; isTablet?: boolean }>(({ theme, disabled, isTablet }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: isTablet ? scale(8) : scale(16),
  borderRadius: scale(12),
  borderWidth: 2,
  borderColor: theme.colors.primary,
  opacity: disabled ? 0.7 : 1
}))

export const SecondaryButtonText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(12) : scale(16),
  color: theme.colors.primary,
  fontFamily: getSourGummyFontFamily('500')
}))

export const ButtonIcon = styled.View<{ isTablet?: boolean }>(({ isTablet }) => ({
  marginLeft: isTablet ? scale(3) : scale(4)
}))

