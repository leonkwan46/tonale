# UX Review — Auth Flows
**Date:** 2026-04-10  
**Scope:** AuthScreen, AuthForm, OnboardingScreen/OnboardingBody, AuthActionScreen  
**Lens:** Mobile learning app, target users aged 8–16

---

## BLOCKER — Silent failure on onboarding completion

**File:** `src/screens/OnboardingScreen/OnboardingBody/index.tsx:74`

```ts
} catch {
  setIsCompleting(false)
}
```

`Promise.all([updateUserData, updateUserDisplayName, sendEmailVerificationToUser])` — if any of the three calls fail (network drop, server error, etc.), the error is completely swallowed. The button re-enables with no message. The student thinks their profile wasn't saved and taps again, or gives up.

**Fix:** Show an error message in the catch block — even a generic "Something went wrong. Please try again."

---

## BLOCKER — Error card never renders for handler-returned errors in AuthActionScreen

**File:** `src/screens/AuthActionScreen/index.tsx:94,165`

```ts
hasProcessedRef.current = true  // line 94 — set unconditionally, including on error results

// line 165:
{status === 'error' && !hasProcessedRef.current && (
  <Card><ErrorState error={error} /></Card>
)}
```

`hasProcessedRef.current` is set to `true` unconditionally after `handler.process()` resolves — whether the result is success or error. So for any error returned by `handler.process()` (expired OOB code, invalid link, etc.), `hasProcessedRef.current` is already `true` when the render runs, and `!hasProcessedRef.current` is `false`. The error card never appears. The user lands on a blank loading spinner indefinitely.

Only pre-process validation errors and thrown exceptions (`.catch` path) currently show the error card.

**Fix:** Remove `!hasProcessedRef.current` from the error render condition, or only set `hasProcessedRef.current = true` on success paths.

---

## BLOCKER — No UI acknowledgment that a verification email was sent

**File:** `src/screens/OnboardingScreen/OnboardingBody/index.tsx:66`

```ts
const [result] = await Promise.all([
  updateUserData({ ... }),
  updateUserDisplayName(trimmedName),
  sendEmailVerificationToUser()  // fires silently
])
// ...
router.replace('/(tabs)')  // immediately redirected
```

The user completes onboarding and is sent straight to the app with no indication that they need to verify their email. A young learner will have no idea a verification email exists. If email verification is required before accessing any content, this becomes a confusion wall.

**Fix:** Show a brief toast or modal before redirecting — "We've sent a verification email to [email]. Check your inbox to confirm your account."

---

## FRICTION — Gender pre-selected as Male

**File:** `src/screens/OnboardingScreen/OnboardingBody/index.tsx:27`

```ts
const [selectedGender, setSelectedGender] = useState<UserGender | null>(GENDER.MALE)
```

Male is the default selection. A student who scrolls past the gender row without looking submits incorrect data silently. The button is enabled from the start because this condition is already satisfied.

**Fix:** Default to `null` and require explicit selection — `canCompleteOnboarding` already handles the null check correctly.

---

## FRICTION — Forgot password requires email pre-typed with no hint

**File:** `src/screens/AuthActionScreen/components/AuthForm/index.tsx:150–154`

```ts
const handleForgotPassword = async () => {
  const email = formData.email?.trim()
  if (!email) {
    updateAuthState({ error: 'Please enter your email above to receive a password reset link.' })
    return
  }
```

The "Forgot password?" link gives no indication upfront that the email field must be filled first. A student who taps it with an empty form sees an error message pointing "above" — but at that age they may not read it. Discovery is backwards.

**Fix:** Add a small placeholder hint beneath the button: "Enter your email above first" — or pre-fill the email in a modal flow.

---

## FRICTION — Password validation is submit-only, not real-time

**File:** `src/screens/AuthScreen/components/AuthForm/index.tsx:62–78,292–296`

