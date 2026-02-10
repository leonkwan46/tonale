// Type exports
export type {
  Question,
  ExerciseConfig,
  Lesson,
  StageLesson,
  QuestionInterface,
  StageNumber,
  PulseExercise,
  PulseStrictnessConfig,
  StrictnessConfig,
  Stage,
  RhythmPatternConfig
} from './types'

// Config exports - Pulse
export {
  getPulseStrictnessConfig,
  pulseStrictness,
  PULSE_STRICTNESS_CONFIG,
  calculatePulseTimestamps
} from './config/pulse'

export {
  DEFAULT_TEMPO as PULSE_DEFAULT_TEMPO,
  DEFAULT_TIME_SIGNATURE,
  TIMING_STRICTNESS_LEVEL as PULSE_TIMING_STRICTNESS_LEVEL
} from './config/pulse'

// Config exports - Rhythm
export {
  NOTE_BEAT_VALUES,
  MIN_PATTERN_LENGTH,
  BEAT_TOLERANCE,
  getStrictnessConfig,
  strictness,
  STRICTNESS_CONFIG,
  STAGE_ZERO_PATTERN_CONFIG,
  getStagePatternConfig
} from './config/rhythm'

export {
  DEFAULT_TEMPO as RHYTHM_DEFAULT_TEMPO,
  TIMING_STRICTNESS_LEVEL as RHYTHM_TIMING_STRICTNESS_LEVEL
} from './config/rhythm'

// Stage exports
export { stage0 } from './stages/stageZero'
export * from './stages/helpers'
