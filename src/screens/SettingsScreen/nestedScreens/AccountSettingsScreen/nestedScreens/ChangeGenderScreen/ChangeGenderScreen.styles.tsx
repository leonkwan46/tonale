import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background
}))

export const ContentContainer = styled.View(({ theme }) => ({
  padding: scale(20),
  gap: scale(20)
}))

export const Card = styled.View<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  padding: isTablet ? scale(16) : scale(20),
  gap: isTablet ? scale(12) : scale(16),
  width: '100%'
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
  fontFamily: getSourGummyFontFamily('600')
}))

export const ErrorIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.error
}))
