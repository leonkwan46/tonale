import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
import { createNoteValueNameQuestions } from './noteValueName'
import { createRestValueNameQuestions } from './restValueName'

export const createNoteRestValueQuestions = (count: number, stage: StageNumber, layoutType?: 'grid' | 'row'): Question[] => {
  const halfCount = Math.floor(count / 2)
  const remaining = count - (halfCount * 2)
  const questions: Question[] = []
  questions.push(...createNoteValueNameQuestions(halfCount + (remaining > 0 ? 1 : 0), stage, layoutType))
  questions.push(...createRestValueNameQuestions(halfCount + (remaining > 1 ? 1 : 0), stage, layoutType))
  return questions
}

