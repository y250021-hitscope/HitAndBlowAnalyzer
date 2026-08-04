export function calculateScore(
  recommendation,
  historyLength
) {
  if (!recommendation) {
    return 0;
  }

  let score = 50;

  score += recommendation.percent * 0.5;

  score += Math.min(historyLength / 10, 20);

  return Math.round(score);
}