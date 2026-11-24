import { StudyCard, UserResponse, assertNever } from '../types/questions';

export interface EvaluationResult {
  isCorrect: boolean;
  expectedDisplay: string;
  explanation: string;
}

/**
 * Evaluates a user's response against any StudyCard variant using
 * exhaustive type narrowing on `card.kind`.
 */
export function evaluateAnswer(
  card: StudyCard,
  response: UserResponse
): EvaluationResult {
  if (card.kind !== response.kind) {
    throw new Error(
      `Response kind "${response.kind}" does not match card kind "${card.kind}".`
    );
  }

  switch (card.kind) {
    case 'multiple-choice': {
      const r = response as Extract<UserResponse, { kind: 'multiple-choice' }>;
      const isCorrect = r.selectedIndex === card.correctIndex;
      const expectedText =
        card.options[card.correctIndex] ?? `Option #${card.correctIndex + 1}`;
      return {
        isCorrect,
        expectedDisplay: expectedText,
        explanation: card.explanation,
      };
    }

    case 'true-false': {
      const r = response as Extract<UserResponse, { kind: 'true-false' }>;
      return {
        isCorrect: r.selectedAnswer === card.correctAnswer,
        expectedDisplay: card.correctAnswer ? 'True' : 'False',
        explanation: card.explanation,
      };
    }

    case 'fill-in-the-blank': {
      const r = response as Extract<UserResponse, { kind: 'fill-in-the-blank' }>;
      const normalizedInput = card.caseSensitive
        ? r.text.trim()
        : r.text.trim().toLowerCase();

      const isCorrect = card.acceptedAnswers.some((accepted) => {
        const candidate = card.caseSensitive
          ? accepted.trim()
          : accepted.trim().toLowerCase();
        return candidate === normalizedInput;
      });

      return {
        isCorrect,
        expectedDisplay: card.acceptedAnswers.join(' / '),
        explanation: card.explanation,
      };
    }

    default:
      return assertNever(card);
  }
}
