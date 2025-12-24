import { Lesson, Stage } from '../types'
import { stage1, stageOneLessons } from './stageOne'
import { stage2, stageTwoLessons } from './stageTwo'
import { stage0, stageZeroLessons } from './stageZero'

export const getLessonProgress = (
  lessonId: string,
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): { isLocked: boolean; stars?: number; isPassed?: boolean } => {
  return progressData[lessonId] ?? { isLocked: false, stars: undefined, isPassed: undefined }
}

export const allLessons = [
  ...stageZeroLessons,
  ...stageOneLessons,
  ...stageTwoLessons
]

export const getLessonWithProgress = (
  lessonId: string,
  progressData?: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | undefined => {
  const lesson = allLessons.find(l => l.id === lessonId)
  if (!lesson) return undefined
  
  if (!progressData) {
    // Return lesson without progress overlay if no progress data provided
    return lesson
  }
  
  const lessonProgress = getLessonProgress(lessonId, progressData)
  
  return {
    ...lesson,
    isLocked: lessonProgress.isLocked ?? lesson.isLocked ?? false,
    stars: lessonProgress.stars ?? lesson.stars,
    isPassed: lessonProgress.isPassed ?? lesson.isPassed
  }
}

export const calculateStageUnlockStatus = (stageId: string, allStagesData: Stage[]): boolean => {
  // Unlock all stages
  return true
}

const createStageData = (): Stage[] => {
  const stageData: Stage[] = [stage0, stage1, stage2]
  
  stageData.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stageData)
  })
  
  return stageData
}

export const stagesArray = createStageData()



