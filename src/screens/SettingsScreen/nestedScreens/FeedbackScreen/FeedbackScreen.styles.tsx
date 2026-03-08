import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  padding: scale(20),
  gap: scale(16)
}))

export const InputField = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: theme.device.isTablet ? scale(12) : scale(16),
  paddingTop: theme.device.isTablet ? scale(12) : scale(16),
  paddingBottom: theme.device.isTablet ? scale(12) : scale(16),
  minHeight: theme.device.isTablet ? scale(120) : scale(160),
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  gap: theme.device.isTablet ? scale(6) : scale(8)
}))

export const EmailInputField = styled.View(({ theme }) => ({
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

export const EmailInput = styled.TextInput(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  height: '100%',
  color: theme.colors.text,
  placeholderTextColor: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400')
}))

export const FeedbackInput = styled.TextInput(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  minHeight: theme.device.isTablet ? scale(100) : scale(130),
  color: theme.colors.text,
  placeholderTextColor: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(18) : scale(20)
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
  opacity: disabled ? 0.7 : 1
}))

export const PrimaryButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet ? scale(12) : scale(16),
  fontFamily: getSourGummyFontFamily('600')
}))

export const ScrollContentContainer = styled.View({
  flexGrow: 1
})

export const ContentWrapper = styled.View({
  padding: scale(20),
  gap: scale(20)
})

export const ConsentContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: theme.device.isTablet ? scale(8) : scale(12)
}))

export const CheckboxButton = styled(TouchableOpacity)({})

export const ConsentText = styled.Text(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(11) : scale(12),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(16) : scale(18)
}))

export const PrivacyNoticeText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(10) : scale(11),
  color: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(14) : scale(16)
}))
