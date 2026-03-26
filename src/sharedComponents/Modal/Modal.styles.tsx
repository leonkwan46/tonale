import styled from '@emotion/native'
import { TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createForwardProps } from '@/utils/styledProps'

export const ModalOverlay = styled.TouchableOpacity(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.colors.modalMask,
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
      variant === 'light' ? theme.colors.cardText : theme.colors.border
  })
)

export const TitleText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet
    ? scale(theme.typography.lg)
    : scale(theme.typography.xl),
  color: theme.colors.text,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
}))

export const DescriptionText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet
    ? scale(theme.typography.base)
    : scale(theme.typography.base),
  color: theme.colors.text,
  textAlign: 'center',
  opacity: 0.8,
  fontFamily: getSourGummyFontFamily()
}))

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

export const ModalButton = styled(TouchableOpacity, {
  shouldForwardProp: createForwardProps(['variant', 'singleButton'])
})<{
  variant: 'filled' | 'outlined';
  singleButton?: boolean;
}>(({ theme, variant, singleButton }) => ({
  flex: singleButton ? 0 : 1,
  paddingVertical: theme.device.isTablet
    ? scale(theme.spacing.sm)
    : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  backgroundColor: variant === 'filled' ? theme.colors.primary : 'transparent',
  borderWidth: variant === 'outlined' ? 1 : 0,
  borderColor: theme.colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: singleButton ? 'center' : 'stretch'
}))

export const ModalButtonText = styled.Text<{ variant: 'filled' | 'outlined' }>(
  ({ theme, variant }) => ({
    fontSize: theme.device.isTablet
      ? scale(theme.typography.sm)
      : scale(theme.typography.base),
    color:
      variant === 'filled' ? theme.colors.primaryContrast : theme.colors.primary,
    fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
  })
)
