# Tonalè Codebase Structure Guide

**Date:** 2026-01-29
**For:** Developers (current and future)
**Purpose:** Understand where everything lives and where to add new code

---

## Overview

Tonalè uses a **feature-organized structure** with clear separation between:
- **App routing** (`/app`) - Expo Router file-based routing
- **Screen components** (`/src/screens`) - Page-level components
- **Domain logic** (`/src/theory`) - Music theory business logic
- **Shared code** (`/src/sharedComponents`, `/src/hooks`) - Reusable utilities

---

## 📁 Root Directory Structure

```
tonale/
├── app/                    # Expo Router - File-based routing
├── src/                    # Application source code
├── functions/              # Firebase Cloud Functions (backend)
├── assets/                 # Static assets (images, fonts, sounds)
├── docs/                   # Documentation
├── scripts/                # Utility scripts
├── android/                # Android native code
├── ios/                    # iOS native code
├── _bmad-output/           # Planning artifacts (not in app)
└── [config files]          # package.json, tsconfig.json, etc.
```

---

## 🗺️ App Routing (`/app`)

**Purpose:** Expo Router uses file system as routing structure.

### Structure

```
app/
├── _layout.tsx                    # Root layout (providers, navigation)
│
├── (auth)/                        # Auth routes (before login)
│   ├── _layout.tsx                # Auth flow layout
│   ├── index.tsx                  # Login screen
│   ├── signup.tsx                 # Signup screen
│   └── resetPassword.tsx          # Password reset
│
├── (tabs)/                        # Main app tabs (after login)
│   ├── _layout.tsx                # Tab navigation layout
│   ├── index.tsx                  # Home tab (default)
│   ├── theory.tsx                 # Theory tab
│   ├── revision.tsx               # Revision tab
│   ├── aural.tsx                  # Aural tab
│   └── settings/                  # Settings tab with nested routes
│       ├── index.tsx              # Settings home
│       └── account/               # Account settings nested route
│           └── index.tsx
│
├── lesson.tsx                     # Dynamic lesson route
├── onboarding.tsx                 # First-time user onboarding
├── splash.tsx                     # Splash screen
└── +not-found.tsx                 # 404 page
```

### Routing Patterns

**File-based routing:**
- `app/index.tsx` → `/` (root)
- `app/lesson.tsx` → `/lesson?id=xxx` (with query params)
- `app/(tabs)/theory.tsx` → `/theory` (grouped route)
- `app/(tabs)/settings/index.tsx` → `/settings`
- `app/(tabs)/settings/account/index.tsx` → `/settings/account`

**Navigation:**
```tsx
import { router } from 'expo-router'

// Navigate to lesson
router.push('/lesson?id=lesson-1')

// Navigate to tab
router.push('/theory')

// Go back
router.back()
```

**When to add files here:**
- Adding a new screen/page (e.g., `/app/achievements.tsx`)
- Adding nested routes (e.g., `/app/(tabs)/settings/notifications/`)
- Changing navigation structure

---

## 🧩 Source Code (`/src`)

### Overview

```
src/
├── config/                 # App configuration
├── constants/              # App-wide constants
├── globalComponents/       # App-level components (providers, layout)
├── sharedComponents/       # Reusable UI components
├── screens/                # Screen components (mapped from /app routes)
├── hooks/                  # Custom React hooks (including contexts)
├── theory/                 # Music theory domain logic
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

---

## 🎛️ Config (`/src/config`)

**Purpose:** App configuration and initialization.

```
config/
├── firebase/               # Firebase initialization & helpers
│   ├── firebase.ts         # Firebase app init (auth, firestore, functions)
│   └── functions/          # Firebase callable function wrappers
│       ├── lessonProgress.ts
│       ├── userData.ts
│       └── revisionQuestions.ts
│
├── gradeSyllabus/          # ABRSM curriculum data
│   ├── grade1.ts           # Grade 1 syllabus structure
│   ├── grade2.ts
│   ├── grade3.ts
│   └── index.ts            # Combined syllabus export
│
└── theme/                  # Theme configuration (colors, spacing, fonts)
    └── index.ts
