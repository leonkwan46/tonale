import { Lesson, Stage, StageLesson } from '../types'

// Placeholder: INITIAL GRADE aural lessons
export const stageZeroLessons: Lesson[] = [
  // TODO: Add aural lessons for INITIAL GRADE
  // A: Clap the pulse
  // B: Clap rhythm echoes
  // C: Sing echoes
  // D: Dynamics/articulation questions
]

export const stage0: Stage = {
  id: 'aural-stage-0',
  title: 'Initial Grade',
  description: 'Aural skills for Initial Grade',
  lessons: stageZeroLessons.map(lesson => ({
    ...lesson,
    stageId: 'aural-stage-0'
  })) as StageLesson[],
  isCleared: false,
  isUnlocked: true,
  totalStars: 0,
  order: 0
}

