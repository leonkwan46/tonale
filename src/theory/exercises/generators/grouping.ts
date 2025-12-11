import { type MusicElementData, type TimeSignatureType } from '@leonkwan46/music-notation'
import { STAGE_TWO_GROUPING_QUESTIONS } from '../../curriculum/config/grouping'
import { Question, StageNumber } from '../../curriculum/types'
import { generateQuestionsFromPool } from '../utils/exercise'
import { generateQuestionId, shuffleArray } from '../utils/question'
import { formatAsNotation } from '../utils/timeSignature'
import type { GroupingQuestion } from '../custom/grouping/groupingHelpers'

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
 * Group questions by time signature
 */
const groupQuestionsByTimeSignature = (questions: readonly GroupingQuestion[]): Map<string, GroupingQuestion[]> => {
  const grouped = new Map<string, GroupingQuestion[]>()
  
  for (const question of questions) {
    const timeSigStr = formatTimeSignature(question.timeSignature)
    if (!grouped.has(timeSigStr)) {
      grouped.set(timeSigStr, [])
    }
    grouped.get(timeSigStr)!.push(question)
  }
  
  // Shuffle questions within each time signature group for variety
  for (const [timeSig, questions] of grouped.entries()) {
    grouped.set(timeSig, shuffleArray([...questions]))
  }
  
  return grouped
}

/**
 * Create a balanced pool of questions with even time signature distribution
 */
const createBalancedQuestionPool = (
  questionsByTimeSig: Map<string, GroupingQuestion[]>,
  targetCount: number
): Question[] => {
  const timeSigs = Array.from(questionsByTimeSig.keys())
  if (timeSigs.length === 0) {
    return []
  }
  
  // Calculate how many questions per time signature to ensure balance
  const questionsPerTimeSig = Math.ceil(targetCount / timeSigs.length)
  
  const pool: Question[] = []
  
  // For each time signature, create enough questions to fill the pool
  for (const timeSig of timeSigs) {
    const questions = questionsByTimeSig.get(timeSig)!
    
    // Create multiple rounds of questions from this time signature
    for (let i = 0; i < questionsPerTimeSig; i++) {
      const questionIndex = i % questions.length
      const customQuestion = questions[questionIndex]
      
      pool.push(
        createQuestionFromElements(
          customQuestion.elements,
          customQuestion.timeSignature,
          customQuestion.correctAnswer,
          customQuestion.explanation,
          customQuestion.size
        )
      )
    }
  }
  
  return pool
}

/**
 * Generate a unique identifier for a grouping question based on time signature and elements
 */
const getDuplicateIdentifier = (question: Question): string | null => {
  const timeSignature = question.visualComponent?.timeSignature
  const elements = question.visualComponent?.elements
  
  if (!timeSignature || !elements || elements.length === 0) {
    return null
  }
  
  // Create a signature from the elements: type, pitch, and key properties
  const elementSignature = elements.map((element: MusicElementData) => {
    const parts: string[] = []
    
    if (element.type) parts.push(`type:${element.type}`)
    if (element.pitch) parts.push(`pitch:${element.pitch}`)
    if (element.dots !== undefined) parts.push(`dots:${element.dots}`)
    if (element.endGroup) parts.push('endGroup')
    if (element.tieStart) parts.push('tieStart')
    if (element.tieEnd) parts.push('tieEnd')
    if (element.showFlag === false) parts.push('noFlag')
    
    return parts.join('|')
  }).join(';')
  
  return `grouping|${timeSignature}|${elementSignature}`
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
 * Ensures a balanced mix of time signatures
 */
export const createBeamingQuestion = (stage: StageNumber): Question => {
  const stageQuestions = getGroupingQuestionsForStage(stage)
  
  if (stageQuestions.length === 0) {
    throw new Error(`No grouping questions defined for stage ${stage}. Please add questions to the appropriate stage array.`)
  }
  
  // Group by time signature and select randomly from a random time signature
  const questionsByTimeSig = groupQuestionsByTimeSignature(stageQuestions)
  const timeSigs = Array.from(questionsByTimeSig.keys())
  const randomTimeSig = timeSigs[Math.floor(Math.random() * timeSigs.length)]
  const questionsForTimeSig = questionsByTimeSig.get(randomTimeSig)!
  const randomIndex = Math.floor(Math.random() * questionsForTimeSig.length)
  const customQuestion = questionsForTimeSig[randomIndex]
  
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
 * Generate questions from stage-specific pool with balanced time signature distribution
 * and deduplication to avoid repeating similar questions
 */
export const createNoteGroupingQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const stageQuestions = getGroupingQuestionsForStage(stage)
  
  if (stageQuestions.length === 0) {
    throw new Error(`No grouping questions defined for stage ${stage}. Please add questions to the appropriate stage array.`)
  }
  
  // Group questions by time signature
  const questionsByTimeSig = groupQuestionsByTimeSignature(stageQuestions)
  
  // Create a balanced pool (ensures time signature distribution)
  // Use a larger pool size to ensure we have enough variety after deduplication
  const poolSize = Math.max(questionsCount * 2, stageQuestions.length * 2)
  const balancedPool = createBalancedQuestionPool(questionsByTimeSig, poolSize)
  
  // Use generateQuestionsFromPool to handle deduplication
  return generateQuestionsFromPool(balancedPool, questionsCount, getDuplicateIdentifier)
}
