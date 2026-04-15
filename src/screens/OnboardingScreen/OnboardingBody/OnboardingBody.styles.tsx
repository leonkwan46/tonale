import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const ScrollContentContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  padding: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.lg),
  gap: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.xl)
}))

export const ErrorText = styled.Text(({ theme }) => ({
  color: theme.colors.error,
  fontSize: theme.typography.sm,
  textAlign: 'center'
}))
