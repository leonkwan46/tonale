import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import {
  ButtonItem,
  ButtonContainer,
  DescriptionText,
  TitleText
} from '@/compLib/Modal/Modal.styles'

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
      <TitleText testID="revision-completion-title">
        {isAllComplete ? 'Congratulations!' : 'Revision Complete!'}
      </TitleText>
      <DescriptionText testID="revision-completion-description">
        {isAllComplete
          ? 'You\'ve completed all your revision questions! Great job!'
          : `You have ${remainingQuestions} question${remainingQuestions !== 1 ? 's' : ''} left to revise.`}
      </DescriptionText>
      {masteredCount > 0 && (
        <DescriptionText>
          {`You mastered ${masteredCount} question${masteredCount !== 1 ? 's' : ''} this session! ⭐`}
        </DescriptionText>
      )}
      <ButtonContainer singleButton={isAllComplete}>
        {isAllComplete ? (
          <Button
            testID="done-button"
            variant="filled"
            size="sm"
            onPress={onExit}
            label="Done!"
          />
        ) : (
          <>
            <ButtonItem grow>
              <Button
                testID="exit-button"
                variant="outlined"
                size="sm"
                onPress={onExit}
                label="Exit"
              />
            </ButtonItem>
            <ButtonItem grow>
              <Button
                testID="revise-button"
                variant="filled"
                size="sm"
                onPress={onRevise}
                label="Revise"
              />
            </ButtonItem>
          </>
        )}
      </ButtonContainer>
    </Modal>
  )
}

