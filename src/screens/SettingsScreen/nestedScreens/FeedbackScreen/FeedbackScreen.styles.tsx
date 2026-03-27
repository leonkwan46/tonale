import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

export const InputField = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: theme.device.isTablet ? scale(12) : scale(16),
  paddingTop: theme.device.isTablet ? scale(12) : scale(16),
  paddingBottom: theme.device.isTablet ? scale(12) : scale(16),
  minHeight: theme.device.isTablet ? scale(120) : scale(160),
  backgroundColor: theme.components.input.background,
  borderColor: theme.components.input.border,
  gap: theme.device.isTablet ? scale(6) : scale(8)
}))

export const EmailInputField = styled.View(({ theme }) => ({
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

export const EmailInput = styled.TextInput(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  height: '100%',
  color: theme.components.input.text,
  placeholderTextColor: theme.components.input.placeholder,
  fontFamily: getSourGummyFontFamily()
}))

export const FeedbackInput = styled.TextInput(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  minHeight: theme.device.isTablet ? scale(100) : scale(130),
  color: theme.components.input.text,
  placeholderTextColor: theme.components.input.placeholder,
  fontFamily: getSourGummyFontFamily(),
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
  fontFamily: getSourGummyFontFamily()
}))

export const SuccessContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: theme.colors.success,
  paddingHorizontal: theme.device.isTablet ? scale(10) : scale(16),
  paddingVertical: theme.device.isTablet ? scale(6) : scale(12),
  borderRadius: scale(8),
  gap: theme.device.isTablet ? scale(5) : scale(8)
}))

export const SuccessText = styled.Text(({ theme }) => ({
  color: theme.colors.success,
  fontSize: theme.device.isTablet ? scale(10) : scale(12),
  flex: 1,
  fontFamily: getSourGummyFontFamily()
}))

export const ScrollContentContainer = styled.View({
  flexGrow: 1
})

export const ContentWrapper = styled.View({
  padding: scale(20),
  gap: scale(20)
})

export const ConsentContainer = styled(PressableOpacity07)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.device.isTablet ? scale(8) : scale(12)
}))

export const ConsentText = styled.Text(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(11) : scale(12),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(),
  lineHeight: theme.device.isTablet ? scale(16) : scale(18)
}))

export const PrivacyNoticeText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(10) : scale(11),
  color: theme.colors.text,
  opacity: 0.65,
  fontFamily: getSourGummyFontFamily(),
  lineHeight: theme.device.isTablet ? scale(14) : scale(16)
}))
