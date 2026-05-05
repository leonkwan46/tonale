import { useSafeNavigation } from '@/hooks'
import { useProgressStore } from '@/stores/progressStore'
import { Button } from '@/compLib/Button'
import { Card } from '@/compLib/Card'
import { Skeleton } from '@/compLib/Skeleton'
import {
  ContentSection,
  IconText,
  RevisionCardContainer,
  RevisionCardContent,
  RevisionText,
  useCardButtonSize
} from './RevisionCard.styles'

export const RevisionCard = () => {
  const revisionQuestions = useProgressStore(s => s.revisionQuestions)
  const revisionQuestionsLoading = useProgressStore(s => s.revisionQuestionsLoading)
  const progressDataLoading = useProgressStore(s => s.progressDataLoading)
  const progressDataInitialized = useProgressStore(s => s.progressDataInitialized)
  const { isNavigating, navigate } = useSafeNavigation()
  const cardSize = useCardButtonSize()

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
        <Card color={hasRevisionQuestions ? 'red' : 'green'} size={cardSize}>
          <IconText>♪</IconText>
        </Card>
        <ContentSection>
          {hasRevisionQuestions ? (
            <>
              <RevisionText
                testID="revision-card-text"
                size="md"
                weight="semibold"
              >
                You have {revisionQuestions.length}{' '}
                {revisionQuestions.length === 1 ? 'question' : 'questions'} to
                revise!
              </RevisionText>
              <Button
                variant="filled"
                color="error"
                disabled={isNavigating}
                loading={isNavigating}
                testID="start-revision-button"
                onPress={handleStartRevision}
                label={isNavigating ? 'Opening…' : 'Start Revision'}
              />
            </>
          ) : (
            <RevisionText
              testID="revision-card-completion-text"
              size="md"
              weight="semibold"
            >
              {'Well done!\nYou\'ve completed all your revision!'}
            </RevisionText>
          )}
        </ContentSection>
      </RevisionCardContent>
    </RevisionCardContainer>
  )
}

