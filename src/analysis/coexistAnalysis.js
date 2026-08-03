export function countCoexist(history, pattern, selectedDigit) {
  const counts = Array(10).fill(0);

  const filtered = history
    .filter((item) => item.pattern === pattern)
    .filter((item) =>
      item.number.includes(String(selectedDigit))
    );

  filtered.forEach((item) => {
    item.number.split("").forEach((digit) => {
      if (Number(digit) !== selectedDigit) {
        counts[Number(digit)]++;
      }
    });
  });

  return counts
    .map((count, digit) => ({
      digit,
      count,
      percent:
        filtered.length === 0
          ? 0
          : Math.round((count / filtered.length) * 100),
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);
}