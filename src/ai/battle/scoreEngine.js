export function calculateScopeScore({
  expectedRemaining,
  worstCaseRemaining,
  candidateCount,
}) {
  if (candidateCount <= 0) {
    return {
      informationScore: 0,
      worstCaseScore: 0,
      immediateWinScore: 0,
      humanScore: 0,
      battleScore: 0,
      totalScore: 0,
    };
  }

  // 平均でどれだけ候補を減らせるか
  const informationScore =
    (1 - expectedRemaining / candidateCount) * 100;

  // 一番悪い結果でもどれだけ候補を減らせるか
  const worstCaseScore =
    (1 - worstCaseRemaining / candidateCount) * 100;

  // その予想がそのまま正解する確率
  const immediateWinScore =
    (1 / candidateCount) * 100;

  // 今後、HitScopeの人間統計を使う
  const humanScore = 0;

  // 今後、先攻後攻・アイテム・相手脅威を使う
  const battleScore = 0;

  const totalScore =
    informationScore * 0.6 +
    worstCaseScore * 0.3 +
    immediateWinScore * 0.1;

  return {
    informationScore: Number(informationScore.toFixed(2)),
    worstCaseScore: Number(worstCaseScore.toFixed(2)),
    immediateWinScore: Number(immediateWinScore.toFixed(2)),
    humanScore,
    battleScore,
    totalScore: Number(totalScore.toFixed(2)),
  };
}