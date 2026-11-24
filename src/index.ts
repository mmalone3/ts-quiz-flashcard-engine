import { StudySession } from './engine/studySession';
import { createSampleDeck } from './data/sampleDeck';

export * from './types/questions';
export * from './engine/sm2';
export * from './engine/evaluator';
export * from './engine/studySession';
export * from './data/sampleDeck';

if (require.main === module) {
  const session = new StudySession(createSampleDeck());
  const due = session.getDueCards();

  console.log(`Loaded ${due.length} due cards.`);
  for (const card of due) {
    console.log(`- [${card.kind}] ${card.prompt}`);
  }
}
