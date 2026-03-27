import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import {
  ButtonContainer,
  DescriptionText,
  TitleText
} from '@/compLib/Modal/Modal.styles'
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
        <Button
          variant="outlined"
          size="sm"
          rowLayout="pair"
          onPress={onCancel}
          label="Cancel"
        />

        <Button
          variant="filled"
          size="sm"
          rowLayout="pair"
          onPress={onContinue}
          label="Continue"
        />
      </ButtonContainer>
    </Modal>
  )
}
