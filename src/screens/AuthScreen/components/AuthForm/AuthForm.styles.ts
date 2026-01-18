import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const FormSection = styled(Animated.View)(({ theme }) => ({
  minHeight: theme.device.isTablet ? scale(100) : scale(200),
  width: '100%',
  flexDirection: 'column',
  gap: theme.device.isTablet ? scale(8) : scale(10)
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

export const InputsContainer = styled.View(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.device.isTablet ? scale(5) : scale(8),
  width: '100%'
}))

export const InputField = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: theme.device.isTablet ? scale(12) : scale(16),
  height: theme.device.isTablet ? scale(40) : scale(56),
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  gap: theme.device.isTablet ? scale(6) : scale(8)
}))

export const Input = styled.TextInput(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  height: '100%',
  color: theme.colors.text,
  placeholderTextColor: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400')
}))

export const EyeIcon = styled(TouchableOpacity)(({ theme }) => ({
  padding: theme.device.isTablet ? scale(3) : scale(4)
}))

export const RequirementsText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(10) : scale(12),
  textAlign: 'center',
  color: theme.colors.text,
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
  marginRight: theme.device.isTablet ? scale(6) : scale(8),
  fontFamily: getSourGummyFontFamily('600')
}))

export const ErrorIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.error
}))

export const PrimaryIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))

export const TextIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.text
}))
