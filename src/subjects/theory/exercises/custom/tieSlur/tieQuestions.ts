import { NOTES } from '@leonkwan46/music-notation'
import { createTieRecognitionQuestions } from './helpers'

export const TIE_QUESTIONS = createTieRecognitionQuestions([
  {
    type: 'musicStaff',
    clef: 'treble',
    elements: [
      { pitch: 'F4', type: NOTES.MINIM, stem: 'up', spacing: 40, tieStart: true },
      { type: 'barline', barlineType: 'single', spacing: 70 },
      { pitch: 'F4', type: NOTES.SEMIQUAVER, stem: 'up', showFlag: false, spacing: 50, tieEnd: true },
      { pitch: 'E4', type: NOTES.SEMIQUAVER, stem: 'up', showFlag: false, spacing: 50 },
      { pitch: 'G4', type: NOTES.SEMIQUAVER, stem: 'up', showFlag: false, spacing: 50 },
      { pitch: 'F4', type: NOTES.SEMIQUAVER, stem: 'up', showFlag: false, spacing: 50, endGroup: true }
    ],
    size: 'med'
  },
  {
    type: 'musicStaff',
    clef: 'bass',
    elements: [
        { pitch: 'C3', type: NOTES.SEMIBREVE, stem: 'up', tieStart: true },
        { pitch: 'C3', type: NOTES.SEMIBREVE, stem: 'up', tieEnd: true }
    ],
    size: 'xs'
  },
  {
    type: 'musicStaff',
    clef: 'treble',
    elements: [
      { pitch: 'F4', type: NOTES.QUAVER, stem: 'up', spacing: 40, tieStart: true },
      { type: 'barline', barlineType: 'single', spacing: 70 },
      { pitch: 'F4', type: NOTES.QUAVER, stem: 'up', showFlag: false, spacing: 50, tieEnd: true },
      { pitch: 'A4', type: NOTES.QUAVER, stem: 'up', showFlag: false, endGroup: true, tieStart: true }
    ],
    size: 'sml'
  }
])