```

**When to edit:**
- Adding Firebase services → `firebase/firebase.ts`
- Adding curriculum grades → `gradeSyllabus/gradeX.ts`
- Changing theme → `theme/index.ts`

---

## 🌍 Global Components (`/src/globalComponents`)

**Purpose:** App-level components that wrap entire app or provide global functionality.

```
globalComponents/
├── AppThemeProvider/       # Emotion theme provider
│   └── index.tsx
│
├── ErrorBoundary/          # React error boundary
│   └── index.tsx
│
├── ScreenContainer/        # Standard screen wrapper (safe area, padding)
│   └── index.tsx
│
├── KeyboardAwareScrollView/ # Keyboard handling wrapper
│   └── index.tsx
│
└── CustomTabBar/           # Custom bottom tab bar
    └── index.tsx
```

**Pattern:**
```
Component/
├── index.tsx               # Component logic
├── Component.styles.tsx    # Emotion styles (optional)
└── types.ts                # Component-specific types (optional)
```

**When to add here:**
- App-wide providers (e.g., new context provider)
- Layout wrappers (e.g., toast notification container)
- Navigation components (e.g., custom header)

**When NOT to add here:**
- Screen-specific components → `/src/screens/ScreenName/components`
- Reusable UI components → `/src/sharedComponents`

---

## 🧱 Shared Components (`/src/sharedComponents`)

**Purpose:** Reusable UI components used across multiple screens.

```
sharedComponents/
├── Button3D/               # 3D button with press effect
├── Card3DView/             # 3D card container
├── DisplayCard/            # Generic display card
├── GridSelection/          # Grid of selectable items
├── Icon/                   # Icon wrapper
├── Modal/                  # Modal dialog
├── PianoKeyboard/          # Interactive piano keyboard
└── Skeleton/               # Loading skeleton
```

**Pattern:**
```
ComponentName/
├── index.tsx               # Component implementation
├── ComponentName.styles.tsx # Emotion styles
├── types.ts                # Props and internal types
└── utils.ts                # Component-specific utilities (optional)
```

**Guidelines:**
- **Reusable:** Used in 2+ different screens
- **Generic:** Not tied to specific domain logic
- **Props-driven:** Configurable via props
- **Self-contained:** All logic and styles in component folder

**When to add here:**
```tsx
// ✅ Good: Reusable across screens
<Button3D onPress={handlePress}>Submit</Button3D>

// ❌ Bad: Too specific to one screen
<LessonCompletionButton lessonId={id} stars={stars} />
// → This belongs in /src/screens/LessonScreen/components/
```

**When to extract to sharedComponents:**
1. Component used in 2+ screens (actual, not hypothetical)
2. Component has no screen-specific logic
3. Component is configurable via props

---

## 📱 Screens (`/src/screens`)

**Purpose:** Screen-level components that correspond to routes in `/app`.

```
screens/
├── AuthScreen/             # Login/signup screen
│   ├── index.tsx           # Main screen component
│   ├── AuthScreen.styles.tsx
│   └── components/         # Screen-specific components
│       ├── LoginForm/
│       ├── SignupForm/
│       └── SocialLoginButtons/
│
├── HomeScreen/             # Home tab screen
│   ├── index.tsx
│   ├── HomeScreen.styles.tsx
│   └── components/
│       ├── LessonCard/
│       ├── StageProgress/
│       └── NextLessonPrompt/
│
├── LessonScreen/           # Lesson practice screen
│   ├── index.tsx
│   ├── LessonScreen.styles.tsx
│   ├── components/
│   │   ├── QuestionDisplay/
│   │   ├── AnswerOptions/
│   │   ├── ProgressBar/
│   │   └── CompletionModal/
│   └── LessonScreenBody/   # Complex sub-section
│       ├── index.tsx
│       └── LessonScreenBody.styles.tsx
│
├── TheoryScreen/           # Theory tab screen
│   ├── index.tsx
│   ├── TheoryScreen.styles.tsx
│   ├── components/
│   │   └── LessonSection/
│   └── TheoryScreenBody/
│
├── OnboardingScreen/       # First-time user flow
│   ├── index.tsx
│   ├── OnboardingScreen.styles.tsx
│   ├── components/
│   │   ├── NameInput/
│   │   ├── InstrumentSelection/
│   │   └── OnboardingButton/
│   └── OnboardingBody/
│
├── SettingsScreen/         # Settings screen
│   ├── index.tsx
│   ├── SettingsScreen.styles.tsx
│   ├── components/
│   │   ├── ProfileHeader/
│   │   └── SettingsItem/
│   └── nestedScreens/      # Nested settings screens
│       └── AccountSettingsScreen/
│
├── RevisionScreen/         # Revision mode screen
├── AuralScreen/            # Aural training screen
└── SplashScreen/           # App launch splash
```

### Screen Organization Pattern

**Simple Screen:**
```
ScreenName/
├── index.tsx               # Screen component (default export)
├── ScreenName.styles.tsx   # Emotion styles
└── components/             # Screen-specific components
    ├── ComponentA/
    └── ComponentB/
