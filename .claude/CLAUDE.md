# CLAUDE.md

## Commands

```bash
npm run lint           # ESLint check
npm run lint:fix       # ESLint auto-fix
npx tsc --noEmit       # TypeScript type-check
npm test               # Jest unit tests
```

## Architecture

React Native + Expo, ios and android only, no web. Two subject tracks: Theory and Aural. Backend: Firebase (Auth, Firestore, Cloud Functions) in separate `tonale-api` repo.

**Navigation:** Expo Router under `app/`. Routes: `(auth)/`, `(tabs)/` (Home, Theory, Aural, Settings), `lesson.tsx`, `revision.tsx`.

### State Management

Three React contexts — always use the hook, never import the context object directly:
- `useUser()` — Firebase auth state, user profile
- `useProgress()` — lesson progress, stars, grade tracking
- `useThemeMode()` — light/dark theme toggle

AsyncStorage → always via `src/storage/typedStorage.ts`.

### Theory Exercise System

`src/subjects/theory/`: stage configs in `curriculum/stages/`, topic configs in `curriculum/config/`, generators in `exercises/generators/`, dispatcher in `exercises/generator.ts`. Each generator has a Jest test in `tests/unit/exercises/generators/`.

### Aural Exercise System

`src/subjects/aural/` — rhythm playback, metronome, audio via `expo-audio`. See `docs/AURAL-EXERCISE-SYSTEM.md`.

### Component Conventions

Every component: exactly two files in one directory.
```
ComponentName/
  index.tsx                    # logic only — no useTheme()
  ComponentName.styles.tsx     # Emotion styled components
```

Theme via `({ theme }) => ({ ... })` callbacks in `.styles.tsx` only. Never `useTheme()` in `index.tsx`.

### Path Aliases

`@/` → `src/`, `@types` → `src/types/`.

### Music Notation Library

`@leonkwan46/music-notation` — private package, do not replace or reimport. Mocked in tests at `tests/unit/__mocks__/music-notation.ts`.

### Feature Flags

`src/config/featureFlags.ts` — all currently off (`ENABLE_AURAL_LESSONS`, `ENABLE_DONATION`, `ENABLE_GUEST_LOGIN`). Check flags before assuming a feature is reachable.

## Do Not

- Call `useTheme()` inside `index.tsx` files — theme access belongs in `.styles.tsx` only
- Access AsyncStorage directly — always go through `src/storage/typedStorage.ts`
- Import context objects directly — always use the hook (`useUser()`, not `UserContext`)
- Hardcode colors except card backgrounds (white/black allowed there)

## Code Style

- Arrow functions only; no `function` declarations
- Single quotes, no semicolons, no trailing commas
- Import React hooks directly (`useState`, not `React.useState`)
- TypeScript strict mode; avoid `any`
- PascalCase components, camelCase functions/variables, UPPER_SNAKE_CASE constants
- No abbreviations in names
