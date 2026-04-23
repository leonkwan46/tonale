import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useProgress } from '@/hooks'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { LessonHeader } from '../LessonScreen/LessonHeader'
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

  return (
    <ScreenContainer>
      {!hasQuestions && !completion.showModal ? (
        <>
          <View style={{ padding: 16, paddingTop: 12 }}>
            <Pressable onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={{ fontSize: 24, fontWeight: '600' }}>← Back</Text>
            </Pressable>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, textAlign: 'center' }}>Nothing to revise yet</Text>
            <Text style={{ fontSize: 14, textAlign: 'center', opacity: 0.7 }}>Keep going with your lessons! Difficult questions will appear here.</Text>
          </View>
        </>
      ) : (
        <>
          <LessonHeader
            lesson={null}
            currentQuestionIndex={revision.currentQuestionIndex}
            totalQuestions={revision.questions.length}
            wrongAnswersCount={0}
            onBackPress={() => router.back()}
            title="Revision"
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
        </>
      )}

      <RevisionCompletionModal
        visible={completion.showModal && completion.status === 'completed'}
        remainingQuestions={completion.remainingCount}
        masteredQuestions={completion.masteredCount ?? 0}
        onExit={handleExit}
        onRevise={handleRevise}
      />
    </ScreenContainer>
  )
}
