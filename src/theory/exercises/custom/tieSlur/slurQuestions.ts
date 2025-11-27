import { NOTES } from '@leonkwan46/music-notation'
import { createSlurRecognitionQuestions } from './helpers'

export const SLUR_QUESTIONS = createSlurRecognitionQuestions([
  {
    type: 'musicStaff',
    clef: 'treble',
    elements: [
      { pitch: 'F4', type: NOTES.MINIM, stem: 'up', spacing: 40, slurStart: true },
      { type: 'barline', barlineType: 'single', spacing: 70 },
      { pitch: 'F4', type: NOTES.SEMIQUAVER, stem: 'up', showFlag: false, spacing: 50 },
      { pitch: 'E4', type: NOTES.SEMIQUAVER, stem: 'up', showFlag: false, spacing: 50, slurEnd: true },
      { pitch: 'G4', type: NOTES.SEMIQUAVER, stem: 'up', showFlag: false, spacing: 50 },
      { pitch: 'F4', type: NOTES.SEMIQUAVER, stem: 'up', showFlag: false, spacing: 50, endGroup: true }
    ],
    size: 'med'
  },
  {
    type: 'musicStaff',
    clef: 'bass',
    elements: [
      { pitch: 'C3', type: NOTES.SEMIBREVE, stem: 'up', slurStart: true },
      { pitch: 'D3', type: NOTES.SEMIBREVE, stem: 'up', slurEnd: true }
    ],
    size: 'sml'
  },
  {
    type: 'musicStaff',
    clef: 'treble',
    elements: [
      { pitch: 'F4', type: NOTES.QUAVER, stem: 'up', spacing: 40, slurStart: true },
      { type: 'barline', barlineType: 'single', spacing: 70 },
      { pitch: 'F4', type: NOTES.QUAVER, stem: 'up', showFlag: false, spacing: 50 },
      { pitch: 'A4', type: NOTES.QUAVER, stem: 'up', showFlag: false, endGroup: true, slurEnd: true }
    ],
    size: 'sml'
  }
])
