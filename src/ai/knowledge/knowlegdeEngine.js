import { championKnowledge } from "./championKnowledge";

export function evaluateChampionKnowledge(state) {
  const results = [];

  championKnowledge.forEach((knowledge) => {
    if (!knowledge.condition(state)) {
      return;
    }

    const evaluation = knowledge.evaluate(state);

    results.push({
      id: knowledge.id,
      title: knowledge.title,
      category: knowledge.category,
      type: knowledge.type,
      confidence: knowledge.confidence,

      ...evaluation,
    });
  });

  return results;
}

export function summarizeKnowledgeVotes(state) {
  const evaluations = evaluateChampionKnowledge(state);

  const summary = {};

  evaluations.forEach((evaluation) => {
    const { action, score } = evaluation;

    if (!summary[action]) {
      summary[action] = {
        action,
        totalScore: 0,
        reasons: [],
        sources: [],
      };
    }

    summary[action].totalScore += score;

    summary[action].reasons.push(
      evaluation.reason
    );

    summary[action].sources.push(
      evaluation.id
    );
  });

  return Object.values(summary).sort(
    (a, b) => b.totalScore - a.totalScore
  );
}