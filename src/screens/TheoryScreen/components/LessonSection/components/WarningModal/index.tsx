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
import { WarningIcon } from './WarningModal.styles'

interface WarningModalProps {
  isVisible: boolean
  onContinue: () => void
  onCancel: () => void
  title?: string
  description?: string
}

export const WarningModal = ({
  isVisible,
  onContinue,
  onCancel,
  title = 'Warning',
  description = 'Some lessons don\'t have any stars yet. Are you sure you want to continue?'
}: WarningModalProps) => {
  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <ModalOverlay>
        <ModalContainer>
          <WarningIcon>⚠️</WarningIcon>
          
          <TitleText>
            {title}
          </TitleText>
          
          <DescriptionText>
            {description}
          </DescriptionText>
          
          <ButtonContainer>
            <ModalButton
              variant="outlined"
              onPress={onCancel}
            >
              <ModalButtonText variant="outlined">
                Cancel
              </ModalButtonText>
            </ModalButton>
            
            <ModalButton
              variant="filled"
              onPress={onContinue}
            >
              <ModalButtonText variant="filled">
                Continue
              </ModalButtonText>
            </ModalButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  )
}
