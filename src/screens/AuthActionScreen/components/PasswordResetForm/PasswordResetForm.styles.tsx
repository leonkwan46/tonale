import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { TextInput, TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ScrollContainer = styled.View(() => ({
  flexGrow: 1,
  padding: scale(20),
  gap: scale(20)
}))

export const ErrorContainer = styled.View<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: isTablet ? scale(10) : scale(16),
  paddingVertical: isTablet ? scale(6) : scale(12),
  borderRadius: scale(8),
  gap: isTablet ? scale(5) : scale(8)
}))

export const ErrorIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.error
}))

export const ErrorText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  color: theme.colors.error,
  fontSize: isTablet ? scale(10) : scale(12),
  flex: 1,
  fontFamily: getSourGummyFontFamily('400')
}))

export const InputField = styled.View<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: isTablet ? scale(12) : scale(16),
  height: isTablet ? scale(40) : scale(56),
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  gap: isTablet ? scale(6) : scale(8)
}))

export const Input = styled(TextInput)<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  flex: 1,
  fontSize: isTablet ? scale(12) : scale(14),
  height: '100%',
  color: theme.colors.text,
  placeholderTextColor: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400')
}))

export const PrimaryIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))

export const PrimaryButton = styled(TouchableOpacity)<{ disabled?: boolean; isTablet?: boolean }>(({ theme, disabled, isTablet }) => ({
  backgroundColor: theme.colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: isTablet ? scale(8) : scale(16),
  borderRadius: scale(12),
  opacity: disabled ? 0.7 : 1,
  marginTop: isTablet ? scale(10) : scale(16)
}))

export const PrimaryButtonText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  color: theme.colors.text,
  fontSize: isTablet ? scale(12) : scale(16),
  fontFamily: getSourGummyFontFamily('600')
}))