```

**Complex Screen (with sub-sections):**
```
ScreenName/
├── index.tsx               # Main screen component
├── ScreenName.styles.tsx
├── components/             # Smaller components
│   └── ComponentA/
└── ScreenNameBody/         # Large sub-section (if >200 lines)
    ├── index.tsx
    └── ScreenNameBody.styles.tsx
```

### When to Add Components

**Add to `/components` folder when:**
- Component only used in this screen
- Component has screen-specific logic
- Component tightly coupled to screen's data

**Example:**
```tsx
// LessonScreen/components/CompletionModal/index.tsx
// ✅ Screen-specific: Only used in LessonScreen
export const CompletionModal = ({ stars, lessonId, onContinue }) => {
  const { updateProgress } = useProgressContext() // Screen context
  // Logic specific to lesson completion
}
```

**Extract to `/sharedComponents` when:**
- Component reused in 2+ screens
- Component has no screen-specific dependencies
- Component is generic and configurable

---

## 🪝 Hooks (`/src/hooks`)

**Purpose:** Custom React hooks, including Context providers.

```
hooks/
├── useUserContext.tsx      # Auth & user data context
├── useProgressContext.tsx  # Lesson progress context
├── usePlayer.ts            # Audio playback hook
└── useKeyboardAware.ts     # Keyboard handling hook
```

**Pattern:**
```tsx
// Context hook (with provider)
export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }) => {
  // Context logic
  return <UserContext.Provider value={...}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUserContext must be used within UserProvider')
  return context
}
```

**Guidelines:**
- One hook per file
- Hooks start with `use` prefix
- Context hooks include Provider and consumer hook

**When to add here:**
- Reusable stateful logic
- App-wide state (Context)
- Side-effect management (e.g., audio, keyboard)

---

## 🎼 Theory (`/src/theory`)

**Purpose:** Music theory domain logic (the core of the app).

```
theory/
├── curriculum/             # Lesson & stage definitions
│   ├── config/             # Curriculum configuration
│   │   └── lessonTypes.ts  # Lesson type definitions
│   ├── stages/             # Stage-by-stage lesson data
│   │   ├── preGrade/
│   │   ├── grade1/
│   │   ├── grade2/
│   │   └── grade3/
│   └── index.ts            # Curriculum exports
│
└── exercises/              # Question generation
    ├── generators/         # Question type generators
    │   ├── scaleQuestions.ts
    │   ├── intervalQuestions.ts
    │   ├── chordQuestions.ts
    │   ├── rhythmQuestions.ts
    │   └── utils/          # Music theory utilities
    │       ├── scales.ts
    │       ├── intervals.ts
    │       └── notes.ts
    │
    ├── custom/             # Specialized question types
    │   ├── grouping/       # Grouping questions
    │   └── tieSlur/        # Tie/slur questions
    │
    ├── explanation/        # Answer explanations
    │   └── index.ts
    │
    └── utils/              # Exercise utilities
        └── questionFormatter.ts
