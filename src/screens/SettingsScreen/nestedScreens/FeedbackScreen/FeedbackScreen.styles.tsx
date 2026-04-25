import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { PressableFeedback } from '@/utils/PressableFeedback'
import { getTabBarHeight } from '@/globalComponents/CustomTabBar/CustomTabBar.styles'

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

export const ErrorText = styled(Typography)(() => ({
  flex: 1
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

export const SuccessText = styled(Typography)(() => ({
  flex: 1
}))

export const ScrollContentContainer = styled.View({
  flexGrow: 1
})

export const ContentWrapper = styled.View(({ theme }) => ({
  padding: scale(20),
  paddingBottom: getTabBarHeight(theme),
  gap: scale(20)
}))

export const ConsentContainer = styled(PressableFeedback)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.device.isTablet ? scale(8) : scale(12)
}))

export const ConsentText = styled(Typography)(({ theme }) => ({
  flex: 1,
  lineHeight: theme.device.isTablet ? scale(16) : scale(18)
}))

export const PrivacyNoticeText = styled(Typography)(({ theme }) => ({
  lineHeight: theme.device.isTablet ? scale(14) : scale(16)
}))
