export interface StarRatingModalProps {
  stars: number
  totalQuestions: number
  wrongAnswers: number
  onContinue: () => void
  onRetry: () => void
}
