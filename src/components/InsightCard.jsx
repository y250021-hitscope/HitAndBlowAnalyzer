import { getInsights } from "../analysis/insightEngine";

function InsightCard({ history }) {
  const insights = getInsights(history);

  return (
    <>
      <h2>🧠 HitScope Insight</h2>

      <div
        style={{
          background: "#eef6ff",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        {insights.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </>
  );
}

export default InsightCard;