```

### Curriculum Structure

**Purpose:** Define lesson content and progression.

**Pattern:**
```typescript
// theory/curriculum/stages/grade1/stage1.ts
export const grade1Stage1: Stage = {
  id: 'grade1-stage1',
  name: 'Notes on the Stave',
  description: 'Learn to read notes in treble and bass clef',
  lessons: [
    {
      id: 'lesson-1',
      name: 'Treble Clef',
      type: 'theory',
      exercises: [
        { type: 'note-identification', count: 10 },
        { type: 'note-placement', count: 10 },
      ],
    },
    // More lessons...
  ],
  finalTest: {
    // Final test configuration
  },
}
```

**When to edit:**
- Adding new lesson → Edit stage file
- Adding new stage → Create new stage file in `/stages/gradeX/`
- Changing lesson order → Reorder in stage definition
- Adding new grade → Create `/stages/gradeX/` folder

---

### Exercise Generators

**Purpose:** Generate questions dynamically based on exercise type.

**Pattern:**
```typescript
// theory/exercises/generators/scaleQuestions.ts
export const generateScaleQuestion = (
  grade: GradeLevel,
  questionNumber: number
): Question => {
  // Generate question based on grade difficulty
  const scale = selectRandomScale(grade)
  const options = generateOptions(scale)

  return {
    id: `scale-${questionNumber}`,
    type: 'scale-identification',
    question: `What scale is shown?`,
    notation: renderScale(scale),
    correctAnswer: scale.name,
    options,
  }
}
```

**Generator Responsibilities:**
1. **Generate question content** based on difficulty
2. **Render music notation** (if applicable)
3. **Generate plausible wrong answers**
4. **Return structured question object**

**When to add/edit:**
- Adding new question type → Create new generator file
- Changing question difficulty → Edit generator logic
- Fixing question bugs → Edit specific generator

---

### Music Theory Utilities

**Purpose:** Pure functions for music theory calculations.

```
exercises/generators/utils/
├── scales.ts               # Scale generation & validation
├── intervals.ts            # Interval calculations
├── notes.ts                # Note manipulation
├── chords.ts               # Chord construction
└── rhythm.ts               # Rhythm calculations
```

**Pattern:**
```typescript
// utils/scales.ts
export const getScaleNotes = (root: Note, type: ScaleType): Note[] => {
  // Pure function: no side effects
  const intervals = scaleIntervals[type]
  return intervals.map(interval => transposeNote(root, interval))
}

export const isValidScale = (notes: Note[], scaleType: ScaleType): boolean => {
  // Validation logic
}
```

**Guidelines:**
- **Pure functions only** (no side effects)
- **Well-tested** (critical for correctness)
- **Reusable** across multiple generators

---

## 🔧 Utilities (`/src/utils`)

**Purpose:** Generic utility functions (not domain-specific).

```
utils/
├── formatters.ts           # String/number formatting
├── validators.ts           # Input validation
├── dateHelpers.ts          # Date manipulation
└── storage.ts              # AsyncStorage helpers
```

**When to add here:**
- Generic helper functions
- Not music theory related
- Reusable across app

**Not music theory logic** → That goes in `/theory/exercises/utils`

---

## 🔥 Firebase Functions (`/functions`)

**Purpose:** Backend API (Cloud Functions).

```
functions/
├── api/                    # API endpoints
│   ├── lessonProgress/     # Lesson progress CRUD
│   │   ├── handlers.ts     # HTTP request handlers
│   │   ├── service.ts      # Business logic
│   │   └── firestore.ts    # Database operations
│   │
│   ├── userData/           # User data management
│   │   ├── handlers.ts
│   │   ├── service.ts
│   │   └── firestore.ts
│   │
│   └── revisionQuestions/  # Revision mode
│       └── ...
│
├── types/                  # Backend type definitions
│   └── api/
│       └── index.ts
│
└── index.ts                # Function exports
```

### Layered Architecture

**Pattern: Handler → Service → Firestore**

```
Handler (handlers.ts)     → HTTP layer (validation, auth check)
    ↓
Service (service.ts)      → Business logic (calculations, rules)
    ↓
