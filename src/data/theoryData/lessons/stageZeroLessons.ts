import { Lesson, StageNumber } from '../types'

const stageZero: StageNumber = 0

export const stageZeroLessons: Lesson[] = [
  {
    id: 'stage-0-lesson-1',
    title: 'Basic Note Names & Values',
    description: 'Identify semibreve, minim, and crotchet notes by name and learn their beat values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'noteNameValue',
      questionsCount: 10,
      stage: stageZero
    }
  },
  {
    id: 'stage-0-lesson-2',
    title: 'Basic Rest Names & Values',
    description: 'Identify semibreve, minim, and crotchet rests by name and learn their beat values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'restNameValue',
      questionsCount: 10,
      stage: stageZero
    }
  },
  {
    id: 'stage-0-lesson-3',
    title: 'Accidentals',
    description: 'Identify sharp, flat, and natural symbols',
    stars: 0,
    exerciseConfig: {
      generatorType: 'accidentals',
      questionsCount: 10,
      stage: stageZero
    }
  },
  {
    id: 'stage-0-lesson-4',
    title: 'Treble Clef Basics',
    description: 'Learn note names in the treble clef from C4 to G4',
    stars: 0,
    exerciseConfig: {
      generatorType: 'trebleClef',
      questionsCount: 10,
      stage: stageZero
    }
  },
  {
    id: 'stage-0-lesson-5',
    title: 'Bass Clef Basics',
    description: 'Learn note names in the bass clef from F3 to C4',
    stars: 0,
    exerciseConfig: {
      generatorType: 'bassClef',
      questionsCount: 10,
      stage: stageZero
    }
  },
  {
    id: 'stage-0-lesson-6',
    title: 'Simple Time Signatures',
    description: 'Understand 2/4, 3/4, 4/4, and common time',
    stars: 0,
    exerciseConfig: {
      generatorType: 'timeSignature',
      questionsCount: 10,
      stage: stageZero
    }
  },
  {
    id: 'stage-0-lesson-7',
    title: 'Dynamics & Articulation',
    description: 'Identify p, f, mf, mp, staccato, and legato',
    stars: 0,
    exerciseConfig: {
      generatorType: 'musicalTerm',
      questionsCount: 10,
      stage: stageZero
    }
  },
  {
    id: 'stage-0-final',
    title: 'Stage 0 Test',
    description: 'Review all Stage 0 concepts',
    isFinalTest: true,
    isPassed: false,
    exerciseConfig: {
      generatorType: 'stage-0-final',
      questionsCount: 20,
      stage: stageZero
    }
  }
]

