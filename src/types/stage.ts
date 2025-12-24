import type { StageLesson } from './lesson'

export type StageNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface Stage {
  id: string
  title: string
  lessons: StageLesson[]
  isCleared: boolean
  isUnlocked: boolean
  totalStars: number
  order: number
  prerequisiteStages?: string[]
}
