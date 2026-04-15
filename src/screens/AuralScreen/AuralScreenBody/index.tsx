import { useCollapsibleStages, useDevice, useProgress } from '@/hooks'
import { auralStagesArray } from '@/subjects/aural/curriculum/stages/helpers'
import type { Stage, StageLesson } from '@types'
import { useCallback } from 'react'
import { LessonDivider } from '../../TheoryScreen/components/LessonDivider'
import { LessonSection } from '../../TheoryScreen/components/LessonSection'
import { StageHeader } from '../../TheoryScreen/components/StageHeader'
import { TopCloudsCover } from '../../TheoryScreen/components/TopCloudsCover'
import { CollapsibleLessonsContainer, ContentContainer, ContentWrapper, LessonContent, MessageContainer, MessageOverlay, MessageText, PartialLessonContainer, SpacerView, StageContainer } from './AuralScreenBody.styles'

export const AuralScreenBody = () => {
  const { isTablet } = useDevice()
  const { progressData } = useProgress()
  const { scrollViewRef, collapsedStages, visibleStages, animatedHeights, stageRefs, toggleStageCollapse } =
    useCollapsibleStages(auralStagesArray)

  const getVisibleLessonsForStage = useCallback((stageId: string): StageLesson[] => {
    const stage = auralStagesArray.find(s => s.id === stageId)
    if (!stage) return []
    return stage.lessons.map(lesson => {
      const progress = progressData[lesson.id]
      return {
        ...lesson,
        isLocked: progress?.isLocked ?? lesson.isLocked ?? false,
        stars: progress?.stars ?? lesson.stars ?? 0
      }
    })
  }, [progressData])

  const getStageDisplayData = useCallback((stageId: string): {
    stage: Stage | undefined
    isAccessible: boolean
    blockingMessage: string
    lessons: StageLesson[]
  } => {
    const stage = auralStagesArray.find(s => s.id === stageId)
    if (!stage) {
      return { stage: undefined, isAccessible: false, blockingMessage: 'Stage not found', lessons: [] }
    }
    return { stage, isAccessible: stage.isUnlocked, blockingMessage: '', lessons: getVisibleLessonsForStage(stageId) }
  }, [getVisibleLessonsForStage])

  const displayStages = auralStagesArray.filter(s => s.isUnlocked)
  const nextLockedStage = auralStagesArray
    .filter(s => !s.isUnlocked)
    .sort((a, b) => a.order - b.order)[0]

  if (nextLockedStage) displayStages.push(nextLockedStage)

  const hasNextStage = nextLockedStage !== undefined
  const sortedStages = [...displayStages].sort((a, b) => b.order - a.order)

  return (
    <ContentWrapper ref={scrollViewRef}>
      <ContentContainer>
        <TopCloudsCover />

        {!hasNextStage && (
          <MessageOverlay>
            <MessageContainer>
              <MessageText size={isTablet ? 'sm' : 'md'} align="center">
                Next stage still in progress...
              </MessageText>
            </MessageContainer>
          </MessageOverlay>
        )}

        {!hasNextStage && <SpacerView />}

        {sortedStages.map((stage) => {
          const stageData = getStageDisplayData(stage.id)
          const isCollapsed = collapsedStages[stage.id] || false
          const isVisible = visibleStages[stage.id] !== false
          const isPreviewStage = !stage.isUnlocked
          let lessonsToShow = stageData.lessons
          if (isPreviewStage) {
            lessonsToShow = stageData.lessons.slice(0, 2)
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
