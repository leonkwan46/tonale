import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const LessonSectionContainer = styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(30),
  padding: scale(10)
}))
