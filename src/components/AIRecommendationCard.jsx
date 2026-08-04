function AIRecommendationCard({ ai }) {
  if (!ai) {
    return null;
  }

  return (
    <div className="ai-card">

      <div className="ai-header">
        🤖 HitScope AI
      </div>

      <p className="ai-label">おすすめ数字</p>

      <div className="ai-number">
        {ai.recommendation.digit}
      </div>

      <div className="ai-score">
        おすすめ度 {ai.score}点
      </div>

      <div className="ai-stars">
        {ai.stars}
      </div>

      <div className="ai-confidence">
        信頼度：{ai.confidence}
      </div>

      <hr />

      <h3>💬 AIコメント</h3>

      <div className="ai-message">
  {ai.explanation.map((text, index) => (
    <p key={index}>{text}</p>
  ))}
</div>

<p className="ai-note">
  📌 データが増えるほど、HitScope AIの分析精度は向上します。
</p>

    </div>
  );
}

export default AIRecommendationCard;