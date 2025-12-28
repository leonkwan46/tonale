import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const FormSection = styled(Animated.View)(() => ({
  minHeight: scale(200),
  width: '100%',
  flexDirection: 'column',
  gap: scale(16)
}))

export const ErrorContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: scale(16),
  paddingVertical: scale(12),
  borderRadius: scale(8),
  gap: scale(8)
}))

export const ErrorText = styled.Text(({ theme }) => ({
  color: theme.colors.error,
  fontSize: scale(12),
  flex: 1,
  fontFamily: getSourGummyFontFamily('400')
}))

export const InputsContainer = styled.View(() => ({
  flexDirection: 'column',
  gap: scale(8),
  width: '100%'
}))

export const InputField = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: scale(16),
  height: scale(56),
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  gap: scale(8)
}))

export const Input = styled.TextInput(({ theme }) => ({
  flex: 1,
  fontSize: scale(14),
  height: '100%',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const EyeIcon = styled(TouchableOpacity)({
  padding: scale(4)
})

export const RequirementsText = styled.Text(({ theme }) => ({
  fontSize: scale(12),
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const PrimaryButton = styled(TouchableOpacity)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  backgroundColor: theme.colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: scale(16),
  borderRadius: scale(12),
  opacity: disabled ? 0.7 : 1
}))

export const PrimaryButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: scale(16),
  marginRight: scale(8),
  fontFamily: getSourGummyFontFamily('600')
}))

