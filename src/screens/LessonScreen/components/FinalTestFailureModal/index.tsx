import { useDevice } from '@/hooks'
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
  const { isTablet } = useDevice()

  return (
    <Modal visible={visible} onRequestClose={onExit}>
      <ModalOverlay>
        <ModalContainer isTablet={isTablet}>
          <FailureIcon isTablet={isTablet}>❌</FailureIcon>
          
          <ErrorTitleText isTablet={isTablet}>
            Test Failed
          </ErrorTitleText>
          
          <DescriptionText isTablet={isTablet}>
            Sorry, you&apos;ve reached the maximum number of wrong answers. Don&apos;t worry, practice makes perfect! Review the lessons and try again.
          </DescriptionText>
          
          <ButtonContainer isTablet={isTablet}>
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
              testID="retry-test-button"
              variant="filled"
              isTablet={isTablet}
              onPress={onRetry}
            >
              <ModalButtonText variant="filled" isTablet={isTablet}>
                Retry Test
              </ModalButtonText>
            </ModalButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  )
}
