import { MUSICAL_TERM_TTS_OVERRIDES } from '@/config/gradeSyllabus'
import { STAGE_ONE_ITALIAN_MUSICAL_TERMS, STAGE_THREE_ITALIAN_MUSICAL_TERMS, STAGE_TWO_ITALIAN_MUSICAL_TERMS } from '@/theory/curriculum/config/musicalTerms'
import * as Speech from 'expo-speech'

const getLanguageForTerm = (term: string): string => {
  // Italian terms (Stage One, Two, and Three)
  if (STAGE_ONE_ITALIAN_MUSICAL_TERMS[term as keyof typeof STAGE_ONE_ITALIAN_MUSICAL_TERMS] ||
      STAGE_TWO_ITALIAN_MUSICAL_TERMS[term as keyof typeof STAGE_TWO_ITALIAN_MUSICAL_TERMS] ||
      STAGE_THREE_ITALIAN_MUSICAL_TERMS[term as keyof typeof STAGE_THREE_ITALIAN_MUSICAL_TERMS]) {
    return 'it-IT'
  }
  
  // Future: French terms
  // if (STAGE_ONE_FRENCH_MUSICAL_TERMS[term]) return 'fr-FR'
  
  // Future: German terms  
  // if (STAGE_ONE_GERMAN_MUSICAL_TERMS[term]) return 'de-DE'
  
  return 'en-US' // fallback
}

const getSpokenTerm = (term: string): { text: string, language?: string } => {
  const override = MUSICAL_TERM_TTS_OVERRIDES[term as keyof typeof MUSICAL_TERM_TTS_OVERRIDES]
  if (override) {
    return override
  }

  return { text: term }
}

// TTS configuration
const TTS_CONFIG = {
  pitch: 1.0,
  rate: 0.8,
  quality: Speech.VoiceQuality.Enhanced
} as const

export const pronounceTerm = (term: string): void => {
  if (!term) return

  const trimmedTerm = term.trim()
  if (!trimmedTerm) return
  
  const { text: spokenTerm, language: overrideLanguage } = getSpokenTerm(trimmedTerm)
  
  try {
    // Stop any ongoing speech
    Speech.stop()
    
    // Get appropriate language for the term
    const language = overrideLanguage ?? getLanguageForTerm(spokenTerm)
    
    // Speak the term
    Speech.speak(spokenTerm, {
      language,
      ...TTS_CONFIG,
      onError: (error) => console.error('TTS Error:', error)
    })
  } catch (error) {
    console.error('TTS Error:', error)
  }
}

export const canPronounceTerm = (term: string): boolean => {
  if (!term) return false

  const trimmedTerm = term.trim()
  if (!trimmedTerm) return false

  const { text: spokenTerm } = getSpokenTerm(trimmedTerm)
  return spokenTerm.length > 0
}
