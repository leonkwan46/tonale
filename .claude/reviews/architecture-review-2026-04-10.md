# Architecture Review — Tonale
**Date:** 2026-04-10  
**Scope:** Full codebase — state management, typing, generators, routing, Firebase, testing

**Overall verdict: Well-structured for a solo RN project. Three real issues worth fixing before Grade 3.**

---

## CRITICAL — Mutable Module-Level State

**File:** `src/hooks/useProgressContext.tsx:53–127`

`stagesArray` is a module-level import that gets **directly mutated** throughout the progress context:

```ts
stage.isUnlocked = calculateStageUnlockStatus(...)  // mutating imported object
lesson.stars = progressUpdate.stars                  // mutating imported object
```

This is the most significant architectural risk. Module-level objects are shared as a singleton — mutations persist across re-renders, React Strict Mode will corrupt the state (double-invocation), and it bypasses React's reactivity entirely. The UI only updates because `setProgressDataState` is called separately, not because the mutation triggers anything.

**Fix:** `stagesArray` should be immutable config. Derive a computed view by merging config + `progressData` on read, not by mutating on write.

---

## HIGH — `generatorType` is `string` instead of a Union Type

**File:** `src/types/lesson.ts:54`

```ts
export interface ExerciseConfig {
  generatorType: string  // ← should be a union
```

The dispatcher in `generator.ts` uses a full `switch/case` over this field. TypeScript can't catch a misspelled `'noteNameVal'` or a missing case for a new generator. There's also a `LessonContentType` union already defined in `lesson.ts` but it's not wired to `ExerciseConfig.generatorType`.

**Fix:**
```ts
export type GeneratorType =
  | 'noteRestValue' | 'noteNameValue' | 'restNameValue'
  | 'trebleClef' | 'bassClef' | 'accidentals' | 'semitonesTones'
  | 'timeSignature' | 'keySignature' | 'musicalTerm' | 'dottedValues'
  | 'noteGrouping' | 'tieSlur' | 'scaleDegrees' | 'interval' | 'triad'
  | 'theory-stage-0-final' | 'theory-stage-1-final' | 'theory-stage-2-final'
  | 'rhythm' | 'aural-stage-0-final'

generatorType: GeneratorType
```

---

## HIGH — Grade 3 Will Break `allStageLessons`

**File:** `src/hooks/useProgressContext.tsx:148–152`

```ts
const allStageLessons: StageLesson[] = [
  ...stagesArray[0].lessons,
  ...stagesArray[1].lessons,
  ...stagesArray[2].lessons,  // ← hardcoded, Grade 3 won't be included
]
```

**Fix:**
```ts
const allStageLessons = stagesArray.flatMap(s => s.lessons)
```

---

## MEDIUM — Pure Utility Functions Threaded Through Context Unnecessarily

**File:** `src/hooks/useProgressContext.tsx:454–468`

`getStageById`, `getStageRequirements`, `getNextLockedStage`, `trackLessonAccess`, `getLastLessonAccess` are pure functions with no dependency on context state. They inflate `ProgressContextType` and any component can import them directly from source.

**Fix:** Remove from context, import directly where needed.

---

## MEDIUM — Subject Detection by String Prefix, Not Type

**File:** `src/screens/LessonScreen/index.tsx:46`

```ts
if (id.startsWith('aural-')) { ... }
```

A naming convention masquerading as a type. A typo or rename silently breaks routing.

**Fix:** Add `subject: 'theory' | 'aural'` field to `Lesson` or `ExerciseConfig` — TypeScript enforces it, no string matching needed.

---

## MEDIUM — No Tests for the Most Complex Code

Context providers (`useProgressContext`, `useUserContext`) and `curriculumHelper.ts` contain the most business-critical logic — stage unlocking, progress merging, cache/server sync — and have **zero unit tests**. The 17 generator tests are excellent but the progression logic is completely uncovered.

---

## LOW — Non-null Assertion on Context Hooks

```ts
export const useProgress = () => useContext(ProgressContext)!
```

Silently crashes if used outside provider. Should throw a descriptive error instead.

---

## LOW — `fetchUserData` Not Memoized

**File:** `src/hooks/useUserContext.tsx:41`

Every other function in `UserProvider` uses `useCallback`. `fetchUserData` doesn't — inconsistent, and it's passed through context where consumers may use it as a dependency.

---

## What's Genuinely Good

- **Generator system** — clean separation, independently testable, dispatcher pattern scales well
- **Cache-first + background refresh** in `initializeUserProgress` is the right pattern for mobile
- **Firebase emulator wiring** — clean, developer-friendly, platform-aware
- **Component conventions** — dual-file, no `useTheme` in logic, consistently followed throughout
- **`calculateStageUnlockStatus` as pure function** in `curriculumHelper.ts` — right design
- **Type system overall** is solid — `generatorType: string` is the main weak spot

---

## Priority Order

| # | Issue | File | Effort |
|---|---|---|---|
| 1 | Mutable `stagesArray` | `useProgressContext.tsx:53–127` | Medium |
| 2 | `generatorType` union type | `src/types/lesson.ts:54` | Small |
| 3 | `allStageLessons.flatMap` | `useProgressContext.tsx:148` | Trivial |
| 4 | Remove pure fns from context | `useProgressContext.tsx:454` | Small |
| 5 | Tests for contexts + curriculumHelper | `tests/unit/` | Medium |
| 6 | Subject type field on Lesson | `src/types/lesson.ts` | Small |

**Key tradeoff:** The mutable global state was probably the fastest path to working stage unlock logic, but it's the one decision that will be hardest to debug at Grade 3+ complexity — fix it while the stage count is still small.
