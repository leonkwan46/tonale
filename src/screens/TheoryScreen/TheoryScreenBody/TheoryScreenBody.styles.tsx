import styled from '@emotion/native'
import { Animated, ScrollView } from 'react-native'
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

export const LessonContent = styled.View<{ isPartial?: boolean }>(({ isPartial }) => ({
  position: isPartial ? 'absolute' : 'relative',
  bottom: isPartial ? 0 : 'auto', // Align to bottom for partial lessons
  left: 0,
  right: 0,
  width: '100%'
})) 

export const StageContainer = styled.View(() => ({
  width: '100%',
  overflow: 'hidden'
}))

export const CollapsibleLessonsContainer = styled(Animated.View)(() => ({
  width: '100%',
  overflow: 'hidden'
}))
