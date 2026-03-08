import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'

export const SectionContainer = styled.View(({ theme }) => ({
  width: '100%',
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md)
}))

export const SectionTitle = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.base) : scale(theme.typography.base),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const NameInputField = styled(TextInput)(({ theme }) => ({
  width: '100%',
  height: theme.device.isTablet ? scale(44) : scale(48),
  borderWidth: 1,
  borderRadius: scale(theme.borderRadius.md),
  paddingHorizontal: scale(theme.spacing.md),
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  color: theme.colors.text,
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.primary,
  placeholderTextColor: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.normal)
}))

