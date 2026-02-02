import { Button3D } from '@/sharedComponents/Button3D'
import { Modal } from '@/sharedComponents/Modal'
import {
    ButtonContainer,
    DescriptionText
} from '@/sharedComponents/Modal/Modal.styles'
import { ButtonContent, ButtonText, SuccessIcon, SuccessTitleText } from './FinalTestSuccessModal.styles'

interface FinalTestSuccessModalProps {
  visible: boolean
  onContinue: () => void
}

export const FinalTestSuccessModal = ({
  visible,
  onContinue
}: FinalTestSuccessModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onContinue}>
      <SuccessIcon>🎉</SuccessIcon>
      
      <SuccessTitleText>
        Congratulations!
      </SuccessTitleText>

      <DescriptionText>
        You&apos;ve passed the final test! Great work on mastering this stage.
      </DescriptionText>
      
      <ButtonContainer singleButton={true}>
        <Button3D
          testID="continue-button"
          color="blue"
          fullWidth
          onPress={onContinue}
        >
          {() => (
            <ButtonContent>
              <ButtonText>
                Continue
              </ButtonText>
            </ButtonContent>
          )}
        </Button3D>
      </ButtonContainer>
    </Modal>
  )
}
