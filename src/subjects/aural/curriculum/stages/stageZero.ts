import { Lesson, Stage, StageLesson, StageNumber } from '../types'

const stageZero: StageNumber = 0

// Placeholder: INITIAL GRADE aural lessons
export const stageZeroLessons: Lesson[] = [
  {
    id: 'aural-stage-0-lesson-1',
    title: 'Clap the Pulse',
    description: 'Clap along with the pulse of a piece played by the examiner',
    stars: 0,
    exerciseConfig: {
      generatorType: 'pulse',
      questionsCount: 5,
      stage: stageZero
    }
  },
  {
    id: 'aural-stage-0-lesson-2',
    title: 'Rhythm Echoes',
    description: 'Clap back the rhythm of two phrases as echoes',
    stars: 0,
    exerciseConfig: {
      generatorType: 'rhythm',
      questionsCount: 5,
      stage: stageZero
    }
  },
  {
    id: 'aural-stage-0-lesson-3',
    title: 'Sing Echoes',
    description: 'Sing back two phrases as echoes in a major key',
    stars: 0,
    exerciseConfig: {
      generatorType: 'singing',
      questionsCount: 5,
      stage: stageZero
    }
  },
  {
    id: 'aural-stage-0-lesson-4',
    title: 'Dynamics & Articulation',
    description: 'Identify dynamics (loud/quiet) or articulation (smooth/detached)',
    stars: 0,
    exerciseConfig: {
      generatorType: 'dynamics',
      questionsCount: 5,
      stage: stageZero
    }
  }
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
