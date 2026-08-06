import {
  calculateExpectedRemaining,
  calculateWorstCaseRemaining,
} from "./entropyEngine";

// 全候補の中から最も良い一手を探す
export function findBestGuess(candidates) {
  let bestGuess = null;

  let bestScore = Infinity;

  let bestWorstCase = Infinity;

  candidates.forEach((guess) => {
    const expected = calculateExpectedRemaining(
      candidates,
      guess
    );

    const worst = calculateWorstCaseRemaining(
      candidates,
      guess
    );

    if (
      expected < bestScore ||
      (expected === bestScore &&
        worst < bestWorstCase)
    ) {
      bestGuess = guess;
      bestScore = expected;
      bestWorstCase = worst;
    }
  });

  return {
    guess: bestGuess,
    expectedRemaining: bestScore,
    worstCaseRemaining: bestWorstCase,
  };
}