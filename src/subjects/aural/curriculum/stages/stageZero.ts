import type { Lesson, Stage, StageLesson, StageNumber } from '../types'

const stageZero: StageNumber = 0

/**
 * Initial Grade (Stage 0) - Aural Lessons
 * Focus: Basic rhythm echoes and pulse tapping
 */
export const stageZeroLessons: Lesson[] = [
  {
    id: 'aural-stage-0-lesson-1',
    title: 'Rhythm Echoes',
    description: 'Clap back the rhythm of phrases as echoes',
    stars: 0,
    exerciseConfig: {
      generatorType: 'rhythm',
      questionsCount: 5,
      stage: stageZero,
      answerLayoutType: 'grid'
    }
  }
  // TODO: Uncomment when song files are available
  // {
  //   id: 'aural-stage-0-lesson-2',
  //   title: 'Clap the Pulse',
  //   description: 'Clap along with the pulse of a piece played by the examiner',
  //   stars: 0,
  //   exerciseConfig: {
  //     generatorType: 'pulse',
  //     questionsCount: 5,
  //     stage: stageZero,
  //     answerLayoutType: 'grid'
  //   }
  // }
]

/**
 * Stage 0 - Initial Grade
 */
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
