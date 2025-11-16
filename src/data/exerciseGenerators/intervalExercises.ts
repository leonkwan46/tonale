import { NOTES, type ClefType } from '@leonkwan46/music-notation'
import { generateQuestionsFromPool } from '../helpers/exerciseHelpers'
import { calculateAbsoluteSemitone, calculateInterval, extractNotePrefix, getIntervalExerciseNoteDefinitions, getIntervalNameForStage, getNotesForPitches, getStageIntervals } from '../helpers/intervalHelpers'
import { generateQuestionId, generateWrongChoices } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

const CLEFS: ClefType[] = ['treble', 'bass']

export const createIntervalQuestion = (
  stage: StageNumber, 
  clef: ClefType,
  tonicPitch: string,
  targetPitch: string
): Question => {
  const stageIntervals = getStageIntervals(stage)

  const { tonicNote, targetNote } = getNotesForPitches(tonicPitch, targetPitch, clef)
  const calculatedInterval = calculateInterval(tonicPitch, targetPitch)
  const correctAnswer = getIntervalNameForStage(calculatedInterval, stage, stageIntervals)
  if (!stageIntervals.includes(correctAnswer)) {
    throw new Error(`Interval ${correctAnswer} is not part of stage ${stage} syllabus`)
  }
  
  return {
    id: generateQuestionId('interval'),
    question: 'What interval is this above the tonic?',
    correctAnswer,
    choices: generateWrongChoices([...stageIntervals], correctAnswer),
    explanation: `The interval above the tonic is a ${calculatedInterval.simpleName} (${calculatedInterval.semitones} semitones).`,
    type: 'multipleChoice',
    visualComponent: {
      clef,
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
  }
}

const getQuestionKey = (question: Question): string | null => {
  return question.correctAnswer ?? null
}

const generateQuestionsForClef = (stage: StageNumber, clef: ClefType): Question[] => {
  const questions: Question[] = []
  const stageNoteDefinitions = getIntervalExerciseNoteDefinitions(stage, clef)
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
          const question = createIntervalQuestion(stage, clef, tonicPitch, selectedTargetPitch)
          questions.push(question)
        }
      } else {
        const interval = calculateInterval(tonicPitch, proposedTargetPitch)
        if (interval.number >= 2) {
          const question = createIntervalQuestion(stage, clef, tonicPitch, proposedTargetPitch)
          questions.push(question)
        }
      }
    }
  }

  return questions
}

export const createIntervalQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const questionPool: Question[] = []

  for (const clef of CLEFS) {
    const clefQuestions = generateQuestionsForClef(stage, clef)
    questionPool.push(...clefQuestions)
  }

  if (questionPool.length === 0) {
    throw new Error(`No interval questions available for stage ${stage}`)
  }

  return generateQuestionsFromPool(questionPool, questionsCount, getQuestionKey)
}
