import { Button3D } from '@/sharedComponents/Button3D'
import { Modal } from '@/sharedComponents/Modal'
import {
  ButtonContainer,
  DescriptionText,
  ModalButton,
  ModalButtonText
} from '@/sharedComponents/Modal/Modal.styles'
import {
  ButtonContent,
  ButtonText,
  ErrorTitleText,
  ModalIcon,
  SuccessTitleText
} from './FinalTestModal.styles'

const CONFIG = {
  success: {
    icon: '🎉',
    title: 'Congratulations!',
    description:
      'You\'ve passed the final test! Great work on mastering this stage.'
  },
  failure: {
    icon: '❌',
    title: 'Not quite yet!',
    description:
      'You\'ve reached the maximum wrong answers. Don\'t worry - practise makes perfect! Review the lessons and try again.'
  }
} as const

type FinalTestModalProps =
  | {
      visible: boolean
      variant: 'success'
      onContinue: () => void
      onRetry?: () => void
      onExit?: () => void
    }
  | {
      visible: boolean
      variant: 'failure'
      onContinue?: () => void
      onRetry: () => void
      onExit: () => void
    }

export const FinalTestModal = (props: FinalTestModalProps) => {
  const { visible, variant } = props
  const config = CONFIG[variant]
  const onRequestClose = variant === 'success' ? props.onContinue : props.onExit

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <ModalIcon>{config.icon}</ModalIcon>

      {variant === 'success' ? (
        <SuccessTitleText>{config.title}</SuccessTitleText>
      ) : (
        <ErrorTitleText>{config.title}</ErrorTitleText>
      )}

      <DescriptionText>{config.description}</DescriptionText>

      {variant === 'success' ? (
        <ButtonContainer singleButton={true}>
          <Button3D
            testID="continue-button"
            color="blue"
            fullWidth
            onPress={props.onContinue}
          >
            {() => (
              <ButtonContent>
                <ButtonText>Continue</ButtonText>
              </ButtonContent>
            )}
          </Button3D>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <ModalButton
            testID="exit-button"
            variant="outlined"
            onPress={props.onExit}
          >
            <ModalButtonText variant="outlined">Exit</ModalButtonText>
          </ModalButton>
          <ModalButton
            testID="retry-test-button"
            variant="filled"
            onPress={props.onRetry}
          >
            <ModalButtonText variant="filled">Retry Test</ModalButtonText>
          </ModalButton>
        </ButtonContainer>
      )}
    </Modal>
  )
}
