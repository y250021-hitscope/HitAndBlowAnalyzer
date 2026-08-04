import { getRecommendedDigit } from "../ai/recommendationEngine";
import { getHitScopeAI } from "../ai/hitScopeAI";
import CoexistChart from "./CoexistChart";
import DigitChart from "./DigitChart";
import DashboardCard from "./DashboardCard";
import InsightCard from "./InsightCard";
import { getInsights } from "../analysis/insightEngine";
import { useState } from "react";
import { countDigits } from "../analysis/digitAnalysis";
import { countPatternDigits } from "../analysis/patternAnalysis";
import { countCoexist } from "../analysis/coexistAnalysis";
import { getRecommendedNumbers } from "../ai/recommendationEngine";
import AIRecommendationCard from "./AIRecommendationCard";

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
      : countCoexist(history, selectedPattern, selectedDigit);

  const recommendedDigit = getRecommendedDigit(
    history,
    selectedPattern,
    selectedDigit
  );

  const ai = getHitScopeAI(
  history,
  selectedPattern,
  selectedDigit
);

  const recommendedNumbers = getRecommendedNumbers(
    history,
    selectedPattern
  );

  return (
    <div>
      <h2>📊 分析</h2>

      <div className="dashboard-grid">
        <DashboardCard
          icon="📊"
          title="総分析数"
          value={history.length}
          color="#3b82f6"
        />

        <DashboardCard
          icon="🔥"
          title="人気数字"
          value={counts[0]?.digit ?? "-"}
          color="#ef4444"
          onClick={() => {
            document
              .getElementById("digit-ranking")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }}
        />

        <DashboardCard
          icon="🧩"
          title="人気パターン"
          value={selectedPattern}
          color="#10b981"
          onClick={() => {
            document
              .getElementById("pattern-analysis")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }}
        />

        <DashboardCard
          icon="🤝"
          title="共起分析"
          value={selectedDigit ?? "-"}
          color="#f59e0b"
        />
      </div>

      <InsightCard history={history} />

      <h3 id="digit-ranking">📈 数字ランキング</h3>
      <DigitChart counts={counts} />

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

      <h3 id="pattern-analysis">🧩 パターン別分析</h3>

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
        <div className="number-recommendation-card">
  <p className="recommendation-label">
    🤖 HitScope AI Builder
  </p>

  <h3>{selectedPattern}のおすすめ候補</h3>

  {recommendedNumbers.length === 0 ? (
    <p>このパターンのデータがまだありません。</p>
  ) : (
    <div className="recommended-number-list">
      {recommendedNumbers.map((item, index) => (
        <div
          className="recommended-number-item"
          key={item.number}
        >
          <span className="recommendation-rank">
            {index + 1}位
          </span>

          <strong>{item.number}</strong>

          <span>
            登録 {item.exactCount}回
          </span>
        </div>
      ))}
    </div>
  )}
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
{/*
          {recommendedDigit && (
            <div className="recommendation-card">
              <p className="recommendation-label">
                🤖 HitScope おすすめ
              </p>

              <h3>
                {selectedPattern}で{selectedDigit}を使うなら
              </h3>

              <div className="recommendation-value">
                {recommendedDigit.digit}
              </div>

              <p>
                共起率 {recommendedDigit.percent}%
                （{recommendedDigit.count}回）
              </p>
            </div>
          )}
*/}
    <AIRecommendationCard ai={ai} />

          <h3>
            {selectedPattern}で{selectedDigit}と一緒に出る数字
          </h3>
          <CoexistChart counts={coexistCounts} />

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