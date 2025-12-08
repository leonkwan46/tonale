import type { Question, VisualComponent } from '@types'
import type { FailedQuestion } from '@types'

export function failedQuestionToQuestion(failedQuestion: FailedQuestion): Question {
  return {
    id: failedQuestion.id,
    question: failedQuestion.question,
    correctAnswer: failedQuestion.correctAnswer,
    choices: failedQuestion.choices,
    explanation: failedQuestion.explanation,
    type: failedQuestion.type,
    visualComponent: failedQuestion.visualComponent as VisualComponent | undefined
  }
}
