# Move Modals to Screen Components

Move modals from `src/sharedComponents/` to their respective screen components folders since each is only used in one place.

## Analysis

Each modal is only used in one location:

- **WarningModal**: Used only in `src/screens/TheoryScreen/components/LessonSection/index.tsx`
- **StarRatingModal**: Used only in `src/screens/LessonScreen/index.tsx`
- **RevisionCompletionModal**: Used only in `src/screens/RevisionScreen/index.tsx`
- **FinalTestFailureModal**: Used only in `src/screens/LessonScreen/index.tsx`

## Implementation

1. **Move WarningModal**

- From: `src/sharedComponents/WarningModal/`
- To: `src/screens/TheoryScreen/components/LessonSection/components/WarningModal/`
- Update imports: `../Modal` → `../../../../../../sharedComponents/Modal`, `../../hooks` → `../../../../../../hooks`

2. **Move StarRatingModal**

- From: `src/sharedComponents/StarRatingModal/`
- To: `src/screens/LessonScreen/components/StarRatingModal/`
- Update imports: `../Modal` → `../../../sharedComponents/Modal`, `../../hooks` → `../../../hooks`

3. **Move RevisionCompletionModal**

- From: `src/sharedComponents/RevisionCompletionModal/`
- To: `src/screens/RevisionScreen/components/RevisionCompletionModal/`
- Create `src/screens/RevisionScreen/components/` folder first
- Update imports: `../Modal` → `../../../sharedComponents/Modal`, `@/hooks` → `../../../hooks`

4. **Move FinalTestFailureModal**

- From: `src/sharedComponents/FinalTestFailureModal/`
- To: `src/screens/LessonScreen/components/FinalTestFailureModal/`
- Update imports: `../Modal` → `../../../sharedComponents/Modal`, `../../hooks` → `../../../hooks`

5. **Update screen imports**

- `src/screens/TheoryScreen/components/LessonSection/index.tsx`: Change from `@/sharedComponents` to `./components/WarningModal`
- `src/screens/LessonScreen/index.tsx`: Change from `@/sharedComponents` to `./components/StarRatingModal` and `./components/FinalTestFailureModal`
- `src/screens/RevisionScreen/index.tsx`: Change from `@/sharedComponents` to `./components/RevisionCompletionModal`

6. **Update sharedComponents/index.ts**

- Remove exports for: `WarningModal`, `StarRatingModal`, `RevisionCompletionModal`, `FinalTestFailureModal`

7. **Delete old modal directories**

- Delete `src/sharedComponents/WarningModal/`
- Delete `src/sharedComponents/StarRatingModal/`
- Delete `src/sharedComponents/RevisionCompletionModal/`
- Delete `src/sharedComponents/FinalTestFailureModal/`

## Files to Move

- `src/sharedComponents/WarningModal/` → `src/screens/TheoryScreen/components/LessonSection/components/WarningModal/`
- `src/sharedComponents/StarRatingModal/` → `src/screens/LessonScreen/components/StarRatingModal/`
- `src/sharedComponents/RevisionCompletionModal/` → `src/screens/RevisionScreen/components/RevisionCompletionModal/`
- `src/sharedComponents/FinalTestFailureModal/` → `src/screens/LessonScreen/components/FinalTestFailureModal/`

## Files to Update

- `src/screens/TheoryScreen/components/LessonSection/index.tsx`
- `src/screens/LessonScreen/index.tsx`
- `src/screens/RevisionScreen/index.tsx`
- `src/sharedComponents/index.ts`
- All moved modal index.tsx files (update relative imports)

## Files to Delete

- `src/sharedComponents/WarningModal/` (entire directory)
- `src/sharedComponents/StarRatingModal/` (entire directory)
- `src/sharedComponents/RevisionCompletionModal/` (entire directory)
- `src/sharedComponents/FinalTestFailureModal/` (entire directory)