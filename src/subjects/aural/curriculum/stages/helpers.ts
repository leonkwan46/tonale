import { Lesson, Stage } from '../types';
import { stage0, stageZeroLessons } from './stageZero';

export const getLessonProgress = (
  lessonId: string,
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): { isLocked: boolean; stars?: number; isPassed?: boolean } => {
  return progressData[lessonId] ?? { isLocked: false, stars: undefined, isPassed: undefined }
}

export const allLessons = [
  ...stageZeroLessons
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
  const stage = allStagesData.find(s => s.id === stageId)
  if (!stage) return false
  
  const minOrder = Math.min(...allStagesData.map(s => s.order))

  if (stage.prerequisiteStages && stage.prerequisiteStages.length > 0) {
    return stage.prerequisiteStages.every(prereqId => {
      const prereqStage = allStagesData.find(s => s.id === prereqId)
      return prereqStage?.isCleared || false
    })
  }

  if (stage.order === minOrder) return true
  
  const previousStage = allStagesData.find(s => s.order === stage.order - 1)
  return previousStage?.isCleared || false
}

const createStageData = (): Stage[] => {
  const stageData: Stage[] = [stage0]
  
  stageData.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stageData)
  })
  
  return stageData
}

export const stagesArray = createStageData()

