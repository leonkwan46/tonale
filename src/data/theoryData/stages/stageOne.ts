import { stageOneLessons } from '../lessons/stageOneLessons'
import { Stage, StageLesson } from '../types'

// Helper function to calculate stage statistics
const calculateStageStats = (lessons: typeof stageOneLessons) => {
  const regularLessons = lessons.filter(lesson => !lesson.isFinalTest)
  const finalTest = lessons.find(lesson => lesson.isFinalTest)
  
  const totalStars = regularLessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  
  // Stage is cleared if final test is passed (final test is the ultimate gatekeeper)
  const finalTestPassed = finalTest ? (finalTest.isPassed === true) : true // No final test = automatically passed
  const isCleared = finalTestPassed
  
  return { totalStars, isCleared }
}

export const stage1: Stage = {
  id: 'stage-1',
  title: 'Music Theory Fundamentals',
  description: 'Master the basic building blocks of music theory',
  lessons: stageOneLessons.map(lesson => ({ ...lesson, stageId: 'stage-1' } as StageLesson)),
  order: 1,
  isUnlocked: true, // First stage is always unlocked
  themeColor: '#4A90E2',
  ...calculateStageStats(stageOneLessons)
}
