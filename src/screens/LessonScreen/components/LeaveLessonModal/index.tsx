import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import {
  ButtonContainer,
  ButtonItem,
  DescriptionText,
  TitleText
} from '@/compLib/Modal/Modal.styles'

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
    <TitleText>Leave lesson?</TitleText>
    <DescriptionText>Your progress will be lost.</DescriptionText>
    <ButtonContainer>
      <ButtonItem grow>
        <Button
          variant="outlined"
          size="md"
          onPress={onStay}
          label="Stay"
        />
      </ButtonItem>
      <ButtonItem grow>
        <Button
          variant="filled"
          size="md"
          color="error"
          onPress={onLeave}
          label="Leave"
        />
      </ButtonItem>
    </ButtonContainer>
  </Modal>
)
