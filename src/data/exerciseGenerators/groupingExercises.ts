import { type MusicElementData, type TimeSignatureType } from '@leonkwan46/music-notation'
import { generateQuestionId } from '../helpers/questionHelpers'
import { formatAsNotation } from '../helpers/timeSignatureHelpers'
import type { GroupingQuestion } from '../stageSyllabus/customGroupingQuestions/groupingHelpers'
import { STAGE_TWO_GROUPING_QUESTIONS } from '../stageSyllabus/grouping'
import { Question, StageNumber } from '../theoryData/types'

// ============================================================================
// QUESTION CREATION
// ============================================================================

/**
 * Format time signature as string
 */
const formatTimeSignature = (timeSignature: TimeSignatureType | string): string => {
  return typeof timeSignature === 'string' 
    ? timeSignature 
    : formatAsNotation(timeSignature)
}

/**
 * Get grouping questions for a specific stage
 */
const getGroupingQuestionsForStage = (stage: StageNumber): readonly GroupingQuestion[] => {
  switch (stage) {
    case 2:
      return STAGE_TWO_GROUPING_QUESTIONS
    // Add more stages as needed
    // case 3:
    //   return STAGE_THREE_GROUPING_QUESTIONS
    default:
      throw new Error(`No grouping questions defined for stage ${stage}. Please add questions to the appropriate stage array.`)
  }
}

/**
 * Create a question from custom elements
 */
const createQuestionFromElements = (
  elements: MusicElementData[],
  timeSignature: TimeSignatureType | string,
  correctAnswer: 'True' | 'False',
  explanation?: string,
  size: 'xs' | 'sml' | 'med' | 'lg' | 'xl' | 'xxl' = 'lg'
): Question => {
  const timeSignatureStr = formatTimeSignature(timeSignature)
  
  return {
    id: generateQuestionId('grouping'),
    question: 'Is this note grouping correct for the time signature?',
    correctAnswer,
    choices: ['True', 'False'],
    explanation: explanation || `Notes should be grouped to show the beat structure of the ${timeSignatureStr} time signature.`,
    type: 'trueFalse',
    visualComponent: {
      size,
      timeSignature: timeSignatureStr,
      elements,
      showStaff: false
    }
  }
}

/**
 * Create a beaming/grouping question from stage-specific questions
 */
export const createBeamingQuestion = (stage: StageNumber): Question => {
  const stageQuestions = getGroupingQuestionsForStage(stage)
  
  if (stageQuestions.length === 0) {
    throw new Error(`No grouping questions defined for stage ${stage}. Please add questions to the appropriate stage array.`)
  }
  
  const randomIndex = Math.floor(Math.random() * stageQuestions.length)
  const customQuestion = stageQuestions[randomIndex]
  
  return createQuestionFromElements(
    customQuestion.elements,
    customQuestion.timeSignature,
    customQuestion.correctAnswer,
    customQuestion.explanation,
    customQuestion.size
  )
}

export const createNoteGroupingQuestion = (stage: StageNumber): Question => {
  return createBeamingQuestion(stage)
}

/**
 * Generate questions from stage-specific pool
 */
export const createNoteGroupingQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const stageQuestions = getGroupingQuestionsForStage(stage)
  
  if (stageQuestions.length === 0) {
    throw new Error(`No grouping questions defined for stage ${stage}. Please add questions to the appropriate stage array.`)
  }
  
  const questions: Question[] = []
  
  // Repeat stage-specific questions as needed to reach questionsCount
  for (let i = 0; i < questionsCount; i++) {
    const questionIndex = i % stageQuestions.length
    const customQuestion = stageQuestions[questionIndex]
    
    questions.push(
      createQuestionFromElements(
        customQuestion.elements,
        customQuestion.timeSignature,
        customQuestion.correctAnswer,
        customQuestion.explanation,
        customQuestion.size
      )
    )
  }
  
  return questions
}
