import { GENDER, INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import { capitalize } from '@/utils/string'

export function getGenderDisplayLabel(gender: UserGender): string {
  if (gender === GENDER.NEUTRAL) return 'Prefer not to say'
  return capitalize(gender)
}

export function getAvatarHeadSource(gender: UserGender) {
  if (gender === GENDER.FEMALE) {
    return require('../../assets/images/girl/girl_head.png')
  }
  if (gender === GENDER.NEUTRAL) {
    return require('../../assets/images/bald/bald_head.png')
  }
  return require('../../assets/images/boy/boy_head.png')
}

export function getAvatarFullSource(gender: UserGender, instrument?: UserInstrument | string | null) {
  const baseFull =
    gender === GENDER.FEMALE
      ? require('../../assets/images/girl/girl_full.png')
      : gender === GENDER.NEUTRAL
        ? require('../../assets/images/bald/bald_full.png')
        : require('../../assets/images/boy/boy_full.png')

  // Keep this conservative: only use instrument art when we *know* we have it.
  // Any unknown instrument (including future custom strings) falls back to *_full.
  if (!instrument) return baseFull

  // Neutral currently has no instrument variants; always fallback to *_full.
  if (gender === GENDER.NEUTRAL) return baseFull

  if (instrument === INSTRUMENT.PIANO) {
    return gender === GENDER.FEMALE
      ? require('../../assets/images/girl/girl_piano.png')
      : require('../../assets/images/boy/boy_piano.png')
  }

  if (instrument === INSTRUMENT.GUITAR) {
    return gender === GENDER.FEMALE
      ? require('../../assets/images/girl/girl_guitar.png')
      : require('../../assets/images/boy/boy_guitar.png')
  }

  if (instrument === INSTRUMENT.VIOLIN) {
    return gender === GENDER.FEMALE
      ? require('../../assets/images/girl/girl_violin.png')
      : require('../../assets/images/boy/boy_violin.png')
  }

  if (instrument === INSTRUMENT.VOCAL) {
    return gender === GENDER.FEMALE
      ? require('../../assets/images/girl/girl_vocal.png')
      : require('../../assets/images/boy/boy_vocal.png')
  }

  return baseFull
}

