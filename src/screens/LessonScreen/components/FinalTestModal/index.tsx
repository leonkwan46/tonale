import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import {
  ButtonItem,
  ButtonContainer,
  DescriptionText
} from '@/compLib/Modal/Modal.styles'
import {
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
    icon: '💪',
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
          <Button
            testID="continue-button"
            variant="filled"
            size="sm"
            onPress={props.onContinue}
            label="Continue"
          />
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <ButtonItem grow>
            <Button
              testID="exit-button"
              variant="outlined"
              size="md"
              onPress={props.onExit}
              label="Exit"
            />
          </ButtonItem>
          <ButtonItem grow>
            <Button
              testID="retry-test-button"
              variant="filled"
              size="md"
              onPress={props.onRetry}
              label="Try Again"
            />
          </ButtonItem>
        </ButtonContainer>
      )}
    </Modal>
  )
}
