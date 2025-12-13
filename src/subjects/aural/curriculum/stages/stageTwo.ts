import { Lesson, Stage, StageLesson } from '../types'

// Placeholder: Grade 2 aural lessons
export const stageTwoLessons: Lesson[] = [
  // TODO: Add aural lessons for Grade 2
]

export const stage2: Stage = {
  id: 'aural-stage-2',
  title: 'Grade 2',
  description: 'Aural skills for Grade 2',
  lessons: stageTwoLessons.map(lesson => ({
    ...lesson,
    stageId: 'aural-stage-2'
  })) as StageLesson[],
  isCleared: false,
  isUnlocked: false,
  totalStars: 0,
  order: 2,
  prerequisiteStages: ['aural-stage-0']
}

