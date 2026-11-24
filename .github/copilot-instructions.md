# GitHub Copilot Instructions — Quiz & Flashcard Engine

This repository implements a TypeScript spaced-repetition study engine using **discriminated unions** and **pure SM-2 scheduling**.

## Architecture Rules

1. **Discriminated Union Modeling (`src/types/questions.ts`)**
   - Every card variant extends `BaseCard` and sets a literal `kind` discriminant (`'multiple-choice' | 'true-false' | 'fill-in-the-blank'`).
   - Always narrow `StudyCard` via `switch (card.kind)` and call `assertNever(card)` in the `default` branch so the TypeScript compiler enforces exhaustiveness.
   - When adding a new card type (e.g., `'code-output'` or `'matching'`):
     1. Define its interface extending `BaseCard` with a unique `kind` literal.
     2. Add it to `export type StudyCard = ...`.
     3. Add its matching response shape to `UserResponse` (or `AnswerInput`).
     4. Run `npm run typecheck` — the compiler will flag every `switch` statement that needs a new `case`.

2. **Spaced Repetition (`src/engine/sm2.ts`)**
   - Keep `calculateNextReview` pure (pass `now: Date` explicitly rather than calling `new Date()` internally without a default) so scheduling logic stays deterministic and easy to unit-test.
   - Never mutate input `SpacedRepetitionState` objects; return new objects.

3. **Strict TypeScript**
   - `tsconfig.json` enables `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes`.
   - Always guard array indexing (e.g. `options[index]`) against `undefined`.
