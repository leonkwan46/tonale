import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const FormSection = styled(Animated.View)<{ isTablet: boolean }>(({ isTablet }) => ({
  minHeight: isTablet ? scale(100) : scale(200),
  width: '100%',
  flexDirection: 'column',
  gap: isTablet ? scale(8) : scale(10)
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

export const ErrorText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  color: theme.colors.error,
  fontSize: isTablet ? scale(10) : scale(12),
  flex: 1,
  fontFamily: getSourGummyFontFamily('400')
}))

export const InputsContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  flexDirection: 'column',
  gap: isTablet ? scale(5) : scale(8),
  width: '100%'
}))

export const InputField = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
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

export const Input = styled.TextInput<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  flex: 1,
  fontSize: isTablet ? scale(12) : scale(14),
  height: '100%',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const EyeIcon = styled(TouchableOpacity)<{ isTablet?: boolean }>(({ isTablet }) => ({
  padding: isTablet ? scale(3) : scale(4)
}))

export const RequirementsText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(10) : scale(12),
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
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
  marginRight: isTablet ? scale(6) : scale(8),
  fontFamily: getSourGummyFontFamily('600')
}))

