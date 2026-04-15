import { useCollapsibleStages, useProgress } from '@/hooks'
import type { Stage, StageLesson } from '@types'
import { useCallback } from 'react'
import { LessonDivider } from '../components/LessonDivider'
import { LessonSection } from '../components/LessonSection'
import { StageHeader } from '../components/StageHeader'
import { TopCloudsCover } from '../components/TopCloudsCover'
import { CollapsibleLessonsContainer, ContentContainer, ContentWrapper, LessonContent, PartialLessonContainer, StageContainer } from './TheoryScreenBody.styles'

const PREVIEW_LESSONS_COUNT = 2

export const TheoryScreenBody = () => {
  const { getStageById, getStageRequirements, getNextLockedStage, stages } = useProgress()
  const { scrollViewRef, collapsedStages, visibleStages, animatedHeights, stageRefs, toggleStageCollapse } =
    useCollapsibleStages(stages)

  const getVisibleLessonsForStage = useCallback((stageId: string): StageLesson[] => {
    const stage = getStageById(stageId)
    if (!stage) return []
    const isLocked = !stage.isUnlocked
    return stage.lessons.map(lesson => ({ ...lesson, isLocked }))
  }, [getStageById])

  const getStageDisplayData = useCallback(
    (stageId: string): { stage: Stage | undefined; isAccessible: boolean; blockingMessage: string; lessons: StageLesson[] } => {
      const stage = getStageById(stageId)
      if (!stage) {
        return { stage: undefined, isAccessible: false, blockingMessage: 'Stage not found', lessons: [] }
      }
      const requirements = getStageRequirements(stageId)
      const lessons = getVisibleLessonsForStage(stageId)
      const blockingMessage =
        !requirements.isUnlocked && requirements.progressNeeded.length > 0
          ? requirements.progressNeeded.join(', ')
          : ''
      return { stage, isAccessible: requirements.isUnlocked, blockingMessage, lessons }
    },
    [getStageById, getStageRequirements, getVisibleLessonsForStage]
  )

  const nextLockedStage = getNextLockedStage()
  const unlockedStages = stages.filter(s => s.isUnlocked)
  const displayStages = nextLockedStage ? [...unlockedStages, nextLockedStage] : unlockedStages
  const sortedStages = [...displayStages].sort((a, b) => b.order - a.order)
  const hasNextStage = nextLockedStage !== undefined
  const currentStage = hasNextStage ? [...unlockedStages].sort((a, b) => b.order - a.order)[0] : undefined
  const currentStageFinalTestNotCleared = Boolean(currentStage && !currentStage.isCleared)

  return (
    <ContentWrapper ref={scrollViewRef}>
      <ContentContainer>
        <TopCloudsCover
          message={
            hasNextStage && currentStageFinalTestNotCleared && currentStage
              ? 'Finish the final test to unlock next stage!'
              : !hasNextStage
                ? 'Next stage in progress...'
                : null
          }
          reserveLayoutSpace={!hasNextStage}
        />

        {sortedStages.map((stage) => {
          const stageData = getStageDisplayData(stage.id)
          const isCollapsed = collapsedStages[stage.id] || false
          const isVisible = visibleStages[stage.id] !== false
          const isPreviewStage = !stage.isUnlocked
          let lessonsToShow = stageData.lessons
          if (isPreviewStage) {
            lessonsToShow = stageData.lessons.slice(0, PREVIEW_LESSONS_COUNT)
          }

          return (
            <StageContainer
              key={stage.id}
              ref={(ref) => {
                if (ref) stageRefs.current[stage.id] = ref
              }}
            >
              {stage.isCleared && lessonsToShow.length > 0 && (
                <StageHeader
                  stage={stage}
                  isCollapsed={isCollapsed}
                  onToggle={() => toggleStageCollapse(stage.id)}
                  showToggle={true}
                />
              )}
              {isVisible && (
                <CollapsibleLessonsContainer
                  style={{ opacity: stage.isCleared ? animatedHeights.current[stage.id] : 1 }}
                >
                  {lessonsToShow
                    .slice()
                    .reverse()
                    .map((lesson, reversedIndex) => {
                      const originalIndex = lessonsToShow.length - 1 - reversedIndex
                      const isLastLesson = reversedIndex === 0
                      const shouldBePartial = isPreviewStage && isLastLesson
                      return [
                        <PartialLessonContainer key={lesson.id} isPartial={shouldBePartial}>
                          <LessonContent isPartial={shouldBePartial}>
                            <LessonSection
                              index={originalIndex}
                              lesson={lesson}
                              allStageLessons={lessonsToShow}
                            />
                          </LessonContent>
                        </PartialLessonContainer>,
                        reversedIndex < lessonsToShow.length - 1 && !lesson.isFinalTest && (
                          <LessonDivider key={`divider-${lesson.id}`} />
                        )
                      ]
                    })}
                </CollapsibleLessonsContainer>
              )}
            </StageContainer>
          )
        })}
      </ContentContainer>
    </ContentWrapper>
  )
}
