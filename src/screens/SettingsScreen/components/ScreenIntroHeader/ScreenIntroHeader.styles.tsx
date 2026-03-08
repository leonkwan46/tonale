import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Container = styled.View(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.device.isTablet ? scale(theme.spacing.xl) : scale(theme.spacing.xl),
  paddingBottom: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.xl),
  paddingHorizontal: scale(theme.spacing.lg),
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md)
}))

export const IconContainer = styled.View(({ theme }) => ({
  marginBottom: theme.device.isTablet ? scale(theme.spacing.xs) : scale(theme.spacing.sm)
}))

export const DescriptionText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.base) : scale(theme.typography.base),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(theme.typography.lg) : scale(theme.typography.xl),
  textAlign: 'center',
  paddingHorizontal: scale(theme.spacing.sm)
}))

export const HeaderIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))
