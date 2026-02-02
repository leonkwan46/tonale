import { NOTES, type ClefType } from '@leonkwan46/music-notation'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
import { getCumulativeNoteDefinitions } from '../../curriculum/config/noteRange'
import { generateQuestionsFromPool } from '../utils/exercise'
import { generateExplanation } from '../utils/explanation'
import { calculateAbsoluteSemitone, calculateInterval, extractNotePrefix, getIntervalNameForStage, getNotesForPitches, getStageIntervals } from '../utils/interval'
import { generateQuestionId, generateWrongChoices } from '../utils/question'

const CLEFS: ClefType[] = ['treble', 'bass']

export const createIntervalQuestion = (
  stage: StageNumber, 
  clef: ClefType,
  tonicPitch: string,
  targetPitch: string,
  layoutType?: 'grid' | 'row'
): Question => {
  const stageIntervals = getStageIntervals(stage)

  const { tonicNote, targetNote } = getNotesForPitches(tonicPitch, targetPitch, clef)
  const calculatedInterval = calculateInterval(tonicPitch, targetPitch)
  const correctAnswer = getIntervalNameForStage(calculatedInterval, stage, stageIntervals)
  if (!stageIntervals.includes(correctAnswer)) {
    throw new Error(`Interval ${correctAnswer} is not part of stage ${stage} syllabus`)
  }
  
  const visualComponent = {
    clef,
    size: 'xs' as const,
    elements: [
      {
        pitch: tonicNote.pitch,
        type: NOTES.CROTCHET,
        accidental: tonicNote.accidental,
        stem: tonicNote.stem,
        ledgerLines: tonicNote.ledgerLines
      },
      {
        pitch: targetNote.pitch,
        type: NOTES.CROTCHET,
        accidental: targetNote.accidental,
        stem: targetNote.stem,
        ledgerLines: targetNote.ledgerLines
      }
    ]
  }
  
  return {
    id: generateQuestionId('interval'),
    question: 'What interval is this above the tonic?',
    correctAnswer,
    choices: generateWrongChoices([...stageIntervals], correctAnswer),
    explanation: generateExplanation('interval', {
      correctAnswer,
      simpleName: calculatedInterval.simpleName,
      semitones: calculatedInterval.semitones
    }, visualComponent),
    type: 'multipleChoice',
    visualComponent,
    layoutType
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  return typeof question.correctAnswer === 'string' ? question.correctAnswer : null
}

const generateQuestionsForClef = (stage: StageNumber, clef: ClefType, layoutType?: 'grid' | 'row'): Question[] => {
  const questions: Question[] = []
  const stageNoteDefinitions = getCumulativeNoteDefinitions(stage, clef)
  const availablePitches = stageNoteDefinitions.map(note => note.pitch)
  
  const semitoneValueCache = new Map<string, number>()
  const getSemitoneValue = (pitch: string): number => {
    if (!semitoneValueCache.has(pitch)) {
      semitoneValueCache.set(pitch, calculateAbsoluteSemitone(pitch))
    }
    return semitoneValueCache.get(pitch)!
  }
  
  const pitchesSortedBySemitone = [...availablePitches].sort((a, b) => getSemitoneValue(a) - getSemitoneValue(b))
  
  const pitchesGroupedByPrefix = new Map<string, string[]>()
  for (const pitch of availablePitches) {
    const prefix = extractNotePrefix(pitch)
    const pitchesWithPrefix = pitchesGroupedByPrefix.get(prefix) || []
    pitchesWithPrefix.push(pitch)
    pitchesGroupedByPrefix.set(prefix, pitchesWithPrefix)
  }
  
  for (const pitchesWithPrefix of pitchesGroupedByPrefix.values()) {
    pitchesWithPrefix.sort((a, b) => getSemitoneValue(a) - getSemitoneValue(b))
  }

  for (let i = 0; i < pitchesSortedBySemitone.length; i++) {
    const tonicPitch = pitchesSortedBySemitone[i]
    const tonicSemitoneValue = getSemitoneValue(tonicPitch)
    
    for (let j = i + 1; j < pitchesSortedBySemitone.length; j++) {
      const proposedTargetPitch = pitchesSortedBySemitone[j]
      
      if (stage <= 2) {
        const targetPrefix = extractNotePrefix(proposedTargetPitch)
        const pitchesWithMatchingPrefix = pitchesGroupedByPrefix.get(targetPrefix) || []
        
        let selectedTargetPitch: string | null = null
        let smallestSemitoneDistance = Infinity
        
        for (const candidatePitch of pitchesWithMatchingPrefix) {
          if (candidatePitch === tonicPitch) continue
          
          const candidateSemitoneValue = getSemitoneValue(candidatePitch)
          if (candidateSemitoneValue <= tonicSemitoneValue) continue
          
          const interval = calculateInterval(tonicPitch, candidatePitch)
          if (interval.number < 2 || interval.number > 8) continue
          
          const semitoneDistance = candidateSemitoneValue - tonicSemitoneValue
          if (semitoneDistance < smallestSemitoneDistance) {
            selectedTargetPitch = candidatePitch
            smallestSemitoneDistance = semitoneDistance
          }
        }
        
        if (selectedTargetPitch) {
          const question = createIntervalQuestion(stage, clef, tonicPitch, selectedTargetPitch, layoutType)
          questions.push(question)
        }
      } else {
        const interval = calculateInterval(tonicPitch, proposedTargetPitch)
        if (interval.number >= 2) {
          const question = createIntervalQuestion(stage, clef, tonicPitch, proposedTargetPitch, layoutType)
          questions.push(question)
        }
      }
    }
  }

  return questions
}

export const createIntervalQuestions = (questionsCount: number, stage: StageNumber, layoutType?: 'grid' | 'row'): Question[] => {
  const questionPool: Question[] = []

  for (const clef of CLEFS) {
    const clefQuestions = generateQuestionsForClef(stage, clef, layoutType)
    questionPool.push(...clefQuestions)
  }

  if (questionPool.length === 0) {
    throw new Error(`No interval questions available for stage ${stage}`)
  }

  return generateQuestionsFromPool(questionPool, questionsCount, getDuplicateIdentifier)
}
