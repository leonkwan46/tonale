import { Icon, type IconName } from '@/compLib/Icon'
import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import Animated from 'react-native-reanimated'

export const ToastContainer = styled(Animated.View)<{
  topInset: number;
}>(({ theme, topInset }) => ({
  position: 'absolute',
  top: 0,
  left: theme.spacing.md,
  right: theme.spacing.md,
  paddingTop: topInset + theme.spacing.sm,
  alignItems: 'center',
  zIndex: 9999,
  elevation: 99
}))

export type ToastVariant = 'error' | 'warning' | 'success';

export const ToastMessage = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  paddingVertical: theme.spacing.sm,
  paddingHorizontal: theme.spacing.md,
  borderRadius: theme.borderRadius.lg,
  ...theme.shadows.md
}))

export const ToastRow = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.sm
}))

export const ToastIcon = ({
  name,
  variant
}: {
  name: IconName;
  variant: ToastVariant;
}) => {
  return <Icon name={name} colorVariant={variant} sizeVariant="md" />
}

export const ToastText = styled(Typography)(() => ({}))
