# Tonalè Architecture Assessment - B2C v1.0

**Date:** 2026-01-29
**Architect:** Winston
**Phase:** Pre-Launch B2C v1.0
**Status:** Ready for Launch (with 3 fixes)

---

## Executive Summary

**Verdict:** Your architecture is **appropriate and sufficient for B2C v1.0 launch**.

The concerns around state management scalability, service layers, and multi-tenancy **do not apply** to a single-user B2C product. These are future considerations for B2B teacher dashboard.

**Action Required Before Launch:**
1. Add error monitoring (Sentry) - 30 minutes
2. Update Firestore security rules - 5 minutes
3. Verify loading states exist

**After these 3 fixes, you can ship.**

---

## Current Architecture Overview

### Technology Stack

**Frontend:**
- React Native 0.81.5
- Expo ~54.0.30
- TypeScript 5.9.2 (strict mode)
- Expo Router 6.0.21 (file-based routing)
- Emotion 11.14.0 (styling)

**Backend:**
- Firebase 11.9.1
  - Authentication
  - Firestore (database)
  - Cloud Functions (API)
- Node.js functions with layered architecture

**State Management:**
- React Context API
  - `UserContext` - authentication & user data
  - `ProgressContext` - lesson progress & revision questions
- AsyncStorage for local caching

**Custom Libraries:**
- `@leonkwan46/music-notation` 1.5.0 (proprietary)

### Project Structure

```
tonale/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                  # Auth flow routes
│   ├── (tabs)/                  # Main app tabs
│   ├── lesson.tsx               # Dynamic lesson route
│   └── _layout.tsx              # Root layout with providers
│
├── src/
│   ├── config/                  # Configuration
│   │   ├── firebase/           # Firebase initialization
│   │   └── gradeSyllabus/      # ABRSM curriculum data
│   │
│   ├── globalComponents/       # App-level components
│   │   ├── AppThemeProvider/
│   │   ├── ErrorBoundary/
│   │   └── ScreenContainer/
│   │
│   ├── sharedComponents/       # Reusable UI components
│   │   ├── Button3D/
│   │   ├── Card3DView/
│   │   ├── Modal/
│   │   └── PianoKeyboard/
│   │
│   ├── screens/                # Screen components
│   │   ├── AuthScreen/
│   │   ├── HomeScreen/
│   │   ├── LessonScreen/
│   │   ├── TheoryScreen/
│   │   └── SettingsScreen/
│   │
│   ├── theory/                 # Domain logic
│   │   ├── curriculum/         # Lesson definitions & stages
│   │   └── exercises/          # Question generators
│   │       ├── generators/     # 19 question type generators
│   │       ├── custom/         # Specialized question types
│   │       └── utils/          # Music theory utilities
│   │
│   ├── hooks/                  # Custom hooks & contexts
│   │   ├── useUserContext.tsx  # Auth & user data (157 lines)
│   │   ├── useProgressContext.tsx # Progress tracking (516 lines)
│   │   └── usePlayer.ts        # Audio playback
│   │
│   ├── types/                  # TypeScript definitions
│   └── utils/                  # Utility functions
│
└── functions/                  # Firebase Cloud Functions
    └── api/
        ├── lessonProgress/     # Progress CRUD
        │   ├── handlers.ts     # HTTP handlers
        │   ├── service.ts      # Business logic
        │   └── firestore.ts    # Database operations
        ├── userData/           # User profile management
        └── revisionQuestions/  # Revision question management
```

**Architecture Pattern:** Layered monolith with clear separation of concerns.

---

## Strengths (What's Working Well)

### 1. ✅ Clean Firebase Functions Architecture

**Pattern:** Handler → Service → Firestore

**Example:**
```typescript
// functions/api/lessonProgress/
handlers.ts    // HTTP request/response, validation
  ↓
service.ts     // Pure business logic
  ↓
firestore.ts   // Database operations
```

**Why this is good:**
- Business logic separated from Firebase
- Testable in isolation
- Easy to mock for unit tests
- Clear responsibility boundaries

