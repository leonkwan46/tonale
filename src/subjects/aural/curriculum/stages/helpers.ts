import type { Lesson, Stage } from '../types'
import { stage1, stageOneLessons } from './stageOne'
import { stage2, stageTwoLessons } from './stageTwo'
import { stage0, stageZeroLessons } from './stageZero'

/**
 * Get lesson progress data
 */
export const getAuralLessonProgress = (
  lessonId: string,
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): { isLocked: boolean; stars?: number; isPassed?: boolean } => {
  return progressData[lessonId] ?? { isLocked: false, stars: undefined, isPassed: undefined }
}

/**
 * All aural lessons across all stages
 */
export const allAuralLessons = [
  ...stageZeroLessons,
  ...stageOneLessons,
  ...stageTwoLessons
]

/**
 * Get aural lesson with progress overlay
 */
export const getAuralLessonWithProgress = (
  lessonId: string,
  progressData?: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | undefined => {
  const lesson = allAuralLessons.find(l => l.id === lessonId)
  if (!lesson) return undefined

  if (!progressData) {
    // Return lesson without progress overlay if no progress data provided
    return lesson
  }

  const lessonProgress = getAuralLessonProgress(lessonId, progressData)

  return {
    ...lesson,
    isLocked: lessonProgress.isLocked ?? lesson.isLocked ?? false,
    stars: lessonProgress.stars ?? lesson.stars,
    isPassed: lessonProgress.isPassed ?? lesson.isPassed
  }
}

/**
 * Calculate if a stage should be unlocked
 */
export const calculateAuralStageUnlockStatus = (stageId: string, allStagesData: Stage[]): boolean => {
  // For now, unlock all stages (can be modified later for progressive unlock)
  return true
}

/**
 * Create stage data with unlock status
 */
const createAuralStageData = (): Stage[] => {
  const stageData: Stage[] = [stage0, stage1, stage2]

  stageData.forEach(stage => {
    stage.isUnlocked = calculateAuralStageUnlockStatus(stage.id, stageData)
  })

  return stageData
}

/**
 * Get all aural stages
 */
export const getAllAuralStages = (): Stage[] => {
  return createAuralStageData()
}

/**
 * Get specific aural stage by ID
 */
export const getAuralStage = (stageId: string): Stage | undefined => {
  const stages = getAllAuralStages()
  return stages.find(stage => stage.id === stageId)
}
