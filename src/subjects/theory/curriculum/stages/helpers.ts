import { calculateStageUnlockStatus, getLessonWithProgress as getLessonWithProgressGeneric } from '@/subjects/curriculumHelper'
import type { Lesson, Stage } from '../types'
import { stage1, stageOneLessons } from './stageOne'
import { stage2, stageTwoLessons } from './stageTwo'
import { stage0, stageZeroLessons } from './stageZero'

export const allLessons = [
  ...stageZeroLessons,
  ...stageOneLessons,
  ...stageTwoLessons
]

export const getTheoryLessonWithProgress = (
  lessonId: string,
  progressData?: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | undefined => {
  return getLessonWithProgressGeneric(lessonId, allLessons, progressData)
}

const createStageData = (): Stage[] => {
  const stageData: Stage[] = [stage0, stage1, stage2]
  
  stageData.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stageData)
  })
  
  return stageData
}

export const stagesArray = createStageData()