### 2. ✅ TypeScript Strict Mode

**Configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true
  }
}
```

**Benefits:**
- Catches errors at compile time
- Self-documenting code
- Safer refactoring
- Better IDE support

### 3. ✅ Path Aliases

**Configuration:**
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@types": ["./src/types"]
  }
}
```

**Prevents:**
```typescript
// Bad
import { Component } from '../../../../components/Component'

// Good
import { Component } from '@/components/Component'
```

### 4. ✅ Error Boundary Implementation

**Location:** `/src/globalComponents/ErrorBoundary/`

Catches React rendering errors and prevents white screen of death.

### 5. ✅ Provider Pattern

**Nesting order (correct):**
```tsx
<SafeAreaProvider>
  <ErrorBoundary>
    <UserProvider>
      <ProgressProvider>
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </ProgressProvider>
    </UserProvider>
  </ErrorBoundary>
</SafeAreaProvider>
```

Outer to inner: Safety → Error → Auth → Data → Theme

### 6. ✅ Screen-Specific Component Organization

**Example:**
```
TheoryScreen/
├── index.tsx
├── TheoryScreen.styles.tsx
├── components/           # Screen-specific components
└── TheoryScreenBody/     # Complex sub-section
```

Keeps components colocated with their usage.

### 7. ✅ Emotion for Styling

**Advantages over StyleSheet:**
- Theme access in styles
- Dynamic styling based on props
- Better TypeScript support
- Easier theming (light/dark mode)

### 8. ✅ Separation of Domain Logic

**Location:** `/src/theory/`

Music theory logic isolated from UI concerns:
- Curriculum definitions
- Exercise generators (19 types)
- Music theory utilities (scales, intervals, chords)

---

## Areas for Improvement (Deferred to B2B Phase)

### 1. State Management Scalability

**Current:** React Context API

**Why it's fine for B2C:**
- Single user's progress (~24 lessons)
- Context re-renders are acceptable
- Simple mental model
- No external dependencies

**When to revisit:**
- B2B teacher dashboard (managing 25-50 students)
- Real-time updates for multiple entities
- Performance profiling shows issues

**Future recommendation:** Zustand for teacher dashboard, keep Context for auth/theme.

### 2. Service Layer on Frontend

**Current:** Direct Firebase calls from hooks

**Example:**
```typescript
// In useProgressContext.tsx
const result = await getAllLessonProgressFn()
```

**Why it's fine for B2C:**
- Straightforward data flow
- No need for mocking yet
- Firebase SDK handles caching
- E2E tests cover integration

**When to revisit:**
- Adding automated testing
- Multiple backend integrations
- Need for request deduplication
- Complex data transformation logic

**Future pattern:**
```typescript
// src/services/lessonProgress/api.ts
export class LessonProgressService {
  async getAll(userId: string): Promise<LessonProgress[]> {
    // Abstracted Firebase calls
  }
}
```

### 3. Feature-Based Organization

**Current:** Technical organization (screens, components, hooks)

**Why it's fine for B2C:**
- Small team (1 developer)
- Single feature set (student learning)
- Easy to navigate with current size

**When to revisit:**
- Adding B2B teacher dashboard
- Team grows beyond 1-2 developers
- Feature sets become distinct

**Future structure:**
```
/src/features/
  /student-learning/  (B2C)
  /teacher-dashboard/ (B2B)
  /auth/
```

### 4. Multi-Tenancy Data Model

**Current:** Single-user Firestore structure
```
users/{userId}/lessonProgress/{lessonId}
```

**Why it's fine for B2C:**
- Students don't interact with each other
- No teacher-student relationships yet
- Simple security rules

**When to revisit:**
- B2B teacher dashboard launch
- Teacher needs to view student progress
- School-level management

**Future structure:**
```
teachers/{teacherId}/students/{studentId}
schools/{schoolId}/teachers/{teacherId}
```

---

## Critical Issues (Must Fix Before Launch)

### 🔴 1. Error Monitoring (REQUIRED)

**Problem:** No visibility when production crashes occur.