Firestore (firestore.ts)  → Database operations (CRUD)
```

**Example:**
```typescript
// handlers.ts
export const updateLessonProgress = onCall(async (request) => {
  // 1. Validate input
  if (!request.auth) throw new HttpsError('unauthenticated', 'Not logged in')
  const validatedData = validateLessonProgressUpdate(request.data)

  // 2. Call service layer
  const result = await updateProgressService(request.auth.uid, validatedData)

  // 3. Return response
  return { success: true, data: result }
})

// service.ts
export const updateProgressService = async (userId: string, data: LessonProgressUpdate) => {
  // Business logic: calculate stars, check prerequisites, etc.
  const stars = calculateStars(data.score)
  const unlockNext = checkPrerequisites(data.lessonId)

  // Call database layer
  return await updateProgressInFirestore(userId, data.lessonId, { stars, unlockNext })
}

// firestore.ts
export const updateProgressInFirestore = async (userId: string, lessonId: string, data: any) => {
  const docRef = doc(db, `users/${userId}/lessonProgress/${lessonId}`)
  await setDoc(docRef, data, { merge: true })
  return data
}
```

**When to edit:**
- Adding API endpoint → Create new folder in `/api`
- Changing business logic → Edit `service.ts`
- Changing database structure → Edit `firestore.ts`

---

## 📝 Types (`/src/types`)

**Purpose:** TypeScript type definitions shared across app.

```
types/
├── api/                    # API request/response types
│   └── index.ts
├── lesson.ts               # Lesson & question types
├── user.ts                 # User & auth types
├── progress.ts             # Progress tracking types
└── theme.ts                # Theme types
```

**Pattern:**
```typescript
// types/lesson.ts
export interface Lesson {
  id: string
  name: string
  type: LessonType
  exercises: Exercise[]
}

export interface Question {
  id: string
  type: QuestionType
  question: string
  correctAnswer: string
  options: string[]
}

export type LessonType = 'theory' | 'aural' | 'scales' | 'sight-reading'
```

**Guidelines:**
- Export all types (never inline complex types)
- Group related types in same file
- Use `interface` for objects, `type` for unions/intersections

---

## 🎨 Assets (`/assets`)

**Purpose:** Static files (images, fonts, sounds).

```
assets/
├── fonts/                  # Custom fonts
│   └── sourGummy/
│       ├── SourGummy-Regular.ttf
│       └── ...
│
├── images/                 # Images
│   ├── boy/                # Character images
│   ├── girl/
│   └── coffee/             # Icons/illustrations
│
└── sounds/                 # Audio files
    └── piano-notes/
```

**Usage:**
```tsx
// Import images
import boyImage from '@/assets/images/boy/happy.png'

// Import fonts (configured in app.json)
import { useFonts } from 'expo-font'
```

---

## 📚 Documentation (`/docs`)

**Purpose:** Project documentation (not in app bundle).

```
docs/
├── Stage-Syllabus-Gap-Analysis.md
├── architecture-decisions.md
└── ...
```

---

## 🚀 Scripts (`/scripts`)

**Purpose:** Utility scripts for development.

```
scripts/
├── generate-icons.sh       # Icon generation
├── test-e2e.sh             # E2E test runner
└── deploy.sh               # Deployment script
```

---

## 🛠️ Development Workflow

### Adding a New Feature

**Example: Add "Achievements" feature**

#### 1. Add Route
```tsx
// app/achievements.tsx
import AchievementsScreen from '@/screens/AchievementsScreen'
export default AchievementsScreen
```

#### 2. Create Screen
```
src/screens/AchievementsScreen/
├── index.tsx
├── AchievementsScreen.styles.tsx
└── components/
    ├── AchievementCard/
    └── AchievementsList/
```

#### 3. Add Types
```typescript
// src/types/achievement.ts
export interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
}
```

#### 4. Add Backend (if needed)
```
functions/api/achievements/
├── handlers.ts
├── service.ts
└── firestore.ts
```

#### 5. Add Context (if needed)
```typescript
// src/hooks/useAchievementsContext.tsx
export const AchievementsProvider = ({ children }) => { ... }
export const useAchievementsContext = () => { ... }
```

---

### Adding a New Question Type

**Example: Add "Key Signature" questions**

#### 1. Create Generator
```typescript
// src/theory/exercises/generators/keySignatureQuestions.ts
export const generateKeySignatureQuestion = (grade: GradeLevel, num: number): Question => {
  // Question generation logic
}
```

#### 2. Add to Exercise Config
```typescript
// src/theory/curriculum/stages/grade2/stage3.ts
exercises: [
  { type: 'key-signature', count: 10 },
]
```

#### 3. Add Type
```typescript
// src/types/lesson.ts
export type QuestionType =
  | 'note-identification'
  | 'key-signature'  // New type
  | ...
