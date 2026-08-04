import { countDigits } from "./digitAnalysis";

export function getInsights(history) {
  if (history.length === 0) {
    return ["まだ分析データがありません。"];
  }

  const digitRanking = countDigits(history);
  const topDigit = digitRanking[0];

  const patternCounts = {};

  history.forEach((item) => {
    if (patternCounts[item.pattern]) {
      patternCounts[item.pattern]++;
    } else {
      patternCounts[item.pattern] = 1;
    }
  });

  const patternRanking = Object.entries(patternCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const [topPattern, topPatternCount] = patternRanking[0];

  const digitPercent = Math.round(
    (topDigit.count / (history.length * 3)) * 100
  );

  const patternPercent = Math.round(
    (topPatternCount / history.length) * 100
  );

  const comments = [];

if (history.length < 30) {
  comments.push(
    "🌱 まだデータが少ないため、分析精度はこれから上がります！"
  );
}

    return [
  ...comments,
     `📊 現在 ${history.length} 件のデータを分析しています。`,
     `🔥 人気No.1は「${topDigit.digit}」です。（${digitPercent}%）`,
     `🎯 最も多いパターンは「${topPattern}」です。（${patternPercent}%）`,
    ];
}