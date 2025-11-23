import { createTimeSignature, NOTES } from '@leonkwan46/music-notation'
import { createBeamedGroup, createNote, GroupingQuestion } from './groupingHelpers'

const THREE_FOUR_TIME_SIGNATURE = createTimeSignature(3, 4)

export const THREE_FOUR_QUESTIONS: GroupingQuestion[] = [
  // #1
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 3),
      ...createBeamedGroup(NOTES.QUAVER, 3)
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  },
  // #2
  {
    elements: [
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  },
  // #3
  {
    elements: [
      ...createBeamedGroup(NOTES.QUAVER, 4),
      createNote({ type: NOTES.CROTCHET })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  },
  // #4
  {
    elements: [
      createNote({ type: NOTES.CROTCHET }),
      ...createBeamedGroup(NOTES.QUAVER, 2),
      ...createBeamedGroup(NOTES.QUAVER, 2)
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  },
  // #5
  { 
    elements: [
      createNote({ type: NOTES.MINIM, spacing: undefined }),
      createNote({ type: NOTES.CROTCHET })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  },
  // #6
  {
    elements: [
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.QUAVER, tieStart: true }),
      createNote({ type: NOTES.QUAVER, tieEnd: true }),
      createNote({ type: NOTES.CROTCHET })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'True',
    explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  },
  // #7
  {
    elements: [
      createNote({ type: NOTES.QUAVER }),
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.CROTCHET }),
      createNote({ type: NOTES.QUAVER })
    ],
    timeSignature: THREE_FOUR_TIME_SIGNATURE,
    size: 'sml',
    correctAnswer: 'False',
    explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  }
]

