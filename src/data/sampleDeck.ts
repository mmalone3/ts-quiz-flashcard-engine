import { StudyCard } from '../types/questions';
import { createInitialSrsState } from '../engine/sm2';

export function createSampleDeck(now: Date = new Date()): StudyCard[] {
  const srs = () => createInitialSrsState(now);

  return [
    {
      id: 'ts-1',
      deckId: 'typescript-core',
      kind: 'multiple-choice',
      prompt: 'Which TypeScript feature lets you exhaustively narrow a union of interfaces using a shared literal property?',
      options: [
        'Discriminated unions',
        'Declaration merging',
        'Ambient modules',
        'Index signatures',
      ],
      correctIndex: 0,
      explanation: 'A discriminated union uses a common literal property (such as `kind`) so `switch` statements narrow each member safely.',
      tags: ['typescript', 'types'],
      srs: srs(),
    },
    {
      id: 'ts-2',
      deckId: 'typescript-core',
      kind: 'true-false',
      prompt: 'In TypeScript with `strict: true`, assigning a `StudyCard` to `never` in the `default` branch of a `switch` fails to compile if a union variant is unhandled.',
      correctAnswer: true,
      explanation: 'When a case is missed, the remaining union type is not assignable to `never`, catching missing branches at compile time.',
      tags: ['typescript', 'type-safety'],
      srs: srs(),
    },
    {
      id: 'ts-3',
      deckId: 'typescript-core',
      kind: 'fill-in-the-blank',
      prompt: 'In TypeScript, the bottom type used in an exhaustiveness helper `assertNever(x: ____)` is called what?',
      acceptedAnswers: ['never'],
      caseSensitive: false,
      hint: 'It represents values that never occur.',
      explanation: '`never` has no inhabitants, making it ideal for verifying that all union cases have been handled.',
      tags: ['typescript', 'types'],
      srs: srs(),
    },
    {
      id: 'srs-1',
      deckId: 'algorithms',
      kind: 'multiple-choice',
      prompt: 'In the SM-2 spaced-repetition algorithm, what happens to `repetitions` when a card is rated "Again" (quality < 3)?',
      options: [
        'It resets to 0 and interval resets',
        'It stays the same and interval doubles',
        'It increments by 1',
        'Ease factor resets to 5.0',
      ],
      correctIndex: 0,
      explanation: 'A failed recall resets the repetition counter to 0 so the card is re-learned from the shortest interval.',
      tags: ['srs', 'sm2'],
      srs: srs(),
    },
    {
      id: 'sql-1',
      deckId: 'sql-fundamentals',
      kind: 'fill-in-the-blank',
      prompt: 'Which SQL clause filters grouped rows *after* `GROUP BY` aggregation has been computed?',
      acceptedAnswers: ['HAVING', 'having'],
      caseSensitive: false,
      hint: 'Unlike WHERE, it runs after grouping.',
      explanation: '`WHERE` filters individual rows before grouping; `HAVING` filters groups after aggregation.',
      tags: ['sql', 'queries'],
      srs: srs(),
    },
    {
      id: 'c-1',
      deckId: 'c-fundamentals',
      kind: 'true-false',
      prompt: 'In C, `sizeof(arr) / sizeof(arr[0])` still returns the full array element count when `arr` is passed as a parameter `int arr[]` to a function.',
      correctAnswer: false,
      explanation: 'Array parameters decay to pointers (`int *`), so `sizeof(arr)` inside the function returns the pointer size, not the array size.',
      tags: ['c', 'pointers'],
      srs: srs(),
    },
  ];
}
