import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { PressableFeedback } from '@/utils/PressableFeedback'

export const LessonSectionContainer = styled(PressableFeedback)(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(30),
  padding: scale(theme.spacing.sm)
}))

export const StarContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.device.isTablet ? scale(theme.spacing.xs) : scale(2)
}))
