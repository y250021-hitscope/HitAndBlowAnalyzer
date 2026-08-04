import { countDigits } from "./digitAnalysis";

export function getInsights(history) {
  if (history.length === 0) {
    return [
      "まだ分析データがありません。",
    ];
  }

  const ranking = countDigits(history);

  const topDigit = ranking[0].digit;

  return [
    `現在 ${history.length} 件のデータを分析しています。`,
    `最も人気なのは「${topDigit}」です。`,
  ];
}