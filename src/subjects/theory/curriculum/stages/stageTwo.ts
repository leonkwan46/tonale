import { calculateStageStats } from '@/subjects/curriculumHelper'
import { Lesson, Stage, StageLesson } from '../types'

export const stageTwoLessons: Lesson[] = [
  {
    id: 'stage-2-lesson-1',
    title: 'Dotted Notes & Rests',
    description: 'Learn dotted note and rest values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'dottedValues',
      questionsCount: 10,
      stage: 2,
      answerLayoutType: 'row'
    }
  },
  {
    id: 'stage-2-lesson-2',
    title: 'Note Grouping',
    description: 'Learn correct beaming and phrasing in simple time',
    stars: 0,
    exerciseConfig: {
      generatorType: 'noteGrouping',
      questionsCount: 10,
      stage: 2,
      answerLayoutType: 'row'
    }
  },
  {
    id: 'stage-2-lesson-3',
    title: 'Scale Degrees',
    description: 'Identify scale degrees (1st–8th) in C, G, D, and F major',
    stars: 0,
    exerciseConfig: {
      generatorType: 'scaleDegrees',
      questionsCount: 10,
      stage: 2,
      answerLayoutType: 'grid'
    }
  },
  {
    id: 'stage-2-lesson-4',
    title: 'Intervals',
    description: 'Recognise intervals from 2nd to octave above the tonic',
    stars: 0,
    exerciseConfig: {
      generatorType: 'interval',
      questionsCount: 10,
      stage: 2,
      answerLayoutType: 'grid'
    }
  },
  {
    id: 'stage-2-lesson-5',
    title: 'Major Scales & Key Signatures',
    description: 'Work with C, G, D, and F major scales and their key signatures',
    stars: 0,
    exerciseConfig: {
      generatorType: 'keySignature',
      questionsCount: 10,
      stage: 2,
      answerLayoutType: 'grid'
    }
  },
  {
    id: 'stage-2-lesson-6',
    title: 'Tonic Triads',
    description: 'Identify root-position tonic triads in C, G, D, and F major',
    stars: 0,
    exerciseConfig: {
      generatorType: 'triad',
      questionsCount: 10,
      stage: 2,
      answerLayoutType: 'grid'
    }
  },
  {
    id: 'stage-2-lesson-7',
    title: 'Tempo & Expression Terms (Italian)',
    description: 'Learn essential Grade 1 tempo, expression, and performance terms',
    stars: 0,
    exerciseConfig: {
      generatorType: 'musicalTerm',
      questionsCount: 10,
      stage: 2,
      answerLayoutType: 'row'
    }
  },
  {
    id: 'stage-2-final',
    title: 'Stage 2 Test',
    description: 'Test all Stage 2 knowledge',
    isFinalTest: true,
    isPassed: false,
    exerciseConfig: {
      generatorType: 'stage-2-final',
      questionsCount: 30,
      stage: 2,
      answerLayoutType: 'row'
    }
  }
]

export const stage2: Stage = {
  id: 'stage-2',
  title: 'Complete Grade 1',
  lessons: stageTwoLessons.map(lesson => ({ ...lesson, stageId: 'stage-2' } as StageLesson)),
  order: 2,
  prerequisiteStages: ['stage-1'],
  isUnlocked: false, // Will be calculated
  ...calculateStageStats(stageTwoLessons)
}
