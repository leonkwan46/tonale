import { stageThreeLessons } from '../lessons/stageThreeLessons'
import { Stage, StageLesson } from '../types'

// Helper function to calculate stage statistics
const calculateStageStats = (lessons: typeof stageThreeLessons) => {
  const totalStars = lessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  const requiredStars = lessons.length // At least 1 star per lesson
  const isCleared = lessons.every(lesson => (lesson.stars || 0) >= 1) && totalStars >= requiredStars
  
  return { totalStars, requiredStars, isCleared }
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
