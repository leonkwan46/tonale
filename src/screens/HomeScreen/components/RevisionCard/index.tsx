import { useProgress } from '@/hooks'
import { useRouter } from 'expo-router'
import * as React from 'react'
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

export const RevisionCard: React.FC = () => {
  const { revisionQuestions } = useProgress()
  const router = useRouter()
  const [isPressed, setIsPressed] = useState(false)

  const handleStartRevision = () => {
    router.push('/revision')
  }

  const hasRevisionQuestions = revisionQuestions && revisionQuestions.length > 0

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

