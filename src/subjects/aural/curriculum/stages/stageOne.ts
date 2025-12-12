import { Lesson, Stage, StageLesson } from '../types'

// Placeholder: Grade 1 aural lessons
export const stageOneLessons: Lesson[] = [
  // TODO: Add aural lessons for Grade 1
]

export const stage1: Stage = {
  id: 'aural-stage-1',
  title: 'Grade 1',
  description: 'Aural skills for Grade 1',
  lessons: stageOneLessons.map(lesson => ({
    ...lesson,
    stageId: 'aural-stage-1'
  })) as StageLesson[],
  isCleared: false,
  isUnlocked: false,
  totalStars: 0,
  order: 1,
  prerequisiteStages: ['aural-stage-0']
}

