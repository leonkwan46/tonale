import { Lesson, Stage, StageLesson } from '../types'

export const stageOneLessons: Lesson[] = [
  {
    id: 'stage-1-lesson-1',
    title: 'Quaver & Semiquaver',
    description: 'Identify quaver and semiquaver notes and rests, including their beat values',
    stars: 0,
    exerciseConfig: {
      generatorType: 'noteRestValue',
      questionsCount: 10,
      stage: 1,
      answerLayoutType: 'row'
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
      stage: 1,
      answerLayoutType: 'grid'
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
      stage: 1,
      answerLayoutType: 'grid'
    }
  },
  {
    id: 'stage-1-lesson-4',
    title: 'Ties & Slurs',
    description: 'Tell the difference between ties and slurs',
    stars: 0,
    exerciseConfig: {
      generatorType: 'tieSlur',
      questionsCount: 10,
      stage: 1,
      answerLayoutType: 'row'
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
      stage: 1,
      answerLayoutType: 'row'
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
      stage: 1,
      answerLayoutType: 'row'
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
      stage: 1,
      answerLayoutType: 'row'
    }
  }
]

// Helper function to calculate stage statistics
const calculateStageStats = (lessons: typeof stageOneLessons) => {
  const regularLessons = lessons.filter(lesson => !lesson.isFinalTest)
  const finalTest = lessons.find(lesson => lesson.isFinalTest)
  
  const totalStars = regularLessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
  
  // Stage is cleared if final test is passed (final test is the ultimate gatekeeper)
  const finalTestPassed = finalTest ? (finalTest.isPassed === true) : true // No final test = automatically passed
  const isCleared = finalTestPassed
  
  return { totalStars, isCleared }
}

export const stage1: Stage = {
  id: 'stage-1',
  title: 'Foundation',
  lessons: stageOneLessons.map(lesson => ({ ...lesson, stageId: 'stage-1' } as StageLesson)),
  order: 1,
  prerequisiteStages: ['stage-0'],
  isUnlocked: false, // Will be calculated
  ...calculateStageStats(stageOneLessons)
}