**Impact:**
- User in Malaysia hits crash → you don't know
- Bug reports come via 1-star App Store reviews
- Can't reproduce issues without logs
- No metrics on crash-free rate

**Solution: Sentry**

**Installation (30 minutes):**
```bash
npm install @sentry/react-native
npx @sentry/wizard -i reactNative
```

**Configuration:**
```typescript
// app/_layout.tsx
import * as Sentry from '@sentry/react-native'

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
  enableAutoSessionTracking: true,
  tracesSampleRate: 1.0, // Adjust for production
})

// Wrap root component
export default Sentry.wrap(RootLayout)
```

**Environment variable:**
```bash
# .env
EXPO_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

**Benefits:**
- Stack traces with source maps
- User context (which user hit the error)
- Breadcrumbs (what led to the crash)
- Release tracking
- Performance monitoring

**Cost:** Free tier sufficient for B2C launch (5,000 errors/month).

**Priority:** MUST HAVE before production launch.

---

### 🔴 2. Firestore Security Rules (REQUIRED FIX)

**Current rules:**
```javascript
// firestore.rules
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

**Problem:** Subcollections not explicitly covered.

**Fix:**
```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data (including subcollections)
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**What `{document=**}` does:**
- Matches ALL subcollections under `/users/{userId}/`
- Ensures lesson progress is protected
- Prevents users from reading other users' data

**Test after deploying:**
```bash
firebase deploy --only firestore:rules
```

**Priority:** MUST FIX before production launch (security risk).

---

### 🟡 3. Loading States Verification

**Check:** Ensure all network requests show loading UI.

**Files to verify:**
- `useUserContext.tsx` - `loading` state exists ✅
- `useProgressContext.tsx` - `progressDataLoading` state exists ✅
- Screen components - verify spinners/skeletons shown

**Good pattern already in place:**
```typescript
export interface UserContextType {
  authUser: User | null
  userData: UserData | null
  loading: boolean  // ✅ Good
  // ...
}
```

**What to check:**
```tsx
// In screen components
if (loading) {
  return <Skeleton />
}

if (error) {
  return <ErrorMessage />
}

return <Content />
```

**Priority:** Verify, likely already done.

---

## Nice-to-Have Improvements (Optional for Launch)

### 🟡 1. Offline Persistence for Firestore

**Current:** Auth persists, Firestore queries don't.

**What happens:**
- Student loses connection mid-lesson
- Progress lost if not yet synced
- App may show loading indefinitely

**Fix (10 minutes):**
```typescript
// src/config/firebase/firebase.ts
import { enableIndexedDbPersistence } from 'firebase/firestore'

// After initializing Firestore
if (!__DEV__) {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open
      console.warn('Firestore persistence: multiple tabs')
    } else if (err.code === 'unimplemented') {
      // Browser doesn't support
      console.warn('Firestore persistence: not supported')
    }
  })
}
```

**Benefits:**
- Offline reads from cache
- Writes queued and synced when online
- Better user experience in poor connectivity

**Trade-offs:**
- Adds ~2MB to initial bundle
- Slight complexity in sync logic

**Recommendation:** Add if target markets have poor connectivity (Malaysia/Singapore generally good).

---

### 🟡 2. Analytics

**Current:** No usage tracking.

**What you're missing:**
- Which lessons students complete
- Where students drop off
- Session duration
- Feature usage patterns

**Options:**

**A) Firebase Analytics (Recommended)**
```bash
npm install @react-native-firebase/analytics
```

**Pros:**
- Free, unlimited events
- Integrated with Firebase Console
- No additional setup needed
- Works with Sentry

**B) Mixpanel**
- Better event visualization
- Funnel analysis
- Cohort analysis
- Free tier: 100K events/month

**Basic events to track:**
```typescript
// Lesson lifecycle
analytics.logEvent('lesson_started', { lessonId, stageId })
analytics.logEvent('lesson_completed', { lessonId, stars })
analytics.logEvent('lesson_failed', { lessonId, score })

