import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [history, setHistory] = useState([]);

  const onlyNumber = (text) => {
  return text.replace(/[^0-9]/g, "");
}

  function addNumber() {
    if (number.length !== 3) {
      alert("3桁入力してください！");
      return;
    }
    if (new Set(number.split("")).size !== 3) {
      alert("同じ数字は使えません！");
      return;
}
    setHistory([...history, number]);
    setNumber("");
  }

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
    </div>
  );
}

export default App;