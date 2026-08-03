export function countDigits(history) {
  const counts = Array(10).fill(0);

  history.forEach((item) => {
    item.number.split("").forEach((digit) => {
      counts[Number(digit)]++;
    });
  });

  return counts
    .map((count, digit) => ({
      digit,
      count,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);
}