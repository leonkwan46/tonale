import { stageTwoLessons } from '../lessons/stageTwoLessons'
import { Stage, StageLesson } from '../types'

// Helper function to calculate stage statistics
const calculateStageStats = (lessons: typeof stageTwoLessons) => {
  const totalStars = lessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  const requiredStars = lessons.length // At least 1 star per lesson
  const isCleared = lessons.every(lesson => (lesson.stars || 0) >= 1) && totalStars >= requiredStars
  
  return { totalStars, requiredStars, isCleared }
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
