import { Lesson } from '../types'

export const stageTwoLessons: Lesson[] = [
  {
    id: 'stage-2-lesson-1',
    title: 'Dotted Notes & Rests',
    description: 'Learn dotted note and rest values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'dottedValues',
      questionsCount: 12,
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
    title: 'Tempo Terms',
    description: 'Learn tempo markings and changes',
    stars: 0,
    exerciseConfig: {
      generatorType: 'musicalTerm',
      questionsCount: 10,
      stage: 2
    }
  },
  {
    id: 'stage-2-lesson-4',
    title: 'Articulation & Expression',
    description: 'Learn articulation and expression markings',
    stars: 0,
    exerciseConfig: {
      generatorType: 'articulation',
      questionsCount: 10,
      stage: 2
    }
  },
  {
    id: 'stage-2-lesson-5',
    title: 'Major Scales & Key Signatures',
    description: 'Learn C, G, D, and F major scales',
    stars: 0,
    exerciseConfig: {
      generatorType: 'keySignature',
      questionsCount: 10,
      stage: 2
    }
  },
  {
    id: 'stage-2-lesson-6',
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
    id: 'stage-2-lesson-7',
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
    title: 'Stage 2 Final Test',
    description: 'Test all Stage 2 concepts',
    isFinalTest: true,
    isPassed: false,
    exerciseConfig: {
      generatorType: 'stage-2-final',
      questionsCount: 30,
      stage: 2
    }
  }
]