Password requirements ("at least 6 characters") appear as static hint text from the start. No inline feedback as the user types — they only discover mismatches or length violations on submit. For young learners this creates a slow trial-and-error loop.

**Fix:** Add inline validation on `onChangeText` for the password/confirm-password pair — a simple coloured indicator (green/red) on the hint text is sufficient.

---

## FRICTION — Form fields remain editable during async auth

**File:** `src/screens/AuthScreen/components/AuthForm/index.tsx:299–316`

While `authState.loading` is true, the submit button shows a spinner and is disabled — but the email/password inputs remain fully editable and focusable. Tapping a field mid-login can trigger the keyboard and reflow the layout unexpectedly.

**Fix:** Set `editable={!authState.loading}` on all `InputField` components during the loading state.

---

## POLISH — No "Back to sign in" escape from AuthActionScreen error

**File:** `src/screens/AuthActionScreen/index.tsx`

The error state (`ErrorState` component) has no explicit navigation link. Users who land on an expired or invalid link must use the device back button — not obvious to young users, especially on Android with gesture navigation.

**Fix:** Add a "Back to sign in" button to `ErrorState` that calls `router.replace('/(auth)/sign-in')`.

---

## POLISH — Mode switch clears password silently

**File:** `src/screens/AuthScreen/index.tsx:56–59`

```ts
useEffect(() => {
  setAuthState(prev => ({ ...prev, error: '' }))
  setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
}, [authState.mode])
```

When the user toggles login ↔ register, password fields clear but there's no visual flash or animation to signal the wipe. A student who typed a password, toggled, and toggled back will be confused about why the field is empty.

**Fix:** Low priority — a brief field highlight or transition on mode change would clarify intent.

---

## POLISH — scrollToEnd uses a fixed 100ms timeout

**File:** `src/screens/OnboardingScreen/OnboardingBody/index.tsx:33–36`

```ts
const handleScrollToBottom = () => {
  setTimeout(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, 100)
}
```

Fixed `setTimeout` is fragile — on slower devices the layout may not have updated in 100ms. This is called when the instrument picker expands.

**Fix:** Use a layout callback or `InteractionManager.runAfterInteractions` to scroll after layout completes.

---

## What's Good

- **Error display** in `AuthForm` is solid — icon + coloured text, separate success/error states for password reset feedback
- **Mode toggle UX** — clearing form data on switch is the right call; prevents stale confirmation password bleeding into login
- **"Forgot password?" guard** — correctly gates on `formData.email` being non-empty, with a clear fallback message
- **Loading state** — button label changes ("Signing in…", "Creating your account…") are clear and appropriate for a young user
- **Keyboard handling** — `returnKeyType` chains (email → password → confirm → submit) are correctly wired throughout register flow
- **Eye toggle** — password/confirm-password visibility toggles are independent, which is the right UX

---

## Priority Order

| # | Issue | File | Severity |
|---|---|---|---|
| 1 | Silent catch in onboarding completion | `OnboardingBody/index.tsx:74` | BLOCKER |
| 2 | Error card never renders for handler errors | `AuthActionScreen/index.tsx:94,165` | BLOCKER |
| 3 | No email verification acknowledgment | `OnboardingBody/index.tsx:66` | BLOCKER |
| 4 | Gender pre-selected as Male | `OnboardingBody/index.tsx:27` | FRICTION |
| 5 | Forgot password requires email with no hint | `AuthForm/index.tsx:150` | FRICTION |
| 6 | No real-time password validation | `AuthForm/index.tsx:62` | FRICTION |
| 7 | Fields editable during loading | `AuthForm/index.tsx:299` | FRICTION |
| 8 | No escape from AuthAction error state | `AuthActionScreen/index.tsx` | POLISH |
| 9 | Mode-switch password clear is silent | `AuthScreen/index.tsx:56` | POLISH |
| 10 | scrollToEnd uses fixed setTimeout | `OnboardingBody/index.tsx:33` | POLISH |
