import { useProgress, useSafeNavigation } from '@/hooks'
import { Button3D } from '@/sharedComponents/Button3D'
import { Card3DView } from '@/sharedComponents/Card3DView'
import { Skeleton } from '@/sharedComponents/Skeleton'
import { useTheme } from '@emotion/react'
import {
  ContentSection,
  IconText,
  RevisionCardContainer,
  RevisionCardContent,
  RevisionText,
  StartButtonText
} from './RevisionCard.styles'

export const RevisionCard = () => {
  const { revisionQuestions, revisionQuestionsLoading, progressDataLoading, progressDataInitialized } = useProgress()
  const { isNavigating, navigate } = useSafeNavigation()
  const theme = useTheme()
  const cardSize = theme.components.cardButton.size

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
        <Card3DView color={hasRevisionQuestions ? 'red' : 'green'} size={cardSize}>
          <IconText>♪</IconText>
        </Card3DView>
        <ContentSection>
          {hasRevisionQuestions ? (
            <>
              <RevisionText testID="revision-card-text">You have {revisionQuestions.length} {revisionQuestions.length === 1 ? 'question' : 'questions'} to revise!</RevisionText>
              <Button3D
                onPress={handleStartRevision}
                disabled={isNavigating}
                testID="start-revision-button"
                fullWidth={true}
                color="red"
              >
                {() => (
                  <StartButtonText>Start Revision</StartButtonText>
                )}
              </Button3D>
            </>
          ) : (
            <RevisionText testID="revision-card-completion-text">{'Well done!\nYou\'ve completed all your revision!'}</RevisionText>
          )}
        </ContentSection>
      </RevisionCardContent>
    </RevisionCardContainer>
  )
}

