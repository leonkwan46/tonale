import React from 'react'
import { useDevice } from '../../hooks'
import {
  ButtonContainer,
  DescriptionText,
  FailureIcon,
  ModalButton,
  ModalButtonText,
  ModalContainer,
  ModalOverlay,
  TitleText
} from './FinalTestFailureModal.styles'
import { FinalTestFailureModalProps } from './types'

export const FinalTestFailureModal: React.FC<FinalTestFailureModalProps> = ({
  onRetry,
  onExit
}) => {
  const { isTablet } = useDevice()

  return (
    <ModalOverlay>
      <ModalContainer isTablet={isTablet}>
        <FailureIcon isTablet={isTablet}>❌</FailureIcon>
        
        <TitleText isTablet={isTablet}>
          Test Failed
        </TitleText>
        
        <DescriptionText isTablet={isTablet}>
          Sorry, you&apos;ve reached the maximum number of wrong answers. Don&apos;t worry, practice makes perfect! Review the lessons and try again.
        </DescriptionText>
        
        <ButtonContainer isTablet={isTablet}>
          <ModalButton
            variant="outlined"
            isTablet={isTablet}
            onPress={onExit}
          >
            <ModalButtonText variant="outlined" isTablet={isTablet}>
              Exit
            </ModalButtonText>
          </ModalButton>
          
          <ModalButton
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
  )
}
