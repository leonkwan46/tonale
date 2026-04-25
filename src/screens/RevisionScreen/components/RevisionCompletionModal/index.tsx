import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'

interface RevisionCompletionModalProps {
  visible: boolean
  remainingQuestions: number
  masteredCount: number
  onExit: () => void
  onRevise: () => void
}

export const RevisionCompletionModal = ({
  visible,
  remainingQuestions,
  masteredCount,
  onExit,
  onRevise
}: RevisionCompletionModalProps) => {
  const isAllComplete = remainingQuestions === 0

  return (
    <Modal visible={visible} onRequestClose={onExit} testID="revision-completion-modal">
      <Modal.Title testID="revision-completion-title">
        {isAllComplete ? 'Congratulations!' : 'Revision Complete!'}
      </Modal.Title>
      <Modal.Description testID="revision-completion-description">
        {isAllComplete
          ? 'You\'ve completed all your revision questions! Great job!'
          : `You have ${remainingQuestions} question${remainingQuestions !== 1 ? 's' : ''} left to revise.`}
      </Modal.Description>
      {masteredCount > 0 && (
        <Modal.Description>
          {`You mastered ${masteredCount} question${masteredCount !== 1 ? 's' : ''} this session! ⭐`}
        </Modal.Description>
      )}
      <Modal.Actions>
        {!isAllComplete && (
          <Button
            testID="exit-button"
            variant="outlined"
            size="md"
            onPress={onExit}
            label="Exit"
          />
        )}
        <Button
          testID={isAllComplete ? 'done-button' : 'revise-button'}
          variant="filled"
          size="md"
          onPress={isAllComplete ? onExit : onRevise}
          label={isAllComplete ? 'Done!' : 'Revise'}
        />
      </Modal.Actions>
    </Modal>
  )
}
