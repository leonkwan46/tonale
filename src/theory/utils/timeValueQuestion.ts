import { Question, StageNumber } from '../curriculum/types'
import { getAllNoteTypes, getAllRestTypes } from './exercise'
import { generateQuestionId, generateWrongChoices } from './question'
import { formatBeats, formatDottedBeatsDecomposed, noteTypeToBeats, noteTypeToString, restTypeToBeats, restTypeToString, TimeValueType } from './timeValue'

type QuestionKind = 'note' | 'rest'

const buildBeatChoiceStrings = (stages: StageNumber[]): string[] => {
  const uniqueStageList = Array.from(new Set(stages))
  const beatStringsSet = new Set<string>()

  uniqueStageList.forEach(stage => {
    const stageNoteTypes = getAllNoteTypes(stage)
    stageNoteTypes.forEach(noteType => {
      const beats = noteTypeToBeats(noteType)
      beatStringsSet.add(formatBeats(beats))
    })

    const stageRestTypes = getAllRestTypes(stage)
    stageRestTypes.forEach(restType => {
      const beats = restTypeToBeats(restType)
      beatStringsSet.add(formatBeats(beats))
    })
  })

  return Array.from(beatStringsSet)
}

interface CreateValueQuestionOptions {
  stage: StageNumber
  timeValue: TimeValueType
  isRest: boolean
  choiceStages: StageNumber[]
}

export const createValueBeatQuestion = ({
  stage,
  timeValue,
  isRest,
  choiceStages
}: CreateValueQuestionOptions): Question => {
  const questionKind: QuestionKind = isRest ? 'rest' : 'note'
  const beatsForValue = isRest ? restTypeToBeats(timeValue) : noteTypeToBeats(timeValue)
  let correctAnswer = formatBeats(beatsForValue)
  const valueDisplayName = isRest ? restTypeToString(timeValue) : noteTypeToString(timeValue)

  const choiceStrings = buildBeatChoiceStrings([stage, ...choiceStages])
  if (!choiceStrings.includes(correctAnswer)) {
    choiceStrings.push(correctAnswer)
  }

  const decomposed = formatDottedBeatsDecomposed(timeValue, isRest)
  if (decomposed) {
    const standard = correctAnswer
    correctAnswer = decomposed
    const idx = choiceStrings.indexOf(standard)
    if (idx !== -1) {
      choiceStrings[idx] = decomposed
    }
  }

  const questionText = isRest
    ? `How many beats is this ${valueDisplayName} worth?`
    : `How many beats does this ${valueDisplayName} get?`

  const explanation = isRest
    ? `A ${valueDisplayName.toLowerCase()} lasts for ${correctAnswer}.`
    : `A ${valueDisplayName.toLowerCase()} lasts for ${correctAnswer}.`

  return {
    id: generateQuestionId(`${questionKind}-value-beats`),
    question: questionText,
    correctAnswer,
    choices: generateWrongChoices(choiceStrings, correctAnswer),
    explanation,
    type: 'multipleChoice',
    visualComponent: {
      type: 'noteValue',
      noteType: timeValue
    }
  }
}

