import { getRecommendedDigit } from "./recommendationEngine";
import { calculateScore } from "./scoringEngine";
import {
  getStars,
  getConfidence,
} from "./confidenceEngine";
import { getExplanation } from "./explanationEngine";

export function getHitScopeAI(
  history,
  selectedPattern,
  selectedDigit
) {
  const recommendation =
    getRecommendedDigit(
      history,
      selectedPattern,
      selectedDigit
    );

  if (!recommendation) {
    return null;
  }

  const score = calculateScore(
    recommendation,
    history.length
  );

  return {
    recommendation,

    score,

    stars: getStars(score),

    confidence: getConfidence(score),

    explanation: getExplanation(recommendation),
  };
}