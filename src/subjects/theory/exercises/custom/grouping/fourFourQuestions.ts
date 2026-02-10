import { createTimeSignature, NOTES } from '@leonkwan46/music-notation'
import { createBeamedGroup, createNote, GroupingQuestion } from './groupingHelpers'

const FOUR_FOUR_TIME_SIGNATURE = createTimeSignature(4, 4)

export const FOUR_FOUR_QUESTIONS: GroupingQuestion[] = [
  // #1
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 2, 50),
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.CROTCHET }),
      ...createBeamedGroup(NOTES.QUAVER, 2, 50)
    ],
    timeSignature: FOUR_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'True',
    explanation: { text: 'In 4/4 time, notes are grouped to show four beats.\nInstead of tying notes to make a beat, it is better to write crotchets.' }
  },
  // #2
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 2, 50),
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.CROTCHET, dots: 1, spacing: 100 }),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: FOUR_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'True',
    explanation: { text: 'In 4/4 time, notes are grouped to show four beats.\nThe dotted crotchet and quaver still show the beats clearly.' }
  },
  // #3
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 4),
      ...createBeamedGroup(NOTES.QUAVER, 4)
    ],
    timeSignature: FOUR_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'True',
    explanation: { text: 'In 4/4 time, notes can be grouped together across a beat.\n2 groups of 4 quavers are beamed here, but the beat divisions are still clear.' }
  },
  // #4
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 2),
      ...createBeamedGroup(NOTES.QUAVER, 4),
      ...createBeamedGroup(NOTES.QUAVER, 2)
    ],
    timeSignature: FOUR_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 4/4 time, we would separate the first 2 beats and last 2 beats into 2 separated groups.\nThe grouping above shows each beat clearly',
      visualComponent: {
        type: 'musicStaff',
        size: 'med',
        timeSignature: FOUR_FOUR_TIME_SIGNATURE,
        elements: [
          ...createBeamedGroup(NOTES.QUAVER, 4),
          ...createBeamedGroup(NOTES.QUAVER, 4)
        ],
        showStaff: false
      }
    }
  },
  // #5
  {
    elements: [
      createNote({ type: NOTES.CROTCHET, dots: 1, spacing: 100 }),
      createNote({ type: NOTES.QUAVER, showFlag: false }),
      createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true }),
      createNote({ type: NOTES.CROTCHET, dots: 1 })
    ],
    timeSignature: FOUR_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 4/4 time, notes are grouped to show four beats.\nThe grouping above shows each beat clearly.',
      visualComponent: {
        type: 'musicStaff',
        size: 'med',
        timeSignature: FOUR_FOUR_TIME_SIGNATURE,
        elements: [
          createNote({ type: NOTES.CROTCHET, dots: 1, spacing: 100 }),
          createNote({ type: NOTES.QUAVER }),
          createNote({ type: NOTES.QUAVER }),
          createNote({ type: NOTES.CROTCHET, dots: 1 })
        ],
        showStaff: false
      }
    }
  },
  // #6
  {
    elements: [
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.QUAVER, dots: 1, showFlag: false }),
      createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
      createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true }),
      createNote({ type: NOTES.CROTCHET })
    ],
    timeSignature: FOUR_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 4/4 time, notes are grouped to show four beats.\nThe grouping above shows each beat clearly.',
      visualComponent: {
        type: 'musicStaff',
        size: 'med',
        timeSignature: FOUR_FOUR_TIME_SIGNATURE,
        elements: [
          createNote({ type: NOTES.QUAVER }),
          createNote({ type: NOTES.CROTCHET }),
          createNote({ type: NOTES.QUAVER, tieEnd: true }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false, tieEnd: true }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
          createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true }),
          createNote({ type: NOTES.CROTCHET, tieEnd: true })
        ],
        showStaff: false
      }
    }
  },
  // #7
  {
    elements: [
      createNote({ type: NOTES.CROTCHET, dots: 1, spacing: 100 }),
      ...createBeamedGroup(NOTES.QUAVER, 3, 50),
      createNote({ type: NOTES.CROTCHET })
    ],
    timeSignature: FOUR_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 4/4 time, notes are grouped to show four beats.\nThe grouping above shows each beat clearly.',
      visualComponent: {
        type: 'musicStaff',
        size: 'med',
        timeSignature: FOUR_FOUR_TIME_SIGNATURE,
        elements: [
          createNote({ type: NOTES.CROTCHET, dots: 1, spacing: 100 }),
          createNote({ type: NOTES.QUAVER }),
          ...createBeamedGroup(NOTES.QUAVER, 2),
          createNote({ type: NOTES.CROTCHET })
        ],
        showStaff: false
      }
    }
  }
]
