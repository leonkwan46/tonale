import * as React from 'react'
import { SMuFLSymbolContainer } from './SMuFLSymbol.styles'

// SMuFL Symbol Types as const enum for better type safety
export const SMuFLSymbols = {
  // Dynamics
  PIANO: '\u{1D18F}',
  MEZZO: '\u{1D190}',
  FORTE: '\u{1D191}',
  CRESCENDO: '\u{1D192}',
  DECRESCENDO: '\u{1D193}',
  // Tempo markings
  ANDANTE: 'Andante',
  ALLEGRO: 'Allegro',
  LARGO: 'Largo'
} as const

// Type for SMuFL symbol keys
export type SMuFLSymbolType = keyof typeof SMuFLSymbols

// Get symbol by type
export const getSMuFLSymbol = (type: SMuFLSymbolType): string => {
  return SMuFLSymbols[type]
}

// Component for displaying SMuFL symbols by type
export const SMuFLSymbolByType: React.FC<{ type: SMuFLSymbolType; isTablet?: boolean }> = ({ 
  type,
  isTablet
}: { type: SMuFLSymbolType; isTablet?: boolean }) => {
  const isTempoText = ['ANDANTE', 'ALLEGRO', 'LARGO'].includes(type)
  
  return (
    <SMuFLSymbolContainer isTablet={isTablet} isTempoText={isTempoText}>
      {getSMuFLSymbol(type)}
    </SMuFLSymbolContainer>
  )
}
// Export symbol mapping utilities
export { getSymbolTypeFromTerm, TERM_TO_SYMBOL_MAP } from './symbolMapping'
export type { MusicalTermName, ValidSymbolType } from './symbolMapping'

