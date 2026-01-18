import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { TextInput } from 'react-native'
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

export const NameInputField = styled(TextInput)(({ theme }) => ({
  width: '100%',
  height: theme.device.isTablet ? scale(44) : scale(48),
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: scale(16),
  fontSize: theme.device.isTablet ? scale(13) : scale(16),
  color: theme.colors.text,
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.primary,
  placeholderTextColor: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.normal)
}))

