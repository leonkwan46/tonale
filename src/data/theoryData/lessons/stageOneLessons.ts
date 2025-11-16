import { Lesson } from '../types'

export const stageOneLessons: Lesson[] = [
  {
    id: 'stage-1-lesson-1',
    title: 'Quaver & Semiquaver',
    description: 'Identify quaver and semiquaver notes and rests, including their beat values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'noteRestValue',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-2',
    title: 'Treble Clef Notes',
    description: 'Read treble clef notes from middle C up to G5',
    stars: 0,
    exerciseConfig: {
      generatorType: 'trebleClef',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-3',
    title: 'Bass Clef Notes',
    description: 'Read bass clef notes from F2 up to D4',
    stars: 0,
    exerciseConfig: {
      generatorType: 'bassClef',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-4',
    title: 'Ties & Slurs',
    description: 'Tell the difference between ties and slurs',
    stars: 0,
    exerciseConfig: {
      generatorType: 'symbols',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-5',
    title: 'Semitones & Tones',
    description: 'Understand half steps and whole steps',
    stars: 0,
    exerciseConfig: {
      generatorType: 'semitonesTones',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-6',
    title: 'Dynamics & Articulation',
    description: 'Recognise dynamics and articulation markings',
    stars: 0,
    exerciseConfig: {
      generatorType: 'musicalTerm',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-final',
    title: 'Stage 1 Test',
    description: 'Test all Stage 1 knowledge',
    isFinalTest: true,
    isPassed: false,
    exerciseConfig: {
      generatorType: 'stage-1-final',
      questionsCount: 25,
      stage: 1
    }
  }
] 
