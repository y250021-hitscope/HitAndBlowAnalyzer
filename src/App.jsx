import { countCoexist } from "./analysis/coexistAnalysis";
import { countPatternDigits } from "./analysis/patternAnalysis";
import { countDigits } from "./analysis/digitAnalysis";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");

  const [selectedPattern, setSelectedPattern] = useState("HHL");

  const [selectedDigit, setSelectedDigit] = useState(null);

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("hitScopeHistory");

    if (savedHistory) {
      return JSON.parse(savedHistory);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      "hitScopeHistory",
      JSON.stringify(history)
    );
  }, [history]);

  const onlyNumber = (text) => {
    return text.replace(/[^0-9]/g, "");
  };

  const getPattern = (number) => {
  return number
    .split("")
    .map((digit) => (Number(digit) <= 4 ? "L" : "H"))
    .join("");
  };

  function addNumber() {
    if (number.length !== 3) {
      alert("3桁入力してください！");
      return;
    }

    if (new Set(number.split("")).size !== 3) {
      alert("同じ数字は使えません！");
      return;
    }

  setHistory([
  ...history,
  {
    id: Date.now(),
    number: number,
    pattern: getPattern(number),
    date: new Date().toISOString(),
  },
  ]);
    setNumber("");
  }

    function deleteHistory(id){
    setHistory(history.filter((item) => item.id !== id));
  }

const counts = countDigits(history);

const patternCounts = countPatternDigits(
  history,
  selectedPattern
);

const coexistCounts =
  selectedDigit === null
    ? []
    : countCoexist(history, selectedPattern, selectedDigit);

  return (
    <div className="container">
      <h1>🎯 HitScope</h1>

      <p>世界中のHit&Blowデータを分析</p>

      <input
        value={number}
        onChange={(e) => setNumber(onlyNumber(e.target.value))}
        maxLength={3}
        placeholder="583"
      />

      <button onClick={addNumber}>登録</button>

      <hr />

      <h2>登録履歴</h2>

  {history.map((item, index) => (
   <div
  key={item.id}
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  }}
>
  <span>
    {item.number}（{item.pattern}）
  </span>

  <button onClick={() => deleteHistory(item.id)}>
    🗑️
  </button>
</div>
  ))}
      <hr />

<h2>数字ランキング</h2>

{counts.map((item) => (
  <div key={item.digit}>
    {item.digit} → {item.count}回
  </div>
))}

<hr />

<h2>パターン別ランキング</h2>

<div className="pattern-buttons">
  {["HHH", "HHL", "HLH", "HLL", "LHH", "LHL", "LLH", "LLL"].map(
    (pattern) => (
      <button
        key={pattern}
        onClick={() => {
          setSelectedPattern(pattern)
          setSelectedDigit(null);
        }}
      >
        {pattern}
      </button>
    )
  )}
</div>

<h3>{selectedPattern} の数字ランキング</h3>

{patternCounts.length === 0 ? (
  <p>まだデータがありません</p>
) : (
  patternCounts.map((item) => (
  <button
    key={item.digit}
    onClick={() => setSelectedDigit(item.digit)}
    style={{ display: "block", marginBottom: "8px" }}
  >
    {item.digit} → {item.count}回
  </button>
))
)}

{selectedDigit !== null && (
  <>
    <hr />

    <h3>
      {selectedPattern}で{selectedDigit}と一緒に出る数字
    </h3>

    {coexistCounts.length === 0 ? (
      <p>該当データがありません</p>
    ) : (
      coexistCounts.map((item) => {
  let levelClass = "low";

  if (item.percent >= 80) {
    levelClass = "very-high";
  } else if (item.percent >= 60) {
    levelClass = "high";
  } else if (item.percent >= 30) {
    levelClass = "medium";
  }

  return (
    <div className="coexist-row" key={item.digit}>
      <div className="coexist-label">
        <strong>{item.digit}</strong>
        <span>
          {item.count}回（{item.percent}%）
        </span>
      </div>

      <div className="bar-background">
        <div
          className={`bar-fill ${levelClass}`}
          style={{ width: `${item.percent}%` }}
        />
      </div>
    </div>
  );
})
    )}
  </>
)}

{counts.map((item) => (
  <div key={item.digit}>
    {item.digit} → {item.count}回
  </div>
))}
    </div>
  );
}

export default App;