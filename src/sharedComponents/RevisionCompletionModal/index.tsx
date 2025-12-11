import { useDevice } from '@/hooks'
import * as React from 'react'
import {
  ButtonContainer,
  DescriptionText,
  ModalButton,
  ModalButtonText,
  ModalContainer,
  ModalOverlay,
  TitleText
} from './RevisionCompletionModal.styles'
interface RevisionCompletionModalProps {
  remainingQuestions: number
  onExit: () => void
  onRevise: () => void
}

export const RevisionCompletionModal: React.FC<RevisionCompletionModalProps> = ({
  remainingQuestions,
  onExit,
  onRevise
}) => {
  const { isTablet } = useDevice()
  const isAllComplete = remainingQuestions === 0

  return (
    <ModalOverlay>
      <ModalContainer isTablet={isTablet} testID="revision-completion-modal">
        <TitleText isTablet={isTablet} testID="revision-completion-title">
          {isAllComplete ? 'Congratulations!' : 'Revision Complete!'}
        </TitleText>
        <DescriptionText isTablet={isTablet} testID="revision-completion-description">
          {isAllComplete
            ? 'You\'ve completed all your revision questions! Great job!'
            : `You have ${remainingQuestions} question${remainingQuestions !== 1 ? 's' : ''} left to revise.`}
        </DescriptionText>
        <ButtonContainer isTablet={isTablet} singleButton={isAllComplete}>
          {isAllComplete ? (
            <ModalButton
              testID="okay-button"
              variant="filled"
              isTablet={isTablet}
              singleButton={true}
              onPress={onExit}
            >
              <ModalButtonText variant="filled" isTablet={isTablet}>
                Done!
              </ModalButtonText>
            </ModalButton>
          ) : (
            <>
              <ModalButton
                testID="exit-button"
                variant="outlined"
                isTablet={isTablet}
                onPress={onExit}
              >
                <ModalButtonText variant="outlined" isTablet={isTablet}>
                  Exit
                </ModalButtonText>
              </ModalButton>
              <ModalButton
                testID="revise-button"
                variant="filled"
                isTablet={isTablet}
                onPress={onRevise}
              >
                <ModalButtonText variant="filled" isTablet={isTablet}>
                  Revise
                </ModalButtonText>
              </ModalButton>
            </>
          )}
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  )
}