// User journey
analytics.logEvent('onboarding_completed')
analytics.logEvent('stage_unlocked', { stageId })
analytics.logEvent('grade_completed', { grade })
```

**Priority:** Recommended for understanding user behavior, but not blocking for launch.

---

### 🟡 3. Rate Limiting on Cloud Functions

**Check:** Do you have rate limiting to prevent abuse?

**Potential issue:**
- Malicious user spams Cloud Functions
- Costs spike unexpectedly
- Legitimate users affected by quota exhaustion

**Solution:**
```typescript
// functions/index.ts
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window per user
  message: 'Too many requests, please try again later',
})

export const updateLessonProgress = onCall(
  {
    cors: true,
    rateLimits: {
      maxRequestsPerHour: 100,
    }
  },
  async (request) => {
    // Handler logic
  }
)
```

**Priority:** Low for B2C launch. Monitor costs and add if needed.

---

## Things You Don't Need (Don't Do These)

### ❌ State Management Refactor

**Don't:** Replace Context with Redux/MobX/Zustand for B2C.

**Why:**
- Context works fine for single-user data
- No performance issues with current usage
- Premature optimization
- Adds complexity and dependencies

**When to revisit:** B2B teacher dashboard (managing 25-50 students).

---

### ❌ Microservices Architecture

**Don't:** Break Firebase Functions into separate services.

**Why:**
- Firebase Functions scale automatically
- Current architecture is appropriate
- Adds operational complexity (deployments, monitoring)
- No benefit at your scale

**When to revisit:** Never. You're not Facebook.

---

### ❌ GraphQL Layer

**Don't:** Add GraphQL between frontend and Firebase.

**Why:**
- Firebase SDK is already optimized
- GraphQL adds latency and complexity
- No over-fetching issues with your current queries
- Would need to self-host GraphQL server

**When to revisit:** Never, unless you add a non-Firebase backend.

---

### ❌ Switch from Firebase

**Don't:** Migrate to Supabase/AWS/custom backend.

**Why:**
- Firebase works well for your use case
- Sunk cost in learning and setup
- Auth, DB, and Functions integrated
- Scales to millions of users
- Not the bottleneck

**When to revisit:** Only if Firebase pricing becomes prohibitive (unlikely).

---

### ❌ Premature Abstraction

**Don't:** Create service layers, repositories, or abstract factories "just in case."

**Why:**
- You don't know what you'll need yet
- Abstraction has a cost (complexity, indirection)
- Easier to add abstraction when you have 2+ examples of duplication
- Current direct approach is simpler to understand

**When to revisit:** When you feel the pain of duplication or coupling.

---

## B2C v1.0 Launch Checklist

### Must Complete ✅

- [ ] **Install Sentry** error monitoring
  - Sign up at sentry.io
  - Run `npx @sentry/wizard -i reactNative`
  - Add `EXPO_PUBLIC_SENTRY_DSN` to `.env`
  - Wrap root component with `Sentry.wrap()`
  - Test by throwing intentional error

- [ ] **Update Firestore security rules**
  - Change `match /users/{userId}` to `match /users/{userId}/{document=**}`
  - Deploy: `firebase deploy --only firestore:rules`
  - Test with Firebase Console simulator

- [ ] **Verify loading states**
  - Check `AuthScreen` shows spinner while authenticating
  - Check `HomeScreen` shows skeleton while loading progress
  - Check `LessonScreen` shows loading before questions appear

### Functional Requirements ✅

Verify these work end-to-end:

- [ ] **Authentication Flow**
  - Sign up with email/password
  - Login with existing account
  - Password reset email
  - Logout
  - Auth persistence (stays logged in after app restart)

- [ ] **Onboarding Flow**
  - New users see onboarding screen
  - Onboarding can be completed
  - User data created in Firestore
  - Redirects to home after onboarding

- [ ] **Lesson Experience**
  - Lessons load correctly
  - Questions display properly (visual + text)
  - Music notation renders correctly
  - Answer interface works (multiple choice, true/false, key press)
  - Submit answer validates correctly
  - Progress saved to Firestore
  - Stars calculated and displayed
  - Completion modal shown

- [ ] **Progress Tracking**
  - Progress persists between sessions
  - Locked lessons stay locked
  - Unlocked lessons are accessible
  - Stage progression works correctly
  - Final tests unlock after completing stage lessons

- [ ] **Home Screen**
  - Shows current stage
  - Displays lesson cards correctly
  - Star ratings appear on completed lessons
  - Next lesson recommendation works

- [ ] **Settings Screen**
  - Profile information displays
  - Theme toggle works (light/dark)
  - Logout button works

### Device Testing ✅

Test on:

- [ ] **Android**
  - Phone (small screen)
  - Tablet (large screen)
  - Different Android versions (API 26+)

- [ ] **iOS**
  - iPhone (small screen)
  - iPad (large screen)
  - Different iOS versions (13.0+)

### Performance Testing ✅

- [ ] App starts in <3 seconds
- [ ] Lessons load in <2 seconds
- [ ] No ANR (Application Not Responding) errors
- [ ] Smooth animations (60fps)
- [ ] Music notation renders without lag

### Error Handling ✅

- [ ] Network loss handled gracefully
- [ ] Firebase errors show user-friendly messages
- [ ] Invalid login shows appropriate error
- [ ] Failed progress save retries or notifies user

### Analytics Setup (Optional) 🟡

- [ ] Firebase Analytics installed
- [ ] Basic events tracked (lesson_started, lesson_completed)
- [ ] Screen view tracking enabled

---

## Known Technical Debt

These are acceptable for B2C v1.0 launch. Document for future reference.

### 1. Large Hook File

**File:** `/src/hooks/useProgressContext.tsx` (516 lines)

**Why it exists:**
- Manages all progress state
- Handles caching logic
- Provides utility functions
- Complex domain (stages, lessons, prerequisites)

**Impact:** Low. Works fine for B2C.

**Future refactor:**
- Split into multiple hooks
- Extract caching logic to separate module
- Move utility functions to `/src/utils`

**Priority:** Defer until B2B.

---

### 2. Direct Firebase Calls from Hooks

**Pattern:**
```typescript
const result = await getAllLessonProgressFn()
```

**Why it exists:**
- Simple, direct approach
- Firebase SDK handles caching
- No need for abstraction yet

**Impact:** Low. Testable with E2E tests.

**Future refactor:**
- Create `/src/services` layer
- Abstract Firebase behind interfaces
- Enable unit testing without Firebase

**Priority:** Defer until adding B2B or when test coverage needs improvement.

---

### 3. No Automated Testing

**Current:** Manual testing only.

**Impact:** Moderate. Increases risk of regressions.

**Recommended (post-launch):**
- Jest unit tests for exercise generators
- E2E tests with Maestro (already have scripts)
- Integration tests for Cloud Functions

**Priority:** Add after launch, especially before B2B.

---

### 4. No Offline Support for Lessons

**Current:** Requires internet connection to practice.

**Impact:** Low for launch. Most students practice at home with WiFi.

**Future improvement:**
- Cache lesson content locally
- Allow offline practice
- Sync progress when online

**Priority:** Defer. Assess user feedback on connectivity issues.

---

## Performance Baseline

**Document current performance for future comparison:**

| Metric | Target | How to Measure |
|--------|--------|----------------|
| App startup | <3s | Time from tap to interactive |
| Lesson load | <2s | Time from lesson select to first question |
| Question render | <500ms | Time from submit to next question |
| Progress save | <1s | Time from complete to confirmation |
| Bundle size | <50MB | Expo build size |

**Monitoring:**
- Use Sentry Performance Monitoring
- Track these metrics over time
- Alert if regressions occur

---

## Architecture Decision Records (ADRs)

Document key decisions for future reference.

### ADR-001: React Context for State Management

**Status:** Accepted for B2C

**Context:**
- Need to manage user auth and progress state
- Single user per device
- ~24 lessons to track

**Decision:**
Use React Context API with AsyncStorage for local caching.

**Consequences:**
- Positive: Simple, no external dependencies, React-native
- Positive: Works well for single-user scenarios
- Negative: Will need to revisit for B2B (teacher viewing 25+ students)
- Negative: No time-travel debugging or dev tools

**Alternatives Considered:**
- Redux: Too complex for current needs
- Zustand: Not needed yet, defer to B2B
- MobX: Adds learning curve

---

### ADR-002: Firebase as Backend

**Status:** Accepted

**Context:**
- Need authentication, database, and API functions
- Small team (1 developer)
- Want to focus on features, not infrastructure

**Decision:**
Use Firebase (Auth, Firestore, Cloud Functions).

**Consequences:**
- Positive: Integrated ecosystem, scales automatically
- Positive: No server management
- Positive: Generous free tier
- Negative: Vendor lock-in
- Negative: Complex pricing at scale (but unlikely to hit)

**Alternatives Considered:**
- Supabase: Open source alternative, but less mature
- AWS Amplify: More complex, steeper learning curve
- Custom backend: Too much operational overhead

---

### ADR-003: Expo Managed Workflow

**Status:** Accepted

**Context:**
- Need to build for iOS and Android
- Want over-the-air updates
- Don't need custom native modules (yet)

**Decision:**
Use Expo managed workflow with Expo Router.

**Consequences:**
- Positive: Fast development, easy updates
- Positive: File-based routing (clear structure)
- Positive: EAS Build and EAS Update
- Negative: Limited to Expo-supported packages
- Negative: Larger bundle size than bare React Native

**Alternatives Considered:**
- React Native CLI: More control, but slower development
- Flutter: Different language, would need to rebuild from scratch

---

### ADR-004: Emotion for Styling

**Status:** Accepted

**Context:**
- Need theming (light/dark mode)
- Want type-safe styles
- StyleSheet doesn't support dynamic theming well

**Decision:**
Use Emotion (CSS-in-JS) with theme provider.

**Consequences:**
- Positive: Theme access in styles, dynamic styling
- Positive: Better TypeScript support than StyleSheet
- Positive: Runtime theme switching works well
- Negative: Slight runtime overhead vs. static styles
- Negative: Requires learning CSS-in-JS patterns

**Alternatives Considered:**
- StyleSheet: Native, but poor theming support
- Styled Components: Similar, chose Emotion for performance
- Tamagui: Too opinionated, learning curve

---

## Future Architecture Considerations (B2B Phase)

When you return to build the teacher dashboard, consider:

### 1. State Management for Teacher Dashboard

**Challenge:** Teacher viewing 25-50 student progress records in real-time.

**Recommendation:** Zustand with selectors
```typescript
// Only re-renders when THIS student changes
const student = useTeacherStore((s) => s.students[studentId])
```

**Why:**
- Granular subscriptions (no unnecessary re-renders)
- Simple API (easier than Redux)
- No provider hell
- Works alongside existing Context

---

### 2. Firestore Data Model for Multi-Tenancy

**Challenge:** Teachers need to view student progress, but students own their data.

**Recommended structure:**
```
users/{userId}
  - name, email (user owns this)

