# UX Review — LessonCompleteModal
**Date:** 2026-04-23
**Scope:** `LessonCompleteModal/index.tsx`, `LessonCompleteModal.styles.tsx`, `starCalculation.ts`, `Modal/Modal.styles.tsx`, `Button/Button.styles.tsx`
**Lens:** Mobile learning app, target users aged 8–16

---

## BLOCKER — Android back button triggers "Try Again" instead of "Continue"

**File:** `LessonCompleteModal/index.tsx:116`

```tsx
<Modal visible={visible} onRequestClose={onRetry} ...>
```

`onRequestClose` maps to `onRetry`. On Android, pressing the hardware back button to dismiss the modal silently **restarts the lesson** instead of continuing. A student who just earned 3 stars and hits back loses that result and is dropped into a fresh lesson with no warning. Should map to `onContinue` — the same action as pressing "Continue."

**Fix:** Change `onRequestClose={onRetry}` → `onRequestClose={onContinue}`.

---

## FRICTION — Unfilled empty stars are invisible — star count context is lost

**File:** `LessonCompleteModal/index.tsx:83–111`

All three `AnimatedStarContainer` elements start at `opacity: 0` (driven by `animation` which starts at 0). Only `stars` animations are triggered — the remaining slots stay at opacity 0 and are never visible. For a 2-star result the student sees two stars pop in, then nothing — it looks like a 2-star system rather than a 3-star system where they fell one short. The "you got 2 out of 3" context is entirely missing.

**Fix:** Render the unfilled ☆ stars immediately at full opacity (no entrance animation needed for empty slots), and only animate the filled ⭐ slots in on their staggered timers.

---

## FRICTION — "Try Again" shown on a 3-star perfect result

**File:** `LessonCompleteModal/index.tsx:136–144`

"Try Again" is always rendered regardless of star count. At 3 stars (perfect score) there is no reason to retry. Showing it creates confusion ("retry what? I just got perfect!") and risks accidental taps that wipe the result — especially for a young learner whose thumb may drift toward the left button. At high scores the student should have a single clear action: Continue.

**Fix:** Hide "Try Again" (and show "Continue" as a single centred button) when `stars === 3`.

---

## FRICTION — Button tap targets are under 44pt on phone

**File:** `Button/Button.styles.tsx:157–162`, `Modal/Modal.styles.tsx:66–76`

`size="sm"` buttons have `paddingVertical = scale(8)` ≈ 9.75pt on a 390pt device. Text height at `md` typography ≈ 16pt. Total tap target height ≈ 35.5pt — under iOS's 44pt minimum. Both buttons in the modal use `size="sm"`.

**Fix:** Switch to `size="md"` in `LessonCompleteModal`, or add a `minHeight: scale(44)` to `ButtonItem` in this context.

---

## POLISH — Description text is muted when it should celebrate

**File:** `LessonCompleteModal/index.tsx:131–133`, `Modal/Modal.styles.tsx:58–64`

`DescriptionText` renders with the `muted` prop (grey, reduced contrast). For positive result copy like "Amazing! You got 100% correct!" the muted style undercuts the celebration. Muted text belongs on helper/secondary information, not on the primary result statement.

**Fix:** Remove `muted` from `DescriptionText` for this modal, or pass a `colorVariant` override prop when the result is positive (stars > 0).

---

## POLISH — Gold star color in dark mode is dark brownish — low contrast and unmotivating

**File:** `components.ts:206–208`

Dark mode maps `achievement.gold` to `gold[700]` = `#B8860B` (dark goldenrod). On the dark surface (`gray[800]`), this is a low-contrast, muddy brown — the opposite of a gleaming gold star. Light mode correctly uses `gold[400]` = `#FFD700` (bright gold).

**Fix:** Use `gold[400]` or `gold[500]` = `#FFA500` in dark mode to keep the star feeling rewarding.

---

## POLISH — Accuracy % is abstract for young learners; wrong count is more concrete

**File:** `starCalculation.ts:30–44`

"You got 80% correct" requires mental arithmetic that an 8–10 year old may not do quickly. "You got 8 out of 10 right" (or "2 wrong") is immediately understood and more personal.

**Fix:** Update `getStarDescription` to include the concrete right/wrong count alongside (or instead of) the percentage. E.g. `"You got ${correctAnswers} out of ${totalQuestions} right!"`.

---

## POLISH — Dead animation code in the 0-star path

**File:** `LessonCompleteModal/index.tsx:54–58`

When `stars === 0`, the code sets `starAnimations.forEach(anim => anim.setValue(0.1))` but since the 0-star branch renders a 📖 icon instead of `renderStars()`, these values are never read. The code is misleading and leaves dirty animation state.

**Fix:** Replace the 0-star animation block with `starAnimations.forEach(anim => anim.setValue(0))` (clean reset), or remove the special case entirely since `renderStars()` isn't called.

---

## What's Good

- **Staggered star animation** (500ms apart, scale from 0.3→1) is genuinely satisfying for 1–3 stars
- **Separate 📖 icon for 0-star** avoids the ghost-star visual from before
- **Encouraging copy** at every tier — "Good effort!", "Keep practising!" avoids shame language
- **Modal overlay tap** correctly dismisses (maps to `onRequestClose`)
- **`restartKey` pattern** means "Try Again" cleanly remounts the lesson body

---

## Priority Table

| # | Issue | File | Severity |
|---|---|---|---|
| 1 | Hardware back triggers retry | `LessonCompleteModal/index.tsx:116` | BLOCKER |
| 2 | Unfilled stars invisible — context lost | `LessonCompleteModal/index.tsx:83` | FRICTION |
| 3 | "Try Again" shown at 3 stars | `LessonCompleteModal/index.tsx:136` | FRICTION |
| 4 | Button tap targets under 44pt | `Button.styles.tsx:157`, `Modal.styles.tsx:66` | FRICTION |
| 5 | Description text muted on positive result | `LessonCompleteModal/index.tsx:131` | POLISH |
| 6 | Gold star dark/muddy in dark mode | `components.ts:206` | POLISH |
| 7 | Accuracy % abstract for young learners | `starCalculation.ts:30` | POLISH |
| 8 | Dead 0-star animation state | `LessonCompleteModal/index.tsx:54` | POLISH |
