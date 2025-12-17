export const NOTE_BEAT_VALUES: Record<string, number> = {
  semibreve: 4,
  minim: 2,
  crotchet: 1,
  quaver: 0.5,
  quaverTriplet: 0.333,
  semiquaver: 0.25
}

export const DEFAULT_TEMPO = 90
export const MIN_PATTERN_LENGTH = 2
export const BEAT_TOLERANCE = 0.01
export const TIMING_STRICTNESS_LEVEL = 2

export interface StrictnessConfig {
  tolerance: number
  relative: number
  match: number
  tempoMin: number
  tempoMax: number
}

export const STRICTNESS_CONFIG: StrictnessConfig[] = [
  { tolerance: 0.08, relative: 0.15, match: 0.7, tempoMin: 0.65, tempoMax: 1.6 },
  { tolerance: 0.06, relative: 0.12, match: 0.7, tempoMin: 0.75, tempoMax: 1.4 },
  { tolerance: 0.04, relative: 0.08, match: 0.8, tempoMin: 0.8, tempoMax: 1.3 },
  { tolerance: 0.025, relative: 0.05, match: 0.8, tempoMin: 0.85, tempoMax: 1.2 },
  { tolerance: 0.015, relative: 0.03, match: 0.9, tempoMin: 0.9, tempoMax: 1.15 }
]

export const getStrictnessConfig = (level: number): StrictnessConfig => {
  const index = Math.max(0, Math.min(level - 1, STRICTNESS_CONFIG.length - 1))
  return STRICTNESS_CONFIG[index]
}

export const strictness = getStrictnessConfig(TIMING_STRICTNESS_LEVEL)

export interface RhythmUnit {
  beats: number
  notes: { type: string; dots?: number }[]
}

export interface StagePatternConfig {
  availableGroupings: RhythmUnit[]
  defaultBeatsPerBar: number[]
}

export const STAGE_ZERO_PATTERN_CONFIG: StagePatternConfig = {
  availableGroupings: [
    { beats: 1, notes: [{ type: 'crotchet' }] },
    { beats: 1, notes: [{ type: 'quaver' }, { type: 'quaver' }] },
    { beats: 2, notes: [{ type: 'minim' }] }
  ],
  defaultBeatsPerBar: [4]
}

export const STAGE_ONE_PATTERN_CONFIG: StagePatternConfig = {
  availableGroupings: [
    { beats: 1, notes: [{ type: 'crotchet' }] },
    { beats: 1, notes: [{ type: 'quaver' }, { type: 'quaver' }] },
    { beats: 2, notes: [{ type: 'minim' }] },
    { beats: 2, notes: [{ type: 'crotchet', dots: 1 }, { type: 'quaver'}] }
  ],
  defaultBeatsPerBar: [4]
}

export const STAGE_TWO_PATTERN_CONFIG: StagePatternConfig = {
  availableGroupings: [
    { beats: 1, notes: [{ type: 'crotchet' }] },
    { beats: 1, notes: [{ type: 'quaver' }, { type: 'quaver' }] },
    { beats: 1, notes: [{ type: 'quaverTriplet' }, { type: 'quaverTriplet' }, { type: 'quaverTriplet' }] },
    { beats: 2, notes: [{ type: 'minim' }] },
    { beats: 2, notes: [{ type: 'crotchet', dots: 1 }, { type: 'quaver'}] }
  ],
  defaultBeatsPerBar: [4, 3]
}

export const getStagePatternConfig = (stage: number): StagePatternConfig => {
  switch (stage) {
    case 0:
      return STAGE_ZERO_PATTERN_CONFIG
    case 1:
      return STAGE_ONE_PATTERN_CONFIG
    case 2:
      return STAGE_TWO_PATTERN_CONFIG
    default:
      throw new Error(`Rhythm pattern config not implemented for stage ${stage}`)
  }
}
