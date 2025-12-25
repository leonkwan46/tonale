import { createTimeSignature, NOTES } from '@leonkwan46/music-notation'
import { createBeamedGroup, createNote, GroupingQuestion } from './groupingHelpers'

const THREE_FOUR_TIME_SIGNATURE = createTimeSignature(3, 4)

export const THREE_FOUR_QUESTIONS: GroupingQuestion[] = [
  // #1
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 4),
      createNote({ type: NOTES.CROTCHET })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: { text: 'In 3/4 time, notes can be grouped together across a beat.\nThe three beats are still clear in this grouping.' }
  },
  // #2
  {
    elements: [
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.CROTCHET, dots: 1, spacing: 100 }),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: { text: 'In 3/4 time, notes are grouped to show three beats.\nThe dotted crotchet and quaver still show the beats clearly.' }
  },
  // #3
  { 
    elements: [
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.MINIM })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: { text: 'In 3/4 time, notes are grouped to show three beats.\nThe minim clearly covers beats two and three.' }
  },
  // #4
  {
    elements: [
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: { text: 'In 3/4 time, notes are grouped to show the beats.\nInstead of tying notes to make a beat, it is better to write crotchets.' }
  },
  // #5
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 3),
      ...createBeamedGroup(NOTES.QUAVER, 3)
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 3/4 time, notes are grouped to show three beats.\nThe grouping above shows each beat clearly.',
      visualComponent: {
        type: 'musicStaff',
        size: 'sml',
        timeSignature: THREE_FOUR_TIME_SIGNATURE,
        elements: [
          ...createBeamedGroup(NOTES.QUAVER, 2),
          ...createBeamedGroup(NOTES.QUAVER, 2),
          ...createBeamedGroup(NOTES.QUAVER, 2)
        ],
        showStaff: false
      }
    }
  },
  // #6
  {
    elements: [
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 3/4 time, notes are grouped to show three beats.\nThe grouping above shows each beat clearly.',
      visualComponent: {
        type: 'musicStaff',
        size: 'sml',
        timeSignature: THREE_FOUR_TIME_SIGNATURE,
        elements: [
          createNote({ type: NOTES.CROTCHET }),
          ...createBeamedGroup(NOTES.QUAVER, 2),
          createNote({ type: NOTES.CROTCHET })
        ],
        showStaff: false
      }
    }
  },
  // #7
  {
    elements: [
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.QUAVER, tieStart: true }),
      createNote({ type: NOTES.QUAVER, tieEnd: true }),
      createNote({ type: NOTES.CROTCHET })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: { 
      text: 'In 3/4 time, notes are grouped to show three beats.\nThe grouping above shows each beat clearly.',
      visualComponent: {
        type: 'musicStaff',
        size: 'sml',
        timeSignature: THREE_FOUR_TIME_SIGNATURE,
        elements: [
          createNote({ type: NOTES.CROTCHET }),
          createNote({ type: NOTES.CROTCHET }),
          createNote({ type: NOTES.CROTCHET })
        ],
        showStaff: false
      }
    }
  }
]
