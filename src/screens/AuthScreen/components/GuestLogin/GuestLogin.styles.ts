import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'

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

export const DividerText = styled(Typography)(({ theme }) => ({
  paddingHorizontal: theme.device.isTablet
    ? scale(theme.spacing.sm)
    : scale(theme.spacing.md)
}))

export const GuestLoginWrapper = styled.View<{ isVisible: boolean }>(({ isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  height: isVisible ? 'auto' : 0,
  overflow: 'hidden',
  width: '100%'
}))
