import { useProgress } from '@/hooks'
import { RevisionCompletionModal, ScreenContainer } from '@/sharedComponents'
import { useRouter } from 'expo-router'
import React from 'react'
import { LessonHeader } from '../LessonScreen/components/LessonHeader'
import { LessonScreenBody } from '../LessonScreen/LessonScreenBody'
import { useRevision } from './useRevision'

export const RevisionScreen: React.FC = () => {
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
          key={revision.viewResetKey}
          questions={revision.questions}
          currentQuestionIndex={revision.currentQuestionIndex}
          onAnswerSubmit={onAnswerSubmit}
          onNextQuestion={goToNextQuestion}
          onLessonComplete={completeRevision}
        />
      )}

      {completion.showModal && (
        <RevisionCompletionModal
          remainingQuestions={completion.remainingCount}
          onExit={handleExit}
          onRevise={handleRevise}
        />
      )}
    </ScreenContainer>
  )
}
