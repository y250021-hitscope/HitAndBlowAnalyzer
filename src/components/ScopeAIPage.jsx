import { useMemo, useState } from "react";
import {
  filterCandidates,
  generateAllCandidates,
} from "../ai/battleAI";
import { findBestGuess } from "../ai/core/recommendationEngine";

function ScopeAIPage() {
  const [guess, setGuess] = useState("");
  const [hit, setHit] = useState(0);
  const [blow, setBlow] = useState(0);
  const [battleHistory, setBattleHistory] = useState([]);

  // 履歴と矛盾しない答え候補
  const candidates = useMemo(() => {
    const allCandidates = generateAllCandidates();

    return filterCandidates(allCandidates, battleHistory);
  }, [battleHistory]);

  // 現在の候補から最適手を計算
  const recommendation = useMemo(() => {
    if (candidates.length === 0) {
      return null;
    }

    return findBestGuess(candidates);
  }, [candidates]);

  function addResult() {
    if (!/^\d{3}$/.test(guess)) {
      alert("重複しない3桁の数字を入力してください！");
      return;
    }

    if (new Set(guess).size !== 3) {
      alert("同じ数字は使えません！");
      return;
    }

    if (hit + blow > 3) {
      alert("HitとBlowの合計は3以下にしてください！");
      return;
    }

    setBattleHistory([
      ...battleHistory,
      {
        guess,
        hit: Number(hit),
        blow: Number(blow),
      },
    ]);

    setGuess("");
    setHit(0);
    setBlow(0);
  }

  function resetBattle() {
    const confirmed = window.confirm(
      "ScopeAIの対戦履歴をリセットしますか？"
    );

    if (!confirmed) {
      return;
    }

    setBattleHistory([]);
    setGuess("");
    setHit(0);
    setBlow(0);
  }

  return (
    <div className="scope-ai-page">
      <h2>🤖 ScopeAI</h2>

      <p className="scope-ai-description">
        Hit・Blowの結果から候補を絞り、数学的に優秀な次の一手を提案します。
      </p>

      <div className="scope-ai-summary">
        <div className="scope-ai-summary-card">
          <span>残り候補</span>
          <strong>{candidates.length}</strong>
        </div>

        <div className="scope-ai-summary-card">
          <span>おすすめ</span>
          <strong>{recommendation?.guess ?? "---"}</strong>
        </div>
      </div>

      {recommendation && (
        <div className="scope-ai-recommendation">
          <p>🎯 ScopeAIの次の一手</p>

          <div className="scope-ai-best-number">
            {recommendation.guess}
          </div>

          <div className="scope-ai-reason">
            <p>
              期待残り候補数：
              <strong>
                {recommendation.expectedRemaining.toFixed(2)}
              </strong>
            </p>

            <p>
              最悪ケース：
              <strong>
                {recommendation.worstCaseRemaining}候補
              </strong>
            </p>
          </div>
        </div>
      )}

      <div className="scope-ai-input-card">
        <h3>結果を入力</h3>

        <input
          value={guess}
          onChange={(event) =>
            setGuess(
              event.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 3)
            )
          }
          placeholder="例：583"
          inputMode="numeric"
        />

        <div className="scope-ai-result-inputs">
          <label>
            Hit
            <select
              value={hit}
              onChange={(event) =>
                setHit(Number(event.target.value))
              }
            >
              {[0, 1, 2, 3].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label>
            Blow
            <select
              value={blow}
              onChange={(event) =>
                setBlow(Number(event.target.value))
              }
            >
              {[0, 1, 2, 3].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button onClick={addResult}>
          結果を反映
        </button>
      </div>

      <div className="scope-ai-history">
        <h3>対戦履歴</h3>

        {battleHistory.length === 0 ? (
          <p>まだ結果が入力されていません。</p>
        ) : (
          battleHistory.map((turn, index) => (
            <div
              className="scope-ai-history-item"
              key={`${turn.guess}-${index}`}
            >
              <span>{index + 1}手目</span>
              <strong>{turn.guess}</strong>
              <span>
                {turn.hit} Hit / {turn.blow} Blow
              </span>
            </div>
          ))
        )}
      </div>

      {candidates.length > 0 &&
        candidates.length <= 20 && (
          <div className="scope-ai-candidates">
            <h3>残り候補</h3>

            <div className="scope-ai-candidate-list">
              {candidates.map((candidate) => (
                <span key={candidate}>
                  {candidate}
                </span>
              ))}
            </div>
          </div>
        )}

      <button
        className="scope-ai-reset"
        onClick={resetBattle}
      >
        対戦をリセット
      </button>
    </div>
  );
}

export default ScopeAIPage;