import { StudyCard, UserResponse } from '../types/questions';
import { calculateNextReview, ReviewRating } from './sm2';
import { evaluateAnswer, EvaluationResult } from './evaluator';

export interface SessionStats {
  reviewed: number;
  correct: number;
  streak: number;
  byKind: Record<StudyCard['kind'], number>;
}

export class StudySession {
  private cards: StudyCard[];
  private stats: SessionStats = {
    reviewed: 0,
    correct: 0,
    streak: 0,
    byKind: {
      'multiple-choice': 0,
      'true-false': 0,
      'fill-in-the-blank': 0,
    },
  };

  constructor(initialCards: readonly StudyCard[]) {
    this.cards = [...initialCards];
  }

  public getDueCards(now: Date = new Date()): StudyCard[] {
    const nowMs = now.getTime();
    return this.cards
      .filter((card) => new Date(card.srs.dueDate).getTime() <= nowMs)
      .sort(
        (a, b) =>
          new Date(a.srs.dueDate).getTime() - new Date(b.srs.dueDate).getTime()
      );
  }

  public getAllCards(): readonly StudyCard[] {
    return this.cards;
  }

  public addCard(card: StudyCard): void {
    this.cards.push(card);
  }

  public submitAnswer(
    cardId: string,
    response: UserResponse,
    rating: ReviewRating,
    now: Date = new Date()
  ): { evaluation: EvaluationResult; updatedCard: StudyCard } {
    const index = this.cards.findIndex((c) => c.id === cardId);
    if (index === -1) {
      throw new Error(`Card not found: ${cardId}`);
    }

    const card = this.cards[index]!;
    const evaluation = evaluateAnswer(card, response);
    const updatedSrs = calculateNextReview(card.srs, rating, now);
    const updatedCard: StudyCard = {
      ...card,
      srs: updatedSrs,
    };

    this.cards[index] = updatedCard;

    this.stats.reviewed += 1;
    this.stats.byKind[card.kind] += 1;
    if (evaluation.isCorrect) {
      this.stats.correct += 1;
      this.stats.streak += 1;
    } else {
      this.stats.streak = 0;
    }

    return { evaluation, updatedCard };
  }

  public getStats(): SessionStats {
    return {
      ...this.stats,
      byKind: { ...this.stats.byKind },
    };
  }
}