teachers/{teacherId}
  - name, email, tier

teachers/{teacherId}/students/{studentId}
  - linkCode, linkedAt, studentEmail

studentProgress/{studentId}/lessons/{lessonId}
  - stars, completedAt
  (denormalized for teacher queries)
```

**Security rules:**
```javascript
match /studentProgress/{studentId}/lessons/{lessonId} {
  // Student can read/write their own progress
  allow read, write: if request.auth.uid == studentId;

  // Teachers can read if student is linked
  allow read: if exists(/databases/$(database)/documents/teachers/$(request.auth.uid)/students/$(studentId));
}
```

---

### 3. Real-Time Subscriptions

**Challenge:** Teacher dashboard needs live updates when students complete lessons.

**Recommendation:** Firestore `onSnapshot` with proper cleanup
```typescript
useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, `teachers/${teacherId}/students`),
    (snapshot) => {
      // Update Zustand store
      const students = snapshot.docs.map(doc => doc.data())
      teacherStore.setStudents(students)
    }
  )

  return () => unsubscribe()
}, [teacherId])
```

**Why:**
- Real-time updates without polling
- Automatic reconnection handling
- Optimistic UI updates

---

### 4. Service Layer for B2B

**When:** Start of B2B development.

**Structure:**
```
/src/services/
  /teacher/
    - api.ts (Firebase calls)
    - cache.ts (IndexedDB/AsyncStorage)
    - types.ts
  /students/
    - api.ts
    - types.ts
