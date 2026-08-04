import { getInsights } from "../analysis/insightEngine";

function InsightCard({ history }) {
  const insights = getInsights(history);

  return (
    <>
      <p className="insight-label">🧠 Insight Engine</p>
      <h2>💡 今日の発見</h2>

      <div className="insight-card">
        {insights.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </>
  );
}

export default InsightCard;