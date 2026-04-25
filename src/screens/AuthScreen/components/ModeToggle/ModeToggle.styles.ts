import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'
import { PressableFeedback } from '@/utils/PressableFeedback'

export const ToggleContainer = styled.View(() => ({
  width: '100%'
}))

export const ToggleBackground = styled.View(({ theme }) => ({
  flexDirection: 'row',
  borderRadius: scale(theme.borderRadius.md),
  padding: scale(theme.spacing.xs),
  backgroundColor: theme.colors.surface
}))

export const ToggleButton = styled(PressableFeedback)(({ theme }) => ({
  flex: 1,
  paddingVertical: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  alignItems: 'center',
  overflow: 'hidden'
}))

export const ToggleActiveIndicator = styled(Animated.View)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: scale(theme.borderRadius.sm),
  backgroundColor: theme.colors.primary
}))

export const ToggleText = styled(Typography)(() => ({}))
