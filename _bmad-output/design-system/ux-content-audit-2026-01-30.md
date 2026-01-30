# UX Content & Microcopy Audit

**Date:** 2026-01-30
**App:** Tonalè - Music Theory Learning Platform
**Auditor:** Sally (UX Designer)

---

## Executive Summary

This audit reviews all user-facing text across Tonalè to identify content that is too verbose, complex, unclear, or inconsistent. The goal is to ensure all microcopy follows UX writing best practices: **clear, concise, conversational, and contextual**.

### Overall Assessment

**Score: 7/10** - Good foundation, but several areas need simplification and consistency improvements.

**Key Findings:**
- ✅ Button labels are mostly clear and action-oriented
- ⚠️ Error messages are too technical in some places
- ⚠️ Descriptions lack context (missing "why")
- ⚠️ Some confirmation dialogs are too wordy
- ⚠️ Inconsistent tone (formal vs casual)

---

## Content Issues by Screen

### 🔴 CRITICAL ISSUES (Fix Immediately)

#### 1. **Account Deletion Warning** ❌
**Location:** Settings → Account → Delete Account
**Current Text:**
```
"Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
```

**Issues:**
- Too wordy (26 words)
- Redundant ("cannot be undone" + "permanently")
- No emotional cushioning for destructive action

**Recommended Fix:**
```
"Delete your account permanently? You'll lose all progress and data. This can't be undone."
```
*Reduced to 16 words, clearer consequences*

---

#### 2. **Final Test Failure Message** ❌
**Location:** Lesson Screen (Final Test Failed Modal)
**Current Text:**
```
"Sorry, you've reached the maximum number of wrong answers. Don't worry, practice makes perfect! Review the lessons and try again."
```

**Issues:**
- "Maximum number of wrong answers" is vague (what number?)
- Mixed messages: "Sorry" then "Don't worry"
- Too long (21 words)

**Recommended Fix:**
```
"You got 3 questions wrong—that's the limit for this test. Review the lesson and try again when you're ready!"
```
*Clear number, encouraging, 21 → 19 words but more specific*

---

#### 3. **"All Done" Completion Text** ⚠️
**Location:** Home Screen → Revision Card
**Current Text:**
```
"All Done!\nYou've cleared all your revision questions!"
```

**Issues:**
- "All Done!" and "cleared" sound like game language (not educational)
- "You've cleared" is odd phrasing for studying

**Recommended Fix:**
```
"Great work! No revision questions right now."
```
*Professional yet encouraging, 7 words vs 9*

---

### 🟡 HIGH PRIORITY (Fix This Sprint)

#### 4. **"Continue Lesson" Button** ⚠️
**Location:** Home Screen → Lesson Card
**Current Text:** `"Continue Lesson"`

**Issues:**
- Ambiguous: "Continue" suggests resuming mid-lesson, but this button appears even for new lessons
- Doesn't differentiate between "start new" vs "resume"

**Recommended Fix:**
- If lesson has 0 stars: `"Start Lesson"`
- If lesson has 1-2 stars: `"Try Again"`
- If lesson is new/unlocked: `"Start Lesson"`

---

#### 5. **Onboarding Value Proposition** ❌
**Location:** Onboarding Screen (before data collection)
**Current Text:** *None! Goes straight to gender selection*

**Issues:**
- No explanation of WHY user should provide info
- Missing trust-building statement

**Recommended Fix:** Add intro screen:
```
Title: "Let's personalise your journey"
Body: "Tell us a bit about yourself so we can create the perfect learning experience for you."
```

---

#### 6. **Settings Screen Labels** ⚠️
**Location:** Settings → Account
**Current Labels:**
- "Change Password" (action verb)
- vs. showing actual data for other fields (name, email, instrument)

**Issues:**
- Inconsistent pattern: some show data, one shows action
- "Change Password" should show "••••••••" for consistency

**Recommended Fix:**
```
Display: "••••••••"
(User taps to change, maintains consistency)
```

---

#### 7. **Auth Screen Subtitles** ⚠️
**Location:** Login/Register Screen
**Current Text:**
- Login: "Welcome back to your musical journey"
- Register: "Begin your musical journey today"

