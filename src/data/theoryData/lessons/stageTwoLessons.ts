import { Lesson } from '../types'

export const stageTwoLessons: Lesson[] = [
  {
    id: 'stage-2-lesson-1',
    title: 'Dotted Notes & Rests',
    description: 'Learn dotted note and rest values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'dottedValues',
      questionsCount: 10,
      stage: 2
    }
  },
  {
    id: 'stage-2-lesson-2',
    title: 'Note Grouping, Ties & Slurs',
    description: 'Learn how notes connect and group within bars',
    stars: 0,
    exerciseConfig: {
      generatorType: 'noteGrouping',
      questionsCount: 10,
      stage: 2
    }
  },
  {
    id: 'stage-2-lesson-3',
    title: 'Tempo & Expression Terms',
    description: 'Learn tempo markings and expression terms',
    stars: 0,
    exerciseConfig: {
      generatorType: 'musicalTerm',
      questionsCount: 10,
      stage: 2
    }
  },
  {
    id: 'stage-2-lesson-4',
    title: 'Major Scales & Key Signatures',
    description: 'Learn A, E♭, and B♭ major scales and relative minors',
    stars: 0,
    exerciseConfig: {
      generatorType: 'keySignature',
      questionsCount: 10,
      stage: 2
    }
  },
  {
    id: 'stage-2-lesson-5',
    title: 'Intervals',
    description: 'Learn intervals above the tonic',
    stars: 0,
    exerciseConfig: {
      generatorType: 'interval',
      questionsCount: 10,
      stage: 2
    }
  },
  {
    id: 'stage-2-lesson-6',
    title: 'Tonic Triads',
    description: 'Learn tonic triads in root position',
    stars: 0,
    exerciseConfig: {
      generatorType: 'triad',
      questionsCount: 10,
      stage: 2
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
      stage: 2
    }
  }
]
