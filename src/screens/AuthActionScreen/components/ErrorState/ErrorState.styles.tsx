import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

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
