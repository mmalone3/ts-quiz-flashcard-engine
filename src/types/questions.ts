/**
 * Spaced-repetition scheduling state attached to every study card.
 */
export interface SpacedRepetitionState {
  /** SM-2 ease factor (minimum 1.3, default 2.5). */
  easeFactor: number;
  /** Days until the next scheduled review. */
  intervalDays: number;
  /** Number of consecutive successful reviews. */
  repetitions: number;
  /** ISO-8601 timestamp when the card is next due. */
  dueDate: string;
  /** ISO-8601 timestamp of the most recent review, if any. */
  lastReviewedAt?: string;
}

/**
 * Shared fields common to all study card variants.
 */
export interface BaseCard {
  id: string;
  deckId: string;
  prompt: string;
  explanation: string;
  tags: readonly string[];
  srs: SpacedRepetitionState;
}

/**
 * Multiple-choice question with 2+ options and a single correct index.
 */
export interface MultipleChoiceCard extends BaseCard {
  kind: 'multiple-choice';
  options: readonly string[];
  correctIndex: number;
  shuffleOptions?: boolean;
}

/**
 * Binary true/false assertion card.
 */
export interface TrueFalseCard extends BaseCard {
  kind: 'true-false';
  correctAnswer: boolean;
}

/**
 * Short-answer / fill-in-the-blank card supporting multiple accepted strings.
 */
export interface FillInTheBlankCard extends BaseCard {
  kind: 'fill-in-the-blank';
  acceptedAnswers: readonly string[];
  caseSensitive?: boolean;
  hint?: string;
}

/**
 * Discriminated union of all supported study card interfaces.
 * Narrow using `switch (card.kind)` and `assertNever(card)`.
 */
export type StudyCard =
  | MultipleChoiceCard
  | TrueFalseCard
  | FillInTheBlankCard;

/**
 * Discriminated union of user responses matching each card variant.
 */
export type UserResponse =
  | { kind: 'multiple-choice'; selectedIndex: number }
  | { kind: 'true-false'; selectedAnswer: boolean }
  | { kind: 'fill-in-the-blank'; text: string };

/**
 * Exhaustiveness helper for `switch` statements over discriminated unions.
 */
export function assertNever(value: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}
