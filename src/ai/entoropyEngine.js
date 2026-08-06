import { calculateHitBlow } from "../battleAI";

// 候補を、Hit/Blow結果ごとにグループ分けする
export function groupCandidatesByResult(candidates, guess) {
  const groups = {};

  candidates.forEach((candidate) => {
    const { hit, blow } = calculateHitBlow(candidate, guess);

    const key = `${hit}H${blow}B`;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(candidate);
  });

  return groups;
}

export function calculateExpectedRemaining(candidates, guess) {
  if (candidates.length === 0) {
    return 0;
  }

  const groups = groupCandidatesByResult(candidates, guess);

  let expectedRemaining = 0;

  Object.values(groups).forEach((group) => {
    const probability = group.length / candidates.length;

    expectedRemaining += probability * group.length;
  });

  return expectedRemaining;
}

export function calculateWorstCaseRemaining(candidates, guess) {
  if (candidates.length === 0) {
    return 0;
  }

  const groups = groupCandidatesByResult(candidates, guess);

  return Math.max(
    ...Object.values(groups).map((group) => group.length)
  );
}