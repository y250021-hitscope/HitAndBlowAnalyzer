import { summarizeKnowledgeVotes } from "../knowledge/knowledgeEngine";

export function chooseStrategy(state) {
  const knowledgeVotes = summarizeKnowledgeVotes(state);

  if (knowledgeVotes.length === 0) {
    return {
      action: "normalGuess",
      reason: "発動するChampion Knowledgeがありません。",
      knowledgeVotes: [],
    };
  }

  const bestVote = knowledgeVotes[0];

  return {
    action: bestVote.action,
    score: bestVote.totalScore,
    reasons: bestVote.reasons,
    sources: bestVote.sources,
    knowledgeVotes,
  };
}

const testState = {
  turn: 1,
  myItems: ["highLow", "change"],
  myUsedItems: [],
};

console.log(
  "ScopeAI Strategy Test:",
  chooseStrategy(testState)
);