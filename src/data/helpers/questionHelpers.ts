import { randomUUID } from 'expo-crypto'

export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

export const generateMultipleChoiceOptions = (
  allOptions: string[], 
  correctAnswer: string, 
  wrongChoicesCount: number = 3
): string[] => {
  const wrongChoices = allOptions
    .filter(option => option !== correctAnswer)
    .sort(() => Math.random() - 0.5)
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

// Select random items from an array, avoiding repeats of the previous two
export const selectRandomItems = <T>(
  items: T[],
  quantity: number,
  isSame: (item1: T, item2: T) => boolean
): T[] => {
  if (items.length === 0) {
    throw new Error('Cannot select from empty array')
  }
  
  if (items.length === 1) {
    return Array(quantity).fill(items[0])
  }
  
  const selected: T[] = []
  let pool = shuffleArray([...items])
  let poolIndex = 0
  
  const isDifferentFromRecent = (candidate: T, last?: T, secondLast?: T): boolean => {
    if (!last) return true
    if (isSame(candidate, last)) return false
    if (secondLast && isSame(candidate, secondLast)) return false
    return true
  }
  
  while (selected.length < quantity) {
    if (poolIndex >= pool.length) {
      pool = shuffleArray([...items])
      poolIndex = 0
    }
    
    const candidate = pool[poolIndex]
    const last = selected[selected.length - 1]
    const secondLast = selected[selected.length - 2]
    
    if (isDifferentFromRecent(candidate, last, secondLast)) {
      selected.push(candidate)
    }
    
    poolIndex++
  }
  
  return selected
}
