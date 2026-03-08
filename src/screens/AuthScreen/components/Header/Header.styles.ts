import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const HeaderContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  width: '100%',
  gap: theme.device.isTablet ? scale(2) : scale(theme.spacing.sm)
}))

export const TitlesContainer = styled.View(() => ({
  flexDirection: 'column',
  width: '100%'
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.xl) : scale(theme.typography['2xl']),
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold')
}))

export const Subtitle = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  opacity: 0.8,
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

