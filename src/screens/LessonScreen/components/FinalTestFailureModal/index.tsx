import { Modal } from '@/sharedComponents/Modal'
import {
  ButtonContainer,
  DescriptionText,
  ModalButton,
  ModalButtonText,
  ModalContainer,
  ModalOverlay
} from '@/sharedComponents/Modal/Modal.styles'
import { ErrorTitleText, FailureIcon } from './FinalTestFailureModal.styles'

interface FinalTestFailureModalProps {
  visible: boolean
  onRetry: () => void
  onExit: () => void
}

export const FinalTestFailureModal = ({
  visible,
  onRetry,
  onExit
}: FinalTestFailureModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onExit}>
      <ModalOverlay>
        <ModalContainer>
          <FailureIcon>❌</FailureIcon>
          
          <ErrorTitleText>
            Test Failed
          </ErrorTitleText>
          
          <DescriptionText>
            Sorry, you&apos;ve reached the maximum number of wrong answers. Don&apos;t worry, practice makes perfect! Review the lessons and try again.
          </DescriptionText>
          
          <ButtonContainer>
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
              testID="retry-test-button"
              variant="filled"
              onPress={onRetry}
            >
              <ModalButtonText variant="filled">
                Retry Test
              </ModalButtonText>
            </ModalButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  )
}
