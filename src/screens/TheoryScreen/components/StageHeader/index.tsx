import type { Stage } from '@types'

import {
  ChevronIcon,
  HeaderContainer,
  LeftContentContainer,
  ProgressBarWrapper,
  ProgressFill,
  ProgressTrack,
  StageHeaderStarLogo,
  StageStats,
  StageTitle,
  StatsText,
  TextContainer
} from './StageHeader.styles'

interface StageHeaderProps {
  stage: Stage
  isCollapsed: boolean
  onToggle: () => void
  showToggle?: boolean
}

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
      <StageTitle isPerfect={isPerfect} size="lg" weight="semibold">
        Stage {stage.order}
      </StageTitle>

      <LeftContentContainer>
        <StageStats>
          <TextContainer>
            <StatsText isPerfect={isPerfect} size="xs">
              {totalStars}/{maxStars}
            </StatsText>
            <StageHeaderStarLogo isPerfect={isPerfect} />
          </TextContainer>

          <ProgressBarWrapper>
            <ProgressTrack isPerfect={isPerfect} />
            <ProgressFill width={`${progressPercentage}%`} isPerfect={isPerfect} />
          </ProgressBarWrapper>
        </StageStats>

        {showToggle && (
          <ChevronIcon isCollapsed={isCollapsed} isPerfect={isPerfect} />
        )}
      </LeftContentContainer>
    </HeaderContainer>
  )
}
