import { countCoexist } from "./coexistAnalysis";

export function getRecommendedDigit(
  history,
  selectedPattern,
  selectedDigit
) {
  if (selectedDigit === null) {
    return null;
  }

  const coexistRanking = countCoexist(
    history,
    selectedPattern,
    selectedDigit
  );

  if (coexistRanking.length === 0) {
    return null;
  }

  const recommendation = coexistRanking[0];

  return {
    digit: recommendation.digit,
    percent: recommendation.percent,
    count: recommendation.count,
  };
}