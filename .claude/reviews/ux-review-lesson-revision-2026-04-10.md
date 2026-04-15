# UX Review — Lesson Flow → Revision Flow
**Date:** 2026-04-10  
**Scope:** LessonScreen, LessonHeader, LessonScreenBody, AnswerInterface, LessonCompleteModal, FinalTestModal, QuestionExplanation, RevisionScreen, useRevision, RevisionCompletionModal  
**Lens:** Mobile learning app, target users aged 8–16

---

## BLOCKER — Blank screen when lessonId is missing or invalid

**File:** `src/screens/LessonScreen/index.tsx:219`

```ts
if (!lesson || questions.length === 0) return null
```

If `lessonId` is missing, invalid, or `getLesson` returns null (e.g. race on context update), the screen renders completely blank — no loading indicator, no error message, no back button. The student is stuck on an empty screen with only the device back gesture as an escape.

**Fix:** Render a `ScreenContainer` with an error/loading state and a back button instead of `null`.

---

## BLOCKER — Blank screen when revision queue is empty

**File:** `src/screens/RevisionScreen/index.tsx:28`

```ts
if (!hasQuestions && !completion.showModal) return null
```

If the student navigates to revision with nothing to revise, the screen is entirely blank. No "All caught up!" message, no back button. The `LessonHeader` isn't rendered either, so there's no navigation escape.

**Fix:** Render an empty state — "Nothing to revise yet. Keep going with your lessons!" — and a back button.

---

## BLOCKER — Back button exits mid-lesson with no confirmation

**File:** `src/screens/LessonScreen/LessonHeader/index.tsx:31`

The back arrow calls `navigateBack()` immediately with no guard. A student who taps back mid-lesson loses all in-progress answers and the revision questions that would have been queued. The back button sits in the top-left corner — a standard thumb zone for one-handed use — making accidental taps very likely.

**Fix:** Show a confirmation dialog: "Leave this lesson? Your progress will be lost."

---

## FRICTION — Final test failure threshold is off-by-one between components

**Files:** `src/screens/LessonScreen/index.tsx:107`, `src/screens/LessonScreen/components/AnswerInterface/index.tsx:66`

Two different threshold checks govern the same rule:

```ts
// LessonScreen — triggers failure modal at exactly 3 wrong
if (lesson?.isFinalTest && updated.length >= 3) {
  setShowFailureModal(true)
}

// AnswerInterface — blocks auto-advance only at > 3 wrong
const shouldBlock = isFinalTest && !correct && totalWrong > FINAL_TEST_FAILURE_THRESHOLD
```

At exactly 3 wrong answers: `setShowFailureModal(true)` fires AND the 1500ms auto-advance timer fires (since `3 > 3 = false`). The failure modal appears while the question counter advances in the background. This is invisible to the user but leaves the screen in an inconsistent state if the modal is dismissed.

**Fix:** Change `>` to `>=` in `AnswerInterface` to match the threshold in `LessonScreen`.

---

## FRICTION — Revision mode is visually indistinguishable from a lesson

**File:** `src/screens/RevisionScreen/index.tsx:32–34`

```tsx
<LessonHeader
  lesson={null}  // no title, no final-test X marks
  ...
/>
```

