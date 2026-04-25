import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { PressableFeedback } from '@/utils/PressableFeedback'

export const TitleText = styled(Typography)(() => ({}))

export const BodyText = styled(Typography)(() => ({}))

export const EyeButton = styled(PressableFeedback)(({ theme }) => ({
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

export const StatusText = styled(Typography)(() => ({
  flex: 1
}))

export const ActionsRow = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: scale(theme.spacing.md),
  alignItems: 'center'
}))
