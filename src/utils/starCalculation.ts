/**
 * Star Calculation Utility
 * Calculates star rating based on lesson performance
 */

export const calculateStars = (totalQuestions: number, wrongAnswers: number): number => {
  if (totalQuestions === 0) return 0
  
  const accuracy = (totalQuestions - wrongAnswers) / totalQuestions
  
  if (accuracy >= 0.85) return 3  // 85%+ accuracy = 3 stars
  if (accuracy >= 0.50) return 2  // 50-84% accuracy = 2 stars  
  if (accuracy >= 0.30) return 1  // 30-49% accuracy = 1 star
  return 0  // <30% accuracy = 0 stars
}

export const getStarMessage = (stars: number): string => {
  switch (stars) {
    case 3:
      return 'Perfect!'
    case 2:
      return 'Great job!'
    case 1:
      return 'Good effort!'
    default:
      return 'Keep practising!'
  }
}

export const getStarDescription = (stars: number, totalQuestions: number, wrongAnswers: number): string => {
  const correctAnswers = Math.max(0, totalQuestions - wrongAnswers)

  switch (stars) {
    case 3:
      return `You answered all ${totalQuestions} questions correctly!`
    case 2:
      return `You got ${correctAnswers} out of ${totalQuestions} right!`
    case 1:
      return `You got ${correctAnswers} out of ${totalQuestions} right.`
    default:
      return `You got ${correctAnswers} out of ${totalQuestions} right. Keep going!`
  }
}
