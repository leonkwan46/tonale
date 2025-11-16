import { stageZeroLessons } from '../lessons/stageZeroLessons'
import { Stage, StageLesson } from '../types'

const calculateStageStats = (lessons: typeof stageZeroLessons) => {
  const regularLessons = lessons.filter(lesson => !lesson.isFinalTest)
  const finalTest = lessons.find(lesson => lesson.isFinalTest)

  const totalStars = regularLessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  const finalTestPassed = finalTest ? (finalTest.isPassed === true) : true
  const isCleared = finalTestPassed

  return { totalStars, isCleared }
}

export const stage0: Stage = {
  id: 'stage-0',
  title: 'Pre-Grade Introduction',
  description: 'Start with foundational note values, clefs, accidentals, and musical symbols',
  lessons: stageZeroLessons.map(lesson => ({ ...lesson, stageId: 'stage-0' } as StageLesson)),
  order: 0,
  isUnlocked: true,
  themeColor: '#63B3ED',
  ...calculateStageStats(stageZeroLessons)
}