**Issues:**
- "Musical journey" is too flowery/marketing-speak
- Doesn't match app's practical, education-focused tone elsewhere

**Recommended Fix:**
- Login: "Sign in to continue learning"
- Register: "Create your account to get started"

---

#### 8. **Warning Modal Default Text** ⚠️
**Location:** Theory Screen (Final Test Warning)
**Current Text:**
```
"Some lessons don't have any stars yet. Are you sure you want to continue?"
```

**Issues:**
- Doesn't explain WHY this matters (stakes unclear)
- "Some lessons don't have any stars" is vague

**Recommended Fix:**
```
"You haven't completed all lessons with 3 stars yet. Final tests require mastery. Continue anyway?"
```
*Clear stakes, explains why it matters*

---

### 🟢 MEDIUM PRIORITY (Fix Next Sprint)

#### 9. **Star Rating Descriptions** ⚠️
**Location:** Lesson Complete Modal
**Current Text:**
```
3 stars: "Amazing! You got 87% correct!"
2 stars: "Well done! You got 65% correct!"
1 star:  "Good work! You got 45% correct!"
0 stars: "You got 25% correct. Practice makes perfect!"
```

**Issues:**
- "Amazing" / "Well done" / "Good work" don't provide learning value
- User already knows their % from seeing results
- 0 stars uses cliché phrase "practice makes perfect"

**Recommended Fix:**
```
3 stars: "Excellent! You've mastered this lesson."
2 stars: "Good job! Review mistakes to earn 3 stars."
1 star:  "Not quite there. Try again to improve your score."
0 stars: "Keep practicing. Review the questions you missed."
```
*Actionable, educational, not just praise*

---

#### 10. **Email Placeholder** ⚠️
**Location:** Auth Screen
**Current:** `"Email"`

**Issues:**
- Too generic, could show format example

**Recommended Fix:**
```
"your@email.com"
```
*Clearer expected format*

---

#### 11. **Password Requirements** ⚠️
**Location:** Auth Screen (Register mode)
**Current Text:**
```
"Password must be at least 6 characters"
```

**Issues:**
- Shows only AFTER register mode selected (not proactive)
- Doesn't mention if special chars/numbers needed

**Recommended Fix:**
```
"At least 6 characters" (appears immediately when typing)
```
*Real-time validation feedback*

---

#### 12. **Guest Login Button** ⚠️
**Location:** Auth Screen
**Current Text:** `"Continue as Guest"`

**Issues:**
- Doesn't explain what you LOSE as guest (e.g., progress not saved across devices)

**Recommended Fix:**
```
Button: "Continue as Guest"
Subtext: "Progress saved on this device only"
```

---

#### 13. **Lesson Complete: "Continue" Button** ⚠️
**Location:** Star Rating Modal
**Current:** `"Continue"`

**Issues:**
- Vague - continue to WHERE?

**Recommended Fix:**
```
"Back to Lessons" (if from Theory screen)
"Back to Home" (if from home screen)
```
*Destination-specific*

---

### 🔵 LOW PRIORITY (Nice to Have)

#### 14. **Strike Bar (Streak Display)** ℹ️
**Location:** Home Screen
**Current:** Shows flame icons with day numbers

**Issues:**
- No label explaining what it is
- New users won't know what the flames mean

**Recommended Fix:**
Add small label above: `"Practice Streak"`

---

#### 15. **"Next stage still in progress..."** ℹ️
**Location:** Theory Screen (when all stages complete)
**Current Text:**
```
"Next stage still in progress..."
```

**Issues:**
- Sounds apologetic/unprofessional
- Doesn't celebrate completion

**Recommended Fix:**
```
"You've completed all available stages! New content coming soon."
```

---

#### 16. **"Sorry, no lesson found here"** ℹ️
**Location:** Home Screen → Lesson Card (error state)
**Current Text:**
```
"Sorry, no lesson found here"
```

**Issues:**
- "Sorry" is too casual for error
- Doesn't explain what user should do

