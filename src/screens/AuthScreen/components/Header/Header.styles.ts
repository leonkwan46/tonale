import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const HeaderContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  alignItems: 'center',
  width: '100%',
  gap: isTablet ? scale(2) : scale(8)
}))

export const TitlesContainer = styled.View(() => ({
  flexDirection: 'column',
  width: '100%'
}))

export const Title = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(24) : scale(28),
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold')
}))

export const Subtitle = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(12) : scale(16),
  opacity: 0.8,
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

