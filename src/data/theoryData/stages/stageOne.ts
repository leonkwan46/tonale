import { stageOneLessons } from '../lessons/stageOneLessons'
import { Stage, StageLesson } from '../types'

// Helper function to calculate stage statistics
const calculateStageStats = (lessons: typeof stageOneLessons) => {
  const totalStars = lessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  const requiredStars = lessons.length // At least 1 star per lesson
  const isCleared = lessons.every(lesson => (lesson.stars || 0) >= 1) && totalStars >= requiredStars
  
  return { totalStars, requiredStars, isCleared }
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
