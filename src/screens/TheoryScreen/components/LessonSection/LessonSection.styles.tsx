import styled from '@emotion/native'
import { Pressable } from 'react-native'
import { scale } from 'react-native-size-matters'

export const LessonSectionContainer = styled(Pressable)(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(30),
  padding: scale(10)
}))

export const StarContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.device.isTablet ? scale(4) : scale(2)
}))
