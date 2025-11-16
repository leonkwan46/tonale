import { randomUUID } from 'expo-crypto'

export const getRandomItem = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

export const generateWrongChoices = (
  allOptions: string[], 
  correctAnswer: string, 
  wrongChoicesCount: number = 3,
  preserveOrder: boolean = false
): string[] => {
  if (preserveOrder) return allOptions
  
  const wrongChoices = shuffleArray(allOptions
    .filter(option => option !== correctAnswer)
    .sort((a, b) => a.localeCompare(b))
  )
    .slice(0, wrongChoicesCount)
  
  return [...wrongChoices, correctAnswer]
    .sort(() => Math.random() - 0.5)
}

export const generateQuestionId = (prefix: string): string => {
  return `${prefix}-${randomUUID()}`
}

export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5)
}

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
