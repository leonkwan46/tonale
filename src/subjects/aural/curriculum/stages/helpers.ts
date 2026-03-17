import { calculateStageUnlockStatus, getLessonWithProgress } from '@/subjects/curriculumHelper'
import type { Lesson, Stage } from '../types'
import { stage0, stageZeroLessons } from './stageZero'

export const allAuralLessons = [...stageZeroLessons]

const auralStageList: Stage[] = [stage0]
auralStageList.forEach(stage => {
  stage.isUnlocked = calculateStageUnlockStatus(stage.id, auralStageList)
})
export const auralStagesArray = auralStageList

export const getAuralLessonWithProgress = (
  lessonId: string,
  progressData?: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | undefined => {
  return getLessonWithProgress(lessonId, allAuralLessons, progressData)
}
