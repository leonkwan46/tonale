import { createTimeSignature, NOTES } from '@leonkwan46/music-notation'
import { createBeamedGroup, createNote, GroupingQuestion } from './groupingHelpers'

const TWO_FOUR_TIME_SIGNATURE = createTimeSignature(2, 4)

export const TWO_FOUR_QUESTIONS: GroupingQuestion[] = [
  // #1
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 4)
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  },
  // #2
  {
    elements: [
      createNote({ type: NOTES.CROTCHET, dots: 1, spacing: 110 }),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  },
  // #3
  {
    elements: [
      createNote({ type: NOTES.QUAVER, showFlag: false }),
      createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true, tieStart: true }),
      createNote({ type: NOTES.QUAVER, showFlag: false, tieEnd: true }),
      createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  },
  // #4
{
    elements: [
        createNote({ type: NOTES.QUAVER, showFlag: false }),
        createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
        createNote({ type: NOTES.SEMIQUAVER, showFlag: false, endGroup: true }),
        createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
        createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
        createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'True',
    explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  },
  // #5
  {
    elements: [
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET, spacing: 100 }),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  },
  // #6
  {
    elements: [
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET, dots: 1, spacing: 100 })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  },
 // #7 (Unknown answer)
  {
    elements: [
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET, dots: 1 })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  },
  // #8 (Unknown answer)
  {
    elements: [
        createNote({ type: NOTES.QUAVER, showFlag: false }),
        createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
        createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
        createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
        createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
        createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'False',
    explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  }
]