```

#### 4. Register Generator
```typescript
// src/theory/exercises/index.ts
import { generateKeySignatureQuestion } from './generators/keySignatureQuestions'

export const questionGenerators = {
  'key-signature': generateKeySignatureQuestion,
  // ...
}
```

---

## 📋 File Naming Conventions

### Files
- **Components:** PascalCase (e.g., `Button3D.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useProgressContext.tsx`)
- **Utilities:** camelCase (e.g., `formatters.ts`)
- **Types:** camelCase (e.g., `lesson.ts`)
- **Styles:** Match component + `.styles` suffix (e.g., `Button3D.styles.tsx`)

### Folders
- **Components:** PascalCase (e.g., `/Button3D/`)
- **Screens:** PascalCase with "Screen" suffix (e.g., `/HomeScreen/`)
- **Utilities:** camelCase (e.g., `/config/`)
- **Routes:** kebab-case for dynamic routes (e.g., `/app/(auth)/`)

### Exports
- **Default export:** Component itself (e.g., `export default HomeScreen`)
- **Named exports:** Types, utilities from component (e.g., `export type HomeScreenProps`)

---

## 🔗 Import Paths

### Path Aliases (Configured in `tsconfig.json`)

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@types": ["./src/types"]
  }
}
```

### Usage

```tsx
// ✅ Good: Use path aliases
import { Button3D } from '@/sharedComponents/Button3D'
import { useProgressContext } from '@/hooks/useProgressContext'
import type { Lesson } from '@types/lesson'

// ❌ Bad: Relative paths
import { Button3D } from '../../../sharedComponents/Button3D'
```

### Import Order (Recommended)

```tsx
// 1. External libraries
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'

// 2. Global components & hooks
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useProgressContext } from '@/hooks/useProgressContext'

// 3. Shared components
import { Button3D } from '@/sharedComponents/Button3D'

// 4. Local components (same screen)
import { LessonCard } from './components/LessonCard'

// 5. Types
import type { Lesson } from '@types/lesson'

// 6. Styles
import { styles } from './HomeScreen.styles'
```

---

## 🧪 Testing Structure (Future)

**When tests are added:**

```
src/screens/HomeScreen/
├── index.tsx
├── HomeScreen.styles.tsx
├── __tests__/              # Tests colocated with code
│   └── HomeScreen.test.tsx
└── components/
    ├── LessonCard/
    │   ├── index.tsx
    │   └── __tests__/
    │       └── LessonCard.test.tsx
```

**Pattern:**
- Tests in `__tests__/` folder
- Test file named `ComponentName.test.tsx`
- Colocated with component (not separate `/tests` folder)

---

## 🚫 Common Mistakes to Avoid

### ❌ Don't: Add Screen Components to `/sharedComponents`

```tsx
// ❌ Bad: Screen-specific component in shared
/sharedComponents/LessonCompletionModal/

// ✅ Good: Keep in screen folder
/screens/LessonScreen/components/CompletionModal/
```

**Why:** Screen-specific components have dependencies on screen context and aren't truly reusable.

---

### ❌ Don't: Put Business Logic in Components

```tsx
// ❌ Bad: Music theory logic in component
const HomeScreen = () => {
  const calculateStars = (score: number) => {
    // Complex scale calculation logic
  }
}

// ✅ Good: Extract to theory utilities
import { calculateStars } from '@/theory/exercises/utils/scoring'

const HomeScreen = () => {
  const stars = calculateStars(score)
}
```

**Why:** Business logic should be testable in isolation and reusable.

---

### ❌ Don't: Import from `/app` in `/src`

