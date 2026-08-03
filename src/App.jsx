import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");

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
    number: number,
    pattern: getPattern(number),
    date: new Date().toISOString(),
  },
  ]);
    setNumber("");
  }

const counts = Array(10).fill(0);

history.forEach((item) => {
  item.number.Appsplit("").forEach((digit) => {
    counts[Number(digit)]++;
  });
});

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
        <p key={index}>{item}</p>
      ))}
      <hr />

<h2>数字ランキング</h2>

{counts
  .map((count, digit) => ({
    digit,
    count,
  }))
  .sort((a, b) => b.count - a.count)
  .map((item) => (
    <div key={item.digit}>
      {item.digit} → {item.count}回
    </div>
  ))}
    </div>
  );
}

export default App;