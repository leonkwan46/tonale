import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

export const LessonSectionContainer = styled(PressableOpacity07)(({ theme }) => ({
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
