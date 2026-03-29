import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

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
