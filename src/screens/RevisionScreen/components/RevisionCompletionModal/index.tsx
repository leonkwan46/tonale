import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import {
  ButtonContainer,
  DescriptionText,
  TitleText
} from '@/compLib/Modal/Modal.styles'

interface RevisionCompletionModalProps {
  visible: boolean
  remainingQuestions: number
  onExit: () => void
  onRevise: () => void
}

export const RevisionCompletionModal = ({
  visible,
  remainingQuestions,
  onExit,
  onRevise
}: RevisionCompletionModalProps) => {
  const isAllComplete = remainingQuestions === 0

  return (
    <Modal visible={visible} onRequestClose={onExit} testID="revision-completion-modal">
      <TitleText testID="revision-completion-title">
        {isAllComplete ? 'Congratulations!' : 'Revision Complete!'}
      </TitleText>
      <DescriptionText testID="revision-completion-description">
        {isAllComplete
          ? 'You\'ve completed all your revision questions! Great job!'
          : `You have ${remainingQuestions} question${remainingQuestions !== 1 ? 's' : ''} left to revise.`}
      </DescriptionText>
      <ButtonContainer singleButton={isAllComplete}>
        {isAllComplete ? (
          <Button
            testID="done-button"
            variant="filled"
            size="sm"
            rowLayout="solo"
            onPress={onExit}
            label="Done!"
          />
        ) : (
          <>
            <Button
              testID="exit-button"
              variant="outlined"
              size="sm"
              rowLayout="pair"
              onPress={onExit}
              label="Exit"
            />
            <Button
              testID="revise-button"
              variant="filled"
              size="sm"
              rowLayout="pair"
              onPress={onRevise}
              label="Revise"
            />
          </>
        )}
      </ButtonContainer>
    </Modal>
  )
}

