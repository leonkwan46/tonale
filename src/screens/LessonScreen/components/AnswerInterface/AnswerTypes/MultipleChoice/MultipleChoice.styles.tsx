import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export type LayoutType = 'grid' | 'row'

export const ChoicesContainer = styled.View<{ type: LayoutType }>(({ type, theme }) => ({
  alignItems: 'center',
  width: '100%',
  gap: type === 'grid' ? scale(theme.spacing.lg) : theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.lg)
}))

export const ChoiceRow = styled.View<{ type: 'grid' | 'row' }>(({ type, theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: type === 'grid' ? scale(theme.spacing.xl) : scale(theme.spacing.sm)
}))

export const MultipleChoiceButtonContainer = styled.View<{ layoutType: LayoutType }>(({ theme, layoutType }) => ({
  padding: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.lg),
  justifyContent: 'center',
  alignItems: 'center',
  height: layoutType === 'grid' ? (theme.device.isTablet ? scale(70) : scale(100)) : undefined,
  width: '100%'
}))

export const ChoiceText = styled.Text<{ layoutType: LayoutType }>(({ theme, layoutType }) => {
  const getFontSize = () => {
    if (layoutType === 'grid') {
      return theme.device.isTablet ? scale(theme.typography.lg) : scale(theme.typography.xl)
    }
    return theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base)
  }

  return {
    fontSize: getFontSize(),
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: getSourGummyFontFamily('600'),
    width: '100%'
  }
})
