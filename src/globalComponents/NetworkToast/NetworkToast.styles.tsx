import { Icon, type IconName } from '@/sharedComponents/Icon'
import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

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

export type ToastVariant = 'error' | 'warning' | 'success'

export const ToastMessage = styled.View<{ variant: ToastVariant }>(
  ({ theme, variant }) => ({
    backgroundColor: theme.colors.surface,
    borderLeftWidth: scale(4),
    borderLeftColor: theme.colors[variant],
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md
  })
)

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
  const theme = useTheme()
  return <Icon name={name} color={theme.colors[variant]} sizeVariant="md" />
}

export const ToastText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.typography.sm,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))
