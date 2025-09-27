import { SMuFLSymbolType } from './index'

// Mapping from musical term names to SMuFL symbol types
export const TERM_TO_SYMBOL_MAP = {
  'Piano': 'PIANO',
  'Mezzo': 'MEZZO', 
  'Forte': 'FORTE',
  'Crescendo': 'CRESCENDO',
  'Diminuendo': 'DECRESCENDO',
  'Andante': 'ANDANTE',
  'Allegro': 'ALLEGRO',
  'Largo': 'LARGO'
} as const

// Type for valid term names
export type MusicalTermName = keyof typeof TERM_TO_SYMBOL_MAP

// Type for valid symbol types
export type ValidSymbolType = typeof TERM_TO_SYMBOL_MAP[MusicalTermName]

// Helper function to get symbol type from term name
export const getSymbolTypeFromTerm = (termName: string): SMuFLSymbolType | null => {
  return TERM_TO_SYMBOL_MAP[termName as MusicalTermName] || null
}
