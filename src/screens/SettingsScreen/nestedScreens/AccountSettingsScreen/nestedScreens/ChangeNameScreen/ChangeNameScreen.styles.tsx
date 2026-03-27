import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const InputField = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: theme.device.isTablet ? scale(12) : scale(16),
  height: theme.device.isTablet ? scale(40) : scale(56),
  backgroundColor: theme.components.input.background,
  borderColor: theme.components.input.border,
  gap: theme.device.isTablet ? scale(6) : scale(8)
}))

export const Input = styled.TextInput(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  height: '100%',
  color: theme.components.input.text,
  placeholderTextColor: theme.components.input.placeholder,
  fontFamily: getSourGummyFontFamily()
}))

export const ErrorContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: theme.device.isTablet ? scale(10) : scale(16),
  paddingVertical: theme.device.isTablet ? scale(6) : scale(12),
  borderRadius: scale(8),
  gap: theme.device.isTablet ? scale(5) : scale(8)
}))

export const ErrorText = styled.Text(({ theme }) => ({
  color: theme.colors.error,
  fontSize: theme.device.isTablet ? scale(10) : scale(12),
  flex: 1,
  fontFamily: getSourGummyFontFamily()
}))

export const ScrollContentContainer = styled.View({
  flexGrow: 1,
  padding: scale(20),
  gap: scale(20)
})
