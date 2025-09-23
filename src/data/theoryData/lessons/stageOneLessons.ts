import { Lesson } from '../types'

export const stageOneLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Note Values',
    description: 'Learn about different note values and dotted notes',
    stars: 0,
    estimatedTime: 15,
    exerciseConfig: {
      generatorType: 'noteValue',
      questionsCount: 15,
      stage: 1
    }
  },
  {
    id: 'lesson-2',
    title: 'Rest Values',
    description: 'Learn about different rest values and dotted rests',
    stars: 0,
    estimatedTime: 15,
    exerciseConfig: {
      generatorType: 'restValue',
      questionsCount: 15,
      stage: 1
    }
  },
  {
    id: 'lesson-3',
    title: 'Time Signatures',
    description: 'Learn about 2/4, 3/4, and 4/4 time signatures and note grouping',
    stars: 0,
    estimatedTime: 20,
    exerciseConfig: {
      generatorType: 'timeSignature',
      questionsCount: 15,
      stage: 1
    }
  },
  {
    id: 'lesson-4',
    title: 'Clefs & Note Names',
    description: 'Learn to identify notes on treble and bass clefs, including middle C',
    stars: 0,
    estimatedTime: 18,
    exerciseConfig: {
      generatorType: 'noteIdentification',
      questionsCount: 1,
      stage: 1
    }
  },
  {
    id: 'lesson-5',
    title: 'Major Scales & Key Signatures',
    description: 'Learn about C, G, D, and F major scales and their key signatures',
    stars: 0,
    estimatedTime: 22,
    exerciseConfig: {
      generatorType: 'keySignature',
      questionsCount: 15,
      stage: 1
    }
  },
  {
    id: 'lesson-6',
    title: 'Musical Terms & Signs',
    description: 'Learn tempo markings, dynamics, and articulation signs',
    stars: 0,
    estimatedTime: 25,
    exerciseConfig: {
      generatorType: 'musicalTerm',
      questionsCount: 15,
      stage: 1
    }
  },
  {
    id: 'stage-1-final',
    title: 'Stage 1 Final Test',
    description: 'Test your knowledge of basic music theory concepts',
    isFinalTest: true,
    isPassed: false,
    estimatedTime: 45,
    exerciseConfig: {
      generatorType: 'mixed',
      questionsCount: 25,
      stage: 1
    }
  }
] 