import React from 'react'
import { Modal } from 'react-native'
import { useDevice } from '../../hooks'
import {
    ButtonContainer,
    DescriptionText,
    ModalButton,
    ModalButtonText,
    ModalContainer,
    ModalOverlay,
    TitleText,
    WarningIcon
} from './WarningModal.styles'
import { WarningModalProps } from './types'

export const WarningModal: React.FC<WarningModalProps> = ({
  isVisible,
  onContinue,
  onCancel,
  title = 'Warning',
  description = 'Some lessons don\'t have any stars yet. Are you sure you want to continue?'
}) => {
  const { isTablet } = useDevice()

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
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
