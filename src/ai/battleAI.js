// 0〜9から、同じ数字を使わない3桁の候補を全て作る
export function generateAllCandidates() {
  const candidates = [];

  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      for (let c = 0; c <= 9; c++) {
        if (a === b || a === c || b === c) {
          continue;
        }

        candidates.push(`${a}${b}${c}`);
      }
    }
  }

  return candidates;
}

// 正解と予想を比較して、HitとBlowを計算する
export function calculateHitBlow(answer, guess) {
  let hit = 0;
  let blow = 0;

  for (let i = 0; i < 3; i++) {
    if (answer[i] === guess[i]) {
      hit++;
    } else if (answer.includes(guess[i])) {
      blow++;
    }
  }

  return { hit, blow };
}

// これまでの履歴と矛盾しない候補だけ残す
export function filterCandidates(candidates, history) {
  return candidates.filter((candidate) => {
    return history.every((turn) => {
      const result = calculateHitBlow(candidate, turn.guess);

      return (
        result.hit === turn.hit &&
        result.blow === turn.blow
      );
    });
  });
}
export function createInitialBattleState({
  mySecret,
  role,
  myItems = [],
  opponentItems = [],
}) {
  const allCandidates = generateAllCandidates();

  return {
    role,

    round: 1,

    mySecret,

    opponentCandidates: [...allCandidates],

    opponentViewOfMySecret: [...allCandidates],

    myGuessHistory: [],

    opponentGuessHistory: [],

    myItems,

    opponentItems,

    myUsedItems: [],

    opponentUsedItems: [],

    winner: null,
  };
}

export function applyOpponentGuess(
  state,
  guess,
  hit,
  blow
) {
  const nextOpponentHistory = [
    ...state.opponentGuessHistory,
    {
      guess,
      hit,
      blow,
    },
  ];

  const nextOpponentView = filterCandidates(
    generateAllCandidates(),
    nextOpponentHistory
  );

  return {
    ...state,
    opponentGuessHistory: nextOpponentHistory,
    opponentViewOfMySecret: nextOpponentView,
  };
}

export function applyMyGuess(
  state,
  guess,
  hit,
  blow
) {
  const nextMyHistory = [
    ...state.myGuessHistory,
    {
      guess,
      hit,
      blow,
    },
  ];

  const nextOpponentCandidates = filterCandidates(
    generateAllCandidates(),
    nextMyHistory
  );

  return {
    ...state,
    myGuessHistory: nextMyHistory,
    opponentCandidates: nextOpponentCandidates,
  };
}