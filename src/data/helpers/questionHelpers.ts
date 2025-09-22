// General utility functions for generating questions
// Get random item from array
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

// Generate wrong choices for multiple choice questions
export const generateWrongChoices = (
  allOptions: string[], 
  correctAnswer: string, 
  count: number = 3
): string[] => {
  const wrongChoices = allOptions
    .filter(option => option !== correctAnswer)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
  
  return [...wrongChoices, correctAnswer]
    .sort(() => Math.random() - 0.5)
}

// Generate unique question ID
export const generateQuestionId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Shuffle array
export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5)
}
