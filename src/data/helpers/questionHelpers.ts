// Utility functions for generating questions

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

// Get Grade 1 appropriate options (filter out advanced concepts)
export const getGrade1NoteTypes = (): string[] => {
  return ['semibreve', 'minim', 'crochet', 'quaver', 'semiquaver']
}

export const getGrade1Accidentals = (): string[] => {
  return ['sharp', 'flat', 'natural']
}

export const getGrade1TimeSignatures = (): string[] => {
  return ['2/4', '3/4', '4/4']
}

export const getGrade1Keys = (): string[] => {
  return ['C major', 'G major', 'D major', 'F major']
}

// Get note names for Grade 1 (natural notes + basic accidentals)
export const getGrade1NoteNames = (): string[] => {
  return ['C', 'D', 'E', 'F', 'G', 'A', 'B']
}

// Shuffle array
export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5)
}
