import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'

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
      <Modal.Icon>{config.icon}</Modal.Icon>

      <Modal.Title colorVariant={variant === 'success' ? 'success' : 'error'}>
        {config.title}
      </Modal.Title>

      <Modal.Description>{config.description}</Modal.Description>

      <Modal.Actions>
        {variant === 'failure' && (
          <Button
            testID="exit-button"
            variant="outlined"
            size="md"
            onPress={props.onExit}
            label="Exit"
          />
        )}
        <Button
          testID={variant === 'success' ? 'continue-button' : 'retry-test-button'}
          variant="filled"
          size={variant === 'success' ? 'sm' : 'md'}
          onPress={variant === 'success' ? props.onContinue : props.onRetry}
          label={variant === 'success' ? 'Continue' : 'Try Again'}
        />
      </Modal.Actions>
    </Modal>
  )
}
