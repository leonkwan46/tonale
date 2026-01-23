import { useProgress, useSafeNavigation } from '@/hooks'
import { Skeleton } from '@/sharedComponents/Skeleton'
import { useState } from 'react'
import {
  ContentSection,
  IconContainer,
  IconText,
  RevisionCardContainer,
  RevisionCardContent,
  RevisionText,
  StartButton,
  StartButtonContainer,
  StartButtonDepth,
  StartButtonText
} from './RevisionCard.styles'

export const RevisionCard = () => {
  const { revisionQuestions, revisionQuestionsLoading, progressDataLoading, progressDataInitialized } = useProgress()
  const { isNavigating, navigate } = useSafeNavigation()
  const [isPressed, setIsPressed] = useState(false)

  const handleStartRevision = () => {
    navigate('/revision')
  }

  const isLoading = progressDataLoading || !progressDataInitialized || revisionQuestionsLoading
  const hasRevisionQuestions = revisionQuestions.length > 0

  if (isLoading) {
    return (
      <RevisionCardContainer hasRevisionQuestions={false} isLoading={true} testID="revision-card-skeleton">
        <RevisionCardContent>
          <Skeleton variant="square" />
          <ContentSection>
            <Skeleton variant="rectangle" />
            <Skeleton variant="rectangle" />
          </ContentSection>
        </RevisionCardContent>
      </RevisionCardContainer>
    )
  }

  return (
    <RevisionCardContainer hasRevisionQuestions={hasRevisionQuestions} testID="revision-card">
      <RevisionCardContent>
        <IconContainer hasRevisionQuestions={hasRevisionQuestions}>
          <IconText>♪</IconText>
        </IconContainer>
        <ContentSection>
          {hasRevisionQuestions ? (
            <>
              <RevisionText testID="revision-card-text">You&apos;ve got {revisionQuestions.length} {revisionQuestions.length === 1 ? 'question' : 'questions'} to revise!</RevisionText>
              <StartButtonContainer isPressed={isPressed}>
                <StartButtonDepth />
                <StartButton
                  testID="start-revision-button"
                  onPress={handleStartRevision}
                  onPressIn={() => setIsPressed(true)}
                  onPressOut={() => setIsPressed(false)}
                  disabled={isNavigating}
                >
                  <StartButtonText>Start Revision!</StartButtonText>
                </StartButton>
              </StartButtonContainer>
            </>
          ) : (
            <RevisionText testID="revision-card-completion-text">{'All Done!\nYou\'ve cleared all your revision questions!'}</RevisionText>
          )}
        </ContentSection>
      </RevisionCardContent>
    </RevisionCardContainer>
  )
}

