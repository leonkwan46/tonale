import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SectionContainer = styled.View(({ theme }) => ({
  width: '100%',
  gap: theme.device.isTablet ? scale(12) : scale(16)
}))

export const SectionTitle = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(14) : scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

