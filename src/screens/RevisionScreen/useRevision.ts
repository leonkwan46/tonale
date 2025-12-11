import {
  deleteRevisionQuestionsFn,
  storeRevisionQuestionsFn
} from '@/config/firebase/functions/revisionQuestions'
import { playLessonFinishedSound } from '@/utils/soundUtils'
import type { RevisionQuestion, StoreRevisionQuestionPayload } from '@types'
import { useCallback, useEffect, useMemo, useState } from 'react'

const CORRECT_STREAK_THRESHOLD = 2

type CompletionStatus = 'idle' | 'completing' | 'completed'

interface RevisionState {
  questions: RevisionQuestion[]
  counts: Record<string, number>
  currentQuestionIndex: number
  viewResetKey: number
}

interface RestartState {
  questions: RevisionQuestion[]
  counts: Record<string, number>
}

interface CompletionState {
  status: CompletionStatus
  showModal: boolean
  remainingCount: number
}

interface UseRevisionParams {
  revisionQuestions?: RevisionQuestion[]
  refreshRevisionQuestions: () => Promise<void>
  onExit: () => void
}

export const useRevision = ({
  revisionQuestions,
  refreshRevisionQuestions,
  onExit
}: UseRevisionParams) => {
  const buildCountsMap = useCallback((items: RevisionQuestion[]) => {
    return items.reduce<Record<string, number>>((acc, question) => {
      acc[question.id] = question.correctCount ?? 0
      return acc
    }, {})
  }, [])

  const [revision, setRevision] = useState<RevisionState>(() => {
    const initialQuestions = revisionQuestions || []
    return {
      questions: initialQuestions,
      counts: buildCountsMap(initialQuestions),
      currentQuestionIndex: 0,
      viewResetKey: 0
    }
  })

  const [restart, setRestart] = useState<RestartState>(() => {
    const initialQuestions = revisionQuestions || []
    return {
      questions: initialQuestions,
      counts: buildCountsMap(initialQuestions)
    }
  })

  const [completion, setCompletion] = useState<CompletionState>({
    status: 'idle',
    showModal: false,
    remainingCount: 0
  })

  useEffect(() => {
    if (completion.showModal || completion.status === 'completing') return

    const nextQuestions = revisionQuestions || []
    const snapshotCounts = buildCountsMap(nextQuestions)

    setRestart({ questions: nextQuestions, counts: snapshotCounts })
    setRevision(prev => ({
      questions: nextQuestions,
      counts: snapshotCounts,
      currentQuestionIndex: 0,
      viewResetKey: prev.viewResetKey + 1
    }))
    setCompletion(prev => ({
      ...prev,
      status: 'idle'
    }))
  }, [revisionQuestions, buildCountsMap, completion.showModal, completion.status])

  const updatedCountForQuestion = useCallback(
    (question: RevisionQuestion): number => {
      return revision.counts[question.id] ?? question.correctCount ?? 0
    },
    [revision.counts]
  )

  const onAnswerSubmit = useCallback(
    (isCorrect: boolean) => {
      const currentQuestion = revision.questions[revision.currentQuestionIndex]
      if (!currentQuestion) return

      const currentCount = updatedCountForQuestion(currentQuestion)
      const nextCount = isCorrect ? currentCount + 1 : Math.max(0, currentCount - 1)

      setRevision(prev => ({
        ...prev,
        counts: {
          ...prev.counts,
          [currentQuestion.id]: nextCount
        }
      }))
    },
    [revision.questions, revision.currentQuestionIndex, updatedCountForQuestion]
  )

  const updateRevision = useCallback(async () => {
    const toUpdate: StoreRevisionQuestionPayload[] = []
    const toDelete: string[] = []
    const remainingQuestions: RevisionQuestion[] = []

    revision.questions.forEach(question => {
      const updatedCount = updatedCountForQuestion(question)
      const initialCount = restart.counts[question.id] ?? question.correctCount ?? 0

      if (updatedCount >= CORRECT_STREAK_THRESHOLD) {
        toDelete.push(question.id)
        return
      }

      const questionWithUpdatedCount = { ...question, correctCount: updatedCount }
      remainingQuestions.push(questionWithUpdatedCount)

      if (updatedCount !== initialCount) {
        toUpdate.push(questionWithUpdatedCount)
      }
    })

    if (toUpdate.length > 0) {
      await storeRevisionQuestionsFn({ questions: toUpdate })
    }

    if (toDelete.length > 0) {
      await deleteRevisionQuestionsFn({ ids: toDelete })
    }

    await refreshRevisionQuestions()

    const refreshedCounts = buildCountsMap(remainingQuestions)
    setRevision(prev => ({
      ...prev,
      counts: refreshedCounts
    }))

    return remainingQuestions.length
  }, [revision.questions, updatedCountForQuestion, refreshRevisionQuestions, buildCountsMap, restart.counts])

  const completeRevision = useCallback(async () => {
    if (completion.status !== 'idle') return

    setCompletion(prev => ({ ...prev, status: 'completing' }))

    try {
      const remaining = await updateRevision()
      setCompletion({
        status: 'completed',
        showModal: true,
        remainingCount: remaining ?? 0
      })
      playLessonFinishedSound()
    } catch (error) {
      console.error('Failed to complete revision:', error)
    } finally {
      setCompletion(prev => ({
        ...prev,
        status: prev.status === 'completed' ? 'completed' : 'idle'
      }))
    }
  }, [completion.status, updateRevision])

  const restartRevision = useCallback(() => {
    setRevision(prev => ({
      questions: restart.questions,
      counts: restart.counts,
      currentQuestionIndex: 0,
      viewResetKey: prev.viewResetKey + 1
    }))
    setCompletion({
      status: 'idle',
      showModal: false,
      remainingCount: 0
    })
  }, [restart])

  const goToNextQuestion = useCallback(() => {
    if (completion.status === 'completed' || completion.showModal) return

    if (revision.currentQuestionIndex < revision.questions.length - 1) {
      setRevision(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }))
    }
  }, [completion.showModal, completion.status, revision.currentQuestionIndex, revision.questions.length])

  const handleExit = useCallback(() => {
    setCompletion(prev => ({ ...prev, showModal: false }))
    onExit()
  }, [onExit])

  const handleRevise = useCallback(() => {
    restartRevision()
  }, [restartRevision])

  const hasQuestions = useMemo(() => revision.questions.length > 0, [revision.questions.length])
  const currentQuestion = hasQuestions ? revision.questions[revision.currentQuestionIndex] : null

  return {
    revision,
    completion,
    hasQuestions,
    currentQuestion,
    onAnswerSubmit,
    goToNextQuestion,
    completeRevision,
    handleExit,
    handleRevise
  }
}
