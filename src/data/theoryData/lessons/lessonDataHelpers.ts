import { stagesArray } from '../stages/stageDataHelpers'
import { stage1 } from '../stages/stageOne'
import { stage3 } from '../stages/stageThree'
import { stage2 } from '../stages/stageTwo'
import { getLessonProgress } from '../theoryDataHelpers'
import { Lesson, StageLesson } from '../types'
import { stageOneLessons } from './stageOneLessons'
import { stageThreeLessons } from './stageThreeLessons'
import { stageTwoLessons } from './stageTwoLessons'

// ============================================================================
// LESSON DATA INITIALIZATION
// ============================================================================

// Export all lessons for easy access (without stageId for API compatibility)
export const allLessons = [...stageOneLessons, ...stageTwoLessons, ...stageThreeLessons]

// Export all lessons with stage context for internal use
export const allStageLessons: StageLesson[] = [
  ...stage1.lessons,
  ...stage2.lessons,
  ...stage3.lessons
]

// ============================================================================
// LESSON DATA ACCESS FUNCTIONS
// ============================================================================

// Get lesson with current progress data
export const getLessonWithProgress = (lessonId: string): Lesson | undefined => {
  const staticLesson = allLessons.find(lesson => lesson.id === lessonId)
  const progressData = getLessonProgress(lessonId)
  
  if (!staticLesson) return undefined
  
  return {
    ...staticLesson,
    isLocked: progressData.isLocked,  // Always provided by progress system
    stars: progressData.stars         // Always provided by progress system
  }
}

export const getLessonById = (id: string): Lesson | undefined => {
  return getLessonWithProgress(id)
}

export const getStageLessonById = (id: string): StageLesson | undefined => {
  const lesson = getLessonWithProgress(id)
  if (!lesson) return undefined
  
  // Find which stage this lesson belongs to
  const stage = stagesArray.find(s => 
    s.lessons.some(l => l.id === id)
  )
  
  return {
    ...lesson,
    stageId: stage?.id || ''
  }
}
