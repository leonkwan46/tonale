import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export type LayoutType = 'grid' | 'row'

export const ChoicesContainer = styled.View<{ type: LayoutType; isTablet: boolean }>(({ type, isTablet }) => ({
  alignItems: 'center',
  width: '100%',
  gap: type === 'grid' ? scale(20) : isTablet ? scale(12) : scale(20)
}))

export const ChoiceRow = styled.View<{ type: 'grid' | 'row' }>(({ type }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: type === 'grid' ? scale(24) : scale(12)
}))

export const MultipleChoiceButtonContainer = styled.View<{ isTablet: boolean; layoutType: LayoutType }>(({ isTablet, layoutType }) => ({
  padding: isTablet ? scale(15) : scale(20),
  justifyContent: 'center',
  alignItems: 'center',
  height: layoutType === 'grid' ? (isTablet ? scale(70) : scale(100)) : undefined
}))

export const ChoiceText = styled.Text<{ isTablet: boolean; layoutType: LayoutType }>(({ theme, isTablet, layoutType }) => {
  const getFontSize = () => {
    if (layoutType === 'grid') {
      return isTablet ? scale(theme.typography.lg) : scale(theme.typography.xl)
    }
    return isTablet ? scale(theme.typography.sm) : scale(theme.typography.base)
  }

  return {
    fontSize: getFontSize(),
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: getSourGummyFontFamily('600')
  }
})
