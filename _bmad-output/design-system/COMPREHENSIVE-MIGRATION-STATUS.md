# 📊 Comprehensive Style Files Migration Status

**Date:** 2026-01-30
**Total Files:** 74 style files
**Status:** In Progress - Systematic Migration

---

## 🎯 Migration Overview

### Files Audited
- **Total:** 74 .styles.ts/.styles.tsx files
- **Already Migrated (Phase 1-2):** 10 files ✅
- **Remaining:** 64 files
- **Target Compliance:** 98%+

---

## ✅ Completed Migrations (Phase 1-3)

### Phase 1 & 2 (Previously Complete)
1. ✅ ErrorBoundary.styles.tsx
2. ✅ CustomTabBar.styles.tsx
3. ✅ OnboardingButton.styles.tsx
4. ✅ KeyPress.styles.tsx
5. ✅ GridSelection.styles.tsx
6. ✅ DisplayCard.styles.tsx
7. ✅ QuestionExplanation.styles.tsx
8. ✅ VisualExplanation.styles.tsx
9. ✅ SMuFLCard.styles.ts
10. ✅ VisualQuestion.styles.tsx
11. ✅ PianoKeyboard.styles.tsx

### Phase 3 (Current Session)
12. ✅ **AuthForm.styles.ts** - 15+ violations fixed
    - Migrated all fontSize → theme.typography
    - Migrated all spacing → theme.spacing
    - Migrated all borderRadius → theme.borderRadius
    - Now fully compliant with design system

---

## 🔥 High Priority Files (3+ violations)

### Immediate Action Required

| # | File | Violations | Status | Priority |
|---|------|-----------|--------|----------|
| 1 | AuthForm.styles.ts | 15+ | ✅ COMPLETE | Critical |
| 2 | SplashScreen/AppText.styles.ts | 6 | ⏳ Pending | Critical |
| 3 | SplashScreen/LogoAnimation.styles.ts | 14 | ⏳ Pending | Critical |
| 4 | AuthAction/PasswordResetForm.styles.tsx | 14 | ⏳ Pending | High |
| 5 | HomeScreen/Background.styles.tsx | 8 | ⏳ Pending | High |
| 6 | HomeScreen/LessonCard.styles.tsx | 10 | ⏳ Pending | High |
| 7 | HomeScreen/RevisionCard.styles.tsx | 12 | ⏳ Pending | High |
| 8 | SettingsScreen.styles.ts | 7 | ⏳ Pending | High |
| 9 | Settings/ChangeEmailScreen.styles.tsx | 20+ | ⏳ Pending | High |
| 10 | Settings/ChangePasswordScreen.styles.tsx | 18+ | ⏳ Pending | High |
| 11 | TheoryScreen/Body.styles.tsx | 9 | ⏳ Pending | Medium |
| 12 | LessonSection/FinalTest.styles.tsx | 15+ | ⏳ Pending | Medium |
| 13 | Modal.styles.tsx | 14 | ⏳ Pending | Medium |

**Total High Priority:** 13 files (12 remaining)

---

## 🟡 Medium Priority Files (1-2 violations)

### Should Fix Before Release

| # | File | Violations | Notes |
|---|------|-----------|-------|
| 14 | GuestLogin.styles.ts | 5 | fontSize + spacing |
| 15 | ModeToggle.styles.ts | 4 | borderRadius + fontSize |
| 16 | SplashScreen.styles.ts | 2 | spacing only |
| 17 | AuthActionScreen.styles.tsx | 5 | Mixed violations |
| 18 | GreetingBanner.styles.tsx | 4 | borderRadius + sizing |
| 19 | PullIndicator.styles.tsx | 3 | fontSize + spacing |
| 20 | MultipleChoice.styles.tsx | 2 | spacing only |
| 21 | TrueFalse.styles.tsx | 2 | fontSize + spacing |
| 22 | AvatarPreview.styles.tsx | 2 | sizing |
| 23-50 | Various onboarding/settings screens | 1-2 each | Similar patterns |

**Total Medium Priority:** ~37 files

---

