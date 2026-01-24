import { Modal } from '@/sharedComponents/Modal'
import {
  ButtonContainer,
  DescriptionText,
  ModalButton,
  ModalButtonText,
  ModalContainer,
  ModalOverlay,
  TitleText
} from '@/sharedComponents/Modal/Modal.styles'

interface RevisionCompletionModalProps {
  visible: boolean
  remainingQuestions: number
  onExit: () => void
  onRevise: () => void
}

export const RevisionCompletionModal = ({
  visible,
  remainingQuestions,
  onExit,
  onRevise
}: RevisionCompletionModalProps) => {
  const isAllComplete = remainingQuestions === 0

  return (
    <Modal visible={visible} onRequestClose={onExit}>
      <ModalOverlay>
        <ModalContainer testID="revision-completion-modal">
          <TitleText testID="revision-completion-title">
            {isAllComplete ? 'Congratulations!' : 'Revision Complete!'}
          </TitleText>
          <DescriptionText testID="revision-completion-description">
            {isAllComplete
              ? 'You\'ve completed all your revision questions! Great job!'
              : `You have ${remainingQuestions} question${remainingQuestions !== 1 ? 's' : ''} left to revise.`}
          </DescriptionText>
          <ButtonContainer singleButton={isAllComplete}>
            {isAllComplete ? (
              <ModalButton
                testID="okay-button"
                variant="filled"
                singleButton={true}
                onPress={onExit}
              >
                <ModalButtonText variant="filled">
                  Done!
                </ModalButtonText>
              </ModalButton>
            ) : (
              <>
                <ModalButton
                  testID="exit-button"
                  variant="outlined"
                  onPress={onExit}
                >
                  <ModalButtonText variant="outlined">
                    Exit
                  </ModalButtonText>
                </ModalButton>
                <ModalButton
                  testID="revise-button"
                  variant="filled"
                  onPress={onRevise}
                >
                  <ModalButtonText variant="filled">
                    Revise
                  </ModalButtonText>
                </ModalButton>
              </>
            )}
          </ButtonContainer>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  )
}

