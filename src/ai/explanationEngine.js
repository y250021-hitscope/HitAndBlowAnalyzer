export function getExplanation(recommendation) {
  if (!recommendation) {
    return [];
  }

  const { digit, percent, count } = recommendation;
  const comments = [];

  comments.push(
    `現在のデータを分析した結果、「${digit}」をおすすめします。`
  );

  if (percent >= 70) {
    comments.push(
      `共起率は${percent}%で、非常に強い結びつきが確認されています。`
    );
  } else if (percent >= 50) {
    comments.push(
      `共起率は${percent}%で、比較的強い結びつきがあります。`
    );
  } else {
    comments.push(
      `共起率は${percent}%です。現時点では、やや弱い傾向となっています。`
    );
  }

  if (count >= 10) {
    comments.push(
      `過去に${count}回一緒に出現しているため、比較的信頼できる結果です。`
    );
  } else if (count >= 5) {
    comments.push(
      `過去に${count}回一緒に出現しています。もう少しデータが増えると、さらに正確に判断できます。`
    );
  } else {
    comments.push(
      `ただし、一緒に出現したのはまだ${count}回です。判断材料が少ないため、参考候補としてご覧ください。`
    );
  }

  return comments;
}