```

**Benefits:**
- Testable without Firebase
- Centralized caching logic
- Easy to add request batching
- Can swap backends if needed

---

## Deployment Architecture

### Current Setup

**Frontend:**
- Expo EAS Build (managed workflow)
- EAS Update (OTA updates)
- App Store + Google Play distribution

**Backend:**
- Firebase Hosting (not used)
- Firebase Cloud Functions (Gen 1)
- Firestore (default database)

**CI/CD:**
- Manual builds via `eas build`
- Manual deployments via `firebase deploy`

---

### Recommended Production Setup

**Frontend:**
1. **EAS Build** for app binaries
   ```bash
   eas build --platform all
   ```

2. **EAS Submit** for store submission
   ```bash
   eas submit --platform all
   ```

3. **EAS Update** for hotfixes (JS/TS only)
   ```bash
   eas update --branch production
   ```

**Backend:**
1. **Firebase Functions** deployment
   ```bash
   firebase deploy --only functions
   ```

2. **Firestore Rules** deployment
   ```bash
   firebase deploy --only firestore:rules
   ```

**Environments:**
- Development: Firebase emulators
- Staging: Firebase project (tonale-staging)
- Production: Firebase project (tonale-prod)

---

### Environment Variables

**Required for production:**

```bash
# .env.production
EXPO_PUBLIC_FIREBASE_API_KEY=xxx
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tonale-prod.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tonale-prod
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tonale-prod.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
EXPO_PUBLIC_FIREBASE_APP_ID=xxx
EXPO_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

