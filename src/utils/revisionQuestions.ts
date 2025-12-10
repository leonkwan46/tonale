import type { Question, RevisionQuestion, VisualComponent } from '@types'

export function revisionQuestionToQuestion(revisionQuestion: RevisionQuestion): Question {
  return {
    id: revisionQuestion.id,
    question: revisionQuestion.question,
    correctAnswer: revisionQuestion.correctAnswer,
    choices: revisionQuestion.choices,
    explanation: revisionQuestion.explanation,
    type: revisionQuestion.type,
    visualComponent: revisionQuestion.visualComponent as VisualComponent | undefined
  }
}
