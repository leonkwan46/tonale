import { type MusicElementData } from '@leonkwan46/music-notation'
import type { Question, StageNumber } from '@types'
import { STAGE_ONE_TIE_SLUR_QUESTIONS } from '../../curriculum/config/tieSlur'
import { createSlurMeaningQuestions, createTieMeaningQuestions, SLUR_MEANING_VISUAL, TIE_MEANING_VISUAL, type TieSlurQuestion } from '../custom/tieSlur/helpers'
import { generateQuestionsFromPool } from '../utils/exercise'
import { generateQuestionId } from '../utils/question'

const convertTieSlurQuestionToQuestion = (customQuestion: TieSlurQuestion, stage: StageNumber): Question => {
  const symbolType = customQuestion.visualComponent?.symbolType || 'tie'
  return {
    id: generateQuestionId(`${symbolType}-${customQuestion.questionType}`),
    question: customQuestion.question,
    correctAnswer: customQuestion.correctAnswer,
    choices: customQuestion.choices,
    explanation: customQuestion.explanation,
    type: 'multipleChoice',
    visualComponent: customQuestion.visualComponent
  }
}

// Export functions for backward compatibility
export const createTieDefinitionQuestion = (_stage: StageNumber): Question => {
  const [tieQuestion] = createTieMeaningQuestions([TIE_MEANING_VISUAL])
  return convertTieSlurQuestionToQuestion(tieQuestion, _stage)
}

export const createSlurDefinitionQuestion = (_stage: StageNumber): Question => {
  const [slurQuestion] = createSlurMeaningQuestions([SLUR_MEANING_VISUAL])
  return convertTieSlurQuestionToQuestion(slurQuestion, _stage)
}

const getTieSlurQuestionsForStage = (stage: StageNumber): readonly TieSlurQuestion[] => {
  switch (stage) {
    case 1:
      return STAGE_ONE_TIE_SLUR_QUESTIONS
    default:
      return []
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.visualComponent?.elements && question.visualComponent.elements.length > 0) {
    const questionType = question.correctAnswer === 'Tie' || question.correctAnswer === 'Slur' ? 'recognition' : 'meaning'
    const elementSignature = question.visualComponent.elements.map((el: MusicElementData) => {
      const parts: string[] = []
      if (el.type) parts.push(`type:${el.type}`)
      if (el.pitch) parts.push(`pitch:${el.pitch}`)
      if (el.tieStart) parts.push('tieStart')
      if (el.tieEnd) parts.push('tieEnd')
      if (el.slurStart) parts.push('slurStart')
      if (el.slurEnd) parts.push('slurEnd')
      return parts.join('|')
    }).join(';')
    return `tieSlur|${questionType}|${elementSignature}`
  }
  return question.correctAnswer ?? null
}

export const createTieSlurQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const customQuestions = getTieSlurQuestionsForStage(stage)
  
  const uniquePool: Question[] = []
  
  if (customQuestions.length > 0) {
    uniquePool.push(...customQuestions.map(q => convertTieSlurQuestionToQuestion(q, stage)))
  }
  
  // Add meaning questions using helpers
  const tieMeaningQuestions = createTieMeaningQuestions([TIE_MEANING_VISUAL, TIE_MEANING_VISUAL])
  const slurMeaningQuestions = createSlurMeaningQuestions([SLUR_MEANING_VISUAL, SLUR_MEANING_VISUAL])
  uniquePool.push(
    ...tieMeaningQuestions.map(q => convertTieSlurQuestionToQuestion(q, stage)),
    ...slurMeaningQuestions.map(q => convertTieSlurQuestionToQuestion(q, stage))
  )

  uniquePool.forEach((element, index) => {
    console.log(`Element ${index}:`, element)
  })
  
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}