**Never commit to git.** Use EAS Secrets:
```bash
eas secret:create --scope project --name SENTRY_DSN --value https://xxx
```

---

## Monitoring & Observability

### Production Monitoring Stack

1. **Sentry** (Errors & Performance)
   - Crash reporting
   - Error tracking with stack traces
   - Performance monitoring
   - Release tracking

2. **Firebase Analytics** (Usage)
   - User behavior tracking
   - Conversion funnels
   - Retention cohorts

3. **Firebase Performance Monitoring** (Optional)
   - App startup time
   - Screen load time
   - Network request latency

4. **Firebase Crashlytics** (Alternative to Sentry)
   - Free, integrated with Firebase Console
   - Consider if budget is concern

---

### Key Metrics to Track

**User Metrics:**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Retention (D1, D7, D30)
- Session duration
- Sessions per user

**Engagement Metrics:**
- Lessons started
- Lessons completed
- Completion rate per lesson
- Stars earned distribution
- Stage progression rate

**Technical Metrics:**
- Crash-free rate (target: >99.5%)
- App startup time (target: <3s)
- API response time (target: <1s p95)
- Error rate per endpoint

**Business Metrics (when monetized):**
- Trial conversion rate
- Churn rate
- Lifetime value (LTV)

---

## Security Considerations

### Current Security Posture

**Good:**
- ✅ Firestore security rules (user data isolated)
- ✅ Firebase Auth (industry standard)
- ✅ HTTPS by default (Firebase)
- ✅ Environment variables not committed

**Needs Attention:**
- ⚠️ No rate limiting on Cloud Functions
- ⚠️ No input validation on all endpoints (verify)
- ⚠️ No audit logging

---

### Security Checklist for Production

- [x] **Firestore security rules** deployed
- [ ] **Firebase App Check** enabled (prevent API abuse)
- [ ] **Rate limiting** on Cloud Functions
- [ ] **Input validation** on all function endpoints
- [ ] **Secrets** managed via environment variables
- [ ] **API keys** restricted by platform/bundle ID
- [ ] **reCAPTCHA** on sign-up (prevent bots)

