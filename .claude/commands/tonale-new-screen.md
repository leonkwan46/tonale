Create a new screen in src/screens/ named: $ARGUMENTS

Follow these conventions exactly:

1. **Create the screen directory:** `src/screens/{Name}Screen/`
2. **Required files:**
   - `src/screens/{Name}Screen/index.tsx` — screen component
   - `src/screens/{Name}Screen/{Name}Screen.styles.tsx` — Emotion styled components

3. **If the screen has sub-components**, create each as:
   - `src/screens/{Name}Screen/components/{SubName}/index.tsx`
   - `src/screens/{Name}Screen/components/{SubName}/{SubName}.styles.tsx`

4. **Conventions:**
   - No `useTheme()` in index.tsx — styled callbacks only in .styles.tsx
   - Wrap the screen in `ScreenContainer` from `@/globalComponents/ScreenContainer`
   - Arrow functions, single quotes, no semicolons
   - Access contexts via `useUser()`, `useProgress()` — never import context directly

5. **Routing:** If a new route is needed, add a file under `app/` following Expo Router conventions

Read an existing screen (e.g. `src/screens/HomeScreen/`) before writing to match exact patterns.
