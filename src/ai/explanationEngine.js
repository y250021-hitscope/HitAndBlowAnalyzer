export function getExplanation(recommendation) {
  if (!recommendation) {
    return [];
  }

  const comments = [];

  if (recommendation.percent >= 70) {
    comments.push(
      "非常に強い共起傾向があります。"
    );
  } else if (recommendation.percent >= 50) {
    comments.push(
      "比較的強い共起傾向があります。"
    );
  } else {
    comments.push(
      "共起傾向はやや弱めです。"
    );
  }

  comments.push(
    `過去に ${recommendation.count} 回一緒に出現しています。`
  );

  if (recommendation.count >= 10) {
    comments.push(
      "十分なデータがあるため、信頼できる結果です。"
    );
  } else {
    comments.push(
      "データ数が少ないため、参考程度にご覧ください。"
    );
  }

  return comments;
}