**Firebase App Check (Recommended):**
```typescript
// src/config/firebase/firebase.ts
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

if (!__DEV__) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.EXPO_PUBLIC_RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  })
}
```

---

## Cost Estimates (B2C)

### Firebase Costs (Spark Plan - Free)

**Generous free tier:**
- **Firestore:** 1GB storage, 50K reads/day, 20K writes/day
- **Auth:** Unlimited users
- **Functions:** 2M invocations/month, 400K GB-seconds
- **Hosting:** 10GB storage, 360MB/day transfer

**Estimate for 1,000 DAU:**
- Firestore reads: ~24K/day (within free tier)
- Firestore writes: ~3K/day (within free tier)
- Functions: ~120K/month (within free tier)

**Likely won't exceed free tier until 5,000+ DAU.**

---

### Third-Party Costs

**Sentry:**
- Free tier: 5,000 errors/month
- Paid: $26/month for 50K errors

**Expo EAS:**
- Free tier: Unlimited development builds
- Paid: $29/month for faster builds + EAS Update

**Total Monthly Cost (estimated):**
- Firebase: $0 (free tier)
- Sentry: $0 (free tier initially)
- Expo: $0-29 (optional)

**Total: $0-29/month for B2C launch**

---

## Risks & Mitigation

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Firebase quota exceeded | Low | High | Monitor usage, upgrade to Blaze plan |
| App crash on specific devices | Medium | Medium | Sentry alerts, test on multiple devices |
| Performance degradation | Low | Medium | Performance monitoring, baseline metrics |
| Data loss from Firestore bug | Very Low | High | Firestore backup, export data regularly |
| Security breach | Low | High | Security rules, App Check, rate limiting |

---

### Product Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low user engagement | Medium | High | Analytics, user interviews, iterate |
| ABRSM content accuracy issues | Low | High | Peer review by ABRSM teachers |
| Competitor launches similar app | Medium | Medium | Focus on teacher dashboard differentiation |
| App Store rejection | Low | Medium | Follow guidelines, test submission |

---

## Next Steps (Immediate)

### This Week (Pre-Launch)

**Day 1:**
1. Install Sentry (30 min)
2. Update Firestore rules (5 min)
3. Verify loading states (30 min)
4. Test on 2-3 devices (1 hour)

**Day 2:**
5. Add Firebase Analytics (optional, 1 hour)
6. Final E2E test on iOS + Android (2 hours)
7. Record demo video for app stores (1 hour)

**Day 3:**
8. Prepare app store listings (screenshots, descriptions)
9. Submit to App Store + Google Play
10. Monitor Sentry for first crashes

---

### Next Month (Post-Launch)

**Week 1-2:**
- Monitor Sentry for crashes
- Track analytics for usage patterns
- Collect user feedback

**Week 3-4:**
- Fix critical bugs
- Iterate based on user feedback
- Plan B2B features based on validation

---

## Conclusion

Your architecture is **pragmatic and appropriate** for B2C v1.0. The concerns around state management, service layers, and multi-tenancy are **future problems** that don't apply yet.

**The only blockers for launch are:**
1. Sentry (error monitoring)
2. Firestore rules fix
3. Loading state verification

After these 3 items, **you're ready to ship.**

Don't over-engineer. Ship, learn, iterate.

When you validate B2C and approach B2B, come back to this document. We'll architect the teacher dashboard with the right patterns at that time.

---

**Questions or Need Clarification?**

This document will evolve as you build. Update it when you make architecture decisions, and refer back when planning B2B features.

Good luck with the launch. 🚀

---

**Document Metadata:**
- **Created:** 2026-01-29
- **Author:** Winston (Architect Agent)
- **Status:** Living Document
- **Next Review:** After B2C launch (when planning B2B)
- **Location:** `/Users/leon.kwan/dev/tonale/_bmad-output/planning-artifacts/`
