import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import {
  ButtonItem,
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
        <ButtonItem grow>
          <Button
            variant="outlined"
            size="sm"
            onPress={onCancel}
            label="Cancel"
          />
        </ButtonItem>

        <ButtonItem grow>
          <Button
            variant="filled"
            size="sm"
            onPress={onContinue}
            label="Continue"
          />
        </ButtonItem>
      </ButtonContainer>
    </Modal>
  )
}
