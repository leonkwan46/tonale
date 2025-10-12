import { stageThreeLessons } from '../lessons/stageThreeLessons'
import { Stage, StageLesson } from '../types'

// Helper function to calculate stage statistics
const calculateStageStats = (lessons: typeof stageThreeLessons) => {
  const regularLessons = lessons.filter(lesson => !lesson.isFinalTest)
  const finalTest = lessons.find(lesson => lesson.isFinalTest)
  
  const totalStars = regularLessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  
  // Stage is cleared if final test is passed (final test is the ultimate gatekeeper)
  const finalTestPassed = finalTest ? (finalTest.isPassed === true) : true // No final test = automatically passed
  const isCleared = finalTestPassed
  
  return { totalStars, isCleared }
}

export const stage3: Stage = {
  id: 'stage-3',
  title: 'Advanced Composition',
  description: 'Master complex harmonic concepts and composition techniques',
  lessons: stageThreeLessons.map(lesson => ({ ...lesson, stageId: 'stage-3' } as StageLesson)),
  order: 3,
  prerequisiteStages: ['stage-2'],
  isUnlocked: false, // Will be calculated
  themeColor: '#FF6B6B',
  ...calculateStageStats(stageThreeLessons)
}
