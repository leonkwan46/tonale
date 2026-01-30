import type { Lesson, Stage, StageLesson, StageNumber } from '../types'

const stageTwo: StageNumber = 2

/**
 * Grade 2 (Stage 2) - Aural Lessons
 * Focus: Complex rhythms with triplets and different time signatures
 */
export const stageTwoLessons: Lesson[] = [
  {
    id: 'aural-stage-2-lesson-1',
    title: 'Rhythm Echoes - Grade 2',
    description: 'Clap back complex rhythms including triplets',
    stars: 0,
    exerciseConfig: {
      generatorType: 'rhythm',
      questionsCount: 5,
      stage: stageTwo,
      answerLayoutType: 'grid'
    }
  }
  // TODO: Uncomment when song files are available
  // {
  //   id: 'aural-stage-2-lesson-2',
  //   title: 'Clap the Pulse - Grade 2',
  //   description: 'Clap along with the pulse in different time signatures',
  //   stars: 0,
  //   exerciseConfig: {
  //     generatorType: 'pulse',
  //     questionsCount: 5,
  //     stage: stageTwo,
  //     answerLayoutType: 'grid'
  //   }
  // }
]

/**
 * Stage 2 - Grade 2
 */
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
  prerequisiteStages: ['aural-stage-1']
}
