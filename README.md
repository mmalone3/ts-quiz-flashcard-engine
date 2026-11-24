# TypeScript Spaced-Repetition Quiz & Flashcard Engine

A strictly typed TypeScript study engine that models **multiple-choice**, **true/false**, and **fill-in-the-blank** cards as a discriminated union of distinct interfaces (`StudyCard`), paired with a pure **SM-2** spaced-repetition scheduler.

## Project Structure

- `src/types/questions.ts` — `BaseCard`, `MultipleChoiceCard`, `TrueFalseCard`, `FillInTheBlankCard`, `StudyCard` union, `UserResponse` union, and `assertNever`.
- `src/engine/sm2.ts` — Pure SM-2 interval & ease-factor scheduler (`calculateNextReview`).
- `src/engine/evaluator.ts` — Exhaustive `switch (card.kind)` answer evaluator.
- `src/engine/studySession.ts` — Due-card queue, stats tracking, and review submission.
- `src/data/sampleDeck.ts` — Starter deck covering TypeScript, SM-2, SQL, and C.
- `.github/copilot-instructions.md` — Guidance for GitHub Copilot when extending card types or scheduling rules.

## Quick Start

```bash
npm install
npm run typecheck
npm start
```

## Extending with GitHub Copilot

Open this folder in VS Code. Because `.github/copilot-instructions.md` and strict `tsconfig.json` flags (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) are configured, you can ask Copilot Chat to:

- *"Add a `CodeOutputCard` interface to `StudyCard` and update `evaluateAnswer`"*
- *"Add Jest or Vitest unit tests for `calculateNextReview` and `evaluateAnswer`"*
- *"Swap `calculateNextReview` to support FSRS weights"*
