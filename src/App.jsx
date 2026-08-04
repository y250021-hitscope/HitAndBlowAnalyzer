import Header from "./components/Header";
import AnalysisPage from "./components/AnalysisPage";
import DataManager from "./components/DataManager";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [activePage, setActivePage] = useState("analysis");

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("hitScopeHistory");
    if (savedHistory) {
      return JSON.parse(savedHistory);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("hitScopeHistory", JSON.stringify(history));
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

  function deleteHistory(id) {
    setHistory(history.filter((item) => item.id !== id));
  }

  return (
    <div className="container">
      <Header />
      <div className="page-switcher">
        <button
  className={activePage === "data" ? "active" : ""}
  onClick={() => setActivePage("data")}
>
  📥 データ管理
</button>

<button
  className={activePage === "analysis" ? "active" : ""}
  onClick={() => setActivePage("analysis")}
>
  📊 分析
</button>
      </div>

      {activePage === "data" ? (
        <DataManager
          number={number}
          setNumber={setNumber}
          onlyNumber={onlyNumber}
          addNumber={addNumber}
          history={history}
          setHistory={setHistory}
          deleteHistory={deleteHistory}
        />
      ) : (
        <AnalysisPage history={history} />
      )}
    </div>
  );
}

export default App;