The revision screen reuses `LessonHeader` with `lesson={null}`, which renders only the question counter and back button — identical to a regular lesson header. No "Revision" label, no visual cue that this session has different rules. A student who tapped "Revision" from the home screen may not know why no explanation modals appear (they don't, because `isFinalTest` defaults to false... wait, actually explanations DO appear in revision mode). Still — no session label means the student can't tell what mode they're in.

**Fix:** Pass a `title` prop to `LessonHeader` and display "Revision" in the header for revision sessions.

---

## FRICTION — Streak mechanic is completely invisible to the student

**File:** `src/screens/RevisionScreen/useRevision.ts:9`

```ts
const CORRECT_STREAK_THRESHOLD = 2
```

A revision question is removed after 2 correct answers in a row. The student has no idea this is happening — no progress indicator, no "1 more correct and this is mastered!" feedback. The `RevisionCompletionModal` tells them how many questions remain, but not how many they've "mastered" in this session. For a young learner, the system feels opaque.

**Fix:** Show a small streak indicator per question (e.g. a single pip that fills on first correct), or surface it in the completion modal as "X questions mastered."

---

## FRICTION — Lesson save failure is silent

**File:** `src/screens/LessonScreen/index.tsx:173–217`

`completeLesson` plays the success/failure sound and shows the star modal before `updateLessonProgress` and `storeRevisionQuestions` resolve. If either call fails (network drop, Firebase error), `isCompleting` stays `true`, the modal is already showing, and nothing tells the student their progress wasn't saved. On a phone with patchy connectivity — common for a student on the go — this is a real risk.

**Fix:** Await the saves before showing the modal, or show a retry prompt if the save fails while the modal is open.

---

## FRICTION — Auto-advance can't be skipped

**File:** `src/screens/LessonScreen/components/AnswerInterface/index.tsx:27–28`

```ts
const EXPLANATION_MODAL_DELAY = 1000
const CORRECT_ANSWER_DELAY = 1500
```

After a correct answer, the student waits 1500ms before the next question loads. There's no tap-to-continue — the screen is locked until the timer fires. For a confident student moving quickly, this is a noticeable drag across 10 questions.

**Fix:** Allow a tap anywhere on the result state to skip the delay and advance immediately.

---

## POLISH — 0-star result has no distinct visual state

**File:** `src/screens/LessonScreen/components/LessonCompleteModal/index.tsx:54–58`

```ts
if (stars === 0) {
  starAnimations.forEach(anim => anim.setValue(0.1))  // barely visible stars
  return
}
```

Zero stars renders three very faint empty stars (opacity 0.1) with no animation. No distinct icon, no unique message. The star animation system is built for 1–3 stars. At 0 stars the student sees a visually broken-looking modal with ghost stars. 

**Fix:** Add a dedicated 0-star state — a different icon (e.g. a book or a "keep practising" indicator) with an encouraging message, distinct from the star row.

---

## POLISH — "Retry" label is ambiguous

**File:** `src/screens/LessonScreen/components/LessonCompleteModal/index.tsx:129–137`

The completion modal shows "Retry" alongside "Continue." For a young learner, "Retry" could mean retry from question 1, retry just the wrong answers, or retry from where they left off. The intent is restart the entire lesson, but the label doesn't communicate that.

**Fix:** "Try Again" is warmer and clearer for this age group.

---

## POLISH — ❌ emoji on final test failure feels harsh

**File:** `src/screens/LessonScreen/components/FinalTestModal/index.tsx:17`

```ts
failure: {
  icon: '❌',
  title: 'Not quite yet!',
```

The copy is encouraging ("Not quite yet!") but the ❌ emoji contradicts it. For an 8-year-old who just failed a test, a red X is a strong negative signal.

**Fix:** Replace with something neutral — 💪, 🎯, or a simple music note icon — that aligns with the encouraging tone of the copy.

---

## What's Good

- **Answer feedback** — green/red state on choice buttons with sound is immediate and unambiguous
- **Explanation modals** — triggered automatically on wrong answers with a 1s delay feels natural, not punishing
- **Star animation** — staggered reveal per star (500ms apart) is genuinely satisfying for 1–3 stars
- **Final test X-marks** in header — real-time lives indicator is the right mechanic for high-stakes feeling
- **`restartKey` pattern** — remounting `LessonScreenBody` on retry cleanly clears all stale UI state
- **Revision `correctCount` decay** — wrong answer in revision decrements toward 0 (not below), preventing regression beyond the floor
- **Duplicate question guard** in `onAnswerSubmit` — prevents the same question being stored twice in revision

---

## Priority Order

| # | Issue | File | Severity |
|---|---|---|---|
| 1 | Blank screen on invalid lessonId | `LessonScreen/index.tsx:219` | BLOCKER |
| 2 | Blank screen on empty revision | `RevisionScreen/index.tsx:28` | BLOCKER |
| 3 | Back button exits with no confirmation | `LessonHeader/index.tsx:31` | BLOCKER |
| 4 | Failure threshold off-by-one | `AnswerInterface/index.tsx:66` | FRICTION |
| 5 | Revision header has no title/label | `RevisionScreen/index.tsx:32` | FRICTION |
| 6 | Streak mechanic invisible | `useRevision.ts:9` | FRICTION |
| 7 | Silent save failure | `LessonScreen/index.tsx:173` | FRICTION |
| 8 | Auto-advance can't be skipped | `AnswerInterface/index.tsx:27` | FRICTION |
| 9 | 0-star state visually broken | `LessonCompleteModal/index.tsx:54` | POLISH |
| 10 | "Retry" label ambiguous | `LessonCompleteModal/index.tsx:129` | POLISH |
| 11 | ❌ emoji on failure is harsh | `FinalTestModal/index.tsx:17` | POLISH |