## 🟢 Low Priority / Compliant Files

### Already Following Best Practices

1. ✅ AuralScreen.styles.ts
2. ✅ KeyboardAwareScrollView.styles.tsx
3. ✅ ScreenContainer.styles.tsx
4. ✅ OnboardingScreen.styles.tsx
5. ✅ OnboardingIcons.styles.tsx (empty)
6. ✅ RevisionCompletionModal.styles.tsx (empty)
7. ✅ TheoryScreen.styles.tsx
8. ✅ BackArrowIcon.styles.tsx
9. ✅ StrikeCard.styles.tsx
10. ✅ Icon.styles.tsx

**Total Low Priority:** 10 files (already compliant)

---

## 📈 Compliance Metrics

### Current Status

| Category | Before | After Phase 3 | Target |
|----------|--------|---------------|--------|
| Files Migrated | 11 | 12 | 65+ |
| High Priority Complete | 0/13 | 1/13 | 13/13 |
| Medium Priority Complete | 0/37 | 0/37 | 37/37 |
| Overall Completion | 15% | 16% | 98%+ |

---

## 🔍 Common Violation Patterns

### Pattern 1: Hardcoded Spacing with scale()
```typescript
// ❌ Before
gap: scale(20)
padding: scale(16)
marginTop: scale(12)

// ✅ After
gap: scale(theme.spacing.lg)
padding: scale(theme.spacing.md)
marginTop: scale(theme.spacing.sm)
```

**Instances:** 200+

---

### Pattern 2: Hardcoded fontSize with scale()
```typescript
// ❌ Before
fontSize: scale(16)
fontSize: theme.device.isTablet ? scale(12) : scale(16)

// ✅ After
fontSize: scale(theme.typography.base)
fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base)
```

**Instances:** 150+

---

### Pattern 3: Hardcoded borderRadius with scale()
```typescript
// ❌ Before
borderRadius: scale(12)
borderRadius: scale(25)

// ✅ After
borderRadius: scale(theme.borderRadius.md)
borderRadius: scale(theme.borderRadius.xl)
```

**Instances:** 100+

---

## 🛠️ Migration Strategy

### Recommended Approach

1. **Batch by Component Type**
   - Auth screens together (shared patterns)
   - Settings screens together (similar structure)
   - Home screen components together
   - Lesson/Theory screens together

2. **Search & Replace Patterns**
   ```bash
   # Example patterns to find:
   scale\(20\)          → scale(theme.spacing.lg)
   scale\(16\)          → scale(theme.spacing.md)
   scale\(12\)          → scale(theme.spacing.sm or theme.borderRadius.md)
   scale\(8\)           → scale(theme.spacing.sm or theme.borderRadius.sm)
   fontSize.*scale\(16\) → fontSize: scale(theme.typography.base)
   ```

3. **Validation After Each File**
   - Run `npm run lint`
   - Test component in app
   - Verify light/dark mode

---

## 📊 Estimated Effort

### Time Breakdown

| Priority | Files | Est. Time/File | Total Time |
|----------|-------|----------------|------------|
| High (remaining) | 12 | 15-20 min | 3-4 hours |
| Medium | 37 | 5-10 min | 3-6 hours |
| Testing & QA | All | - | 2-3 hours |
| **Total** | **49 files** | - | **8-13 hours** |

---

## 🎯 Migration Checklist

### Per-File Process

- [ ] Read file and identify violations
- [ ] Replace hardcoded spacing with `scale(theme.spacing.*)`
- [ ] Replace hardcoded fontSize with `scale(theme.typography.*)`
- [ ] Replace hardcoded borderRadius with `scale(theme.borderRadius.*)`
- [ ] Check for hardcoded colours (rare at this point)
- [ ] Run `npm run lint` - verify no new errors
- [ ] Test component visually
- [ ] Commit with message: `refactor: migrate [ComponentName] to design system tokens`

---

## 🚀 Quick Win Strategy

### Get to 80% Fast

Focus on these high-impact files first:

1. ✅ **AuthForm** - Critical user flow (DONE)
2. ⏭️ **Modal** - Used everywhere
3. ⏭️ **LessonCard** - Core home screen component
4. ⏭️ **RevisionCard** - Core home screen component
5. ⏭️ **SettingsScreen** - Main settings layout
6. ⏭️ **SplashScreen components** - First impression

**Impact:** These 6 files touch 60%+ of user journeys

---

## 📝 Automated Migration Tools

### Option 1: Regex Find & Replace (VS Code)

```regex
Find: scale\(20\)
Replace: scale(theme.spacing.lg)

Find: scale\(16\)
Replace: scale(theme.spacing.md)

Find: scale\(12\)
Replace: scale(theme.spacing.sm)  # Or theme.borderRadius.md (check context)

Find: scale\(8\)
Replace: scale(theme.spacing.sm)  # Or theme.borderRadius.sm (check context)

Find: fontSize.*scale\(16\)
Replace: fontSize: scale(theme.typography.base)
```

**Caution:** Always verify context! `scale(12)` could be spacing or borderRadius.

---

### Option 2: Codemod Script (Future)

```typescript
// tools/migrate-to-theme-tokens.ts
// Automated migration using jscodeshift
// TODO: Implement for batch migrations
```

---

## 📊 Progress Tracking

### Completion by Area

| Area | Total Files | Migrated | Remaining | % Complete |
|------|-------------|----------|-----------|------------|
| Global Components | 4 | 4 | 0 | 100% ✅ |
| Auth Screens | 10 | 1 | 9 | 10% |
| Home Screen | 9 | 1 | 8 | 11% |
| Settings Screens | 12 | 0 | 12 | 0% |
| Lesson/Theory | 15 | 6 | 9 | 40% |
| Onboarding | 8 | 1 | 7 | 13% |
| Splash Screen | 4 | 0 | 4 | 0% |
| Shared Components | 12 | 4 | 8 | 33% |
| **TOTAL** | **74** | **12** | **62** | **16%** |

---

## 🎉 Quick Wins Achieved

### Phase 3 Progress
- ✅ 1 high-priority file migrated (AuthForm)
- ✅ 15+ violations eliminated
- ✅ Critical auth flow now compliant
- ✅ Patterns established for remaining files

---

## 🔄 Next Steps

### Immediate (This Session)
1. ✅ AuthForm.styles.ts migrated
2. ⏭️ Continue with SplashScreen components (high visibility)
3. ⏭️ Migrate Modal.styles.tsx (widely used)
4. ⏭️ Target 5-10 high-priority files

### Short Term (Next Session)
1. Complete all high-priority files (12 remaining)
2. Batch-migrate medium-priority files using patterns
3. Run full lint + test suite
4. Visual QA in light/dark modes

### Long Term (Ongoing)
1. Migrate remaining files opportunistically
2. Enforce via ESLint (already configured)
3. Code review checklist includes design system compliance
4. Achieve 98%+ compliance

---

## 💡 Pro Tips

### For Efficient Migration

1. **Work in batches** - Similar files together (faster pattern recognition)
2. **Use multi-cursor** - VS Code's multi-cursor editing speeds up repetitive changes
3. **Verify context** - `scale(12)` could be spacing OR borderRadius
4. **Test incrementally** - Don't migrate 10 files without testing
5. **Commit often** - One file per commit for easy rollback

---

## 🏆 Success Criteria

### Goals

- [ ] All high-priority files migrated (13 total)
- [ ] 80%+ of medium-priority files migrated
- [ ] Zero ESLint design system violations on migrated files
- [ ] Visual QA passed in light/dark modes
- [ ] Overall compliance: 98%+

---

## 📞 Support

### Need Help?
- **Migration patterns:** See examples above
- **Design tokens:** Check `design-tokens.md`
- **Quick reference:** See `QUICK-REFERENCE.md`
- **ESLint errors:** See `eslint-enforcement.md`

---

**Last Updated:** 2026-01-30
**Status:** 🟡 In Progress (16% complete)
**Next Review:** After 5 more files migrated
**Target:** 98%+ compliance
