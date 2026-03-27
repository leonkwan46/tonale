import styled from '@emotion/native'
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
  fontFamily: getSourGummyFontFamily()
}))

export const GuestLoginWrapper = styled.View<{ isVisible: boolean }>(({ isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  height: isVisible ? 'auto' : 0,
  overflow: 'hidden',
  width: '100%'
}))
