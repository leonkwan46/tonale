import { useProgress } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { LessonHeader } from '../LessonScreen/components/LessonHeader'
import { LessonScreenBody } from '../LessonScreen/LessonScreenBody'
import { RevisionCompletionModal } from './components/RevisionCompletionModal'
import { useRevision } from './useRevision'

export const RevisionScreen = () => {
  const router = useRouter()
  const { revisionQuestions, refreshRevisionQuestions } = useProgress()
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

  if (!hasQuestions && !completion.showModal) return null

  return (
    <ScreenContainer>
      <LessonHeader
        lesson={null}
        currentQuestionIndex={revision.currentQuestionIndex}
        totalQuestions={revision.questions.length}
        wrongAnswersCount={0}
        onBackPress={() => router.back()}
      />

      {hasQuestions && currentQuestion && (
        <LessonScreenBody
          questions={revision.questions}
          currentQuestionIndex={revision.currentQuestionIndex}
          onAnswerSubmit={onAnswerSubmit}
          onNextQuestion={goToNextQuestion}
          onLessonComplete={completeRevision}
        />
      )}

      <RevisionCompletionModal
        visible={completion.showModal}
        remainingQuestions={completion.remainingCount}
        onExit={handleExit}
        onRevise={handleRevise}
      />
    </ScreenContainer>
  )
}
