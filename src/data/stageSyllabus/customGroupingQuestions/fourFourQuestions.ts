import { createTimeSignature } from '@leonkwan46/music-notation'
import { GroupingQuestion } from './groupingHelpers'

const FOUR_FOUR_TIME_SIGNATURE = createTimeSignature(4, 4)

export const FOUR_FOUR_QUESTIONS: GroupingQuestion[] = [
  // // #1
  // {
  //   elements: [
  //     ...createBeamedGroup(NOTES.QUAVER, 2),
  //     ...createBeamedGroup(NOTES.QUAVER, 4),
  //     ...createBeamedGroup(NOTES.QUAVER, 2)
  //   ],
  //   timeSignature: FOUR_FOUR_TIME_SIGNATURE,
  //   size: 'lg',
  //   correctAnswer: 'False',
  //   explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  // },
  // // #2
  // {
  //   elements: [
  //     createNote({ type: NOTES.CROTCHET }),
  //     createNote({ type: NOTES.MINIM, spacing: undefined }),
  //     createNote({ type: NOTES.CROTCHET })
  //   ],
  //   timeSignature: FOUR_FOUR_TIME_SIGNATURE,
  //   size: 'sml',
  //   correctAnswer: 'False',
  //   explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  // },
  // // #3
  // {
  //   elements: [
  //     createNote({ type: NOTES.QUAVER }),
  //     createNote({ type: NOTES.CROTCHET }),
  //     createNote({ type: NOTES.QUAVER }),
  //     createNote({ type: NOTES.MINIM })
  //   ],
  //   timeSignature: FOUR_FOUR_TIME_SIGNATURE,
  //   size: 'sml',
  //   correctAnswer: 'False',
  //   explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  // },
  // // #4
  // {
  //   elements: [
  //     createNote({ type: NOTES.CROTCHET }),
  //     ...createBeamedGroup(NOTES.QUAVER, 4, 50),
  //     createNote({ type: NOTES.CROTCHET })
  //   ],
  //   timeSignature: FOUR_FOUR_TIME_SIGNATURE,
  //   size: 'lg',
  //   correctAnswer: 'False',
  //   explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  // }
  // // #5
  // {
  //   elements: [
  //     ...createBeamedGroup(NOTES.QUAVER, 2, 50),
  //     createNote({ type: NOTES.CROTCHET }),
  //     createNote({ type: NOTES.CROTCHET }),
  //     ...createBeamedGroup(NOTES.QUAVER, 2, 50)
  //   ],
  //   timeSignature: FOUR_FOUR_TIME_SIGNATURE,
  //   size: 'lg',
  //   correctAnswer: 'True',
  //   explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  // },
  // // #6
  // {
  //   elements: [
  //     ...createBeamedGroup(NOTES.QUAVER, 2, 50),
  //     createNote({ type: NOTES.CROTCHET }),
  //     createNote({ type: NOTES.CROTCHET }),
  //     ...createBeamedGroup(NOTES.QUAVER, 2, 50)
  //   ],
  //   timeSignature: FOUR_FOUR_TIME_SIGNATURE,
  //   size: 'lg',
  //   correctAnswer: 'True',
  //   explanation: 'The first group of 2 quavers is correct because it is grouped by beat.'
  // },
  // // #7
  // {
  //   elements: [
  //     ...createBeamedGroup(NOTES.QUAVER, 4),
  //     ...createBeamedGroup(NOTES.QUAVER, 4)
  //   ],
  //   timeSignature: FOUR_FOUR_TIME_SIGNATURE,
  //   size: 'lg',
  //   correctAnswer: 'True',
  //   explanation: 'The first group of 2 quavers is incorrect because it is not grouped by beat.'
  // },
]

