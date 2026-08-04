export function getInsights(history) {
  if (history.length === 0) {
    return [
      "まだ分析データがありません。",
    ];
  }

  return [
    `現在 ${history.length} 件のデータを分析しています。`,
  ];
}