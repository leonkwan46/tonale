import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'

interface WarningModalProps {
  visible: boolean
  onContinue: () => void
  onCancel: () => void
  title?: string
  description?: string
}

export const WarningModal = ({
  visible,
  onContinue,
  onCancel,
  title = 'Warning',
  description = 'You haven\'t earned stars on all lessons yet. Continue to the test anyway?'
}: WarningModalProps) => (
  <Modal visible={visible} onRequestClose={onCancel}>
    <Modal.Icon>⚠️</Modal.Icon>
    <Modal.Title>{title}</Modal.Title>
    <Modal.Description>{description}</Modal.Description>
    <Modal.Actions>
      <Button variant="outlined" size="sm" onPress={onCancel} label="Cancel" />
      <Button variant="filled" size="sm" onPress={onContinue} label="Continue" />
    </Modal.Actions>
  </Modal>
)
