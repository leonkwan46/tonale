import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useProgressStore } from '@/stores/progressStore'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { LessonHeader } from '../LessonScreen/LessonHeader'
import { LessonScreenBody } from '../LessonScreen/LessonScreenBody'
import { RevisionCompletionModal } from './components/RevisionCompletionModal'
import { RevisionEmptyMessage } from './RevisionScreen.styles'
import { useRevision } from './useRevision'

export const RevisionScreen = () => {
  const router = useRouter()
  const revisionQuestions = useProgressStore(s => s.revisionQuestions)
  const refreshRevisionQuestions = useProgressStore(s => s.refreshRevisionQuestions)
  const {
    revision,
    completion,
    hasQuestions,
    currentQuestion,
    onAnswerSubmit,
    goToNextQuestion,
    completeRevision,
    handleExit,
    handleRevise
  } = useRevision({
    revisionQuestions,
    refreshRevisionQuestions,
    onExit: () => router.back()
  })

  const [showExplanationModal, setShowExplanationModal] = useState(false)

  const handleShowExplanation = useCallback(() => setShowExplanationModal(true), [])
  const handleHideExplanation = useCallback(() => setShowExplanationModal(false), [])

  const handleBackPress = useCallback(() => {
    if (!hasQuestions) {
      router.back()
      return
    }
    Alert.alert(
      'Leave revision?',
      'Your progress will be lost.',
      [
        { text: 'Stay', style: 'cancel' },
        { text: 'Leave', style: 'destructive', onPress: () => router.back() }
      ]
    )
  }, [hasQuestions, router])

  if (!hasQuestions && !completion.showModal) {
    return (
      <ScreenContainer>
        <LessonHeader
          lesson={null}
          currentQuestionIndex={0}
          totalQuestions={0}
          wrongAnswersCount={0}
          onBackPress={() => router.back()}
        />
        <RevisionEmptyMessage size="md" align="center">
          Nothing to revise yet. Keep going with your lessons!
        </RevisionEmptyMessage>
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer>
      <LessonHeader
        lesson={null}
        currentQuestionIndex={revision.currentQuestionIndex}
        totalQuestions={revision.questions.length}
        wrongAnswersCount={0}
        onBackPress={handleBackPress}
      />

      {hasQuestions && currentQuestion && (
        <LessonScreenBody
          key={revision.viewResetKey}
          questions={revision.questions}
          currentQuestionIndex={revision.currentQuestionIndex}
          onAnswerSubmit={onAnswerSubmit}
          onNextQuestion={goToNextQuestion}
          onLessonComplete={completeRevision}
          showExplanationModal={showExplanationModal}
          onShowExplanation={handleShowExplanation}
          onHideExplanation={handleHideExplanation}
        />
      )}

      <RevisionCompletionModal
        visible={completion.showModal && completion.status === 'completed'}
        remainingQuestions={completion.remainingCount}
        masteredCount={completion.masteredCount}
        onExit={handleExit}
        onRevise={handleRevise}
      />
    </ScreenContainer>
  )
}
