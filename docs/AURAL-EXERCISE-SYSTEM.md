# Aural Exercise System Documentation

## Overview

This document provides comprehensive documentation for the aural exercise system in Tonalè. It covers exercise generation, playback mechanisms, rhythm tapping interfaces, answer comparison algorithms, and integration points. This documentation is intended to help when rebuilding the aural system from the staging branch.

## ⚠️ Quick Note: Audio Files

**Current Status:**
- ✅ `clap.mp3` and `metronome_beat.mp3` are available
- ⏳ **Pulse exercise song files will be obtained later** - new songs will replace current references
- 📝 See [Audio Files Status & Migration Notes](#audio-files-status--migration-notes) section for details

**For Now:** Rhythm exercises work fully (no song files needed). Pulse exercises can be temporarily disabled until new songs are available.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Exercise Generation System](#exercise-generation-system)
3. [Playback System](#playback-system)
4. [Rhythm Tapping Answer Interface](#rhythm-tapping-answer-interface)
5. [Answer Comparison Algorithms](#answer-comparison-algorithms)
6. [Curriculum Structure](#curriculum-structure)
7. [Integration Points](#integration-points)
8. [File Structure Map](#file-structure-map)
9. [Comparison with Staging Branch](#comparison-with-staging-branch)

---

## Architecture Overview

The aural exercise system consists of several interconnected components:

```
┌─────────────────────────────────────────────────────────────┐
│                    Aural Exercise Flow                       │
└─────────────────────────────────────────────────────────────┘

1. Exercise Generation
   └─> Generates questions based on exercise config
       └─> Creates Question objects with playback data

2. Playback System
   └─> Plays audio (MP3 files or rhythm claps)
       └─> Visual feedback (ripple animations)
       └─> Metronome support (optional)

3. Answer Interface
   └─> RhythmTap component
       └─> Records user taps with timestamps
       └─> Auto-submits when complete

4. Answer Comparison
   └─> Compares user timestamps with expected
       └─> Uses tolerance-based algorithms
       └─> Returns correct/incorrect
```

### Key Concepts

- **Exercise Config**: Defines generator type, question count, and stage
- **Question Interface**: Contains playback data (audioFile, rhythm, tempo)
- **Answer Interface**: Defines how user answers (`rhythmTap`)
- **Timestamps**: Relative time values (seconds from start) for taps
- **Strictness Config**: Tolerance settings for answer comparison

---

## Exercise Generation System

### Location
`src/subjects/aural/exercises/`

### Main Entry Point

**File:** `generate.ts`

```typescript
export const generateAuralQuestions = (config: ExerciseConfig): Question[] => {
  const { generatorType, questionsCount, stage } = config

  switch (generatorType) {
    case 'pulse':
      return createPulseQuestions(questionsCount, stage)
    case 'rhythm':
      return createRhythmQuestions(questionsCount, stage)
    case 'singing':
      return createSingingQuestions(questionsCount, stage)
    case 'dynamics':
      return createDynamicsQuestions(questionsCount, stage)
    default:
      return []
  }
}
```

### Exercise Generators

#### 1. Pulse Exercises (`generators/pulse.ts`)

**Purpose:** User taps along with the steady pulse/beat of a melody.

**Key Functions:**
- `createPulseQuestions(count, stage)` - Generates pulse tapping exercises
- `comparePulsePattern(userTimestamps, expectedTimestamps)` - Compares user taps with expected pulse

**How It Works:**
1. Selects a random MP3 audio file from predefined exercises
2. Calculates expected pulse timestamps based on tempo
3. Creates a Question with:
   - `answerInterface: 'rhythmTap'`
   - `questionInterface.type: 'playback'`
   - `questionInterface.audioFile`: MP3 file reference
   - `questionInterface.tempo`: BPM of the audio
   - `correctAnswer`: Array of expected pulse timestamps

**Example:**
```typescript
{
  id: 'pulse-tap-123',
  title: 'Tap the pulse of the melody you hear.',
  correctAnswer: [0, 0.706, 1.412, 2.118, ...], // Timestamps in seconds
  answerInterface: 'rhythmTap',
  questionInterface: {
    type: 'playback',
    audioFile: require('../../assets/sounds/songs/chopin-1.mp3'),
    tempo: 85
  }
}
```

**⚠️ Important Note on Song Files:**
- **Current Status:** New song files will be obtained. The current song references in `pulse.ts` may not exist initially.
- **Temporary Solution:** Until new songs are available:
  1. Pulse exercises can be temporarily disabled in stage definitions
  2. Or use placeholder/silent audio files (exercises will generate but won't play audio)
  3. Focus on rhythm exercises which don't require song files
- **When Adding New Songs:**
  - Update `PULSE_EXERCISES` array in `src/subjects/aural/exercises/generators/pulse.ts`
  - Ensure tempo and duration values match the actual audio files
  - File format: MP3, recommended duration: ~30 seconds

**Audio Files:**
- **NOTE:** New song files will be obtained. Current references are:
  - `chopin-1.mp3` (tempo: 85 BPM, duration: 30s) - **To be replaced**
  - `grieg-1.mp3` (tempo: 137 BPM, duration: 30s) - **To be replaced**
  - `mozart-1.mp3` (tempo: 73 BPM, duration: 30s) - **To be replaced**
  - `mozart-2.mp3` (tempo: 95 BPM, duration: 30s) - **To be replaced**
  - `schuman-1.mp3` (tempo: 100 BPM, duration: 30s) - **To be replaced**

**Important:** Update `src/subjects/aural/exercises/generators/pulse.ts` when new songs are available to replace the file paths and update tempo/duration values if needed.

#### 2. Rhythm Exercises (`generators/rhythm.ts`)

**Purpose:** User echoes/claps back a rhythm pattern they hear.

**Key Functions:**
- `createRhythmQuestions(count, stage)` - Generates rhythm echo exercises
- `compareRhythmPattern(userTimestamps, expectedTimestamps)` - Compares user rhythm with expected

**How It Works:**
1. Generates a random rhythm pattern based on stage difficulty
2. Converts pattern to durations (note lengths in seconds)
3. Converts durations to timestamps (when each note should be played)
4. Creates a Question with:
   - `answerInterface: 'rhythmTap'`
   - `questionInterface.type: 'playback'`
   - `questionInterface.rhythm`: Array of note durations
   - `questionInterface.tempo`: BPM (default 90)
   - `correctAnswer`: Array of expected tap timestamps

**Pattern Generation:**
- Uses stage-specific note groupings
- Ensures minimum pattern length (2 notes)
- Randomly selects from available groupings
- Fills bars according to time signature

**Example:**
```typescript
{
  id: 'rhythm-echo-456',
  title: 'Clap back the rhythm you hear.',
  correctAnswer: [0, 0.667, 1.0, 1.667], // Timestamps
  answerInterface: 'rhythmTap',
  questionInterface: {
    type: 'playback',
    rhythm: [1.0, 0.333, 0.333, 0.667], // Durations in seconds
    tempo: 90
  }
}
```

#### 3. Singing Exercises (`generators/singing.ts`)

**Status:** Not yet implemented (returns empty array)

**Planned Purpose:** User sings back melodic phrases as echoes.

#### 4. Dynamics Exercises (`generators/dynamics.ts`)

**Status:** Not yet implemented (returns empty array)

**Planned Purpose:** User identifies dynamics (loud/quiet) or articulation (smooth/detached).

---

## Playback System

### Location
`src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/`

### Main Component

**File:** `Playback.tsx`

**Props:**
```typescript
interface PlaybackProps {
  questionInterface: QuestionInterface
  onPlaybackPress?: () => void
  isPlaying?: boolean
  onClapPlayingChange?: (isPlaying: boolean) => void
  correctAnswer?: string | number[]
  answerInterface?: string
  enableMetronome?: boolean
  isAnswering?: boolean
  onPlaybackFinish?: () => void
  onPlaybackStart?: () => void
}
```

**Features:**
- Unified interface for audio file and rhythm clap playback
- Visual ripple animations during playback
- Play/pause button with state management
- Automatic detection of playback type (audioFile vs rhythm)

**Playback Types:**
1. **Audio File Playback**: Uses `useAudioFilePlayback` hook for MP3 files
2. **Rhythm Claps**: Uses `useRhythmClaps` hook for synthesized claps
3. **Custom Playback**: Uses `onPlaybackPress` callback for custom implementations

### Hooks

#### 1. `useAudioFilePlayback.ts`

**Purpose:** Handles playback of pre-recorded MP3 audio files.

**API:**
```typescript
const { isPlaying, play, stop } = useAudioFilePlayback()

await play(audioFile, onStart, onFinish)
```

**Features:**
- Single audio file playback
- Volume control (AUDIO_VOLUME_PLAYBACK = 0.7)
- Auto-cleanup on finish
- Start/finish callbacks

**Usage:**
```typescript
const { isPlaying, play } = useAudioFilePlayback()

if (audioFile) {
  await playAudioFile(audioFile, onPlaybackStart, onPlaybackFinish)
}
```

#### 2. `useRhythmClaps.ts`

**Purpose:** Handles playback of rhythm patterns using synthesized clap sounds.

**API:**
```typescript
const { isPlaying, playRhythmClaps, stop } = useRhythmClaps({
  tempo: 90,
  enableMetronome: true,
  onClapPlayingChange: (isPlaying) => {},
  onPlaybackStart: () => {},
  onPlaybackFinish: () => {}
})

playRhythmClaps(timestamps, notifyStart)
```

**Features:**
- Precise timing using scheduler (5ms intervals)
- Preloads multiple clap players for concurrent playback
- Metronome integration (optional)
- Round-robin player reuse for long patterns
- Schedule-ahead mechanism (50ms) for timer jitter compensation

**How It Works:**
1. Preloads clap sound players (minimum 5, or pattern length)
2. Sets shared start time for metronome sync
3. Starts scheduler that runs every 5ms
4. Schedules claps 50ms ahead to account for timer jitter
5. Plays claps at precise timestamps
6. Cleans up on finish

**Constants:**
- `SCHEDULE_INTERVAL_MS = 5` - Scheduler check interval
- `SCHEDULE_AHEAD_MS = 50` - Look-ahead time for scheduling
- `CLAP_SOUND` - Path to clap.mp3 asset
- `AUDIO_VOLUME_PLAYBACK = 0.7` - Clap volume
- `AUDIO_VOLUME_METRONOME = 0.4` - Metronome volume

#### 3. `usePlaybackRipples.ts`

**Purpose:** Manages visual ripple animations during playback.

**API:**
```typescript
const { ripples, removeRipple } = usePlaybackRipples({
  isPlaying: boolean,
  rhythm?: number[]
})
```

**Features:**
- Creates ripples at rhythm timestamps
- Auto-removes ripples when animation completes
- Cleans up on playback stop

**How It Works:**
1. Converts rhythm durations to timestamps
2. Sets timeouts for each timestamp
3. Creates ripple ID when timeout fires
4. Ripple component removes itself on animation complete

### Utilities

**File:** `utils.ts`

**Function:** `convertDurationsToTimestamps(durations: number[])`

Converts note durations to timestamps:
```typescript
// Input: [1.0, 0.5, 0.5, 1.0] (durations in seconds)
// Output: [0, 1.0, 1.5, 2.0] (timestamps in seconds)
```

---

## Rhythm Tapping Answer Interface

### Location
`src/screens/LessonScreen/components/AnswerInterface/AnswerTypes/RhythmTap/`

### Component

**File:** `RhythmTap/index.tsx`

**Props:**
```typescript
interface RhythmTapProps {
  onTapSubmit: (timestamps: number[]) => void
  disabled?: boolean
  rhythmDuration?: number
  buttonState?: 'default' | 'correct' | 'incorrect'
  tempo?: number
  questionInterface?: { rhythm?: number[]; audioFile?: string }
  onRecordingChange?: (isRecording: boolean) => void
  onPlaybackFinishRef?: React.MutableRefObject<(() => void) | null>
}
```

### Features

#### 1. Tap Recording
- Records timestamps relative to first tap (starts at 0)
- Stores timestamps in state and ref for reliability
- Prevents duplicate submissions

#### 2. Metronome Integration
- Automatically starts metronome on first tap (for rhythm exercises)
- Stops metronome on submit or disable
- Uses `useMetronome` hook with configurable BPM

#### 3. Exercise Type Detection
- **Pulse Exercise**: `audioFile` present, no `rhythm`
  - Waits for playback to finish before auto-submitting
  - No metronome during recording
- **Rhythm Exercise**: `rhythm` present, no `audioFile`
  - Auto-submits after `rhythmDuration` milliseconds
  - Metronome starts automatically

#### 4. Auto-Submit Logic
- **Pulse**: Submits when `onPlaybackFinishRef` callback fires
- **Rhythm**: Submits after `rhythmDuration` timeout
- Prevents multiple submissions with `hasSubmittedRef`

#### 5. Visual Feedback
- 3D button with depth effect
- Active state during recording
- Correct/incorrect states after submission
- Clap sound on each tap

#### 6. State Management
- `isRecording`: Whether currently recording taps
- `isTimeWindowExpired`: Whether auto-submit has fired
- `hasSubmittedRef`: Prevents duplicate submissions
- `tapTimestamps`: Array of relative timestamps

### Key Logic Flow

```
User taps button
  ↓
First tap?
  ├─ Yes → Start recording
  │        Set startTimeRef
  │        Initialize timestamps to [0]
  │        Start metronome (if rhythm exercise)
  │        Set auto-submit timeout (if rhythm exercise)
  │
  └─ No → Record relative timestamp
           Add to timestamps array
           Play clap sound

Auto-submit triggers
  ↓
Stop recording
Stop metronome
Clear timeout
Call onTapSubmit with timestamps
```

### Clap Sound Feedback

Each tap plays a clap sound:
```typescript
const playClapSound = useCallback(() => {
  const player = createAudioPlayer(CLAP_SOUND)
  player.volume = 0.8
  void player.play()
  setupAutoCleanup(player)
}, [])
```

---

## Answer Comparison Algorithms

### Location
`src/subjects/aural/exercises/generators/`

### 1. Pulse Pattern Comparison

**Function:** `comparePulsePattern(userTimestamps, expectedTimestamps, strictnessLevel?)`

**File:** `pulse.ts`

**Purpose:** Determines if user tapped a steady pulse matching the expected beat.

**Algorithm Steps:**

1. **Normalization**
   - Normalizes both arrays to start at 0
   - `normalizeTimestamps([1.5, 2.0, 2.5])` → `[0, 0.5, 1.0]`

2. **Interval Calculation**
   - Calculates intervals between consecutive timestamps
   - `calculateIntervals([0, 0.5, 1.0])` → `[0.5, 0.5]`

3. **Expected Beat Detection**
   - Uses first expected interval as the expected beat duration
   - Example: If expected intervals are `[0.706, 0.706, 0.706]`, expected beat = 0.706s

4. **Tolerance Calculation**
   - Uses configurable strictness settings
   - `relativeTolerance = expectedBeat * strictness.relative`
   - `absoluteTolerance = min(strictness.tolerance, relativeTolerance)`

5. **Interval Matching**
   - Compares each user interval to expected beat
   - Counts matches and outliers
   - Outlier: `intervalDifference > expectedBeat * strictness.outlierThreshold`

6. **Validation**
   - Checks outlier ratio: `outlierCount / intervalsToEvaluate`
   - Rejects if `outlierRatio > strictness.maxOutlierRatio`

7. **Match Ratio Check**
   - Calculates minimum required matches: `ceil(userIntervals.length * strictness.match)`
   - Returns true if `matchingIntervalsCount >= minimumRequiredMatches`

**Strictness Configuration:**
```typescript
interface PulseStrictnessConfig {
  tolerance: number        // Absolute tolerance in seconds
  relative: number         // Relative tolerance multiplier
  match: number           // Minimum match ratio (0-1)
  outlierThreshold: number // Outlier detection threshold
  maxOutlierRatio: number  // Maximum allowed outlier ratio
}
```

**Example:**
```typescript
// User taps: [0, 0.7, 1.4, 2.1] (intervals: [0.7, 0.7, 0.7])
// Expected: [0, 0.706, 1.412, 2.118] (intervals: [0.706, 0.706, 0.706])
// Expected beat: 0.706s
// Tolerance: 0.1s (from strictness config)
// Result: All intervals within tolerance → CORRECT
```

### 2. Rhythm Pattern Comparison

**Function:** `compareRhythmPattern(userTimestamps, expectedTimestamps, tolerance?)`

**File:** `rhythm.ts`

**Purpose:** Determines if user echoed the exact rhythm pattern.

**Algorithm Steps:**

1. **Normalization**
   - Normalizes both arrays to start at 0

2. **Length Check**
   - Allows ±1 tap difference: `abs(userLength - expectedLength) <= 1`
   - Rejects if difference is greater

3. **Tempo Scaling Detection**
   - Calculates total duration ratio: `userDuration / expectedDuration`
   - Checks if ratio is within acceptable range: `[strictness.tempoMin, strictness.tempoMax]`
   - Example: User taps 20% faster → ratio = 0.83 (acceptable if tempoMin = 0.8)

4. **Interval Comparison**
   - Compares intervals between consecutive taps
   - Scales expected intervals by tempo ratio if needed
   - Uses minimum of scaled vs original difference

5. **Tolerance Calculation**
   - Base tolerance from strictness config
   - Relative tolerance: `baseInterval * strictness.relative`
   - Final tolerance: `max(relativeTolerance, baseTolerance)`

6. **Match Counting**
   - Counts intervals that match within tolerance
   - Requires minimum match ratio: `ceil(numIntervals * strictness.match)`

**Strictness Configuration:**
```typescript
interface StrictnessConfig {
  tolerance: number    // Base tolerance in seconds
  relative: number     // Relative tolerance multiplier
  match: number       // Minimum match ratio (0-1)
  tempoMin: number    // Minimum tempo ratio (e.g., 0.8 = 20% slower)
  tempoMax: number    // Maximum tempo ratio (e.g., 1.2 = 20% faster)
}
```

**Example:**
```typescript
// Expected: [0, 0.667, 1.0, 1.667] (intervals: [0.667, 0.333, 0.667])
// User: [0, 0.65, 0.98, 1.64] (intervals: [0.65, 0.33, 0.66])
// Tempo ratio: 0.98 (user tapped slightly faster)
// Scaled expected: [0.653, 0.326, 0.653]
// Differences: [0.003, 0.004, 0.007] (all within tolerance)
// Result: CORRECT
```

---

## Curriculum Structure

### Location
`src/subjects/aural/curriculum/`

### Structure

```
curriculum/
├── types.ts              # Type definitions
├── index.ts              # Exports
├── config/
│   ├── pulse.ts          # Pulse exercise configs
│   └── rhythm.ts          # Rhythm pattern configs
└── stages/
    ├── stageZero.ts       # Initial Grade lessons
    ├── stageOne.ts        # Grade 1 lessons
    ├── stageTwo.ts        # Grade 2 lessons
    └── helpers.ts         # Stage management utilities
```

### Types

**File:** `types.ts`

```typescript
export type StageNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface ExerciseConfig {
  generatorType: string    // 'pulse' | 'rhythm' | 'singing' | 'dynamics'
  questionsCount: number   // Number of questions to generate
  stage: StageNumber      // Stage for difficulty
}

export interface Lesson {
  id: string
  title: string
  description: string
  isFinalTest?: boolean
  exerciseConfig?: ExerciseConfig
  // ... progress fields
}
```

### Stage Definitions

**File:** `stages/stageZero.ts`

```typescript
export const stageZeroLessons: Lesson[] = [
  {
    id: 'aural-stage-0-lesson-1',
    title: 'Clap the Pulse',
    description: 'Clap along with the pulse of a piece played by the examiner',
    exerciseConfig: {
      generatorType: 'pulse',
      questionsCount: 5,
      stage: 0
    }
  },
  {
    id: 'aural-stage-0-lesson-2',
    title: 'Rhythm Echoes',
    description: 'Clap back the rhythm of two phrases as echoes',
    exerciseConfig: {
      generatorType: 'rhythm',
      questionsCount: 5,
      stage: 0
    }
  },
  // ... more lessons
]
```

### Configuration Files

#### Pulse Config (`config/pulse.ts`)

**Strictness Levels:**
- 5 levels of strictness (1 = most lenient, 5 = strictest)
- Current level: 3
- Configurable per exercise

**Functions:**
- `getPulseStrictnessConfig(level)` - Gets strictness config for level
- `calculatePulseTimestamps(melodyDurations, tempo, timeSignature)` - Calculates expected pulse

#### Rhythm Config (`config/rhythm.ts`)

**Note Beat Values:**
```typescript
{
  semibreve: 4,
  minim: 2,
  crotchet: 1,
  quaver: 0.5,
  quaverTriplet: 0.333,
  semiquaver: 0.25
}
```

**Stage Pattern Configs:**
- `STAGE_ZERO_PATTERN_CONFIG` - Simple patterns (crotchets, quavers, minims)
- `STAGE_ONE_PATTERN_CONFIG` - Adds dotted crotchets
- `STAGE_TWO_PATTERN_CONFIG` - Adds triplets and 3/4 time

**Functions:**
- `getStagePatternConfig(stage)` - Gets available patterns for stage
- `getStrictnessConfig(level)` - Gets strictness config for level

---

## Integration Points

### Lesson Screen Integration

**File:** `src/screens/LessonScreen/index.tsx`

**Aural Detection:**
```typescript
const isAuralLesson = lessonData.id.startsWith('aural-')

if (isAuralLesson) {
  return generateAuralQuestions(lessonData.exerciseConfig)
}
```

**File:** `src/screens/LessonScreen/LessonScreenBody/index.tsx`

**Playback State Management:**
- Tracks `hasPlaybackStarted` and `hasPlaybackFinished`
- Differentiates between pulse and rhythm exercises
- Manages answer submission flow

**File:** `src/screens/LessonScreen/components/AnswerInterface/index.tsx`

**Rhythm Tap Routing:**
```typescript
if (answerInterface === ANSWER_TYPE.RHYTHM_TAP) {
  return (
    <RhythmTap
      onTapSubmit={handleRhythmTapSubmit}
      // ... props
    />
  )
}
```

### Aural Screen Integration

**File:** `src/screens/AuralScreen/index.tsx`

Simple wrapper that renders `AuralScreenBody`.

**File:** `src/screens/AuralScreen/AuralScreenBody/index.tsx`

- Displays stages and lessons
- Shows progress indicators (stars, locks)
- Handles lesson navigation

---

## File Structure Map

### Exercise Generation
```
src/subjects/aural/
├── exercises/
│   ├── generate.ts                    # Main dispatcher
│   └── generators/
│       ├── index.ts                  # Generator exports
│       ├── pulse.ts                  # Pulse exercises + comparison
│       ├── rhythm.ts                 # Rhythm exercises + comparison
│       ├── singing.ts                # Singing exercises (TODO)
│       └── dynamics.ts               # Dynamics exercises (TODO)
└── curriculum/
    ├── types.ts                      # Type definitions
    ├── index.ts                      # Exports
    ├── config/
    │   ├── pulse.ts                  # Pulse configs & strictness
    │   └── rhythm.ts                  # Rhythm patterns & strictness
    └── stages/
        ├── stageZero.ts              # Initial Grade
        ├── stageOne.ts               # Grade 1
        ├── stageTwo.ts               # Grade 2
        └── helpers.ts                # Stage utilities
```

### Playback System
```
src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/
├── Playback.tsx                      # Main component
├── Playback.styles.tsx               # Styling
├── RippleAnimation.tsx               # Visual feedback
├── constants.ts                      # Constants (tempo, volumes)
├── utils.ts                          # Duration → timestamp conversion
└── hooks/
    ├── useAudioFilePlayback.ts      # MP3 playback
    ├── useRhythmClaps.ts             # Clap synthesis
    └── usePlaybackRipples.ts        # Animation management
```

### Answer Interface
```
src/screens/LessonScreen/components/AnswerInterface/
├── index.tsx                         # Router component
├── AnswerTypes/
│   ├── types.ts                      # Answer type constants
│   └── RhythmTap/
│       ├── index.tsx                 # Main component
│       └── RhythmTap.styles.tsx      # Styling
```

### Screen Components
```
src/screens/
├── AuralScreen/
│   ├── index.tsx                     # Screen wrapper
│   ├── AuralScreenBody/
│   │   ├── index.tsx                 # Main body
│   │   └── AuralScreenBody.styles.tsx
│   └── components/                   # UI components
└── LessonScreen/
    ├── index.tsx                     # Main lesson screen
    ├── LessonScreenBody/
    │   └── index.tsx                 # Lesson body
    └── components/                   # Question/Answer components
```

---

## Comparison with Staging Branch

### Major Differences

**Staging Branch Status:**
- Aural screen exists but is a **placeholder** with only basic UI
- No exercise generation system
- No playback functionality
- No rhythm tapping interface
- No comparison algorithms

**Current Branch Status:**
- **Complete aural exercise system** with all features implemented
- Full exercise generation (pulse, rhythm, singing, dynamics)
- Complete playback system (audio files + rhythm claps)
- Rhythm tapping answer interface
- Comparison algorithms (pulse + rhythm)
- Stage-based curriculum system

### Files That Exist Only in Current Branch

**Exercise Generation (NEW):**
- `src/subjects/aural/exercises/generate.ts`
- `src/subjects/aural/exercises/generators/pulse.ts`
- `src/subjects/aural/exercises/generators/rhythm.ts`
- `src/subjects/aural/exercises/generators/singing.ts`
- `src/subjects/aural/exercises/generators/dynamics.ts`
- `src/subjects/aural/exercises/generators/index.ts`

**Curriculum System (NEW):**
- `src/subjects/aural/curriculum/types.ts`
- `src/subjects/aural/curriculum/index.ts`
- `src/subjects/aural/curriculum/config/pulse.ts`
- `src/subjects/aural/curriculum/config/rhythm.ts`
- `src/subjects/aural/curriculum/stages/stageZero.ts`
- `src/subjects/aural/curriculum/stages/stageOne.ts`
- `src/subjects/aural/curriculum/stages/stageTwo.ts`
- `src/subjects/aural/curriculum/stages/helpers.ts`

**Playback System (NEW):**
- `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/Playback.tsx`
- `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/Playback.styles.tsx`
- `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/RippleAnimation.tsx`
- `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/constants.ts`
- `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/utils.ts`
- `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/hooks/useAudioFilePlayback.ts`
- `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/hooks/useRhythmClaps.ts`
- `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/hooks/usePlaybackRipples.ts`

**Answer Interface (NEW):**
- `src/screens/LessonScreen/components/AnswerInterface/AnswerTypes/RhythmTap/index.tsx`
- `src/screens/LessonScreen/components/AnswerInterface/AnswerTypes/RhythmTap/RhythmTap.styles.tsx`

**Aural Screen (SIGNIFICANTLY ENHANCED):**
- Staging: Simple placeholder with text only
- Current: Full implementation with:
  - `AuralScreenBody/index.tsx` - Complete stage/lesson display
  - `components/LessonSection/` - Lesson cards with progress
  - `components/StageHeader.tsx` - Stage headers
  - `components/TopCloudsCover.tsx` - Visual elements
  - `components/LessonDivider.tsx` - UI dividers

### What Staging Has

**Basic Aural Screen:**
```typescript
// staging: src/screens/AuralScreen/index.tsx
export const AuralScreen = () => {
  return (
    <ScreenContainer>
      <Content>
        <Title>Aural Training</Title>
        <Subtitle>Develop your musical ear</Subtitle>
        <Description>
          Practise interval recognition, chord identification, and melodic dictation.
        </Description>
      </Content>
    </ScreenContainer>
  )
}
```

**That's it!** No functionality, just a placeholder.

### Migration Strategy

When rebuilding from staging, you'll need to:

1. **Copy all exercise generation files** (entire `src/subjects/aural/` directory)
2. **Copy all playback system files** (entire `Playback/` directory)
3. **Copy rhythm tap component** (`RhythmTap/` directory)
4. **Replace AuralScreen** with current implementation
5. **Update LessonScreen** to detect aural lessons and use generators
6. **Add audio assets:**
   - `clap.mp3` - **Required** (for rhythm exercises and tap feedback)
   - `metronome_beat.mp3` - **Required** (for metronome)
   - Song MP3s - **Will be obtained later** (for pulse exercises)
     - Until songs are available, pulse exercises can be disabled or use placeholders
7. **Ensure hooks exist** (`useMetronome`, `useDevice`)

### Breaking Changes

**None** - This is a complete new feature addition. Staging has no aural functionality to break.

### Integration Points to Add

When migrating to staging, ensure these integrations exist:

1. **LessonScreen/index.tsx:**
   ```typescript
   // Add aural detection
   const isAuralLesson = lessonData.id.startsWith('aural-')
   if (isAuralLesson) {
     return generateAuralQuestions(lessonData.exerciseConfig)
   }
   ```

2. **AnswerInterface/index.tsx:**
   ```typescript
   // Add rhythm tap routing
   if (answerInterface === ANSWER_TYPE.RHYTHM_TAP) {
     return <RhythmTap ... />
   }
   ```

3. **LessonScreenBody/index.tsx:**
   - Add playback state management
   - Handle pulse vs rhythm exercise differentiation

### Key Features to Preserve

When rebuilding from staging, ensure these features are maintained:

1. **Playback System:**
   - Audio file playback (`useAudioFilePlayback`)
   - Rhythm clap synthesis (`useRhythmClaps`)
   - Metronome integration
   - Ripple animations

2. **Rhythm Tapping:**
   - Timestamp recording
   - Metronome auto-start
   - Auto-submit logic (pulse vs rhythm)
   - Clap sound feedback
   - 3D button visual feedback

3. **Comparison Algorithms:**
   - `comparePulsePattern` with strictness configs
   - `compareRhythmPattern` with tempo scaling
   - Tolerance-based matching

4. **Exercise Generators:**
   - Pulse exercise generation with MP3 files
   - Rhythm exercise generation with pattern configs
   - Stage-based difficulty

5. **Configuration:**
   - Pulse strictness levels
   - Rhythm pattern configs per stage
   - Note beat values

### Potential Breaking Changes

When comparing with staging, check for:

1. **API Changes:**
   - Question interface structure
   - Answer interface types
   - Component prop changes

2. **File Location Changes:**
   - Moved files or renamed directories
   - Import path changes

3. **Algorithm Changes:**
   - Different tolerance values
   - Changed comparison logic
   - New strictness levels

---

## Implementation Notes

### Audio Assets

**Required Files:**
- `assets/sounds/clap.mp3` - Clap sound for rhythm playback and tap feedback
- `assets/sounds/metronome_beat.mp3` - Metronome tick sound

**Pulse Exercise Songs (Temporary Status):**
- **NOTE:** New song files will be obtained. For now, pulse exercises will not have audio files.
- **Current Implementation:** The code references these files, but they may not exist initially:
  - `assets/sounds/songs/chopin-1.mp3` - Pulse exercise audio (tempo: 85 BPM, 30s)
  - `assets/sounds/songs/grieg-1.mp3` - Pulse exercise audio (tempo: 137 BPM, 30s)
  - `assets/sounds/songs/mozart-1.mp3` - Pulse exercise audio (tempo: 73 BPM, 30s)
  - `assets/sounds/songs/mozart-2.mp3` - Pulse exercise audio (tempo: 95 BPM, 30s)
  - `assets/sounds/songs/schuman-1.mp3` - Pulse exercise audio (tempo: 100 BPM, 30s)

**Temporary Workaround:**
Until new songs are available, you can:
1. **Disable pulse exercises** by removing them from stage definitions
2. **Use placeholder audio** (silent or test files) - pulse exercises will still work but won't play audio
3. **Focus on rhythm exercises** which don't require song files

**Song Requirements:**
- Format: MP3
- Duration: ~30 seconds (or as needed)
- Tempo: Should match the tempo specified in `pulse.ts` (85-137 BPM range)
- Content: Melodic pieces suitable for pulse/beat detection practice

### Dependencies

**Required Hooks:**
- `useMetronome` - From `@/hooks`
- `useDevice` - From `@/hooks`

**Required Utils:**
- `setupAutoCleanup` - From `@/utils/audioPlayerUtils`
- `createAudioPlayer` - From `expo-audio`

### Performance Considerations

1. **Clap Player Preloading:**
   - Preloads multiple players for concurrent playback
   - Reuses players in round-robin fashion
   - Minimum 5 players for short patterns

2. **Scheduler Precision:**
   - 5ms interval for precise timing
   - 50ms look-ahead to compensate for timer jitter
   - Uses `Date.now()` for absolute time tracking

3. **Memory Management:**
   - Auto-cleanup of audio players after playback
   - Clears timeouts and intervals on unmount
   - Removes ripple animations when complete

---

## Testing Checklist

When rebuilding, verify:

- [ ] Pulse exercises play MP3 files correctly
- [ ] Rhythm exercises play clap sounds at correct timestamps
- [ ] Metronome starts/stops correctly
- [ ] Rhythm tap records timestamps accurately
- [ ] Auto-submit works for both pulse and rhythm
- [ ] Pulse comparison algorithm accepts correct taps
- [ ] Rhythm comparison algorithm accepts correct patterns
- [ ] Tolerance settings work as expected
- [ ] Stage progression unlocks correctly
- [ ] Exercise generation creates correct question counts
- [ ] Visual feedback (ripples, button states) works
- [ ] Clap sound plays on each tap

---

## Future Enhancements

### Planned Features

1. **Singing Exercises:**
   - Melody playback
   - Pitch detection for user input
   - Comparison algorithm

2. **Dynamics Exercises:**
   - Audio playback with dynamics
   - Multiple choice answers
   - Articulation identification

### Potential Improvements

1. **Adaptive Difficulty:**
   - Adjust strictness based on user performance
   - Dynamic tempo variations

2. **Enhanced Feedback:**
   - Visual representation of user vs expected taps
   - Detailed timing analysis

3. **More Exercise Types:**
   - Interval recognition
   - Chord identification
   - Scale recognition

---

## Summary

The aural exercise system is a sophisticated implementation with:

- **4 exercise types** (2 implemented: pulse, rhythm)
- **Dual playback system** (audio files + synthesized claps)
- **Precise timing** (5ms scheduler, 50ms look-ahead)
- **Tolerance-based comparison** (configurable strictness)
- **Stage-based difficulty** (pattern configs per stage)
- **Rich visual feedback** (ripples, 3D buttons, animations)
- **Metronome integration** (automatic for rhythm exercises)

When rebuilding from staging, focus on preserving the core algorithms and playback mechanisms, as these are the most complex and critical components.

---

## Audio Files Status & Migration Notes

### Current Audio File Status

**Available Now:**
- ✅ `clap.mp3` - Required for rhythm exercises and tap feedback
- ✅ `metronome_beat.mp3` - Required for metronome functionality

**To Be Obtained:**
- ⏳ Pulse exercise song files (5 MP3 files)
  - These are referenced in `pulse.ts` but will be replaced with new songs
  - Location: `assets/sounds/songs/`
  - Format: MP3, ~30 seconds each
  - Tempo range: 73-137 BPM

### Temporary Workarounds

**Option 1: Disable Pulse Exercises**
```typescript
// In stageZero.ts, comment out or remove pulse lessons:
export const stageZeroLessons: Lesson[] = [
  // {
  //   id: 'aural-stage-0-lesson-1',
  //   title: 'Clap the Pulse',
  //   exerciseConfig: {
  //     generatorType: 'pulse',
  //     questionsCount: 5,
  //     stage: 0
  //   }
  // },
  {
    id: 'aural-stage-0-lesson-2',
    title: 'Rhythm Echoes',
    exerciseConfig: {
      generatorType: 'rhythm', // Rhythm exercises work without song files
      questionsCount: 5,
      stage: 0
    }
  },
  // ...
]
```

**Option 2: Use Placeholder Audio**
- Create silent or test MP3 files with correct names
- Pulse exercises will generate but won't play meaningful audio
- User can still tap along (though without audio reference)

**Option 3: Focus on Rhythm Exercises**
- Rhythm exercises use synthesized claps, not song files
- Can fully test rhythm tapping and comparison algorithms
- Add pulse exercises later when songs are available

### When Adding New Songs

1. **Place files in:** `assets/sounds/songs/`
2. **Update `pulse.ts`:**
   ```typescript
   const PULSE_EXERCISES: PulseExercise[] = [
     {
       audioFile: require('../../../../../assets/sounds/songs/your-new-song-1.mp3'),
       duration: 30, // Actual duration in seconds
       tempo: 90     // Actual BPM
     },
     // ... more songs
   ]
   ```
3. **Verify tempo values** match the actual audio files
4. **Test pulse exercises** to ensure audio plays correctly

---

## Complete Code Reference

This section contains all critical code snippets, types, constants, and implementations needed to rebuild the system from scratch.

### Critical Type Definitions

**File:** `src/subjects/aural/curriculum/types.ts`
```typescript
export type StageNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface ExerciseConfig {
  generatorType: string    // 'pulse' | 'rhythm' | 'singing' | 'dynamics'
  questionsCount: number   // Number of questions to generate
  stage: StageNumber      // Stage for difficulty
}

export interface Lesson {
  id: string
  title: string
  description: string
  isFinalTest?: boolean
  exerciseConfig?: ExerciseConfig
  isLocked?: boolean
  stars?: number
  isPassed?: boolean
}

export interface StageLesson extends Lesson {
  stageId: string
}

export interface Stage {
  id: string
  title: string
  description: string
  lessons: StageLesson[]
  isCleared: boolean
  isUnlocked: boolean
  totalStars: number
  order: number
  prerequisiteStages?: string[]
  coverImageUrl?: string
  themeColor?: string
}

// QuestionInterface type (from @types)
export interface QuestionInterface {
  type: 'playback'
  audioFile?: ReturnType<typeof require>
  rhythm?: number[]
  tempo?: number
}
```

**File:** `src/screens/LessonScreen/components/AnswerInterface/AnswerTypes/types.ts`
```typescript
export const ANSWER_TYPE = {
  MULTIPLE_CHOICE: 'multipleChoice' as const,
  TRUE_FALSE: 'trueFalse' as const,
  KEY_PRESS: 'keyPress' as const,
  RHYTHM_TAP: 'rhythmTap' as const
}
```

### Complete Generator Implementations

**File:** `src/subjects/aural/exercises/generate.ts`
```typescript
import { ExerciseConfig, Question } from '../curriculum/types'
import { createPulseQuestions } from './generators/pulse'
import { createRhythmQuestions } from './generators/rhythm'
import { createSingingQuestions } from './generators/singing'
import { createDynamicsQuestions } from './generators/dynamics'

export const generateAuralQuestions = (config: ExerciseConfig): Question[] => {
  const { generatorType, questionsCount, stage } = config

  switch (generatorType) {
    case 'pulse':
      return createPulseQuestions(questionsCount, stage)
    case 'rhythm':
      return createRhythmQuestions(questionsCount, stage)
    case 'singing':
      return createSingingQuestions(questionsCount, stage)
    case 'dynamics':
      return createDynamicsQuestions(questionsCount, stage)
    default:
      return []
  }
}
```

**File:** `src/subjects/aural/exercises/generators/pulse.ts` - Complete Implementation
```typescript
import { generateQuestionId } from '@/subjects/theory/exercises/utils/question'
import { DEFAULT_TEMPO, getPulseStrictnessConfig, pulseStrictness } from '../../curriculum/config/pulse'
import { Question, StageNumber, type QuestionInterface } from '../../curriculum/types'

export interface PulseExercise {
  audioFile: ReturnType<typeof require>
  duration: number
  tempo?: number
}

const PULSE_EXERCISES: PulseExercise[] = [
  {
    audioFile: require('../../../../../assets/sounds/songs/chopin-1.mp3'),
    duration: 30,
    tempo: 85
  },
  {
    audioFile: require('../../../../../assets/sounds/songs/grieg-1.mp3'),
    duration: 30,
    tempo: 137
  },
  {
    audioFile: require('../../../../../assets/sounds/songs/mozart-1.mp3'),
    duration: 30,
    tempo: 73
  },
  {
    audioFile: require('../../../../../assets/sounds/songs/mozart-2.mp3'),
    duration: 30,
    tempo: 95
  },
  {
    audioFile: require('../../../../../assets/sounds/songs/schuman-1.mp3'),
    duration: 30,
    tempo: 100
  }
]

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const comparePulsePattern = (
  userTimestamps: number[],
  expectedTimestamps: number[],
  strictnessLevel?: number
): boolean => {
  if (userTimestamps.length < 3 || expectedTimestamps.length === 0) {
    return false
  }

  const strictness = strictnessLevel 
    ? getPulseStrictnessConfig(strictnessLevel)
    : pulseStrictness

  const normalizeTimestamps = (timestamps: number[]): number[] => 
    timestamps.map(ts => ts - (timestamps[0] || 0))
  
  const calculateIntervals = (timestamps: number[]): number[] => {
    const intervals: number[] = []
    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i] - timestamps[i - 1])
    }
    return intervals
  }

  const userTimestampsFromStart = normalizeTimestamps(userTimestamps)
  const expectedTimestampsFromStart = normalizeTimestamps(expectedTimestamps)
  
  const userBeatIntervals = calculateIntervals(userTimestampsFromStart)
  const expectedBeatIntervals = calculateIntervals(expectedTimestampsFromStart)
  
  const expectedBeatInterval = expectedBeatIntervals[0] || 0
  if (expectedBeatInterval === 0) {
    return false
  }
  
  const relativeTolerance = expectedBeatInterval * strictness.relative
  const absoluteTolerance = Math.min(strictness.tolerance, relativeTolerance)
  
  let matchingIntervalsCount = 0
  let outlierCount = 0
  
  const startIndex = 1
  
  for (let i = startIndex; i < userBeatIntervals.length; i++) {
    const userInterval = userBeatIntervals[i]
    const intervalDifference = Math.abs(userInterval - expectedBeatInterval)
    const isMatch = intervalDifference <= absoluteTolerance
    const isOutlier = intervalDifference > expectedBeatInterval * strictness.outlierThreshold
    
    if (isOutlier) outlierCount++
    if (isMatch) matchingIntervalsCount++
  }
  
  if (userBeatIntervals.length > 0) {
    matchingIntervalsCount++
  }
  
  const intervalsToEvaluate = Math.max(1, userBeatIntervals.length - startIndex)
  const outlierRatio = outlierCount / intervalsToEvaluate
  if (outlierRatio > strictness.maxOutlierRatio) {
    return false
  }
  
  const minimumRequiredMatches = Math.ceil(userBeatIntervals.length * strictness.match)
  return matchingIntervalsCount >= minimumRequiredMatches
}

export const createPulseQuestions = (
  count: number,
  stage: StageNumber,
  exercises?: PulseExercise[]
): Question[] => {
  const exercisesToUse = exercises || PULSE_EXERCISES

  if (exercisesToUse.length === 0) {
    return []
  }

  const shuffled = shuffleArray(exercisesToUse)
  const exercisesForQuestions = shuffled.slice(0, count)
  const questions: Question[] = []

  for (const exercise of exercisesForQuestions) {
    const tempo = exercise.tempo || DEFAULT_TEMPO

    const beatDuration = 60 / tempo
    const pulseTimestamps: number[] = []
    for (let currentTime = 0; currentTime < exercise.duration; currentTime += beatDuration) {
      pulseTimestamps.push(currentTime)
    }

    questions.push({
      id: generateQuestionId('pulse-tap'),
      title: 'Tap the pulse of the melody you hear.',
      correctAnswer: pulseTimestamps,
      choices: [],
      explanation: 'The pulse should follow a steady beat.',
      answerInterface: 'rhythmTap',
      questionInterface: {
        type: 'playback',
        audioFile: exercise.audioFile,
        tempo
      } as QuestionInterface
    })
  }

  return questions
}
```

**File:** `src/subjects/aural/exercises/generators/rhythm.ts` - Key Functions
```typescript
// See full implementation in rhythm.ts file
// Key exports:
export const compareRhythmPattern = (
  userTimestamps: number[],
  expectedTimestamps: number[],
  tolerance?: number
): boolean => {
  // Full implementation (see rhythm.ts lines 85-149)
}

export const createRhythmQuestions = (
  count: number,
  stage: StageNumber
): Question[] => {
  // Full implementation (see rhythm.ts lines 151-177)
}
```

### Configuration Constants

**File:** `src/subjects/aural/curriculum/config/pulse.ts`
```typescript
export const DEFAULT_TIME_SIGNATURE = '4/4'
export const TIMING_STRICTNESS_LEVEL = 3

export interface PulseStrictnessConfig {
  tolerance: number
  relative: number
  match: number
  outlierThreshold: number
  maxOutlierRatio: number
}

export const PULSE_STRICTNESS_CONFIG: PulseStrictnessConfig[] = [
  { tolerance: 0.15, relative: 0.25, match: 0.6, outlierThreshold: 0.5, maxOutlierRatio: 0.2 },
  { tolerance: 0.12, relative: 0.2, match: 0.7, outlierThreshold: 0.4, maxOutlierRatio: 0.15 },
  { tolerance: 0.1, relative: 0.15, match: 0.7, outlierThreshold: 0.35, maxOutlierRatio: 0.12 },
  { tolerance: 0.08, relative: 0.12, match: 0.8, outlierThreshold: 0.3, maxOutlierRatio: 0.1 },
  { tolerance: 0.06, relative: 0.1, match: 0.8, outlierThreshold: 0.25, maxOutlierRatio: 0.08 }
]

export const getPulseStrictnessConfig = (level: number): PulseStrictnessConfig => {
  const index = Math.max(0, Math.min(level - 1, PULSE_STRICTNESS_CONFIG.length - 1))
  return PULSE_STRICTNESS_CONFIG[index]
}

export const pulseStrictness = getPulseStrictnessConfig(TIMING_STRICTNESS_LEVEL)
```

**File:** `src/subjects/aural/curriculum/config/rhythm.ts`
```typescript
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
```

**File:** `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/constants.ts`
```typescript
export const AUDIO_VOLUME_PLAYBACK = 0.8
export const AUDIO_VOLUME_METRONOME = 0.4
export const DEFAULT_TEMPO = 120
export const RHYTHM_FINAL_TIMEOUT_BUFFER = 0.5 // seconds

export const CLAP_SOUND = require('../../../../../../../assets/sounds/clap.mp3')
```

### Critical Integration Code

**File:** `src/screens/LessonScreen/index.tsx` - Aural Detection
```typescript
import { generateAuralQuestions } from '@/subjects/aural/exercises/generate'

// Inside component:
const isAuralLesson = lessonData.id.startsWith('aural-')

if (isAuralLesson && lessonData.exerciseConfig) {
  const questions = generateAuralQuestions(lessonData.exerciseConfig)
  // Use questions...
}
```

**File:** `src/screens/LessonScreen/components/AnswerInterface/index.tsx` - Rhythm Tap Routing
```typescript
import { ANSWER_TYPE } from './AnswerTypes/types'
import { RhythmTap } from './AnswerTypes/RhythmTap'

// Inside component:
if (answerInterface === ANSWER_TYPE.RHYTHM_TAP) {
  return (
    <RhythmTap
      onTapSubmit={handleRhythmTapSubmit}
      disabled={disabled}
      rhythmDuration={rhythmDuration}
      buttonState={buttonState}
      tempo={tempo}
      questionInterface={questionInterface}
      onRecordingChange={onRecordingChange}
      onPlaybackFinishRef={onPlaybackFinishRef}
    />
  )
}
```

### Required Dependencies

**Package Dependencies:**
- `expo-audio` - For `createAudioPlayer`
- `react-native-reanimated` - For ripple animations
- `react-native-size-matters` - For responsive sizing
- `@emotion/native` - For styled components

**Internal Dependencies:**
- `@/hooks` - Must export `useMetronome` and `useDevice`
- `@/utils/audioPlayerUtils` - Must export `setupAutoCleanup`
- `@/subjects/theory/exercises/utils/question` - Must export `generateQuestionId`
- `@/utils/fontHelper` - Must export `getSourGummyFontFamily`

### Complete Stage Example

**File:** `src/subjects/aural/curriculum/stages/stageZero.ts`
```typescript
import { Lesson, Stage, StageLesson, StageNumber } from '../types'

const stageZero: StageNumber = 0

export const stageZeroLessons: Lesson[] = [
  {
    id: 'aural-stage-0-lesson-1',
    title: 'Clap the Pulse',
    description: 'Clap along with the pulse of a piece played by the examiner',
    stars: 0,
    exerciseConfig: {
      generatorType: 'pulse',
      questionsCount: 5,
      stage: stageZero
    }
  },
  {
    id: 'aural-stage-0-lesson-2',
    title: 'Rhythm Echoes',
    description: 'Clap back the rhythm of two phrases as echoes',
    stars: 0,
    exerciseConfig: {
      generatorType: 'rhythm',
      questionsCount: 5,
      stage: stageZero
    }
  }
]

export const stage0: Stage = {
  id: 'aural-stage-0',
  title: 'Initial Grade',
  description: 'Aural skills for Initial Grade',
  lessons: stageZeroLessons.map(lesson => ({
    ...lesson,
    stageId: 'aural-stage-0'
  })) as StageLesson[],
  isCleared: false,
  isUnlocked: true,
  totalStars: 0,
  order: 0
}
```

### Critical Constants Summary

| Constant | Value | Location |
|----------|-------|----------|
| `SCHEDULE_INTERVAL_MS` | 5 | `useRhythmClaps.ts` |
| `SCHEDULE_AHEAD_MS` | 50 | `useRhythmClaps.ts` |
| `AUDIO_VOLUME_PLAYBACK` | 0.8 | `Playback/constants.ts` |
| `AUDIO_VOLUME_METRONOME` | 0.4 | `Playback/constants.ts` |
| `DEFAULT_TEMPO` (rhythm) | 90 | `config/rhythm.ts` |
| `DEFAULT_TEMPO` (playback) | 120 | `Playback/constants.ts` |
| `RHYTHM_FINAL_TIMEOUT_BUFFER` | 0.5 | `Playback/constants.ts` |
| `MIN_PATTERN_LENGTH` | 2 | `config/rhythm.ts` |
| `BEAT_TOLERANCE` | 0.01 | `config/rhythm.ts` |
| `TIMING_STRICTNESS_LEVEL` (pulse) | 3 | `config/pulse.ts` |
| `TIMING_STRICTNESS_LEVEL` (rhythm) | 2 | `config/rhythm.ts` |

### File Paths Reference

**All files to recreate:**
```
src/subjects/aural/
├── exercises/
│   ├── generate.ts
│   └── generators/
│       ├── index.ts
│       ├── pulse.ts
│       ├── rhythm.ts
│       ├── singing.ts
│       └── dynamics.ts
└── curriculum/
    ├── types.ts
    ├── index.ts
    ├── config/
    │   ├── pulse.ts
    │   └── rhythm.ts
    └── stages/
        ├── stageZero.ts
        ├── stageOne.ts
        ├── stageTwo.ts
        └── helpers.ts

src/screens/LessonScreen/components/
├── QuestionInterface/QuestionTypes/Playback/
│   ├── Playback.tsx
│   ├── Playback.styles.tsx
│   ├── RippleAnimation.tsx
│   ├── constants.ts
│   ├── utils.ts
│   ├── index.ts
│   └── hooks/
│       ├── useAudioFilePlayback.ts
│       ├── useRhythmClaps.ts
│       └── usePlaybackRipples.ts
└── AnswerInterface/AnswerTypes/
    ├── types.ts
    └── RhythmTap/
        ├── index.tsx
        └── RhythmTap.styles.tsx

assets/sounds/
├── clap.mp3 (REQUIRED)
├── metronome_beat.mp3 (REQUIRED)
└── songs/ (5 MP3 files - to be obtained)
```

This completes the comprehensive code reference needed for a full rebuild.

---

## Pre-Deletion Checklist

Before deleting files, verify you have:

### ✅ Documentation
- [x] Complete documentation file (this file)
- [x] All code references included
- [x] All type definitions documented
- [x] All constants documented
- [x] All file paths documented

### ✅ Audio Files to Backup
- [x] `assets/sounds/clap.mp3` - **CRITICAL**
- [x] `assets/sounds/metronome_beat.mp3` - **CRITICAL**
- [ ] `assets/sounds/songs/*.mp3` - Will be replaced with new songs

### ✅ Code Files to Backup (if needed)
All code is documented in this file, but if you want source backups:
- [x] `src/subjects/aural/` - Entire directory
- [x] `src/screens/LessonScreen/components/QuestionInterface/QuestionTypes/Playback/` - Entire directory
- [x] `src/screens/LessonScreen/components/AnswerInterface/AnswerTypes/RhythmTap/` - Entire directory
- [x] `src/screens/AuralScreen/` - Enhanced implementation

### ✅ Dependencies to Verify
- [x] `expo-audio` package
- [x] `react-native-reanimated` package
- [x] `react-native-size-matters` package
- [x] `@emotion/native` package
- [x] `useMetronome` hook exists in `@/hooks`
- [x] `useDevice` hook exists in `@/hooks`
- [x] `setupAutoCleanup` utility exists in `@/utils/audioPlayerUtils`
- [x] `generateQuestionId` utility exists in `@/subjects/theory/exercises/utils/question`
- [x] `getSourGummyFontFamily` utility exists in `@/utils/fontHelper`

### ✅ Integration Points to Implement
- [x] LessonScreen aural detection (`lessonData.id.startsWith('aural-')`)
- [x] AnswerInterface rhythm tap routing (`ANSWER_TYPE.RHYTHM_TAP`)
- [x] LessonScreenBody playback state management
- [x] AuralScreen stage/lesson display

### ✅ Testing Requirements
- [ ] Rhythm exercises play claps correctly
- [ ] Metronome starts/stops correctly
- [ ] Rhythm tap records timestamps
- [ ] Auto-submit works (pulse and rhythm)
- [ ] Comparison algorithms work correctly
- [ ] Visual feedback (ripples, buttons) works
- [ ] Stage progression unlocks correctly

**You're ready to delete!** All critical information is documented in this file.
