import { NOTES, type MusicElementData } from '@leonkwan46/music-notation'
import { ARTICULATION_SIGNS_DEFINITIONS } from '../../../../config/gradeSyllabus/musicalTerms'
import { STAGE_ONE_TIE_SLUR_QUESTIONS } from '../../curriculum/config/tieSlur'
import { Question, StageNumber } from '../../curriculum/types'
import type { TieSlurQuestion } from '../custom/tieSlur/helpers'
import { generateQuestionsFromPool } from '../utils/exercise'
import { generateQuestionId, generateWrongChoices } from '../utils/question'

const allSignDefinitions = [...new Set(Object.values(ARTICULATION_SIGNS_DEFINITIONS))]

export const createTieDefinitionQuestion = (_stage: StageNumber): Question => {
  return {
    id: generateQuestionId('tie'),
    title: 'What is this musical symbol?',
    correctAnswer: ARTICULATION_SIGNS_DEFINITIONS.tie,
    choices: generateWrongChoices(allSignDefinitions, ARTICULATION_SIGNS_DEFINITIONS.tie),
    explanation: 'A tie connects two notes of the same pitch, combining their durations.',
    answerInterface: 'multipleChoice',
    questionInterface: {
      type: 'musicStaff',
      clef: 'treble',
      elements: [
        { pitch: 'F4', type: NOTES.MINIM, stem: 'up', tieStart: true },
        { pitch: 'F4', type: NOTES.MINIM, stem: 'up', tieEnd: true }
      ],
      size: 'sml'
    }
  }
}

export const createSlurDefinitionQuestion = (_stage: StageNumber): Question => {
  return {
    id: generateQuestionId('slur'),
    title: 'What is this musical symbol?',
    correctAnswer: ARTICULATION_SIGNS_DEFINITIONS.slur,
    choices: generateWrongChoices(allSignDefinitions, ARTICULATION_SIGNS_DEFINITIONS.slur),
    explanation: 'A slur indicates that notes should be played smoothly and connected.',
    answerInterface: 'multipleChoice',
    questionInterface: {
      type: 'musicStaff',
      clef: 'treble',
      elements: [
        { pitch: 'C4', type: NOTES.CROTCHET, ledgerLines: 1, stem: 'up', spacing: 80, slurStart: true },
        { pitch: 'E4', type: NOTES.CROTCHET, stem: 'up', spacing: 80 },
        { pitch: 'G4', type: NOTES.CROTCHET, stem: 'up', slurEnd: true }
      ],
      size: 'sml'
    }
  }
}

const getTieSlurQuestionsForStage = (stage: StageNumber): readonly TieSlurQuestion[] => {
  switch (stage) {
    case 1:
      return STAGE_ONE_TIE_SLUR_QUESTIONS
    default:
      return []
  }
}

const convertTieSlurQuestionToQuestion = (customQuestion: TieSlurQuestion, stage: StageNumber): Question => {
  const symbolType = customQuestion.questionInterface?.symbolType || 'tie'
  return {
    id: generateQuestionId(`${symbolType}-${customQuestion.questionType}`),
    title: customQuestion.title,
    correctAnswer: customQuestion.correctAnswer,
    choices: customQuestion.choices,
    explanation: customQuestion.explanation,
    answerInterface: 'multipleChoice',
    questionInterface: customQuestion.questionInterface
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.questionInterface?.elements && question.questionInterface.elements.length > 0) {
    const questionType = question.correctAnswer === 'Tie' || question.correctAnswer === 'Slur' ? 'recognition' : 'meaning'
    const elementSignature = question.questionInterface.elements.map((el: MusicElementData) => {
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
  return typeof question.correctAnswer === 'string' ? question.correctAnswer : null
}

export const createTieSlurQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const customQuestions = getTieSlurQuestionsForStage(stage)
  
  const uniquePool: Question[] = []
  
  if (customQuestions.length > 0) {
    uniquePool.push(...customQuestions.map(q => convertTieSlurQuestionToQuestion(q, stage)))
  }
  
  uniquePool.push(
    createTieDefinitionQuestion(stage),
    createTieDefinitionQuestion(stage),
    createSlurDefinitionQuestion(stage),
    createSlurDefinitionQuestion(stage)
  )
  
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}

