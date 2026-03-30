import styled from '@emotion/native'
import { Animated, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Typography } from '@/compLib/Typography'

export const ContentWrapper = styled(ScrollView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background
  
}))

export const ContentContainer = styled.View(({ theme }) => ({
  padding: scale(theme.spacing.sm),
  gap: scale(theme.spacing.lg),
  alignItems: 'center'
}))

export const PartialLessonContainer = styled.View<{ isPartial?: boolean }>(({ isPartial }) => ({
  width: '100%',
  overflow: 'hidden',
  height: isPartial ? scale(30) : 'auto',
  opacity: isPartial ? 0.4 : 1,
  position: 'relative'
}))

export const LessonContent = styled.View<{ isPartial?: boolean }>(({ isPartial }) => ({
  position: isPartial ? 'absolute' : 'relative',
  bottom: isPartial ? 0 : 'auto',
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

export const MessageOverlay = styled.View(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: scale(180),
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 20
}))

export const MessageContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.components.modal.mask,
  padding: scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  maxWidth: scale(280),
  alignSelf: 'center'
}))

export const MessageText = styled(Typography)(({ theme }) => ({
  color: theme.components.modal.overlayText
}))

export const SpacerView = styled.View(() => ({
  height: scale(180),
  width: '100%'
}))
