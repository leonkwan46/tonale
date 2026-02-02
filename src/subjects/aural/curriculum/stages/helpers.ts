import { calculateStageUnlockStatus, getLessonWithProgress as getLessonWithProgressGeneric } from '@/subjects/curriculumHelper'
import type { Lesson, Stage } from '../types'
import { stage0, stageZeroLessons } from './stageZero'

/**
 * All aural lessons across all stages
 */
export const allAuralLessons = [
  ...stageZeroLessons
]

/**
 * Get aural lesson with progress overlay
 */
export const getAuralLessonWithProgress = (
  lessonId: string,
  progressData?: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | undefined => {
  return getLessonWithProgressGeneric(lessonId, allAuralLessons, progressData)
}

/**
 * Create stage data with unlock status
 */
const createAuralStageData = (): Stage[] => {
  const stageData: Stage[] = [stage0]

  stageData.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stageData)
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
