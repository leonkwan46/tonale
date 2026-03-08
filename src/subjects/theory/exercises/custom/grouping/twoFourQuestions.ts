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
    explanation: { text: 'In 2/4 time, notes can be grouped together across a beat.\nAll 4 quavers are beamed here, but the beat divisions are still clear.' }
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
    explanation: { text: 'In 2/4 time, notes are grouped to show two beats.\nThe dotted crotchet and quaver divide the bar into two clear beats.' }
  },
  // #3
  {
    elements: [
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET, spacing: 100 }),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: { text: 'In 2/4 time, notes are grouped to show the beats.\nInstead of tying notes to make a beat, it is better to write crotchets.'    }
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
    explanation: { text: 'In 2/4 time, notes are grouped to show two beats.\nThe grouping above shows each beat clearly.' }
  },
  // #5
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 3),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 2/4 time, notes can be grouped together across a beat.\nAll 4 quavers are beamed here, but the beat divisions are still clear.',
      visualComponent: {
        type: 'musicStaff',
        size: 'sml',
        timeSignature: TWO_FOUR_TIME_SIGNATURE,
        elements: [
          ...createBeamedGroup(NOTES.QUAVER, 4)
        ],
        showStaff: false
      }
    }
  },
  // #6
  {
    elements: [
      createNote({ type: NOTES.QUAVER }),
      ...createBeamedGroup(NOTES.QUAVER, 3)
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 2/4 time, notes can be grouped together across a beat.\nAll 4 quavers are beamed here, but the beat divisions are still clear.',
      visualComponent: {
        type: 'musicStaff',
        size: 'sml',
        timeSignature: TWO_FOUR_TIME_SIGNATURE,
        elements: [
          ...createBeamedGroup(NOTES.QUAVER, 4)
        ],
        showStaff: false
      }
    }
  },
  // #7
  {
    elements: [
      createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
      createNote({ type: NOTES.QUAVER, showFlag: false }),
      createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
      createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true }),
      createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
      createNote({ type: NOTES.SEMIQUAVER, showFlag: false, endGroup: true })
    ],
    timeSignature: TWO_FOUR_TIME_SIGNATURE,
    size: 'med',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 2/4 time, notes are grouped to show two beats.\nThe grouping above shows each beat clearly.',
      visualComponent: {
        type: 'musicStaff',
        size: 'med',
        timeSignature: TWO_FOUR_TIME_SIGNATURE,
        elements: [
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
          createNote({ type: NOTES.QUAVER, showFlag: false }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false, endGroup: true }),
          createNote({ type: NOTES.QUAVER, showFlag: false }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false, endGroup: true })
        ],
        showStaff: false
      }
    }
  },
  // #8
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
    explanation: { 
      text: 'In 2/4 time, notes are grouped to show two beats.\nThe grouping above shows each beat clearly.',
      visualComponent: {
        type: 'musicStaff',
        size: 'med',
        timeSignature: TWO_FOUR_TIME_SIGNATURE,
        elements: [
          createNote({ type: NOTES.QUAVER, showFlag: false }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false, endGroup: true }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
          createNote({ type: NOTES.SEMIQUAVER, showFlag: false }),
          createNote({ type: NOTES.QUAVER, showFlag: false, endGroup: true })
        ],
        showStaff: false
      }
    }
  }
]

