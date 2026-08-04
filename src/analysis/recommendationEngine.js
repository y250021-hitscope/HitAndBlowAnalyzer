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
export function getRecommendedNumbers(history, selectedPattern) {
  const matchingHistory = history.filter(
    (item) => item.pattern === selectedPattern
  );

  if (matchingHistory.length === 0) {
    return [];
  }

  // 各桁で0〜9が何回使われたか数える
  const positionCounts = [
    Array(10).fill(0),
    Array(10).fill(0),
    Array(10).fill(0),
  ];

  matchingHistory.forEach((item) => {
    item.number.split("").forEach((digit, position) => {
      positionCounts[position][Number(digit)]++;
    });
  });

  const candidates = [];

  // 000〜999の候補をすべて確認
  for (let first = 0; first <= 9; first++) {
    for (let second = 0; second <= 9; second++) {
      for (let third = 0; third <= 9; third++) {
        // 同じ数字は使わない
        if (
          first === second ||
          first === third ||
          second === third
        ) {
          continue;
        }

        const candidate = `${first}${second}${third}`;

        // 候補のH/Lパターンを作る
        const candidatePattern = candidate
          .split("")
          .map((digit) => (Number(digit) <= 4 ? "L" : "H"))
          .join("");

        if (candidatePattern !== selectedPattern) {
          continue;
        }

        // 各桁での人気度を合計
        const score =
          positionCounts[0][first] +
          positionCounts[1][second] +
          positionCounts[2][third];

        // 実際にその3桁が登録された回数
        const exactCount = matchingHistory.filter(
          (item) => item.number === candidate
        ).length;

        candidates.push({
          number: candidate,
          score,
          exactCount,
        });
      }
    }
  }

  return candidates
    .sort((a, b) => {
      // 実際に使われた回数を最優先
      if (b.exactCount !== a.exactCount) {
        return b.exactCount - a.exactCount;
      }

      return b.score - a.score;
    })
    .slice(0, 3);
}