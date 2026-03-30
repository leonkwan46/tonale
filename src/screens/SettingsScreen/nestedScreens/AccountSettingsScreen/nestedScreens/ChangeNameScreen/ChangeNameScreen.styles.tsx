import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

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

export const ScrollContentContainer = styled.View({
  flexGrow: 1,
  padding: scale(20),
  gap: scale(20)
})
