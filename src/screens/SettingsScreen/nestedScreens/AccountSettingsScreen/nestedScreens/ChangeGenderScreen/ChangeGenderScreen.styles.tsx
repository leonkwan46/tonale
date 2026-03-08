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
  padding: scale(theme.spacing.lg),
  gap: scale(theme.spacing.lg)
}))

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.borderRadius.md),
  padding: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.lg),
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  width: '100%'
}))

export const ErrorContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  paddingVertical: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  gap: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm)
}))

export const ErrorText = styled.Text(({ theme }) => ({
  color: theme.colors.error,
  fontSize: theme.device.isTablet ? scale(theme.typography.xs) : scale(theme.typography.sm),
  flex: 1,
  fontFamily: getSourGummyFontFamily('400')
}))

export const PrimaryButton = styled(TouchableOpacity)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  backgroundColor: theme.colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  borderRadius: scale(theme.borderRadius.md),
  opacity: disabled ? 0.7 : 1,
  marginTop: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md)
}))

export const PrimaryButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  fontFamily: getSourGummyFontFamily('600')
}))

export const ErrorIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.error
}))

export const ScrollContentContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  flexGrow: 1,
  padding: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.sm),
  gap: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.xl)
}))
