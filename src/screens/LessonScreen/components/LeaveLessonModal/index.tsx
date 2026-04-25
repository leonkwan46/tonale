import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'

interface LeaveLessonModalProps {
  visible: boolean
  onStay: () => void
  onLeave: () => void
}

export const LeaveLessonModal = ({
  visible,
  onStay,
  onLeave
}: LeaveLessonModalProps) => (
  <Modal visible={visible} onRequestClose={onStay}>
    <Modal.Title>Leave lesson?</Modal.Title>
    <Modal.Description>Your progress will be lost.</Modal.Description>
    <Modal.Actions>
      <Button variant="outlined" size="md" onPress={onStay} label="Stay" />
      <Button variant="filled" size="md" color="error" onPress={onLeave} label="Leave" />
    </Modal.Actions>
  </Modal>
)
