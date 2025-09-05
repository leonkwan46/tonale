// Lesson configurations for Stage 1 (Grade 1 Music Theory)
import { ExerciseConfig } from '../theoryData/types'

export const lesson1Config: ExerciseConfig = {
  generators: [
    { generatorId: 'noteValue', count: 3, difficulty: 'beginner' },
    { generatorId: 'noteValue', count: 2, difficulty: 'beginner' }, // Rests
    { generatorId: 'noteValue', count: 2, difficulty: 'beginner' }, // Tied notes
    { generatorId: 'noteValue', count: 1, difficulty: 'beginner' }  // Dotted notes
  ],
  totalQuestions: 8
}

export const lesson2Config: ExerciseConfig = {
  generators: [
    { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' }, // 2/4
    { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' }, // 3/4
    { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' }, // 4/4
    { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' }  // Note grouping
  ],
  totalQuestions: 8
}

export const lesson3Config: ExerciseConfig = {
  generators: [
    { generatorId: 'noteIdentification', count: 3, difficulty: 'beginner' }, // Treble clef
    { generatorId: 'noteIdentification', count: 3, difficulty: 'beginner' }, // Bass clef
    { generatorId: 'noteIdentification', count: 2, difficulty: 'beginner' }, // Middle C
    { generatorId: 'noteIdentification', count: 2, difficulty: 'beginner' }  // Accidentals
  ],
  totalQuestions: 10
}

export const lesson4Config: ExerciseConfig = {
  generators: [
    { generatorId: 'keySignature', count: 2, difficulty: 'beginner' }, // Scale construction
    { generatorId: 'keySignature', count: 3, difficulty: 'beginner' }, // Key signatures
    { generatorId: 'keySignature', count: 2, difficulty: 'beginner' }, // Tonic triads
    { generatorId: 'keySignature', count: 1, difficulty: 'beginner' }  // Scale degrees
  ],
  totalQuestions: 8
}

export const lesson5Config: ExerciseConfig = {
  generators: [
    { generatorId: 'musicalTerm', count: 4, difficulty: 'beginner' }, // Tempo markings
    { generatorId: 'musicalTerm', count: 2, difficulty: 'beginner' }, // Dynamics
    { generatorId: 'musicalTerm', count: 2, difficulty: 'beginner' }  // Articulation
  ],
  totalQuestions: 8
}

// Final test configuration
export const stage1FinalConfig: ExerciseConfig = {
  generators: [
    { generatorId: 'noteValue', count: 2, difficulty: 'beginner' },
    { generatorId: 'timeSignature', count: 2, difficulty: 'beginner' },
    { generatorId: 'noteIdentification', count: 3, difficulty: 'beginner' },
    { generatorId: 'keySignature', count: 2, difficulty: 'beginner' },
    { generatorId: 'musicalTerm', count: 2, difficulty: 'beginner' }
  ],
  totalQuestions: 11
}
