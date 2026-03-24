# Tonale
<img width="19%" height="461" alt="2" src="https://github.com/user-attachments/assets/8c4b0380-2b6f-4c5a-aeb8-fb1f9893bf39" />
<img width="19%" height="461" alt="4" src="https://github.com/user-attachments/assets/e67930b0-6677-4370-ae1c-31e4ccdc5da9" />
<img width="19%" height="461" alt="3" src="https://github.com/user-attachments/assets/da6f3f85-0917-4d08-9c2b-4d36b411d069" />
<img width="19%" height="461" alt="1" src="https://github.com/user-attachments/assets/6a1812ed-0aaf-43bc-a2df-a7a27d00c92c" />
<img width="19%" height="460" alt="5" src="https://github.com/user-attachments/assets/a5c8a96b-9890-40f2-82d2-c3a66460abdc" />


A React Native app that teaches music theory, aligned to the **ABRSM Grade 1–5 curriculum**. Built with Expo and TypeScript.

**[Figma Design](https://www.figma.com/design/e7W92MCER7LJqvN32p9iL6/Tonale?node-id=0-1&p=f&t=iZkiu1O4a1c1hPtY-0)**

---

## What makes it stand out

**Structured ABRSM curriculum** — lessons are organised across three stages (Pre-Grade, Grade 1, Grade 2+) so learners follow a real exam path, not a random topic list.

**Custom music notation** — `@leonkwan46/music-notation` renders staves, notes, rests, key/time signatures, and articulation marks natively inside React Native; no web view, no images.

**Two subject tracks** — Theory (15 question generators covering everything from note values to triads) and Aural (rhythm playback with a native tap interface). Each has its own curriculum, generators, and lesson flow.

**Smart revision** — wrong answers are captured and resurfaced as dedicated revision sessions so learners revisit exactly what they struggled with.

**Star-based progress** — lessons unlock progressively, and each one grades you with 1–3 stars stored in Firestore via Cloud Functions.

**Fully tested** — 15 Jest-tested question generators and 23 Maestro E2E flows covering every lesson stage end-to-end.

---

## Feature overview

| Feature | Detail |
|---|---|
| Lessons | 24+ across Stages 0–2 (Pre-Grade → Grade 1 complete) |
| Question types | Multiple choice, True/False, Key press |
| Subjects | Theory + Aural (rhythm playback) |
| Notation | Custom `@leonkwan46/music-notation` library |
| Progress | Star ratings, per-lesson and final-test tracking |
| Revision mode | Stores wrong answers and surfaces them for replay |
| Auth | Firebase Auth (email/password, with email action links) |
| Themes | Light + dark mode |
| Testing | Jest (unit) + Maestro (E2E) |
| Backend | Separate [tonale-api](https://github.com/leonkwan46/tonale-api) repo (Cloud Functions + Firestore) |

---

## Getting started

### Prerequisites

- **Node 22** — matches CI and the `@leonkwan46/functions` engine. Use [nvm](https://github.com/nvm-sh/nvm): `nvm use` (`.nvmrc` is in the repo root).
- **npm** — lockfile is `package-lock.json`.
- **Expo CLI** — `npm install -g @expo/cli` (or use `npx expo`).

### 1 — Clone

```bash
git clone https://github.com/leonkwan46/tonale.git
cd tonale
```

### 2 — Secrets and config

Contact [@leonkwan46](https://github.com/leonkwan46) to get:
- Invited to the Firebase Tonalè project
- Added to the Tonalè GitHub organisation

- **`.env`** — placed in the project root, loaded automatically by Expo. Contains:

  ```
  EXPO_PUBLIC_FIREBASE_API_KEY
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
  EXPO_PUBLIC_FIREBASE_PROJECT_ID
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  EXPO_PUBLIC_FIREBASE_APP_ID
  EXPO_PUBLIC_AUTH_ACTION_URL
  ```

- **`google-services.json`** (Android) and **`GoogleService-Info.plist`** (iOS) — only needed when doing native builds.

### 3 — GitHub Packages auth

`@leonkwan46/*` packages are hosted on GitHub Packages. Add these to `~/.npmrc`:

```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
echo "@leonkwan46:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

Your token needs **`read:packages`** scope.

### 4 — Install

```bash
npm install
```

### 5 — Start the local backend (Firebase emulators)

This app connects to Firebase emulators in `__DEV__` mode — **Auth on 9099**, **Functions on 5001**, **Firestore on 8080**. The emulators are managed by the backend repo:

```bash
# In a separate terminal — clone and follow the README in that repo
git clone https://github.com/leonkwan46/tonale-api
```

Android uses host `10.0.2.2`; iOS Simulator uses `localhost`. The app still runs without emulators, but backend calls will fail gracefully with a console warning.

Install the Firebase CLI if you haven't already:

```bash
npm install -g firebase-tools
```

### 6 — Run

```bash
npm start          # Expo dev server (scan QR or press i/a)
npm run ios        # iOS Simulator
npm run android    # Android Emulator
```

---

## Testing

```bash
npm test                  # Jest unit tests (all generators)
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report

npm run test:e2e          # All Maestro E2E stages
npm run test:e2e:stage0   # Pre-grade lessons only
npm run test:e2e:stage1   # Stage 1 lessons only
npm run test:e2e:stage2   # Stage 2 lessons only
```

E2E tests require a running device/simulator and the emulators from step 5.

---

## Documentation

| Doc | What it covers |
|---|---|
| [Architecture](./docs/ARCHITECTURE.md) | Tech stack, project layout, lesson flow, notation, Firebase wiring |
| [App Stage Syllabus](./docs/App-Stage-Syllabus.md) | Full lesson breakdown per stage and grade |
| [Grade Syllabus](./docs/Grade-Syllabus.md) | ABRSM Grade 1–3 curriculum reference |
| [Aural Exercise System](./docs/AURAL-EXERCISE-SYSTEM.md) | How aural generators and rhythm playback work |
| [Privacy Compliance](./docs/PRIVACY_COMPLIANCE_REPORT.md) | GDPR, App Store, Play Store compliance notes |

---

## License

Private project — all rights reserved.
