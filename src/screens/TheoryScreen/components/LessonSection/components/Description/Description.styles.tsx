import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const DescriptionTextContainer = styled.View(({ theme }) => ({
    flexDirection: 'column',
    justifyContent: 'center',
    gap: scale(10),
    width: '100%',
    flex: 1
  }))

export const TitleText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? theme.typography['4xl'] : theme.typography.lg,
  color: theme.colors.text,
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: getSourGummyFontFamily('bold')
}))
export const DescriptionText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? theme.typography['2xl'] : theme.typography.base,
  color: theme.colors.text,
  flexWrap: 'wrap',
  width: '100%',
  flexShrink: 1,
  fontFamily: getSourGummyFontFamily('400')
}))
