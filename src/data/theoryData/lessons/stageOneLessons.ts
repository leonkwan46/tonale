import { Lesson } from '../types'

export const stageOneLessons: Lesson[] = [
  {
    id: 'stage-1-lesson-1',
    title: 'Note Values',
    description: 'Learn basic note values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'noteValue',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-2',
    title: 'Rest Values',
    description: 'Learn basic rest values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'restValue',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-3',
    title: 'Time Signatures',
    description: 'Learn 2/4, 3/4, and 4/4 time signatures',
    stars: 0,
    exerciseConfig: {
      generatorType: 'timeSignature',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-4',
    title: 'Treble Clef Notes',
    description: 'Learn treble clef note names',
    stars: 0,
    exerciseConfig: {
      generatorType: 'trebleClef',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-5',
    title: 'Bass Clef Notes',
    description: 'Learn bass clef note names',
    stars: 0,
    exerciseConfig: {
      generatorType: 'bassClef',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-6',
    title: 'Accidentals',
    description: 'Learn sharps, flats, and naturals',
    stars: 0,
    exerciseConfig: {
      generatorType: 'accidentals',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-7',
    title: 'Semitones and Tones',
    description: 'Learn the difference between semitones and tones',
    stars: 0,
    exerciseConfig: {
      generatorType: 'semitonesTones',
      questionsCount: 10,
      stage: 1
    }
  },
  {
    id: 'stage-1-lesson-8',
    title: 'Dynamics & Articulation',
    description: 'Learn dynamic markings and articulation signs',
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
