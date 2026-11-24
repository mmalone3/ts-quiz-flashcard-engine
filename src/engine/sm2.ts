import { SpacedRepetitionState } from '../types/questions';

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

const RATING_TO_QUALITY: Record<ReviewRating, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

export function createInitialSrsState(now: Date = new Date()): SpacedRepetitionState {
  return {
    easeFactor: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueDate: now.toISOString(),
  };
}

/**
 * Pure SM-2 spaced-repetition calculation.
 * Returns a new SpacedRepetitionState without mutating the input.
 */
export function calculateNextReview(
  current: SpacedRepetitionState,
  rating: ReviewRating,
  now: Date = new Date()
): SpacedRepetitionState {
  const quality = RATING_TO_QUALITY[rating];
  let { easeFactor, intervalDays, repetitions } = current;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 0;
  } else {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
  }

  if (rating === 'hard' && intervalDays > 1) {
    intervalDays = Math.max(1, Math.round(intervalDays * 0.8));
  } else if (rating === 'easy') {
    intervalDays = Math.max(4, Math.round(intervalDays * 1.3));
  }

  const nextEase =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easeFactor = Number(Math.max(1.3, nextEase).toFixed(2));

  const nextDue = new Date(now.getTime());
  if (intervalDays === 0) {
    nextDue.setMinutes(nextDue.getMinutes() + 1);
  } else {
    nextDue.setDate(nextDue.getDate() + intervalDays);
  }

  return {
    easeFactor,
    intervalDays,
    repetitions,
    dueDate: nextDue.toISOString(),
    lastReviewedAt: now.toISOString(),
  };
}
