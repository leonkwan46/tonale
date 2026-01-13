import type { Stage } from '@types'
import styled from '@emotion/native'
import * as React from 'react'
import { Animated, Pressable } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { StarLogo } from './LessonSection/components/Logo'

interface StageHeaderProps {
  stage: Stage
  isCollapsed: boolean
  onToggle: () => void
  showToggle?: boolean
}

const HeaderContainer = styled(Pressable)<{ isPerfect?: boolean }>(({ theme, isPerfect }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: scale(16),
  backgroundColor: isPerfect ? theme.colors.gold : theme.colors.success,
  borderRadius: scale(12),
  borderWidth: isPerfect ? 2 : 0,
  borderColor: isPerfect ? theme.colors.warning : 'transparent'
}))

const StageTitle = styled.Text(({ theme }) => ({
  fontSize: scale(18),
  color: `${theme.colors.text}`,
  marginBottom: scale(4),
  fontFamily: getSourGummyFontFamily('600')
}))

const LeftContentContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(12)
})

const TextContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(4)
})

const StageStats = styled.View({
  alignItems: 'flex-end'
})

const StatsText = styled.Text(({ theme }) => ({
  fontSize: scale(12),
  color: `${theme.colors.text}`,
  opacity: 0.8,
  fontFamily: getSourGummyFontFamily('400')
}))

const ProgressBar = styled.View(({ theme }) => ({
  width: scale(60),
  height: scale(4),
  borderRadius: scale(2),
  backgroundColor: theme.colors.text,
  marginTop: scale(4),
  overflow: 'hidden'
}))

const ProgressFill = styled.View<{ width: string }>(({ width, theme }) => ({
  height: '100%',
  width: width as `${number}%`,
  backgroundColor: theme.colors.text,
  borderRadius: scale(2)
}))

const ChevronIcon = styled(Animated.View)<{ isCollapsed: boolean }>(({ isCollapsed, theme }) => ({
  width: scale(12),
  height: scale(12),
  borderTopWidth: 2,
  borderRightWidth: 2,
  borderColor: `${theme.colors.text}`,
  transform: [{ rotate: isCollapsed ? '135deg' : '-45deg' }]
}))

export const StageHeader = ({ 
  stage, 
  isCollapsed, 
  onToggle, 
  showToggle = true 
}: StageHeaderProps) => {
  const regularLessons = stage.lessons.filter(lesson => !lesson.isFinalTest)
  const totalStars = regularLessons.reduce((sum, lesson) => sum + (lesson.stars || 0), 0)
  const maxStars = regularLessons.length * 3
  const progressPercentage = maxStars > 0 ? (totalStars / maxStars) * 100 : 0
  const isPerfect = totalStars === maxStars

  return (
    <HeaderContainer 
      isPerfect={isPerfect}
      onPress={showToggle ? onToggle : undefined}
      disabled={!showToggle}
    >
      <StageTitle>Stage {stage.order}</StageTitle>
      
      <LeftContentContainer>  
        <StageStats>
          <TextContainer>
            <StatsText>{totalStars}/{maxStars}</StatsText>
            <StarLogo filled size={16} />
          </TextContainer>

          <ProgressBar>
            <ProgressFill width={`${progressPercentage}%`} />
          </ProgressBar>
        </StageStats>
        
        {showToggle && (
          <ChevronIcon isCollapsed={isCollapsed} />
        )}
      </LeftContentContainer>
    </HeaderContainer>
  )
}
