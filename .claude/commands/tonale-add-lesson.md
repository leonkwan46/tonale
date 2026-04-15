Add a new lesson to a stage config: $ARGUMENTS

Steps:
1. Read the target stage file in `src/subjects/theory/curriculum/stages/` (stageZero, stageOne, or stageTwo)
2. Read `src/subjects/theory/exercises/generator.ts` to confirm the `generatorType` exists
3. Add the lesson using the existing shape:

```ts
{
  id: 'unique-kebab-case-id',
  title: 'Lesson Title',
  description: 'Short description of what this lesson covers.',
  exerciseConfig: {
    generatorType: 'theGeneratorType',
    questionsCount: 10,
    stage: N,
    answerLayoutType: 'grid' | 'row',
  },
}
```

4. Ensure the `id` is unique across all three stage files
5. `answerLayoutType`: use `'grid'` for visual/notation answers, `'row'` for text answers
6. If the required `generatorType` doesn't exist yet, stop and say so — run `/new-generator` first

If stage, title, topic, or layout type are not provided in the arguments, ask before proceeding.
