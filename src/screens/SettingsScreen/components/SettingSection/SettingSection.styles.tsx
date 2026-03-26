import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const Container = styled.View<{ variant: 'list' | 'form' }>(({ theme, variant }) => ({
  backgroundColor: theme.colors.settingSection,
  borderRadius: scale(theme.borderRadius.md),
  ...(variant === 'list'
    ? {
        paddingHorizontal: scale(theme.spacing.sm)
      }
    : {
        padding: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.lg),
        gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md)
      })
}))
