import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  padding: scale(20),
  gap: scale(16)
}))

export const InputField = styled.View<{ disabled?: boolean }>(({ theme, disabled }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: theme.device.isTablet ? scale(12) : scale(16),
  height: theme.device.isTablet ? scale(40) : scale(56),
  backgroundColor: disabled ? theme.colors.surface : theme.colors.surface,
  borderColor: theme.colors.border,
  opacity: disabled ? 0.6 : 1,
  gap: theme.device.isTablet ? scale(6) : scale(8)
}))

export const Input = styled(TextInput)(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  height: '100%',
  color: theme.colors.text,
  placeholderTextColor: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400')
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
  fontFamily: getSourGummyFontFamily('400')
}))

export const PrimaryButton = styled(TouchableOpacity)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  backgroundColor: theme.colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(8) : scale(16),
  borderRadius: scale(12),
  opacity: disabled ? 0.7 : 1,
  marginTop: theme.device.isTablet ? scale(10) : scale(16)
}))

export const PrimaryButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet ? scale(12) : scale(16),
  fontFamily: getSourGummyFontFamily('600')
}))

export const ErrorIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.error
}))

export const PrimaryIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))

export const MessageText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(18) : scale(20)
}))

export const SuccessContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.primary,
  paddingHorizontal: theme.device.isTablet ? scale(10) : scale(16),
  paddingVertical: theme.device.isTablet ? scale(6) : scale(12),
  borderRadius: scale(8),
  gap: theme.device.isTablet ? scale(5) : scale(8)
}))

export const SuccessText = styled.Text(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.device.isTablet ? scale(10) : scale(12),
  flex: 1,
  fontFamily: getSourGummyFontFamily('400')
}))

export const RefreshButton = styled(TouchableOpacity)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(8) : scale(12),
  borderRadius: scale(12),
  borderWidth: 1,
  borderColor: theme.colors.primary,
  backgroundColor: 'transparent',
  marginTop: theme.device.isTablet ? scale(10) : scale(12)
}))

export const RefreshButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  fontFamily: getSourGummyFontFamily('600')
}))

export const SuccessIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))

export const LabelText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(10) : scale(12),
  color: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400'),
  marginBottom: theme.device.isTablet ? scale(4) : scale(6)
}))
