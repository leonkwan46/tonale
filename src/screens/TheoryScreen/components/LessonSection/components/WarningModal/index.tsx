import { Modal } from '@/sharedComponents/Modal'
import {
  ButtonContainer,
  DescriptionText,
  ModalButton,
  ModalButtonText,
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
  description = 'You haven\'t earned stars on all lessons yet. Continue to the test anyway?'
}: WarningModalProps) => {
  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCancel}
    >
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
    </Modal>
  )
}
