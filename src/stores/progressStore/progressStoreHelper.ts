import { calculateStageUnlockStatus } from '@/subjects/curriculumHelper'
import { stagesArray } from '@/subjects/theory/curriculum/stages/helpers'
import type { Stage } from '@types'

import type { ProgressData, ProgressState, StageRequirements } from './progressTypes'

export const computeStages = (
  progressData: Record<string, ProgressData>
): Stage[] => {
  const stagesWithLessons = stagesArray.map(stage => {
    const lessons = stage.lessons.map(lesson => {
      const lessonProgress = progressData[lesson.id]
      return {
        ...lesson,
        isLocked: lessonProgress ? lessonProgress.isLocked : (lesson.isLocked ?? false),
        stars: lessonProgress?.stars,
        isPassed: lessonProgress?.isPassed
      }
    })
    const regularLessons = lessons.filter(l => !l.isFinalTest)
    const finalTest = lessons.find(l => l.isFinalTest)
    const totalStars = regularLessons.reduce((sum, l) => sum + (l.stars || 0), 0)
    const isCleared = finalTest ? (finalTest.isPassed === true) : false
    return { ...stage, lessons, totalStars, isCleared }
  })

  return stagesWithLessons.map(stage => {
    const isUnlocked = calculateStageUnlockStatus(stage.id, stagesWithLessons)
    const lessons = isUnlocked
      ? stage.lessons
      : stage.lessons.map(l => ({ ...l, isLocked: true }))
    return { ...stage, isUnlocked, lessons }
  })
}

export const convertLessonsData = (
  lessonsData: Record<string, { stars?: number; isPassed?: boolean }>
): Record<string, ProgressData> =>
  Object.keys(lessonsData).reduce((acc, lessonId) => {
    acc[lessonId] = { isLocked: false, ...lessonsData[lessonId] }
    return acc
  }, {} as Record<string, ProgressData>)

export const computeStageRequirements = (
  stages: Stage[],
  stageId: string
): StageRequirements => {
  const stage = stages.find(s => s.id === stageId)
  if (!stage) return { isUnlocked: false, missingPrerequisites: [], progressNeeded: [] }

  const missingPrerequisites: Stage[] = []
  const progressNeeded: string[] = []

  stage.prerequisiteStages?.forEach(prereqId => {
    const prereqStage = stages.find(s => s.id === prereqId)
    if (prereqStage && !prereqStage.isCleared) {
      missingPrerequisites.push(prereqStage)
      const lessonsWithoutStars = prereqStage.lessons.filter(l => l.stars === 0)
      if (lessonsWithoutStars.length > 0) {
        progressNeeded.push(`Complete ${lessonsWithoutStars.length} lesson(s) in ${prereqStage.title}`)
      }
    }
  })

  return { isUnlocked: stage.isUnlocked, missingPrerequisites, progressNeeded }
}