**Recommended Fix:**
```
"No lessons available. Check your connection and try again."
```

---

#### 17. **Lesson Title: "All Lessons Completed"** ℹ️
**Location:** Home Screen → Lesson Card (all complete)
**Current Text:**
```
Title: "All Lessons Completed"
Description: "You have completed all lesson"
```

**Issues:**
- Grammar error: "all lesson" → should be "all lessons"
- Not celebratory enough

**Recommended Fix:**
```
Title: "All Lessons Completed! 🎉"
Description: "Amazing work! You've finished everything."
```

---

## Grammar & Consistency Issues

### Inconsistent Capitalization

| Location | Current | Should Be |
|----------|---------|-----------|
| Star modal | "Keep practicing! 💪" | Consistent emoji use |
| Auth form error | "Email and password are required" | Title Case buttons? |

### Punctuation Patterns

**Issue:** Inconsistent use of periods and exclamation marks
- Some buttons have no punctuation
- Some modals end with periods, others don't
- Star messages use emojis inconsistently

**Recommendation:** Create punctuation rules:
1. Buttons: No punctuation
2. Titles: No punctuation unless question
3. Body text: Always use periods
4. Celebratory messages: Exclamation + emoji optional

---

## Tone Analysis

### Current Tone Spectrum

```
Too Formal ←───────────── Sweet Spot ───────────→ Too Casual

"This action cannot     "You'll lose all      "Oops! No lessons
be undone and all       progress and data.    found here lol"
your data will be       This can't be
permanently deleted"    undone."
```

**Finding:** App currently swings between overly formal (settings) and overly casual (error states).

**Target Tone:**
- **Encouraging but professional**
- Think: Friendly teacher, not chatbot
- Use contractions ("you'll" not "you will")
- Avoid: "lol", "oops", excessive emojis
- Prefer: Clear, direct, supportive language

---

## Voice & Style Recommendations

### Writing Principles for Tonalè

1. **Be Clear Over Clever**
   - ❌ "Musical journey"
   - ✅ "Learning music theory"

2. **Show, Don't Just Tell**
   - ❌ "Great job!"
   - ✅ "You've mastered this lesson"

3. **Give Actionable Guidance**
   - ❌ "Keep practicing!"
   - ✅ "Review the questions you missed"

4. **Respect User Time**
   - ❌ "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
   - ✅ "Delete your account permanently? You'll lose all progress and data. This can't be undone."

5. **Be Consistent**
   - Use same pattern for similar actions
   - "Start Lesson" / "Start Revision" / "Start Test" (not "Begin" / "Continue" / "Take")

---

## Implementation Priority

### Sprint 1 (Must Fix - 3 hours)
1. ✅ Fix "All Lessons Completed" grammar error
2. ✅ Rewrite account deletion warning (reduce 26 → 16 words)
3. ✅ Add specific number to final test failure (show "3 wrong answers")
4. ✅ Change "Continue Lesson" to dynamic button text

### Sprint 2 (High Value - 5 hours)
5. ✅ Rewrite star rating descriptions (make actionable)
6. ✅ Add onboarding intro screen with value prop
7. ✅ Fix auth screen subtitles (remove "musical journey")
8. ✅ Add context to warning modal (explain stakes)

### Sprint 3 (Polish - 2 hours)
9. ✅ Add "Practice Streak" label
10. ✅ Rewrite "next stage in progress" message
11. ✅ Fix guest login subtext
12. ✅ Update star modal button text to be specific

---

## Style Guide Reference

### Word Choice Patterns

| Avoid | Use Instead |
|-------|-------------|
| "Musical journey" | "Learning path" / "Progress" |
| "Keep practicing!" | "Review [specific thing]" |
| "Oops" / "Uh-oh" | "Something went wrong" |
| "Amazing!" (alone) | "You've mastered this" |
| "Continue" (vague) | "Back to Lessons" / "Start Lesson" |

### Button Text Formula

```
[Action Verb] + [Specific Object]

Examples:
✅ "Start Lesson"
✅ "Retry Test"
✅ "Save Changes"
✅ "Delete Account"

Avoid:
❌ "Continue" (where?)
❌ "OK" (doesn't indicate action)
❌ "Submit" (generic)
```

