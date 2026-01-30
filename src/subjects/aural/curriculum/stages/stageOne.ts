import type { Lesson, Stage, StageLesson, StageNumber } from '../types'

const stageOne: StageNumber = 1

/**
 * Grade 1 (Stage 1) - Aural Lessons
 * Focus: More complex rhythms with dotted notes
 */
export const stageOneLessons: Lesson[] = [
  {
    id: 'aural-stage-1-lesson-1',
    title: 'Rhythm Echoes - Grade 1',
    description: 'Clap back more complex rhythms including dotted notes',
    stars: 0,
    exerciseConfig: {
      generatorType: 'rhythm',
      questionsCount: 5,
      stage: stageOne,
      answerLayoutType: 'grid'
    }
  }
  // TODO: Uncomment when song files are available
  // {
  //   id: 'aural-stage-1-lesson-2',
  //   title: 'Clap the Pulse - Grade 1',
  //   description: 'Clap along with the pulse of more complex pieces',
  //   stars: 0,
  //   exerciseConfig: {
  //     generatorType: 'pulse',
  //     questionsCount: 5,
  //     stage: stageOne,
  //     answerLayoutType: 'grid'
  //   }
  // }
]

/**
 * Stage 1 - Grade 1
 */
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
