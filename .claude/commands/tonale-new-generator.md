Create a new theory exercise generator for: $ARGUMENTS

Follow these conventions exactly:

1. **File location:** `src/subjects/theory/exercises/generators/{name}.ts`
2. **Export** a single function: `create{Name}Questions(questionsCount: number, stage: StageNumber, layoutType?: AnswerLayoutType): Question[]`
3. Use `generateQuestionsFromPool(allQuestions, questionsCount, getDuplicateIdentifier)` to deduplicate
4. Implement `getDuplicateIdentifier(question)` returning a unique string per question
5. Import types from `@/types` and stage config from `src/subjects/theory/curriculum/config/`
6. Add the export to `src/subjects/theory/exercises/generators/index.ts`
7. Register the generatorType in `src/subjects/theory/exercises/generator.ts` dispatcher

Also create the test file:
- **Location:** `tests/unit/exercises/generators/{name}.test.ts`
- Use helpers from `tests/unit/helpers/testHelpers.ts`
- Cover each applicable stage (0, 1, 2)
- Validate: question count, uniqueness, correct answer in choices, stage constraints

Read an existing generator (e.g. `src/subjects/theory/exercises/generators/noteValueName.ts`) and its test before writing, to match the exact patterns.