```tsx
// ❌ Bad: Circular dependency risk
import { SomeRoute } from 'app/some-route'

// ✅ Good: Use navigation
import { router } from 'expo-router'
router.push('/some-route')
```

**Why:** `/app` imports from `/src`, not the other way around.

---

### ❌ Don't: Mix Domain Logic with UI

```tsx
// ❌ Bad: Mixed concerns
const LessonScreen = () => {
  // Question generation (domain logic)
  const generateQuestion = () => { ... }

  // UI rendering
  return <View>...</View>
}

// ✅ Good: Separate concerns
import { generateQuestion } from '@/theory/exercises/generators'

const LessonScreen = () => {
  const question = generateQuestion(grade, num)
  return <View>...</View>
}
```

**Why:** UI and business logic have different rates of change and testing requirements.

---

## 📐 Architecture Principles

### 1. **Separation of Concerns**
- **UI** (`/screens`, `/sharedComponents`) → How it looks
- **Domain Logic** (`/theory`) → What it does
- **State** (`/hooks`) → What it knows
- **Backend** (`/functions`) → Where it persists

### 2. **Colocation**
- Keep related code together (component + styles + types)
- Screen-specific components in screen folder
- Tests next to implementation

### 3. **Reusability**
- Extract to `/sharedComponents` only when used 2+ times
- Extract to `/utils` when logic is generic
- Don't abstract prematurely

### 4. **Clear Dependencies**
- `/app` depends on `/src/screens`
- `/src/screens` depends on `/src/sharedComponents` and `/src/hooks`
- `/src/theory` is independent (domain logic)
- No circular dependencies

---

## 🗺️ Quick Reference: Where to Add...

| What | Where |
|------|-------|
| **New screen/page** | `/app/screen-name.tsx` + `/src/screens/ScreenName/` |
| **Reusable UI component** | `/src/sharedComponents/ComponentName/` |
| **Screen-specific component** | `/src/screens/ScreenName/components/ComponentName/` |
| **Custom hook** | `/src/hooks/useHookName.tsx` |
| **Context provider** | `/src/hooks/useContextName.tsx` |
| **Question generator** | `/src/theory/exercises/generators/questionType.ts` |
| **Music theory utility** | `/src/theory/exercises/utils/utilityName.ts` |
| **New lesson** | `/src/theory/curriculum/stages/gradeX/stageY.ts` |
| **API endpoint** | `/functions/api/endpointName/` |
| **Type definition** | `/src/types/typeName.ts` |
| **Generic utility** | `/src/utils/utilityName.ts` |
| **Theme/config** | `/src/config/configName.ts` |
| **Static asset** | `/assets/type/filename` |

---

## 🎯 Decision Tree: Where Does This Code Go?

```
Is it a new screen?
├─ Yes → /app/route.tsx + /src/screens/ScreenName/
└─ No ↓

Is it a UI component?
├─ Yes ↓
│   └─ Used in 2+ screens?
│       ├─ Yes → /src/sharedComponents/ComponentName/
│       └─ No → /src/screens/ScreenName/components/ComponentName/
└─ No ↓

Is it state management?
├─ Yes → /src/hooks/useContextName.tsx
└─ No ↓

Is it music theory logic?
├─ Yes ↓
│   └─ Question generation?
│       ├─ Yes → /src/theory/exercises/generators/
│       └─ No → /src/theory/exercises/utils/
└─ No ↓

Is it backend logic?
├─ Yes → /functions/api/endpointName/
└─ No ↓

Is it a type definition?
├─ Yes → /src/types/typeName.ts
└─ No → /src/utils/utilityName.ts
```

---

## 📝 Checklist: Adding New Code

Before committing new code, verify:

- [ ] Code is in correct folder (see decision tree above)
- [ ] File/folder follows naming conventions
- [ ] Imports use path aliases (`@/...`)
- [ ] Component has `.styles.tsx` file (if has styles)
- [ ] Types are defined (no `any`)
- [ ] Screen components in `/src/screens` match routes in `/app`
- [ ] Business logic extracted from UI components
- [ ] No circular dependencies

---

**Document Version:** 1.0
**Created:** 2026-01-29
**Last Updated:** 2026-01-29
**Maintained By:** Development Team
