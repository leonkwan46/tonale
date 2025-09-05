import { Lesson } from '../types'

export const stageOneLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Note Values & Rests',
    description: 'Learn about different note values, rests, tied notes, and dotted notes',
    estimatedTime: 15,
    exerciseConfig: {
      generators: [
        { generatorId: 'noteValue', count: 3, difficulty: 'beginner' },
        { generatorId: 'noteValue', count: 2, difficulty: 'beginner' },
        { generatorId: 'noteValue', count: 2, difficulty: 'beginner' },
        { generatorId: 'noteValue', count: 1, difficulty: 'beginner' }
      ],
      totalQuestions: 8
    }
  },
  {
    id: 'lesson-2',
    title: 'Time Signatures',
    description: 'Learn about 2/4, 3/4, and 4/4 time signatures and note grouping',
    estimatedTime: 20,
    exerciseConfig: {
      generators: [
        { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' },
        { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' },
        { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' },
        { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' }
      ],
      totalQuestions: 8
    }
  },
  {
    id: 'lesson-3',
    title: 'Clefs & Note Names',
    description: 'Learn to identify notes on treble and bass clefs, including middle C',
    estimatedTime: 18,
    exerciseConfig: {
      generators: [
        { generatorId: 'noteIdentification', count: 3, difficulty: 'beginner' },
        { generatorId: 'noteIdentification', count: 3, difficulty: 'beginner' },
        { generatorId: 'noteIdentification', count: 2, difficulty: 'beginner' },
        { generatorId: 'noteIdentification', count: 2, difficulty: 'beginner' }
      ],
      totalQuestions: 10
    }
  },
  {
    id: 'lesson-4',
    title: 'Major Scales & Key Signatures',
    description: 'Learn about C, G, D, and F major scales and their key signatures',
    estimatedTime: 22,
    exerciseConfig: {
      generators: [
        { generatorId: 'keySignature', count: 2, difficulty: 'beginner' },
        { generatorId: 'keySignature', count: 3, difficulty: 'beginner' },
        { generatorId: 'keySignature', count: 2, difficulty: 'beginner' },
        { generatorId: 'keySignature', count: 1, difficulty: 'beginner' }
      ],
      totalQuestions: 8
    }
  },
  {
    id: 'lesson-5',
    title: 'Musical Terms & Signs',
    description: 'Learn tempo markings, dynamics, and articulation signs',
    estimatedTime: 25,
    exerciseConfig: {
      generators: [
        { generatorId: 'musicalTerm', count: 4, difficulty: 'beginner' },
        { generatorId: 'musicalTerm', count: 2, difficulty: 'beginner' },
        { generatorId: 'musicalTerm', count: 2, difficulty: 'beginner' }
      ],
      totalQuestions: 8
    }
  },
  {
    id: 'stage-1-final',
    title: 'Stage 1 Final Test',
    description: 'Test your knowledge of basic music theory concepts',
    isFinalTest: true,
    estimatedTime: 45,
    exerciseConfig: {
      generators: [
        { generatorId: 'noteValue', count: 2, difficulty: 'beginner' },
        { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' },
        { generatorId: 'noteIdentification', count: 3, difficulty: 'beginner' },
        { generatorId: 'keySignature', count: 2, difficulty: 'beginner' },
        { generatorId: 'musicalTerm', count: 2, difficulty: 'beginner' }
      ],
      totalQuestions: 11
    }
  }
] 