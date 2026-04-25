import styled from '@emotion/native'
import { forwardRef } from 'react'
import type { ComponentProps } from 'react'
import type { Text } from 'react-native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'
import { PressableFeedback } from '@/utils/PressableFeedback'
import { createForwardProps } from '@/utils/styledProps'

export const ModalOverlay = styled(PressableFeedback)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.components.modal.mask,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
}))

export const ModalContainer = styled(View, {
  shouldForwardProp: createForwardProps(['width', 'variant'])
})<{ width?: number; variant?: 'default' | 'light' }>(
  ({ theme, width, variant }) => ({
    backgroundColor:
      variant === 'light'
        ? theme.components.displayCard.background
        : theme.colors.surface,
    borderRadius: scale(theme.borderRadius.xl),
    padding: theme.device.isTablet
      ? scale(theme.spacing.lg)
      : scale(theme.spacing.xl),
    width: width,
    alignItems: 'center',
    gap: theme.device.isTablet
      ? scale(theme.spacing.md)
      : scale(theme.spacing.xl),
    borderWidth: 1,
    borderColor:
      variant === 'light' ? theme.components.notation.text : theme.colors.border
  })
)

type TypographyProps = ComponentProps<typeof Typography>

export const TitleText = forwardRef<Text, TypographyProps>(function TitleText(
  props,
  ref
) {
  return (
    <Typography ref={ref} size="xl" weight="bold" align="center" {...props} />
  )
})

export const DescriptionText = forwardRef<Text, TypographyProps>(
  function DescriptionText(props, ref) {
    return (
      <Typography ref={ref} size="md" align="center" muted {...props} />
    )
  }
)

export const ButtonContainer = styled.View<{ singleButton?: boolean }>(
  ({ theme, singleButton }) => ({
    flexDirection: 'row',
    justifyContent: singleButton ? 'center' : 'space-between',
    alignItems: 'center',
    width: singleButton ? 'auto' : '100%',
    alignSelf: singleButton ? 'center' : 'stretch',
    gap: theme.device.isTablet
      ? scale(theme.spacing.sm)
      : scale(theme.spacing.sm)
  })
)

export const ButtonItem = styled.View<{ grow?: boolean }>(({ grow }) => ({
  flex: grow ? 1 : undefined,
  alignSelf: grow ? 'stretch' : 'center'
}))

export const ModalIconText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(48) : scale(64),
  textAlign: 'center'
}))
