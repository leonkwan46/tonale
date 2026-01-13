import { useDevice } from '@/hooks'
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
  const { isTablet } = useDevice()

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <ModalOverlay>
        <ModalContainer isTablet={isTablet}>
          <WarningIcon isTablet={isTablet}>⚠️</WarningIcon>
          
          <TitleText isTablet={isTablet}>
            {title}
          </TitleText>
          
          <DescriptionText isTablet={isTablet}>
            {description}
          </DescriptionText>
          
          <ButtonContainer isTablet={isTablet}>
            <ModalButton
              variant="outlined"
              isTablet={isTablet}
              onPress={onCancel}
            >
              <ModalButtonText variant="outlined" isTablet={isTablet}>
                Cancel
              </ModalButtonText>
            </ModalButton>
            
            <ModalButton
              variant="filled"
              isTablet={isTablet}
              onPress={onContinue}
            >
              <ModalButtonText variant="filled" isTablet={isTablet}>
                Continue
              </ModalButtonText>
            </ModalButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  )
}
