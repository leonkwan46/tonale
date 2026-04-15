Create a new component in src/compLib/ named: $ARGUMENTS

Follow these conventions exactly:

1. **Create two files:**
   - `src/compLib/{Name}/index.tsx` — component logic
   - `src/compLib/{Name}/{Name}.styles.tsx` — Emotion styled components

2. **In index.tsx:**
   - No `useTheme()` calls — theme access is only in .styles.tsx
   - Arrow function syntax, no semicolons, single quotes
   - Export both as default and named

3. **In {Name}.styles.tsx:**
   - Use `@emotion/native` styled components
   - Access theme via `({ theme }) => ({ ... })` callbacks only
   - Use theme tokens: `theme.spacing`, `theme.colors`, `theme.typography`, `theme.borderRadius`, `theme.shadows`
   - Use `scale()` / `verticalScale()` from `react-native-size-matters` for responsive sizing

4. Add the export to `src/compLib/index.ts`

Read an existing component (e.g. `src/compLib/Button/`) before writing to match exact patterns.
