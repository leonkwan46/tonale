import styled from '@emotion/native'
import { ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

export const ContentWrapper = styled(ScrollView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background
}))

export const ContentContainer = styled.View(({ theme }) => ({
  padding: scale(10),
  gap: scale(20),
  alignItems: 'center'
}))

export const PartialLessonContainer = styled.View<{ isPartial?: boolean }>(({ isPartial }) => ({
  width: '100%',
  overflow: 'hidden',
  height: isPartial ? scale(30) : 'auto', // Quarter height for partial lessons (25% visible)
  opacity: isPartial ? 0.4 : 1, // Reduced opacity for subtle preview
  position: 'relative'
}))