---

## Testing Recommendations

### Before Launch Checklist

- [ ] Run spell-check on all text strings
- [ ] Test all error messages actually appear correctly
- [ ] Verify tone consistency across all screens
- [ ] Check grammar in all modals
- [ ] Ensure button text matches destination
- [ ] Confirm all placeholders show expected format
- [ ] Test truncation on small screens (does text cut off?)

### Post-Launch Monitoring

- Track support tickets mentioning "confusing" or "unclear"
- A/B test button labels if conversion drops
- Survey users about clarity of instructions

---

## Quick Wins (10 Minutes Each)

These can be fixed immediately with minimal risk:

1. **Grammar fix:** "all lesson" → "all lessons" (LessonCard/index.tsx:47)
2. **Consistency:** Show "••••••••" for password field in settings
3. **Clarity:** Add "(saved on device only)" to guest login button
4. **Professionalism:** Remove "Sorry" from error messages
5. **Capitalization:** Standardize "Email" vs "email" in form labels

---

## Resources for Writers

### Internal Documents
- [Design Principles](./_bmad-output/design-system/README.md#-design-principles)
- [UX Audit Report](./ux-audit-report-2026-01-30.md)

### External References
- [Material Design Writing Guidelines](https://m3.material.io/foundations/content-design/overview)
- [Nielsen Norman Group: UX Writing](https://www.nngroup.com/articles/ux-writing-study-guide/)
- [Mailchimp Content Style Guide](https://styleguide.mailchimp.com/)

---

## Appendix: Text Inventory

### All User-Facing Strings by Category

#### Authentication
- [x] "Email" (placeholder)
- [x] "Password" (placeholder)
- [x] "Confirm Password" (placeholder)
- [x] "Sign In" (button)
- [x] "Create Account" (button)
- [x] "Continue as Guest" (button)
- [x] "Welcome back to your musical journey" (subtitle)
- [x] "Begin your musical journey today" (subtitle)
- [x] "Password must be at least 6 characters" (requirement)

#### Home Screen
- [x] "Hello, [name] 👋" (greeting)
- [x] "Continue Lesson" (button)
- [x] "All Lessons Completed" (status)
- [x] "You have completed all lesson" (description) ⚠️ Grammar error
- [x] "Sorry, no lesson found here" (error)
- [x] "You've got X questions to revise!" (revision card)
- [x] "Start Revision!" (button)
- [x] "All Done!\nYou've cleared all your revision questions!" (completion)

#### Theory Screen
- [x] "Next stage still in progress..." (message)
- [x] Stage names (from curriculum data)
- [x] Lesson titles (from curriculum data)

#### Lesson Screen
- [x] Question text (generated)
- [x] Answer choices (generated)
- [x] Progress indicator (implicit)

#### Modals
- [x] "Perfect! 🌟" (3 stars)
- [x] "Great job! ⭐" (2 stars)
- [x] "Good effort! 👍" (1 star)
- [x] "Keep practicing! 💪" (0 stars)
- [x] "Amazing! You got X% correct!" (description)
- [x] "Retry" (button)
- [x] "Continue" (button)
- [x] "Test Failed" (final test failure)
- [x] "Sorry, you've reached the maximum number of wrong answers..." (failure description)
- [x] "Retry Test" (button)
- [x] "Exit" (button)

#### Settings
- [x] "Account" (label)
- [x] "Log Out" (button)
- [x] "Logging out..." (loading state)
- [x] "Change Password" (label)
- [x] "Delete Account" (label)
- [x] "Are you sure you want to delete your account?..." (confirmation)

#### Errors
- [x] "Email and password are required" (validation)
- [x] "Passwords do not match" (validation)
- [x] "Password must be at least 6 characters" (validation)
- [x] "Failed to log out. Please try again." (error)
- [x] "Failed to delete account. Please try again." (error)

---

**Last Updated:** 2026-01-30
**Next Review:** After implementing Sprint 1 fixes
**Document Owner:** Sally (UX Designer)
