import styled from '@emotion/native'
import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { Modal } from 'react-native'
import { scale } from 'react-native-size-matters'

import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

export const ModalMask = styled(Modal)({})

export const ModalMaskContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.components.modal.mask,
  justifyContent: 'center',
  padding: scale(theme.spacing.lg)
}))

export const ModalCard = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.borderRadius.md),
  padding: scale(theme.spacing.lg),
  gap: scale(theme.spacing.md)
}))

export const TitleText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: scale(theme.typography.lg),
  fontWeight: theme.fontWeight.semibold,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const BodyText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: scale(theme.typography.base),
  fontFamily: getSourGummyFontFamily()
}))

export const EyeButton = styled(PressableOpacity07)(({ theme }) => ({
  paddingVertical: scale(theme.spacing.xs),
  paddingHorizontal: scale(theme.spacing.xs)
}))

export const StatusContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: scale(1),
  borderColor: theme.colors.error,
  paddingHorizontal: scale(theme.spacing.md),
  paddingVertical: scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  gap: scale(theme.spacing.sm)
}))

export const StatusText = styled.Text(({ theme }) => ({
  color: theme.colors.error,
  fontSize: scale(theme.typography.sm),
  flex: 1,
  fontFamily: getSourGummyFontFamily()
}))

export const ActionsRow = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: scale(theme.spacing.md),
  alignItems: 'center'
}))
