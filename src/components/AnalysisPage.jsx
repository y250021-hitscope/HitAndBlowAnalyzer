import InsightCard from "./InsightCard";
import { getInsights } from "../analysis/insightEngine";
import { useState } from "react";
import { countDigits } from "../analysis/digitAnalysis";
import { countPatternDigits } from "../analysis/patternAnalysis";
import { countCoexist } from "../analysis/coexistAnalysis";

function AnalysisPage({ history }) {
  const [selectedPattern, setSelectedPattern] = useState("HHL");
  const [selectedDigit, setSelectedDigit] = useState(null);

  const counts = countDigits(history);
  const insights = getInsights(history);

  const patternCounts = countPatternDigits(
    history,
    selectedPattern
  );

  const coexistCounts =
    selectedDigit === null
      ? []
      : countCoexist(
          history,
          selectedPattern,
          selectedDigit
        );

  return (
    <div>
      <h2>📊 分析</h2>

      <InsightCard history={history} />

      <h3>📈 数字ランキング</h3>

      {counts.length === 0 ? (
        <p>まだデータがありません</p>
      ) : (
        counts.map((item) => (
          <div key={item.digit}>
            {item.digit} → {item.count}回
          </div>
        ))
      )}

      <hr />

      <h3>🎲 パターン別ランキング</h3>

      <div className="pattern-buttons">
        {[
          "HHH",
          "HHL",
          "HLH",
          "HLL",
          "LHH",
          "LHL",
          "LLH",
          "LLL",
        ].map((pattern) => (
          <button
            key={pattern}
            onClick={() => {
              setSelectedPattern(pattern);
              setSelectedDigit(null);
            }}
          >
            {pattern}
          </button>
        ))}
      </div>

      <h3>{selectedPattern} の数字ランキング</h3>

      {patternCounts.length === 0 ? (
        <p>まだデータがありません</p>
      ) : (
        patternCounts.map((item) => (
          <button
            key={item.digit}
            onClick={() => setSelectedDigit(item.digit)}
            style={{
              display: "block",
              marginBottom: "8px",
            }}
          >
            {item.digit} → {item.count}回
          </button>
        ))
      )}

      {selectedDigit !== null && (
        <>
          <hr />

          <h3>
            {selectedPattern}で{selectedDigit}と一緒に出る数字
          </h3>

          {coexistCounts.length === 0 ? (
            <p>該当データがありません</p>
          ) : (
            coexistCounts.map((item) => {
              let levelClass = "low";

              if (item.percent >= 80) {
                levelClass = "very-high";
              } else if (item.percent >= 60) {
                levelClass = "high";
              } else if (item.percent >= 30) {
                levelClass = "medium";
              }

              return (
                <div className="coexist-row" key={item.digit}>
                  <div className="coexist-label">
                    <strong>{item.digit}</strong>

                    <span>
                      {item.count}回（{item.percent}%）
                    </span>
                  </div>

                  <div className="bar-background">
                    <div
                      className={`bar-fill ${levelClass}`}
                      style={{
                        width: `${item.percent}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
}

export default AnalysisPage;