# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start              # Expo dev server
npm run ios            # iOS Simulator
npm run android        # Android Emulator

# Linting & type-checking
npm run lint           # ESLint check
npm run lint:fix       # ESLint auto-fix
npx tsc --noEmit       # TypeScript type-check

# Testing
npm test               # Jest unit tests (all generators)
npm run test:watch     # Jest watch mode
npm run test:coverage  # Jest coverage report

# E2E (Maestro, requires running simulator)
npm run test:e2e             # All stages
npm run test:e2e:stage0      # Pre-grade lessons
npm run test:e2e:stage1      # Stage 1 lessons
npm run test:e2e:stage2      # Stage 2 lessons
```

To run a single Jest test file:
```bash
npx jest tests/unit/exercises/generators/noteValues.test.ts
```

CI runs on push/PR to `main`/`staging`: case sensitivity check, ESLint, `tsc --noEmit`, Jest, and backend type-check.

## Architecture

**Tonale** is a React Native + Expo music education app (ABRSM Grade 1–5 curriculum) with two subject tracks: Theory and Aural. Backend is Firebase (Auth, Firestore, callable Cloud Functions in a separate `tonale-api` repo).

### Navigation

Expo Router (file-based) under `app/`. Key routes:
- `(auth)/` — sign-in/sign-up
- `(tabs)/` — bottom tabs: Home, Theory, Aural, Settings
- `lesson.tsx` — unified lesson screen for both Theory and Aural
- `revision.tsx` — revision session for incorrect answers

### State Management

Three main React contexts (no Redux):
- `useUserContext` — Firebase auth state, user profile
- `useProgressContext` — lesson progress, stars, grade tracking
- `useThemeModeContext` — light/dark theme toggle

AsyncStorage access is always through `src/storage/typedStorage.ts` (typed wrapper). Local caching helpers live in `src/storage/`.

### Theory Exercise System

`src/subjects/theory/` contains:
- `curriculum/stages/` — stage configs (stageZero, stageOne, stageTwo) listing which topics appear at each stage
- `curriculum/config/` — per-topic configs (notes, key signatures, intervals, triads, etc.)
- `exercises/generators/` — 15+ topic-specific generators that produce typed question objects
- `exercises/generator.ts` — dispatcher that routes to the right generator based on topic

Each generator is independently unit-tested in `tests/unit/exercises/generators/`.

### Aural Exercise System

`src/subjects/aural/` handles rhythm playback, metronome (`useMetronome`), and audio via `expo-audio`. See `docs/AURAL-EXERCISE-SYSTEM.md` for detailed design.

### Component Conventions

Every component lives in its own directory with exactly two files:
```
ComponentName/
  index.tsx              # Component logic
  ComponentName.styles.tsx  # Emotion styled components
```

This applies to `src/compLib/`, `src/screens/`, and `src/globalComponents/`.

**Theme in styles only**: Never call `useTheme()` in `index.tsx`. Use styled callbacks `({ theme }) => ({ ... })` in `.styles.tsx` files instead. If a child needs a dynamic color, use styled props or lift from styles.

### Styling

- `@emotion/native` styled components throughout
- Theme source of truth: `src/config/theme/` (colors, spacing, typography)
- Responsive sizing via `react-native-size-matters` `scale()` / `verticalScale()`
- Exception: card backgrounds may use hardcoded white/black

### Path Aliases

`@/` maps to `src/`, `@types` maps to `src/types/`. Configured in `tsconfig.json`, `jest.config.js`, and Babel.

## Code Style

- Arrow functions only; no `function` declarations
- Single quotes, **no semicolons**, no trailing commas
- Import React hooks directly (`useState`, not `React.useState`)
- TypeScript strict mode; avoid `any`
- PascalCase components, camelCase functions/variables, UPPER_SNAKE_CASE constants
- No abbreviations in names
