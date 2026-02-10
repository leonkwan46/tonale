import type { Lesson, Stage } from '@types'

export const getLessonProgress = (
  lessonId: string,
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): { isLocked: boolean; stars?: number; isPassed?: boolean } => {
  return progressData[lessonId] ?? { isLocked: false, stars: undefined, isPassed: undefined }
}

export const getLessonWithProgress = (
  lessonId: string,
  allLessons: Lesson[],
  progressData?: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | undefined => {
  const lesson = allLessons.find(l => l.id === lessonId)
  if (!lesson) return undefined
  
  if (!progressData) {
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

/**
 * Calculate if a stage should be unlocked
 * 
 * Rules:
 * - Stage 0 is always unlocked
 * - Stages with prerequisiteStages are unlocked when all prerequisite stages' final tests are passed
 * - Stages without prerequisiteStages (except stage 0) are locked
 */
export const calculateStageUnlockStatus = (stageId: string, allStagesData: Stage[]): boolean => {
  const stage = allStagesData.find(s => s.id === stageId)
  if (!stage) return false

  if (stage.order === 0) {
    return true
  }

  if (!stage.prerequisiteStages || stage.prerequisiteStages.length === 0) {
    return false
  }

  return stage.prerequisiteStages.every(prereqStageId => {
    const prereqStage = allStagesData.find(s => s.id === prereqStageId)
    if (!prereqStage) return false

    const finalTest = prereqStage.lessons.find(lesson => lesson.isFinalTest)
    
    if (!finalTest) return true
    
    return finalTest.isPassed === true
  })
}

export const calculateStageStats = <T extends Lesson>(lessons: T[]): { totalStars: number; isCleared: boolean } => {
  const regularLessons = lessons.filter(lesson => !lesson.isFinalTest)
  const finalTest = lessons.find(lesson => lesson.isFinalTest)
  
  const totalStars = regularLessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  
  const finalTestPassed = finalTest ? (finalTest.isPassed === true) : true
  const isCleared = finalTestPassed
  
  return { totalStars, isCleared }
}

/**
 * Get the next locked stage after merging progress data and recalculating unlock status
 * Returns undefined if all stages are unlocked
 */
export const getNextLockedStage = (
  stages: Stage[],
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Stage | undefined => {
  // Merge progress data into stages
  const stagesWithProgress = stages.map(stage => ({
    ...stage,
    lessons: stage.lessons.map(lesson => {
      const lessonProgress = progressData[lesson.id]
      return {
        ...lesson,
        isPassed: lessonProgress?.isPassed ?? lesson.isPassed
      }
    })
  }))
  
  // Recalculate unlock status for all stages
  stagesWithProgress.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stagesWithProgress)
  })
  
  // Find next locked stage
  return stagesWithProgress
    .filter(stage => !stage.isUnlocked)
    .sort((a, b) => a.order - b.order)[0]
}
