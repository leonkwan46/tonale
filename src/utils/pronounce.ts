import { MUSICAL_TERM_TTS_OVERRIDES } from '@/config/gradeSyllabus'
import { STAGE_ONE_ITALIAN_MUSICAL_TERMS, STAGE_THREE_ITALIAN_MUSICAL_TERMS, STAGE_TWO_ITALIAN_MUSICAL_TERMS } from '@/subjects/theory/curriculum/config/musicalTerms'
import * as Speech from 'expo-speech'

const getLanguageForTerm = (term: string): string => {
  if (
    STAGE_ONE_ITALIAN_MUSICAL_TERMS[term as keyof typeof STAGE_ONE_ITALIAN_MUSICAL_TERMS] ||
    STAGE_TWO_ITALIAN_MUSICAL_TERMS[term as keyof typeof STAGE_TWO_ITALIAN_MUSICAL_TERMS] ||
    STAGE_THREE_ITALIAN_MUSICAL_TERMS[term as keyof typeof STAGE_THREE_ITALIAN_MUSICAL_TERMS]
  ) {
    return 'it-IT'
  }
  return 'en-US'
}

const getSpokenTerm = (term: string): { text: string, language?: string } => {
  const override = MUSICAL_TERM_TTS_OVERRIDES[term as keyof typeof MUSICAL_TERM_TTS_OVERRIDES]
  if (override) {
    return override
  }

  return { text: term }
}

const TTS_CONFIG = {
  pitch: 1.0,
  rate: 0.8,
  quality: Speech.VoiceQuality.Enhanced
} as const

const CHARS_PER_SECOND_AT_RATE_08 = 10
const MIN_DURATION_MS = 800
const BUFFER_MS = 200

const estimateDurationMs = (text: string): number => {
  const durationMs = (text.length / CHARS_PER_SECOND_AT_RATE_08) * 1000 + BUFFER_MS
  return Math.max(MIN_DURATION_MS, Math.round(durationMs))
}

export const pronounceTerm = (term: string, onDone?: () => void): void => {
  const trimmedTerm = term?.trim()
  if (!trimmedTerm) return

  const { text: spokenTerm, language: overrideLanguage } = getSpokenTerm(trimmedTerm)

  const run = async () => {
    try {
      await Speech.stop()

      const language = overrideLanguage ?? getLanguageForTerm(spokenTerm)

      let done = false
      let timeoutId: ReturnType<typeof setTimeout> | null = null

      const finish = () => {
        if (done) return
        done = true
        if (timeoutId) clearTimeout(timeoutId)
        void Speech.stop().then(() => onDone?.())
      }

      Speech.speak(spokenTerm, {
        language,
        ...TTS_CONFIG,
        onDone: finish,
        onError: (error) => {
          console.error('TTS Error:', error)
          finish()
        }
      })

      timeoutId = setTimeout(finish, estimateDurationMs(spokenTerm))
    } catch (error) {
      console.error('TTS Error:', error)
      onDone?.()
    }
  }

  void run()
}

export const canPronounceTerm = (term: string): boolean => {
  const trimmed = term?.trim()
  if (!trimmed) return false
  const { text: spokenTerm } = getSpokenTerm(trimmed)
  return spokenTerm.length > 0
}
