import { stageTwoLessons } from '../lessons/stageTwoLessons'
import { Stage, StageLesson } from '../types'

// Helper function to calculate stage statistics
const calculateStageStats = (lessons: typeof stageTwoLessons) => {
  const regularLessons = lessons.filter(lesson => !lesson.isFinalTest)
  const finalTest = lessons.find(lesson => lesson.isFinalTest)
  
  const totalStars = regularLessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  
  // Stage is cleared if final test is passed (final test is the ultimate gatekeeper)
  const finalTestPassed = finalTest ? (finalTest.isPassed === true) : true // No final test = automatically passed
  const isCleared = finalTestPassed
  
  return { totalStars, isCleared }
}

export const stage2: Stage = {
  id: 'stage-2',
  title: 'Harmony and Chord Theory',
  description: 'Dive deeper into harmonic relationships and chord progressions',
  lessons: stageTwoLessons.map(lesson => ({ ...lesson, stageId: 'stage-2' } as StageLesson)),
  order: 2,
  prerequisiteStages: ['stage-1'],
  isUnlocked: false, // Will be calculated
  themeColor: '#7B68EE',
  ...calculateStageStats(stageTwoLessons)
}
