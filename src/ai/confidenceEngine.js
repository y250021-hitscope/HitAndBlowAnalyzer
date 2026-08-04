export function getStars(score) {
  if (score >= 95) {
    return "★★★★★";
  }

  if (score >= 80) {
    return "★★★★☆";
  }

  if (score >= 60) {
    return "★★★☆☆";
  }

  if (score >= 40) {
    return "★★☆☆☆";
  }

  return "★☆☆☆☆";
}
export function getConfidence(score) {
  if (score >= 95) {
    return "非常に高い";
  }

  if (score >= 80) {
    return "高い";
  }

  if (score >= 60) {
    return "普通";
  }

  if (score >= 40) {
    return "やや低い";
  }

  return "低い";
}
