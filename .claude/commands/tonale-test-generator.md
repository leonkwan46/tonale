Run the Jest test for a generator: $ARGUMENTS

Execute:
```
npx jest tests/unit/exercises/generators/$ARGUMENTS.test.ts --verbose
```

If the test file doesn't exist, offer to create it using the standard pattern from `tests/unit/helpers/testHelpers.ts` — one describe block per stage, validating count, uniqueness, choices, and stage constraints.

If tests fail:
1. Read the failing test output carefully
2. Read the generator source at `src/subjects/theory/exercises/generators/$ARGUMENTS.ts`
3. Diagnose the root cause
4. Apply a surgical fix — one change at a time
5. Re-run the test to confirm it passes
